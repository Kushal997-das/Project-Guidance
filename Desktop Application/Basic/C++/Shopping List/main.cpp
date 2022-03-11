/*
@author: Tawfik Yasser
@since: 2021
*/
#include <iostream>
#include <fstream>
#include <sstream>
#include <algorithm>
#include <set>
#include <string>
#include<bits/stdc++.h>
using namespace std;

class Item{
public:
    char name[15],category[15],quanity[10];
};
struct PrimaryIndex{
    int RRN;
    char name[15];
    bool operator<(const PrimaryIndex &pIndex){
        return strcmp(name,pIndex.name) < 0;
    }
};
struct SecondaryIndex{
    char category[15];
    char name[15];
    bool operator<(const SecondaryIndex &sIndex){
        if(strcmp(category,sIndex.category) == 0)
            return strcmp(name,sIndex.name) < 0;
        return strcmp(category,sIndex.category) <0;
    }
};
Item getItem(int RNN, fstream &dataFile) {
	Item item;
	dataFile.seekg(RNN * 40, ios::beg);
	dataFile.read((char*) &item, sizeof(item));
	return item;
}

string getItemName(SecondaryIndex secondaryIndexArray[], int numberOfRecords, string category) {
	string name = "";
	int low = 0, mid, high = numberOfRecords - 1;

	while (low <= high) {
		mid = (low + high) / 2;
		if (category < secondaryIndexArray[mid].category)
			high = mid - 1;
		else if (category > secondaryIndexArray[mid].category)
			low = mid + 1;
		else {
			name = secondaryIndexArray[mid].name;
			break;
		}
	}
	return name;
}
int getRecordRRN(PrimaryIndex primaryIndexArray[],int numberOfRecords, string name){
    int RRN = -1;
    int left = 0 , middle, right = numberOfRecords - 1;
    while(left <= right){
        middle = (left+right) / 2;
        if(name < primaryIndexArray[middle].name){
            right = middle-1;
        }else if(name > primaryIndexArray[middle].name){
            left = middle+1;
        }else{
            RRN = primaryIndexArray[middle].RRN;
            break;
        }
    }
    return RRN;
}

//Function to write the primary index file
void writePrimaryIndexToFile(PrimaryIndex primaryIndexArray[], int numberOfRecords, fstream &primaryIndexFile){
    for(int i =0 ;i< numberOfRecords;i++)
        primaryIndexFile.write((char*) &primaryIndexArray[i],sizeof(primaryIndexArray[i]));
}

//Function to write the secondary index file
void writeSecondaryIndexToFile(SecondaryIndex secondaryIndexArray[], int numberOfRecords, fstream &secondaryIndexFile){
    for(int i =0 ; i<numberOfRecords;i++)
        secondaryIndexFile.write((char*) &secondaryIndexArray[i],sizeof(secondaryIndexArray[i]));
}

//Function to read the primary index file
void readPrimaryIndexFromFile(PrimaryIndex primaryIndexArray[], int numberOfRecords, fstream &primaryIndexFile){
    for(int i =0 ;i<numberOfRecords;i++)
        primaryIndexFile.read((char*) &primaryIndexArray[i],sizeof(primaryIndexArray[i]));
}

//Function to read the secondary index file
void readSecondaryIndexFromFile(SecondaryIndex secondaryIndexArray[], int numberOfRecords, fstream &secondaryIndexFile){
    for(int i =0 ;i<numberOfRecords;i++)
        secondaryIndexFile.read((char*) &secondaryIndexArray[i],sizeof(secondaryIndexArray[i]));
}

//Function to write the data file
void writeDataFile(Item itemsArray[], int numberOfRecords, fstream &dataFile){
    for(int i =0 ;i<numberOfRecords;i++)
        dataFile.write((char*) &itemsArray[i],sizeof(itemsArray[i]));
}

//Function to read the data file
void readDataFile(Item itemsArray[], int numberOfRecords, fstream &dataFile){
    for(int i =0 ;i<numberOfRecords;i++)
        dataFile.read((char*) &itemsArray[i],sizeof(itemsArray[i]));
}

