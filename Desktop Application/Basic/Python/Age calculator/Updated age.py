import datetime

# Get the current system date and time
now = datetime.datetime.now()

try:
    # Take user input of their birth date
    birthday = input("When is your birthday? (dd/mm/yyyy): ")
    birthday = datetime.datetime.strptime(
        birthday,
        "%d/%m/%Y",
    ).date()
    
    # Calculate age
    age_years = now.year - birthday.year
    age_months = now.month - birthday.month
    age_days = now.day - birthday.day
    
    if(age_days < 0):
        age_months -= 1
        
        '''1. If the age_days is negative, it implies the month must be one less than the month number that is calculated and stored in age_months
        2. "(now.month-1)%12 or 12" ensures that when the previous month is calculated, its value lie in the range [1, 12]
        ''' 
        previous_month = (now.month - 1) % 12 or 12
        
        days_in_prev_month = (datetime.date(now.year, previous_month + 1, 1) - datetime.date(now.year, previous_month, 1)).days
        
        age_days += days_in_prev_month
        
    if (age_months < 0):
        '''If age_months is negative, it implies the year must be one less than the year number that is calculated and store in age_years'''
        age_years -= 1
        age_months += 12
    
    # Printing the current age of the user
    print(f"Your birthday is {birthday.strftime('%d %B %Y')}\nYour current age is {age_years} years, {age_months} months and {age_days} days.")

except ValueError:
    print("Either the date or the format is invalid.")