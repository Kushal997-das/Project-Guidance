package Animation;

import java.awt.Graphics;
import java.util.ArrayList;

import ResourseEngine.ImageEngine;

public class Opening {
	
	ArrayList<ImageEngine> o;

	public Opening() {
		o=new ArrayList<ImageEngine>();
		
		o.add(new ImageEngine("opening/opening1.png"));		
		o.add(new ImageEngine("opening/opening2.png"));
		o.add(new ImageEngine("opening/opening3.png"));
		o.add(new ImageEngine("opening/opening4.png"));
		o.add(new ImageEngine("opening/opening5.png"));
		o.add(new ImageEngine("opening/opening6.png"));
		o.add(new ImageEngine("opening/opening7.png"));
		o.add(new ImageEngine("opening/opening8.png"));
		o.add(new ImageEngine("opening/opening9.png"));
		o.add(new ImageEngine("opening/opening10.png"));
		o.add(new ImageEngine("opening/opening11.png"));
		o.add(new ImageEngine("opening/opening12.png"));
		o.add(new ImageEngine("opening/opening13.png"));
		o.add(new ImageEngine("opening/opening14.png"));
		o.add(new ImageEngine("opening/opening15.png"));
		o.add(new ImageEngine("opening/opening16.png"));
		o.add(new ImageEngine("opening/opening17.png"));
		o.add(new ImageEngine("opening/opening18.png"));

	}
	
	public void showOpening(Graphics g,int x) {
			g.drawImage(o.get(x).getObjectImage(), 0,10,650,510, null);
		
	}

}