//Primary Index Search
void searchByName(int numberOfRecords){
    fstream dataFile,primaryIndexFile;
    dataFile.open("Items.txt",ios::in);
    primaryIndexFile.open("primaryIndexFile.txt",ios::in);
    PrimaryIndex *primaryIndexArray = new PrimaryIndex[numberOfRecords];
    Item *itemsArray = new Item[numberOfRecords];
    readPrimaryIndexFromFile(primaryIndexArray,numberOfRecords,primaryIndexFile);
    char name[15];
    Item item;
    int RRN;
    cout << endl << "Enter Target Item Name : ";
	cin >> name;
    RRN = getRecordRRN(primaryIndexArray, numberOfRecords, name);
    cout << RRN << endl;
	item = getItem(RRN, dataFile);
	cout << endl << "Item Name : " << item.name<< "  Cateogry: " << item.category
			<< "  Quantity: " << item.quanity << endl;

	dataFile.close();
	primaryIndexFile.close();
}

//Function to search in data file by `Name`
void searchByName(int numberOfRecords, string name){
    fstream dataFile,primaryIndexFile;
    dataFile.open("Items.txt",ios::in);
    primaryIndexFile.open("primaryIndexFile.txt",ios::in);
    PrimaryIndex *primaryIndexArray = new PrimaryIndex[numberOfRecords];
    Item *itemsArray = new Item[numberOfRecords];
    readPrimaryIndexFromFile(primaryIndexArray,numberOfRecords,primaryIndexFile);
    Item item;
    int RRN;
    RRN = getRecordRRN(primaryIndexArray, numberOfRecords, name);
    if (RRN != -1) {
        item = getItem(RRN, dataFile);
        cout << endl << "Quantity for : " << name << " is " << item.quanity << endl;
    }
    else {
        cout << "Item name not exist" << endl;
    }

	dataFile.close();
	primaryIndexFile.close();
}

//Function to update in data file : `Name`
bool searchByNameUpdate(int numberOfRecords, string name){
    fstream dataFile,primaryIndexFile;
    dataFile.open("Items.txt",ios::in);
    primaryIndexFile.open("primaryIndexFile.txt",ios::in);
    PrimaryIndex *primaryIndexArray = new PrimaryIndex[numberOfRecords];
    Item *itemsArray = new Item[numberOfRecords];
    readPrimaryIndexFromFile(primaryIndexArray,numberOfRecords,primaryIndexFile);
    Item item;
    int RRN = -1;
    RRN = getRecordRRN(primaryIndexArray, numberOfRecords, name);
    cout << RRN << endl;
	item = getItem(RRN, dataFile);
    if(RRN == -1){
        return false;
    }else{
        return true;
    }
	dataFile.close();
	primaryIndexFile.close();
}

//Function to search in data file by `Category`
void searchByCategory(int numberOfRecords) {

    fstream dataFile,primaryIndexFile,secondaryIndexFile;
    dataFile.open("Items.txt",ios::in);
    primaryIndexFile.open("primaryIndexFile.txt",ios::in);
    secondaryIndexFile.open("secondaryIndexFile.txt",ios::in);

    PrimaryIndex *primaryIndexArray = new PrimaryIndex[numberOfRecords];
    SecondaryIndex *secondaryIndexArray = new SecondaryIndex[numberOfRecords];
    Item *itemsArray = new Item[numberOfRecords];

	readPrimaryIndexFromFile(primaryIndexArray, numberOfRecords, primaryIndexFile);
	readSecondaryIndexFromFile(secondaryIndexArray, numberOfRecords, secondaryIndexFile);
	string name;
	char category[20];
	Item item;
	int RRN;
	cout << endl << "Enter Target Item Category : ";
	cin >> category;

	name = getItemName(secondaryIndexArray, numberOfRecords, category);
	if (name == "") {
		cout << endl << "Item category not exist" << endl;
		return;
	}
	RRN = getRecordRRN(primaryIndexArray, numberOfRecords, name);

	item = getItem(RRN, dataFile);
	cout << endl << "Item Name : " << item.name << "  Category: " << item.category
			<< "  Quantity: " << item.quanity << endl;

	dataFile.close();
	primaryIndexFile.close();
	secondaryIndexFile.close();
}
void searchByCategory(int numberOfRecords,string category) {

    fstream dataFile,primaryIndexFile,secondaryIndexFile;
    dataFile.open("Items.txt",ios::in);
    primaryIndexFile.open("primaryIndexFile.txt",ios::in);
    secondaryIndexFile.open("secondaryIndexFile.txt",ios::in);

    PrimaryIndex *primaryIndexArray = new PrimaryIndex[numberOfRecords];
    SecondaryIndex *secondaryIndexArray = new SecondaryIndex[numberOfRecords];
    Item *itemsArray = new Item[numberOfRecords];

	readPrimaryIndexFromFile(primaryIndexArray, numberOfRecords, primaryIndexFile);
	readSecondaryIndexFromFile(secondaryIndexArray, numberOfRecords, secondaryIndexFile);
	string name;
	//char category[20];
	Item item;
	int RRN;
	//cout << endl << "Enter Target Item Category : ";
	//cin >> category;

	name = getItemName(secondaryIndexArray, numberOfRecords, category);
	if (name == "") {
		cout << endl << "Item category not exist" << endl;
		return;
	}
	RRN = getRecordRRN(primaryIndexArray, numberOfRecords, name);

	item = getItem(RRN, dataFile);
	cout << endl << "Quantity for "<<category<<" is "<< item.quanity << endl;

	dataFile.close();
	primaryIndexFile.close();
	secondaryIndexFile.close();
}

