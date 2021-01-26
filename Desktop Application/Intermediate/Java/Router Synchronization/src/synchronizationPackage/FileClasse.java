package synchronizationPackage;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class FileClasse {
	final String currentDirectory = System.getProperty("user.dir");
	private File logFile;
	public FileWriter myWriter;

	FileClasse(String content) throws IOException {
		logFile = new File(currentDirectory + "\\" + "logFile.txt");
		myWriter = new FileWriter(logFile, true);
		if (!logFile.exists()) {
			logFile.createNewFile();
		}
		myWriter.write(content);
		myWriter.write(System.getProperty("line.separator"));
		myWriter.close();
	}

}
