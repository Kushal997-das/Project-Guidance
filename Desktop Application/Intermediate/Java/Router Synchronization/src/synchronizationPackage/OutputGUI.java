package synchronizationPackage;

import java.awt.Font;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextArea;

public class OutputGUI {
	private JFrame frame;
	JTextArea output_textArea;

	public OutputGUI() {
		initialize();
		frame.setVisible(true);

	}

	public void addUpdates(String str) {
		output_textArea.append(str);
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setLocationRelativeTo(null);
		frame.setResizable(false);
		frame.setVisible(true);
		frame.setBounds(100, 100, 1000, 700);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);

		JLabel label = new JLabel("Rotuer Synchornization GUI");
		label.setFont(new Font("Copperplate Gothic Bold", Font.BOLD, 29));
		label.setBounds(86, 16, 767, 41);
		frame.getContentPane().add(label);

		JLabel lblConnectionBehaviourUpdates = new JLabel("Connection behaviour updates");
		lblConnectionBehaviourUpdates.setFont(new Font("Corbel", Font.PLAIN, 23));
		lblConnectionBehaviourUpdates.setBounds(278, 88, 309, 29);
		frame.getContentPane().add(lblConnectionBehaviourUpdates);

		output_textArea = new JTextArea();
		output_textArea.setEditable(false);
		output_textArea.setFont(new Font("Monospaced", Font.PLAIN, 18));
		output_textArea.setBounds(169, 125, 600, 600);
		frame.getContentPane().add(output_textArea);
	}
}
