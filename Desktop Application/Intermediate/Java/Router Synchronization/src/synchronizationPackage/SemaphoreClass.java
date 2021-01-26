package synchronizationPackage;

import java.io.IOException;

import synchronizationPackage.*;

public class SemaphoreClass {
	public Integer bound = 0;
	public static OutputGUI outputGUI;

	public SemaphoreClass(Integer bound) {
		// TODO Auto-generated constructor stub
		this.bound = bound;
		if (NetworkClass.ch.equals("2")) {
			outputGUI = new OutputGUI();
		}
	}

	public synchronized void reserve(String name) throws InterruptedException, IOException {
		bound--;
		if (bound < 0) {
			int g = 0;
			String out = "";
			for (int i = 0; i < NetworkClass.devices.size(); i++) {
				if (NetworkClass.devices.get(i).getName().equals(name)) {
					out = name + " ( " + NetworkClass.devices.get(i).getType() + " )" + " Arrived and waiting";
					break;
				}
			}
			System.out.println(out);
			if (NetworkClass.ch.equals("2")) {
				outputGUI.addUpdates(out + "\n");
			}
			FileClasse fileClasse = new FileClasse(out + " ");
			wait();
		} else {
			int g = 0;
			String out = "";

			for (int i = 0; i < NetworkClass.devices.size(); i++) {
				if (NetworkClass.devices.get(i).getName().equals(name)) {
					out = name + " ( " + NetworkClass.devices.get(i).getType() + " )" + " Arrived";
					break;
				}
			}
			System.out.println(out);
			if (NetworkClass.ch.equals("2")) {
				outputGUI.addUpdates(out + "\n");
			}
			FileClasse fileClasse3 = new FileClasse(out + " ");

		}

	}

	public synchronized void release(String name) throws IOException {
		bound++;
		if (bound <= 0)
			notify();
		String out = "- Connection " + NetworkClass.connectionNumber(name, 1) + ": " + name + " Logged out";
		System.out.println(out);
		if (NetworkClass.ch.equals("2")) {
			outputGUI.addUpdates(out + "\n");
		}
		FileClasse fileClasse4 = new FileClasse(out + " ");

	}

	public Integer getBound() {
		return bound;
	}

	public void setBound(Integer bound) {
		this.bound = bound;
	}
}