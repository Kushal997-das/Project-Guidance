#define LEFT_SENSOR 3  // pin connected to the left sensor
#define RIGHT_SENSOR 4 // pin connected to the right sensor

#define Motor14 1  // pin connected to motor 1 (control pin 1)
#define Motor15 0  // pin connected to motor 1 (control pin 2)
#define Motor17 5  // pin connected to motor 2 (control pin 1)
#define Motor18 6  // pin connected to motor 2 (control pin 2)

void setup() {
  // Set Timer 0 for PWM (Pulse Width Modulation) used for motor speed control
  TCCR0B = TCCR0B & B11111000 | B00000010;

  // Start serial communication for debugging (optional)
  Serial.begin(9600);

  // Set sensor pins as inputs
  pinMode(LEFT_SENSOR, INPUT);
  pinMode(RIGHT_SENSOR, INPUT);

  // Set motor control pins as outputs
  pinMode(Motor14, OUTPUT);
  pinMode(Motor15, OUTPUT);
  pinMode(Motor17, OUTPUT);
  pinMode(Motor18, OUTPUT);
}

void loop() {
  int leftSensorValue = analogRead(LEFT_SENSOR);  // Read analog value from left sensor
  int rightSensorValue = analogRead(RIGHT_SENSOR); // Read analog value from right sensor

  // Print sensor readings for debugging (optional)
  Serial.print("LEFT_SENSOR = ");
  Serial.println(leftSensorValue);

  Serial.print("RIGHT_SENSOR = ");
  Serial.println(rightSensorValue);

  // Call the rotation function to control motor movement based on sensor readings
  rotation(leftSensorValue, rightSensorValue);
}

void rotation(int leftValue, int rightValue) {
  // Forward (both sensors see white - high sensor readings)
  if (leftValue >= 800 && rightValue >= 800) {
    digitalWrite(Motor14, HIGH);
    digitalWrite(Motor15, LOW);
    digitalWrite(Motor17, HIGH);
    digitalWrite(Motor18, LOW);  // Set motors to move forward
  }

  // Right turn (left sensor sees black - low sensor reading, right sensor sees white)
  else if (leftValue <= 800 && rightValue >= 800) {
    digitalWrite(Motor14, LOW);
    digitalWrite(Motor15, HIGH);
    digitalWrite(Motor17, HIGH);
    digitalWrite(Motor18, LOW);  // Set motors to turn right
  }

  // Left turn (left sensor sees white, right sensor sees black)
  else if (leftValue >= 800 && rightValue <= 800) {
    digitalWrite(Motor14, HIGH);
    digitalWrite(Motor15, LOW);
    digitalWrite(Motor17, LOW);
    digitalWrite(Motor18, HIGH);  // Set motors to turn left
  }

  // Stop (both sensors see black - low sensor readings)
  else {
    digitalWrite(Motor14, LOW);
    digitalWrite(Motor15, LOW);
    digitalWrite(Motor17, LOW);
    digitalWrite(Motor18, LOW);  // Stop motors
    delay(400);                   // Wait for 400 milliseconds

    // Short forward movement to help escape from a centered position
    digitalWrite(Motor14, HIGH);
    digitalWrite(Motor15, LOW);
    digitalWrite(Motor17, HIGH);
    digitalWrite(Motor18, LOW);  // Short forward movement
    delay(400);                   // Wait for 400 milliseconds
  }
}
