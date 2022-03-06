import turtle 
wn=turtle.Screen()
wn.title("Pong Game")
wn.bgcolor("black")
wn.setup(height=500 ,width=600)
wn.tracer(0)

paddle_a=turtle.Turtle()
paddle_a.speed(0)
paddle_a.shape("square")
paddle_a.color("white")
paddle_a.penup()
paddle_a.goto(-270,0)
paddle_a.shapesize(stretch_wid=3,stretch_len=1)


paddle_b=turtle.Turtle()
paddle_b=turtle.Turtle()
paddle_b.speed(0)
paddle_b.shape("square")
paddle_b.color("white")
paddle_b.penup()
paddle_b.goto(270,0)
paddle_b.shapesize(stretch_wid=3,stretch_len=1)

ball_b=turtle.Turtle()
ball_b=turtle.Turtle()
ball_b.speed(0)
ball_b.shape("circle")
ball_b.color("white")
ball_b.penup()
ball_b.goto(0,0)
ball_b.shapesize(1)

while True:
    wn.update()