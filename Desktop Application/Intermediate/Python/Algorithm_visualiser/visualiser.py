import pygame
import random


pygame.init()                                                                         # initialising pygame

class game:                                                                           # game class declared so that we don't hv to deal with golbal values

    BLCK = 0,0,0
    WHT = 255,255,255
    GRN = 0,255,0
    RED = 255,0,0
    BLUE = 0,255,208

    SHADES_GRAY = [
        (128,128,128),
        (160,160,160),
        (192,192,192)
    ]

    lr_pad = 50                         # side padding
    top_pad = 200                       # top padding

    FONT = pygame.font.SysFont('georgia',20)

    def __init__(self,height,width,lst):                                       # game initialiser
        self.height = height
        self.width = width
        
        self.window = pygame.display.set_mode((width,height))
        pygame.display.set_caption("Algorithm Visualiser")
        self.set_list(lst)
    
    def set_list(self,lst):                                                     # function to calculate the bar width and height based on the list values
        self.lst = lst
        self.max_v = max(lst)
        self.min_v = min(lst)

        self.bar_width = int((self.width - self.lr_pad) / len(lst))
        self.bar_height = int((self.height - self.top_pad)/(self.max_v - self.min_v))
        self.start_x = int(self.lr_pad/2)


def draw_screen(game_scr,sorting_name,ascending):                                      #function to draw the background and the text on top as well as draw bars function call made from here
    game_scr.window.fill(game_scr.WHT)

    algot = game_scr.FONT.render(f"{sorting_name} - {'Ascending' if ascending else 'Descending'}",1 ,game_scr.GRN)
    game_scr.window.blit(algot,(100,3))

    text = game_scr.FONT.render("R - reset | SPACE - start sorting | A - ascending | D - descending",1,game_scr.BLCK)
    game_scr.window.blit(text,(100,30))

    sort_types = game_scr.FONT.render("B - Bubble Sort | S - Selection Sort | I - Instertion Sort | M - Merge Sort | Q - Quick Sort | C - Comb Sort | H - Shell Sort",1,game_scr.BLCK)
    game_scr.window.blit(sort_types,(100,60))

    sort_types = game_scr.FONT.render("O - Cocktail Sort",1,game_scr.BLCK)
    game_scr.window.blit(sort_types,(100,90))

    
    draw_bars(game_scr)
    pygame.display.update()
    