//Function to print quantity of a record
void printQuantity(int numberOfRecords){
    int choice;
    cout<<"Enter 1 for search name or 2 for search category: "<<endl;
    cin>>choice;
    if(choice==1){
        string name;
        cout<<"Enter the name: "<<endl;
        cin>>name;
        searchByName(numberOfRecords,name);
    }else if(choice==2){
        string category;
        cout<<"Enter the category: "<<endl;
        cin>>category;
        searchByCategory(numberOfRecords,category);
    }else{
        cout<<"Error";
    }
}

//Function to add new record
void addItem(int numberOfRecords){

    fstream dataFile,primaryIndexFile,secondaryIndexFile;
    dataFile.open("Items.txt",ios::out);
    dataFile.unsetf(ios::skipws);
    primaryIndexFile.open("primaryIndexFile.txt",ios::out);
    primaryIndexFile.unsetf(ios::skipws);
    secondaryIndexFile.open("secondaryIndexFile.txt",ios::out);
    secondaryIndexFile.unsetf(ios::skipws);

    PrimaryIndex *primaryIndexArray = new PrimaryIndex[numberOfRecords];
    SecondaryIndex *secondaryIndexArray = new SecondaryIndex[numberOfRecords];
    Item *itemsArray = new Item[numberOfRecords];
    for(int i = 0 ; i < numberOfRecords ; i++ ){
        Item tempItem;
        cout<<"Enter Item "<<(i+1)<<" name (Maximum 15 chars): ";
        cin>>tempItem.name;
        cout<<"Enter Item "<<(i+1)<<" category (Maximum 15 chars): ";
        cin>>tempItem.category;
        cout<<"Enter Item "<<(i+1)<<" quantity (Maximum 10 chars): ";
        cin>>tempItem.quanity;
        itemsArray[i] = tempItem;
        primaryIndexArray[i].RRN = i ;
        strcpy(primaryIndexArray[i].name,tempItem.name);
        strcpy(secondaryIndexArray[i].name,tempItem.name);
        strcpy(secondaryIndexArray[i].category,tempItem.category);
        dataFile.write((char*) &(itemsArray[i]),sizeof(itemsArray[i]));
    }
    sort(primaryIndexArray,primaryIndexArray+numberOfRecords);
    sort(secondaryIndexArray,secondaryIndexArray+numberOfRecords);

    writePrimaryIndexToFile(primaryIndexArray,numberOfRecords,primaryIndexFile);
    writeSecondaryIndexToFile(secondaryIndexArray,numberOfRecords,secondaryIndexFile);

    dataFile.close();
    primaryIndexFile.close();
    secondaryIndexFile.close();
}

//Function to print all record’s names
void printAllNames(int numberOfRecords){
    fstream dataFile;
    dataFile.open("Items.txt",ios::in);
    Item item;
    for(int i = 0 ;i<numberOfRecords;i++){
            dataFile.seekg(i * sizeof(item),ios::beg);
            dataFile.read((char*) &item,sizeof(item));
            cout<<"Item #"<<(i+1)<<" name: "<<item.name<<endl;
    }

}

//Function to print all record’s categories
void printAllCategories(int numberOfRecords){
    fstream dataFile;
    dataFile.open("Items.txt",ios::in);
    Item item;
    for(int i = 0 ;i<numberOfRecords;i++){
            dataFile.seekg(i * sizeof(item),ios::beg);
            dataFile.read((char*) &item,sizeof(item));
            cout<<"Item #"<<(i+1)<<" category: "<<item.category<<endl;
    }

}

