# IoT Based Automated Billing System 

The project involves creating an automated billing system using ESP32 and MFRC522 RFID Reader and Tag.

## Components used -

1. ESP32 Microcontroller 
2. MFRC522 RFID Tag and Reader
3. Push Button
4. Red and Yellow LED
5. LCD Display
6. Buzzer
7. 2 - 220 ohm resistors
8. Arduino IDE - Software

## The circuit diagram is as shown
![circuit](https://github.com/Vrisha213/Project-Guidance/assets/74671946/70689bed-0c07-455f-8f13-bb264886473d)


## The implementation diagram is as shown
![setup (1)](https://github.com/Vrisha213/Project-Guidance/assets/74671946/3b3c8f40-2ee7-4661-a316-9907c5149484)


## Working of the System

The tag stores the name and price of the product. When powered on, the ESP32 connects to Wi-Fi and starts a web server to display the current items in the cart. Initially the product cost and quantity are set to zero. The RFID reader scans tags and if a recognized tag is detected, it adds or removes the corresponding product based on the status of the push button ( HIGH or LOW) and the information gets updated on the HTML server as well as displayed on the LCD. The web server provides a live HTML page showing the items, their quantities, costs and the grand total, refreshing every two seconds. LEDs and buzzer are provided for item addition or removal. The code includes predefined products (e.g., NesCafe, Oreo) with specific RFID tags and prices, and it keeps track of the number of each product in the cart, updating the display and server accordingly. If the tag is scanned and product is added to the cart the yellow LED glows and if the push button is pressed and a tag is scanned then the product is removed from the cart and the red LED glows. The buzzer buzzes while addition as well as removal. After the ESP32 connects to the Wi-Fi it generates a local IP address which needs to be copied and pasted in the browser to open the web server. 

## Implementation Video
[Video](Images/implementation.mp4)

## Requirements

Make sure to change the SSID and Password before uploading the code to the Arduino IDE.

Ensure that the baud rate is 115200.
