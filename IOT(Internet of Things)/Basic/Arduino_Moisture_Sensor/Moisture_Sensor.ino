#include <LiquidCrystal.h>

LiquidCrystal lcd(2, 3, 4, 5, 6, 7);

void setup(){
  const int LM35 = A0;
  lcd.begin(16, 2);
  lcd.print("SoilM = ");
}

void loop(){
  int value = analogRead(LM35);
  float Moisture = value * 500.0 / 1023.0;
  lcd.setCursor(6,0);
  lcd.print(Moisture); 
  lcd.setCursor(11,1);
}
