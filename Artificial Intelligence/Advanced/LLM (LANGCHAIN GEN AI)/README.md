                                    LLM (LANGCHAIN GEN AI)
                        
This pack contains a series of projects developed as part of the LangChain initiative, demonstrating various applications and use cases leveraging language models and generative AI. Each project is designed to showcase the capabilities of different technologies and platforms.                        
        
Requirements:
Python 3.8 or higher(python 3.10 for LLM5 and LLM6 files)
Streamlit
langchain library
OpenAI API key
Hugging Face API token
LLaMA 2 model file
Google's GenerativeAI API Key
Pillow (Python Imaging Library)


Projects Overview:

1. LLM1-Basics of LLM

    1.1. LLM1-Basics of LLM 
This project introduces the LangChain library and demonstrates how to use it to interact with OpenAI and Hugging Face models. The examples cover querying information, chaining models for sequential tasks, and using prompt templates.
     
      Pre-requisites:
      Set your OpenAI API key and Hugging Face API token as environment variables:
      OPEN_API_KEY='your_openai_api_key'
      HUGGINGFACEHUB_API_TOKEN='your_huggingface_api_token'

   1.2. LangChaiChatmodels with ChatOpenAI
Project LangChain 02 showcases the integration of ChatOpenAI for interactive conversations. It involves setting up ChatOpenAI, providing system and human messages, and obtaining AI-generated responses.
   
      Pre-requisites: 
      Set up your OpenAI API key as an environment variable:
      OPEN_API_KEY='your-api-key-here'     

2. LLM2-Querying PDF with AstraDB
This project demonstrates a question-answering demo using Astra DB and LangChain, powered by Vector Search. It involves setting up a Serverless Cassandra with Vector Search on Astra DB and querying PDF documents.
      
      Pre-requisites: 
      You need a Serverless Cassandra with Vector Search database on ASTRA DB to run this demo.You should get a DB Token with role Database Administrator 
      and copy your Database ID.You also need an OpenAI API Key.   

3. LLM5-Gemini Pro LLM Application
This Streamlit application serves as a Q&A interface, integrating with Google's GenerativeAI Gemini Pro model. It configures the environment, establishes a Streamlit interface, and facilitates communication with the Gemini Pro model through user inputs. Users can input questions, and the app displays responses from the AI model. It maintains a session-based chat history, showing an ongoing conversation between the user and the AI.

      Pre-requisites:     
      Set up your environment variables:
      Create a .env file in the project root.
      Add your Google GenerativeAI API key:
      GOOGLE_API_KEY=your_google_generativeai_api_key


4. LLM6-Invoice Extractor using Gemini Pro Vision
A Streamlit web application titled "MultiLanguage Invoice Extractor" leveraging Google's Generative AI Gemini Pro Vision model to analyze and extract data from uploaded invoice images. Users can upload invoice images, input prompts, and get AI-generated insights.
   
      Pre-requisites: 
      Set up your environment variables:
      Create a .env file in the project root.
      Add your Google GenerativeAI API key:
      GOOGLE_API_KEY=your_google_generativeai_api_key 
 
   
Note:
To run the LLM5 and LLM6 file (i.e. '---.py' python files),follow the following steps:
1. Create a conda environment with python version 3.10.
   conda create --name myvenv python=3.10 
2. Activate the conda environment.
   conda activate myvenv
3. Install all the dependencies.
   pip install -r requirements.txt
4. Run the file.
   streamlit run 'file_name.py' 
6. Copy and paste the displayed url in other tab outside the hub.            
    


