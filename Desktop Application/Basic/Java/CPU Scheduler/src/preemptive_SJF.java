
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;


public class Preemptive_SJF {
    public  ArrayList <process> processes=new ArrayList<>();
    int totaltime=0;
    int context_switching=0;

    public int getContext_switching() {
        return context_switching;
    }

    public void setContext_switching(int context_switching) {
        this.context_switching = context_switching;
    }

    public int zeronum ()
    {
        int n=0;
        for (int i=0;i<processes.size();i++)
        {
            if (processes.get(i).getArrive_time()==0)
                n++;
        }
        return n;
    }
    public void zero_sjf ()
    {
        Collections.sort(processes, Comparator.comparing(process :: getBurset_time));
        for (int i=0;i<processes.size();i++)
        {
            System.out.println("Process :"+processes.get(i).getName()+" is running");
            System.out.println("Process :"+processes.get(i).getName()+" is terminated");
            totaltime+=processes.get(i).getBurset_time()+context_switching;
            processes.get(i).setTurn_round_time(totaltime);
            processes.get(i).setBurset_time(0);
        }
    }
    private process find_min (int n)
    {
        ArrayList <process> pop=new ArrayList<>();
        process pp=processes.get(0);
        for (int i=1;i<processes.size();i++)
        {
            if (processes.get(i).getArrive_time()<=n )
                pop.add(processes.get(i));
        }

        for (int i=0;i<pop.size();i++)
        {
            if (pop.get(i).getBurset_time()==0)
                pop.remove(i);
        }

        if (pop.size()==0)
            return null;
        pp=pop.get(0);
        for (int i=1;i<pop.size();i++)
        {
            if (pop.get(i).getBurset_time()<pp.getBurset_time())
                pp=pop.get(i);
        }
        return pp;
    }
    private  ArrayList<process> find_min_burset()
    {
        ArrayList <Integer> tim=new ArrayList<>();
        ArrayList <process> all=new ArrayList<>();
        for (int i=0;i<processes.size();i++)
        {
            tim.add(processes.get(i).getBurset_time());
        }
        Collections.sort(tim);
        for (int i=0;i<processes.size();i++)
        {
            for (int r=0;r<processes.size();r++)
            {
                if (processes.get(r).burset_time==tim.get(i))
                    all.add(processes.get(r));
            }
        }
        return all;
    }
    private  int sum ()
    {
        int s=0;
        for (int i=0;i<processes.size();i++)
        {
            if (processes.get(i).getArrive_time()>s)
                s=processes.get(i).getArrive_time();
        }
        return  s;
    }
    private  process find_arrive (int arrive)
    {
        for (int i=0;i<processes.size();i++)
        {
            if (processes.get(i).arrive_time==arrive)
                return processes.get(i);
        }
        return null;
    }

