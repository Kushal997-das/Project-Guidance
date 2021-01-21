package main;

import java.awt.Graphics;
import java.awt.image.BufferStrategy;

import javax.swing.JFrame;

public class GameWindow extends JFrame{
	
	GameScreen gamescreen;

	public GameWindow() {
		super("Ludo Simulator");
		gamescreen=new GameScreen(this);
		setVisible(true);
		setSize(670,678);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);	
		setResizable(false);
		setLocationRelativeTo(null);
		add(gamescreen);
		addKeyListener(gamescreen);

	}
	
	
	public  void startGame() {
		gamescreen.startGame();
		
	}
	


	
	

	
	public static void main(String[] args) {
		GameWindow g=new GameWindow();
		g.startGame();
		
	}



}
