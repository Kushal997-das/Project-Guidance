package player;

import java.awt.Color;
import java.awt.Graphics;
import java.util.ArrayList;

import ResourseEngine.ImageEngine;
import ResourseEngine.playerColor;
import main.GameScreen;




//home 

/*
 * green
 * 26,24
 *26,89
 *26,153
 *26,213
 * 
 * yellow
 * 
 *26,276
 * 26,341
 * 26,402
 * 26,466
 * 
 * red
 * 
 * 602,24
 *	602,24
 *602,89
 *602,153
 *602,213
 * 
 * blue
 * 
 *602,276
 * 602,341
 * 602,402
 * 602,466
 * 
 * 
 */




public class Player {
	
	
	ImageEngine player;
	playerColor pc;
	public subPlayer P[];
	public String PlayerColor;
	public Color color;
	
 	
 	

	public Player(playerColor pc) {
		
		P=new subPlayer[4];
		for(int i=0;i<4;i++)
			P[i]=new subPlayer();
		this.pc=pc;
		
		
		
		/*
		 * 		1			2
		 * 
		 * 
		 * 		3			4
		 */
		
		if(pc==playerColor.GREEN) {
			PlayerColor="GREEN";
			player=new ImageEngine("player/Green.png");
			P[0].startX=123;
			P[1].startX=201;
			P[2].startX=123;
			P[3].startX=201;
			
			P[0].startY=55;
			P[1].startY=55;
			P[2].startY=132;
			P[3].startY=132;
			
			
			P[0].homeX=P[1].homeX=P[2].homeX=P[3].homeX=26;
			
			P[0].homeY=24;
			P[1].homeY=89;
			P[2].homeY=152;
			P[3].homeY=213;
			
			color=Color.green;

		
			
		}
		
		
		if(pc==playerColor.RED) {
			PlayerColor="RED";
			player=new ImageEngine("player/Red.png");
			P[0].startX=423;
			P[1].startX=501;
			P[2].startX=423;
			P[3].startX=501;
			
			P[0].startY=55;
			P[1].startY=55;
			P[2].startY=131;
			P[3].startY=131;
			
			P[0].homeX=P[1].homeX=P[2].homeX=P[3].homeX=602;
			
			P[0].homeY=24;
			P[1].homeY=89;
			P[2].homeY=152;
			P[3].homeY=213;
			
			color=Color.red;

			
		}

		if(pc==playerColor.YELLOW) {
			PlayerColor="YELLOW";

			player=new ImageEngine("player/Yellow.png");
			P[0].startX=122;
			P[1].startX=200;
			P[2].startX=122;
			P[3].startX=200;
			
			P[0].startY=352;
			P[1].startY=352;
			P[2].startY=428;
			P[3].startY=428;

			P[0].homeX=P[1].homeX=P[2].homeX=P[3].homeX=26;
			
			P[0].homeY=276;
			P[1].homeY=341;
			P[2].homeY=402;
			P[3].homeY=466;
			
			color=Color.yellow;

			
			
		}

		if(pc==playerColor.BLUE) {
			PlayerColor="BLUE";

			player=new ImageEngine("player/Blue.png");
			P[0].startX=420;
			P[1].startX=498;
			P[2].startX=420;
			P[3].startX=498;
			
			P[0].startY=352;
			P[1].startY=352;
			P[2].startY=428;
			P[3].startY=428;

			P[0].homeX=P[1].homeX=P[2].homeX=P[3].homeX=602;
			
			P[0].homeY=276;
			P[1].homeY=341;
			P[2].homeY=402;
			P[3].homeY=466;
			
			color=Color.blue;

			
		}
		
		
		
		
		for(subPlayer P:this.P) {
			P.posx=P.startX;
			P.posy=P.startY;

		}
		
		

	}
	
	public int getPoint(int i) {
		return P[i].point;
	}
	
	
	public void setPoint(int outcome,int i,boolean isIncrement) {
		
		
		if(isIncrement) {
			if(P[i].point+outcome>57) 
				return;
				
			P[i].point+=outcome;
			
			
		}
		else
			P[i].point=outcome;
		
		
		if(P[i].point==57)
			GameScreen.isSwap=false;
		
		GameScreen.outcome=0;
	}
	
	
	
	
	public int getI(int x,int y) {
		
	
		for(int i=0;i<4;i++) {
			if(P[i].posx==x && P[i].posy==y) { 
				return i;

			}
		}
		return -2;
	}
	
	
	
	
	
