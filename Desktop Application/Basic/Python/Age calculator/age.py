import datetime
now = datetime.datetime.now()
key1 = now.year - 18
key3 = now.month
d1 = datetime.date.today()
num = 0
try:
    birthday = input("When is your birthday?")
    birthday = datetime.datetime.strptime(birthday,"%d/%m/%Y",).date()
    key2 = birthday.year+18
    age = now.year - birthday.year
    b_month = birthday.month
    n_year = now.year
    b_year = birthday.year
######################################################################################################################################################################
    while b_year < n_year:
        year1 = 12                          # 1 year = 12 months
        num = num + 1
        b_year = b_year + 1
    num2 = 12 - b_month
    months = num * 12 + num2 - 1
    days = now.day - birthday.day
    # print(days)
#######################################################################################################################################################################
    if birthday <= datetime.date.today() and key2 <= now.year:
        print("Your birthday is "+ birthday.strftime('%d, %B %Y'), "and Your Age is", age, "years and", num2-1,"months and", days, "days")
    elif age < 0:
        print("Date or format is incorrect")
    else:
        print("You are under 18", "and Your Age is", age, "years and", num2-1,"months and", days, "days")
except:
    print("date or format is invalid")
25
