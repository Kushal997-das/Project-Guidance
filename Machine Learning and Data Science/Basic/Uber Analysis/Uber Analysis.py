#!/usr/bin/env python
# coding: utf-8

# # Uber Analysis

# In[1]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import datetime, time

import warnings
warnings.filterwarnings('ignore')

get_ipython().run_line_magic('matplotlib', 'inline')


# In[2]:


df = pd.read_csv('My Uber Drives - 2016.csv')


# In[3]:


df.head()


# In[4]:


df.columns = df.columns.str.replace("*","")


# In[5]:


df.head()


# In[6]:


df.info()


# In[7]:


df.shape


# In[8]:


df.describe()


# In[9]:


df.isnull().sum()


# In[10]:


plt.figure(figsize=(15,10))
sns.heatmap(df.isnull())


# In[11]:


df.dropna(axis=0, subset=['END_DATE','CATEGORY','START','STOP'], how='all', inplace=True)


# In[12]:


df.isnull().sum()


# In[13]:


df['PURPOSE'].fillna(method = 'ffill', inplace = True)


# **Pandas dataframe.ffill() function** is used to fill the missing value in the dataframe. ‘ffill’ stands for ‘forward fill’ and will propagate last valid observation forward.

# **1. ffill() across row axis:**
# 
# When ffill() is applied across the index then any missing value is filled based on the corresponding value in the previous row.
# ![image.png](attachment:image.png)
# 
# *applying ffill() method to fill the missing values:*  **df.ffill(axis = 0)**
# 
# ![image-2.png](attachment:image-2.png)
# *Notice, values in the first row is still NaN value because there is no row above it from which non-NA value could be propagated.*

# **2. ffill() across column axis:**
# 
# When ffill is applied across the column axis, then missing values are filled by the value in previous column in the same row.
# 
# ![image-2.png](attachment:image-2.png)
# 
# *applying ffill() method to fill the missing values:* **df.ffill(axis = 1)**
# 
# ![image-3.png](attachment:image-3.png)
# 
# *Notice, the value in the first column is NaN value because there is no cell left to it and so this cell cannot be filled using the previous cell value along the column axis.*

# In[14]:


df.isnull().sum()


# In[15]:


df['START_DATE'] = pd.to_datetime(df['START_DATE'], errors='coerce')
df['END_DATE'] = pd.to_datetime(df['END_DATE'], errors='coerce')


# **pandas.to_numeric()** is one of the general functions in Pandas which is used to convert argument to a numeric type.

# **pd.to_numeric(ser, downcast = 'signed')**:
# 
# by using downcast = 'signed', all the values will be casted to integer.
# 
# **pd.to_numeric(ser, errors = 'ignore')**
# 
# Using errors = 'ignore', it will ignore all non-numeric values.
# 
# **pd.to_numeric(ser, errors = 'coerce')**
# 
# Using errors = 'coerce', it will replace all non-numeric values with NaN

# In[16]:


df.info()


# ## Data Analysis

# In[17]:


df['CATEGORY'].value_counts()


# In[18]:


df['CATEGORY'].value_counts().plot(kind='bar', color='r')


# In[19]:


start_point = df.START.value_counts()
start_point


# In[20]:


start_point.head()


# In[21]:


start_point[start_point>10].plot(kind = 'pie')


# In[22]:


plt.figure(figsize=(20,20))
start_point[start_point<=10].plot(kind = 'pie')


# In[23]:


stop_point = df.STOP.value_counts()
stop_point


# In[24]:


stop_point.head()


# In[25]:


stop_point[stop_point>10].plot(kind = 'pie')


# In[26]:


plt.figure(figsize = (20,20))
stop_point[stop_point<=10].plot(kind = 'pie')


# In[27]:


miles = df.MILES.value_counts()
miles


# In[28]:


miles[miles > 10].plot(kind = 'bar')


# In[29]:


plt.figure(figsize = (6, 6))
miles[miles > 10].plot(kind = 'pie')


# In[30]:


df.PURPOSE.value_counts().plot(kind = 'bar')


# In[31]:


plt.figure(figsize = (15, 10))
sns.countplot(df['PURPOSE'])


# In[32]:


df


# In[33]:


df['MINUTES'] = df.END_DATE - df.START_DATE


# In[34]:


df.head()


# In[35]:


df['MINUTES'] = df['MINUTES'].dt.total_seconds()/60


