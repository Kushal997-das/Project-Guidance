int tilt = 2;
int led = 13;

void setup(){
  pinMode(tilt, INPUT);
  pinMode(led, OUTPUT);
}
 
void loop(){
  int reading = digitalRead(tilt);
  
  if(reading)
    digitalWrite(led, LOW);
  else
    digitalWrite(led, HIGH);
}