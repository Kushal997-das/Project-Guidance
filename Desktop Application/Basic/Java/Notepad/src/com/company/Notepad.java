package com.company;

import javax.swing.*;
import javax.swing.filechooser.FileNameExtensionFilter;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.io.*;

// JFrame
// The javax.swing.JFrame class is a type of container which inherits the java.awt.Frame class.
// JFrame works like the main window where components like labels, buttons, textfields are added to create a GUI.

// ActionListener
// The Java ActionListener is notified whenever you click on the button or menu item. It is notified against ActionEvent.
// The ActionListener interface is found in java.awt.event package. It has only one method: actionPerformed().
public class Notepad extends JFrame implements ActionListener {

    JTextArea area;                 // The object of a JTextArea class is a multi line region that displays text. It allows the editing of multiple line text. It inherits JTextComponent class
    JScrollPane pane;                   // A JscrollPane is used to make scrollable view of a component. When screen size is limited, we use a scroll pane to display a large component or a component whose size can change dynamically.
    String text;

    public Notepad() {

        // JMenuBar, JMenu, JMenuItems
        //The JMenuBar class is used to display menubar on the window or frame. It may have several menus.
        //The object of JMenu class is a pull down menu component which is displayed from the menu bar. It inherits the JMenuItem class.
        //The object of JMenuItem class adds a simple labeled menu item. The items used in a menu must belong to the JMenuItem or any of its subclass.

        setBounds(0, 0, 1920, 1080); //The setBounds() method needs four arguments. The first two arguments are x and y coordinates of the top-left corner of the component, the third argument is the width of the component and the fourth argument is the height of the component.
        JMenuBar menuBar = new JMenuBar();
        JMenu file = new JMenu("File");

        JMenuItem newDoc = new JMenuItem("New");
        newDoc.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_N, ActionEvent.CTRL_MASK));
        newDoc.addActionListener(this);

        JMenuItem open = new JMenuItem("Open");
        open.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_O, ActionEvent.CTRL_MASK));
        open.addActionListener(this);

        JMenuItem save = new JMenuItem("Save");
        save.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_S, ActionEvent.CTRL_MASK));
        save.addActionListener(this);

        JMenuItem print = new JMenuItem("Print");
        print.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_P, ActionEvent.CTRL_MASK));
        print.addActionListener(this);

        JMenuItem exit = new JMenuItem("Exit");
        exit.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, 0));
        exit.addActionListener(this);

        file.add(newDoc);
        file.add(open);
        file.add(save);
        file.add(print);
        file.add(exit);

        JMenu edit = new JMenu("Edit");

        JMenuItem copy = new JMenuItem("Copy");
        copy.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_C, ActionEvent.CTRL_MASK));
        copy.addActionListener(this);

        JMenuItem paste = new JMenuItem("Paste");
        paste.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_V, ActionEvent.CTRL_MASK));
        paste.addActionListener(this);

        JMenuItem cut = new JMenuItem("Cut");
        cut.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_X, ActionEvent.CTRL_MASK));
        cut.addActionListener(this);

        JMenuItem selectAll = new JMenuItem("Select All");
        selectAll.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_A, ActionEvent.CTRL_MASK));
        selectAll.addActionListener(this);

        edit.add(copy);
        edit.add(paste);
        edit.add(cut);
        edit.add(selectAll);


        JMenu help = new JMenu("Help");

        JMenuItem about = new JMenuItem("About");
        about.addActionListener(this);

        help.add(about);


        menuBar.add(file);
        menuBar.add(edit);
        menuBar.add(help);

        setJMenuBar(menuBar);

        area = new JTextArea();
        area.setFont(new Font("SAN_SERIF", Font.PLAIN, 20));
        area.setLineWrap(true);
        area.setWrapStyleWord(true);

        pane = new JScrollPane(area);
        pane.setBorder(BorderFactory.createEmptyBorder());
        add(pane, BorderLayout.CENTER);

    }




    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getActionCommand().equals("New")) {
            area.setText("");
        }else if(e.getActionCommand().equals("Open")) {
            JFileChooser chooser = new JFileChooser();                  // JFileChooser is a easy and an effective way to prompt the user to choose a file or a directory .
            chooser.setAcceptAllFileFilterUsed(false);
            FileNameExtensionFilter restrict = new FileNameExtensionFilter("Only .txt files", "txt");
            chooser.addChoosableFileFilter(restrict);

            int action = chooser.showOpenDialog(this);
            if (action != JFileChooser.APPROVE_OPTION) {
                File file = chooser.getSelectedFile();

                try {
                    BufferedReader reader = new BufferedReader(new FileReader(file));                   // Java BufferedReader class is used to read the text from a character-based input stream. It can be used to read data line by line by readLine() method. It makes the performance fast. It inherits Reader class.
                    area.read(reader, null);
                    reader.close();
                    area.requestFocus();
                }catch (Exception ae) {
                    System.out.println(ae);
                }
            }

        }else if(e.getActionCommand().equals("Save")) {
            JFileChooser saveAs = new JFileChooser();
            saveAs.setApproveButtonText("Save");
            int action = saveAs.showOpenDialog(this);
            if (action != JFileChooser.APPROVE_OPTION) {
                return;
            }

            File fileName = new File(saveAs.getSelectedFile() + ".txt");
            BufferedWriter outFile = null;

            try {
                outFile = new BufferedWriter(new FileWriter(fileName));
                area.write(outFile);
            }catch (IOException ae) {
                ae.printStackTrace();
            }
        }else if (e.getActionCommand().equals("Print")) {
            try {
                area.print();
            }catch (Exception ae) {
                System.out.println(ae);
            }
        }else if (e.getActionCommand().equals("Exit")) {
            System.exit(0);
        }else if (e.getActionCommand().equals("Copy")) {
            text = area.getSelectedText();
        }else if (e.getActionCommand().equals("Paste")) {
            area.insert(text, area.getCaretPosition());
        }else if (e.getActionCommand().equals("Cut")) {
            text = area.getSelectedText();
            area.replaceRange("", area.getSelectionStart(), area.getSelectionEnd());
        }else if (e.getActionCommand().equals("Select All")) {
            area.selectAll();
        }else if (e.getActionCommand().equals("About")) {
            new About().setVisible(true);
        }
    }

    public static void main(String[] args) {
        new Notepad().setVisible(true);
    }

}