def draw_bars(game_scr,color_bar={},clear_bars = 0):                                    #function to draw the bars on the screen 

    if clear_bars:
        draw_new = (game_scr.lr_pad//2, game_scr.top_pad, game_scr.width - game_scr.lr_pad, game_scr.height)
        pygame.draw.rect(game_scr.window,game_scr.WHT, draw_new)

    for i,val in enumerate(game_scr.lst):
        x= game_scr.start_x + (game_scr.bar_width*i)
        y = game_scr.height - (val - game_scr.min_v)* game_scr.bar_height

        color = game_scr.SHADES_GRAY[i % 3]

        if i in color_bar:
            color = color_bar[i]


        pygame.draw.rect(game_scr.window, color, (x,y,game_scr.bar_width, game_scr.height))
    
    if clear_bars:
        pygame.display.update()


def genrate_list(n,max_val,min_val):                                                 #function to generate random values and store them in a list
    lst = []
    for i in range(n):
        val = random.randint(min_val,max_val)
        lst.append(val)
    
    return lst
    
# implementation of different sorting algorithms starts 

def selection_sort(game_scr,ascending):                                              # implementing selection sort algorithm
    lst = game_scr.lst

    for i in range(len(lst) - 1):
        indx = i
        for j in range(i+1,len(lst)):
            if((lst[indx] > lst[j] and ascending) or (lst[indx] < lst[j] and not ascending)):
                indx = j
                draw_bars(game_scr,{indx:game_scr.BLUE , i:game_scr.RED},1)

        lst[indx],lst[i] = lst[i],lst[indx]
        draw_bars(game_scr,{indx:game_scr.GRN , i:game_scr.RED},1)
        yield True

    for i,val in enumerate(lst):
        draw_bars(game_scr,{i:game_scr.GRN},1)
 

    return lst



def bubble_sort(game_scr,ascending):                                                 # implementing bubble sort algorithm
    lst = game_scr.lst 

    for i in range(len(lst)):
        for j in range(len(lst) -i - 1):
            if((lst[j] > lst[j+1] and ascending) or (lst[j] < lst[j+1] and not ascending)):
                lst[j],lst[j+1] = lst[j+1],lst[j]
                draw_bars(game_scr,{j:game_scr.RED , j+1:game_scr.GRN},1)
                yield True

    for i in range(len(lst)):
        draw_bars(game_scr,{i:game_scr.GRN},1)

    return lst



def insertion_sort(game_scr,ascending):                                             # implementing insertion sort algorithm
    lst = game_scr.lst

    for i in range(1,len(lst)):
        val = lst[i]
        j=i-1
        while (j >=0 and val  < lst[j] and ascending) or (j>=0 and val >lst[j] and not ascending):
            lst[j+1] = lst[j]
            lst[j] = val 
            j-=1
            # draw_bars(game_scr,{j:game_scr.RED , val:game_scr.BLUE},1)

        draw_bars(game_scr,{j:game_scr.GRN , val:game_scr.RED},1)
        yield True
    
    for i in range(len(lst)):
        draw_bars(game_scr,{i:game_scr.GRN},1)

    return lst


def comb_sort(game_scr,ascending):                                                  # implementing comb sort algorithm
    lst = game_scr.lst

    gap = len(lst)
    while(gap != 1):
        gap = int(gap / 1.3)

        for i in range(len(lst) - gap):
            if (lst[i] > lst[i+gap] and ascending) or (lst[i] < lst[i+gap] and not ascending):
                lst[i],lst[i+gap] = lst[i+gap],lst[i]
                draw_bars(game_scr,{i:game_scr.RED , i+gap:game_scr.GRN},1)
        
    for i in range(len(lst)):
        draw_bars(game_scr,{i:game_scr.GRN},1)
        

def shell_sort(game_scr,ascending):                                                 # implementing shell sort
    lst = game_scr.lst

    g = len(lst)//2

    while g>0:
        for i in range(g,len(lst)):
            ind = i
            tmp = lst[i]
            j=i
            while j>=g and ((lst[j-g] > tmp and ascending) or (lst[j-g] < tmp and not ascending)):
                lst[j] = lst[j-g]
                j-=g

            lst[j] = tmp
            draw_bars(game_scr,{ind:game_scr.RED , j:game_scr.GRN},1)
        g = int(g/2)


def cocktail_sort(game_scr,ascending):
    lst = game_scr.lst
    n = len(lst)
    s=0
    l = n-1

    val = 1
    while val:
        val = 0
        for i in range(s,l):
            if (lst[i] > lst[i+1] and ascending) or (lst[i] < lst[i+1] and not ascending):
                lst[i],lst[i+1] = lst[i+1],lst[i]
                draw_bars(game_scr,{i:game_scr.RED , i+1:game_scr.BLUE},1)
                val = 1
        
        if not val:
            break

        l-=1

        for i in range(l-1,s-1,-1):
            if (lst[i] > lst[i+1] and ascending) or (lst[i] < lst[i+1] and not ascending):
                lst[i],lst[i+1] = lst[i+1],lst[i]
                draw_bars(game_scr,{i:game_scr.RED , i+1:game_scr.GRN},1)
                val = 1

        s+=1


def merge(lst,l,mid,r,game_scr,ascending):                                                   # merge function to merge the two parts of a list
    n1 = mid - l + 1
    n2 = r - mid

    L = [0] * (n1)
    R = [0] * (n2)
 
    for i in range(0, n1):
        L[i] = lst[l + i]

        
 
    for j in range(0, n2):
        R[j] = lst[mid + 1 + j]
    
    i=0
    j=0
    k = l

    while i < n1 and j < n2:
        if (L[i] <= R[j] and ascending) or (L[i] >= R[j] and not ascending):
            lst[k] = L[i]
            draw_bars(game_scr,{i:game_scr.RED , k:game_scr.GRN},1)
            i += 1
        
            
        else:
            lst[k] = R[j]
            draw_bars(game_scr,{j:game_scr.RED , k:game_scr.GRN},1)
            j += 1
        k += 1
       
    while i < n1:
        lst[k] = L[i]
        i += 1
        k += 1
 
   
    while j < n2:
        lst[k] = R[j]
        j += 1
        k += 1

def mergeSort(lst, l,r,game_scr,ascending):                                                  #function to divide the list into smaller lists
    if l < r:
        mid = (l+r)//2
        mergeSort(lst,l,mid,game_scr,ascending)
        mergeSort(lst,mid+1,r,game_scr,ascending)
        merge(lst,l,mid,r,game_scr,ascending)

def merge_sort(game_scr,ascending):                                                # implementing merge sort algorithm
    lst = game_scr.lst
    
    mergeSort(lst,0,len(lst) - 1,game_scr,ascending)



def partition(lst,l,r,game_scr,ascending):                                                                   # partition function for quick sort
    i = l
    j = r
    pi = lst[i]

    while i<j:

        while(lst[i] <= pi and ascending and i < len(lst)) or (lst[i] >= pi and not ascending):
            i+=1
        while(lst[j] > pi and ascending) or (lst[j] < pi and not ascending):
            j-=1
        if i<j:
            lst[i],lst[j] = lst[j],lst[i]
            draw_bars(game_scr,{i:game_scr.RED , j:game_scr.BLUE},1)
  
    lst[l],lst[j] = lst[j],lst[l]
    draw_bars(game_scr,{l:game_scr.RED , j:game_scr.GRN},1)
  
    return j

def quickSort(lst,l,r,game_scr,ascending):                                                   #quick sort function to make partition

    if l < r:
        p = partition(lst,l,r,game_scr,ascending)
        quickSort(lst,l,p-1,game_scr,ascending)
        quickSort(lst,p+1,r,game_scr,ascending)
    

def quick_sort(game_scr,ascending):                                                # implementation of quick sort algorithm
    lst = game_scr.lst

    quickSort(lst,0,len(lst) - 1,game_scr,ascending)



# main game loop starts 


def main_loop():                                                                   # main game-loop

    run = 1

    n=100                                                                   # number of bars there will be on the screen
    max_val = 500
    min_val = 10
    lst = genrate_list(n,max_val,min_val)                                          #generate a random list of values 

    sorting = 0 
    ascending = 1

    algo_name = bubble_sort                                                                          # default algorithm 
    sorting_name = "Bubble sort"
    algo_generator = None

    game_scr = game(720,1280,lst)

    clock = pygame.time.Clock()

    while run:
         clock.tick(20)                                                                           # how fast the screen will update itself can be tweaked to observe the sorting slowly
         
         if sorting and (algo_name == bubble_sort or algo_name == selection_sort or algo_name == insertion_sort):
             try:
                 next(algo_generator)
             except StopIteration:
                 sorting=0
         else:
             draw_screen(game_scr,sorting_name,ascending)

         pygame.display.update()

         for event in pygame.event.get():                                                       # pygame event handler
             if event.type == pygame.QUIT:
                 run = 0

             if event.type == pygame.KEYDOWN:                                                     #  pygame registering if any key was pressed

                 if event.key == pygame.K_r:
                     lst = genrate_list(n,max_val,min_val)
                     game_scr.set_list(lst)
                     draw_screen(game_scr,sorting_name,ascending   )
                     sorting = 0

                 if event.key == pygame.K_a and sorting == 0:
                     ascending=1
                     

                 elif event.key == pygame.K_d and sorting == 0:
                     ascending = 0
                    

                 elif event.key == pygame.K_SPACE and sorting == 0:

                     sorting = 1
                     if (algo_name == bubble_sort or algo_name == selection_sort or algo_name == insertion_sort):
                         algo_generator = algo_name(game_scr,ascending)                                
                     else:
                         algo_name(game_scr,ascending)
                

                 elif event.key == pygame.K_b and sorting == 0:
                     algo_name = bubble_sort
                     sorting_name = "Bubble Sort"
                     
            
                
                 elif event.key == pygame.K_s and sorting == 0:
                     algo_name = selection_sort
                     sorting_name = "Selection Sort"
    
            
                
                 elif event.key == pygame.K_i and sorting == 0:
                     algo_name = insertion_sort
                     sorting_name = "Insertion Sort"
                     
            
                    
                 elif event.key == pygame.K_m and sorting == 0:
                     algo_name = merge_sort
                     sorting_name = "Merge Sort"
                
                 elif event.key == pygame.K_q and sorting == 0:
                     algo_name = quick_sort
                     sorting_name = "Quick Sort"

                 elif event.key == pygame.K_c and sorting == 0:
                     algo_name = comb_sort
                     sorting_name = "Comb Sort"

                 elif event.key == pygame.K_h and sorting == 0:
                     algo_name = shell_sort
                     sorting_name = "Shell Sort"

                 elif event.key == pygame.K_o and sorting == 0:
                     algo_name = cocktail_sort
                     sorting_name = "Cocktail Sort"

                 else:
                     pass

                    
    pygame.quit()


if __name__ == '__main__':

    main_loop()
