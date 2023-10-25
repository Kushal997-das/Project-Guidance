# Home Security System


## Aim

To design a Arduino Based Home Security System


## Purpose

This low-cost and effective system helps you to protect your house from thieves/intruders.


## Components Required

* Arduino UNO
* Breadboard
* Connecting Wires
* LCD 
* Potentiometer
* Keypad
* PIR Sensor
* Servo Motor
* Buzzer
* 1 Red LED
* 1 Green LED
* 4 Resisitors

## Short Description 

In this project, we are using PIR Motion Sensor Module as an infraredsensor that generates electric charge when exposed in heat and sends a signal to Arduino. Accordingly the Arduino displays the status on LCD screen and start buzzing the buzzer and glows the LEDs.

## Workflow of the Project

- The servo motor acts like the lock
- When ths system is not locked the green LED is turned on and a LOCK INACTIVE message is displayed on the LCD Screen.
- When the system is locked by giving the default password through the keypad:
  - Servo rotates
  - Secured message is displayed on the LCD
  - When any movement is detected by the PIR Sensor:
    - Red LED is turned on
    - Warning message is displayed on the LCD
    - Buzzer is turned on
- When again the default password is inputed :
  - Servo rotates back to the origial position
  - Lock is disarmed 
  - Message displayed on the LCD screen.


## Setup instructions

- Design and assemble the circuit as shown in the image.
- Check the connections of all the components.
- Upload the code provided.
- Start the simulation

## Output

![Circuit](https://user-images.githubusercontent.com/76259897/156227022-d60e95c8-9fc1-493c-b6eb-9fd0540929a6.png)


[Simulation Video](https://github.com/rittikadeb/IoT-Spot/blob/main/Arduino/Home%20Security%20System/Images/home_security_system.mp4)




