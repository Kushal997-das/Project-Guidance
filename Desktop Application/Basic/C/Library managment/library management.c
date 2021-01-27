#include<stdio.h>
struct Book
{
    int BI;
    char Book_name[20];
    char Author_name[20];
    float price;
    struct Book *next;
};
void Add_Book(struct Book **Start)
{ int BI;
float price;
    struct Book *temp,*t;
    temp=malloc(sizeof(struct Book));
    printf("Enter Author name  ");
    fflush(stdin);
    gets(temp->Author_name);
    printf("Enter Book name  ");
    gets(temp->Book_name);
    printf("Enter Book ID  ");
    scanf("%d",&BI);
    temp->BI=BI;
    printf("Enter price  ");
    scanf("%f",&price);
    temp->price=price;
    temp->next=NULL;
    if(*Start==NULL)
        *Start=temp;
    else
    {
     t=*Start;
     while(t->next!=NULL)
            t=t->next;
     t->next=temp;
    }
}
void Get_Book(struct Book *Start)
{
    while(Start)
    {
        printf("Author name ");
        puts(Start->Author_name);
        printf("Book name  ");
        puts(Start->Book_name);
        printf("Book ID: %d\n",Start->BI);
        printf("Book Price: %f\n\n",Start->price);
        Start=Start->next;
    }
}
void Delete_Book(struct Book **Start,int Book_ID)
{ struct Book *temp,*t;
int i=0;
    if(*Start==NULL)
        printf("There is no Book in Record");
    else if((*Start)->BI==Book_ID)
    {
       temp=*Start;
       *Start=(*Start)->next;
       free(temp);
    }
    else
    {
       temp=*Start;
       while(temp->next!=NULL)
       {
           if(temp->BI==Book_ID)
           {
            i=1;
            break;
           }
           t=temp;
           temp=temp->next;
       }
       if(i!=1)
        printf("Book Id not found");
       else
       {
           t->next=temp->next;
           free(temp);
       }

    }
}
void Search_Book(struct Book *Start,int Book_ID)
{ int i=0;
    if(Start==NULL)
        printf("EMPTY LIBRARY");
    else
    {
        while(Start)
        {
            if(Start->BI==Book_ID)
            {
              i=1;
              break;
            }
            Start=Start->next;
        }
        if(i!=1)
            printf("Book not Found");
        else
        {
          printf("Author name ");
        puts(Start->Author_name);
        printf("Book name  ");
        puts(Start->Book_name);
        printf("Book ID: %d\n",Start->BI);
        printf("Book Price: %f\n",Start->price);
        }
    }
}
int menu(void)
{
    int choice;
    printf("\n1: Add Book");
    printf("\n2: Delete Book");
    printf("\n3: Get Book");
    printf("\n4: Search Book");
    printf("\n5: Exit");
    printf("\n\nEnter your choice");
    scanf("%d",&choice);
    return(choice);
}
main()
{ int data;
    struct Book *Start=NULL;
    while(1)
    { system("cls");
        switch(menu())
        {
        case 1:
            Add_Book(&Start);
            break;
        case 2:
            printf("enter book Id To delete that book");
            scanf("%d",&data);
            Delete_Book(&Start,data);
            break;
        case 3:
            Get_Book(Start);
            break;
        case 4:
            printf("Enter Book ID ");
            scanf("%d",&data);
            Search_Book(Start,data);
            break;
        case 5:
            exit(0);

                    }
                    getche();
    }

}
