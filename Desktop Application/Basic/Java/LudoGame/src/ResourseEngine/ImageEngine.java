package ResourseEngine;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

public class ImageEngine {

	private BufferedImage Object;
	
	

	public ImageEngine(String ImageName) {
		
		try {
			Object=ImageIO.read(new File("Data/"+ImageName));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	public BufferedImage getObjectImage() {
		return Object;
	}
	 



}
