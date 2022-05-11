import re
import pandas as pd

#data = 'WhatsApp Chat With Access Denied.txt'
def process(data):
    #key = '12hr'
    split_formats =  '\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}\s[APap][mM]\s-\s'
    datetime_formats = '%d/%m/%Y, %I:%M %p - '

    #raw_data = open(data, 'r', encoding='utf-8')

    # print(raw_data.read())
    raw_string = ' '.join(data.split('\n'))  # converting the list split by newline char. as one whole string as there can be multi-line messages
    user_msg = re.split(split_formats, raw_string)[1:]  # splits at all the date-time pattern, resulting in list of all the messages with user names
    date_time = re.findall(split_formats, raw_string)  # finds all the date-time patterns

    df = pd.DataFrame({'date_time': date_time, 'user_msg': user_msg})  # exporting it to a df

    # converting date-time pattern which is of type String to type datetime,
    # format is to be specified for the whole string where the placeholders are extracted by the method
    df['date_time'] = pd.to_datetime(df['date_time'], format=datetime_formats)
    usernames = []
    msgs = []
    for i in df['user_msg']:
        a = re.split('([\w\W]+?):\s',i)  # lazy pattern match to first {user_name}: pattern and spliting it aka each msg from a user
        if (a[1:]):  # user typed messages
            usernames.append(a[1])
            msgs.append(a[2])
        else:  # other notifications in the group(eg: someone was added, some left ...)
            usernames.append("group_notification")
            msgs.append(a[0])

        # creating new columns
    df['user'] = usernames
    df['message'] = msgs

    # dropping the old user_msg col.
    df.drop('user_msg', axis=1, inplace=True)
    df['only_date'] = df['date_time'].dt.date
    df['year'] = df['date_time'].dt.year
    df['month_num'] = df['date_time'].dt.month
    df['hour'] = df['date_time'].dt.hour
    df['minute'] = df['date_time'].dt.minute
    df['month_name'] = df['date_time'].dt.month_name()
    df['day'] = df['date_time'].dt.day
    df['day_name'] = df['date_time'].dt.day_name()
    df.drop('date_time', axis=1, inplace=True)
    period = []
    for hour in df[['day_name', 'hour']]['hour']:
        if hour == 23:
            period.append(str(hour) + "-" + str('00'))
        elif hour == 0:
            period.append(str('00') + "-" + str(hour + 1))
        else:
            period.append(str(hour) + "-" + str(hour + 1))

    df['period'] = period
    return df