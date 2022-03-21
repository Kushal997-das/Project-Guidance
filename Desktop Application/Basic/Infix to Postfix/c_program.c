#include <stdio.h>
#include<stdlib.h>
#include<ctype.h>
struct stack
{
char* a;
int n;
int t;
};
int prec(char c)
{
if(c=='+' || c=='-')
{
return  1;
}
else if(c=='*' || c=='/')
{
return 2;
}
}
void push(struct stack* s,char c)
{
if(s->t==s->n-1)
{
printf("overflow\n");
}
else
{
s->t++;
s->a[s->t]=c;
}
}
char pop(struct stack* s)
{
if(s->t==-1)
{
return -1;


}
else
{
char x=s->a[s->t];
s->t--;
return x;
}
}
int main()
{
int e,i,k,x,y;
printf("Enter size of expression : ");
scanf("%d",&e);
char ex[e],b[e];
printf("Enter expression : ");
for(i=0;i<=e;i++)
{
scanf("%c",&ex[i]);
}
struct stack s;
s.t=-1;
s.n=e;
s.a=(char*)malloc(sizeof(char)*s.n);
for(i=1;i<=e;i++)
{
if(isalpha(ex[i]))
{
b[k]=ex[i];
k++;
}
else
{
if(s.t==-1)
{
push(&s,ex[i]);
}
else
{



x=prec(ex[i]);
y=prec(s.a[s.t]);
if(x>y)
{
push(&s,ex[i]);
}
else
{
while(x<=y)
{
b[k]=pop(&s);
k++;
if(s.t==-1)
{
push(&s,ex[i]);
break;
}
y=prec(s.a[s.t]);
if(x>y)
{
push(&s,ex[i]);
break;
}
}
}
}
}
}
while(s.t!=-1)
{
b[k++]=pop(&s);
}
printf("postfix expression : ");
for(i=0;i<e;i++)
{
printf("%c",b[i]);
}
return 0;
}