//Function to count items in the list
void countItems(int numberOfRecords){
    fstream dataFile;
    dataFile.open("Items.txt",ios::in);
    Item item;
    Item *itemsList = new Item[numberOfRecords];
    readDataFile(itemsList,numberOfRecords,dataFile);
    //set<string> distinctListNames;
    int counter = 0;
    for(int i = 0 ;i<numberOfRecords;i++){
            dataFile.read((char*) &itemsList[i],sizeof(item));
            counter++;
    }
    cout<<"Number of items in the shopping list = "<<counter<<endl;

}

//Function to count categories in the list
void countItemsCategories(int numberOfRecords){
    fstream dataFile;
    dataFile.open("Items.txt",ios::in);
    Item item;
    Item *itemsList = new Item[numberOfRecords];
    set<string> distinctListCategories;
    int counter = 0;
    for(int i = 0 ;i<numberOfRecords;i++){
            dataFile.seekg(i * sizeof(item),ios::beg);
            dataFile.read((char*) &itemsList[i],sizeof(item));
            distinctListCategories.insert(itemsList[i].category);
    }
    cout<<"Number of categories in the shopping list = "<<distinctListCategories.size()<<endl;

}

//Function to update an item name
void updateName(int numberOfRecords,string oldName){

    fstream dataFile,primaryIndexFile,secondaryIndexFile;
    dataFile.open("Items.txt",ios::in);
    primaryIndexFile.open("primaryIndexFile.txt",ios::in);
    secondaryIndexFile.open("secondaryIndexFile.txt",ios::in);

    PrimaryIndex *primaryIndexArray = new PrimaryIndex[numberOfRecords];
    SecondaryIndex *secondaryIndexArray = new SecondaryIndex[numberOfRecords];
    Item *itemsArray = new Item[numberOfRecords];
    string name;
    cout<<"Enter the new name: ";
    cin>>name;
    readDataFile(itemsArray,numberOfRecords,dataFile);

    for(int i =0;i<numberOfRecords;i++){
        if(itemsArray[i].name == oldName){
            strcpy(itemsArray[i].name, name.c_str());
        }
    }
    dataFile.close();
    dataFile.open("Items.txt",ios::out|ios::trunc);
    writeDataFile(itemsArray,numberOfRecords,dataFile);
    readPrimaryIndexFromFile(primaryIndexArray,numberOfRecords,primaryIndexFile);

    for(int i =0;i<numberOfRecords;i++){

        if(primaryIndexArray[i].name == oldName){
            strcpy(primaryIndexArray[i].name, name.c_str());
        }
    }
    primaryIndexFile.close();
    primaryIndexFile.open("primaryIndexFile.txt",ios::out|ios::trunc);
    sort(primaryIndexArray,primaryIndexArray+numberOfRecords);
    writePrimaryIndexToFile(primaryIndexArray,numberOfRecords,primaryIndexFile);

    readSecondaryIndexFromFile(secondaryIndexArray,numberOfRecords,secondaryIndexFile);
        for(int i =0;i<numberOfRecords;i++){

        if(secondaryIndexArray[i].name == oldName){
            strcpy(secondaryIndexArray[i].name, name.c_str());
        }
    }
    secondaryIndexFile.close();
    secondaryIndexFile.open("secondaryIndexFile.txt",ios::out|ios::trunc);
    sort(secondaryIndexArray,secondaryIndexArray+numberOfRecords);
    writeSecondaryIndexToFile(secondaryIndexArray,numberOfRecords,secondaryIndexFile);

    dataFile.close();
    primaryIndexFile.close();
    secondaryIndexFile.close();

}

