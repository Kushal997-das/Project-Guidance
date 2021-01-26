package synchronizationPackage;

import synchronizationPackage.*;


import java.awt.EventQueue;
import java.awt.Window;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import javax.swing.*;

public class NetworkClass {

	public static Scanner input = new Scanner(System.in);
	public static ArrayList<DeviceClass> devices = new ArrayList<DeviceClass>();
	public static ArrayList<String> names = new ArrayList<String>();
	public static ArrayList<Boolean> state = new ArrayList<Boolean>();
	public static int N;
	public static int TC;
	public static String ch;

	public static void main(String[] args) throws InterruptedException, IOException {
		// TODO Auto-generated method stub
		System.out.println("Welcome, Enter 1 for Console, Or 2 for GUI ");
		ch = input.next();
		if (ch.equals("1")) {

			System.out.println("What is number of WI-FI Connections?");
			N = input.nextInt();

			System.out.println("What is number of devices clients want to connect?");
			TC = input.nextInt();

			String name = "";
			String type = "";

			for (int i = 0; i < TC; i++) {

				name = input.next();
				type = input.next();

				devices.add(new DeviceClass(name, type));
			}

			for (int j = 0; j < N; j++) {
				names.add("");
				state.add(false);
			}

			RouterClass routerClass = new RouterClass();
			routerClass.connect();

		} else if (ch.equals("2")) {
			RouterGUI gui = new RouterGUI();
		} else {
			System.out.println("Wrong input.");
		}

	}

	public synchronized static int connectionNumber(String name, int x) {

		int connectionNum = 0;
		int flag = 0;

		if (x == 1) {
			for (int k = 0; k < N; k++) {
				if (names.get(k).equals(name)) {
					names.set(k, "");
					state.set(k, false);
					connectionNum = k + 1;
				}
			}
		} else {

			for (int i = 0; i < N; i++) {

				if (name.equals(names.get(i))) {
					connectionNum = i + 1;
					flag++;
				}
			}
			if (flag == 0) {

				for (int j = 0; j < N; j++) {
					if (state.get(j) == false) {
						state.set(j, true);
						connectionNum = j + 1;
						names.set(j, name);
						break;
					}
				}
			}
		}

		return connectionNum;
	}

}