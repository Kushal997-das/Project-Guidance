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
import entity.Issue;
import impl.Impl;
import java.awt.Font;
import javax.swing.*;
import java.awt.event.*;
import static javax.swing.JFrame.EXIT_ON_CLOSE;

public class ReturnBook extends JPanel implements ActionListener {

    BookInterface bi = new Impl();
    JLabel name, address, gender, phone, bookid, bookname, title, fact, idate;
    JTextField txtsid, txtna, txtad, txtph, txtbid, txtbna, txtdate;
    JComboBox faculty, phn;
    JRadioButton male, female, others;
    JButton ret, search;
    ButtonGroup bg;

    public ReturnBook() {
        title = new JLabel("ReturnBook");
        name = new JLabel("Name:");
        address = new JLabel("address:");
        phone = new JLabel("Phone no:");
        gender = new JLabel("Gender:");
        bookid = new JLabel("BookId:");
        bookname = new JLabel("BookName:");
        fact = new JLabel("faculty:");
        idate = new JLabel("Issue Date:");
        String ss[] = {"", "+977", "+91"};
        phn = new JComboBox(ss);
        bg = new ButtonGroup();
        String aa[] = {"", "science", "management", "maths", "computer", "nepali"};
        faculty = new JComboBox(aa);
        txtsid = new JTextField();
        txtna = new JTextField();
        txtad = new JTextField();
        txtph = new JTextField();
        txtbid = new JTextField();
        txtbna = new JTextField();
        txtdate = new JTextField();
        male = new JRadioButton("Male");
        female = new JRadioButton("Female");
        others = new JRadioButton("others");
        ret = new JButton("Return book");
        search = new JButton("Search");

        setLayout(null);
        setSize(1000, 1000);
        setVisible(true);

        title.setBounds(320, 50, 550, 50);
        title.setFont(new Font("Times New Roman", Font.BOLD, 50));
        add(title);

        name.setBounds(100, 240, 200, 35);
        name.setFont(new Font("Times New Roman", Font.BOLD, 35));
        add(name);
        txtna.setBounds(290, 240, 180, 35);
        add(txtna);

        address.setBounds(100, 300, 200, 35);
        address.setFont(new Font("Times New Roman", Font.BOLD, 35));
        add(address);
        txtad.setBounds(290, 300, 180, 35);
        add(txtad);

        phone.setBounds(100, 360, 200, 35);
        phone.setFont(new Font("Times New Roman", Font.BOLD, 35));
        add(phone);
        phn.setBounds(270, 360, 65, 35);
        add(phn);
        txtph.setBounds(340, 360, 180, 35);
        add(txtph);

        gender.setBounds(100, 420, 200, 35);
        gender.setFont(new Font("Times New Roman", Font.BOLD, 35));
        add(gender);
        bg.add(male);
        bg.add(female);
        bg.add(others);
        male.setBounds(250, 425, 100, 25);
        male.setFont(new Font("Times New Roman", Font.BOLD, 25));
        add(male);
        female.setBounds(350, 425, 150, 25);
        female.setFont(new Font("Times New Roman", Font.BOLD, 25));
        add(female);
        others.setBounds(500, 425, 200, 25);
        others.setFont(new Font("Times New Roman", Font.BOLD, 25));
        add(others);

        bookid.setBounds(100, 480, 200, 35);
        bookid.setFont(new Font("Times New Roman", Font.BOLD, 35));
        add(bookid);
        txtbid.setBounds(290, 480, 180, 35);
        add(txtbid);

        bookname.setBounds(100, 540, 200, 35);
        bookname.setFont(new Font("Times New Roman", Font.BOLD, 35));
        add(bookname);
        txtbna.setBounds(290, 540, 180, 35);
        add(txtbna);

        idate.setBounds(100, 600, 200, 35);
        idate.setFont(new Font("Times New Roman", Font.BOLD, 35));
        add(idate);
        txtdate.setBounds(290, 600, 180, 35);
        add(txtdate);

        fact.setBounds(100, 660, 200, 35);
        fact.setFont(new Font("Times New Roman", Font.BOLD, 35));
        add(fact);
        faculty.setBounds(290, 660, 200, 35);
        add(faculty);

        ret.setBounds(250, 760, 250, 40);
        ret.setFont(new Font("Times New Roman", Font.BOLD, 40));
        add(ret);
        ret.addActionListener(this);

        search.setBounds(250, 860, 200, 40);
        search.setFont(new Font("Times New Roman", Font.BOLD, 40));
        add(search);
        txtsid.setBounds(470, 860, 250, 40);
        add(txtsid);
        search.addActionListener(this);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == search) {
            int id = Integer.parseInt(txtsid.getText());
            Issue aa = bi.get(id, "Not Returned");
            if (aa != null) {
                txtna.setText(aa.getName());
                txtad.setText(aa.getAddress());
                faculty.setSelectedItem(aa.getFaculty());
                if (aa.getGender().equals("male")) {
                    male.setSelected(true);
                } else if (aa.getGender().equals("female")) {
                    female.setSelected(true);
                } else if (aa.getGender().equals("others")) {
                    others.setSelected(true);
                }
                txtph.setText(aa.getPhone());
                txtbid.setText(aa.getBookid());
                txtbna.setText(aa.getBookname());
                txtdate.setText(aa.getIssue_date());
            } else {
                JOptionPane.showMessageDialog(null, "no data found for ID " + id);
            }
        }

        if (e.getSource() == ret) {
            java.util.Date date = new java.util.Date(new java.util.Date().getTime());
            int id = Integer.parseInt(txtsid.getText());
            if(bi.updateIssue(id, date+"", "Returned"))
            {
                String bookid = txtbid.getText();
                BookEntity be = bi.search(bookid);
                int total = be.getNoOfBooks()+1;
                if(bi.update(bookid, total))
                {
                    JOptionPane.showMessageDialog(null,"book returned successfully");
                }
            }
            else
            {
                JOptionPane.showMessageDialog(null,"book returned failed");
            }
        }
    }
}
