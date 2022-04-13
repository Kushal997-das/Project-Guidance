int PotValue = 0;

void setup()
{
  pinMode(A0, INPUT);
  Serial.begin(9600);
}

void loop()
{
  // read the input pin
  PotValue = analogRead(A0);
  // print out the state of the button
  Serial.print("Resistance: ");
  Serial.println(PotValue);
  delay(1500); // Delay a little bit to improve simulation performance
}