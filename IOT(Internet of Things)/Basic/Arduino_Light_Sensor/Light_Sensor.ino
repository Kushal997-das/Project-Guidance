int sensorValue = 0;

void setup()
{
  pinMode(A0, INPUT);
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  sensorValue = analogRead(A0);
  analogWrite(9, map(sensorValue, 0, 1023, 0, 255));
  delay(100);
}
