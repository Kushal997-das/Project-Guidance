package main;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Scanner;

import javax.swing.JPanel;

import ResourseEngine.playerColor;
import player.Player;

public class Logic{ 
	
	Scanner in=new Scanner(System.in);
	Player p1,p2,p3,p4,current;
	public int i=-2,x,y;
	boolean isRun=true;
	int temp;

	public Logic() {
		p1=new Player(playerColor.RED);
		p2=new Player(playerColor.BLUE);
		p3=new Player(playerColor.YELLOW);
		p4=new Player(playerColor.GREEN); 
		current=p1;
	}
	
	public void swap() {
		
		if(current==p1)
			current=p2;
		else if(current==p2)
			current=p3;
		else if(current==p3)
			current=p4;
		else if(current==p4)
			current=p1;
			
	}
	
	
	
	
	public void start(int outcome,boolean isRun) {
		
		if(current.getPoint(0)==57)
			if(current.getPoint(1)==57)
				if(current.getPoint(2)==57)
					if(current.getPoint(3)==57)
						current=current(1);
		
		
		{
			if(current.getPoint(0)+outcome>57 &&current.getPoint(1)+outcome>57 &&current.getPoint(3)+outcome>57 &&current.getPoint(3)+outcome>57  )
				GameScreen.canThrow=true;
			
		}
		
		
		
		
		if(outcome==6)
			 GameScreen.isSwap=false;
		 


		setCursor(x, y);
		i=current.getI(x, y);
		x=0;
		y=0;
		if(i!=-2&&i!=5)
			current.setPossition(i);
		
		if(outcome==6){
			if(i<0||i>3)
				return;
			GameScreen.canThrow=true;

			if(current.getPoint(i)==0)
				current.setPoint(1, i, false); 
			else
				current.setPoint(outcome, i, true);

			
 		 
		}
		
		
		
		
		else {
			
			if(current.getPoint(0)==0&&current.getPoint(1)==0&&current.getPoint(2)==0&&current.getPoint(3)==0) {
				GameScreen.isSwap=true;
				GameScreen.canThrow=true;

				return;
			}
			
			else {
				
					if(i<0)
						return;
					else if(current.getPoint(i)==0) {
						i=-2;
						GameScreen.canThrow=true;

						return;

					}

			

					current.setPoint(outcome, i, true);

			}
			
			
			
		}

		current.setPossition(i);
		checkCollision();
		GameScreen.canThrow=true;

		
		

		

		
		
		
		i=-2;
		 
	}
	
	
	
	
	
	
	
	
	
public void setCursor(int x, int y) {
		
		//for red
	if(x>423 &&x<423+30) {
		if(y>55&&y<55+30) {
			this.x=423;
			this.y=55;
			return;

		}
		if(y>131&&y<131+30) {
			this.x=423;
			this.y=131;
			return;

		}
	
	}
	
		

	if(x>501 &&x<501+30) {
		if(y>55&&y<55+30) {
			this.x=501;
			this.y=55;
			return;

		}
		if(y>131&&y<131+30) {
			this.x=501;
			this.y=131;
			return;

		}
	
	}
	
	
	//for blue
	if(x>420 &&x<420+30) {
		if(y>352&&y<352+30) {
			this.x=420;
			this.y=352;
			return;

		}
		if(y>428&&y<428+30) {
			this.x=420;
			this.y=428;
			return;

		}
	
	}
	
		

	if(x>498 &&x<498+30) {
		if(y>352&&y<352+30) {
			this.x=498;
			this.y=352;
			return;

		}
		if(y>428&&y<428+30) {
			this.x=498;
			this.y=428;
			return;

		}
	
	}
	
	
	//for yellow
	if(x>122 &&x<122+30) {
		if(y>352&&y<352+30) {
			this.x=122;
			this.y=352;
			return;

		}
		if(y>428&&y<428+30) {
			this.x=122;
			this.y=428;
			return;

		}
	
	}
	
		

	if(x>200 &&x<200+30) {
		if(y>352&&y<352+30) {
			this.x=200;
			this.y=352;
			return;

		}
		if(y>428&&y<428+30) {
			this.x=200;
			this.y=428;
			return;

		}
	
	}
	
	
	
	
	

	//for green
	if(x>123 &&x<123+30) {
		if(y>55&&y<55+30) {
			this.x=123;
			this.y=55;
			return;

		}
		if(y>132&&y<132+30) {
			this.x=123;
			this.y=132;
			return;

		}
	
	}
	
		

	if(x>201 &&x<201+30) {
		if(y>55&&y<55+30) {
			this.x=201;
			this.y=55;
			return;

		}
		if(y>132&&y<132+30) {
			this.x=201;
			this.y=132;
			return;

		}
	
	}
	
	
	
	
	//for x
		
		if(x>87 && x<120)
			this.x=87;
		if(x>120 && x<152)
			this.x=120;
		if(x>152 && x<184)
			this.x=152;
		if(x>184 && x<216)
			this.x=184;
		if(x>216 && x<250)
			this.x=216;
		if(x>250 && x<284)
			this.x=250;
		
		
		
		if(x>284 && x<316)
			this.x=284;
		if(x>316 && x<349)
			this.x=316;
		if(x>349 && x<382)
			this.x=349;
		

		if(x>382 && x<417)
			this.x=382;
		if(x>417 && x<450)
			this.x=417;
		if(x>450 && x<482)
			this.x=450;
		if(x>482 && x<513)
			this.x=482;
		if(x>513 && x<544)
			this.x=513;
		if(x>544 && x<575)
			this.x=544;
		

		
		
		//for y
		

		if(y>17 && y<50)
			this.y=17;
		if(y>50 && y<82)
			this.y=50;
		if(y>82 && y<114)
			this.y=82;
		if(y>114 && y<146)
			this.y=114;
		if(y>146 && y<180)
			this.y=146;
		if(y>180 && y<211)
			this.y=180;
		
		
		if(y>211 && y<243)
			this.y=211;
		if(y>243 && y<276)
			this.y=243;
		if(y>276 && y<310)
			this.y=276;
		
		if(y>310 && y<344)
			this.y=310;
		if(y>344 && y<377)
			this.y=344;
		if(y>377 && y<410)
			this.y=377;
		if(y>410 && y<441)
			this.y=410;
		if(y>441 && y<473)
			this.y=441;
		if(y>473 && y<505)
			this.y=473;
		
		
		//red
		

		
		
		
	}


public void checkCollision() {
	
	//for *
	if(current.getPosx(this.i)==349 && current.getPosy(this.i)==50)
		return;
	if(current.getPosx(this.i)==349 && current.getPosy(this.i)==410)
		return;
	if(current.getPosx(this.i)==284 && current.getPosy(this.i)==82)
		return;
	if(current.getPosx(this.i)==284 && current.getPosy(this.i)==441)
		return;
	if(current.getPosx(this.i)==513 && current.getPosy(this.i)==276)
		return;
	if(current.getPosx(this.i)==482 && current.getPosy(this.i)==211)
		return;
	if(current.getPosx(this.i)==152 && current.getPosy(this.i)==276)
		return;
	if(current.getPosx(this.i)==120 && current.getPosy(this.i)==211)
		return;
		
	
	
	for(int i=0;i<4;i++) { 
 		if(current.getPosx(this.i)==current(1).getPosx(i)&&current.getPosy(this.i)==current(1).getPosy(i)) {
			current(1).setPoint(0, i, false);
			current(1).setPossition(i);
			 
			GameScreen.isSwap=false;
		}
	
		if(current.getPosx(this.i)==current(2).getPosx(i)&&current.getPosy(this.i)==current(2).getPosy(i)){
			current(2).setPoint(0, i, false);
			current(2).setPossition(i);
			
			 
			GameScreen.isSwap=false;
		}				
		
	
	}
	
}
	
	
	
	
	public void showPlayer(Graphics g) {
		
		p1.drawPlayer(g);
		p2.drawPlayer(g);
		p3.drawPlayer(g);
		p4.drawPlayer(g);
		
		if(current==p1)
			p1.drawPlayer(g);
		if(current==p2)
			p2.drawPlayer(g);
		if(current==p3)
			p3.drawPlayer(g);
		if(current==p4)
			p4.drawPlayer(g);
		
		
		g.setColor(current.color);
		g.setFont(new Font("Segoe Script", Font.BOLD,40));
		g.drawString(current.PlayerColor+"'s TURN", 150, 600);
		
		
		
	}

	
public Player current(int i) {
	if(i==1) {
		if(current==p1)
			return p2;
		else if(current==p2)
			return p3;
		else if(current==p3)
			return p4;
		else if(current==p4)
			return p1;
	}
	
	else if(i==2) {
		if(current==p1)
			return p4;
		else if(current==p2)
			return p1;
		else if(current==p3)
			return p2;
		else if(current==p4)
			return p3;
			
	}
	
	else if(i==3) {
		if(current==p1)
			return p3;
		else if(current==p2)
			return p4;
		else if(current==p3)
			return p1;
		else if(current==p4)
			return p2;
		
	}
	
	return null;
}



public boolean isWin() {
	for(int i=0;i<4;i++) {
		if(current.getPoint(i)==57 && current(3).getPoint(i)==57)
			continue;
		return false;
	}
	
	return true;
}
	
	

	
	
	

}
