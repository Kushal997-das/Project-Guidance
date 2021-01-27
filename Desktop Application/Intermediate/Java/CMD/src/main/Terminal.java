package main;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.InputStream;
import java.util.Date;

public class Terminal {
	
	public Terminal() {}
	
	public static void help() {

		System.out.println("For more information on a specific command, type args <command-name>"+"\n");
		System.out.println("cd:     Displays the name of or changes the current directory.");
		System.out.println("ls:     List information about the FILEs (the current directory by default).");
		System.out.println("cp:     Copies one or more files to another location.");
		System.out.println("cat:    Concatenate files and print on the standard output.");
		System.out.println("more:   Displays output one screen at a time.");
		System.out.println("pipe:   Use pipes “ | “ to redirect the output of the previous command as in input to another command.");
		System.out.println("mkdir:  Creates a directory with each given name.");
		System.out.println("rmdir:  Removes a directory with each given name.");
		System.out.println("mv:     Moves one or more files from one directory to another directory.");
		System.out.println("rm:     Removes each specified file. By default, it does not remove directories.");
		System.out.println(">:      Redirect the output to be written to a file using the redirect > create/replace file operator.");
		System.out.println(">>:     Redirect the output to be written to a file using the redirect >> create/append to file operator.");
		System.out.println("args:   List all parameters on the command line, numbers or strings for specific command.");
		System.out.println("date:   Diplay current date/time.");
		System.out.println("help:   Display all user commands with their definition.");
		System.out.println("pwd:    Display the current directory.");
	}
	
