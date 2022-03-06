#include <iostream>
#include<stdio.h>
#include<math.h>
int check_card(long long l);
int length_card(long long l);
int last_two_digit_check(long long l);
using namespace std;
int main()
{
    long long l;
    do
    {
        cout<<"Enter the Card Number: ";
        cin>>l;
    } while (l<0);
    int p=check_card(l);
    int k=length_card(l);
    int j=last_two_digit_check(l);
        if (p==1)
    {
        if (k==13)
        {
            if (j>=40&&j<50)
            {
                cout<<"VISA";
            }
            else
            cout<<"INVALID";
        }
        else if (k==15)
        {
            if (j==34||j==37)
            {
                cout<<"AMERICAN EXPRESS";
            }
            else
            cout<<"INVALID";
        }
        else if (k==16)
        {
            if (j==22||j==51||j==52||j==53||j==54||j==55)
            {
                cout<<"MASTERCARD";
            }
            else if (j>=40&&j<50)
            {
                cout<<"VISA";
            }
            else
            cout<<"INVALID";
        }
        else
        cout<<"INVALID";
    }
    else
        cout<<"INVALID";
        return 0;
}
int check_card(long long l)
{
    int m=0,a,b,i,z;
    do
    {
        z=l%10;
        l=l/10;
        i=l%10;
        l=l/10;
        a=2*i/10;
        b=2*i%10;
        m=m+a+b+z;
    } while (l!=0);
    if (m%10==0)
        return 1;
}
int length_card(long long l)
{
    int i=0;
    do
    {
        l=l/10;
        i++;
    } while (l!=0);
        return i;
}
int last_two_digit_check(long long l)
{
    do
    {
        l=l/10;
    } while (l>=100);
    return l;
}
