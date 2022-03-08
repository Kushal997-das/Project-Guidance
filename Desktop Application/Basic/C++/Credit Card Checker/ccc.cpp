#include <iostream>
#include<stdio.h>
#include<math.h>
bool checkCard(long long cardNumber);
int length_card(long long cardNumber);
int last_two_digit_check(long long cardNumber, int cardLength);
bool checkMasterCard(int lastTwoDigitOfCard);
bool checkVisa(int lastTwoDigitOfCard);
bool checkAmericanExpress(int lastTwoDigitOfCard);
using namespace std;

int main()
{
    long long cardNumber=0;
    do
    {
        cout << "Enter the Card Number: ";
        cin >> cardNumber;
        bool isValidCard = checkCard(cardNumber);
        int cardLength = length_card(cardNumber);
        int lastTwoDigitOfCard = last_two_digit_check(cardNumber, cardLength);
        if (isValidCard)
        {
            if (cardLength == 13 || cardLength == 16) {
                if (checkVisa(lastTwoDigitOfCard)) {
                    cout << "VISA" << endl;
                }
                else goto masterCardCheck;
            }
            else if (cardLength == 15) {
                if (checkAmericanExpress(lastTwoDigitOfCard)) {
                    cout << "AMERICAN EXPRESS" << endl;
                }
                else goto InValidCard;
            }
            else if (cardLength == 16) {
            masterCardCheck:
                if (checkMasterCard(lastTwoDigitOfCard)) {
                    cout << "MASTERCARD" << endl;
                }
                else goto InValidCard;
            }
        }
        else {
        InValidCard:
            cout << "INVALID" << endl;
        }

    } while (cardNumber > 0);

    return 0;
}
bool checkCard(long long cardNumber)
{
    int m = 0, a, b, i, z;
    do
    {
        z = cardNumber % 10;
        cardNumber = cardNumber / 10;
        i = cardNumber % 10;
        cardNumber = cardNumber / 10;
        a = 2 * i / 10;
        b = 2 * i % 10;
        m = m + a + b + z;
    } while (cardNumber != 0);
    if (m % 10 == 0) {
        return 1;
    }
    else return 0;
}
int length_card(long long cardNumber) {
    return log10(cardNumber) + 1;
}
int last_two_digit_check(long long cardNumber, int cardLength) {
    return cardNumber / long long(pow(10, cardLength - 2));
}

bool checkMasterCard(int j) {
    switch (j)
    {
    case 22:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
        return true;
        break;
    default:
        return false;
        break;
    }
}

bool checkVisa(int j) {
    if (j >= 40 && j < 50) {
        return true;
    }
    else return false;
}

bool checkAmericanExpress(int j) {
    if (j == 34 || j == 37) {
        return true;
    }
    return false;
}
