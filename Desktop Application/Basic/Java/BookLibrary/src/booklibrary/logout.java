/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package booklibrary;

import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import static javax.swing.JFrame.EXIT_ON_CLOSE;
import javax.swing.JPanel;

/**
 *
 * @author surbh
 */
public class logout extends JPanel implements ActionListener{
    
    JButton log;
    
    public logout()
    {
        log = new JButton("logout");
        
        setLayout(null);
        setSize(1000,1000);
        setVisible(true);
        
        log.setBounds(200,100,180,40);
        log.setFont(new Font ("Times New Roman",Font.BOLD,40));
        add(log);
        log.addActionListener(this);
    }
    

    @Override
    public void actionPerformed(ActionEvent e) {
        if(e.getSource()==log)
        {
            new Login();
            
        }
    }
    
}