# The **dt.total_seconds() function** is used to return *total duration of each element expressed in seconds.* 
# 
# This method is available directly on TimedeltaArray, TimedeltaIndex and on Series containing timedelta values under the.dt namespace.

# In[36]:


df.head()


# In[37]:


plt.figure(figsize = (15, 5))
plt.subplot(1,2,1)
sns.boxplot(data = df, x = df['PURPOSE'], y = df['MILES'])
plt.xticks(rotation = 45)

plt.subplot(1,2,2)
sns.boxplot(data = df, x = df['PURPOSE'], y = df['MINUTES'])
plt.xticks(rotation = 45)


# In[38]:


plt.figure(figsize = (15, 5))
plt.subplot(1,2,1)
sns.boxplot(data = df, x = df['PURPOSE'], y = df['MILES'], showfliers = False)
plt.xticks(rotation = 45)

plt.subplot(1,2,2)
sns.boxplot(data = df, x = df['PURPOSE'], y = df['MINUTES'], showfliers = False)
plt.xticks(rotation = 45)


# When creating a boxplot in seaborn, we can use the argument **showfliers = False** to remove outlier observations from the plot:

# **For each purpose what is minimum miles travelled, mean miles travelled and what is maximum miles travelled?**

# In[39]:


pd.DataFrame({'Min': df.groupby(['PURPOSE'])['MILES'].min(),
             'Mean': df.groupby(['PURPOSE'])['MILES'].mean(),
             'Max': df.groupby(['PURPOSE'])['MILES'].max()})


# **For each purpose what is minimum minutes travelled, mean minutes travelled and what is maximum minutes travelled?**

# In[40]:


pd.DataFrame({'Min': df.groupby(['PURPOSE'])['MINUTES'].min(),
             'Mean': df.groupby(['PURPOSE'])['MINUTES'].mean(),
             'Max': df.groupby(['PURPOSE'])['MINUTES'].max()})


# **Describe miles travelled for each purpose**

# In[41]:


df.groupby('PURPOSE')['MILES'].describe()


# In[42]:


df.columns


# In[43]:


def round(x):
    if x['START'] == x['STOP']:
        return 'Yes'
    else:
        return 'No'


# In[44]:


df['ROUND_TRIP'] = df.apply(round, axis = 1)


# In[45]:


df.head()


# In[46]:


sns.countplot(df['ROUND_TRIP'])


# In[47]:


df.head()


# In[48]:


df['MONTH'] = pd.DatetimeIndex(df['START_DATE']).month


# **Pandas DatetimeIndex.date** attribute outputs an Index object containing the date values present in each of the entries of the DatetimeIndex object.
# 
# **Pandas DatetimeIndex.month** attribute outputs an Index object containing the month values present in each of the entries of the DatetimeIndex object.
# 
# **Pandas DatetimeIndex.year** attribute outputs an Index object containing the year values present in each of the entries of the DatetimeIndex object.
# 

# In[49]:


dict = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'July', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}


# In[50]:


df['MONTH'] = df['MONTH'].map(dict)


# In[51]:


df.head()


# In[52]:


plt.figure(figsize = (15, 7))
sns.countplot(df['MONTH'])


# **Round trips for every purpose every month?**

# In[53]:


pd.set_option('display.max_rows',None)


# In[54]:


df.groupby(['MONTH','PURPOSE'])['ROUND_TRIP'].count()


# **Minutes taken to cover miles?**

# In[55]:


sns.lineplot(data = df, x = df['MINUTES'], y = df['MILES'])


# In[56]:


sns.countplot(data = df, x = df['PURPOSE'], hue = 'CATEGORY')
plt.xticks(rotation = 45)


# In[57]:


df.describe()


# ### Conclusions
# 1. December have most bookings - indicates Christmas and end year rush
# 
# 2. Most bookings are for business
# 
# 3. Charity, commute and moving are only personal trips
# 
# 4. Between offices and airport is totally business trips
# 
# 5. Cary is most frequent start and stop location
# 
# 6. Seasonal pattern
# 
# 7. 3-12 miles is the usual distance travelled
# 
# 8. Most trips are for meeting purposes
# 
# 9. Usually we don't have round trips
# 
# 10. Average time is 23 minutes for trips
# 
# 11. Max cabs were booked for meal and entertainment in month of March.

# In[ ]:




