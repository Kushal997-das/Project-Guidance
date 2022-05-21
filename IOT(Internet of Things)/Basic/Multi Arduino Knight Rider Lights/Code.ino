#include<Wire.h>

int it=0;

void setup(){
  int i;
  for(i=13;i>=2;i--){
    pinMode(i, OUTPUT);
    digitalWrite(i,LOW);
  }
Wire.begin(1);
Wire.onReceive(receiveEvent);
}
 
void receiveEvent(int bytes) {
	it = Wire.read(); 
}

void loop() {  
  int pinmode[12] = {13,12,11,10,9,8,7,6,5,4,3,2};
  int point = 0;
  int dir = 1;
  while(1){
    int d = map( it , 0 , 1023 , 1 , 1000); 
    digitalWrite(pinmode[point],HIGH);
    delay(d);
    digitalWrite(pinmode[point],LOW);
    point = point+dir;
    if(point==0 || point==11){
      dir = dir*(-1);
    }
  }
}
