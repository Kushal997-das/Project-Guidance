import machine
import ssd1306
from time import sleep
import math
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
# Function to clear the OLED screen
def clear_screen():
    oled.fill(0)
    oled.show()
# Animation parameters
rocket_height = 20  # Make the rocket go higher
rocket_x = oled_width // 2
rocket_y = oled_height
# Function to draw a circle at the given position
def draw_circle(x, y, radius):
    for i in range(radius * 2):
        for j in range(radius * 2):
            distance = math.sqrt((i - radius) ** 2 + (j - radius) ** 2)
            if distance < radius:
                oled.pixel(x - radius + i, y - radius + j, 1)
# Function to display the bursting pattern
def display_burst_pattern(x, y, radius, iterations):
    for r in range(1, radius, max(1, int(radius/iterations))):
        clear_screen()
        draw_circle(x, y, r)
        oled.show()
        sleep(0.03)
# Main animation loop
try:
    while True:
        # Rocket animation: Move the rocket upwards
        for y in range(oled_height, oled_height - rocket_height, -1):
            clear_screen()
            oled.rect(rocket_x - 2, y - rocket_height, 4, rocket_height, 1)
            oled.show()
            sleep(0.1)
        # Burst animation: Display the bursting pattern
        burst_x = rocket_x
        burst_y = oled_height - rocket_height
        burst_radius = 40  # Make the bursts 5 times bigger
        burst_iterations = 20
        display_burst_pattern(burst_x, burst_y, burst_radius, burst_iterations)
except KeyboardInterrupt:
    clear_screen()