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
import entity.BookEntity;
import impl.Impl;
import javax.swing.*;
import java.awt.event.*;
import java.util.List;
import javax.swing.table.DefaultTableModel;

public class ViewStock extends JPanel{
    JTable tb;
    DefaultTableModel model = new DefaultTableModel();
    JScrollPane jsp;
    BookInterface bi = new Impl();
    
    public ViewStock()
    {
        tb = new JTable(model);
        int h = ScrollPaneConstants.HORIZONTAL_SCROLLBAR_ALWAYS;
        int v = ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS;
        jsp = new JScrollPane(tb,v,h);
        setLayout(null);
        setSize(1000,1000);
        setVisible(true);
        
        add(jsp).setBounds(10,10,900,900);
        model.addColumn("Book Id");
        model.addColumn("Book Name");
        model.addColumn("Faculty");
        model.addColumn("Book Amount");
        model.addColumn("author");
        
        List<BookEntity> list = bi.getAll();
        for (BookEntity ob : list) {
            model.addRow(new Object[]{ob.getId(),ob.getName(),ob.getFaculty(),ob.getNoOfBooks(),ob.getAuthor()});
        }
    }
}
