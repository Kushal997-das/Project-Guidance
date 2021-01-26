package synchronizationPackage;

import java.io.IOException;
import java.util.Map;
import java.util.Random;

import synchronizationPackage.*;

public class RouterClass implements Runnable {

	NetworkClass networkClass = new NetworkClass();
	SemaphoreClass semaphoreClass;

	public RouterClass() {
		semaphoreClass = new SemaphoreClass(networkClass.N);
	}

	public void connect() throws InterruptedException {

		for (int i = 0; i < networkClass.devices.size(); i++) {
			Thread t = new Thread(this, networkClass.devices.get(i).getName());
			t.start();
		}

	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		Random random = new Random();
		try {
			String name = "";
			semaphoreClass.reserve(Thread.currentThread().getName());

			name = Thread.currentThread().getName();
			String outF1 = "- Connection " + NetworkClass.connectionNumber(name, 0) + ": "
					+ Thread.currentThread().getName() + " Occupied";
			System.out.println(outF1);
			if (NetworkClass.ch.equals("2")) {
				semaphoreClass.outputGUI.addUpdates(outF1 + "\n");
			}

			FileClasse fileClasse1 = new FileClasse(outF1 + " ");

			Thread.currentThread().sleep(1000);
			String outF2 = "- Connection " + NetworkClass.connectionNumber(name, 0) + ": "
					+ Thread.currentThread().getName() + " Performs online activity";
			System.out.println(outF2);
			if (NetworkClass.ch.equals("2")) {
				semaphoreClass.outputGUI.addUpdates(outF2 + "\n");
			}

			FileClasse fileClasse2 = new FileClasse(outF2 + " ");

			Thread.currentThread().sleep((random.nextInt(5) + 1) * 1000);

			semaphoreClass.release(Thread.currentThread().getName());

			Thread.currentThread().stop();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}