package synchronizationPackage;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextArea;
import javax.swing.JTextField;

public class RouterGUI extends JFrame {

	private JTextField ConnectiostextField;
	private JTextField DevicestextField;

	public RouterGUI() throws InterruptedException {

		this.setBounds(100, 100, 1000, 619);
		this.setLocationRelativeTo(null);
		this.getContentPane().setLayout(null);
		this.setTitle("Router Synchornization");
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		JLabel label = new JLabel("Rotuer Synchornization GUI");
		label.setFont(new Font("Copperplate Gothic Bold", Font.BOLD, 29));
		label.setBounds(106, 0, 767, 106);
		this.getContentPane().add(label);
		this.setResizable(false);
		this.setVisible(true);

		JLabel lblWhatIsThe = new JLabel("What is the number of connections your router can accept?");
		lblWhatIsThe.setFont(new Font("Corbel", Font.PLAIN, 23));
		lblWhatIsThe.setBounds(50, 112, 568, 20);
		this.getContentPane().add(lblWhatIsThe);

		JLabel lb2 = new JLabel("What is the number of devices that wishes to connect?");
		lb2.setFont(new Font("Corbel", Font.PLAIN, 23));
		lb2.setBounds(50, 188, 568, 20);
		this.getContentPane().add(lb2);

		JLabel lb3 = new JLabel("Please, enter the names of the devices.");
		lb3.setFont(new Font("Corbel", Font.PLAIN, 23));
		lb3.setBounds(50, 260, 384, 20);
		this.getContentPane().add(lb3);

		JLabel lb4 = new JLabel("Please, enter the types of the devices.");
		lb4.setFont(new Font("Corbel", Font.PLAIN, 23));
		lb4.setBounds(509, 260, 568, 20);
		this.getContentPane().add(lb4);

		ConnectiostextField = new JTextField();
		ConnectiostextField.setBounds(72, 137, 344, 26);
		this.getContentPane().add(ConnectiostextField);
		ConnectiostextField.setColumns(10);
		ConnectiostextField.setVisible(true);
		ConnectiostextField.requestFocus();

		DevicestextField = new JTextField();
		DevicestextField.setColumns(10);
		DevicestextField.setBounds(72, 218, 344, 26);
		this.getContentPane().add(DevicestextField);
		DevicestextField.requestFocus();

		JTextArea Names_textArea = new JTextArea();
		Names_textArea.setFont(new Font("Monospaced", Font.PLAIN, 20));
		Names_textArea.setBounds(72, 293, 344, 106);
		Names_textArea.setRows(100);
		this.getContentPane().add(Names_textArea);
		Names_textArea.requestFocus();

		JTextArea TypestextArea = new JTextArea();
		TypestextArea.setFont(new Font("Monospaced", Font.PLAIN, 20));
		TypestextArea.setBounds(519, 293, 344, 106);
		TypestextArea.setRows(100);
		this.getContentPane().add(TypestextArea);
		TypestextArea.requestFocus();

		JButton btnNewButton = new JButton("Start Simulation");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				NetworkClass.N = Integer.parseInt(ConnectiostextField.getText());
				NetworkClass.TC = Integer.parseInt(DevicestextField.getText());
				String[] names = Names_textArea.getText().split("\s");
				String[] types = TypestextArea.getText().split("\s");
				for (int i = 0; i < Integer.parseInt(DevicestextField.getText()); i++) {
					NetworkClass.devices.add(new DeviceClass(names[i], types[i]));
				}

				for (int j = 0; j < NetworkClass.N; j++) {
					NetworkClass.names.add("");
					NetworkClass.state.add(false);
				}

				RouterClass routerClass = new RouterClass();
				try {
					routerClass.connect();
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
				}
			}
		});
		btnNewButton.setFont(new Font("Copperplate Gothic Bold", Font.PLAIN, 24));
		btnNewButton.setBackground(Color.LIGHT_GRAY);
		btnNewButton.setForeground(Color.BLACK);
		btnNewButton.setBounds(298, 440, 360, 65);
		btnNewButton.requestFocus();
		this.getContentPane().add(btnNewButton);

	}

}
