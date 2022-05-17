int led[5] = {2,3,4,5,6};
int button[5] = {7, 8,9,10,11};
int buzzer = 12;
int check=0;
int randomled;
int switch_val = -1;
bool stop = true;

void setup(){
  Serial. begin(9600);
  for(int i=0;i<5;i++)
  {
    pinMode(led[i],OUTPUT);
    pinMode(button[i],INPUT);
  }
  
  pinMode(buzzer, OUTPUT);
 // randomled = getRandom();
  randomSeed(analogRead(0));
  reset();

 
}
int reset(){
	randomled = random(4)+1;
  	Serial.println(randomled);
  noTone(buzzer);
}
void loop(){
  
  if(stop)
  for(int i=0;i<5;i++)
  {
    int x = digitalRead(button[i]);
    if(x == HIGH)
    {
      switch_val = i;
      break;
    }
  }
  
  if(switch_val!=-1&&stop){
    Serial.println(randomled);
   if(button[switch_val]== button[randomled])
   {
     digitalWrite(led[switch_val],HIGH);
     digitalWrite(buzzer,HIGH);
     delay(2000);
     digitalWrite(buzzer,LOW);
    
     for(int i=0;i<5;i++)
     digitalWrite(led[i],HIGH);
    
     switch_val = -1;
     stop=false;
     
   }
   else
   digitalWrite(led[switch_val],HIGH);
  }
}