//Function to update item category
void updateCategory(int numberOfRecords,string oldName){
    fstream dataFile,primaryIndexFile,secondaryIndexFile;
    dataFile.open("Items.txt",ios::in);
    secondaryIndexFile.open("secondaryIndexFile.txt",ios::in);

    SecondaryIndex *secondaryIndexArray = new SecondaryIndex[numberOfRecords];
    Item *itemsArray = new Item[numberOfRecords];
    string category;
    cout<<"Enter the new category: ";
    cin>>category;

    readDataFile(itemsArray,numberOfRecords,dataFile);

    for(int i =0;i<numberOfRecords;i++){
        if(itemsArray[i].name == oldName){
            strcpy(itemsArray[i].category, category.c_str());
        }
    }
    dataFile.close();
    dataFile.open("Items.txt",ios::out|ios::trunc);
    writeDataFile(itemsArray,numberOfRecords,dataFile);

    readSecondaryIndexFromFile(secondaryIndexArray,numberOfRecords,secondaryIndexFile);
        for(int i =0;i<numberOfRecords;i++){

        if(secondaryIndexArray[i].name == oldName){
            strcpy(secondaryIndexArray[i].category, category.c_str());
        }
    }
    secondaryIndexFile.close();
    secondaryIndexFile.open("secondaryIndexFile.txt",ios::out|ios::trunc);
    sort(secondaryIndexArray,secondaryIndexArray+numberOfRecords);
    writeSecondaryIndexToFile(secondaryIndexArray,numberOfRecords,secondaryIndexFile);

    dataFile.close();
    secondaryIndexFile.close();

}

//Function to update item quantity
void updateQuantity(int numberOfRecords,string oldName){

    fstream dataFile,primaryIndexFile,secondaryIndexFile;
    dataFile.open("Items.txt",ios::in);
    Item *itemsArray = new Item[numberOfRecords];

    string quantity;
    cout<<"Enter the new quantity: ";
    cin>>quantity;

   readDataFile(itemsArray,numberOfRecords,dataFile);

    for(int i =0;i<numberOfRecords;i++){
        if(itemsArray[i].name == oldName){
            strcpy(itemsArray[i].quanity, quantity.c_str());
        }
    }
    dataFile.close();
    dataFile.open("Items.txt",ios::out|ios::trunc);
    writeDataFile(itemsArray,numberOfRecords,dataFile);

    dataFile.close();
}

//Update mechanism
void updateItem(int numberOfRecords){
    char oldName[15];
    string category,quantity;
    cout<<"Enter item name: "<<endl;
    cin>>oldName;
    if(searchByNameUpdate(numberOfRecords,oldName)){
        int co;
        cout<<"If you want to update name only enter [1]. for category only enter [2], for quantity only enter [3], for all enter [4]: ";
        cin>>co;
        switch(co){
    case 1:
        updateName(numberOfRecords,oldName);
        break;
    case 2:
        updateCategory(numberOfRecords,oldName);
        break;
    case 3:
        updateQuantity(numberOfRecords,oldName);
        break;
    case 4:
        updateQuantity(numberOfRecords,oldName);
        updateCategory(numberOfRecords,oldName);
        updateName(numberOfRecords,oldName);
        break;
        }
    }else{
        cout<<"Not found!"<<endl;
    }
}

//Driver Class
int main()
{
    //Starting of the program
    cout<<"Welcome to the shopping list [Practice on Primary Index & Secondary Index]"<<endl;
    int choice = 0;
    int numberOfRecords;
    cout<<"Please enter number of records you want to add: ";
    cin>>numberOfRecords;
    do{
    cout<<"[1] Add New Item           "<<endl;
    cout<<"[2] Print All Names        "<<endl;
    cout<<"[3] Print All Categories   "<<endl;
    cout<<"[4] Print Quantity         "<<endl;
    cout<<"[5] Count Items Names      "<<endl;
    cout<<"[6] Count Items Categories "<<endl;
    cout<<"[7] Search By Name         "<<endl;
    cout<<"[8] Search By Category     "<<endl;
    cout<<"[9] Update Item            "<<endl;
    cout<<"[10] Enter 10 for exit     "<<endl;
    cout<<">>";

    cin>>choice;

    switch(choice){
    case 1:
        addItem(numberOfRecords);
        break;
    case 2:
        printAllNames(numberOfRecords);
        break;
    case 3:
        printAllCategories(numberOfRecords);
        break;
    case 4:
        printQuantity(numberOfRecords);
        break;
    case 5:
        countItems(numberOfRecords);
        break;
    case 6:
        countItemsCategories(numberOfRecords);
        break;
    case 7:
        searchByName(numberOfRecords);
        break;
    case 8:
        searchByCategory(numberOfRecords);
        break;
    case 9:
        updateItem(numberOfRecords);
        break;
    case 10:
        break;
    }
    }while(choice != 10);

    return 0;
}
