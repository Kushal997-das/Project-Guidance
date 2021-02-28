 #include<stdio.h>
#include<graphics.h>
int check_rep(POINT *cursorpos,int *arr,int flag);
void display_game(POINT *cursor_pos);
void check(int *arr);
void output(int win);
main()
{
    POINT cursor_pos;
     char choice;
     int gd=0,gm;
    initgraph(&gd,&gm,"");
    while(1){

    display_game(&cursor_pos);
 getch();
    closegraph();
}
}
void display_game(POINT *cursorpos)
{
cleardevice();
 int tic[9]={0,0,0,0,0,0,0,0,0};
 int flag=1;
  setcolor(9);
  setlinestyle(SOLID_LINE,4,THICK_WIDTH);
 line(200,100,200,300);
 line(350,100,350,300);
 line(120,160,420,160);
 line(120,250,420,250);
 settextstyle(BOLD_FONT,HORIZ_DIR,3);
 outtextxy(0,350,"PLAYER 1:- X");
 outtextxy(0,400,"PLAYER 2:- 0");
 outtextxy(0,440,"PLAYER 1:- ENTER THE NUMBER");
      settextstyle(BOLD_FONT,HORIZ_DIR,5);
 outtextxy(180,20,"Tic Tac Toe");
while(1)
{
    if(GetAsyncKeyState(VK_LBUTTON)){
      GetCursorPos(cursorpos);
     flag=check_rep(cursorpos,tic,flag);
    check(tic);
     }
}
}
int check_rep(POINT *cursorpos,int *arr,int flag)
{
     settextstyle(BOLD_FONT,HORIZ_DIR,5);
  if(cursorpos->x-5>=120&&cursorpos->x-5<=200&&cursorpos->y-35>=100&&cursorpos->y-35<=150&&arr[0]==0)
{
    if(flag==1){
                arr[0]=1;
        outtextxy(150,110,"X");
flag=2;
}
     else if(flag==2){
            arr[0]=2;
        outtextxy(150,110,"O");
     flag=1;
     }

}
else if(cursorpos->x-5>=201&&cursorpos->x-5<=300&&cursorpos->y-35>=100&&cursorpos->y-35<=150&&arr[1]==0)
 {
       if(flag==1){
                 arr[1]=1;
        outtextxy(250,110,"X");
flag=2;
}
     else if(flag==2){
            arr[1]=2;
        outtextxy(250,110,"O");
     flag=1;
     }

}
else if(cursorpos->x-5>=380&&cursorpos->x-5<=480&&cursorpos->y-35>=100&&cursorpos->y-35<=150&&arr[2]==0)
 {
       if(flag==1){
                 arr[2]=1;
        outtextxy(360,110,"X");
flag=2;
}
     else if(flag==2){
            arr[2]=2;
        outtextxy(360,110,"O");
     flag=1;
     }
 }
else if(cursorpos->x-5>=120&&cursorpos->x-5<=200&&cursorpos->y-35>=170&&cursorpos->y-35<=240&&arr[3]==0)
 {
       if(flag==1){
                 arr[3]=1;
        outtextxy(150,200,"X");
flag=2;
}
     else if(flag==2){
            arr[3]=2;
        outtextxy(150,200,"O");
     flag=1;
     }
}
else if(cursorpos->x-5>=220&&cursorpos->x-5<=350&&cursorpos->y-35>=170&&cursorpos->y-35<=240&&arr[4]==0)
 {
       if(flag==1){
                 arr[4]=1;
        outtextxy(250,200,"X");
flag=2;
}
     else if(flag==2){
            arr[4]=2;
        outtextxy(250,200,"O");
     flag=1;
     }
}
else if(cursorpos->x-5>=370&&cursorpos->x-5<=470&&cursorpos->y-35>=170&&cursorpos->y-35<=240&&arr[5]==0)
 {
       if(flag==1){
                 arr[5]=1;
        outtextxy(380,200,"X");
flag=2;
}
     else if(flag==2){
            arr[5]=2;
        outtextxy(380,200,"O");
     flag=1;
     }
}
else if(cursorpos->x-5>=120&&cursorpos->x-5<=200&&cursorpos->y-35>=240&&cursorpos->y-35<=290&&arr[6]==0)
 {
       if(flag==1){
                 arr[6]=1;
        outtextxy(150,270,"X");
flag=2;
}
     else if(flag==2){
            arr[6]=2;
        outtextxy(150,270,"O");
     flag=1;
     }
}
else if(cursorpos->x-5>=220&&cursorpos->x-5<=300&&cursorpos->y-35>=240&&cursorpos->y-35<=290&&arr[7]==0)
 {
       if(flag==1){
                 arr[7]=1;
        outtextxy(250,270,"X");
flag=2;
}
     else if(flag==2){
            arr[7]=2;
        outtextxy(250,270,"O");
     flag=1;
     }
}
else if(cursorpos->x-5>=320&&cursorpos->x-5<=400&&cursorpos->y-35>=240&&cursorpos->y-35<=290&&arr[8]==0)
 {
       if(flag==1){
                 arr[8]=1;
        outtextxy(380,270,"X");
flag=2;
}
     else if(flag==2){
            arr[8]=2;
        outtextxy(380,270,"O");
     flag=1;
     }
}
outtextxy(180,20,"Tic Tac Toe");

return(flag);
}
void check(int *arr)
{ int i;
    if(arr[0]==1&&arr[1]==1&&arr[2]==1||arr[0]==2&&arr[1]==2&&arr[2]==2)
       output(arr[0]);
    else if(arr[3]==1&&arr[4]==1&&arr[5]==1||arr[3]==2&&arr[4]==2&&arr[5]==2)
        output(arr[3]);
    else if(arr[6]==1&&arr[7]==1&&arr[8]==1||arr[6]==2&&arr[7]==2&&arr[8]==2)
        output(arr[6]);
    else if(arr[0]==1&&arr[3]==1&&arr[6]==1||arr[0]==2&&arr[3]==2&&arr[6]==2)
        output(arr[0]);
    else if(arr[1]==1&&arr[4]==1&&arr[7]==1||arr[1]==2&&arr[4]==2&&arr[7]==2)
        output(arr[1]);
    else if(arr[2]==1&&arr[5]==1&&arr[8]==1||arr[2]==2&&arr[5]==2&&arr[8]==2)
        output(arr[2]);
    else if(arr[0]==1&&arr[4]==1&&arr[8]==1||arr[0]==2&&arr[4]==2&&arr[8]==2)
        output(arr[0]);
    else if(arr[2]==1&&arr[4]==1&&arr[6]==1||arr[2]==2&&arr[4]==2&&arr[6]==2)
        output(arr[2]);
 else {
  for(i=0;i<9;i++)
  {
      if(arr[i]==0)
        break;
  }
  if(i==9)
    output(0);}
}
void output(int win)
{ setbkcolor(12);
    cleardevice();
    outtextxy(220,20,"RESULT");
    if(win==1)
outtextxy(10,200,"Player 1 is Winner");
    else if(win==2)
        outtextxy(10,200,"Player 2 is Winner");
else
    outtextxy(20,200,"Oops! Match Draw");
}
