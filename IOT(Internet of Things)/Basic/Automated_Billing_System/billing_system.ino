#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <Wire.h>
#include <SPIFFS.h>
#include <LiquidCrystal_I2C.h>

constexpr uint8_t RST_PIN = 15;    
constexpr uint8_t SS_PIN = 4;    
#define YLED 33
#define RLED 27
#define BUZZER 2
#define BUTTON 5  

int lcdColumns = 16;
int lcdRows = 2;
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);  

MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class
MFRC522::MIFARE_Key key;

AsyncWebServer server(80);

const char *ssid = "Replace with your SSID";
const char *password = "Replace with your Passoword";

String tag;
String page = "";

char input[12];
int count = 0;
 
int a;

int p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5=0, p6=0;
int c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5=0, c6=0;
double total = 0;
int count_prod = 0;

void setup() {
  pinMode(YLED, OUTPUT);
  pinMode(RLED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BUTTON, INPUT_PULLUP);

  lcd.init();
  lcd.backlight();
 
  Serial.begin(115200);
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522

  WiFi.begin(ssid, password);
  Serial.println("Connecting to wifi");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println(".");
  }
  Serial.println("\nWifi Connected");
  Serial.println(WiFi.localIP());
  lcd.setCursor(0, 0);
  lcd.print("Wifi Connected");
  delay(2000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(WiFi.localIP());
  delay(2000);
  lcd.clear();

  Serial.println("Welcome to VON Mart");
  Serial.println("Happy Shopping");
  lcd.setCursor(0, 0);
  lcd.print("Welcome");
  delay(1000);
  lcd.setCursor(0, 1);
  lcd.print("Happy Shopping");
  delay(1000);
  lcd.clear();

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    page = "<html><head><title>ECart</title>";
    page += "<style type=\"text/css\">";
    page += "body { background-color: #f0f0f0; font-family: Arial, sans-serif; }";
    page += "h1 { color: #3498db; }";
    page += "table { width: 1200px; height: 450px; border-collapse: collapse; margin-top: 20px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }";
    page += "th { background-color: #3498db; color: white; padding: 15px; }";
    page += "td { border: 4px solid black; font-size: large; text-align: center; border-style: groove; border-color: rgb(255, 0, 0); padding: 10px; }";
    page += "input[type=\"button\"] { background-color: #3498db; color: white; width: 200px; height: 50px; font-size: large; border: none; cursor: pointer; }";
    page += "input[type=\"button\"]:hover { background-color: #2980b9; }";
    page += "</style></head>";
    page += "<body><center><h1>Welcome to VON Mart</h1><br><br>";
    page += "<table><tr><th>ITEMS</th><th>QUANTITY</th><th>COST</th></tr>";
    page += "<tr><td>NesCafe</td><td>" + String(p1) + "</td><td>" + String(c1) + "</td></tr>";
    page += "<tr><td>OREO</td><td>" + String(p2) + "</td><td>" + String(c2) + "</td></tr>";
    page += "<tr><td>Sugar</td><td>" + String(p3) + "</td><td>" + String(c3) + "</td></tr>";
    page += "<tr><td>Sprite</td><td>" + String(p4) + "</td><td>" + String(c4) + "</td></tr>";
    page += "<tr><td>Chips</td><td>" + String(p5) + "</td><td>" + String(c5) + "</td></tr>";
    page += "<tr><td>Colgate</td><td>" + String(p6) + "</td><td>" + String(c6) + "</td></tr>";
    page += "<tr><th>Grand Total</th><th>" + String(count_prod) + "</th><th>" + String(total) + "</th></tr>";
    page += "</table><br><input type=\"button\" name=\"Pay Now\" value=\"Pay Now\"></center></body></html>";
    page += "<meta http-equiv=\"refresh\" content=\"2\">";
    request->send(200, "text/html", page);
  });
  server.begin();
}

