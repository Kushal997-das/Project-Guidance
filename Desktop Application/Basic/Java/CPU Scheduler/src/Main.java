import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to the CPU Scheduler Simulator >>>>> (OS)");
        System.out.println("-------------------------------------------------");
        System.out.println("Choose one of the following scheduling algorithms");
        System.out.println("[1] Shortest Job First [SJF]");  //Shortest Job First
        System.out.println("[2] Round Robin [RR]");          //Round Robin
        System.out.println("[3] Priority Scheduling");       //PriorityScheduling
        System.out.println("[4] Multi-Level Queue [MLQ]");   //Multi-Level-Queue-Scheduling
        System.out.print(">> ");
        Scanner scanner = new Scanner(System.in);
        int choise = scanner.nextInt();
        switch (choise){
            case 1:
                SJFAlgorithm();
                break;
            case 2:
                RRAlgorithm();
                break;
            case 3:
                preemptivePriorityScheduling();
                break;
            case 4:
                multiLevelScheduling();
                break;
            default:
                System.out.println("Invalid Input");
                break;
        }
    }
    public static void multiLevelScheduling() {
        int quantum = 0;
        int number;
        System.out.println("Enter number of processes: ");
        Scanner scanner = new Scanner(System.in);
        number = scanner.nextInt();
        process[] processes = new process[number];
        for (int i = 0; i < number; i++) {
            System.out.println("Enter the name of process " + (i + 1) + " : ");
            String name = scanner.next();
            System.out.println("Enter the arrival time of process " + (i + 1) + " : ");
            int arrival = scanner.nextInt();
            System.out.println("Enter the burst time of process " + (i + 1) + " : ");
            int burst = scanner.nextInt();
            System.out.println("Enter the queue number of process " + (i + 1) + " : ");
            int qNumber = scanner.nextInt();
            process process = new process(name, burst, arrival, qNumber);
            processes[i] = process;
        }
        System.out.println("Enter the quantum time: ");
        quantum = scanner.nextInt();
        MultiLevelQueueScheduling multiLevelQueueScheduling = new MultiLevelQueueScheduling();
        multiLevelQueueScheduling.MLQ(number,processes,quantum);
    }
    public static void preemptivePriorityScheduling() {
        //For the priority algorithm we use the process class, the GanttChart class to represents the Gantt Chart
        // and the ReadyQueue class to handle the execution order of the processes and the main class for the
        //algorithm is (PreemptivePrioritySchedulingAlgorithm) class.
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
        ArrayList<process> inProcesses = new ArrayList<>();
        Scanner input = new Scanner(System.in);
        int id, priority, aTime, bTime; //id-> processName
        System.out.println("Please enter the number of processes: ");
        int numberOfProcesses = input.nextInt();
        for (int i = 0; i < numberOfProcesses; i++) {
            System.out.print("Enter process " + (i + 1) + " ID: ");
            while (!input.hasNextInt()) {
                System.out.print("Error! Enter process id as an integer: ");
                input.next();
            }
            id = input.nextInt();
            System.out.print("Enter process " + (i + 1) + " priority: ");
            while (!input.hasNextInt()) {
                System.out.print("Error! Enter process priority as an integer: ");
                input.next();
            }
            priority = input.nextInt();
            System.out.print("Enter process " + (i + 1) + " arriving time: ");
            while (!input.hasNextInt()) {
                System.out.print("Error! Enter process arriving time as an integer: ");
                input.next();
            }
            aTime = input.nextInt();
            System.out.print("Enter process " + (i + 1) + " burst time: ");
            while (!input.hasNextInt()) {
                System.out.print("Error! Enter process burst time as an integer: ");
                input.next();
            }
            bTime = input.nextInt();
            inProcesses.add(new process(id, priority, aTime, bTime));
        }
        ArrayList<process> processes = inProcesses;
        ArrayList<process> processesCpyClone = new ArrayList<>();
        for (process p : processes) {
            processesCpyClone.add(new process(p.getProcessID(), p.getPriority(), p.getArrive_time(), p.getBurset_time()));
        }
        ArrayList<process> processesCpy = processesCpyClone;
        ArrayList<GanttChart> gantt = new PreemptivePrioritySchedulingAlgorithm().getGantt(processes); // Starting execution of processes
        System.out.println("Completion Time"); //The following function prints the completion time for each entered process
        for (process p : processesCpy) {
            int completionTime = PreemptivePrioritySchedulingAlgorithm.getCompletionTime(p, gantt);
            System.out.println("P" + p.getProcessID() + ": t = " + completionTime);
        }
        float avgWaitTime = 0; // To store the avg waiting time
        float avgTurnAroundTime = 0; // To store the avg turn around time
        System.out.println("Turn Around Time"); //The following function prints the turn around time for each entered process
        for (process p : processesCpy) {
            int turnAroundTime = PreemptivePrioritySchedulingAlgorithm.getTurnAroundTime(p, gantt);
            System.out.println("P" + p.getProcessID() + ": t = " + turnAroundTime);
            avgTurnAroundTime += turnAroundTime;
        }
        avgTurnAroundTime = avgTurnAroundTime / processesCpy.size();
        System.out.println("Waiting Time"); //The following function prints the waiting time for each entered process
        for (process p : processesCpy) {
            int waitingTime = PreemptivePrioritySchedulingAlgorithm.getWaitingTime(p, gantt);
            System.out.println("P" + p.getProcessID() + ": t = " + waitingTime);
            avgWaitTime += waitingTime;
        }
        avgWaitTime = avgWaitTime / processesCpy.size();
        System.out.println("Average Turn Around Time : " + avgTurnAroundTime);
        System.out.println("Average Waiting Time : " + avgWaitTime);
    }
    public static void SJFAlgorithm() {
        process p1;
        int num,burset_time,arrive_time,con;
        String name;
        Scanner sc=new Scanner(System.in);
        System.out.println("enter number of process");
        num=sc.nextInt();
        Preemptive_SJF pf1 = new Preemptive_SJF();
        for (int i=0;i<num;i++)
        {
            System.out.println("enter burset_time of process");
            burset_time=sc.nextInt();
            System.out.println("enter arrive_time of process");
            arrive_time=sc.nextInt();
            System.out.println("enter name of process");
            name=sc.nextLine();
            name=sc.nextLine();
            p1=new process(name,burset_time,arrive_time);
            pf1.processes.add(p1);
        }
        System.out.println("enter context switching");
        con=sc.nextInt();
        pf1.setContext_switching(con);
        int y=pf1.zeronum();
        if (y==pf1.processes.size())
            pf1.zero_sjf();
        else
            pf1.SJF();
        pf1.print();

    }
    public static void RRAlgorithm() {
        RoundRobin r1=new RoundRobin();
        int number,quantam,burset_time,arrive_time,con;
        Scanner input=new Scanner(System.in);
        System.out.println("enter number of process");
        number=input.nextInt();
        process p2;
        String name;
        for (int i=0;i<number;i++)
        {
            System.out.println("enter burset_time of process");
            burset_time=input.nextInt();
            System.out.println("enter arrive_time of process");
            arrive_time=input.nextInt();
            System.out.println("enter name of process");
            name=input.nextLine();
            name=input.nextLine();
            p2=new process(name,burset_time,arrive_time);
            r1.round_processes.add(p2);
        }
        System.out.println("enter quantam time");
        quantam=input.nextInt();
        System.out.println("enter context switching");
        con=input.nextInt();
        r1.setContext_switching(con);
        r1.setQuantum_time(quantam);
        r1.round_robien();
        r1.print();

    }
}