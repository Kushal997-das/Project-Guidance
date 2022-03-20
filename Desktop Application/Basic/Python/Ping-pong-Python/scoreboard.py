from turtle import Turtle


class Scoreboard(Turtle):

    def __init__(self):         
        super().__init__()
        self.color("white")
        self.penup()
        self.hideturtle()
        self.l_score = 0
        self.r_score = 0
        self.update_scoreboard()

    def update_scoreboard(self):    # Function responsible for position of scoreboard's position, font ,styling.
        self.clear()
        self.goto(-100, 200)
        self.write(self.l_score, align="center", font=("Courier", 80, "normal"))
        self.goto(100, 200)
        self.write(self.r_score, align="center", font=("Courier", 80, "normal"))

    def l_point(self):          #this function is responsible for increasing left player's score
        self.l_score += 1
        self.update_scoreboard()

    def r_point(self):      #this function is responsible for increasing right player's score
        self.r_score += 1
        self.update_scoreboard()