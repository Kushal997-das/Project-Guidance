import streamlit as st
import pickle
import numpy as np
import os
# Load the RandomForest model
working_dir = os.path.dirname(os.path.abspath(__file__))
model = pickle.load(open(f'{working_dir}/RF_Crop.sav', 'rb'))

st.set_page_config(
    page_title="Crop Recommedner",
    layout="wide",
    page_icon="🍀",
    initial_sidebar_state="expanded",
)

# Custom CSS for styling
st.markdown(
    """
    <style>
    body {
        background: linear-gradient(to right, #ffffff, #e6ffe6);
    }
    .sidebar .sidebar-content {
        background: linear-gradient(to right, #ffffff, #e6ffe6);
    }
    .highlight {
        color: #FF4500;
        font-size: 24px;
        font-weight: bold;
    }
    </style>
    """, unsafe_allow_html=True
)

# Initialize session state
if 'page' not in st.session_state:
    st.session_state.page = "Overview"

# Sidebar
st.sidebar.title("Crop Recommender")
if st.sidebar.button("Overview"):
    st.session_state.page = "Overview"
if st.sidebar.button("Get Recommendation"):
    st.session_state.page = "Get Recommendation"

# Main content based on the selected page
if st.session_state.page == "Overview":
    st.title("Overview")
    st.subheader("Welcome to the Crop Recommendation App!")
    st.image("Images/image1.jpg",caption="Healthy Crops", use_column_width=True)
    
    st.write("""
        ### What This App Does
       This application assists farmers in selecting the optimal crop to cultivate, considering soil composition
       and environmental conditions. By providing information such as nitrogen, phosphorus, and
       potassium levels, as well as temperature, humidity, pH, and rainfall, users receive tailored
       recommendations for the most suitable crop out of a selection of 22 options.
    """)
    
    st.write("""
        ### How to Use the App
        1. Navigate to the "Crop Recommendation" section.
        2. Enter the values for the soil and environmental factors in the input fields.
        3. Click the "Predict" button to get the crop recommendation.
    """)
    
    st.write("""
        ### About the Model
        The recommendation is made using a Random Forest model trained on agricultural data.
        This model considers various factors to predict the best crop for your field.
        The model has been developed by analyzing many models like SVM, Random Forest,
        Decision Tree, Logistic Regression, Gaussian Naive Bayes.
        Random Forest has been selected based on the Cross Validation Accuracy & Test Accuracy
    """)
    st.image("Images/mod_comparison.png", use_column_width=True)
    
    st.write("""
        ### Benefits of Using Crop Recommendation
        - **Increased Yield**: By planting the most suitable crop, you can maximize your harvest.
        - **Cost Efficiency**: Avoid wasting resources on crops that are not suited to your soil and climate.
        - **Sustainable Farming**: Promote better land use and reduce environmental impact.
    """)

    st.write("""
        ### Contact Us
        If you have any questions or feedback about the project, feel free to reach out:
        - **Email**: kanchanrai2307@gmail.com
        - **Github**:https://github.com/kanchanrai7
    """)
elif st.session_state.page == "Get Recommendation":
    st.title("Crop Recommendation")
    st.write("Enter the details about your soil and environmental factors to get a crop recommendation.")
    st.write("Don't have values ? Worry not enter these values to see what recommendation you get!")
    st.write("[104,18, 30, 23.603016, 60.3, 6.7, 140.91]")
    st.write("[60,18, 30, 23.603016, 60.3, 8, 40.91] ")


    # Input fields
    N = st.number_input('Nitrogen (N)', min_value=0, max_value=500, value=0)
    P = st.number_input('Phosphorus (P)', min_value=0, max_value=500, value=0)
    K = st.number_input('Potassium (K)', min_value=0, max_value=500, value=0)
    temperature = st.number_input('Temperature (°C)', min_value=0.0, max_value=50.0, value=0.0)
    humidity = st.number_input('Humidity (%)', min_value=0.0, max_value=500.0, value=0.0)
    pH = st.number_input('pH', min_value=0.0, max_value=14.0, value=0.0)
    rainfall = st.number_input('Rainfall (mm)', min_value=0.0, max_value=500.0, value=0.0)

    # Collect input data into a list
    user_input = np.array([[N, P, K, temperature, humidity, pH, rainfall]])

    # Predict the crop
    if st.button('Predict'):
        if np.all(user_input == 0):
            st.write("Please enter valid values.")
        else:
            prediction = model.predict(user_input)
            crop = prediction[0]
            st.markdown(f"Hey, you should grow <span class='highlight'>{crop}</span> based on your soil & environmental factors on your field.", unsafe_allow_html=True)
