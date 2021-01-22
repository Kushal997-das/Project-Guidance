import java.util.ArrayList;

public class PreemptivePrioritySchedulingAlgorithm {

    //Gantt
    private ArrayList<GanttChart> gantt;
    private int currentTime;
    private int exeTime;
    private ReadyQueue readyQueue;

    public PreemptivePrioritySchedulingAlgorithm() {
        gantt = new ArrayList<>();
        currentTime = 0;
        exeTime = 0;
        readyQueue = new ReadyQueue();
    }

    public ArrayList<GanttChart> getGantt(ArrayList<process> processes) {

        //Getting the first process arrived time
        currentTime = this.getFirstArrivingTime(processes);
        int in = currentTime, out = currentTime; // The starting time (in) of a process and the end time (out) for a process

        //Getting the first process and put it in arraylist called -> processes1
        ArrayList<process> processes1 = this.getFirstArrivingProcesses(processes);


        //Adding the first arrived process in the ready queue to prepare it to work in CPU,
        //and remove it from the main array called -> processes
        for (process process : processes1) {
            readyQueue.enqueue(process);
            processes.remove(process);
        }

        //Then sorting the rest of processes according to the arriving time and,
        //put them in an array called -> orderedByArrivingTime
        ArrayList<process> orderedByArrivingTime = this.orderProcessesByArrivingTime(processes);


        //Preparing the processes from the ready queue to work in CPU
        while (!readyQueue.isEmpty()) {
            //Get each ready process from the ready queue and work on it.
            process process = readyQueue.dequeue();
            System.out.println("Process P"+process.getProcessID()+" Running.");

            //The following condition to check if there are processes need to work.
            if (orderedByArrivingTime.size() > 0) {


                //Handle of all arriving processes while one process work in CPU.
                for (int i = 0; i < orderedByArrivingTime.size(); i++) {

                    //Get the first process from the array of the processes which ordered by arrival time.
                    process p = orderedByArrivingTime.get(i);

                    //If the process from the ordered array has a priority less than the process in the CPU.
                    //So we won’t put it now, so we will let the process in the CPU to complete it’s burst time, and put the
                    //process in the ready queue to work after it. and remove it from the ordered array.
                    if (p.getArrive_time() >= process.getArrive_time()
                            && p.getArrive_time() < (process.getBurset_time() + currentTime)
                            && p.getPriority() >= process.getPriority()) {
                        readyQueue.enqueue(p);
                        orderedByArrivingTime.remove(p);
                        i--;
                    }
                    //If the process from the ordered array has a priority greater than the process in the CPU
                    //So we will pause it and put the another process from the ordered array in the ready queue to start work.
                    //Then we will initialize the starting and ending time for the process from the ordered array and
                    //reduce the time of paused process to let it work with the rest of it time again after that.
                    else if (p.getArrive_time() >= process.getArrive_time()
                            && p.getArrive_time() < (process.getBurset_time() + currentTime)
                            && p.getPriority() < process.getPriority()) {
                        in = currentTime;
                        currentTime = p.getArrive_time();
                        process.reduceTime(currentTime - in);
                        out = currentTime;
                        readyQueue.enqueue(process);//Put the first process again with new burst time
                        System.out.println("Process P"+process.getProcessID()+" Blocked Temporary at Time: "+currentTime);
                        GanttChart gR = new GanttChart(in, out, process.getProcessID());
                        gantt.add(gR);
                        readyQueue.enqueue(p);
                        orderedByArrivingTime.remove(p);
                        i--;
                        break;
                    }

                    //Now we checked all the ordered list and no priority greater than the priority in the CPU,
                    //So they all will wait and the process in the CPU will complete it’s work.
                    if (i == orderedByArrivingTime.size() - 1) {
                        in = currentTime;
                        currentTime += process.getBurset_time();
                        out = currentTime;
                        gantt.add(new GanttChart(in, out, process.getProcessID()));
                        System.out.println("Process P"+process.getProcessID()+" Finished Work at Time: "+currentTime);
                        //So if now process from the ordered array have greater priority then will have to check if now
                        //processes in the ready queue so we have to add one of the processes from the ordered array to the
                        //ready queue to work.
                        if (orderedByArrivingTime.size() > 0
                                && readyQueue.isEmpty()) {
                            readyQueue.enqueue(orderedByArrivingTime.get(0));
                        }
                    }
                }
            }
            //Here if the ordered array does not have any processes then we will let the process that work in CPU ,
            //To complete it’s work to finish and initialize it’s starting and ending time.
            else {
                in = currentTime;
                currentTime += process.getBurset_time();
                out = currentTime;
                System.out.println("Process P"+process.getProcessID()+" Finished Work at Time: "+currentTime);
                gantt.add(new GanttChart(in, out, process.getProcessID()));
            }
        }
        return gantt;
    }


