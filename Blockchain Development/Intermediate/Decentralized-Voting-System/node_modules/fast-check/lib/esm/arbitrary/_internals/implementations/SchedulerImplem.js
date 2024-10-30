import { escapeForTemplateString } from '../helpers/TextEscaper.js';
import { cloneMethod } from '../../../check/symbols.js';
import { stringify } from '../../../utils/stringify.js';
export class SchedulerImplem {
    constructor(act, taskSelector) {
        this.act = act;
        this.taskSelector = taskSelector;
        this.lastTaskId = 0;
        this.sourceTaskSelector = taskSelector.clone();
        this.scheduledTasks = [];
        this.triggeredTasks = [];
        this.scheduledWatchers = [];
    }
    static buildLog(reportItem) {
        return `[task\${${reportItem.taskId}}] ${reportItem.label.length !== 0 ? `${reportItem.schedulingType}::${reportItem.label}` : reportItem.schedulingType} ${reportItem.status}${reportItem.outputValue !== undefined ? ` with value ${escapeForTemplateString(reportItem.outputValue)}` : ''}`;
    }
    log(schedulingType, taskId, label, metadata, status, data) {
        this.triggeredTasks.push({
            status,
            schedulingType,
            taskId,
            label,
            metadata,
            outputValue: data !== undefined ? stringify(data) : undefined,
        });
    }
    scheduleInternal(schedulingType, label, task, metadata, thenTaskToBeAwaited) {
        let trigger = null;
        const taskId = ++this.lastTaskId;
        const scheduledPromise = new Promise((resolve, reject) => {
            trigger = () => {
                (thenTaskToBeAwaited ? task.then(() => thenTaskToBeAwaited()) : task).then((data) => {
                    this.log(schedulingType, taskId, label, metadata, 'resolved', data);
                    return resolve(data);
                }, (err) => {
                    this.log(schedulingType, taskId, label, metadata, 'rejected', err);
                    return reject(err);
                });
            };
        });
        this.scheduledTasks.push({
            original: task,
            scheduled: scheduledPromise,
            trigger: trigger,
            schedulingType,
            taskId,
            label,
            metadata,
        });
        if (this.scheduledWatchers.length !== 0) {
            this.scheduledWatchers[0]();
        }
        return scheduledPromise;
    }
    schedule(task, label, metadata) {
        return this.scheduleInternal('promise', label || '', task, metadata);
    }
    scheduleFunction(asyncFunction) {
        return (...args) => this.scheduleInternal('function', `${asyncFunction.name}(${args.map(stringify).join(',')})`, asyncFunction(...args), undefined);
    }
    scheduleSequence(sequenceBuilders) {
        const status = { done: false, faulty: false };
        const dummyResolvedPromise = { then: (f) => f() };
        let resolveSequenceTask = () => { };
        const sequenceTask = new Promise((resolve) => (resolveSequenceTask = resolve));
        sequenceBuilders
            .reduce((previouslyScheduled, item) => {
            const [builder, label, metadata] = typeof item === 'function' ? [item, item.name, undefined] : [item.builder, item.label, item.metadata];
            return previouslyScheduled.then(() => {
                const scheduled = this.scheduleInternal('sequence', label, dummyResolvedPromise, metadata, () => builder());
                scheduled.catch(() => {
                    status.faulty = true;
                    resolveSequenceTask();
                });
                return scheduled;
            });
        }, dummyResolvedPromise)
            .then(() => {
            status.done = true;
            resolveSequenceTask();
        }, () => {
        });
        return Object.assign(status, {
            task: Promise.resolve(sequenceTask).then(() => {
                return { done: status.done, faulty: status.faulty };
            }),
        });
    }
    count() {
        return this.scheduledTasks.length;
    }
    async internalWaitOne() {
        if (this.scheduledTasks.length === 0) {
            throw new Error('No task scheduled');
        }
        const taskIndex = this.taskSelector.nextTaskIndex(this.scheduledTasks);
        const [scheduledTask] = this.scheduledTasks.splice(taskIndex, 1);
        scheduledTask.trigger();
        try {
            await scheduledTask.scheduled;
        }
        catch (_err) {
        }
    }
    async waitOne() {
        await this.act(async () => await this.internalWaitOne());
    }
    async waitAll() {
        while (this.scheduledTasks.length > 0) {
            await this.waitOne();
        }
    }
    async waitFor(unscheduledTask) {
        let taskResolved = false;
        let awaiterPromise = null;
        const awaiter = async () => {
            while (!taskResolved && this.scheduledTasks.length > 0) {
                await this.waitOne();
            }
            awaiterPromise = null;
        };
        const handleNotified = () => {
            if (awaiterPromise !== null) {
                return;
            }
            awaiterPromise = Promise.resolve().then(awaiter);
        };
        const clearAndReplaceWatcher = () => {
            const handleNotifiedIndex = this.scheduledWatchers.indexOf(handleNotified);
            if (handleNotifiedIndex !== -1) {
                this.scheduledWatchers.splice(handleNotifiedIndex, 1);
            }
            if (handleNotifiedIndex === 0 && this.scheduledWatchers.length !== 0) {
                this.scheduledWatchers[0]();
            }
        };
        const rewrappedTask = unscheduledTask.then((ret) => {
            taskResolved = true;
            if (awaiterPromise === null) {
                clearAndReplaceWatcher();
                return ret;
            }
            return awaiterPromise.then(() => {
                clearAndReplaceWatcher();
                return ret;
            });
        }, (err) => {
            taskResolved = true;
            if (awaiterPromise === null) {
                clearAndReplaceWatcher();
                throw err;
            }
            return awaiterPromise.then(() => {
                clearAndReplaceWatcher();
                throw err;
            });
        });
        if (this.scheduledTasks.length > 0 && this.scheduledWatchers.length === 0) {
            handleNotified();
        }
        this.scheduledWatchers.push(handleNotified);
        return rewrappedTask;
    }
    report() {
        return [
            ...this.triggeredTasks,
            ...this.scheduledTasks.map((t) => ({
                status: 'pending',
                schedulingType: t.schedulingType,
                taskId: t.taskId,
                label: t.label,
                metadata: t.metadata,
            })),
        ];
    }
    toString() {
        return ('schedulerFor()`\n' +
            this.report()
                .map(SchedulerImplem.buildLog)
                .map((log) => `-> ${log}`)
                .join('\n') +
            '`');
    }
    [cloneMethod]() {
        return new SchedulerImplem(this.act, this.sourceTaskSelector);
    }
}
