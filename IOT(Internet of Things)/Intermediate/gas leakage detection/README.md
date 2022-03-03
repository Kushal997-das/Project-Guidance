# Gas Leakage Detection System
**Created by Advaita Saha**

This is a project to be installed on linux PCs for the detection and alarm notification of LPG leakage. This project uses **pyfirmata** to get data from **LPG sensor** connected to **Arduino**

# Parts Used
Arduino Microcontroller Board

LPG Gas Sensor(MQ3)

# Steps to install the system
First we need to install all the supporting packages

         sudo pip3 install -r requirements.txt

Then we need to install the software for Arduino

         sudo apt-get install arduino

Then Upload the **Standard Firmata** sketch in the examples of Arduino to your Arduino Board

# The connections:-

Connect **5V Arduino** ------- **VCC** of the sensor

Connect **GND Arduino** ------ **GND** of sensor

Connect **A0 Arduino** ------- **Signal**/**Output** pin of sensor

# Running the software
Run the command in the terminal

         sudo python3 alarm_run.py
         
**And we are up and running the system whenever LPG leakage is detected near the sensor, it will be notified on your PC**
