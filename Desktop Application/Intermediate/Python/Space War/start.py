import pygame
import random

screen_size = [360, 600]
screen = pygame.display.set_mode(screen_size)
score = 0
green = (0, 255, 0)
pygame.font.init()


def load(name):
    return pygame.image.load(name)


def display_score(score):
    font = pygame.font.SysFont('Comic Sans MS', 30)
    score_text = 'Score: ' + str(score)
    text = font.render(score_text, True, green)
    screen.blit(text, [20, 10])


def get_rand_offset():
    return 100*random.randint(5, 15)


def set_s_position(idx, pos):
    global score
    if c_positions[idx] > 600:
        c_positions[idx] = 0 - get_rand_offset()
        score = score + 50
    else:
        c_positions[idx] += 5  


background = load('./img/space_open_space_planets_135213_360x640.jpg')
kill = load('./img/meteorBrown_med1.png')
user = load('./img/playerShip1_orange.png')
user_x = 160
c_positions = [0-get_rand_offset(), 0-get_rand_offset(), 0]

keep_alive = True
clock = pygame.time.Clock()

while keep_alive:
    pygame.event.get()
    keys = pygame.key.get_pressed()
    if keys[pygame.K_RIGHT] and user_x < 300:
        user_x = user_x + 10
    elif keys[pygame.K_LEFT] and user_x > 0:
        user_x = user_x - 10
    elif keys [pygame.K_UP] and user_x > 0:
        user_x = user_x - 10
        quit('thanks for playing')
    elif keys [pygame.K_DOWN] and user_x > 0 :
        user_x = user_x - 100

    set_s_position(0, 40)
    set_s_position(1, 160)
    set_s_position(2, 280)

    screen.blit(background, [0, 0])
    screen.blit(kill, [40, c_positions[0]])
    screen.blit(kill, [160, c_positions[1]])
    screen.blit(kill, [280, c_positions[2]])

    display_score(score)
    screen.blit(user, [user_x, 500])

    if c_positions[0] > 500 and user_x < 100:
        print('crash 1', user_x)
        score = score - 50

    if c_positions[2] > 500 and user_x > 200:
        print('crash 3', user_x)
        score = score - 50

    if c_positions[1] > 500 and user_x > 100 and user_x < 200:
        print('crash 2', user_x)
        score = score - 50
    pygame.display.update()
    clock.tick(60)
