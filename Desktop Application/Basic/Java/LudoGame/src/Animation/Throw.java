package Animation;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import ResourseEngine.*;
import main.GameScreen;

public class Throw {
	ImageEngine d1,d2,d3,d4,d5,d6;
	
	ArrayList<ImageEngine> a;

	
	Random random;
	int outcome;
	
	public void change(boolean b) {
		if(b) {

			random=new Random();
			outcome=random.nextInt(6)+1;
		}
	}

	public Throw() {
		
		
		a=new ArrayList<ImageEngine>();

		
		a.add(new ImageEngine("die/die1.png"));
		a.add(new ImageEngine("die/die2.png"));
		a.add(new ImageEngine("die/die3.png"));
		a.add(new ImageEngine("die/die4.png"));
		a.add(new ImageEngine("die/die5.png"));
		a.add(new ImageEngine("die/die6.png"));
		a.add(new ImageEngine("die/die7.png"));
		a.add(new ImageEngine("die/die8.png"));
		
		a.add(new ImageEngine("die/die1.png"));
		a.add(new ImageEngine("die/die2.png"));
		a.add(new ImageEngine("die/die3.png"));
		a.add(new ImageEngine("die/die4.png"));
		a.add(new ImageEngine("die/die5.png"));
		a.add(new ImageEngine("die/die6.png"));
		a.add(new ImageEngine("die/die7.png"));
		a.add(new ImageEngine("die/die8.png"));
		a.add(new ImageEngine("die/die1.png"));
		a.add(new ImageEngine("die/die2.png"));
		a.add(new ImageEngine("die/die3.png"));
		a.add(new ImageEngine("die/die4.png"));

		
		random=new Random();
		outcome=random.nextInt(6)+1;
		d1=new ImageEngine("Die1.png");
		d2=new ImageEngine("Die2.png");
		d3=new ImageEngine("Die3.png");
		d4=new ImageEngine("Die4.png");
		d5=new ImageEngine("Die5.png");
		d6=new ImageEngine("Die6.png");
		
		
	}
	
	public void play(Graphics g,int i) {

		if(i>=20) {
			//for(int i1=0;i1<10;i1++) 
				g.drawImage(getObject().getObjectImage(), 224+80, 228+10, null);

			GameScreen.thrw=false;
			return;
		}


		g.drawImage(a.get(i).getObjectImage(), 185, 160, null);

 
		
		
		
		
		
	}
	

	
	public int getOutcome() {
		return outcome;
	}

	public ImageEngine getObject() {
		
		switch(outcome) {
		case 1:
			return d1;
		case 2:
			return d2;
		case 3:
			return d3;
		case 4:
			return d4;
		case 5:
			return d5;
		
		
		}
		
		
		return d6;
	
	}

}
