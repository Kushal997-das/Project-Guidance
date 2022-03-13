from turtle import Turtle


class Paddle(Turtle):
    
    def __init__(self, position):  #This function is creating  paddle for the game by giving properties like- color, shape, size and initial position to paddles
        super().__init__()
        self.shape("square")
        self.color("white")
        self.shapesize(stretch_wid=5, stretch_len=1)
        self.penup()
        self.goto(position)

    def go_up(self):
        new_y = self.ycor() + 20        # These two functions are responsible for coordinates cover by paddle in each step
        self.goto(self.xcor(), new_y)

    def go_down(self):
        new_y = self.ycor() - 20
        self.goto(self.xcor(), new_y)
