import machine
import ssd1306
from time import sleep
# Initialize the I2C communication
i2c = machine.SoftI2C(scl=machine.Pin(5), sda=machine.Pin(4))
# Reset the OLED display (optional)
pin = machine.Pin(16, machine.Pin.OUT)
pin.value(0)  # Set GPIO16 low to reset OLED
pin.value(1)  # While OLED is running, set GPIO16 high
# Create an instance of the SSD1306 OLED driver
oled_width = 128
oled_height = 64
oled = ssd1306.SSD1306_I2C(oled_width, oled_height, i2c)
# Function to draw a square in the center
def draw_square():
    square_size = 20
    center_x = oled_width // 2
    center_y = oled_height // 2
    x0 = center_x - square_size // 2
    y0 = center_y - square_size // 2
    x1 = center_x + square_size // 2
    y1 = center_y + square_size // 2
    oled.rect(x0, y0, square_size, square_size, 1)
# Clear the OLED display
oled.fill(0)
# Draw a square in the center of the OLED
draw_square()
# Update the OLED display to show the text and square
oled.show()