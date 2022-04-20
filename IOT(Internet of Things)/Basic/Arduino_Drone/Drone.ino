int boton = 13;
int motor1 = 2;
int motor2 = 3;
int motor3 = 4;
int motor4 = 5;

void setup()
{
pinMode(boton , INPUT);
pinMode(motor1 , OUTPUT);
pinMode(motor2 , OUTPUT);
pinMode(motor3 , OUTPUT);
pinMode(motor4 , OUTPUT);
}

void loop()
{

  int estadoBoton = digitalRead(boton);
  
  if (estadoBoton == 1){
  
  digitalWrite(motor1 , LOW);
  digitalWrite(motor2 , LOW);
  digitalWrite(motor3 , LOW);
  digitalWrite(motor4 , LOW);
    
  } else {
  
  digitalWrite(motor1 , HIGH);
  digitalWrite(motor2 , HIGH);
  digitalWrite(motor3 , HIGH);
  digitalWrite(motor4 , HIGH);
  }  
}