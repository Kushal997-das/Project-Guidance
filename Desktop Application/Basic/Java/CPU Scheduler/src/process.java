public class process {
    String name;
    int burset_time;
    int arrive_time;
    int waiting_time;
    int turn_round_time;
    int temp_time;
    int queueNumber;
    
    //Priority Algorithm
    private int processID;
    private int priority;

    public process() {
        this.processID = 0;
        this.priority = 0;
        this.arrive_time = 0;
        this.burset_time = 0;
    }

    public process(String name, int burset_time, int arrive_time) {
        this.arrive_time = arrive_time;
        this.burset_time = burset_time;
        this.name = name;
        this.temp_time = burset_time;
    }

    public process(String name, int burset_time, int arrive_time, int queueNumber) {
        this.name = name;
        this.burset_time = burset_time;
        this.arrive_time = arrive_time;
        this.queueNumber = queueNumber;
    }

    public process(int processID, int priority, int arrivingTime, int burstTime) {
        this.processID = processID;
        this.priority = priority;
        this.arrive_time = arrivingTime;
        this.burset_time = burstTime;
    }

    public int getProcessID() {
        return processID;
    }

    public void setProcessID(int processID) {
        this.processID = processID;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setWaiting_time(int waiting_time) {
        this.waiting_time = waiting_time;
    }

    public void setTurn_round_time(int turn_round_time) {
        this.turn_round_time = turn_round_time;
    }

    public void setTemp_burset_time(int temp_burset_time) {
        this.temp_time = temp_burset_time;
    }

    public int getWaiting_time() {
        return waiting_time;
    }

    public int getTurn_round_time() {
        return turn_round_time;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBurset_time(int burset_time) {
        this.burset_time = burset_time;
    }

    public void setArrive_time(int arrive_time) {
        this.arrive_time = arrive_time;
    }

    public int getBurset_time() {
        return burset_time;
    }

    public int getTemp_burset_time() {
        return temp_time;
    }

    public int getArrive_time() {
        return arrive_time;
    }

    public int getQueueNumber() {
        return queueNumber;
    }

    public void setQueueNumber(int queueNumber) {
        this.queueNumber = queueNumber;
    }

    public void reduceTime(int time) {
        if(burset_time >= time)
            burset_time = burset_time - time;
    }
}
