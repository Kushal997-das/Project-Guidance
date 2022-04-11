#include <stdio.h>
#include <stdlib.h>

//book structure
struct book{
    int id;
    char name[30];
    char author[30];
    int date;
    struct book *next;
};
struct book* head, *tail = NULL;

int nob=0; //Number of books - variable is used for ID assigning

//Functions Declarations
void add_book(); //Add a book
void edit_book(); //Edit an existing book
void delete_book(); //Delete an existing book
void display_book(struct book*n); //To display a node (to avoid repetitive code)
void display_books();//Print all books
void search();//search for book

int main(){
    //List of Choices
    int choice;
    printf("\n[1]Add a book\n[2]Edit book\n[3]Delete book\n[4]Display all books\n[5]Search for a book\n[6]Exit");
    printf("\nOption > ");
    scanf("%d", &choice);
    printf("\n");

    if(choice == 1){
        add_book();
    }else if(choice == 2){
        edit_book();
    }else if(choice == 3){
        delete_book();
    }else if(choice == 4){
        display_books();
    }else if(choice == 5){
        search();
    }else if(choice == 6){
        return 0;
    }

    main();
    return 0;
}


void add_book(){
    struct book* newbook = NULL;
    newbook = (struct book*)(malloc(sizeof(struct book)));  //make a place to new book in memory
    if(newbook == NULL){
        printf("\nFailed to create the book.");
    }else{
        printf("\nEnter the book name > ");
        scanf("\n"); //make C read space
        scanf("%[^\n]s", &newbook->name);//make (newbook->name)  a value in memory
        printf("\nEnter the book author >");
        scanf("\n");
        scanf("%[^\n]s", &newbook->author);//make (newbook->author)  a value in memory

        printf("\nEnter Publish Date > ");
        scanf("%d", &newbook->date); //make (newbook->date)  a value in memory
        newbook->next = NULL;

        newbook->id = ++nob; // increase number of book by one

        if(head == NULL){ //make head point to first book
            head = newbook;
            tail = newbook; // make tail point to first book
        }else{
            tail->next = newbook; //make tail point to second book
            tail = newbook; // make tail point to last book
        }

        printf("\nBook Added.\n");
    }
    return;
}


void edit_book(){
    int id;
    printf("\nEnter Book ID > ");// enter the number of book yon want to edit
    scanf("%d", &id);

    if(id<1 || id>nob){
        printf("\nBook not found");
    }else{
        struct book *n=head;
        while(n!=NULL){ // make loop to find the book yon to edit
            if(n->id == id){
                break;
            }
            n=n->next;
        }

        printf("\nEnter Book Name (Current: %s) > ", n->name);//edit name of the book
        scanf("\n");
        scanf("%[^\n]s", &n->name);

        printf("\nEnter Book Author (Current: %s) > ", n->author);//edit name of the author
        scanf("\n");
        scanf("%[^\n]s", &n->author);

        printf("\nEnter Book Publish Year (Current: %d) > ", n->date);//edit Publish Year of the book
        scanf("%d", &n->date);

        printf("\nBook Edit Saved.\n");
    }

    return;
}


void delete_book(){
    struct book *n = head;
    int id;
    printf("Enter book ID > ");// enter number of book you want to delete
    scanf("%d", &id);

    if(id<=0 || id>nob){ //Case out on nob range
        printf("Book not found!");
    }else{
        struct book *previous;
        struct book *todelete = NULL;

        if(head->id == id){ //Case head is the one to delete
            todelete=n;

            head=n->next;
            n=n->next;
            free(todelete);

        }else{ //Case any other node
            while(n!=NULL){
                previous=n;
                n=n->next;

                if(n->id == id){
                    todelete = n;
                    break;
                }
            }
            previous->next = todelete->next;
            free(todelete);
            n= n->next;
        }

        nob--; //sort books after we delete book from them
        while(n!=NULL){
            n->id--;
            n=n->next;
        }

        printf("\nBook Deleted.\n");
    }
    return;
}


void display_books(){
    struct book *n=head;

    if(head ==NULL){
        printf("Stock is empty.");
    }else{
        while(n!=NULL){
            display_book(n);
            n=n->next;
        }
    }
}


void search(){
    int choice;
    printf("\n[1]ID\n[2]Name\n[3]Author (All books of the author)\n[4]Publish Year (All books in the year)\n");
    printf("Choose search technique > ");
    scanf("%d", &choice);

    struct book *n=head;

    if(choice == 1){
        int id;
        printf("Enter ID > ");
        scanf("%d", &id);
        if(id<1 || id>nob){
            printf("\nBook not found.\n");
        }else{
            while(n!=NULL){
                if(n->id ==id){
                    display_book(n);
                    break;
                }else{
                    n=n->next;
                }
            }
        }
    }else if(choice == 2){
        char name[30];
        printf("Enter book name > ");
        scanf("\n");
        scanf("%[^\n]s", &name);

        while(n!=NULL){
            if(*n->name == *name){
                display_book(n);
                break;
            }else{
                n=n->next;
            }
        }
    }else if(choice == 3){
        char author[30];
        printf("Enter book author > ");
        scanf("\n");
        scanf("%[^\n]s", &author);
        while(n!=NULL){
            if(*n->author ==*author){
                display_book(n);
            }
            n=n->next;
        }
    }else if(choice == 4){
        int year;
        printf("Enter year > ");
        scanf("%d", &year);
        while(n!=NULL){
            if(n->date == year){
                display_book(n);
            }
            n=n->next;
        }
    }
}


void display_book(struct book*n){
    printf("\n======================================");
    printf("\nID: %d", n->id);
    printf("\nTitle: %s", n->name);
    printf("\nAuthor: %s", n->author);
    printf("\nPublish Year: %d", n->date);
    printf("\n======================================\n");
    return;
}