import copy
import pygame


class Board:
    def __init__(self, tmat=[[None]*3 for _ in range(3)]):
        self.tmat = copy.deepcopy(tmat)

    def print_board(self):
        for i in self.tmat:
            print(i)

    def fill_moves(self, x, y, k):
        if not self.tmat[x][y]:
            self.tmat[x][y] = k

    def user_won(self):
        t_tmat = list(map(list, zip(*self.tmat)))
        for i in self.tmat:
            if i.count('X') == 3:
                return True
        for i in t_tmat:
            if i.count('X') == 3:
                return True

        r_count, l_count = 0, 0

        for i in range(3):
            for j in range(3):
                if i == j and self.tmat[i][j] == 'X':
                    r_count += 1
                if i == 2 - j and self.tmat[i][2 - i] == 'X':
                    l_count += 1
        if r_count == 3 or l_count == 3:
            return True

        return False

    def pc_won(self):
        t_tmat = list(map(list, zip(*self.tmat)))
        for i in self.tmat:
            if i.count('O') == 3:
                return True
        for i in t_tmat:
            if i.count('O') == 3:
                return True

        r_count, l_count = 0, 0

        for i in range(3):
            for j in range(3):
                if i == j and self.tmat[i][j] == 'O':
                    r_count += 1
                if i == 2 - j and self.tmat[i][2 - i] == 'O':
                    l_count += 1
        if r_count == 3 or l_count == 3:
            return True

        return False

    def user_won_ax(self):
        t_tmat = list(map(list, zip(*self.tmat)))
        for j, i in enumerate(self.tmat):
            if i.count('X') == 3:
                return j
        for j, i in enumerate(t_tmat):
            if i.count('X') == 3:
                return j+5

        r_count, l_count = 0, 0

        for i in range(3):
            for j in range(3):
                if i == j and self.tmat[i][j] == 'X':
                    r_count += 1
                if i == 2 - j and self.tmat[i][2 - i] == 'X':
                    l_count += 1
        if r_count == 3:
            return 3
        elif l_count == 3:
            return 4

        return False

    def pc_won_ax(self):
        t_tmat = list(map(list, zip(*self.tmat)))
        for j, i in enumerate(self.tmat):
            if i.count('O') == 3:
                return j
        for j, i in enumerate(t_tmat):
            if i.count('O') == 3:
                return j+5

        r_count, l_count = 0, 0

        for i in range(3):
            for j in range(3):
                if i == j and self.tmat[i][j] == 'O':
                    r_count += 1
                if i == 2 - j and self.tmat[i][2 - i] == 'O':
                    l_count += 1
        if r_count == 3:
            return 3
        elif l_count == 3:
            return 4

        return False

    def is_board_full(self):
        f_count = 0
        for i in self.tmat:
            for j in i:
                if j == 'X' or j == 'O':
                    f_count += 1
        if f_count == 9:
            return True
        else:
            return False

    def is_draw(self):
        if not self.pc_won() and not self.user_won() and self.is_board_full():
            return True
        else:
            return False

    def find_all_moves(self):
        li = []
        for i in range(3):
            for j in range(3):
                if self.tmat[i][j] == None:
                    l = [i, j]
                    li.append(l)
        return li

############################################################


def end_utility(end_board, depth):
    if end_board.pc_won():
        return 1/depth
    elif end_board.user_won():
        return -1
    elif end_board.is_draw():
        return 0


def max_algo(some_board, depth):
    if some_board.user_won() or some_board.pc_won() or some_board.is_draw():
        return end_utility(some_board, depth)
    utility = float('-inf')
    all_all_possible_move = some_board.find_all_moves()
    for i in all_all_possible_move:
        false_board = Board(some_board.tmat)
        false_board.fill_moves(i[0], i[1], 'O')
        utility = max(utility, min_algo(false_board, depth+1))
    return utility


def min_algo(some_board, depth):
    if some_board.user_won() or some_board.pc_won() or some_board.is_draw():
        return end_utility(some_board, depth)
    utility = float('inf')
    all_possible_move = some_board.find_all_moves()
    for i in all_possible_move:
        false_board = Board(some_board.tmat)
        false_board.fill_moves(i[0], i[1], 'X')
        utility = min(utility, max_algo(false_board, depth+1))
    return utility


