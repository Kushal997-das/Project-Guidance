##LLM5-Gemini Pro LLM Application


from dotenv import load_dotenv
load_dotenv()

import streamlit as st
import os
import google.generativeai as genai

genai.configure(api_key = os.getenv("GOOGLE_API_KEY"))

## function to load Gemini Pro Model and get response
model=genai.GenerativeModel("gemini-pro")
chat= model.start_chat(history=[])

def get_gemini_response(question):
    response= chat.send_message(question,stream=True)
    return response

##initialize our streamlit app

st.set_page_config(page_title="Q&A Demo")
st.header("Gemini LLM Application")

## initialize session state for chat history if it doesn't exist
if 'chat_history' not in st.session_state:
    st.session_state['chat_history']=[]


input=st.text_input("Input:",key="input")
submit=st.button("Ask the question")

if submit and input:
    response= get_gemini_response(input)
    ## Add user query and response to session chat hostory
    st.session_state['chat_history'].append(("You",input))
    st.subheader("The Response is")
    for chunk in response:
        st.write(chunk.text)
        st.session_state['chat_history'].append(("Bot",chunk.text))
st.subheader("The chat history is ")

for role,text in st.session_state['chat_history']:
    st.write(f"{role}:{text}")



                

                