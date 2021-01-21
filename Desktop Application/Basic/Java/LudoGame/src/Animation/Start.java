package Animation;

import java.awt.Graphics;
import java.util.ArrayList;

import ResourseEngine.ImageEngine;

public class Start {
	
	ArrayList<ImageEngine> s;

	public Start() {
		s=new ArrayList<ImageEngine>();
		s.add(new ImageEngine("start/start1.png"));
		s.add(new ImageEngine("start/start2.png"));
		s.add(new ImageEngine("start/start3.png"));
		s.add(new ImageEngine("start/start4.png"));
		s.add(new ImageEngine("start/start5.png"));
		s.add(new ImageEngine("start/start6.png"));
		s.add(new ImageEngine("start/start7.png"));
		s.add(new ImageEngine("start/start8.png"));
		s.add(new ImageEngine("start/start10.png"));
		s.add(new ImageEngine("start/start11.png"));
		s.add(new ImageEngine("start/start12.png"));
		s.add(new ImageEngine("start/start13.png"));
	}
	
	
	public void showStarting(Graphics g,int x) {
		g.drawImage(s.get(x).getObjectImage(), 120, 10, null);
	}

}
