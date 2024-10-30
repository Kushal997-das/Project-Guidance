/// <reference types="node" />
import { EventEmitter } from 'node:events';
declare type Origin = EventEmitter;
declare type Event = string | symbol;
declare type Fn = (...args: any[]) => void;
interface Unhandler {
    once: (origin: Origin, event: Event, fn: Fn) => void;
    unhandleAll: () => void;
}
export default function unhandle(): Unhandler;
export {};
