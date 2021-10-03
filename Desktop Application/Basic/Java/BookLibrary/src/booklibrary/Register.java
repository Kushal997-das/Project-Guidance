/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package booklibrary;

/**
 *
 * @author surbh
 */
import bInterface.BookInterface;
import entity.LoginEntity;
import impl.Impl;
import java.awt.Font;
import javax.swing.*;
import java.awt.event.*;
import static javax.swing.JFrame.EXIT_ON_CLOSE;
public class Register extends JFrame implements ActionListener{
    JLabel name,title,fn,un,pass,cpass,ph,gender,email;
    JTextField txtfn,txtun,txtph,txtem;
    JRadioButton male,female,others;
    JPasswordField txtpass,txtcpass;
    JComboBox phn;
    JButton sum;
    ButtonGroup bg;
    BookInterface bi = new Impl();
    
    public Register()
    {
        name = new JLabel("Welcome to NEWSGyan");
        title = new JLabel("Register");
        fn = new JLabel("name:");
        un = new JLabel("username:");
        pass = new JLabel("Password:");
        cpass = new JLabel("Confirm Password:");
        ph = new JLabel("Phone no:");
        gender=new JLabel("Gender:");
        email = new JLabel("email:");
        String ss[] = {"","+977","+91"};
        phn = new JComboBox(ss);
        bg=new ButtonGroup();
        txtfn=new JTextField();
        txtun=new JTextField();
        txtph=new JTextField();
        txtem = new JTextField();
        male=new JRadioButton("Male");
        female=new JRadioButton("Female");
        others = new JRadioButton("others");
        sum=new JButton("Register");
        txtpass=new JPasswordField();
        txtcpass=new JPasswordField();
        
        setLayout(null);
        setSize(1000,1000);
        setTitle("Registration Form");
        setVisible(true);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        
        name.setBounds(200,50,550,50);
        name.setFont(new Font("Times New Roman",Font.BOLD,50));
        add(name);
        
        title.setBounds(350,130,550,55);
        title.setFont(new Font("Times New Roman",Font.BOLD,55));
        add(title);
        
        fn.setBounds(100,220,200,35);
        fn.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(fn);
        txtfn.setBounds(270,220,180,35);
        add(txtfn);
        
        un.setBounds(100,280,200,35);
        un.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(un);
        txtun.setBounds(270,280,180,35);
        add(txtun);
        
        pass.setBounds(100,340,200,35);
        pass.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(pass);
        txtpass.setBounds(270,340,180,35);
        add(txtpass);
        
        cpass.setBounds(100,400,300,35);
        cpass.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(cpass);
        txtcpass.setBounds(400,400,180,35);
        add(txtcpass);
        
        ph.setBounds(100,460,200,35);
        ph.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(ph);
        phn.setBounds(270,460,50,35);
        add(phn);
        txtph.setBounds(330,460,180,35);
        add(txtph);
        
        gender.setBounds(100,520,200,35);
        gender.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(gender);
        bg.add(male);
        bg.add(female);
        bg.add(others);
        male.setBounds(250,525,100,25);
        male.setFont(new Font("Times New Roman",Font.BOLD,25));
        add(male);
        female.setBounds(350,525,150,25);
        female.setFont(new Font("Times New Roman",Font.BOLD,25));
        add(female);
        others.setBounds(500,525,200,25);
        others.setFont(new Font("Times New Roman",Font.BOLD,25));
        add(others);
        
        email.setBounds(100,580,200,35);
        email.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(email);
        txtem.setBounds(270,580,180,35);
        add(txtem);
        
        sum.setBounds(250,680,200,40);
        sum.setFont(new Font("Times New Roman",Font.BOLD,40));
        add(sum);
        sum.addActionListener(this);
    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==sum)
        {
            String name = txtfn.getText();
            String username = txtun.getText();
            String password = txtpass.getText();
            String cpass = txtcpass.getText();
            String phone = phn.getSelectedItem().toString();
            String phno = txtph.getText();
            String gender = null;
            if(male.isSelected())
            {
                gender = "male";
            }
            else if(female.isSelected())
            {
                gender = "female";
            }
            else if(others.isSelected())
            {
                gender = "others";
            }
            String email = txtem.getText();
            if(password.equals(cpass))
            {
                LoginEntity le = new LoginEntity(0, username, password, name, email, phone+" "+phno, gender);
                if(bi.login(username))
                {
                    if(bi.insertUser(le))
                    {
                        JOptionPane.showMessageDialog(null,"registered successfully");
                        new Login();
                        dispose();
                    }
                    else
                    {
                        JOptionPane.showMessageDialog(null,"registered failed");
                    }
                }
                else
                {
                    JOptionPane.showMessageDialog(null,"please enter unique username");
                }
            }
            else
            {
                JOptionPane.showMessageDialog(null,"password doesnot match");
            }
        }
    }   
}
