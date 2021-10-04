/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package booklibrary;

import bInterface.BookInterface;
import entity.BookEntity;
import impl.Impl;
import java.awt.Font;
import java.awt.event.*;
import javax.swing.*;

/**
 *
 * @author surbh
 */
public class BookLibrary extends JPanel implements ActionListener{
    BookInterface in = new Impl();
    JLabel name,author,description,no_of_books,title,fact,id;
    JComboBox faculty;
    JButton addBook,search;
    JTextField txtna,txtau,txtde,txtno,txts,txtid;
    
    public BookLibrary()
    {
        title = new JLabel("AddBook");
        id = new JLabel("Book Id:");
        name = new JLabel("Book Name:");
        author = new JLabel("Book Author:");
        description = new JLabel("Book Description:");
        no_of_books = new JLabel("no.of books:");
        fact = new JLabel("faculty:");
        String ss[] = {"","science","management","physics","maths","computer"};
        faculty = new JComboBox(ss);
        txtid = new JTextField();
        txtna=new JTextField();
        txtau=new JTextField();
        txtde=new JTextField();
        txtno = new JTextField();
        txts = new JTextField();
        addBook=new JButton("add book");
        search=new JButton("search");
        
        setLayout(null);
        setSize(1000,1000);
        setVisible(true);
        
        title.setBounds(350,130,550,55);
        title.setFont(new Font("Times New Roman",Font.BOLD,55));
        add(title);
        
        id.setBounds(100,220,200,35);
        id.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(id);
        txtid.setBounds(380,220,180,35);
        add(txtid);
        
        name.setBounds(100,280,200,35);
        name.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(name);
        txtna.setBounds(380,280,180,35);
        add(txtna);
        
        author.setBounds(100,340,250,35);
        author.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(author);
        txtau.setBounds(380,340,180,35);
        add(txtau);
        
        description.setBounds(100,400,300,35);
        description.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(description);
        txtde.setBounds(380,400,250,35);
        add(txtde);
        
        no_of_books.setBounds(100,460,250,35);
        no_of_books.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(no_of_books);
        txtno.setBounds(380,460,180,35);
        add(txtno);
        
        fact.setBounds(100,520,250,35);
        fact.setFont(new Font("Times New Roman",Font.BOLD,35));
        add(fact);
        faculty.setBounds(380,520,200,35);
        add(faculty);
        
        addBook.setBounds(250,680,200,40);
        addBook.setFont(new Font("Times New Roman",Font.BOLD,40));
        add(addBook);
        addBook.addActionListener(this);
        
        
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==addBook)
        {
            String id = txtid.getText();
            String name = txtna.getText();
            String author = txtau.getText();
            String fact = faculty.getSelectedItem().toString();
            String desc = txtde.getText();
            int no = Integer.parseInt(txtno.getText());
            BookEntity be = new BookEntity(id,name,author,fact,desc,no);
            BookEntity bee=in.search(id);
            if(bee==null)
            {
                in.insert(be);
                JOptionPane.showMessageDialog(null, "book added successfully");
            }
            else
            {
                int total=bee.getNoOfBooks()+no;
                in.update(id, total);
                JOptionPane.showMessageDialog(null, "book updated successfully");
            }
        }                
    }  
}
