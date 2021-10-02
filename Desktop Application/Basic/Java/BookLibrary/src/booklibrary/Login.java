/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package booklibrary;

import bInterface.BookInterface;
import entity.LoginEntity;
import impl.Impl;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import static javax.swing.JFrame.EXIT_ON_CLOSE;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

/**
 *
 * @author surbh
 */
public class Login extends JFrame implements ActionListener{
    JLabel name,title,un,pass;
    JTextField txtun;
    JPasswordField txtpass;
    JButton log,signup;
    BookInterface bi = new Impl();
    
    public Login()
    {
        title = new JLabel("Login");
        un = new JLabel("username:");
        pass = new JLabel("Password:");
        log=new JButton("Login");
        signup = new JButton("New User?Regiter here...");
        txtun=new JTextField();
        txtpass=new JPasswordField();
        
        setLayout(null);
        setSize(1000,1000);
        setTitle("Login Form");
        setVisible(true);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        
        title.setBounds(350,130,550,55);
        title.setFont(new Font("Times New Roman",Font.BOLD,55));
        add(title);
        
        un.setBounds(150,300,200,35);
        un.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(un);
        txtun.setBounds(350,300,180,35);
        add(txtun);
        
        pass.setBounds(150,380,200,35);
        pass.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(pass);
        txtpass.setBounds(350,380,180,35);
        add(txtpass);
        
        log.setBounds(250,480,180,40);
        log.setFont(new Font ("Times New Roman",Font.BOLD,40));
        add(log);
        log.addActionListener(this);
        
        signup.setBounds(250,550,500,40);
        signup.setFont(new Font("Times New Roman",Font.BOLD,40));
        add(signup);
        signup.addActionListener(this);
    }
    
    public static void main(String[] args) {
        new Login();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==log)
        {
            String un = txtun.getText();
            String pass = txtpass.getText();
            LoginEntity le = bi.getById(un, pass);
            if(le==null)
            {
                JOptionPane.showMessageDialog(null,"login failed");
            }
            else
            {
                JOptionPane.showMessageDialog(null,"welcome to home page" +le.getUsername());
                new Call();
                dispose();
            }
        }
        
        if(e.getSource()==signup)
        {
            new Register();
            dispose();
        }
    }
}
