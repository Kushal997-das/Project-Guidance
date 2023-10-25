#include <LiquidCrystal.h> // Include library for LCD.
#include <Keypad.h> // Include keypad library.
#include <Servo.h>

const byte rows = 4; 
const byte cols = 4; 

// Define the keymap.
char keys[rows][cols] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[rows] = {2,12,11,10}; // Keypad ROW0, ROW1, ROW2 and ROW3 are connected to these Arduino pins.
byte colPins[cols] = {9,8,7,6}; // Keypad COL0, COL1, COL2 and COL3 are connected to these Arduino pins.

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, rows, cols); // Create the keypad.

LiquidCrystal lcd(A0, A1, A2, A3, A4, A5);

int sensor1 = 13; 
int state = 0; // State of the PIR sensor.
bool motionDetected = false;
bool locked = false; // Defines whether the program should listen for the data from sensor and respond to it or not.

int ledGreen = 3; 
int ledRed = 4; 

Servo servo;

int buzzer = 5; 

String passcode = "14"; // Default passcode 
String input = ""; // Input that will be read from keypad 

void setup() {
  pinMode(sensor1, INPUT); 
  pinMode(ledGreen, OUTPUT); 
  pinMode(ledRed, OUTPUT); 
  pinMode(buzzer, OUTPUT);
  servo.attach(1);
  lcd.begin(16,2); 
}

void loop() {
  if(locked == false){ // Check whether system is not locked.
    digitalWrite(ledGreen, LOW); 
    lcd.setCursor(0,0);
	lcd.print("Lock Inactive"); 
    servo.write(0);
    char key = keypad.getKey(); // Read key from keypad.
    if(key && key != '*'){ // Check whether key has been read from keypad and is not equal to "*" which is submit key.
        input += key; // Read passcode from keypad and store it in input variable.
    }
    if(key == '*'){ // Check whteher "*" submit key has been pressed on keypad.
      if(passcode == input){ 
        locked = true; // Lock the system 
        input = ""; // Clear input variable.
        lcd.clear();
        lcd.setCursor(0,0);
        lcd.print("Secured");
        lcd.setCursor(0,1);
        lcd.print(":D");
        servo.write(90);
        delay(3500);
        lcd.clear();
      }
    }
  }
  else if(locked == true){ // Check whether system is locked.
    char key = keypad.getKey(); // Read key from keypad.
    if(key && key != '*'){ // Check whether key has been read from keypad 
        input += key; // Read passcode from keypad and store it in input variable.
    }
    if(key == '*'){ // Check whteher "*" submit key has been pressed on keypad.
      if(passcode == input){ 
        locked = false; // Unlock the system 
        input = ""; 
        lcd.clear(); 
        lcd.setCursor(0,0);
        lcd.print("Disarmed");
        lcd.setCursor(0,1);
        lcd.print(":(");
        delay(3500);
        lcd.clear();
      }
    }
    state = digitalRead(sensor1); 
    delay(100); 
    if(state == HIGH){ 
      digitalWrite(ledGreen, LOW); 
      digitalWrite(ledRed, HIGH); 
      lcd.clear(); 
      lcd.setCursor(0,0);
      lcd.print("Movement Detected!");
      lcd.setCursor(0,1);
      lcd.print("Alert!!"); 
      alarm(); 
      delay(50); 
      lcd.clear(); 

    }
    else{ 
      noTone(buzzer);
      lcd.setCursor(0,0); 
      lcd.print("Lock Active"); 
      digitalWrite(ledGreen, HIGH); 
      digitalWrite(ledRed, LOW);
    }
  }
}
void alarm(){ 
    tone(buzzer, 500); 
    

}