	public static void more(ArrayList<String> moreArgs) throws IOException {

		
		try {
			BufferedReader in = new BufferedReader(new FileReader(moreArgs.get(0)));
			String line;
			while((line = in.readLine()) != null)
			{
			    System.out.println(line);
			}
			in.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public static void cp(ArrayList<String> cpArgs) {

		
		
		final String currentDirectory = System.getProperty("user.dir");
		//Setting the source and the destination
		String sourceFile = currentDirectory+"\\"+cpArgs.get(0);
		String targetPath = currentDirectory+"\\"+cpArgs.get(1);
		//Check if source exists or not
	    Path pathSource = Paths.get(sourceFile);
	    Path pathDestination = Paths.get(targetPath);
	    
	    if(Files.exists(pathSource)) {
	    	
	    	
	    	
	    	//Check for destination exists
	    	if(!Files.exists(pathDestination)) {
	    		//Does not exists
	    		
	    		if(cpArgs.get(1).contains("txt")) { // File

		    		File file = new File(pathDestination.toString());
		    		
		    		
		    		try {
		    			FileReader fr = new FileReader(pathSource.toString());
		    			BufferedReader br = new BufferedReader(fr);
		    			FileWriter fw = new FileWriter(cpArgs.get(1), true);
		    			String s;
		     
		    			while ((s = br.readLine()) != null) { // read a line
		    				fw.write(s); // write to output file
		    				fw.flush();
		    			}
		    			br.close();
		    			fw.close();
		                            System.out.println("file copied");
		    		} catch (IOException e) {
		    			// TODO Auto-generated catch block
		    			e.printStackTrace();
		    		}
	    		}else {
	    			mkdir(cpArgs.get(1));
	    			
			    	Path s = Paths.get(sourceFile);
					Path d = Paths.get(targetPath);
					
				    try {
				    	
						//Files.move(s, d.resolve(Paths.get(sourceFile).getFileName()));
						Files.copy(s, d.resolve(Paths.get(sourceFile).getFileName()));
						System.out.println("Source c to destination");

					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	    		}
	    		

	    	}else {
	    		//Exists
	    		
		    	Path s = Paths.get(sourceFile);
				Path d = Paths.get(targetPath);
				
			    try {
			    	
					//Files.move(s, d.resolve(Paths.get(sourceFile).getFileName()));
					Files.copy(s, d.resolve(Paths.get(sourceFile).getFileName()));
					System.out.println("Source c to destination");

				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	    	}
	    	
	    }else {
	    	System.out.println("Source file does not exists.");

	    }
	
		
		
	}
	
	public static void mv(ArrayList<String> mvArgs) {


					
		final String currentDirectory = System.getProperty("user.dir");
			
			
			
			//Setting the source and the destination
			String sourceFile = currentDirectory+"\\"+mvArgs.get(0);
			String targetPath = currentDirectory+"\\"+mvArgs.get(1);
			
			
			
			//Check if source exists or not
		    Path pathSource = Paths.get(sourceFile);
		    Path pathDestination = Paths.get(targetPath);
		    
		    
		    if(Files.exists(pathSource)) {
		    	
		    	
		    	//Check for destination exists
		    	if(!Files.exists(pathDestination)) {
		    		//Does not exists
		    		
			    	Path theDFile = Paths.get(sourceFile);
			    	try {
						Files.move(theDFile, theDFile.resolveSibling(mvArgs.get(1)), StandardCopyOption.REPLACE_EXISTING);
						System.out.println("The source renamed to "+ mvArgs.get(1));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
			    	
			    	
		    	}else {
		    		//Exists
		    		
		    		String dub = currentDirectory+"\\"+mvArgs.get(1)+"\\"+mvArgs.get(0);
		    		Path p = Paths.get(dub);
		    		
		    		if(Files.exists(p)) {
		    			System.out.println("File with the same name already exists");
		    		}else {
				    	Path s = Paths.get(sourceFile);
						Path d = Paths.get(targetPath);
						
					    try {
					    	
							Files.move(s, d.resolve(Paths.get(sourceFile).getFileName()));
							System.out.println("Source moved to destination");

						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
		    		}
		    		

		    	}
		    	

		    	
		    }else if(!Files.exists(pathSource)) {
		    	System.out.println("Source file does not exists.");
		    }
		
	
		
		
	  
	    
	}

	public static void clear() {


		try {	
			new ProcessBuilder("cmd","/c","cls").inheritIO().start().waitFor();
			
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
		}
		
		
	}
	
	public static void date() {
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date dateobj = new Date();
		System.out.println(df.format(dateobj));
	}
	
    public static void rm (String sourcepath)
    {
        File file=new File (sourcepath);
        if (!file.delete())
        {
            System.out.println("File can't be deleted : ");
        }
        else
            file.delete();
    }
    
    public static void rmdir (String sourcepath)
    {
        File file=new File (sourcepath);
        if (file.isDirectory())
        {

            /*
             * If directory is empty, then delete it
             */
            if (file.list().length == 0)
            {
                file.delete();
            }
            else
            {
                // list all the directory contents
                File files[] = file.listFiles();

                for (File fileDelete : files)
                {
                    /*
                     * Recursive delete
                     */
                    rmdir(fileDelete.getPath());
                }

                /*
                 * check the directory again, if empty then
                 * delete it.
                 */
                if (file.list().length == 0)
                {
                    file.delete();
                }
            }

        }
        else
        {
            /*
             * if file, then delete it
             */
            file.delete();
            System.out.println("File is deleted.");
        }
    }
	
    public static void pwd ()

    {
    	
    	 final String dir = System.getProperty("user.dir");
         System.out.println(dir);

    }
    
	public static void cd(String path) {


		if(path.equals("..")) {
			final String currentDirectory = System.getProperty("user.dir");
	        //System.out.println("Current directory: " + currentDirectory);
			File f = new File(currentDirectory);
			String changedPath = f.getAbsoluteFile().getParent();
			System.setProperty("user.dir", changedPath.toString());
			//System.out.println(changedPath);
		}else {
			
			
			
			final String currentDirectory = System.getProperty("user.dir");
			Path P = Paths.get(path);

			if(P.toString().contains("\\")) {
				if(Files.exists(P)) {
					System.setProperty("user.dir", P.toString());
				}else {
					System.out.println("Not exists");

				}
			}else {
				Path P1 = Paths.get(currentDirectory+"\\"+path);
				if(Files.exists(P1)) {
					System.setProperty("user.dir", P1.toString());
				}else {
					System.out.println("Not exists");

				}
			}
			

		}

		
	}

    public static void ls() {

		final String currentDirectory = System.getProperty("user.dir");
		File directory = new File(currentDirectory);
		File[] subdirs = directory.listFiles();
		for (File dir : subdirs) {
			System.out.print(dir.getName()+"    ");
		}
		System.out.println("\n");
    }

	public static void mkdir(String name) {
		final String currentDirectory = System.getProperty("user.dir");
		Path p = Paths.get(currentDirectory+"\\"+name);
	    File file = new File(p.toString());
	    //Creating the directory
	    file.mkdir();
	    System.out.println("Success");
	}
    
	public static void args(String commmand) {

		if(commmand.equals("cd")) {
			System.out.println("arg: Destination Directory");
		}
		else if(commmand.equals("ls")) {
			System.out.println("Has no argument");
		}
		else if(commmand.equals("cp")) {
			System.out.println("arg1: Source Directory, arg2: Destination Directory");
		}
		else if(commmand.equals("cat")) {
			System.out.println("arg1: First File Name, arg2: Second File Name");
		}
		else if(commmand.equals("more")) {
			System.out.println("arg: File Name");
		}
		else if(commmand.equals("|")) {
			System.out.println("arg1: First Command, arg2: Second Command");
		}
		else if(commmand.equals(">")) {
			System.out.println("arg1: Command, arg2: File Name or Path");
		}
		else if(commmand.equals(">>")) {
			System.out.println("arg1: Command, arg2: File Name or Path");
		}
		else if(commmand.equals("mkdir")) {
			System.out.println("arg: Directory Name");
		}
		else if(commmand.equals("rmdir")) {
			System.out.println("arg: Directory Name");
		}
		else if(commmand.equals("mv")) {
			System.out.println("arg1: Source File,    arg2: Destination File");
		}
		else if(commmand.equals("rm")) {
			System.out.println("arg: File Name");
		}
		else if(commmand.equals("args")) {
			System.out.println("arg: Command Name");
		}
		else if(commmand.equals("date")) {
			System.out.println("Has no argument");
		}
		else if(commmand.equals("help")) {
			System.out.println("Has no argument");
		}
		else if(commmand.equals("pwd")) {
			System.out.println("Has no argument");
		}
		else if(commmand.equals("clear")) {
			System.out.println("Has no argument");
		}

	}
	
	public static void cat(ArrayList<String> catArgs) {
		
		final String currentDirectory = System.getProperty("user.dir");
		//Setting the source and the destination
		String sourceFile = currentDirectory+"\\"+catArgs.get(0);
		String targetPath = currentDirectory+"\\"+catArgs.get(1);
		//Check if source exists or not
	    Path pathSource = Paths.get(sourceFile);
	    Path pathDestination = Paths.get(targetPath);
	    
	    
	    
	    if(Files.exists(pathSource)) {
	    	
	    	
	    	if(Files.exists(pathDestination)) {
	    		
	    		
	    		if(sourceFile.contains("txt")&&targetPath.contains("txt")) {

		    		try {
		    			BufferedReader in = new BufferedReader(new FileReader(sourceFile.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			in = new BufferedReader(new FileReader(targetPath.toString()));
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    		}else if(sourceFile.contains("txt") && !targetPath.contains("txt")) {
		    		try {
		    			BufferedReader in = new BufferedReader(new FileReader(sourceFile.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			System.out.println("cat: "+targetPath+": Is a directory");
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    		}else if(!sourceFile.contains("txt") && targetPath.contains("txt")) {
	    			System.out.println("cat: "+sourceFile+": Is a directory");

		    		try {
		    			BufferedReader in = new BufferedReader(new FileReader(targetPath.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    		}else {
	    			System.out.println("cat: "+sourceFile+": Is a directory");
	    			System.out.println("cat: "+targetPath+": Is a directory");

	    		}
	    			
	    	}else {
	    		//Destination not found
	    		if(sourceFile.contains("txt")) {
	    			
	        		try {
		    			BufferedReader in = new BufferedReader(new FileReader(sourceFile.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			System.out.println("cat: "+targetPath+": No such file or directory");
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    			
	    		}else {
	    			System.out.println("cat: "+sourceFile+": Is a directory");

	    			System.out.println("cat: "+targetPath+": No such file or directory");

	    
	    		}
	    			
	    	}
	    	
	    	
	    }else {
	    	
	    	//source not found
	    	
	    	if(Files.exists(pathDestination)) {
	    		
	    		if(targetPath.contains("txt")) {
	    			System.out.println("cat: "+sourceFile+": No such file or directory");

	        		try {
		    			BufferedReader in = new BufferedReader(new FileReader(targetPath.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    		}else {
	    			
	    			System.out.println("cat: "+targetPath+": Is a directory");

	    			System.out.println("cat: "+sourceFile+": No such file or directory");

	    			
	    		}
	    		
	    	}else {
	    		
    			System.out.println("cat: "+sourceFile+": No such file or directory");
    			System.out.println("cat: "+targetPath+": No such file or directory");

	    		
	    	}
	    	
	    	
	    	
	    }
	}
	
	 // >
	 public static void OP (String filpath, ArrayList <String> content)

	    {
		 
		 
			final String currentDirectory = System.getProperty("user.dir");

		 
		 
	        try {
	            File myObj = new File(filpath);	//path 
	            FileWriter myWriter = new FileWriter(myObj.getName(),false);//name of file
	            if (myObj.exists()) {
	                //BufferedWriter writer = Files.newBufferedWriter(Paths.get(myObj.getPath()));
	                for (int i=0;i<content.size();i++)
	                {
	                	myWriter.write(content.get(i)+" ");
		                myWriter.write(System.getProperty( "line.separator" ));

	                }
	                //writer.flush();
	                myWriter.close();
	            }
	            else
	            {
	                myObj.createNewFile();
	            for (int i=0;i<content.size();i++)
	            {
	                myWriter.write(content.get(i)+" ");
	                myWriter.write(System.getProperty( "line.separator" ));

	            }
	            myWriter.close();
	            }
	        }
	        catch (IOException e) {
	            System.out.println("An error occurred.");
	            e.printStackTrace();
	        }
	    }

	 // >>
	 public static void OPOP (String filepath,ArrayList <String> content)


	    {
	        try {

	            File myObj = new File(filepath);
	            FileWriter myWriter = new FileWriter(filepath,true);
	            if (!myObj.exists())
	                myObj.createNewFile();

	            for (int i=0;i<content.size();i++)
	            {
	                myWriter.write(content.get(i)+" ");
	                myWriter.write(System.getProperty( "line.separator" ));
	            }

	            myWriter.close();
	        } catch (IOException e) {
	            System.out.println("An error occurred.");
	            e.printStackTrace();
	        }
	    }
	
	 	
	 public static void exit() {
			System.exit(0);
		}
		
	
	//For Redirect Operators ***************************************
   
	public static void moreReturn(ArrayList<String> moreArgs,String filename,String opType) throws IOException {

			ArrayList<String> ouputArray = new ArrayList<String>();
			try {
				BufferedReader in = new BufferedReader(new FileReader(moreArgs.get(0)));
				String line;
				while((line = in.readLine()) != null)
				{
				    //System.out.println(line);
				    ouputArray.add(line);
				}
				in.close();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			if(opType.equals(">")) {
				OP(filename, ouputArray);

			}else {
				OPOP(filename, ouputArray);

			}

		}    
		
	public static void cdReturn(ArrayList<String> cdArgs,String filename,String opType) {

		ArrayList<String> ouputArray = new ArrayList<String>();

		if(cdArgs.get(0).equals("..")) {
			final String currentDirectory = System.getProperty("user.dir");
	        //System.out.println("Current directory: " + currentDirectory);
			File f = new File(currentDirectory);
			String changedPath = f.getAbsoluteFile().getParent();
			System.setProperty("user.dir", changedPath.toString());
			//System.out.println(changedPath);
		}else {
			Path P = Paths.get(cdArgs.get(0));
			if(Files.exists(P)) {
				System.setProperty("user.dir", P.toString());
			}else {
				System.out.println("Not exists");

			}
		}
		ouputArray.add("");
		
		if(opType.equals(">")) {
			OP(filename, ouputArray);

		}else {
			OPOP(filename, ouputArray);

		}
		
	}

    public static void lsReturn(String filename,String opType) {
		ArrayList<String> ouputArray = new ArrayList<String>();

		final String currentDirectory = System.getProperty("user.dir");
		File directory = new File(currentDirectory);
		File[] subdirs = directory.listFiles();
		for (File dir : subdirs) {
			//System.out.print(dir.getName()+"    ");
			ouputArray.add(dir.getName()+"    ");
		}
		System.out.println("\n");
		
		
		if(opType.equals(">")) {
			OP(filename, ouputArray);

		}else {
			OPOP(filename, ouputArray);

		}
    }
    
    public static void cpReturn(ArrayList<String> cpArgs,String filename,String opType) {
		
		ArrayList<String> ouputArray = new ArrayList<String>();

		final String currentDirectory = System.getProperty("user.dir");
		//Setting the source and the destination
		String sourceFile = currentDirectory+"\\"+cpArgs.get(0);
		String targetPath = currentDirectory+"\\"+cpArgs.get(1);
		//Check if source exists or not
	    Path pathSource = Paths.get(sourceFile);
	    Path pathDestination = Paths.get(targetPath);
	    
	    if(Files.exists(pathSource)) {
	    	
	    	
	    	
	    	//Check for destination exists
	    	if(!Files.exists(pathDestination)) {
	    		//Does not exists
	    		
	    		if(cpArgs.get(1).contains("txt")) { // File

		    		File file = new File(pathDestination.toString());
		    		
		    		
		    		try {
		    			FileReader fr = new FileReader(pathSource.toString());
		    			BufferedReader br = new BufferedReader(fr);
		    			FileWriter fw = new FileWriter(cpArgs.get(1), true);
		    			String s;
		     
		    			while ((s = br.readLine()) != null) { // read a line
		    				fw.write(s); // write to output file
		    				fw.flush();
		    			}
		    			br.close();
		    			fw.close();
		                            System.out.println("file copied");
		    		} catch (IOException e) {
		    			// TODO Auto-generated catch block
		    			e.printStackTrace();
		    		}
	    		}else {
	    			mkdir(cpArgs.get(1));
	    			
			    	Path s = Paths.get(sourceFile);
					Path d = Paths.get(targetPath);
					
				    try {
				    	
						//Files.move(s, d.resolve(Paths.get(sourceFile).getFileName()));
						Files.copy(s, d.resolve(Paths.get(sourceFile).getFileName()));
						System.out.println("Source c to destination");

					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	    		}
	    		

	    	}else {
	    		//Exists
	    		
		    	Path s = Paths.get(sourceFile);
				Path d = Paths.get(targetPath);
				
			    try {
			    	
					//Files.move(s, d.resolve(Paths.get(sourceFile).getFileName()));
					Files.copy(s, d.resolve(Paths.get(sourceFile).getFileName()));
					System.out.println("Source c to destination");

				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	    	}
	    	
	    	
	    	
	    }else {
	    	System.out.println("Source file does not exists.");

	    }
	    
	    
	    ouputArray.add("");
	    
		if(opType.equals(">")) {
			OP(filename, ouputArray);

		}else {
			OPOP(filename, ouputArray);

		}
		
		
	}
   
	public static void catReturn(ArrayList<String> catArgs,String filename,String opType) {
		
	
		ArrayList<String> ouputArray = new ArrayList<String>();

		
		final String currentDirectory = System.getProperty("user.dir");
		//Setting the source and the destination
		String sourceFile = currentDirectory+"\\"+catArgs.get(0);
		String targetPath = currentDirectory+"\\"+catArgs.get(1);
		//Check if source exists or not
	    Path pathSource = Paths.get(sourceFile);
	    Path pathDestination = Paths.get(targetPath);
	    
	    
	    
	    if(Files.exists(pathSource)) {
	    	
	    	
	    	if(Files.exists(pathDestination)) {
	    		
	    		
	    		if(sourceFile.contains("txt")&&targetPath.contains("txt")) {

		    		try {
		    			BufferedReader in = new BufferedReader(new FileReader(sourceFile.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			in = new BufferedReader(new FileReader(targetPath.toString()));
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    		}else if(sourceFile.contains("txt") && !targetPath.contains("txt")) {
		    		try {
		    			BufferedReader in = new BufferedReader(new FileReader(sourceFile.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			System.out.println("cat: "+targetPath+": Is a directory");
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    		}else if(!sourceFile.contains("txt") && targetPath.contains("txt")) {
	    			System.out.println("cat: "+sourceFile+": Is a directory");

		    		try {
		    			BufferedReader in = new BufferedReader(new FileReader(targetPath.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    		}else {
	    			System.out.println("cat: "+sourceFile+": Is a directory");
	    			System.out.println("cat: "+targetPath+": Is a directory");

	    		}
	    			
	    	}else {
	    		//Destination not found
	    		if(sourceFile.contains("txt")) {
	    			
	        		try {
		    			BufferedReader in = new BufferedReader(new FileReader(sourceFile.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			System.out.println("cat: "+targetPath+": No such file or directory");
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    			
	    		}else {
	    			System.out.println("cat: "+sourceFile+": Is a directory");

	    			System.out.println("cat: "+targetPath+": No such file or directory");

	    
	    		}
	    			
	    	}
	    	
	    	
	    }else {
	    	
	    	//source not found
	    	
	    	if(Files.exists(pathDestination)) {
	    		
	    		if(targetPath.contains("txt")) {
	    			System.out.println("cat: "+sourceFile+": No such file or directory");

	        		try {
		    			BufferedReader in = new BufferedReader(new FileReader(targetPath.toString()));
		    			String line;
		    			while((line = in.readLine()) != null)
		    			{
		    			    System.out.println(line);
		    			}
		    			in.close();
		    			
		    		}catch (Exception e) {
						// TODO: handle exception
		    			e.printStackTrace();
					}
	    		}else {
	    			
	    			System.out.println("cat: "+targetPath+": Is a directory");

	    			System.out.println("cat: "+sourceFile+": No such file or directory");

	    			
	    		}
	    		
	    	}else {
	    		
    			System.out.println("cat: "+sourceFile+": No such file or directory");
    			System.out.println("cat: "+targetPath+": No such file or directory");

	    		
	    	}
	    	
	    	
	    	
	    }
	    
	    ouputArray.add("");
	    
		if(opType.equals(">")) {
			OP(filename, ouputArray);

		}else {
			OPOP(filename, ouputArray);

		}
		
	    
	}
	
	public static void mkdirReturn(ArrayList<String> mkdirArgs,String filename,String opType) {
		
		ArrayList<String> ouputArray = new ArrayList<String>();

		
		final String currentDirectory = System.getProperty("user.dir");
        System.out.println("Current directory: " + currentDirectory);
		Path p = Paths.get(currentDirectory+"\\"+mkdirArgs.get(0));
	      File file = new File(p.toString());
	      //Creating the directory
	       file.mkdir();
	       System.out.println("Directory created");
	       
		    ouputArray.add("");
		    
			if(opType.equals(">")) {
				OP(filename, ouputArray);

			}else {
				OPOP(filename, ouputArray);

			}
	}
	
    public static void rmdirReturn (ArrayList<String> rmdirArgs,String filename,String opType)
    {
    	
		ArrayList<String> ouputArray = new ArrayList<String>();

    	
    	
        File file=new File (rmdirArgs.get(0));
        if (file.isDirectory())
        {

            /*
             * If directory is empty, then delete it
             */
            if (file.list().length == 0)
            {
                file.delete();
            }
            else
            {
                // list all the directory contents
                File files[] = file.listFiles();

                for (File fileDelete : files)
                {
                    /*
                     * Recursive delete
                     */
                    rmdir(fileDelete.getPath());
                }

                /*
                 * check the directory again, if empty then
                 * delete it.
                 */
                if (file.list().length == 0)
                {
                    file.delete();
                }
            }

        }
        else
        {
            /*
             * if file, then delete it
             */
            file.delete();
            System.out.println("File is deleted : " + file.getAbsolutePath());
        }
        
        
	    ouputArray.add("");
	    
		if(opType.equals(">")) {
			OP(filename, ouputArray);

		}else {
			OPOP(filename, ouputArray);

		}
    }
    
	public static void mvReturn(ArrayList<String> mvArgs,String filename,String opType) {

		ArrayList<String> ouputArray = new ArrayList<String>();

		
		
		final String currentDirectory = System.getProperty("user.dir");
			
			
			
			//Setting the source and the destination
			String sourceFile = currentDirectory+"\\"+mvArgs.get(0);
			String targetPath = currentDirectory+"\\"+mvArgs.get(1);
			
			
			
			//Check if source exists or not
		    Path pathSource = Paths.get(sourceFile);
		    Path pathDestination = Paths.get(targetPath);
		    
		    
		    if(Files.exists(pathSource)) {
		    	
		    	
		    	//Check for destination exists
		    	if(!Files.exists(pathDestination)) {
		    		//Does not exists
		    		
			    	Path theDFile = Paths.get(sourceFile);
			    	try {
						Files.move(theDFile, theDFile.resolveSibling(mvArgs.get(1)), StandardCopyOption.REPLACE_EXISTING);
						System.out.println("The source renamed to "+ mvArgs.get(1));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
			    	
			    	
		    	}else {
		    		//Exists
		    		
			    	Path s = Paths.get(sourceFile);
					Path d = Paths.get(targetPath);
					
				    try {
				    	
						Files.move(s, d.resolve(Paths.get(sourceFile).getFileName()));
						System.out.println("Source moved to destination");

					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		    	}
		    	

		    	
		    }else if(!Files.exists(pathSource)) {
		    	System.out.println("Source file does not exists.");
		    }
		
	
		
		
		    ouputArray.add("");
		    
			if(opType.equals(">")) {
				OP(filename, ouputArray);

			}else {
				OPOP(filename, ouputArray);

			}
	    
	}

    public static void rmReturn (ArrayList<String> rmArgs,String filename,String opType)
    {
    	
		ArrayList<String> ouputArray = new ArrayList<String>();

        File file=new File (rmArgs.get(0));
        if (!file.delete())
        {
            System.out.println("File can't be deleted : ");
        }
        else
            file.delete();
        
	    ouputArray.add("");
	    
		if(opType.equals(">")) {
			OP(filename, ouputArray);

		}else {
			OPOP(filename, ouputArray);

		}
        
    }
	
	public static void dateReturn(String filename,String opType) {
		ArrayList<String> ouputArray = new ArrayList<String>();

		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date dateobj = new Date();
		System.out.println(df.format(dateobj));
		
	    ouputArray.add(df.format(dateobj));
	    
		if(opType.equals(">")) {
			OP(filename, ouputArray);

		}else {
			OPOP(filename, ouputArray);

		}
	}
    	
    public static void pwdReturn (String filename,String opType){
		ArrayList<String> ouputArray = new ArrayList<String>();
    	 final String dir = System.getProperty("user.dir");
 	     ouputArray.add(dir);
	    
 		if(opType.equals(">")) {
 			OP(filename, ouputArray);

 		}else {
 			OPOP(filename, ouputArray);

 		}
 		
 		
    }
   
    public static void helpReturn(String filename,String opType) {	
		ArrayList<String> helpData = new ArrayList<String>();
		helpData.add("For more information on a specific command, type args <command-name>"+"\n");
		helpData.add("cd:     Displays the name of or changes the current directory.");
		helpData.add("ls:     List information about the FILEs (the current directory by default).");
		helpData.add("cp:     Copies one or more files to another location.");
		helpData.add("cat:    Concatenate files and print on the standard output.");
		helpData.add("more:   Displays output one screen at a time.");
		helpData.add("pipe:   Use pipes “ | “ to redirect the output of the previous command as in input to another command.");
		helpData.add("mkdir:  Creates a directory with each given name.");
		helpData.add("rmdir:  Removes a directory with each given name.");
		helpData.add("mv:     Moves one or more files from one directory to another directory.");
		helpData.add(">:      Redirect the output to be written to a file using the redirect > create/replace file operator.");
		helpData.add(">>:     Redirect the output to be written to a file using the redirect >> create/append to file operator.");
		helpData.add("args:   List all parameters on the command line, numbers or strings for specific command.");
		helpData.add("date:   Diplay current date/time.");
		helpData.add("help:   Display all user commands with their definition.");
		helpData.add("pwd:    Display the current directory.");
		
		if(opType.equals(">")) {
 			OP(filename, helpData);

 		}else {
 			OPOP(filename, helpData);
 		}
	}
	
	public static void argsReturn(ArrayList<String> commandArgs,String filename,String opType) {
		ArrayList<String> ouputArray = new ArrayList<String>();
		ouputArray.add("cd      ->      arg: Destination Directory");
		ouputArray.add("ls      ->      Has no argument");
		ouputArray.add("cp      ->      arg1: Source Directory, arg2: Destination Directory");
		ouputArray.add("cat     ->      arg1: First File Name, arg2: Second File Name");
		ouputArray.add("more    ->      arg: File Name");
		ouputArray.add("|       ->      arg1: First Command, arg2: Second Command");
		ouputArray.add(">       ->      arg1: Command, arg2: File Name or Path");
		ouputArray.add(">>      ->      arg1: Command, arg2: File Name or Path");
		ouputArray.add("mkdir   ->      arg: Directory Name");
		ouputArray.add("rmdir   ->      arg: Directory Name");
		ouputArray.add("mv      ->      arg1: Source File,    arg2: Destination File");
		ouputArray.add("rm      ->      arg: File Name");
		ouputArray.add("args    -> 		arg: Command Name");
		ouputArray.add("date    ->  	Has no argument");
		ouputArray.add("help    ->  	Has no argument");
		ouputArray.add("pwd     ->   	Has no argument");
		ouputArray.add("clear   -> 		Has no argument");
		if(opType.equals(">")) {
 			OP(filename, ouputArray);
 		}else {
 			OPOP(filename, ouputArray);
 		}

	}

}
