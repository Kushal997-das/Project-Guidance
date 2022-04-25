#include <IRremote.h>

int RECV_PIN = 10;
IRrecv irrecv(RECV_PIN);
decode_results results;

void setup(){
  Serial.begin(9600);
  irrecv.enableIRIn();
  Serial.println("IRin Online");
}


void loop(){
  if (irrecv.decode(&results)){
    Serial.println(results.value, DEC);
    irrecv.resume();
  }
  delay(100);
}