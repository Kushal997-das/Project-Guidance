#include <iostream>
#include <string>
using namespace std;

// Constants for year limits
const int MIN_YEAR = 0;
const int MAX_YEAR = 1000000000;

// Function to get the month name
string getMonthName(int month) {
    switch (month) {
        case 1: return "January";
        case 2: return "February";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
        default: return ""; // Should never reach here
    }
}

// Function to check if the year is a leap year
bool isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

// Function to get the century code based on the year
int getCenturyCode(int year) {
    if (year >= 1700 && year < 1800) return 4;
    if (year >= 1800 && year < 1900) return 2;
    if (year >= 1900 && year < 2000) return 0;
    if (year >= 2000 && year < 2100) return 6;
    if (year >= 2100 && year < 2200) return 4;
    if (year >= 2200 && year < 2300) return 2;
    return 0; // Default for years >= 2300
}

// Function to get the month code for day calculation
int getMonthCode(int month) {
    switch (month) {
        case 1: return 0; // January
        case 2: return 3; // February
        case 3: return 3; // March
        case 4: return 6; // April
        case 5: return 1; // May
        case 6: return 4; // June
        case 7: return 6; // July
        case 8: return 2; // August
        case 9: return 5; // September
        case 10: return 0; // October
        case 11: return 3; // November
        case 12: return 5; // December
        default: return 0; // Should never reach here
    }
}

int main() {
    int year, month;

    // Input for year
    cout << "Enter the year (from " << MIN_YEAR << " to " << MAX_YEAR << "): ";
    cin >> year;
    if (year < MIN_YEAR || year > MAX_YEAR) {
        cout << "ERROR: The input year is not in range.\nPlease try again.\n";
        return 1;
    }

    // Input for month
    cout << "Enter the number of the month (from 1 to 12): ";
    cin >> month;
    if (month < 1 || month > 12) {
        cout << "ERROR: The input month is not in range.\nPlease try again.\n";
        return 2;
    }

    // Calculating the day of the week
    int centuryCode = getCenturyCode(year);
    int yearCode = year % 100; // Last two digits of the year
    int leapAdjustment = (isLeapYear(year) && month <= 2) ? 1 : 0; // Adjust if it's a leap year and before March
    int dayOfWeek = (yearCode + (yearCode / 4) + getMonthCode(month) + centuryCode - leapAdjustment) % 7;

    // Displaying the calendar
    cout << "\n\t\t" << getMonthName(month) << " " << year << endl;
    cout << "Sun\tMon\tTue\tWed\tThu\tFri\tSat\n";

    for (int x = 0; x < dayOfWeek; x++) {
        cout << "\t"; // Leading spaces for the first week
    }

    int daysInMonth;
    if (month == 2) {
        daysInMonth = isLeapYear(year) ? 29 : 28; // February days
    } else {
        daysInMonth = (month == 4 || month == 6 || month == 9 || month == 11) ? 30 : 31; // Days in other months
    }

    for (int day = 1; day <= daysInMonth; day++) {
        cout << day << "\t";
        if ((day + dayOfWeek) % 7 == 0) {
            cout << endl; // New line after Saturday
        }
    }
    cout << endl; // New line at the end
    return 0;
}