    //This function to get the completion time from the process in the gantt chart (by it’s out time)
    public static int getCompletionTime(process p, ArrayList<GanttChart> gantt) {
        int completionTime = 0;
        for (GanttChart gR : gantt) {
            if (gR.getProcessId() == p.getProcessID())
                completionTime = gR.getOutTime();
        }
        return completionTime;
    }

    //This function to get the turn around time from the process in the gantt chart [TAT = CT - AT]
    public static int getTurnAroundTime(process p, ArrayList<GanttChart> gantt) {
        int completionTime = PreemptivePrioritySchedulingAlgorithm.getCompletionTime(p, gantt);
        return completionTime - p.getArrive_time();
    }

    //This function to get the waiting time from the process in the gantt chart [WT = TAT - BT]
    public static int getWaitingTime(process p, ArrayList<GanttChart> gantt) {
        int turnAroundTime = PreemptivePrioritySchedulingAlgorithm.getTurnAroundTime(p, gantt);
        return turnAroundTime - p.getBurset_time();
    }


    private ArrayList<process> orderProcessesByArrivingTime(ArrayList<process> processes) {
        ArrayList<process> newProcesses = new ArrayList<>();
        while (processes.size() != 0) {
            process p = this.getFirstArrivingProcess(processes);
            processes.remove(p);
            newProcesses.add(p);
        }
        return newProcesses;
    }

    private process getFirstArrivingProcess(ArrayList<process> processes) {
        int min = Integer.MAX_VALUE;
        process process = null;
        for (process p : processes) {
            if (p.getArrive_time() < min) {
                min = p.getArrive_time();
                process = p;
            }
        }
        return process;
    }

    //Function to get the first arriving time process , in the following example processes1[0] = p1;
    /*
     * =>> Sample Input for testing.
     *
     * PID - Priority - Arrival - Burst
     *  1  -    2     -   0     -   10
     *  2  -    1     -   2     -   5
     *  3  -    0     -   3     -   2
     *  4  -    3     -   5     -   20
     *
     * */

    private ArrayList<process> getFirstArrivingProcesses(ArrayList<process> processes) {
        int min = this.getFirstArrivingTime(processes);
        ArrayList<process> processes1 = new ArrayList<>();
        for (process p : processes) {
            if (p.getArrive_time() == min) {
                processes1.add(p);
            }
        }
        return processes1;
    }

    //Function to get the first arriving time , in the following example min = 0
    /*
     * =>> Sample Input for testing.
     *
     * PID - Priority - Arrival - Burst
     *  1  -    2     -   0     -   10
     *  2  -    1     -   2     -   5
     *  3  -    0     -   3     -   2
     *  4  -    3     -   5     -   20
     *
     * */

    private int getFirstArrivingTime(ArrayList<process> processes) {
        int min = Integer.MAX_VALUE;
        for (process p : processes) {
            if (p.getArrive_time() < min) {
                min = p.getArrive_time();
            }
        }
        return min;
    }


}
