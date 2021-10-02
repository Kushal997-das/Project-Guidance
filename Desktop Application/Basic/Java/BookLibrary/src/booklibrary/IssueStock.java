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
import entity.Issue;
import impl.Impl;
import javax.swing.*;
import java.awt.event.*;
import java.util.List;
import javax.swing.table.DefaultTableModel;

public class IssueStock extends JPanel{
    JTable tb;
    DefaultTableModel model = new DefaultTableModel();
    JScrollPane jsp;
    BookInterface bi = new Impl();
    
    public IssueStock()
    {
        tb = new JTable(model);
        int h = ScrollPaneConstants.HORIZONTAL_SCROLLBAR_ALWAYS;
        int v = ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS;
        jsp = new JScrollPane(tb,v,h);
        setLayout(null);
        setSize(2000,2000);
        setVisible(true);
        
        add(jsp).setBounds(10,10,1900,1900);
        model.addColumn("Student Id");
        model.addColumn("Name");
        model.addColumn("Address");
        model.addColumn("Faculty");
        model.addColumn("Gender");
        model.addColumn("Phone");
        model.addColumn("Book Id");
        model.addColumn("Book Name");
        model.addColumn("Issue Date");
        model.addColumn("Return Date");
        model.addColumn("Status");
        
        List<Issue> list = bi.getAl();
        for (Issue ob : list) {
            model.addRow(new Object[]{ob.getStudentid(),ob.getName(),ob.getAddress(),ob.getFaculty(),ob.getGender(),ob.getPhone(),ob.getBookid(),ob.getBookname(),ob.getIssue_date(),ob.getReturn_date(),ob.getStatus()});
        }
    }
}
