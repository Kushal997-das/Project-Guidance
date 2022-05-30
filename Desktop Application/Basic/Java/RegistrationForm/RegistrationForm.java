package registration;

import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.sql.*;

public class RegistrationForm implements ActionListener {
    JFrame frame;
    String[] gender={"Male","Female"};
    JLabel nameLabel=new JLabel("NAME");
    JLabel genderLabel=new JLabel("GENDER");
    JLabel fatherNameLabel=new JLabel("FATHER NAME");
    JLabel passwordLabel=new JLabel("PASSWORD");
    JLabel confirmPasswordLabel=new JLabel("CONFIRM PASSWORD");
    JLabel cityLabel=new JLabel("CITY");
    JLabel emailLabel=new JLabel("EMAIL");
    JTextField nameTextField=new JTextField();
    JComboBox genderComboBox=new JComboBox(gender);
    JTextField fatherTextField=new JTextField();
    JPasswordField passwordField=new JPasswordField();
    JPasswordField confirmPasswordField=new JPasswordField();
    JTextField cityTextField=new JTextField();
    JTextField emailTextField=new JTextField();
    JButton registerButton=new JButton("REGISTER");
    JButton resetButton=new JButton("RESET");


    RegistrationForm()
    {
        createWindow();
        setLocationAndSize();
        addComponentsToFrame();
        actionEvent();
    }
    public void createWindow()
    {
        frame=new JFrame();
        frame.setTitle("Registration Form");
        frame.setBounds(40,40,380,600);
        frame.getContentPane().setBackground(Color.pink);
        frame.getContentPane().setLayout(null);
        frame.setVisible(true);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setResizable(false);
    }
    public void setLocationAndSize()
    {
        nameLabel.setBounds(20,20,40,70);
        genderLabel.setBounds(20,70,80,70);
        fatherNameLabel.setBounds(20,120,100,70);
        passwordLabel.setBounds(20,170,100,70);
        confirmPasswordLabel.setBounds(20,220,140,70);
        cityLabel.setBounds(20,270,100,70);
        emailLabel.setBounds(20,320,100,70);
        nameTextField.setBounds(180,43,165,23);
        genderComboBox.setBounds(180,93,165,23);
        fatherTextField.setBounds(180,143,165,23);
        passwordField.setBounds(180,193,165,23);
        confirmPasswordField.setBounds(180,243,165,23);
        cityTextField.setBounds(180,293,165,23);
        emailTextField.setBounds(180,343,165,23);
        registerButton.setBounds(70,400,100,35);
        resetButton.setBounds(220,400,100,35);
    }
    public void addComponentsToFrame()
    {
        frame.add(nameLabel);
        frame.add(genderLabel);
        frame.add(fatherNameLabel);
        frame.add(passwordLabel);
        frame.add(confirmPasswordLabel);
        frame.add(cityLabel);
        frame.add(emailLabel);
        frame.add(nameTextField);
        frame.add(genderComboBox);
        frame.add(fatherTextField);
        frame.add(passwordField);
        frame.add(confirmPasswordField);
        frame.add(cityTextField);
        frame.add(emailTextField);
        
//        frame.add(NumberTextField);
//        frame.add(questionTextField);
        
        frame.add(registerButton);
        frame.add(resetButton);
    }
    public void actionEvent()
    {
        registerButton.addActionListener(this);
        resetButton.addActionListener(this);
    }


    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==registerButton)
        {
            try {
                Connection connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/registration","root","");
                PreparedStatement Pstatement=connection.prepareStatement("insert into student values(?,?,?,?,?,?,?)");
                Pstatement.setString(1,nameTextField.getText());
                Pstatement.setString(2,genderComboBox.getSelectedItem().toString());
                Pstatement.setString(3,fatherTextField.getText());
                Pstatement.setString(4,passwordField.getText());
                Pstatement.setString(5,confirmPasswordField.getText());
                Pstatement.setString(6,cityTextField.getText());
                Pstatement.setString(7,emailTextField.getText());
                
//                Pstatement.setString(8,NumberTextField.getText());
//                Pstatement.setString(9,questionTextField.getText());
                if(passwordField.getText().equalsIgnoreCase(confirmPasswordField.getText()))
                {

                    Pstatement.executeUpdate();
                    JOptionPane.showMessageDialog(null,"Data Registered Successfully");
                }
                else
                {
                    JOptionPane.showMessageDialog(null,"password did not match");
                }

            } catch (SQLException e1) {
                e1.printStackTrace();
            }


        }
        if(e.getSource()==resetButton)
        {
            nameTextField.setText("");
            genderComboBox.setSelectedItem("Male");
            fatherTextField.setText("");
            passwordField.setText("");
            confirmPasswordField.setText("");
            cityTextField.setText("");
            emailTextField.setText("");
            
//            NumberTextField.setText("");
//            questionTextField.setText("");
        }

    }
}
