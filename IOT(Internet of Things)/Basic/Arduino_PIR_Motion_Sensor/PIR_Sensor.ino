int sensorState = 0;

void setup(){
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
}

void loop(){
  sensorState = digitalRead(2);

  if (sensorState == HIGH) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}