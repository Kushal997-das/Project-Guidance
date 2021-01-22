import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class RoundRobin {
    public ArrayList<process> round_processes=new ArrayList<>();
    private int Quantum_time;
    private int total_time;

    public void setContext_switching(int context_switching) {
        this.context_switching = context_switching;
    }

    public int getContext_switching() {
        return context_switching;
    }

    private int context_switching;
    void setQuantum_time(int q)
    {
        this.Quantum_time=q;
    }
    private void sort_process ()
    {
        Collections.sort(round_processes, Comparator.comparing(process :: getArrive_time));
    }
    void round_robien ()
    {
        sort_process();
        int flag=0,i=0,temp;
        while (flag!=round_processes.size())
        {
            if (round_processes.get(i).getBurset_time()!=0)
            {

                if (round_processes.get(i).getBurset_time()>=Quantum_time)
                {
                    System.out.println("process :"+round_processes.get(i).getName()+"is running");
                    total_time+=Quantum_time;
                    temp=round_processes.get(i).getBurset_time();
                    temp-=Quantum_time;
                    round_processes.get(i).setBurset_time(temp);
                    if (temp==0)
                    {
                        flag++;
                        round_processes.get(i).setTurn_round_time(total_time);
                        System.out.println("process :"+round_processes.get(i).getName()+"is terminated");
                        i++;
                    }
                    else {
                        System.out.println("process :"+round_processes.get(i).getName()+"is waiting");
                        i++;}
                    total_time+=context_switching;

                }
                else if (round_processes.get(i).getBurset_time()<Quantum_time)
                {
                    System.out.println("process :"+round_processes.get(i).getName()+"is running");
                    total_time+=round_processes.get(i).getBurset_time();
                    round_processes.get(i).setBurset_time(0);
                    round_processes.get(i).setTurn_round_time(total_time);
                    flag++;
                    System.out.println("process :"+round_processes.get(i).getName()+"is terminated");
                    i++;
                    total_time+=context_switching;
                }
            }
            else
                i++;
            if (i==round_processes.size())
                i=0;
        }
    }
    public double calculate_average_waiting() {
        double av=0;

        for (int i = 0; i < round_processes.size(); i++) {
            av+=round_processes.get(i).getTurn_round_time()-round_processes.get(i).getTemp_burset_time();
        }
        return (av/round_processes.size());
    }
    public double calculate_average_turnround() {
        double av=0;

        for (int i = 0; i < round_processes.size(); i++) {
            av+=round_processes.get(i).getTurn_round_time();
        }
        return (av/round_processes.size());
    }
    public void print ()
    {
        for (int i=0;i<round_processes.size();i++)
        {
            System.out.print("Name: "+round_processes.get(i).getName()+" ");
            System.out.println("turn round time: "+round_processes.get(i).getTurn_round_time());
            System.out.print("waiting time: "+(round_processes.get(i).getTurn_round_time()-round_processes.get(i).getTemp_burset_time())+"\n");
        }
        System.out.println("average waiting time : "+calculate_average_waiting());
        System.out.println("average turn_round_time : "+calculate_average_turnround());
    }
}
