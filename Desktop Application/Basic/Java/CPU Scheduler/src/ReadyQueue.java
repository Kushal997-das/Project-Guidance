import java.util.ArrayList;

public class ReadyQueue {

    private ArrayList<process> queue;

    public ReadyQueue()
    {
        queue = new ArrayList<>();
    }


    //Function to get process from the queue by remove it.
    public process dequeue()
    {
        process p = null;
        if (!isEmpty())
        {
            p = queue.get(0);
            queue.remove(p);
        }
        return p;
    }

    public void enqueue(process process)
    {
        //Check if the queue is empty of not, if empty so we will add the process(the only process in this case)
        if (queue.isEmpty()) {
            queue.add(process);
        }
        //If the queue does not contains the process passed to the function(enqueue), so we will add it but in order of priority
        else if(!this.contain(process)){
            int i;
            for (i = 0; i < queue.size(); i++) {
                if (queue.get(i).getPriority() > process.getPriority()) {
                    queue.add(i,process);
                    break;
                }
            }
            //If the queue is full and ordered so the process will added in the last index
            if(i == queue.size() ){
                queue.add(process);
            }
        }
    }


    //This function to check if the process in the queue by comparing the id of the processes
    private boolean contain(process process){
        for(process p : queue){
            if(p.getProcessID() == process.getProcessID())
                return true;
            return false;
        }
        return false;
    }

    public Boolean isEmpty()
    {
        return (queue.size() == 0);
    }

}
