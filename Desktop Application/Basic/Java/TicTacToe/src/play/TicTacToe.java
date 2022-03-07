package play;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class TicTacToe {
	
	static ArrayList<Integer> playerpos= new ArrayList<Integer>();
	static ArrayList<Integer> cpos= new ArrayList<Integer>();

	public static void main(String[] args) {
		char[][] gboard = { {' ',' ',' '},
							{' ',' ',' '},
							{' ',' ',' '}};
		printBoard(gboard);
		
		while(true) {
			Scanner sc = new Scanner(System.in);
			System.out.println("Enter the position (1-9)");
			int pos=sc.nextInt();
			while(playerpos.contains(pos)|| cpos.contains(pos))
			{
				System.out.println("Enter different position:");
				pos=sc.nextInt();
			}
			place(gboard, pos,"p1");
			String s= checkWinner();
			if(s.length()>0)
			{
				printBoard(gboard);
				System.out.println(s);
				
				break;
			}
			
			
			Random rn=new Random();
			int cpupos = rn.nextInt(9)+1;
			while(playerpos.contains(cpupos)|| cpos.contains(cpupos))
			{
				cpupos = rn.nextInt(9)+1;
			}
			place(gboard, cpupos,"cpu");
			s= checkWinner();
			if(s.length()>0)
			{
				printBoard(gboard);
				System.out.println(s);
				
				break;
			}
			printBoard(gboard);
		}
		
}
	private static String checkWinner() {
		List toprow = Arrays.asList(1,2,3);
		List midrow= Arrays.asList(4,5,6);
		List bottomrow = Arrays.asList(7,8,9);
		List leftcol= Arrays.asList(1,4,7);
		List midcol = Arrays.asList(2,5,8);
		List rightcol= Arrays.asList(3,6,9);
		List cross1 = Arrays.asList(1,5,9);
		List cross2= Arrays.asList(3,5,7);
		
		List<List> winlst= new ArrayList<List>();
		winlst.add(toprow);
		winlst.add(midrow);
		winlst.add(bottomrow);
		winlst.add(leftcol);
		winlst.add(midcol);
		winlst.add(rightcol);
		winlst.add(cross1);
		winlst.add(cross2);
		
		for(List l:winlst)
		{
			if(playerpos.containsAll(l))
				return "Player wins!";
			else if(cpos.containsAll(l))
				return "cpu wins!";
			else if(playerpos.size()+cpos.size()==9)
			{
				if(playerpos.containsAll(l))
					return "Player wins!";
				else if(cpos.containsAll(l))
					return "cpu wins!";
				else
					return "Draw";	
			}
					
		}
		return "";
		
		
	}

	private static void place(char[][] gboard, int pos,String user) {
		char symbol=' ';
		if(user.equals("p1")) {
			symbol='X';
			playerpos.add(pos);
		}
		else {
			symbol='O';
			cpos.add(pos);
		}
		switch(pos)
		{
			case 1:gboard[0][0]=symbol;
					break;
			case 2:gboard[0][1]=symbol;
			break;
			case 3:gboard[0][2]=symbol;
			break;
			case 4:gboard[1][0]=symbol;
			break;
			case 5:gboard[1][1]=symbol;
			break;
			case 6:gboard[1][2]=symbol;
			break;
			case 7:gboard[2][0]=symbol;
			break;
			case 8:gboard[2][1]=symbol;
			break;
			case 9:gboard[2][2]=symbol;
			break;
			default:
				break;
			
		}
	}

	private static void printBoard(char[][] gboard) {
		System.out.println(gboard[0][0]+"|"+gboard[0][1]+"|"+gboard[0][2]);
		System.out.println("-+-+-");
		System.out.println(gboard[1][0]+"|"+gboard[1][1]+"|"+gboard[1][2]);
		System.out.println("-+-+-");
		System.out.println(gboard[2][0]+"|"+gboard[2][1]+"|"+gboard[2][2]);
	}

	}