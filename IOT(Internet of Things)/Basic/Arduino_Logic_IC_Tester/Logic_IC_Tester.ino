#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 10, 9, 8, 7);
 
int in1 = 3;
int in2 = 4;
int out = 5;
int button = 6;
String gate;
 
void setup(){
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(button, INPUT);
  pinMode(out, INPUT);

  lcd.begin(16, 2);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Logic IC");
  lcd.setCursor(0, 1);
  lcd.print("Tester");
  delay(1500);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Place a Gate and");
  lcd.setCursor(0, 1);
  lcd.print("press the button");
  gate = "";
}
 
void loop(){
  if (digitalRead(button) == HIGH){
    checkNOT();
    checkNOR();
    
    if (gate == ""){
      digitalWrite(in1, 0);
      digitalWrite(in2, 0);
      if (digitalRead(out) == 0){
        digitalWrite(in1, 0);
        digitalWrite(in2, 1);
        if (digitalRead(out) == 0){
          gate = "AND";
        }else if (digitalRead(out) == 1){
          digitalWrite(in1, 1);
          digitalWrite(in2, 1);
          if (digitalRead(out) == 0){
            gate = "XOR";
          }else{
            gate = "OR";
          }
        }
      }else if (digitalRead(out) == 1){
        gate = "NAND";
      }
    }

    if (isGatePresent() == true){
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Gate: Logic ");
      lcd.print(gate);
      pinMode(in1, OUTPUT);
      pinMode(in2, INPUT);
      digitalWrite(in1, 0);
      delay(1000);
      gate = "";
    }else{
      checkNOT();
      if (gate != "NOT"){
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Place a gate for");
        lcd.setCursor(0, 1);
        lcd.print("classification");
        digitalWrite(in1, HIGH);
        digitalWrite(in2, LOW);
        gate = "";
        delay(2000);
      }else if (gate == "NOT"){
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Gate: Logic ");
        lcd.print("NOT");
        Serial.print("Gate: Logic ");
        Serial.print("NOT");
        Serial.println();
        pinMode(in1, OUTPUT);
        pinMode(in2, INPUT);
        digitalWrite(in1, 0);
        delay(1000);
        gate = "";
      }
    }
  }
}


void checkNOR(){
  pinMode(out, OUTPUT);
  pinMode(in1, INPUT);
  digitalWrite(out, 0);
  digitalWrite(in2, 0);
  if (digitalRead(in1) == 1){
    digitalWrite(out, 0);
    digitalWrite(in2, 1);
    if (digitalRead(in1) == 0){
      digitalWrite(out, 1);
      digitalWrite(in2, 0);
      if (digitalRead(in1) == 0){
        digitalWrite(out, 1);
        digitalWrite(in2, 1);
        if (digitalRead(in1) == 0){
          gate = "NOR";
        }
      }
    }
  }

  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(button, INPUT);
  pinMode(out, INPUT);
}


void checkNOT(){
  pinMode(in2, INPUT);
  digitalWrite(in1, 0);
  if (digitalRead(in2) == 1){
    digitalWrite(in1, 1);
    if (digitalRead(in2) == 0) {
      gate = "NOT";
      pinMode(in1, OUTPUT);
      pinMode(in2, INPUT);
    }
  }
 
  pinMode(in2, OUTPUT);
}


boolean isGatePresent(){
  digitalWrite(in1, 0);
  digitalWrite(in2, 0);
  if (digitalRead(out) == 0){
    digitalWrite(in1, 0);
    digitalWrite(in2, 1);
    if (digitalRead(out) == 0){
      digitalWrite(in1, 1);
      digitalWrite(in2, 0);
      if (digitalRead(out) == 0){
        digitalWrite(in1, 1);
        digitalWrite(in2, 1);
        if (digitalRead(out) == 0){
          checkNOR();
          checkNOT();
          if (gate != "NOR" and gate != "NOT"){
            return false;
          }
        }
        else {
          return true;
        }
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }
  else {
    return true;
  }
}