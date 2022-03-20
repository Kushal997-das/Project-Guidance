#include<stdio.h>
#include <iostream>
#include<string.h>
using namespace std;
int compute_score(string word);
int POINTS[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};
        //     {a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q,  r, s, t, u, v, w, x, y, z}
int main()
{
    cout<<"_________________ENTER THE WORD_________________ \n"<<endl;
    string a,b;
    cout<<"PLAYER 1: ";
    cin>>a;
    cout<<"PLAYER 2: ";
    cin>>b;
    cout<<"_________________SCORE_________________ \n"<<endl;
    cout<<"PLAYER 1: ";
    int x=compute_score(a);
    cout<<"PLAYER 2: ";
    int y=compute_score(b);
    cout<<"_________________RESULT_________________ \n"<<endl<<endl;
    if (x>y)
    {
        cout<<"-------------------PLAYER 1 WINS-------------------";
    }
    else if (x<y)
    {
        cout<<"-------------------PLAYER 2 WINS-------------------";
    }
    else
    {
        cout<<"-------------------TIE-------------------";
    }
}


int compute_score(string word) 
{
    int t=0,k=0;
    for (int i = 0,n=word.length(); i < n; i++)
        {
            word[i]=tolower(word[i]);
            for (char ch = 'a'; ch <= 'z'; ch++)
                {
                    if (ch==word[i])
                    {
                        t++;
                        k=k+POINTS[ch-97];
                    }
                }
            
        }   cout<<k<<" \n";
    return k;
}