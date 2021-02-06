package main;

import java.util.Scanner;
import main.*;

public class Main {
	public static Parser parser = new Parser();
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		String userInput;
		boolean con = true,validate = false;
		while(con = true) {
		    final String currentDirectory = System.getProperty("user.dir");
		    System.out.print(currentDirectory+">");
		    userInput = scanner.nextLine();
		    userInput = userInput.replaceAll("\\s+", " ");
		    userInput+=" ";
		    if(userInput.equals("exit"))
		    	con = false;
		    validate = parser.parse(userInput);
		    userInput = "";
		}
	}	
}
