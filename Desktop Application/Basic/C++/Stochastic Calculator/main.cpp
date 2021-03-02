#include <bits/stdc++.h>
using namespace std;
// Constant for the array size
const int ARRAY_SIZE = 6;
// Unordered map to store months and it’s corresponding numbers.
unordered_map<string, int> monthsMap;
// Day class to represent each day with [Date-Open-High-Low-Close-AVG]
class Day
{
public:
    string date;
    int open, high, low, close;
    float avg;
};
// Function which initializes the monthsMap
void assignMonths()
{
    monthsMap["Jan"] = 1;
    monthsMap["Feb"] = 2;
    monthsMap["Mar"] = 3;
    monthsMap["Apr"] = 4;
    monthsMap["May"] = 5;
    monthsMap["Jun"] = 6;
    monthsMap["Jul"] = 7;
    monthsMap["Aug"] = 8;
    monthsMap["Sep"] = 9;
    monthsMap["Oct"] = 10;
    monthsMap["Nov"] = 11;
    monthsMap["Dec"] = 12;
}
//The following function used to compare YEAR - MONTH - DAY for sorting process
bool comp(Day a, Day b)
{
    // Comparing the years
    //Extracting the YEAR from each day date
    string str1 = a.date.substr(7, 5);
    string str2 = b.date.substr(7, 5);
    // Check if the Two years are not equal, so we will sort them in descending order
    // Using compare function, it will return positive value if the first year greater than the second one
    if (str1.compare(str2) != 0)
    {
        if (str1.compare(str2) > 0)
            return true;
        return false; // If two years are equal so we will compare the month
    }

    // Comparing the months
    //Extracting the MONTH from each day date
    string month_sub_a = a.date.substr(3, 3);
    string month_sub_b = b.date.substr(3, 3);

    // Taking numeric value of months from monthsMap
    int month_a = monthsMap[month_sub_a];
    int month_b = monthsMap[month_sub_b];
    //Check if the Two months are not equal, so we will sort them in descending order
    // Using compare function, it will return positive value if the first month greater than the second one
    if (month_a != month_b)
    {
        return month_a > month_b;
    }

    // Comparing the days
    //Extracting the DAY from each day date
    string day_a = a.date.substr(0, 2);
    string day_b = b.date.substr(0, 2);
    //Check if the Two days are not equal, so we will sort them in descending order
    // Using compare function, it will return positive value if the first day greater than the second one
    if (day_a.compare(day_b) > 0)
        return true;
    return false;
}
// The following function calculates the current date.
string todayDate()
{
    time_t t ;
    tm *tmp ;
    char MY_TIME[50];
    time( &t );
    // localtime() uses the time pointed by t ,
    // to fill a tm structure with the
    // values that represent the
    // corresponding local time.
    tmp = localtime( &t );
    // using strftime to display time
    // Copies into ptr the content of format,
    // expanding its format specifiers into the corresponding values
    // that represent the time described in timeptr, with a limit of maxsize characters.
    // Date format ind (%d) -> Day ex: 23 - (%b) -> Month ex: Feb - (%Y) -> Year ex: 2021
    strftime(MY_TIME, sizeof(MY_TIME), "%d %b %Y", tmp);
    return MY_TIME;
}
// The following function to add the default data to the array
// You can use any other source to get the data instead of typing it
// But now this is just an example
void defaultData(Day arr_days[])
{
    /// Consider that date format should be like -> (01 Feb 2021) not (1 Feb 2021) for numbers less than 10.
    //Each day consists of 6 data variables [Date-Open-High-Low-Close-AVG]
    //Day 1
    arr_days[0].date = "19 Feb 2021";
    arr_days[0].open = 100;
    arr_days[0].high = 100;
    arr_days[0].low = 100;
    arr_days[0].close = 5;
    arr_days[0].avg = 0;
    //Day 2
    arr_days[1].date = "29 Jan 2021";
    arr_days[1].open = 100;
    arr_days[1].high = 100;
    arr_days[1].low = 100;
    arr_days[1].close = 10;
    arr_days[1].avg = 0;
    //Day 3
    arr_days[2].date = "28 Jan 2021";
    arr_days[2].open = 100;
    arr_days[2].high = 100;
    arr_days[2].low = 100;
    arr_days[2].close = 20;
    arr_days[2].avg = 0;
    //Day 4
    arr_days[3].date = "15 Jan 2021";
    arr_days[3].open = 100;
    arr_days[3].high = 100;
    arr_days[3].low = 100;
    arr_days[3].close = 20;
    arr_days[3].avg = 0;
    //Day 5
    arr_days[4].date = "01 Feb 2021";
    arr_days[4].open = 100;
    arr_days[4].high = 100;
    arr_days[4].low = 100;
    arr_days[4].close = 20;
    arr_days[4].avg = 0;
}
// The following function calculates the AVG closing time for the most recent day
// The function takes the array, then initialize variable sum = 0 with type int
// to store the closing time for all days using fol loop, after for loop we divide
// sum by the array size to get the AVG and putting it in the appropriate place (most recent day).
void calculateAVGClosingPrice(Day arr_days[])
{
    //Store total closing price values
    int sum = 0;
    //Calculate total sum
    for(int i = 0 ; i<ARRAY_SIZE ; i++)
    {
        sum += arr_days[i].close;
    }
    //Put the new AVG for most recent day
    arr_days[ARRAY_SIZE-1].avg = (float)sum/ARRAY_SIZE;
}
int main()
{
    // Array with 6 days, each day has 6 parts [Date - Open - High - Low - Close - AVG]
    Day arr_days[ARRAY_SIZE]; // Array of type Day
    defaultData(arr_days); // Calling defaultData() and send the array to initialize the default days
    //Day 6
    arr_days[5].date = todayDate(); // The function todayDate() to get the current day date, ex: 23 Feb 2021
    //Here we can put the data or take it as an input
    arr_days[5].open = 100; // Add the open price
    arr_days[5].high = 100; // Add the high price
    arr_days[5].low = 100; // Add the low price
    arr_days[5].close = 8; // Add the close price
    arr_days[5].avg = 0; // Set the AVG to zero

    //Calling of function that will calculate the total closing price AVG for all days
    calculateAVGClosingPrice(arr_days);

    // Printing the array of data before sorting it according to date
    cout<<"=> Before Sorting: "<<endl;
    cout<<"------------------------------------------------------------"<<endl;
    cout<<"Date "<<"         - "<<" Open "<<"  - "<<" High "<<"- "<<" Low "<<"   - "<<" Close "<<" - "<<"   AVG "<<endl;
    cout<<"------------------------------------------------------------"<<endl;
    for(int i = 0 ; i<ARRAY_SIZE; i++)
    {
        cout<<setw(10)<<arr_days[i].date<<setw(5)<<" - "<<setw(5)<<arr_days[i].open<<setw(5)<<" - "<<setw(5)<<arr_days[i].high<<" - "
            <<setw(5)<<arr_days[i].low<<setw(5)<<"  - "<<setw(5)<<arr_days[i].close<<setw(5)<<" - "<<setw(5)<<arr_days[i].avg<<endl;
    }

    // Calling the function that will assign every month name to it’s number, ex: Feb -> 2
    assignMonths();

    // Calling the function that will sort the array according to the dates
    sort(arr_days, arr_days + ARRAY_SIZE, comp);

    // Printing the sorted array in descending order according to dates.
    cout<<endl;
    cout<<"=> After Sorting: "<<endl;
    cout<<"------------------------------------------------------------"<<endl;
    cout<<"Date "<<"         - "<<" Open "<<"  - "<<" High "<<"- "<<" Low "<<"   - "<<" Close "<<" - "<<"   AVG "<<endl;
    cout<<"------------------------------------------------------------"<<endl;
    for(int i = 0 ; i<ARRAY_SIZE; i++)
    {
        cout<<setw(10)<<arr_days[i].date<<setw(5)<<" - "<<setw(5)<<arr_days[i].open<<setw(5)<<" - "<<setw(5)<<arr_days[i].high<<" - "
            <<setw(5)<<arr_days[i].low<<setw(5)<<"  - "<<setw(5)<<arr_days[i].close<<setw(5)<<" - "<<setw(5)<<arr_days[i].avg<<endl;
    }
    return 0;
}
