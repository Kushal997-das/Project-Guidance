#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
struct student
{
    char name[40];
    int standard;
    char fname[40];
    char mname[40];
    char phone[20];
    char address[60];
    int roll_no;
    char ad_date[20];
    struct student *detail;
};
struct classes
{
    int class_no;
    struct classes *next;
    struct student *detail;
};
void add_class(struct classes **Start,int no)
{
    struct classes *temp,*t;
    temp=malloc(sizeof(struct classes));
    temp->class_no=no;
    temp->next=NULL;
    temp->detail=NULL;
    if(*Start==NULL)
        *Start=temp;
    else
    {
        t=*Start;
        while(t->next)
            t=t->next;
        t->next=temp;
    }
}
void search_class(struct classes *Start)
{ int clas;
    printf("Enter Class");
    scanf("%d",&clas);
    while(Start)
    {
        if(Start->class_no==clas)
            break;
        Start=Start->next;
    }
    if(Start==NULL)
        printf("No Such class exist");
    else
    {
        addstudent(Start);
    }
}
void addstudent(struct classes *info)
{
    struct student *temp,*t;
    temp=malloc(sizeof(struct student));
    printf("Enter Name  ");
    fflush(stdin);
    gets(temp->name);
    printf("Enter Father's Name  ");
    gets(temp->fname);
    printf("Enter Mother Name  ");
    gets(temp->mname);
    printf("Enter address  ");
    gets(temp->address);
    printf("Enter Phone No.  ");
    gets(temp->phone);
    printf("Enter Admission date  ");
    gets(temp->ad_date);
    printf("Enter Class  ");
    scanf("%d",&temp->standard);
    printf("Enter Roll no.  ");
    scanf("%d",&temp->roll_no);
    if((info)->detail==NULL)
    { temp->detail=NULL;
        (info)->detail=temp;
    }
    else
    {
       temp->detail=info->detail;
       info->detail=temp;
    }
}
void search_student(struct classes *Start,int stand,int roll_no)
{ struct student *info;
   while(Start)
    {
        if(Start->class_no==stand)
            break;
        Start=Start->next;
    }
    if(Start==NULL)
        printf("Invalid Class ");
    else
    {
        info=Start->detail;
        while(info)
        { if(info->roll_no=roll_no){
            printf("Name: ");
            puts(info->name);
            printf("Father's Name: ");
            puts(info->fname);
            printf("Mother's Name: ");
            puts(info->mname);
            printf("Class: %d\n",info->standard);
            printf("Roll No.: %d\n",info->roll_no);
            printf("Admission Date: ");
            puts(info->ad_date);
            printf("Address: ");
            puts(info->address);
            printf("Phone No.: ");
            puts(info->phone);
            break;
        }
        info=info->detail;
        }
if(info==NULL)
    printf("Data not found\n");
    }
}
void remove_student(struct classes *Start,int stand,int roll_no)
{
struct student *temp,*pre;
 while(Start)
    {
        if(Start->class_no==stand)
            break;
        Start=Start->next;
    }
    if(Start==NULL)
        printf("Invalid Class ");
        else
{
temp=Start->detail;
while(temp)
{
if(temp->roll_no==roll_no)
    break;
    pre=temp;
temp=temp->detail;
}
if(temp==NULL)
{
    printf("Data not Found\n");
    return;
}
 printf("Name: ");
            puts(temp->name);
            printf("Father's Name: ");
            puts(temp->fname);
            printf("Mother's Name: ");
            puts(temp->mname);
            printf("Class: %d\n",temp->standard);
            printf("Roll No.: %d\n",temp->roll_no);
            printf("Admission Date: ");
            puts(temp->ad_date);
            printf("Address: ");
            puts(temp->address);
            printf("Phone No.: ");
            puts(temp->phone);
if(temp==Start->detail)
{
   temp=Start->detail;
   Start->detail=Start->detail->detail;
free(temp);
}
else if(temp->detail=NULL)
{
   free(temp);
   pre->detail=NULL;
}
else
{
    pre->detail=temp->detail;
    free(temp);
}
}
}
void get_clsdetail(struct classes *Start,int stand)
{
    struct student *temp;
     if(Start->detail==NULL)
        printf("No Records");
     while(Start)
    {
        if(Start->class_no==stand)
            break;
        Start=Start->next;
    }
    if(Start==NULL)
        printf("Invalid Class ");
        else
        {
            temp=Start->detail;
            while(temp)
            {
             printf("Name: ");
            puts(temp->name);
            printf("Father's Name: ");
            puts(temp->fname);
            printf("Mother's Name: ");
            puts(temp->mname);
            printf("Class: %d\n",temp->standard);
            printf("Roll No.: %d\n",temp->roll_no);
            printf("Admission Date: ");
            puts(temp->ad_date);
            printf("Address: ");
            puts(temp->address);
            printf("Phone No.: ");
            puts(temp->phone);
            temp=temp->detail;
            }
        }
}
main()
 {
    struct classes *Start=NULL;
    int i,stand,roll;
   int  choice;
    for(i=1;i<=12;i++)
    {
        add_class(&Start,i);
    }
      while(1)
    {
         printf("\t\t\t\t\t\tSchool Management\n\n");
        printf("1: Take Admission\n");
        printf("2: Get Student detail\n");
        printf("3: Remove student\n");
        printf("4: Get Detail of student of a particular class\n");
        printf("5: Exit \n\n");
        printf("Enter Your Choice\n");
        scanf("%d",&choice);
        switch(choice)
        {
        case 1:
            search_class(Start);
            break;
        case 2:
            printf("Enter class and roll no");
            scanf("%d %d",&stand,&roll);
            search_student(Start,stand,roll);
            break;
        case 3:
            printf("Enter class and roll_no");
            scanf("%d %d",&stand,&roll);
            remove_student(Start,stand,roll);
            break;
            case 4:
                printf("Enter the class ");
                scanf("%d",&stand);
                get_clsdetail(Start,stand);
                break;
            case 5:
                exit(1);
            default:
            printf("Invalid Choice");
        }
                    printf("\n");
                _getch();
                system("cls");
    }
}
