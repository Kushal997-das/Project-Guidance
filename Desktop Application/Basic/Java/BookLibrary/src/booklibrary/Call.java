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
import javax.swing.*;
public class Call extends JFrame{
    JTabbedPane jt;
     
    public Call()
    {
        jt = new JTabbedPane();
        jt.addTab("Add Book", new BookLibrary());
        jt.addTab("Issue Book", new IssueBook());
        jt.addTab("Return Book", new ReturnBook());
        jt.addTab("View Stock", new ViewStock());
        jt.addTab("View Issue History", new IssueStock());
        jt.addTab("Logout", new logout());
        add(jt);
        
        setVisible(true);
        setSize(1000,1000);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setTitle("Library Management System");
    }
    
}
