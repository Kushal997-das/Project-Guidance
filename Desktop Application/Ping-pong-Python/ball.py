from turtle import Turtle


class Ball(Turtle):

    def __init__(self):      # this function is for creating a ball by turtle lib of python, Here it is giving,color,shape,x and y movement and ball's normal speed . 
        super().__init__()
        self.color("white")
        self.shape("circle")
        self.penup()
        self.x_move = 3
        self.y_move = 3
        self.move_speed = 0.1

    def move(self):    #This function is responsible for how much ball will move in each step
        new_x = self.xcor() + self.x_move
        new_y = self.ycor() + self.y_move
        self.goto(new_x, new_y)

    def bounce_y(self): # ball's behavior after hittin y-coordinate's wall 
        self.y_move *= -1

    def bounce_x(self):      # ball's behavior after hittin y-coordinate's wall                             
        self.x_move *= -1
        self.move_speed *= 0.9

    def reset_position(self): #function for reseting position after each points
        self.goto(0, 0)
        self.move_speed = 0.1
        self.bounce_x()