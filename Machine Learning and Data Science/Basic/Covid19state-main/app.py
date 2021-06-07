

# In[1]:


import streamlit as st
import pandas as pd
import numpy as np
import datetime as dt
from datetime import datetime,date,time
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import RandomForestRegressor



# In[2]:

st.title('Suyash App')
if st.checkbox("Show/Hide"):
    st.text("Coding With Mafia") 
    
st.write("Covid-19 Cases Prediction")
predictdate= st.date_input('Input Date')
predictdate=pd.to_datetime(predictdate)
predictdate=predictdate.toordinal()


# In[3]:


df=pd.read_csv('state_wise_daily.csv')


# In[4]:


df.info()


# In[5]:


df.head()


# In[6]:


df.describe()


# In[ ]:





# In[7]:


df['Confirmed']=df['TT']


# In[ ]:





# In[8]:


df.sum(axis=0)


# In[9]:


df.Confirmed.mean()


# In[10]:


df=df[df.Status=='Confirmed']


# In[11]:


df=df.drop(columns='Status', axis=1)


# In[12]:


columns=['Date','Date_YMD', 'Confirmed']


# In[13]:


df=df[columns]


# In[14]:


df.head()


# In[15]:


df.groupby('Date_YMD').mean()


# In[16]:



df['Date']=pd.to_datetime(df['Date'])
df['Date']=df['Date'].map(dt.datetime.toordinal)


# In[17]:


x=df['Date']
y=df['Confirmed']


# In[18]:


xtrain,xtest,ytrain,ytest=train_test_split(x,y,test_size=0.2, random_state=0)


# In[19]:


model=RandomForestRegressor()


# In[20]:


model.fit(np.array(xtrain).reshape(-1,1), ytrain.values.ravel())


# 

# In[21]:


df.tail()


# In[22]:


ytrain.head()


# In[23]:


prediction=model.predict(np.array(xtest).reshape(-1,1))


# In[25]:


result=model.predict(np.array([[737932]]))


# In[31]:


from sklearn.metrics import mean_squared_error
import math
rmse=mean_squared_error(ytest,prediction)


# In[29]:


score=model.score(np.array(x).reshape(-1,1), np.array(y).reshape(-1,1))*100


# In[32]:



st.write("Predicted cases")
result= model.predict(np.array([[predictdate]]))
r=result[0].astype(int)
r


# In[33]:


df.plot.scatter(x='Date',y='Confirmed')


# In[31]:


st.line_chart(df['Confirmed'])


# In[ ]:


st.write("Made by Suyash Singh using Random Forest Regression")

