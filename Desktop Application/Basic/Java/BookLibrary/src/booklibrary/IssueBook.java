/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package booklibrary;

import bInterface.BookInterface;
import entity.BookEntity;
import entity.Issue;
import impl.Impl;
import java.awt.Font;
import javax.swing.*;
import java.awt.event.*;
import java.util.*;
/**
 *
 * @author surbh
 */
public class IssueBook extends JPanel implements ActionListener{
    BookInterface bi = new Impl();
    JLabel studentid,name,address,gender,phone,bookid,bookname,title,fact;
    JTextField txtsid,txtna,txtad,txtph,txtbid,txtbna;
    JComboBox faculty,phn;
    JRadioButton male,female,others;
    JButton issuebook;
    ButtonGroup bg;
    
    public IssueBook()
    {
        title = new JLabel("IssueBook");
        studentid = new JLabel("Student Id:");
        name = new JLabel("Name:");
        address = new JLabel("address:");
        phone = new JLabel("Phone no:");
        gender=new JLabel("Gender:"); 
        bookid = new JLabel("BookId:");
        bookname = new JLabel("BookName:");
        fact = new JLabel("faculty:");
        String ss[] = {"","+977","+91"};
        phn = new JComboBox(ss);
        bg=new ButtonGroup();
        String aa[] = {"","science","management","maths","computer","nepali"};
        faculty = new JComboBox(aa);
        txtsid = new JTextField();
        txtna = new JTextField();
        txtad = new JTextField();
        txtph=new JTextField();
        txtbid = new JTextField();
        txtbna = new JTextField();                
        male=new JRadioButton("Male");
        female=new JRadioButton("Female");
        others = new JRadioButton("others");
        issuebook=new JButton("Issue book");
        
        setLayout(null);
        setSize(1000,1000);
        setVisible(true);
        
        title.setBounds(320,50,550,50);
        title.setFont(new Font("Times New Roman",Font.BOLD,50));
        add(title);
        
        studentid.setBounds(100,180,200,35);
        studentid.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(studentid);
        txtsid.setBounds(290,180,180,35);
        add(txtsid);
        
        name.setBounds(100,240,200,35);
        name.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(name);
        txtna.setBounds(290,240,180,35);
        add(txtna);
        
        address.setBounds(100,300,200,35);
        address.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(address);
        txtad.setBounds(290,300,180,35);
        add(txtad);
        
        phone.setBounds(100,360,200,35);
        phone.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(phone);
        phn.setBounds(270,360,65,35);
        add(phn);
        txtph.setBounds(340,360,180,35);
        add(txtph);
        
        gender.setBounds(100,420,200,35);
        gender.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(gender);
        bg.add(male);
        bg.add(female);
        bg.add(others);
        male.setBounds(250,425,100,25);
        male.setFont(new Font("Times New Roman",Font.BOLD,25));
        add(male);
        female.setBounds(350,425,150,25);
        female.setFont(new Font("Times New Roman",Font.BOLD,25));
        add(female);
        others.setBounds(500,425,200,25);
        others.setFont(new Font("Times New Roman",Font.BOLD,25));
        add(others);
        
        bookid.setBounds(100,480,200,35);
        bookid.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(bookid);
        txtbid.setBounds(290,480,180,35);
        add(txtbid);
        
        bookname.setBounds(100,540,200,35);
        bookname.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(bookname);
        txtbna.setBounds(290,540,180,35);
        add(txtbna);
        
        fact.setBounds(100,600,200,35);
        fact.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(fact);
        faculty.setBounds(290,600,200,35);
        add(faculty);
        
        issuebook.setBounds(250,700,250,40);
        issuebook.setFont(new Font("Times New Roman",Font.BOLD,40));
        add(issuebook);
        issuebook.addActionListener(this);
    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==issuebook)
        {
            String name = txtna.getText();
            String address = txtad.getText();
            String bookname = txtbna.getText();
            String fact = faculty.getSelectedItem().toString();
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
            String bid = txtbid.getText();
            java.util.Date date = new java.util.Date(new java.util.Date().getTime());
            int sid = Integer.parseInt(txtsid.getText());
            BookEntity be = bi.check(bid);
            Issue is = new Issue(sid, name, address, fact, gender, phone+" "+phno, bid, bookname, date+"", null, "Not Returned");
            if(be!=null)
            {
                if(be.getNoOfBooks()>=1)
                {
                    if(bi.checkstatus(sid,"Not Returned"))
                    {
                        JOptionPane.showMessageDialog(null,"please return previous book before issuing another book");
                    }
                    else
                    {
                        if(bi.issuebook(is))
                        {
                            int total = be.getNoOfBooks()-1;
                            if(bi.update(bid, total))
                            {
                                JOptionPane.showMessageDialog(null,"requested book is isssued successfully");
                            }
                        }
                        else
                        {
                            JOptionPane.showMessageDialog(null,"requested book issued failed");
                        }
                    }
                }
                else
                {
                    JOptionPane.showMessageDialog(null,"requested book amount is not sufficient ");
                }
            }
            else
            {
                JOptionPane.showMessageDialog(null,"requested book is not available");
            }
        }
    }   
}
