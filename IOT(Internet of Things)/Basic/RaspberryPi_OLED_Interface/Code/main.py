import machine
from machine import Pin, SoftI2C
import ssd1306
from time import sleep
i2c = machine.SoftI2C(scl=machine.Pin(5), sda=machine.Pin(4))
pin = machine.Pin(16, machine.Pin.OUT)
pin.value(0) 
pin.value(1) 
oled_width = 128
oled_height = 64
oled = ssd1306.SSD1306_I2C(oled_width, oled_height, i2c)
oled.fill(0)
oled.text('Hello, World!', 0, 10)
oled.show()