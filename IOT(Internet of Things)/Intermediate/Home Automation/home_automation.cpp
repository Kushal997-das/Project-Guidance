#include<LiquidCrystal.h> //Include library for LCD.
#include<SoftwareSerial.h>

LiquidCrystal lcd(6,7,2,3,4,5); //initiallize the LCD pins 

int sensorValue = 0;
int mapValue = 0;

const int lightBulb1 = 8;
const int lightBulb2 = 9;
const int ldrSensor = A0;

int degreeCelsius = 0; //state of Temperature Sensor
const int dcMotor1 = 10;
const int dcMotor2 = 11;

void setup() {
  
	Serial.begin(9600);
	lcd.begin(16,2);
  
	pinMode(lightBulb1,OUTPUT);
	pinMode(lightBulb2,OUTPUT);
  
	digitalWrite(lightBulb1,LOW);
	digitalWrite(lightBulb2,LOW);
  
  
  	digitalWrite(dcMotor1,LOW);
	digitalWrite(dcMotor2,LOW);
  
	lcd.clear();
}

void loop() {
{
  
	degreeCelsius = map(((analogRead(A1) - 20) * 3.04), 0, 1023, -40, 125); //Conversion to Celsius Scale
		Serial.print("Temperature: ");
		Serial.print(degreeCelsius);
		Serial.println(" Degree Celcius");
		lcd.setCursor(0,0);
		lcd.print("Temp:");
		lcd.setCursor(6,0);
		lcd.print(degreeCelsius);
		lcd.print("C");
  
//2 dc motors deactivated
if(degreeCelsius<30) //Condition 1
  {
    digitalWrite(dcMotor1,LOW);
    digitalWrite(dcMotor2,LOW);
    lcd.setCursor(0,1);
    lcd.print("MT1:OFF");
    lcd.setCursor(8,1);
    lcd.print("MT2:OFF");
    Serial.println("Motor 1 is OFF.");
    Serial.println("Motor 2 is OFF.");
  }
  //dc motor from the left is activated from the right is deactivated
else if(degreeCelsius>=30 && degreeCelsius<=45) //Condition 2
  {
    digitalWrite(dcMotor1,HIGH);
    digitalWrite(dcMotor2,LOW);
    lcd.setCursor(0,1);
    lcd.print("MT1:ON");
    lcd.setCursor(8,1);
    lcd.print("MT2:OFF");
    Serial.println("Motor 1 is ON.");
    Serial.println("Motor 2 is OFF.");
  }
  //2 dc motors activated
else if(degreeCelsius>45) //Condition 3
  {
    digitalWrite(dcMotor1,HIGH);
    digitalWrite(dcMotor2,HIGH);
    lcd.setCursor(0,1);
    lcd.print("MT1:ON");
    lcd.setCursor(8,1);
    lcd.print("MT2:ON");
    Serial.println("Motor 1 is ON.");
    Serial.println("Motor 2 is ON.");
  }
  Serial.println(" ");
delay(1000);
lcd.clear();
  
}
  
{
	sensorValue = analogRead(ldrSensor);
	mapValue = map(sensorValue,0,1023,0,255); //read values from the sensor
	  
	Serial.print("Current Mapped Value: ");
	Serial.println(mapValue);
  
	if(mapValue<100) //Condition 4
	{
		digitalWrite(lightBulb1,LOW);
		digitalWrite(lightBulb2,LOW);
		Serial.println("Bulb 1 is OFF.");
		Serial.println("Bulb 2 is OFF.");
		lcd.setCursor(0,0);
		lcd.print("Bulb 1 is OFF.");
		lcd.setCursor(0,1);
		lcd.print("Bulb 2 is OFF.");
	}
	else if(mapValue>=100 && mapValue<=150 ) //Condition 5
	{
		digitalWrite(lightBulb1,HIGH);
		digitalWrite(lightBulb2,LOW);
		Serial.println("Bulb 1 is ON.");
		Serial.println("Bulb 2 is OFF.");
		lcd.setCursor(0,0);
		lcd.print("Bulb 1 is ON.");
		lcd.setCursor(0,1);
		lcd.print("Bulb 2 is OFF.");
	}
	else if(mapValue>150) //Condition 6
	{
		digitalWrite(lightBulb1,HIGH);
		digitalWrite(lightBulb2,HIGH);
		Serial.println("Bulb 1 is ON.");
		Serial.println("Bulb 2 is ON.");
		lcd.setCursor(0,0);
		lcd.print("Bulb 1 is ON.");
		lcd.setCursor(0,1);
		lcd.print("Bulb 2 is ON.");
}
}
Serial.println("");
delay(1000);
lcd.clear();
}
