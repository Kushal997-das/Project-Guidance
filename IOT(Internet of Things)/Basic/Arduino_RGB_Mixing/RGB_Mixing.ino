void setup()
{
  pinMode(11, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(9, OUTPUT);
}

void loop()
{
  analogWrite(11, 255);
  analogWrite(10, 0);
  analogWrite(9, 0);
  delay(1000); // Wait for 1000 millisecond(s)
  analogWrite(11, 0);
  analogWrite(10, 255);
  analogWrite(9, 0);
  delay(1000); // Wait for 1000 millisecond(s)
  analogWrite(11, 0);
  analogWrite(10, 0);
  analogWrite(9, 255);
  delay(1000); // Wait for 1000 millisecond(s)
  analogWrite(11, 170);
  analogWrite(10, 170);
  analogWrite(9, 170);
  delay(1000); // Wait for 1000 millisecond(s)

}