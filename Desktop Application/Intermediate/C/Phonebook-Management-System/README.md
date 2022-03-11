![](https://img.shields.io/badge/Project-PhoneBook-yellow.svg)
![](https://img.shields.io/badge/ProjectType-ConsoleApp-green.svg)
![](https://img.shields.io/badge/Programming_Language-c-blue.svg)

# Phonebook-Management-System
Phonebook management system in C is a console application without graphics.
## About Phonebook Management System 🚀 :
  This simple mini project in C creates an external file to store the user's data permanently to perform file handling operations. Phonebook is an extremely straightforward small undertaking in C that can assist you with understanding the fundamental ideas of capacities, record taking care of, and information structure. This application will show you how to include, list, change or alter, look and erase information to/from  the record.<br>
  Individual data like name, gender, father's name, contact number, postal code, email, and address are asked while including a record into the Phonebook. These records would be able to be altered, recorded, looked for, and eliminated.<br>
  We have used many functions in this project. These functions are very easy to understand as their name itself signifies their respective operations.<br>
## [A quick link to the complete source code of the project](https://github.com/Kranthi-Guribilli/Phonebook-Management-System/blob/main/PhoneBook.c)<br>
# [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Kranthi-Guribilli/Phonebook-Management-System)
## Functions that are used in this project:
1. [void add_contact():](#AddContact)     -------> *It's a utility function to add a contact into the directory*
2. [void search_contact():](#SearchContact)  -------> *It's a utility function to search for a contact*
3. [void modify_contact():](#ModifyContact)   -------> *It's a utility function to modify a contact*
4. [void display():](#Display)         -------> *It's a utility function to display all contacts within the directory*
5. [int directory_info():](#DirectoryInfo)   -------> *It's a utility function to find out the total no.of contacts in the directory*
6. [void display_by_tag():](#DisplayByTag)   -------> *It's a utility function to display all the contacts with the specified tag*
7. [int tag_info():](#TagInfo)          -------> *It's a utility function to find out the total no.of contacts that are saved in specified tag*
8. [void delete_contact():](#DeleteContact)   -------> *It's a utility function to delete a contact from the directory*<br>

### AddContact():
Source Code :
```c
void add_contact()
{
    system("cls");
    FILE *fptr;
    contact cn;
    fptr = fopen("PhoneBook","a");

    printf("\n<Fill details>\n");

    printf("Enter First Name : ");
    scanf("%s", &cn.fname);

    printf("Enter last Name : ");
    scanf("%s", &cn.lname);

    printf("\nEnter Mobile Number : ");
    scanf("%s", &cn.mobile_no);

    printf("\nEnter Tag(Enter 'Other' for nothing) : ");
    scanf("%s", &cn.tag);

    fwrite(&cn, sizeof(contact), 1, fptr);

    fclose(fptr);

    printf("Enter any key to continue.");
	getch();
    system("cls");
}
```
### SearchContact():
Source Code :
```c
void search_contact(){
	system("cls");
	FILE *fp;
	contact cn;
	int c,flag=0;
	fp=fopen("PhoneBook","r");
	if(fp==NULL){
		printf("\nError in opening\n");
		exit(1);
	}
	printf("\n------------------------------------\n");
	printf("***SEARCH MENU***\n");
	printf("----------------------------------------\n");
	printf("1. Search by name\n2. Search by Phone number\n");
	printf("Enter your choice : ");
	scanf("%d",&c);
	fflush(stdin);
	if(c==1){
	char fname[30],lname[30];		
	printf("Enter the name to be searched for:\n");
	printf("Enter first name : ");
	scanf("%s",&fname);
	printf("Enter last name : ");
	scanf("%s",&lname);
	fflush(stdin);
	while(fread(&cn,sizeof(cn),1,fp)==1){
		
		if(strcmp(strlwr(cn.fname),strlwr(fname))==0&&strcmp(strlwr(cn.lname),strlwr(lname))==0){
			flag=1;
			printf("\nDetail information about %s\n",fname);
			printf("---------------------------------------------------------------------\n");
            printf("\n|%-15s%-15s%-20s%-12s|\n", "First Name", "Last Name", "Contact Number", "Tag");
            printf("---------------------------------------------------------------------");
            printf("\n|%-15s%-15s%-20s%-12s|\n",  cn.fname, cn.lname, cn.mobile_no, cn.tag);
			break;
			}
		}
		if(flag==0){
		printf("\nSearch not found\n");
		fclose(fp);}
	}
	else if(c==2){
		char phone[10];
		printf("Enter phone number to search: ");
		scanf("%s",&phone);
		while(fread(&cn,sizeof(cn),1,fp)==1){
			if(strcmp(phone,cn.mobile_no)==0){
				flag=1;
				printf("\n\nDetail information about %s",phone);
				printf("---------------------------------------------------------------------\n");
                printf("\n|%-15s%-15s%-20s%-12s|\n", "First Name", "Last Name", "Contact Number", "Tag");
                printf("---------------------------------------------------------------------");
                printf("\n|%-15s%-15s%-20s%-12s|\n",  cn.fname, cn.lname, cn.mobile_no, cn.tag);
			    break;
			}
		}
		if(flag==0) {
		printf("\nSearch not found\n");
		fclose(fp);
		}
	}
	else{
		printf("Wrong Choice!!");
		fclose(fp);
	}
	printf("Enter any key to continue:");
	getch();
	system("cls");
}
```
### ModifyContact():
Source Code :
```c
void modify_contact()
{
    system("cls");
    FILE *fptr, *fptr1;
    contact cn;
    char fname[15];
    char lname[15];
    char modify;
    int found = 0;

    fptr = fopen("PhoneBook", "r");
    fptr1 = fopen("helper", "w");

    printf("Enter the name of Contact to modify:\n");
	printf("Enter First name: ");
	scanf("%s",&fname);
	printf("Enter Last name: ");
	scanf("%s",&lname);
	fflush(stdin);

	while(fread(&cn,sizeof(contact),1,fptr))
    {
        if(strcmp(strlwr(cn.fname),strlwr(fname))==0&&strcmp(strlwr(cn.lname),strlwr(lname))==0)
        {
            found = 1;
            printf("\nModify First Name?<y/n> : ");
            scanf("%c", &modify);
            fflush(stdin);
            if(modify == 'y' || modify == 'Y')
            {
                printf("Enter New First name : ");
                scanf("%s", &cn.fname);
                fflush(stdin);
            }
            printf("\nModify Last Name?<y/n> : ");
            scanf("%c", &modify);
            fflush(stdin);
            if(modify == 'y' || modify == 'Y')
            {
                printf("Enter New Last name : ");
                scanf("%s", &cn.lname);
                fflush(stdin);
            }
            printf("\nModify Mobile Number? <y/n> : ");
            scanf("%c", &modify);
            fflush(stdin);
            if(modify == 'y' || modify == 'Y')
            {
                printf("Enter New Mobile Number : ");
                scanf("%s", &cn.mobile_no);
                fflush(stdin);
            }
            printf("\nModify Tag? <y/n> : ");
            scanf("%c", &modify);
            fflush(stdin);
            if(modify == 'y' || modify == 'Y')
            {
                printf("Enter New Tag : ");
                scanf("%s", &cn.tag);
                fflush(stdin);
            }
        }
        fwrite(&cn, sizeof(contact), 1, fptr1);
    }
    fclose(fptr);
    fclose(fptr1);

    if(found == 1)
    {
        fptr1 = fopen("helper", "r");
        fptr = fopen("PhoneBook", "w");

        while(fread(&cn, sizeof(contact), 1, fptr1))
            fwrite(&cn, sizeof(contact), 1, fptr);

        printf("\nContact Modified Successfully\n");
    }
    else
        printf("Contact not found");

    fclose(fptr);
    fclose(fptr1);

    printf("\n\nEnter any key to continue : ");
	getch();
    system("cls");
}
```
### Display():
Source Code :
```c
void display()
{
    system("cls");
    FILE *fptr;
    contact cn;
    int mode, count = 1, i, n;
    fptr = fopen("PhoneBook", "r");

    printf("1 : View by Time Created (Ascending)\n");
    printf("2 : View by Time Created (Descending)\n");
    printf("Choose Display Mode : ");
    scanf("%d", &mode);
    n = directory_info();
    printf("---------------------------------------------------------------------\n");
    printf("|Total Number of contacts : %2d                                      |\n", n);
    printf("---------------------------------------------------------------------");
    printf("\n|%-3s| %-15s%-15s%-20s%-12s|\n", "Sno", "First Name", "Last Name", "Contact Number", "Tag");
    printf("---------------------------------------------------------------------");

    if(mode == 1)
    {
        while(fread(&cn, sizeof(contact), 1, fptr))
        {
            printf("\n|%-3d| %-15s%-15s%-20s%-12s|", count++, cn.fname, cn.lname, cn.mobile_no, cn.tag);
        }
    }

    else if (mode == 2)
    {
        fseek(fptr,-(sizeof(cn)), SEEK_END);

        for(i = 1; i <= n; ++i)
        {
            fread(&cn, sizeof(contact), 1, fptr);
            printf("\n|%-3d| %-15s%-15s%-20s%-12s|", count++, cn.fname, cn.lname, cn.mobile_no, cn.tag);
            fseek(fptr, -2*sizeof(contact), SEEK_CUR);
        }
    }

    else
        printf("\n|Invalid Selection !!!                                       |");

    printf("\n---------------------------------------------------------------------\n");

    fclose(fptr);

    printf("\n\nEnter any key to continue : ");
	getch();
    system("cls");
}
```
### DirectoryInfo():
 Source Code :
 ```c
int directory_info(){
    FILE *fptr;

    fptr = fopen("PhoneBook", "r");
    fseek(fptr, 0, SEEK_END);

    return ftell(fptr)/sizeof(contact);
}
```

###  DisplayByTag():
Source Code :
```c
void display_by_tag()
{
    system("cls");
    char tag[20];
    FILE *fptr;
    contact cn;
    int count=1, n;
    fptr = fopen("PhoneBook", "r");
    fflush(stdin);
    printf("Enter Tag : ");
    scanf("%s", tag);
    n = tag_info(tag);
    printf("---------------------------------------------------------------------\n");
    printf("|Total Number of contacts : %2d                                      |\n", n);
    printf("---------------------------------------------------------------------");
    printf("\n|%-3s| %-15s%-15s%-20s%-12s|\n", "Sno", "First Name", "Last Name", "Contact Number", "Tag");
    printf("---------------------------------------------------------------------");

    while(fread(&cn, sizeof(contact), 1, fptr))
    {
        if(strcmp(strlwr(cn.tag), strlwr(tag)) == 0)
            printf("\n|%-3d| %-15s%-15s%-20s%-12s|", count++, cn.fname, cn.lname, cn.mobile_no, cn.tag);
    }

    printf("\n---------------------------------------------------------------------\n");

    fclose(fptr);
    fflush(stdin);
    printf("\n\nEnter any key to continue : ");
	getch();
    system("cls");
}
``` 
### TagInfo():
Source Code :
```c
int tag_info(char tag[])
{
    int num = 0;
    FILE *fptr;
    contact cn;
    fptr = fopen("PhoneBook", "r");

    while(fread(&cn, sizeof(contact), 1, fptr))
    {
        if(strcmp(strlwr(cn.tag), strlwr(tag)) == 0)
            num++;
    }
    return num;
}
```
### DeleteContact():
Source Code :
```c
void delete_contact(){
	contact cn;
	FILE *fptr,*fptr1;
	int flag;
	system("cls");
	fptr=fopen("PhoneBook","r");
	if(fptr==NULL){
		printf("CONTACT'S DATA NOT ADDED YET");
	}
	else{
		fptr1=fopen("helper","w+");
		if(fptr1==NULL)printf("Error in opening the file");
		else{
			
			int choice;
			printf("\n----------------------------------------");
			printf("\n***DELETION MENU***\n");
			printf("----------------------------------------\n");
			printf("1.Deletion through mobile number\n2.Deletion through name\n");
			printf("Enter your choice: ");
			scanf("%d",&choice);
			if(choice==1){
				char mobile_no[25];
				printf("Enter CONTACT's mobile_no:");
				scanf("%s",&mobile_no);
				fflush(stdin);
				while(fread(&cn,sizeof(cn),1,fptr)==1){
					if(strcmp(mobile_no,cn.mobile_no)!=0){
						fwrite(&cn,sizeof(cn),1,fptr1);
					}
					if(strcmp(mobile_no,cn.mobile_no)==0){
						flag=1;
					}
				}
			}
			else if(choice==2){
			char fname[25],lname[25];
			printf("Enter CONTACT's fname: ");
			scanf("%s",&fname);
			printf("Enter CONTACT's lname: ");
			scanf("%s",&lname);
			fflush(stdin);
			while(fread(&cn,sizeof(cn),1,fptr)==1){
				if(strcmp(strlwr(cn.fname),strlwr(fname))!=0||strcmp(strlwr(cn.lname),strlwr(lname))!=0){
					fwrite(&cn,sizeof(cn),1,fptr1);
				}
				if(strcmp(strlwr(cn.fname),strlwr(fname))==0&&strcmp(strlwr(cn.lname),strlwr(lname))==0){
					flag=1;
				}
			}
		}else{
			printf("\nWrong choice!\nEnter any key to continue");
			getch();
			system("cls");
		}
		
			fclose(fptr);
			fclose(fptr1);
			if(flag!=1){
				printf("NO CONTACT'S RECORD TO DELETE!\n");
			}
			else{
				fptr1 = fopen("helper", "r");
				fptr = fopen("PhoneBook", "w");
				while(fread(&cn, sizeof(contact), 1, fptr1))
					fwrite(&cn, sizeof(contact), 1, fptr);
				printf("\nContact Deleted Successfully\n");
				
			}
			fclose(fptr1);
			fclose(fptr);
		}
	}
	printf("Enter any key:");
	getch();
	system("cls");
}
```