    private  process find_process_arrive (process p1)
    {
        process p2;
        ArrayList <process> pop=new ArrayList<>();
        for (int i=0;i<processes.size();i++)
        {
            if (processes.get(i).getArrive_time()==p1.getArrive_time())
            {
                pop.add(processes.get(i));
            }
        }
        for (int i=0;i<pop.size();i++)
        {
            if (pop.get(i).getBurset_time()==0)
                pop.remove(i);
        }

        if (pop.size()==0)
            return null;
        p2=pop.get(0);
        for (int i=1;i<pop.size();i++)
        {
            if (pop.get(i).getBurset_time()<p2.getBurset_time())
                p2=pop.get(i);
        }
        return p2;

    }
    public  void SJF()
    {
        Collections.sort(processes, Comparator.comparing(process :: getArrive_time));
        int time=sum(),temp;
        process p1=processes.get(0),p2=new process();
        temp=p1.getBurset_time();
        p1.setBurset_time(--temp);
        totaltime++;
        System.out.println("1-Process "+p1.getName()+" is running");
        for (int i=1;i<=time;i++)
        {
            p2=find_arrive(i);
            if (p2==null && p1.getBurset_time()!=0) {
                temp=p1.getBurset_time();
                p1.setBurset_time(--temp);
                totaltime++;
                System.out.println("2-Process "+p1.getName()+" is running");
                continue;
            }
            else
            {
                if ( p2!=null && p1.getBurset_time()<p2.getBurset_time() && p1.getBurset_time()!=0 )
                {
                    temp=p1.getBurset_time();
                    p1.setBurset_time(--temp);
                    totaltime++;
                    System.out.println("3-Process "+p1.getName()+"is running");
                    continue;
                }
                else if (  p2!=null &&p1.getBurset_time()>p2.getBurset_time())
                {
                    System.out.println("4-Process "+p1.getName()+"is waiting");
                    p1=p2;
                    temp=p1.getBurset_time();
                    p1.setBurset_time(--temp);
                    System.out.println("5-Process "+p2.getName()+"is running");
                    totaltime+=context_switching;
                    totaltime++;
                }
                else
                {

                    if (p1.getBurset_time()==0)
                    {
                        int e=processes.indexOf(p1);
                        processes.get(e).setTurn_round_time(totaltime);
                        System.out.println("6-Process "+p1.getName()+"is terminated");
                        if (p1==processes.get(processes.size()-1))
                        {
                            SJF_continue(p1);
                            return;
                        }
                        else
                        {
                            if (p2==null)
                            {
                                int f=processes.indexOf(p1);
                                int y=processes.get(f).getArrive_time();
                                process k1,k2;
                                k1=find_process_arrive(p1);
                                k2=find_min(y);//in case no process exist before it//
                                if (k1==null && k2==null)
                                {
                                    p1=find_min(i);
                                }
                                else if (k1==null)
                                    p1=k2;
                                else if (k2==null)
                                    p1=k1;
                                else if (k1.getBurset_time()<k2.getBurset_time())
                                    p1=k1;
                                else
                                    p1=k2;

                                if (p1.getBurset_time()==0)
                                {
                                    p1=find_arrive(i);
                                    i++;
                                    totaltime++;
                                    while (p1!=null)
                                    {
                                        p1=find_arrive(i);
                                        i++;
                                        totaltime++;
                                    }
                                    temp=p1.getBurset_time();
                                    p1.setBurset_time(--temp);
                                    totaltime+=context_switching;
                                    totaltime++;
                                    System.out.println("7-Process "+p1.getName()+" is running");
                                }
                                else{
                                    temp=p1.getBurset_time();
                                    p1.setBurset_time(--temp);
                                    System.out.println("8-Process "+p1.getName()+"is running");
                                    totaltime+=context_switching;
                                    totaltime++;
                                }
                            }
                            else
                            {
                                int f=processes.indexOf(p2);
                                int y=processes.get(f).getArrive_time();
                                p1=find_min(y);
                                temp=p1.getBurset_time();
                                p1.setBurset_time(--temp);
                                System.out.println("9-Process "+p1.getName()+"is running");
                                totaltime+=context_switching;
                                totaltime++;
                            }

                        }
                    }
                }
            }
            if (p2==processes.get(processes.size()-1))
                break;
        }
        SJF_continue (p1);
    }

    public  void  SJF_continue (process p1)
    {
        int y= processes.indexOf(p1),remain;
        remain=p1.getBurset_time();

        for (int i=0;i<remain;i++)
            System.out.println("10-Process "+p1.getName()+" is running");

        totaltime+=remain;
        processes.get(y).setTurn_round_time(totaltime);
        processes.get(y).setBurset_time(0);
        System.out.println("11-Process " + p1.getName() + "is terminated");
        totaltime+=context_switching;

        ArrayList<process> p2 = find_min_burset();
        for (int i=0;i<p2.size();i++) {
            if ( p2.get(i).getBurset_time() != 0 ) {
                remain=p2.get(i).getBurset_time();
                for (int q=0;q<remain;q++)
                    System.out.println("12-Process "+ p2.get(i).getName()+" is running");
                y = processes.indexOf(p2.get(i));
                processes.get(y).setBurset_time(0);
                totaltime+=remain;
                processes.get(y).setTurn_round_time(totaltime);
                totaltime+=context_switching;
                System.out.println("13-Process " + p2.get(i).getName() + "is terminated");
            }
        }
    }
    public double calculate_average_waiting() {
        double av=0;

        for (int i = 0; i < processes.size(); i++) {
            av+=processes.get(i).getTurn_round_time()-processes.get(i).getTemp_burset_time();
        }
        return (av/processes.size());
    }
    public double calculate_average_turnround() {
        double av=0;

        for (int i = 0; i < processes.size(); i++) {
            av+=processes.get(i).getTurn_round_time();
        }
        return (av/processes.size());
    }
    public  void print()
    {
        for (int i=0;i<processes.size();i++)
        {
            System.out.print("Burset time: "+processes.get(i).getTemp_burset_time()+"  ");
            System.out.print("process name: "+processes.get(i).getName()+"  ");
            System.out.print("turn round time: "+processes.get(i).getTurn_round_time()+" ");
            System.out.print("waiting time: "+(processes.get(i).getTurn_round_time()-processes.get(i).getTemp_burset_time())+"\n");

        }
        System.out.println("average waiting time : "+calculate_average_waiting());
        System.out.println("average turn_round_time : "+calculate_average_turnround());
    }
}
