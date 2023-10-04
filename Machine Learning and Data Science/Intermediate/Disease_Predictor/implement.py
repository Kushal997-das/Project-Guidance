# This section imports necessary libraries and loads pre-trained models and data dictionary from pickle files.
import pickle
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings("ignore")

with open("data_dict.pkl", "rb") as f:
    data_dict = pickle.load(f)

with open("final_svm_model.pkl", "rb") as f:
    final_svm_model = pickle.load(f)

with open("final_nb_model.pkl", "rb") as f:
    final_nb_model = pickle.load(f)

with open("final_rf_model.pkl", "rb") as f:
    final_rf_model = pickle.load(f)

# This function takes a string of symptoms as input and predicts the disease using pre-trained machine learning models.
def predictDisease(symptoms):
    # Split the input symptoms into a list.
    symptoms = symptoms.split(",")
    
    # Create input data for the models as a binary vector representation of symptoms.
    input_data = [0] * len(data_dict["symptom_index"])
    for symptom in symptoms:
        index = data_dict["symptom_index"][symptom]
        input_data[index] = 1
        
    # Reshape and convert the input data into a suitable format for model predictions.
    input_data = np.array(input_data).reshape(1, -1)
    
    # Generate individual predictions using different machine learning models.
    rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_data)[0]]
    nb_prediction = data_dict["predictions_classes"][final_nb_model.predict(input_data)[0]]
    svm_prediction = data_dict["predictions_classes"][final_svm_model.predict(input_data)[0]]
    
    # Make the final prediction by taking the mode of all individual predictions.
    predictions_df = pd.DataFrame([rf_prediction, nb_prediction, svm_prediction])
    final_prediction = predictions_df.mode(axis=0, dropna=False).iloc[0].values[0]
    
    # Store predictions in a dictionary and return it.
    predictions = {
        "rf_model_prediction": rf_prediction,
        "naive_bayes_prediction": nb_prediction,
        "svm_model_prediction": svm_prediction,
        "final_prediction": final_prediction
    }
    return predictions

# Example usage of the predictDisease function.
symptoms = "Acidity,Indigestion,Stiff Neck"
# Change these symptoms from Testing,Trainig.csv to check other diseases

predictions = predictDisease(symptoms)
print("\nrf prediction is", predictions['rf_model_prediction'])
print("nb prediction is", predictions['naive_bayes_prediction'])
print("svm prediction is", predictions['svm_model_prediction'])
print("\nfinal prediction is", predictions['final_prediction'],"\n")
