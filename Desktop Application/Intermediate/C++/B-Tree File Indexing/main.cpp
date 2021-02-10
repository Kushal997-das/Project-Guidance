#include<iostream>
#include<fstream>
#include<vector>
#include<iomanip>
using namespace std;
void createFile(string fileName, int numRecord);
int deleteRecord(string fileName, int recordNo);
void displayContent(string fileName, int numRecord);

void defaultArray(int** arr, int numRecord);
void printArr(int** arr, int numRecord);

class Node
{
public:
    int* key;
    int* address;
    Node** child;
    bool isLeaf;
    int noKey;
    Node* parent;
    bool flag = true;
    Node(int order)
    {
        key = new int[order + 1];
        for (int i = 0; i < order + 1; i++)
            key[i] = NULL;
        address = new int[order + 1];
        for (int i = 0; i < order + 1; i++)
            address[i] = NULL;
        isLeaf = true;
        child = new Node * [order + 1];
        noKey = 0;
        for (int i = 0; i < order + 1; i++)
        {
            child[i] = NULL;
        }
        parent = NULL;
    }
    Node* insertInNode(int& item, int add, Node* node, int order, Node* temp)
    {
        if (isLeaf == true)
        {
            int i = order + 1;
            while (key[i - 1] == NULL)
            {
                i--;
            }
            while (key[i - 1] > item && i != 0)
            {
                key[i] = key[i - 1];
                address[i] = address[i - 1];
                i--;
            }

            key[i] = item;
            address[i] = add;
            noKey = noKey + 1;
        }
        else
        {
            int i = 0;
            while (i < noKey && item > key[i] && i < order)
            {
                i++;
            }
            if (i == noKey)
            {
                flag = false;
                i--;
            }
            child[i]->insertInNode(item, add, this, order, temp);
        }
        if (noKey == order + 1)
        {
            if (this == temp)
            {
                Node* newNode = new Node(order);
                newNode->isLeaf = false;
                newNode->child[0] = this;
                newNode->split(this, order, temp);
                return newNode;
            }
            else
            {
                node->split(this, order, temp);
            }

        }
        flag = true;
        Node* current = new Node(order);
        current = this;
        while (current != this->parent && current != NULL)
        {
            for (int i = 0; current->child[i] != NULL; i++)
            {
                current->key[i] = child[i]->key[child[i]->noKey - 1];
                current->address[i] = child[i]->address[child[i]->noKey - 1];
            }
            current = current->parent;
        }
        return temp;
    }
    void split(Node* node, int order, Node* root)
    {
        Node* right = new Node(order);

        int minChild;
        if (order % 2 == 0)
        {
            minChild = float(order) / 2;
        }
        else
        {

            minChild = order / 2;
            minChild++;
        }
        int iR = 0;
        int check = (order) / 2;
        int counter = node->noKey;
        int temp = node->key[check];
        int tempadd = node->address[check];
        int temp2 = node->key[order];
        int temp2add = node->address[order];
        int iC = 0;
        //
        int children = minChild;
        for (int i = check + 1; i < counter; i++)
        {
            right->key[iR] = node->key[i];
            right->address[iR] = node->address[i];
            iR++;
            node->key[i] = NULL;
            node->address[i] = NULL;
            node->noKey = (node->noKey) - 1;
            right->noKey = (right->noKey) + 1;
        }
        if (node->isLeaf == false)
        {
            for (int i = children; i <= order; i++)
            {
                right->child[iC] = node->child[i];
                iC++;
                node->child[i] = NULL;
            }
            //
            right->isLeaf = node->isLeaf;
        }
        int k = order - 1;
        while (child[k] != node)
        {
            child[k + 1] = child[k];
            k--;
        }
        child[k + 1] = right;
        int j = noKey;
        while (key[j - 1] > temp && j != 0)
        {
            key[j] = key[j - 1];
            address[j] = address[j - 1];
            j--;
        }
        key[j] = temp;
        address[j] = tempadd;
        noKey = noKey + 1;

        j = noKey;
        while (key[j - 1] > temp2 && j != 0)
        {
            key[j] = key[j - 1];
            address[j] = address[j - 1];
            j--;
        }
        key[j] = temp2;
        address[j] = temp2add;
        noKey = noKey + 1;
        for (int i = 0; i < noKey - 1; i++)
        {
            if (key[i] == key[i + 1])
            {
                for (int j = i; j < noKey - 1; j++)
                {
                    key[j] = key[j + 1];
                    address[j] = address[j + 1];
                }
                noKey--;
            }
        }
        key[noKey] = NULL;
        address[noKey] = NULL;
        right->parent = this;
        node->parent = this;

    }
    void print(string space, int** arr, int index)
    {
        if(isLeaf)
        {
            arr[index][0] = 0;
        }
        else
        {
            arr[index][0] = 1;
        }
        int j = 0;
        int i = 1;
        for (; j < noKey; j++,i++)
        {
            arr[index][i] = key[j];
            arr[index][++i] = address[j];
        }
    }
};

class BTree
{
public:
    Node* root = NULL;
    int o;
    BTree(int order)
    {
        o = order;
    }

    void Insert(int item, int add)
    {
        if (root == NULL)
        {
            root = new Node(o);
            root->isLeaf = true;
            root->key[0] = item;
            root->address[0] = add;
            root->noKey = 1;
        }
        else
        {
            root = root->insertInNode(item, add, root, o, root);
        }
    }

