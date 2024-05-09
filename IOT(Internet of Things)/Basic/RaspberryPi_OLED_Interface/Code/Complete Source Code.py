//MicroPython SSD1306 OLED driver, I2C and SPI interfaces


 


from micropython import const


import framebuf


# register definitions


SET_CONTRAST = const(0x81)


SET_ENTIRE_ON = const(0xA4)


SET_NORM_INV = const(0xA6)


SET_DISP = const(0xAE)


SET_MEM_ADDR = const(0x20)


SET_COL_ADDR = const(0x21)


SET_PAGE_ADDR = const(0x22)


SET_DISP_START_LINE = const(0x40)


SET_SEG_REMAP = const(0xA0)


SET_MUX_RATIO = const(0xA8)


SET_COM_OUT_DIR = const(0xC0)


SET_DISP_OFFSET = const(0xD3)


SET_COM_PIN_CFG = const(0xDA)


SET_DISP_CLK_DIV = const(0xD5)


SET_PRECHARGE = const(0xD9)


SET_VCOM_DESEL = const(0xDB)


SET_CHARGE_PUMP = const(0x8D)


# Subclassing FrameBuffer provides support for graphics primitives


# http://docs.micropython.org/en/latest/pyboard/library/framebuf.html


class SSD1306(framebuf.FrameBuffer):


    def __init__(self, width, height, external_vcc):


        self.width = width


        self.height = height


        self.external_vcc = external_vcc


        self.pages = self.height // 8


        self.buffer = bytearray(self.pages * self.width)


        super().__init__(self.buffer, self.width, self.height, framebuf.MONO_VLSB)


        self.init_display()


    def init_display(self):


        for cmd in (


            SET_DISP | 0x00,  # off


            # address setting


            SET_MEM_ADDR,


            0x00,  # horizontal


            # resolution and layout


            SET_DISP_START_LINE | 0x00,


            SET_SEG_REMAP | 0x01,  # column addr 127 mapped to SEG0


            SET_MUX_RATIO,


            self.height - 1,


            SET_COM_OUT_DIR | 0x08,  # scan from COM[N] to COM0


            SET_DISP_OFFSET,


            0x00,


            SET_COM_PIN_CFG,


            0x02 if self.width > 2 * self.height else 0x12,


            # timing and driving scheme


            SET_DISP_CLK_DIV,


            0x80,


            SET_PRECHARGE,


            0x22 if self.external_vcc else 0xF1,


            SET_VCOM_DESEL,


            0x30,  # 0.83*Vcc


            # display


            SET_CONTRAST,


            0xFF,  # maximum


            SET_ENTIRE_ON,  # output follows RAM contents


            SET_NORM_INV,  # not inverted


            # charge pump


            SET_CHARGE_PUMP,


            0x10 if self.external_vcc else 0x14,


            SET_DISP | 0x01,


        ):  # on


            self.write_cmd(cmd)


        self.fill(0)


        self.show()


    def poweroff(self):


        self.write_cmd(SET_DISP | 0x00)


    def poweron(self):


        self.write_cmd(SET_DISP | 0x01)


    def contrast(self, contrast):


        self.write_cmd(SET_CONTRAST)


        self.write_cmd(contrast)


    def invert(self, invert):


        self.write_cmd(SET_NORM_INV | (invert & 1))


    def show(self):


        x0 = 0


        x1 = self.width - 1


        if self.width == 64:


            # displays with width of 64 pixels are shifted by 32


            x0 += 32


            x1 += 32


        self.write_cmd(SET_COL_ADDR)


        self.write_cmd(x0)


        self.write_cmd(x1)


        self.write_cmd(SET_PAGE_ADDR)


        self.write_cmd(0)


        self.write_cmd(self.pages - 1)


        self.write_data(self.buffer)


class SSD1306_I2C(SSD1306):


    def __init__(self, width, height, i2c, addr=0x3C, external_vcc=False):


        self.i2c = i2c


        self.addr = addr


        self.temp = bytearray(2)


        self.write_list = [b"\x40", None]  # Co=0, D/C#=1


        super().__init__(width, height, external_vcc)


    def write_cmd(self, cmd):


        self.temp[0] = 0x80  # Co=1, D/C#=0


        self.temp[1] = cmd


        self.i2c.writeto(self.addr, self.temp)


    def write_data(self, buf):


        self.write_list[1] = buf


        self.i2c.writevto(self.addr, self.write_list)


class SSD1306_SPI(SSD1306):


    def __init__(self, width, height, spi, dc, res, cs, external_vcc=False):


        self.rate = 10 * 1024 * 1024


        dc.init(dc.OUT, value=0)


        res.init(res.OUT, value=0)


        cs.init(cs.OUT, value=1)


        self.spi = spi


        self.dc = dc


        self.res = res


        self.cs = cs


        import time


        self.res(1)


        time.sleep_ms(1)


        self.res(0)


        time.sleep_ms(10)


        self.res(1)


        super().__init__(width, height, external_vcc)


    def write_cmd(self, cmd):


        self.spi.init(baudrate=self.rate, polarity=0, phase=0)


        self.cs(1)


        self.dc(0)


        self.cs(0)


        self.spi.write(bytearray([cmd]))


        self.cs(1)


    def write_data(self, buf):


        self.spi.init(baudrate=self.rate, polarity=0, phase=0)


        self.cs(1)


        self.dc(1)


        self.cs(0)


        self.spi.write(buf)


        self.cs(1)


 


//code for OLED with Pico


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


 


//Code for Square Shape in OLED


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


 


//code for creating an animation of a rocket blast


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