package main;

import java.io.IOException;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import main.*;
public class Parser {
	static int ff=0;
	static int z=0;
	public static String cmd = "";
	public static String temp = "";
	public static String operatorCommand = "";
	public static String operatorFilename="";
	public static String fullInput = "";
	public static ArrayList<String> Args = new ArrayList<String>();
	public static ArrayList<String> commands = new ArrayList<String>();
	public static ArrayList<Integer> commandsArgs = new ArrayList<Integer>();
	public static ArrayList<String> pipeCommands = new ArrayList<String>();
	public boolean validate = false;
	public static Terminal terminal= new Terminal();
	public Parser() {
		commands.add("cd");
		commands.add("ls");
		commands.add("cp");
		commands.add("cat");
		commands.add("more");
		commands.add("date");
		commands.add("|");
		commands.add("rmdir");
		commands.add("mkdir");
		commands.add("args");
		commands.add("help");
		commands.add("pwd");
		commands.add(">");
		commands.add(">>");
		commands.add("mv");
		commands.add("rm");
		commands.add("clear");
		commands.add("exit");
		commandsArgs.add(1);
		commandsArgs.add(0);
		commandsArgs.add(2);
		commandsArgs.add(2);
		commandsArgs.add(1);
		commandsArgs.add(0);
		commandsArgs.add(0); 
		commandsArgs.add(1);
		commandsArgs.add(1);
		commandsArgs.add(1);
		commandsArgs.add(0);
		commandsArgs.add(0);
		commandsArgs.add(2);
		commandsArgs.add(2);
		commandsArgs.add(2);
		commandsArgs.add(1);
		commandsArgs.add(0);
		commandsArgs.add(0);
	}
	public boolean parse(String userInput) {
		if (userInput != null) {
			for(int t=0;t<userInput.length();t++) {
				if(userInput.charAt(t)=='>') {
					z++;
				}
			}
			
			if(userInput.contains("args")) {
				checkAndAssign(userInput);
			}
			else {
			if(userInput.contains("|")) {
				ff = -1;
				// pipe Case
				userInput+="|";
				for(int k = 0; k < userInput.length(); k++) {
					if(userInput.charAt(k) != '|') {
						operatorCommand+=userInput.charAt(k);
					}
					else {
						pipeCommands.add(operatorCommand);
						operatorCommand = "";
					}
				}	
					for(int f = 0 ;f<pipeCommands.size();f++) {
						String space  = pipeCommands.get(f);
						if(space.charAt(0) == ' ') {
							space = space.substring(1, space.length()); 
						}
						checkAndAssign(space);						
					}
			}else if(z==1) {
				// > Case
				fullInput = userInput;
				userInput+=">";
				for(int k = 0; k < userInput.length(); k++) {  
					if(userInput.charAt(k) != '>')  {
						operatorCommand+=userInput.charAt(k);
					}
					else {
						pipeCommands.add(operatorCommand); // array with one arg
						operatorCommand = "";
					}
				}
				operatorFilename  = pipeCommands.get(1);
				if(operatorFilename.charAt(0) == ' ') {
					operatorFilename = operatorFilename.substring(1, operatorFilename.length()); 
				}
					checkAndAssign(pipeCommands.get(0));			
			}
			else if(z==2) {
				// >> Case
				userInput+=">>";
				for(int k = 0; k < userInput.length(); k++) {		  
					if(userInput.charAt(k) == '>' && userInput.charAt(k+1) == '>')  {
						pipeCommands.add(operatorCommand);
						operatorCommand = "";
						k++;
					}
					else {	
						operatorCommand+=userInput.charAt(k);	
					}
				}
				operatorFilename  = pipeCommands.get(1);
				String space = "";
				for(int f = 0 ;f<pipeCommands.size();f++) {
				space  = pipeCommands.get(f);
				if(space.charAt(0) == ' ') {
					space = space.substring(1, space.length()); 
				}
				
			}
			operatorFilename  = space;
			checkAndAssign(pipeCommands.get(0));
			}else {
				//Normal Case
				checkAndAssign(userInput);
			}
		}
	}
		return validate;
}
	public static void checkAndAssign(String userInput) {
		int i;
		// First for loop - to get the command
		for (i = 0; i < userInput.length(); i++) {
			if (!Character.isWhitespace(userInput.charAt(i))) {
				cmd += userInput.charAt(i);
			} else
				break;
		}
		// Second for loop - to get the args
		for (int j = i + 1; j < userInput.length(); j++) {
			if (!Character.isWhitespace(userInput.charAt(j))) {
				temp += userInput.charAt(j);
			} else {
				Args.add(temp);
				temp = "";
			}
		}
		callCommand(fullInput);
}	
	public static void callCommand(String uI) {
		int flag = 0;
		for (int y = 0; y < commands.size(); y++) {
			if (cmd.equals(commands.get(y))) {
				flag++;
				if (Args.size() == commandsArgs.get(y)) {
					flag++;
				}
			}
		}		
		if (flag == 0) {
			System.out.println("Invalid Command");
		} else if (flag == 1) {
			System.out.println("The arguments number is wrong");
		} else {	
			if(z==1) {
				callReturnFunctions(Args,">");	
			}
			else if(z==2) {
				callReturnFunctions(Args,">>");	
			}else {
				if (cmd.equals("mv")) {
					terminal.mv(Args);
				} else if (cmd.equals("help")) {
					terminal.help();
				} else if (cmd.equals("clear")) {
					terminal.clear();
				} else if (cmd.equals("more")) {
					try {
						terminal.more(Args);
					} catch (IOException e) {
						e.printStackTrace();
					}
				} else if (cmd.equals("date")) {
					terminal.date();
				}else if(cmd.equals("pwd")) {
					terminal.pwd();
				}else if(cmd.equals("rm")) {
					terminal.rm(Args.get(0));
				}else if(cmd.equals("rmdir")) {
					terminal.rmdir(Args.get(0));
				}else if(cmd.equals("cd")) {
					terminal.cd(Args.get(0));
				}else if(cmd.equals("mkdir")) {
					terminal.mkdir(Args.get(0));
				}else if(cmd.equals("ls")) {
					terminal.ls();
				}else if(cmd.equals("args")) {
					terminal.args(Args.get(0));
				}else if(cmd.equals("cp")) {
					terminal.cp(Args);
				}else if(cmd.equals("cat")) {
					terminal.cat(Args);
				}else if(cmd.equals("exit")) {
					terminal.exit();
				}
				
			}
			
		}
		cmd="";
		Args.clear();
	}
	public static void callReturnFunctions(ArrayList<String> rArgs,String operatorType) {
		if (cmd.equals("mv")) {
			terminal.mvReturn(rArgs, operatorFilename, operatorType);
		} else if (cmd.equals("help")) {
			terminal.helpReturn(operatorFilename, operatorType);
		} else if (cmd.equals("clear")) {
			terminal.clear();
		} else if (cmd.equals("more")) {
			try {
				terminal.moreReturn(rArgs,operatorFilename,operatorType);			
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else if (cmd.equals("date")) {
			terminal.dateReturn(operatorFilename, operatorType);
		}else if(cmd.equals("pwd")) {
			terminal.pwdReturn(operatorFilename, operatorType);
		}else if(cmd.equals("rm")) {
			terminal.rmReturn(rArgs, operatorFilename, operatorType);
		}else if(cmd.equals("rmdir")) {
			terminal.rmdirReturn(rArgs, operatorFilename, operatorType);
		}else if(cmd.equals("cd")) {
			terminal.cdReturn(rArgs, operatorFilename, operatorType);
		}else if(cmd.equals("mkdir")) {
			terminal.mkdirReturn(rArgs, operatorFilename, operatorType);
		}else if(cmd.equals("ls")) {
			terminal.lsReturn(operatorFilename, operatorType);
		}else if(cmd.equals("args")) {
			terminal.argsReturn(rArgs, operatorFilename, operatorType);
		}else if(cmd.equals("cp")) {
			terminal.cpReturn(rArgs, operatorFilename, operatorType);
		}else if(cmd.equals("cat")) {
			terminal.catReturn(rArgs, operatorFilename, operatorType);
		}
		operatorFilename="";
		rArgs.clear();
		operatorType="";
		cmd="";
		Args.clear();
		z=0;
		pipeCommands.clear();		
	}
}