void loop() {
  count=0;
  if ( ! rfid.PICC_IsNewCardPresent())
    return;
  if (rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < 5; i++) {
      tag += rfid.uid.uidByte[i];
    }
    Serial.println(tag);
    int a = digitalRead(5);
    if((tag=="67542372530")&&(a==HIGH)){
      Serial.println("Product name : NesCafe ") ;
      Serial.println("Product price : 35 Rs");
      lcd.setCursor(0, 0);
      lcd.print("NesCafe Added");
      lcd.setCursor(0, 1);
      lcd.print("Price : 35");
      p1++;
      total += 35 ;
      count_prod++;
      digitalWrite(33, HIGH);
      delay(1000);
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, LOW);
      delay(1000);
      Serial.println("Nescafe added to the Cart");
      lcd.clear();
    }
    else if((tag=="67542372530")&&(a==LOW))
    {
    if (p1 > 0)
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("NesCafe Removed");
      p1--;
      total = total - 35;
      count_prod--;
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, HIGH);
      delay(1000);
      digitalWrite(27, LOW);
      delay(1000);
      lcd.clear();}
      else
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Not in cart");
      delay(1000);
      lcd.clear();
    }
  }
    if((tag=="17074191220")&&(a==HIGH)){
      Serial.println("Product name : OREO ") ;
      Serial.println("Product price : 10 Rs");
      lcd.setCursor(0, 0);
      lcd.print("OREO Added");
      lcd.setCursor(0, 1);
      lcd.print("Price : 10");
      p2++;
      total += 10 ;
      count_prod++;
      digitalWrite(33, HIGH);
      delay(1000);
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, LOW);
      delay(1000);
      Serial.println("OREO added to the Cart");
      lcd.clear();
    }
    else if ((tag=="17074191220")&&(a==LOW))
    {
    if (p2 > 0)
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("OREO Removed");
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, HIGH);
      delay(1000);
      digitalWrite(27, LOW);
      delay(1000);
      p2--;
      total = total - 10;
      count_prod--;
      lcd.clear();}
      else
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Not in cart");
      delay(1000);
      lcd.clear();
    }
  }
    if((tag=="247821171010")&&(a==HIGH)){
      Serial.println("Product name : Sugar ") ;
      Serial.println("Product price : 80 Rs");
      lcd.setCursor(0, 0);
      lcd.print("Sugar Added");
      lcd.setCursor(0, 1);
      lcd.print("Price : 80");
      p3++;
      total += 80 ;
      count_prod++;
      digitalWrite(33, HIGH);
      delay(1000);
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, LOW);
      delay(1000);
      Serial.println("Sugar added to the Cart");
      lcd.clear();
    }
    else if ((tag=="247821171010")&&(a==LOW))
    {
    if (p3 > 0)
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Sugar Removed");
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, HIGH);
      delay(1000);
      digitalWrite(27, LOW);
      delay(1000);
      p3--;
      total = total - 80;
      count_prod--;
      lcd.clear();}
      else
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Not in cart");
      delay(1000);
      lcd.clear();
    }
  }
     if((tag=="1952511572530")&&(a==HIGH)){
      Serial.println("Product name : Sprite ") ;
      Serial.println("Product price : 40 Rs");
      lcd.setCursor(0, 0);
      lcd.print("Sprite Added");
      lcd.setCursor(0, 1);
      lcd.print("Price : 40");
      p4++;
      total += 40 ;
      count_prod++;
      digitalWrite(33, HIGH);
      delay(1000);
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, LOW);
      delay(1000);
      Serial.println("Sprite added to the Cart");
      lcd.clear();
    }
    else if((tag=="1952511572530")&&(a==LOW))
    {
    if (p4 > 0)
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Sprite Removed");
      delay(1000);
      p4--;
      total = total - 40;
      count_prod--;
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, HIGH);
      delay(1000);
      digitalWrite(27, LOW);
      delay(1000);
      lcd.clear();}
      else
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Not in cart");
      delay(1000);
      lcd.clear();
    }
  }
  if((tag=="184205161180")&&(a==HIGH)){
      Serial.println("Product name : Chips ") ;
      Serial.println("Product price : 20 Rs");
      lcd.setCursor(0, 0);
      lcd.print("Chips Added");
      lcd.setCursor(0, 1);
      lcd.print("Price : 20");
      p5++;
      total += 20 ;
      count_prod++;
      digitalWrite(33, HIGH);
      delay(1000);
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, LOW);
      delay(1000);
      Serial.println("Chips added to the Cart");
      lcd.clear();
    }
    else if((tag=="184205161180")&&(a==LOW))
    {
    if (p5 > 0)
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Chips Removed");
      delay(1000);
      p5--;
      total = total - 20;
      count_prod--;
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, HIGH);
      delay(1000);
      digitalWrite(27, LOW);
      delay(1000);
      lcd.clear();}
      else
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Not in cart");
      delay(1000);
      lcd.clear();
    }
  }
    if((tag=="9912522470")&&(a==HIGH)){
      Serial.println("Product name : Colgate ") ;
      Serial.println("Product price : 100 Rs");
      lcd.setCursor(0, 0);
      lcd.print("Colgate Added");
      lcd.setCursor(0, 1);
      lcd.print("Price : 100");
      p6++;
      total += 100 ;
      count_prod++;
      digitalWrite(33, HIGH);
      delay(1000);
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, LOW);
      delay(1000);
      Serial.println("Colgate added to the Cart");
      lcd.clear();
    }
    else if((tag=="9912522470")&&(a==LOW))
    {
    if (p6 > 0)
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Colgate Removed");
      delay(1000);
      p5--;
      total = total - 100;
      count_prod--;
      digitalWrite(33, LOW);
      tone(BUZZER, 1000);
      delay(500);
      noTone(BUZZER);
      digitalWrite(27, HIGH);
      delay(1000);
      digitalWrite(27, LOW);
      delay(1000);
      lcd.clear();}
      else
    {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Not in cart");
      delay(1000);
      lcd.clear();
    }
  }

    c1=p1*35.00;
    c2=p2*10.00;
    c3=p3*80.00;
    c4=p4*25.00;
    c5=p5*20.00;
    c6=p6*100.00;
   
    tag = "";
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
   
  }
}
