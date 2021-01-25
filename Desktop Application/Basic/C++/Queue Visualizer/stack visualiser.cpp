#include<graphics.h>
#include<stdio.h>
struct Stack
{
    int *x1,*x2,*y1,*y2;
    int capacity;
    int top;
    int *ptr;
};
struct Stack* creation(int cap)
{
 struct Stack  *arr;
 arr=(struct Stack*)malloc(sizeof(struct Stack));
 arr->capacity=cap;
 arr->top=-1;
 arr->ptr=(int*)malloc(sizeof(int)*cap);
 arr->x1=(int*)malloc(sizeof(int)*cap);
 arr->x2=(int*)malloc(sizeof(int)*cap);
 arr->y1=(int*)malloc(sizeof(int)*cap);
 arr->y2=(int*)malloc(sizeof(int)*cap);
 return(arr);
}
int push(struct Stack *arr,int data,int x1,int y1,int x2,int y2)
{
    arr->top+=1;
    arr->ptr[arr->top]=data;
 arr->x1[arr->top]=x1;
 arr->x2[arr->top]=x2;
 arr->y1[arr->top]=y1;
 arr->y2[arr->top]=y2;

}
void container(void)
{ setcolor(DARKGRAY);
    line(270,350,370,350);
    line(270,350,270,100);
    line(370,350,370,100);
}
void index(void)
{ int i,j=-1;
char str[3];
    for(i=0;i<=285;i=i+45)
    {
        sprintf(str,"%d",j);
        settextstyle(3,0,3);
        setcolor(YELLOW);
        outtextxy(220,370-i,str);
        j++;
    }
}
void push_move(struct Stack *arr)
{  int data,i,stop=0;
char str[3];
    outtextxy(50,330,"Enter data");
data=getch();
sprintf(str,"%c",data);
setcolor(BLACK);
 outtextxy(50,330,"Enter data");
for(i=0;i<=220;i=i+10){
     setcolor(RED);
     outtextxy(85+i,60,str);
    setcolor(WHITE);
rectangle(70+i,50,120+i,90);
delay(200);
setcolor(BLACK);
  outtextxy(85+i,60,str);
  rectangle(70+i,50,120+i,90);
}
stop=arr->top*40;
 for(i=50;i<=225-stop;i=i+10)
{
  setcolor(RED);
     outtextxy(295,60+i,str);
    setcolor(WHITE);
rectangle(290,50+i,340,90+i);
delay(200);
if(i!=220-stop){
setcolor(BLACK);
  outtextxy(295,60+i,str);
  rectangle(290,50+i,340,90+i);
}}
 push(arr,data,290,50+i-10,340,90+i-10);
 setcolor(YELLOW);}
void pop_move(struct Stack *arr)
{ int i,x1,x2,y1,y2,data;
char str[3];
i=arr->top;
x1=arr->x1[i];
x2=arr->x2[i];
y1=arr->y1[i];
y2=arr->y2[i];
arr->top--;
setcolor(WHITE);
setfillstyle(SOLID_FILL,BLACK);
rectangle(x1,y1,x2,y2);
floodfill(x1+10,y1+10,WHITE);
setcolor(BLACK);
rectangle(x1,y1,x2,y2);
setcolor(WHITE);
line(x1,y2,x2,y2);
setcolor(YELLOW);
}
 main()
{
    struct Stack *arr;
    arr=creation(6);
    int gd=0,gm,i;
    char choice;
    initgraph(&gd,&gm,"");
    setlinestyle(SOLID_LINE,0,3);
container();
index();
outtextxy(50,150,"1:push");
outtextxy(50,180,"2:pop");
 while(1){
        choice=getch();
 if(choice=='1')
 {
     if(arr->top==arr->capacity-1){
        outtextxy(50,300,"Stack is Full");
     delay(200);
     setcolor(BLACK);
     outtextxy(50,300,"Stack is Full");
     setcolor(YELLOW);
     }
     else
        push_move(arr);
}
 else if(choice=='2')
 {
     if(arr->top==-1){
        outtextxy(50,300,"Stack is Empty");
      delay(200);
     setcolor(BLACK);
     outtextxy(50,300,"Stack is Empty");
     setcolor(YELLOW);
     }
     else
        pop_move(arr);
 }
   }
}
