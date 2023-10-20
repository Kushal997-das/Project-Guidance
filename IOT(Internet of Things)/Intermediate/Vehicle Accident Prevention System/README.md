# Vehicle Accident Prevention System


## Aim

To design a Arduino Based Vehicle Accident Prevention System.


## Purpose

This project proposes a quite efficient way to prevent road accidents.


## Components Required

* Arduino UNO
* Breadboard
* Connecting Wires
* LCD 
* Potentiometer 
* Ultrasonic Sensor
* Servo Motor
* Buzzer
* 1 Red LED
* 1 Green LED
* 2 Resisitors

## Short Description 

The project deals with prevention of accident by sending alarm and a warning message to the driver if there are other vehicles in the vicinity. It also has a feature of automatic breaking system which turns on when any vehicle is too close than the given threshold distance.

## Workflow of the Project

- The servo motor acts like the breaking system of the vehicle.
- When vehicle is greater than 3m greater than the subject:
  - Green LED is turned on.
  - **Safe Distance** message is displayed on the LCD screen.
- When vehicle is lesser than 3m and greater than 1.5m close to the subject:
  - Green LED is turned on.
  - **Caution Message** is displayed on the LCD screen.
-  When vehicle lesser than 1.5m and greater than 1m close to the subject:
    - Red LED is turned on.
    - **Apply Break** message is displayed on the LCD screen.
- When vehicle is less than 1m from the subject:
  - Automatic Brakes are applied.
  - Green LED is turned on.
  - **Brakes Applied** messsage is displayed on the LCD screen.


## Setup instructions

- Design and assemble the circuit as shown in the image.
- Check the connections of all the components.
- Upload the code which is provided.
- Start the simulation

## Output

![image](https://user-images.githubusercontent.com/76259897/156437565-964db7e8-67b6-432a-8e26-f1da12d26c31.png)

[Simulation Video](https://github.com/rittikadeb/Project-Guidance/blob/vehicle-accident-prevention/IOT(Internet%20of%20Things)/Intermediate/Vehicle%20Accident%20Prevention%20System/Images/vehicle_accident_prevention_system.mp4)




