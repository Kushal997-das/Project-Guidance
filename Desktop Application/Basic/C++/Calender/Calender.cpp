#include<iostream>

int main()
{
    int a, c, s, i, x, b, l, r, y, m, p;
    //Year 
    std::cout << "Enter the year (from 0 to 1000000000) :";
    std::cin >> b;
    if (b<0 || b>1000000000)
    {
        std::cout<<"ERROR::The input year is not in range range.\n"<<"EXIT";
        return 1;
    }
    //Month for which the calender is required
    std::cout << "Enter the number of the month(from 1 to 12) :";
    std::cin >> a;
    if (a<1 || a>12)
    {
        std::cout<<"ERROR::The input month is not in range range.\n"<<"EXIT";
        return 2;
    }
    //Aplying Julian Calender Algorithm
    r = b % 100;
    y = (r + (r / 4)) % 7;
    //With the help of month number moth name is getting detected
    switch (a)
    {
    case 1:std::cout << "\t\tJanuary" << std::endl;
        m = 0;
        break;
    case 2:std::cout << "\t\tFebruary" << std::endl;
        m = 3;
        break;
    case 3:std::cout << "\t\tMarch" << std::endl;
        m = 3;
        break;
    case 4:std::cout << "\t\tApril" << std::endl;
        m = 6;
        break;
    case 5:std::cout << "\t\tMay" << std::endl;
        m = 1;
        break;
    case 6:std::cout << "\t\tJune" << std::endl;
        m = 4;
        break;
    case 7:std::cout << "\t\tJuly" << std::endl;
        m = 6;
        break;
    case 8:std::cout << "\t\tAugust" << std::endl;
        m = 2;
        break;
    case 9:std::cout << "\t\tSeptember" << std::endl;
        m = 5;
        break;
    case 10:std::cout << "\t\tOctober" << std::endl;
        m = 0;
        break;
    case 11:std::cout << "\t\tNovember" << std::endl;
        m = 3;
        break;
    case 12:std::cout << "\t\tDecember" << std::endl;
        m = 5;
        break;
    }
    if (b >= 1700 && b < 1800)
        c = 4;
    if (b >= 1800 && b < 1900)
        c = 2;
    if (b >= 1900 && b < 2000)
        c = 0;
    if (b >= 2000 && b < 2100)
        c = 6;
    if (b >= 2100 && b < 2200)
        c = 4;
    if (b >= 2200 && b < 2300)
        c = 2;
    if (b >= 2300 && b < 2400)
        c = 0;
    l = 0;
    if (b % 4 == 0 && b % 100 != 0 || b % 400 == 0)
    {
        p = 1;
        if (a <= 2)
            l = 1;
    }
    else
        p = 0;
    //Displaying the calender
    i = (y + m + c + 1 - l) % 7;
    std::cout << "Sun\tMon\tTue\tWed\tThu\tFri\tSat\n";
    for (x = 1; x <= i; x++)
    {
        std::cout << "\t";
    }
    if (a == 1 || a == 3 || a == 5 || a == 7 || a == 8 || a == 10 || a == 12)
    {
        for (x = 1; x <= 31; x++)
        {
            if (((x + i - 1) % 7 == 0) && (x != 1))
                std::cout << std::endl;
            std::cout << x << "\t";
        }
    }
    if (a == 4 || a == 6 || a == 9 || a == 11)
    {
        for (x = 1; x <= 30; x++)
        {

            if (((x + i - 1) % 7 == 0) && x != 1)
                std::cout << std::endl;
            std::cout << x << "\t";

        }
    }
    if (a == 2)
    {
        if (p == 0)
        {
            for (x = 1; x <= 28; x++)
            {
                if (((x + i - 1) % 7 == 0) && (x != 1))
                    std::cout << std::endl;
                std::cout << x << "\t";
            }
        }
        else
        {
            for (x = 1; x <= 29; x++)
            {
                if (((x + i - 1) % 7 == 0) && (x != 1))
                    std::cout << std::endl;
                std::cout << x << "\t";
            }
        }
    }
}
