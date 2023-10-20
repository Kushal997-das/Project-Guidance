#include <LiquidCrystal.h> // Include library for LCD.
LiquidCrystal lcd(2, 3, 4, 5, 6, 7);
#include <Servo.h> // Include library for Servomotor.
int distanceThreshold = 0; // Initiaze threshold distance

Servo myservo;
int cm = 0;
int green = 8;
int red = 9;
int buzzer = 13;
int pos = 0;

long readUltrasonicDistance(int triggerPin, int echoPin)
{
  pinMode(triggerPin, OUTPUT);
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  pinMode(echoPin, INPUT);
  return pulseIn(echoPin, HIGH);
}

void setup()
{
  pinMode(green, OUTPUT);
  pinMode(red, OUTPUT);
  pinMode(buzzer, OUTPUT);
  lcd.begin(16, 2);
  myservo.attach(12);
  Serial.begin(9600);
}

void loop()
{
  lcd.clear();
  cm = 0.01723 * readUltrasonicDistance(11,10); //Calculation of distance 
 
  if( cm >=300) // Condition 1
  {
    digitalWrite(red, LOW);
    digitalWrite(green, HIGH);
    digitalWrite(buzzer, LOW);
    lcd.setCursor(1,0);
    lcd.print("Safe Distance");
  }
   if (cm <=300 && cm > 150) // Condition 2
  {
  	digitalWrite(red, LOW);
    digitalWrite(green, HIGH);
    digitalWrite(buzzer, LOW);
    lcd.setCursor(2,0);
    lcd.print("Be Cautious!");
    lcd.setCursor(0,1);
    lcd.print("Chance of Impact");
   
  }
  
  if (cm <= 150 && cm > 100) // Condition 3
  {
	digitalWrite(red, HIGH);
    digitalWrite(green, LOW);
    tone(buzzer,800,1000);
    lcd.setCursor(4,0);
    lcd.print("Danger!");
    lcd.setCursor(0,1);
    lcd.print("Apply Breaks!!!");
   
  }
  
  if (cm <= 100) // Condition 4
  {
	digitalWrite(red, LOW);
    digitalWrite(green, HIGH);
    digitalWrite(buzzer, LOW);
    lcd.setCursor(0,0);
    lcd.print("Breaks Applied!");
    lcd.setCursor(0,1);
    lcd.print("You are Safe Now");
    for (pos = 1; pos <= 90; pos ++) // Changes servo position
    { 
    myservo.write(pos);             
    delay(5);                       
  	}
  	for (pos = 90; pos >= 1; pos --) 
  	{ 
    myservo.write(pos);             
    delay(5);                     
  	}
    delay(1000);
    
  }
  
  delay(1000); 
}
