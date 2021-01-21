package main;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Random;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

import javax.swing.JPanel;

import Animation.Opening;
import Animation.Start;
import Animation.Throw;
import ResourseEngine.ImageEngine;
import player.Player;

public class GameScreen 
extends JPanel 
implements Runnable,KeyListener,MouseListener{
	
	public static int x,outcome;
	private Throw die;
	public static boolean isSwap=false,isEnter=true,isStart=false;
	
	
	
	Logic logic;
	
	ImageEngine board,dieModel,home1,home2;
	


	private Thread thread;
	
	GameWindow game;
	int i=0,c=0,x1=0;
	long delay=40;
	public static boolean thrw,isRun=false,canThrow=true;
	
	Start start;
	Opening opening;
	

	
	
	public GameScreen(GameWindow game) {
		board=new ImageEngine("board.png");
		dieModel=new ImageEngine("main.png");
		home1=new ImageEngine("stand2.png");
		home2=new ImageEngine("stand.png");
		logic=new Logic();
		die=new Throw();
		start=new Start();
		opening=new Opening();
		this.game=game;
		addKeyListener(this);
		addMouseListener(this);
 	}
	
	
	
	
	
	
	
	
	
	
	
	
	public void startGame() {
		thread=new Thread(this);
		thread.start();
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@Override
	public void run() {
		while(true) {
			
			repaint();
			
			try {
				thread.sleep(delay);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			if(isEnter)
				logic.start(outcome,isRun);	
			
		}
	
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public void paint (Graphics g) {
		super.paint(g);
		g.setColor(Color.PINK);
		g.fillRect(0, 0, getWidth(), getHeight());
		
			
		if(x1<12) {
			start.showStarting(g,x1++);
			return;
		}

		if(x1==12) {

			g.setColor(Color.BLACK);
			g.setFont(new Font("Segoe Script", Font.BOLD,40));
			g.drawString("press F to start the game", 100, 550);

			
		}

		if(!isStart) {
			start.showStarting(g,11);
			return;
		}
		
		if(x1<12+18) {
			opening.showOpening(g, x1-12);
			x1++;
			return;
		}
		
		if(x1==12+18) {
			delay=50;
		}
		
		
		g.setColor(Color.PINK);
		g.fillRect(0, 0, getWidth(), getHeight());
		
		
		g.drawImage(board.getObjectImage(), 80, 10 ,null);
		g.drawImage(home1.getObjectImage(), 0, 10 ,null);
		g.drawImage(home2.getObjectImage(), 576, 10 ,null);
		logic.showPlayer(g);
		
		if(thrw)
 			die.play(g,i++);
	
 		if(!thrw) 
			g.drawImage(die.getObject().getObjectImage(), 236+80, 235+10,30,30, null);
 		
 		
 		if(logic.isWin()) {
 				g.setColor(Color.MAGENTA);
				g.setFont(new Font("Segoe Script", Font.BOLD,40));
				g.drawString(logic.current.PlayerColor+" AND "+logic.current(3).PlayerColor, 150, 300);
				g.drawString("WIN", 200, 350);
				isEnter=false;
		

		}
		


	
	}
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	@Override
	public void keyPressed(KeyEvent e) {
		
		if(e.getKeyCode()==KeyEvent.VK_F )
			isStart=true;
		
		if(e.getKeyCode()==KeyEvent.VK_SPACE ) {
			
			if(canThrow) {
				 thrw=true; 
					die.change(true);
					outcome=die.getOutcome();
					logic.i=0;
					if(isSwap)
						logic.swap();


				
					isSwap=true;

						
					isRun=true;	
					i=0;
					canThrow=false;
			}
				
		}
		
	
			
		
	}

	
	
	
	@Override
	public void mouseClicked(MouseEvent e) {
		logic.x=e.getX();
		logic.y=e.getY();
				
		
		if(e.getX()>=316&&e.getX()<=316+30&&e.getY()>=245&&e.getY()<=245+30) {
			
			if(canThrow) {
				 thrw=true; 
					die.change(true);
					outcome=die.getOutcome();
					logic.i=0;
					if(isSwap)
						logic.swap();


				
					isSwap=true;

						
					isRun=true;	
					i=0;
					canThrow=false;
			}
			
				
		}
		
	}

	
	
	
	
	
	
	
	
	

	public void keyReleased(KeyEvent e) {}
	public void keyTyped(KeyEvent e) {}
	public void mousePressed(MouseEvent e) {}
	public void mouseReleased(MouseEvent e) {}
	public void mouseEntered(MouseEvent e) {}
	public void mouseExited(MouseEvent e) {}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
