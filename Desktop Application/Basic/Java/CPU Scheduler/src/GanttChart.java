public class GanttChart {

    private int inTime; // In is the time of entering the process (Start time)
    private int outTime; // Out the time of out the process (End time)
    private int processId;

    public GanttChart() {
        inTime = 0;
        outTime = 0;
        processId = 0;
    }

    //The GanttChart is only to simulate the real gantt chart draw and bounding the starting time and ending time of the process.
    public GanttChart(int inTime, int outTime, int processId) {
        this.inTime = inTime;
        this.outTime = outTime;
        this.processId = processId;
    }

    public int getInTime() {
        return inTime;
    }

    public void setInTime(int inTime) {
        this.inTime = inTime;
    }

    public int getOutTime() {
        return outTime;
    }

    public void setOutTime(int outTime) {
        this.outTime = outTime;
    }

    public int getProcessId() {
        return processId;
    }

    public void setProcessId(int processId) {
        this.processId = processId;
    }

    @Override
    public String toString() {
        return "|" + inTime + "| --P" + processId + "-- |" + outTime + "|";
    }


}
