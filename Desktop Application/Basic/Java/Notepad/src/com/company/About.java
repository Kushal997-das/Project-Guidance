package com.company;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

// JFrame
// The javax.swing.JFrame class is a type of container which inherits the java.awt.Frame class.
// JFrame works like the main window where components like labels, buttons, textfields are added to create a GUI.

// ActionListener
// The Java ActionListener is notified whenever you click on the button or menu item. It is notified against ActionEvent.
// The ActionListener interface is found in java.awt.event package. It has only one method: actionPerformed().
public class About extends JFrame implements ActionListener {

    JButton b1;

    public About() {
        setBounds(600, 200, 700, 600);
        setLayout(null);


        // The class ImageIcon is an implementation of the Icon interface that paints Icons from Images.

        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("com/company/icons/windows.png"));
        Image i2 = i1.getImage().getScaledInstance(400, 80, Image.SCALE_DEFAULT);
        ImageIcon i3 = new ImageIcon(i2);
        JLabel l1 = new JLabel(i3);
        l1.setBounds(150, 40, 400, 80);
        add(l1);

        ImageIcon i4 = new ImageIcon(ClassLoader.getSystemResource("com/company/icons/notepad.png"));
        Image i5 = i4.getImage().getScaledInstance(70, 70, Image.SCALE_DEFAULT);
        ImageIcon i6 = new ImageIcon(i5);
        JLabel l2 = new JLabel(i6);
        l2.setBounds(50, 180, 70, 70);
        add(l2);

        // JLabel is a class of java Swing . JLabel is used to display a short string or an image icon. JLabel can display text, image or both . JLabel is only a display of text or image and it cannot get focus .
        JLabel l3 = new JLabel("<html>Notepad in Java<br>Academic Project<br><br>" +
                "Notepad is a word processing program<br>which allows changing of text in computer file, <br>Notepad is a simple text editor for basic text editing<br> " +
                "which enables computer users to create files</html>");
        l3.setBounds(150, 130, 500, 300);
        l3.setFont(new Font("SAN_SERIF", Font.PLAIN, 18));
        add(l3);

        b1 = new JButton("OK");
        b1.setBounds(580, 500, 80, 25);
        b1.addActionListener(this);
        add(b1);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        this.setVisible(false);
    }

    public static void main(String[] args) {
        new About().setVisible(true);
    }


}