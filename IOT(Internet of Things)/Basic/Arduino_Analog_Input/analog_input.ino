// C++ code
int sensorValue = 0;
void setup()
{
  pinMode(A0, INPUT);
  pinMode(2, OUTPUT);
}

void loop()
{
  sensorValue = analogRead(A0);
  digitalWrite(2, HIGH);
  delay(sensorValue);
  digitalWrite(2, LOW);
  delay(sensorValue);
}