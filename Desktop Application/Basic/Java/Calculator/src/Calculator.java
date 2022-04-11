import java.awt.*;
import java.awt.event.*;
class MyCal extends Frame implements ActionListener
{
	TextField T;
	Button b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18;
	double n1, n2;
    char op;
    Label L;
    MyCal()
    {
    	setSize(600, 600);
    	setVisible(true);
    	setLayout(null);
    	T= new TextField();
    	T.setBounds(50, 50, 232, 50);

    	//Adding a text field to display input and output
    	add(T);

    	//Create objects of all Buttons
    	b1=new Button("1");
    	b2=new Button("2");
    	b3=new Button("3");
    	b4=new Button("4");
    	b5=new Button("5");
    	b6=new Button("6");
    	b7=new Button("7");
    	b8=new Button("8");
    	b9=new Button("9");
    	b10=new Button("0");
    	b11=new Button("+");
    	b12=new Button("-");
    	b13=new Button("*");
    	b14=new Button("/");
    	b15=new Button("root");
        b16=new Button("Reset");
        b17=new Button("=");
        b18=new Button("Delete");
        
        //Dimension and position of first row of buttons
        b1.setBounds(50,100,70,20);
        b2.setBounds(130,100,70,20);
        b3.setBounds(210,100,70,20);

        //Dimension and position of second row of buttons
        b4.setBounds(50,150,70,20);
        b5.setBounds(130,150,70,20);
        b6.setBounds(210,150,70,20);

        //Dimension and position of third row of buttons
        b7.setBounds(50,200,70,20);
        b8.setBounds(130,200,70,20);
        b9.setBounds(210,200,70,20);

        //Dimension and position of fourth row of buttons
        b11.setBounds(50,250,70,20);
        b10.setBounds(130,250,70,20);
        b12.setBounds(210,250,70,20);
  
        //Dimension and position of fifth row of buttons
        b13.setBounds(50,300,70,20);
        b14.setBounds(130,300,70,20);
        b15.setBounds(210,300,70,20);

        //Dimension and position of sixth row of buttons
        b16.setBounds(50,350,70,20);
        b17.setBounds(130,350,70,20);
        b18.setBounds(210,350,70,20);

        //Adding buttons to the screen
        add(b1);
        add(b2);
        add(b3);
        add(b4);
        add(b5);
        add(b6);
        add(b7);
        add(b8);
        add(b9);
        add(b11);
        add(b10);
        add(b12);
        add(b13);
        add(b14);
        add(b15);
        add(b16);
        add(b17);
        add(b18);

        L=new Label("");

        //Method with anonymous class as argument
        addWindowListener(new WindowAdapter()
        {
           public void windowClosing(WindowEvent e)
           {
           	System.exit(0);
           }
        });
        
        L.setBounds(50,400,60,20);

        //Add a label to handle exception
        add(L);

        //Registering the buttons
        b1.addActionListener(this);
        b2.addActionListener(this);
        b3.addActionListener(this);
        b4.addActionListener(this);
        b5.addActionListener(this);
        b6.addActionListener(this);
        b7.addActionListener(this);
        b8.addActionListener(this);
        b9.addActionListener(this);
        b10.addActionListener(this);
        b11.addActionListener(this);
        b12.addActionListener(this);
        b13.addActionListener(this);
        b14.addActionListener(this);
        b15.addActionListener(this);
        b16.addActionListener(this);
        b17.addActionListener(this);
        b18.addActionListener(this);


    }

   public void actionPerformed(ActionEvent e)
   {
      String text=e.getActionCommand();
      char ch = text.charAt(0);
      L.setText("");
      if(Character.isDigit(ch)) //if a digit is clicked
      {
      	T.setText(T.getText()+ch);
      }
      if(ch=='+') //if plus symbol is clicked
      {
      	n1=Double.parseDouble(T.getText());
      	op='+';
      	T.setText("");
      }
      if(ch=='-') //if minus symbol is clicked
      {
      	n1=Double.parseDouble(T.getText());
      	op='-';
      	T.setText("");
      }
      if(ch=='*') //if multiplication symbol is clicked
      {
      	n1=Double.parseDouble(T.getText());
      	op='*';
      	T.setText("");
      }
      if(ch=='/') //if division symbol is clicked
      {
      	n1=Double.parseDouble(T.getText());
      	op='/';
      	T.setText("");
      }
      if(ch=='r') //if root button is clicked
      {
      	n1=Double.parseDouble(T.getText());
      	op='r';
      	T.setText("");
      }
      if(ch=='R') //if Reset button is clicked
      {
        T.setText("");
      }
      if(ch=='D') //if Delete button is clicked
      {
      	String txt= T.getText();
      	int l= txt.length();
      	String nwtxt="";
      	if(l>=1)
      	{
      	   for(int i=0; i<(l-1); i++)
      	   {
      		   nwtxt=nwtxt+txt.charAt(i);
      		   T.setText(nwtxt);
      	   }
        }
        if(txt.length()==1||txt.length()==0) 
        {
        	T.setText("");
        }
      }

      if(ch=='=') //if equals sign is clicked
      {
      	if(op=='+') //result for addition
      	{
      		n2=Double.parseDouble(T.getText());
      		T.setText(((double)n1)+n2+"");
      	}
      	if(op=='-') //result for subtraction
      	{
      		n2=Double.parseDouble(T.getText());
      		T.setText(((double)n1)-n2+"");
      	}
      	if(op=='*') //result for multiplication
      	{
      		n2=Double.parseDouble(T.getText());
      		T.setText(((double)n1)*n2+"");
      	}
      	if(op=='r') //result for root
      	{
      		n2=Double.parseDouble(T.getText());
      		int res=(int)Math.pow(n1, (1.0/n2));
      		T.setText(res+"");

      	}
      	if(op=='/') //result for division
      	{
      		n2=Double.parseDouble(T.getText());
      		//Exception handling
      		try
      		{
      			T.setText(((double)n1)/n2+"");

      		}
      		catch (Exception ee)
      		{
      			L.setText("Error occured");
      		}
      	}  	
      }
   }
}
class Test
{
	public static void main(String args[])
	{
		new MyCal();
	}
}