	public int getPosx(int i) {
		return P[i].posx;
	}
	
	
	
	public int getPosy(int i) {
		return P[i].posy;
	}
	
	
	
	
	
	public void setPossition(int i) {
		
		if(pc==playerColor.RED) {
		
			//GameScreen.throwSound.play();
			switch(P[i].point) {
			
			case 0:
				P[i].posx=P[i].startX;
				P[i].posy=P[i].startY;
				break;
				
			
			case 1:
				P[i].posx=349;
				P[i].posy=50;
				break;
			
			
			case 2:  
				P[i].posx=349;
				P[i].posy=82;
				break;

			case 3: 
				P[i].posx=349;
				P[i].posy=114;
				break;

			case 4: 
				P[i].posx=349;
				P[i].posy=146;
				break;

			case 5: 
				P[i].posx=349;
				P[i].posy=180;
				break;

			case 6: 
				P[i].posx=382;
				P[i].posy=211;
				break;

			case 7: 
				P[i].posx=417;
				P[i].posy=211;
				break;

			case 8: 
				P[i].posx=450;
				P[i].posy=211;
				break;

			case 9: 
				P[i].posx=482;
				P[i].posy=211;
				break;

			case 10: 
				P[i].posx=513;
				P[i].posy=211;
				break;

			case 11: 
				P[i].posx=544;
				P[i].posy=211;
				break;

			case 12: 
				P[i].posx=544;
				P[i].posy=243;
				break;

			case 13: 
				P[i].posx=544;
				P[i].posy=276;
				break;

			case 14: 
				P[i].posx=513;
				P[i].posy=276;
				break;

			case 15: 
				P[i].posx=482;
				P[i].posy=276;
				break;

			case 16: 
				P[i].posx=450;
				P[i].posy=276;
				break;

			case 17: 
				P[i].posx=417;
				P[i].posy=276;
				break;

			case 18: 
				P[i].posx=382;
				P[i].posy=276;
				break;

			case 19: 
				P[i].posx=349;
				P[i].posy=310;
				break;

			case 20: 
				P[i].posx=349;
				P[i].posy=344;
				break;

			case 21: 
				P[i].posx=349;
				P[i].posy=377;
				break;

			case 22: 
				P[i].posx=349;
				P[i].posy=410;
				break;

			case 23: 
				P[i].posx=349;
				P[i].posy=441;
				break;

			case 24: 
				P[i].posx=349;
				P[i].posy=473;
				break;

			case 25: 
				P[i].posx=316;
				P[i].posy=473;
				break;

			case 26: 
				P[i].posx=284;
				P[i].posy=473;
				break;

			case 27: 
				P[i].posx=284;
				P[i].posy=441;
				break;

			case 28: 
				P[i].posx=284;
				P[i].posy=410;
				break;

			case 29: 
				P[i].posx=284;
				P[i].posy=377;
				break;

			case 30: 
				P[i].posx=284;
				P[i].posy=344;
				break;

			case 31: 
				P[i].posx=284;
				P[i].posy=310;
				break;

			case 32: 
				P[i].posx=250;
				P[i].posy=276;
				break;

			case 33: 
				P[i].posx=216;
				P[i].posy=276;
				break;

			case 34: 
				P[i].posx=184;
				P[i].posy=276;
				break;

			case 35: 
				P[i].posx=152;
				P[i].posy=276;
				break;

			case 36: 
				P[i].posx=120;
				P[i].posy=276;
				break;

			case 37: 
				P[i].posx=87;
				P[i].posy=276;
				break;

			case 38: 
				P[i].posx=87;
				P[i].posy=243;
				break;

			case 39: 
				P[i].posx=87;
				P[i].posy=211;
				break;

			case 40: 
				P[i].posx=120;
				P[i].posy=211;
				break;

			case 41: 
				P[i].posx=152;
				P[i].posy=211;
				break;

			case 42: 
				P[i].posx=184;
				P[i].posy=211;
				break;

			case 43: 
				P[i].posx=216;
				P[i].posy=211;
				break;

			case 44: 
				P[i].posx=250;
				P[i].posy=211;
				break;

			case 45: 
				P[i].posx=284;
				P[i].posy=180;
				break;

			case 46: 
				P[i].posx=284;
				P[i].posy=146;
				break;

			case 47: 
				P[i].posx=284;
				P[i].posy=114;
				break;

			case 48: 
				P[i].posx=284;
				P[i].posy=82;
				break;

			case 49: 
				P[i].posx=284;
				P[i].posy=50;
				break;

			case 50: 
				P[i].posx=284;
				P[i].posy=17;
				break;

			case 51: 
				P[i].posx=316;
				P[i].posy=17;
				break;

			case 52: 
				P[i].posx=316;
				P[i].posy=50;
				break;

			case 53: 
				P[i].posx=316;
				P[i].posy=82;
				break;

			case 54: 
				P[i].posx=316;
				P[i].posy=114;
				break;

			case 55: 
				P[i].posx=316;
				P[i].posy=146;
				break;

			case 56: 
				P[i].posx=316;
				P[i].posy=180;
				break;
				
			case 57:
				
 
				P[i].posx=P[i].homeX;
				P[i].posy=P[i].homeY;
				break;
			
			
			}
		}

	//blue	
		
		if(pc==playerColor.BLUE) {
		
			
			switch(P[i].point) {
			
			case 0:
				P[i].posx=P[i].startX;
				P[i].posy=P[i].startY;
				break;
				
			
			case 1:
				P[i].posx=513;
				P[i].posy=276;
				break;
			
			
			case 2:  
				P[i].posx=482;
				P[i].posy=276;
				break;

			case 3: 
				P[i].posx=450;
				P[i].posy=276;
				break;

			case 4: 
				P[i].posx=417;
				P[i].posy=276;
				break;

			case 5: 
				P[i].posx=382;
				P[i].posy=276;
				break;

			case 6: 
				P[i].posx=349;
				P[i].posy=310;
				break;

			case 7: 
				P[i].posx=349;
				P[i].posy=344;
				break;

			case 8: 
				P[i].posx=349;
				P[i].posy=377;
				break;


			case 9: 
				P[i].posx=349;
				P[i].posy=410;
				break;

			case 10: 
				P[i].posx=349;
				P[i].posy=441;
				break;

			case 11: 
				P[i].posx=349;
				P[i].posy=473;
				break;

			case 12: 
				P[i].posx=316;
				P[i].posy=473;
				break;

			case 13: 
				P[i].posx=284;
				P[i].posy=473;
				break;

			case 14: 
				P[i].posx=284;
				P[i].posy=441;
				break;

			case 15: 
				P[i].posx=284;
				P[i].posy=410;
				break;

			case 16: 
				P[i].posx=284;
				P[i].posy=377;
				break;

			case 17: 
				P[i].posx=284;
				P[i].posy=344;
				break;

			case 18: 
				P[i].posx=284;
				P[i].posy=310;
				break;

			case 19: 
				P[i].posx=250;
				P[i].posy=276;
				break;

			case 20: 
				P[i].posx=216;
				P[i].posy=276;
				break;

			case 21: 
				P[i].posx=184;
				P[i].posy=276;
				break;

			case 22: 
				P[i].posx=152;
				P[i].posy=276;
				break;

			case 23: 
				P[i].posx=120;
				P[i].posy=276;
				break;

			case 24: 
				P[i].posx=87;
				P[i].posy=276;
				break;

			case 25: 
				P[i].posx=87;
				P[i].posy=243;
				break;

			case 26: 
				P[i].posx=87;
				P[i].posy=211;
				break;

			case 27: 
				P[i].posx=120;
				P[i].posy=211;
				break;

			case 28: 
				P[i].posx=152;
				P[i].posy=211;
				break;

			case 29: 
				P[i].posx=184;
				P[i].posy=211;
				break;

			case 30: 
				P[i].posx=216;
				P[i].posy=211;
				break;

			case 31: 
				P[i].posx=250;
				P[i].posy=211;
				break;

			case 32: 
				P[i].posx=284;
				P[i].posy=180;
				break;

			case 33: 
				P[i].posx=284;
				P[i].posy=146;
				break;

			case 34: 
				P[i].posx=284;
				P[i].posy=114;
				break;

			case 35: 
				P[i].posx=284;
				P[i].posy=82;
				break;

			case 36: 
				P[i].posx=284;
				P[i].posy=50;
				break;

			case 37: 
				P[i].posx=284;
				P[i].posy=17;
				break;

			case 38: 
				P[i].posx=316;
				P[i].posy=17;
				break;

			case 39: 
				P[i].posx=349;
				P[i].posy=17;
				break;

			case 40: 
				P[i].posx=349;
				P[i].posy=50;
				break;

			case 41: 
				P[i].posx=349;
				P[i].posy=82;
				break;

			case 42: 
				P[i].posx=349;
				P[i].posy=114;
				break;

			case 43: 
				P[i].posx=349;
				P[i].posy=146;
				break;


			case 44: 
				P[i].posx=349;
				P[i].posy=180;
				break;

			case 45: 
				P[i].posx=382;
				P[i].posy=211;
				break;

			case 46: 
				P[i].posx=417;
				P[i].posy=211;
				break;

			case 47: 
				P[i].posx=450;
				P[i].posy=211;
				break;

			case 48: 
				P[i].posx=482;
				P[i].posy=211;
				break;

			case 49: 
				P[i].posx=513;
				P[i].posy=211;
				break;

			case 50: 
				P[i].posx=544;
				P[i].posy=211;
				break;

			
			case 51: 
				P[i].posx=544;
				P[i].posy=243;
				break;

			case 52: 
				P[i].posx=513;
				P[i].posy=243;
				break;

			case 53: 
				P[i].posx=482;
				P[i].posy=243;
				break;
				
			case 54:
				
 
				P[i].posx=450;
				P[i].posy=243;
				break;
				
			case 55:
				
				 
				P[i].posx=417;
				P[i].posy=243;
				break;
			case 56:
				
				 
				P[i].posx=382;
				P[i].posy=243;
				break;
			
			case 57:
				
				 
				P[i].posx=P[i].homeX;
				P[i].posy=P[i].homeY;
				break;
				
			default:
				return;
			
			
			
			}
		}
		
		
//yellow
		
		if(pc==playerColor.YELLOW) {
		
			
			switch(P[i].point) {
			
			case 0:
				P[i].posx=P[i].startX;
				P[i].posy=P[i].startY;
				break;
				
			
			case 1:
				P[i].posx=284;
				P[i].posy=441;
				break;
			
			
			case 2:  
				P[i].posx=284;
				P[i].posy=410;
				break;

			case 3: 
				P[i].posx=284;
				P[i].posy=377;
				break;

			case 4: 
				P[i].posx=284;
				P[i].posy=344;
				break;

			case 5: 
				P[i].posx=284;
				P[i].posy=310;
				break;

			case 6: 
				P[i].posx=250;
				P[i].posy=276;
				break;

			case 7: 
				P[i].posx=216;
				P[i].posy=276;
				break;

			case 8: 
				P[i].posx=184;
				P[i].posy=276;
				break;

			case 9: 
				P[i].posx=152;
				P[i].posy=276;
				break;

			case 10: 
				P[i].posx=120;
				P[i].posy=276;
				break;

			case 11: 
				P[i].posx=87;
				P[i].posy=276;
				break;

			case 12: 
				P[i].posx=87;
				P[i].posy=243;
				break;

			case 13: 
				P[i].posx=87;
				P[i].posy=211;
				break;

			case 14: 
				P[i].posx=120;
				P[i].posy=211;
				break;

			case 15: 
				P[i].posx=152;
				P[i].posy=211;
				break;

			case 16: 
				P[i].posx=184;
				P[i].posy=211;
				break;

			case 17: 
				P[i].posx=216;
				P[i].posy=211;
				break;

			case 18: 
				P[i].posx=250;
				P[i].posy=211;
				break;

			case 19: 
				P[i].posx=284;
				P[i].posy=180;
				break;

			case 20: 
				P[i].posx=284;
				P[i].posy=146;
				break;

			case 21: 
				P[i].posx=284;
				P[i].posy=114;
				break;

			case 22: 
				P[i].posx=284;
				P[i].posy=82;
				break;

			case 23: 
				P[i].posx=284;
				P[i].posy=50;
				break;

			case 24: 
				P[i].posx=284;
				P[i].posy=17;
				break;

			case 25: 
				P[i].posx=316;
				P[i].posy=17;
				break;

			case 26: 
				P[i].posx=349;
				P[i].posy=17;
				break;

			case 27: 
				P[i].posx=349;
				P[i].posy=50;
				break;

			case 28: 
				P[i].posx=349;
				P[i].posy=82;
				break;

			case 29: 
				P[i].posx=349;
				P[i].posy=114;
				break;

			case 30: 
				P[i].posx=349;
				P[i].posy=146;
				break;

			case 31: 
				P[i].posx=349;
				P[i].posy=180;
				break;

			case 32: 
				P[i].posx=382;
				P[i].posy=211;
				break;

			case 33: 
				P[i].posx=417;
				P[i].posy=211;
				break;

			case 34: 
				P[i].posx=450;
				P[i].posy=211;
				break;

			case 35: 
				P[i].posx=482;
				P[i].posy=211;
				break;

			case 36: 
				P[i].posx=513;
				P[i].posy=211;
				break;

			case 37: 
				P[i].posx=544;
				P[i].posy=211;
				break;

			case 38: 
				P[i].posx=544;
				P[i].posy=243;
				break;

			case 39: 
				P[i].posx=544;
				P[i].posy=276;
				break;

			case 40: 
				P[i].posx=513;
				P[i].posy=276;
				break;

			case 41: 
				P[i].posx=482;
				P[i].posy=276;
				break;

			case 42: 
				P[i].posx=450;
				P[i].posy=276;
				break;

			case 43: 
				P[i].posx=417;
				P[i].posy=276;
				break;

			case 44: 
				P[i].posx=382;
				P[i].posy=276;
				break;

			case 45: 
				P[i].posx=349;
				P[i].posy=310;
				break;

			case 46: 
				P[i].posx=349;
				P[i].posy=344;
				break;

			case 47: 
				P[i].posx=349;
				P[i].posy=377;
				break;

			case 48: 
				P[i].posx=349;
				P[i].posy=410;
				break;

			case 49: 
				P[i].posx=349;
				P[i].posy=441;
				break;

			case 50: 
				P[i].posx=349;
				P[i].posy=473;
				break;

			case 51: 
				P[i].posx=316;
				P[i].posy=473;
				break;

			case 52: 
				P[i].posx=316;
				P[i].posy=441;
				break;

			case 53: 
				P[i].posx=316;
				P[i].posy=410;
				break;

			case 54: 
				P[i].posx=316;
				P[i].posy=377;
				break;

			case 55: 
				P[i].posx=316;
				P[i].posy=344;
				break;

			case 56: 
				P[i].posx=316;
				P[i].posy=310;
				break;
				
			case 57:
				
 
				P[i].posx=P[i].homeX;
				P[i].posy=P[i].homeY;
				break;
			
			
			}
		}
		
		
//green
		
		if(pc==playerColor.GREEN) {
		
			
			switch(P[i].point) {
			
			case 0:
				P[i].posx=P[i].startX;
				P[i].posy=P[i].startY;
				break;
				
			
			case 1:
				P[i].posx=120;
				P[i].posy=211;
				break;
			
			
			case 2:  
				P[i].posx=152;
				P[i].posy=211;
				break;

			case 3: 
				P[i].posx=184;
				P[i].posy=211;
				break;

			case 4: 
				P[i].posx=216;
				P[i].posy=211;
				break;

			case 5: 
				P[i].posx=250;
				P[i].posy=211;
				break;

			case 6: 
				P[i].posx=284;
				P[i].posy=180;
				break;

			case 7: 
				P[i].posx=284;
				P[i].posy=146;
				break;

			case 8: 
				P[i].posx=284;
				P[i].posy=114;
				break;

			case 9: 
				P[i].posx=284;
				P[i].posy=82;
				break;

			case 10: 
				P[i].posx=284;
				P[i].posy=50;
				break;

			case 11: 
				P[i].posx=284;
				P[i].posy=17;
				break;

			case 12: 
				P[i].posx=316;
				P[i].posy=17;
				break;

			case 13: 
				P[i].posx=349;
				P[i].posy=17;
				break;

			case 14: 
				P[i].posx=349;
				P[i].posy=50;
				break;

			case 15: 
				P[i].posx=349;
				P[i].posy=82;
				break;

			case 16: 
				P[i].posx=349;
				P[i].posy=114;
				break;

			case 17: 
				P[i].posx=349;
				P[i].posy=146;
				break;

			case 18: 
				P[i].posx=349;
				P[i].posy=180;
				break;

			case 19: 
				P[i].posx=382;
				P[i].posy=211;
				break;

			case 20: 
				P[i].posx=417;
				P[i].posy=211;
				break;

			case 21: 
				P[i].posx=450;
				P[i].posy=211;
				break;

			case 22: 
				P[i].posx=482;
				P[i].posy=211;
				break;

			case 23: 
				P[i].posx=513;
				P[i].posy=211;
				break;

			case 24: 
				P[i].posx=544;
				P[i].posy=211;
				break;

			case 25: 
				P[i].posx=544;
				P[i].posy=243;
				break;

			case 26: 
				P[i].posx=544;
				P[i].posy=276;
				break;

			case 27: 
				P[i].posx=513;
				P[i].posy=276;
				break;

			case 28: 
				P[i].posx=482;
				P[i].posy=276;
				break;

			case 29: 
				P[i].posx=450;
				P[i].posy=276;
				break;

			case 30: 
				P[i].posx=417;
				P[i].posy=276;
				break;

			case 31: 
				P[i].posx=382;
				P[i].posy=276;
				break;

			case 32: 
				P[i].posx=349;
				P[i].posy=310;
				break;

			case 33: 
				P[i].posx=349;
				P[i].posy=344;
				break;

			case 34: 
				P[i].posx=349;
				P[i].posy=377;
				break;

			case 35: 
				P[i].posx=349;
				P[i].posy=410;
				break;

			case 36: 
				P[i].posx=349;
				P[i].posy=441;
				break;

			case 37: 
				P[i].posx=349;
				P[i].posy=473;
				break;

			case 38: 
				P[i].posx=316;
				P[i].posy=473;
				break;

			case 39: 
				P[i].posx=284;
				P[i].posy=473;
				break;

			case 40: 
				P[i].posx=284;
				P[i].posy=441;
				break;

			case 41: 
				P[i].posx=284;
				P[i].posy=410;
				break;

			case 42: 
				P[i].posx=284;
				P[i].posy=377;
				break;

			case 43: 
				P[i].posx=284;
				P[i].posy=344;
				break;

			case 44: 
				P[i].posx=284;
				P[i].posy=310;
				break;

			case 45: 
				P[i].posx=250;
				P[i].posy=276;
				break;

			case 46: 
				P[i].posx=216;
				P[i].posy=276;
				break;

			case 47: 
				P[i].posx=184;
				P[i].posy=276;
				break;

			case 48: 
				P[i].posx=152;
				P[i].posy=276;
				break;

			case 49: 
				P[i].posx=120;
				P[i].posy=276;
				break;

			case 50: 
				P[i].posx=87;
				P[i].posy=276;
				break;

			case 51: 
				P[i].posx=87;
				P[i].posy=243;
				break;

			case 52: 
				P[i].posx=120;
				P[i].posy=243;
				break;

			case 53: 
				P[i].posx=152;
				P[i].posy=243;
				break;

			case 54: 
				P[i].posx=184;
				P[i].posy=243;
				break;

			case 55: 
				P[i].posx=216;
				P[i].posy=243;
				break;

			case 56: 
				P[i].posx=250;
				P[i].posy=243;
				break;
				
			case 57:
				
 
				P[i].posx=P[i].homeX;
				P[i].posy=P[i].homeY;
				break;
			
			
			}
		}
		
		
	
		
	}
	
	
	public void drawPlayer(Graphics g) {
		
		for(subPlayer P:this.P) 
			g.drawImage(player.getObjectImage(), P.posx , P.posy , null);

		
	}
	
	
	

	

}