def choose_pc_move(think_board):
    all_possible_move = think_board.find_all_moves()
    all_utility = {}
    f = None

    for d, i in enumerate(all_possible_move):
        false_board = Board(think_board.tmat)
        false_board.fill_moves(i[0], i[1], 'O')
        u = min_algo(false_board, depth=1)
        all_utility[u] = [i[0], i[1]]
    f = max(all_utility, key=float)
    return all_utility[f]

###########################################################


# Initiate The pygame
pygame.init()
board = Board()
screen = pygame.display.set_mode((500, 500))

# Title and Icon
pygame.display.set_caption("Tic Tac Toe")
icon = pygame.image.load('image/tic-tac-toe.png')
pygame.display.set_icon(icon)
b_color = 90, 119, 150
# board
boardImg = pygame.image.load('image/board.png')
board_X, board_Y = 0, 0


def game_board():
    screen.blit(boardImg, (board_X, board_Y))


crossImg = [pygame.image.load('image/cross/1.png'), pygame.image.load('image/cross/2.png'), pygame.image.load('image/cross/3.png'), pygame.image.load('image/cross/4.png'), pygame.image.load('image/cross/5.png'),
            pygame.image.load('image/cross/6.png'), pygame.image.load('image/cross/7.png'), pygame.image.load('image/cross/8.png'), pygame.image.load('image/cross/9.png'), pygame.image.load('image/cross/10.png')]


