import pickle
import streamlit as st
from sklearn.preprocessing import StandardScaler

model1 = pickle.load(open("deploy.pkl", "rb"))
def fun():
    scaler = StandardScaler()
    df = ['radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean', 'smoothness_mean', 'compactness_mean', 'concavity_mean', 'concave points_mean', 'symmetry_mean', 'fractal_dimension_mean', 'radius_se', 'texture_se', 'perimeter_se', 'area_se', 'smoothness_se', 'compactness_se', 'concavity_se', 'concave points_se', 'symmetry_se', 'fractal_dimension_se', 'radius_worst', 'texture_worst', 'perimeter_worst', 'area_worst', 'smoothness_worst', 'compactness_worst', 'concavity_worst', 'concave points_worst', 'symmetry_worst', 'fractal_dimension_worst']
    st.title("Cancer Prediction")
    user_input = {}
    for feature in df:
        user_input[feature] = st.number_input(f"Enter value for {feature}:")
    pred = st.button("Predict")
    if pred:
        prediction_data = [user_input[feature] for feature in df]
        user_data_scaled = scaler.transform(prediction_data)
        op = model1.predict([user_data_scaled])
        if op == 1:
            st.write("Malignant")
        else:
            st.write("Benign")
fun()