import streamlit as st
from langchain.chains import ConversationalRetrievalChain
from langchain.document_loaders import CSVLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.llms import CTransformers
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.document_loaders.csv_loader import CSVLoader

# Set Streamlit page configuration
st.set_page_config(
    page_title="ApnaGhar 🏠 - Mumbai Property Insights",
    page_icon="",  # You can set an icon if needed
    layout="wide",
    initial_sidebar_state="expanded",
)

# Load data and set up language chain components
loader = CSVLoader(file_path='Mumbai1.csv')
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
text_chunks = text_splitter.split_documents(documents)

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2",
                                   model_kwargs={'device': "cpu"})

vector_store = FAISS.from_documents(text_chunks, embeddings)

llm = CTransformers(model="link llma model", model_type="llama",
                    config={'max_new_tokens': 128, 'temperature': 0.01})

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

chain = ConversationalRetrievalChain.from_llm(llm=llm, chain_type='stuff',
                                              retriever=vector_store.as_retriever(search_kwargs={"k": 2}),
                                              memory=memory)

st.sidebar.title("ApnaGhar 🏠 - Mumbai Property Insights")
st.sidebar.info("Welcome to ApnaGhar! Explore Mumbai's real estate and neighborhood information.")
github_link = "[GitHub]()"
st.sidebar.info("To contribute and Sponsor - " + github_link)

if 'query_stack' not in st.session_state:
    st.session_state['query_stack'] = []

st.sidebar.subheader("Property Queries:")
for i, past_query in enumerate(reversed(st.session_state['query_stack'])):
    st.sidebar.write(f"{i + 1}. {past_query}")

st.title("ApnaGhar - Mumbai Property Insights")

if 'history' not in st.session_state:
    st.session_state['history'] = []

if 'generated' not in st.session_state:
    st.session_state['generated'] = ["Hello! I'm ApnaGhar, here to help you with Mumbai property insights."]

if 'past' not in st.session_state:
    st.session_state['past'] = ["Hello!"]

reply_container = st.container()
container = st.container()

with container:
    with st.form(key='user_form', clear_on_submit=True):
        user_input = st.text_input("Your Query:", placeholder="Ask anything about Mumbai properties or neighborhoods", key='input_user')
        submit_button_user = st.form_submit_button(label='Send')

    try:
        if submit_button_user and user_input:
            output = chain({"question": user_input, "chat_history": st.session_state['history']})["answer"]
            st.session_state['past'].append(user_input)
            st.session_state['generated'].append(output)
            
            # Push user input to the stack
            st.session_state['query_stack'].append(user_input)
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")

if st.session_state['generated']:
    with reply_container:
        for i in range(len(st.session_state['generated'])):
            user_message = st.session_state["past"][i]
            generated_message = st.session_state["generated"][i]

            st.text(f"User: {user_message}")

            st.text(f"ApnaGhar: {generated_message}")