def put_cross(x, y):
    for i in range(0, 600):
        screen.blit(crossImg[i//60], (x, y))
        pygame.display.update()


oImg = [pygame.image.load('image/o/1.png'), pygame.image.load('image/o/2.png'), pygame.image.load('image/o/3.png'), pygame.image.load('image/o/4.png'), pygame.image.load('image/o/5.png'),
        pygame.image.load('image/o/6.png'), pygame.image.load('image/o/7.png'), pygame.image.load('image/o/8.png'), pygame.image.load('image/o/9.png'), pygame.image.load('image/o/10.png'), ]


def put_o(x, y):
    for i in range(0, 600):
        screen.blit(oImg[i//60], (x, y))
        pygame.display.update()


vImg = [pygame.image.load('image/ver/1.png'), pygame.image.load('image/ver/2.png'), pygame.image.load('image/ver/3.png'), pygame.image.load('image/ver/4.png'), pygame.image.load('image/ver/5.png'),
        pygame.image.load('image/ver/6.png'), pygame.image.load('image/ver/7.png'), pygame.image.load('image/ver/8.png'), pygame.image.load('image/ver/9.png'), pygame.image.load('image/ver/10.png'), ]


def put_v(x):
    for i in range(0, 400):
        screen.blit(vImg[i//40], (0, x))
        pygame.display.update()


hImg = [pygame.image.load('image/hor/1.png'), pygame.image.load('image/hor/2.png'), pygame.image.load('image/hor/3.png'), pygame.image.load('image/hor/4.png'), pygame.image.load('image/hor/5.png'),
        pygame.image.load('image/hor/6.png'), pygame.image.load('image/hor/7.png'), pygame.image.load('image/hor/8.png'), pygame.image.load('image/hor/9.png'), pygame.image.load('image/hor/10.png'), ]


def put_h(y):
    for i in range(0, 400):
        screen.blit(hImg[i//40], (y, 0))
        pygame.display.update()


rImg = [pygame.image.load('image/r_digo/1.png'), pygame.image.load('image/r_digo/2.png'), pygame.image.load('image/r_digo/3.png'), pygame.image.load('image/r_digo/4.png'), pygame.image.load('image/r_digo/5.png'),
        pygame.image.load('image/r_digo/6.png'), pygame.image.load('image/r_digo/7.png'), pygame.image.load('image/r_digo/8.png'), pygame.image.load('image/r_digo/9.png'), pygame.image.load('image/r_digo/10.png'), ]


def put_rd():
    for i in range(0, 400):
        screen.blit(rImg[i//40], (0, 0))
        pygame.display.update()


lImg = [pygame.image.load('image/l_digo/1.png'), pygame.image.load('image/l_digo/2.png'), pygame.image.load('image/l_digo/3.png'), pygame.image.load('image/l_digo/4.png'), pygame.image.load('image/l_digo/5.png'),
        pygame.image.load('image/l_digo/6.png'), pygame.image.load('image/l_digo/7.png'), pygame.image.load('image/l_digo/8.png'), pygame.image.load('image/l_digo/9.png'), pygame.image.load('image/l_digo/10.png'), ]


def put_ld():
    for i in range(0, 400):
        screen.blit(lImg[i//40], (0, 0))
        pygame.display.update()


drImg = pygame.image.load('image/draw.png')


def put_dr():
    screen.blit(drImg, (0, 0))


aiImg = pygame.image.load('image/aiwon.png')


def put_ai():
    screen.blit(aiImg, (0, 0))


backgroundImg = pygame.image.load('image/backgroung_img.png')


def put_background():
    screen.blit(backgroundImg, (0, 0))


startImg = pygame.image.load('image/start.png')


def put_start():
    screen.blit(startImg, (0, 0))


restartImg = pygame.image.load('image/restart.png')


def put_restart():
    screen.blit(restartImg, (0, 0))


player_turn = True
running = True
clicked = False
playing = False
drawn = False
clicked_start = False
need_restart = False
screen.fill(b_color)
put_background()
pygame.display.update()
game_board()
pygame.display.update()
put_start()
pygame.display.update()
#####Game looopp####################
while(running):

    ###############For event listening###################
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN and player_turn:
            if pygame.mouse.get_pressed()[0]:
                pos = pygame.mouse.get_pos()
                # print(pos[0]//165,pos[1]//165)
                cross_x, cross_y = pos[0]//165, pos[1]//165
                clicked = True
        if event.type == pygame.MOUSEBUTTONDOWN and not playing:
            if pygame.mouse.get_pressed()[0]:
                clicked_start = True
##########################################################


################Functionality##############################
    if clicked_start:
        board = Board()
        put_background()
        pygame.display.update()
        game_board()
        pygame.display.update()
        player_turn = True
        running = True
        clicked = False
        playing = True
        drawn = False
        clicked_start = False

    if playing:
        if(clicked):
            if not board.tmat[cross_y][cross_x]:
                board.fill_moves(cross_y, cross_x, 'X')
                put_cross(cross_x*165, cross_y*165)
                pygame.display.update()
                clicked = False
                # board.fill_moves(cross_y,cross_x,'X')
                player_turn = False
                # board.print_board()
        if board.user_won():
            print("User Won")
            # board.print_board()
            w = board.user_won_ax()
            if w == 3:
                put_rd()
                pygame.display.update()
            elif w == 4:
                put_ld()
                pygame.display.update()
            elif w >= 0 and w <= 2:
                put_v(w*165)
                pygame.display.update()
            elif w >= 5 and w <= 7:
                put_h((w-5)*165)
                pygame.display.update()
            playing = False
            need_restart = True
        if board.is_draw():
            print("Draw")
            player_turn = False
            playing = False
            drawn = True
            need_restart = True
        if not player_turn and not drawn:
            print("Pc's Turn")
            px, py = choose_pc_move(board)
            put_o(py*165, px*165)
            pygame.display.update()
            board.fill_moves(px, py, 'O')
            # board.print_board()
            player_turn = True
        if board.pc_won():
            print("Pc won")
            # board.print_board()
            playing = False
            w = board.pc_won_ax()
            print(w)
            if w == 3:
                put_rd()
                pygame.display.update()
            elif w == 4:
                put_ld()
                pygame.display.update()
            elif w >= 0 and w <= 2:
                put_v(w*165)
                pygame.display.update()
            elif w >= 5 and w <= 7:
                put_h((w-5)*165)
                pygame.display.update()
            need_restart = True
        if board.is_draw():
            print("it's a draw")
            # board.print_board()
            player_turn = False
            playing = False
            drawn = True
            need_restart = True

    if not playing and need_restart:
        put_restart()
        pygame.display.update()
