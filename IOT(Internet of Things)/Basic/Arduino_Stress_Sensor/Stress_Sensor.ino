int led1 = 2;
int led2 = 3;
int led3 = 4;
int led4 = 5;
int led5 = 6;
int led6 = 7;
int fsrreading;

void setup(){  
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(led5, OUTPUT);
  pinMode(led6, OUTPUT);
}

void loop(){
  fsrreading = analogRead(A0);

  if (fsrreading > 200){
    digitalWrite(led1, HIGH);
  }
  else digitalWrite(led1, LOW);
  if (fsrreading > 450){
    digitalWrite(led2, HIGH);
  }
  else digitalWrite(led2, LOW);
  if (fsrreading > 550){
    digitalWrite(led3, HIGH);
  }
  else digitalWrite(led3, LOW);
  if (fsrreading > 650){
    digitalWrite(led4, HIGH);
  }
  else digitalWrite(led4, LOW);
  if (fsrreading > 800){
    digitalWrite(led5, HIGH);
  }
  else digitalWrite(led5, LOW);
  if (fsrreading > 900){
    digitalWrite(led6, HIGH);
  }
  else digitalWrite(led6, LOW);
}