    void pre(Node* node, string space, int** arr,int& k)
    {
        static int c = 1;
        if (node == NULL)
        {
            return;
        }
        else
        {
            node->print(space, arr, k);
            if((k+1) == 10 )
            {
                arr[0][1] = -1;
            }
            else
            {
                arr[0][1] = k + 1;
            }

            for (int i = 0; i < o; i++)
            {
                if (node->child[i] != NULL)
                {
                    k++;
                    pre(node->child[i], space, arr, k);
                }

            }
        }
    }
    void Print(int** arr)
    {
        int k=1;
        pre(root, "", arr, k);
        cout << endl;
    }
    void clear()
    {
        root = NULL;
    }
};
void insertRecord(string fileName, int key, int address, int num, BTree* btree)
{
    btree->Insert(key,address);
    int** arr = new int* [num];
    for (int i = 0; i < num; i++)
    {
        arr[i] = new int[11];
    }
    defaultArray(arr,num);
    btree->Print(arr);
    fstream indexFile;
    indexFile.open(fileName+".txt", ios::out|ios::trunc);
    indexFile.unsetf(ios::skipws);
    for (int i = 0; i < num; i++)
    {
        for (int j = 0; j < 11; j++)
        {
            indexFile.write((char*)&(arr[i][j]), sizeof(arr[i][j]));
        }
    }
    indexFile.close();
}
int searchRecord(string fileName, int key,int num, BTree* btree)
{
    int** arr = new int* [num];
    for (int i = 0; i < num; i++)
    {
        arr[i] = new int[11];
    }
    defaultArray(arr,num);
    btree->Print(arr);
    int reNum = -1;
    for(int i = 1 ; i<num; i++)
    {
        for(int j = 1 ; j< 11 ; j+=2)
        {

            if(arr[i][j] == key)
            {

                reNum = arr[i][j+1];
                return reNum;
            }
        }
    }
    return reNum;
}
int main()
{
    BTree* btree = new BTree(5);
    string fileName;
    int numRecord;

    cout << "Enter file name: ";
    cin >> fileName;

    cout << "Enter number of records: ";
    cin >> numRecord;

    createFile(fileName, numRecord);

    int choice;
    do
    {
        cout << "***********Welcome in multilevel indexing***********\n";
        cout << "1) Insert record\n";
        cout << "2) Delete record\n";
        cout << "3) Display content\n";
        cout << "4) Search record\n";
        cout << "5) Exit\n";

        cin >> choice;

        switch (choice)
        {

        case 1:
            int key, address;
            cout << "Enter key and address respectively: ";
            cin >> key >> address;
            insertRecord(fileName, key, address,numRecord, btree);
            break;
        case 2:
            int recordNo;
            cout << "Enter record number: ";
            cin >> recordNo;
            deleteRecord(fileName, recordNo);
            break;
        case 3:
            displayContent(fileName, numRecord);
            break;
        case 4:
            int keySearch;
            cout << "Enter record number: ";
            cin >> keySearch;
            int result = searchRecord(fileName, keySearch,numRecord,btree);
            if(result == -1)
            {
                cout<<"Key "<<keySearch<<" not found ->"<<result<<endl;
            }
            else
            {
                cout<<"Key "<<keySearch<<" found at Address "<<result<<endl;
            }
            break;
        }
    }
    while (choice != 5);
    cout<<"Thanks for using our application"<<endl;
    return 0;
}

void createFile(string fileName, int numRecord)
{
    int** arr = new int* [numRecord];
    for (int i = 0; i < numRecord; i++)
    {
        arr[i] = new int[11];
    }
    defaultArray(arr, numRecord);
    fstream indexFile;
    indexFile.open(fileName+".txt", ios::out);
    indexFile.unsetf(ios::skipws);
    for (int i = 0; i < numRecord; i++)
    {
        for (int j = 0; j < 11; j++)
        {
            indexFile.write((char*)&(arr[i][j]), sizeof(arr[i][j]));
        }
    }
    indexFile.close();
}

int deleteRecord(string fileName, int recordNo)
{
    return -1;
}

void displayContent(string fileName, int numRecord)
{
    fstream indexFile1;
    int** arr2 = new int*[numRecord];
    for (int i = 0; i < numRecord; i++)
    {
        arr2[i] = new int[11];
    }
    indexFile1.open(fileName+".txt", ios::in);
    string line;
    for (int i = 0; i < numRecord; i++)
    {
        for (int j = 0; j < 11; j++)
        {
            indexFile1.read((char*)&arr2[i][j], sizeof(arr2[i][j]));
        }
    }
    printArr(arr2, numRecord);
    indexFile1.close();
}


void defaultArray(int** arr, int numRecord)
{
    for (int i = 0; i < numRecord; i++)
    {
        for (int j = 0; j < 11; j++)
        {
            if (j == 1 && i != numRecord - 1)
            {
                arr[i][j] = (i + 1);
            }
            else
            {
                arr[i][j] = -1;
            }
        }
    }
}

void printArr(int** arr, int numRecord)
{
    for (int i = 0; i < numRecord; i++)
    {

        for (int j = 0; j < 11; j++)
        {
            cout <<  setw(5) << arr[i][j];
        }
        cout << endl;
    }
}
