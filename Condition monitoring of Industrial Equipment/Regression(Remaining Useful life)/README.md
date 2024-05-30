# Regression (RUL)
The preprocessed csv files for training and testing were created from the csv files which are present in 'Dataset before preprocessing' folder. All the formulation of creation of preprocessed files is given in EDA_Cmapps.ipyn.

This folder contains an implementation of a 2D Convolutional Neural Network (CNN) for predicting the Remaining Useful Life (RUL) of turbofan engines using the C-MAPSS dataset. The C-MAPSS dataset, which stands for 'Commercial Modular Aero-Propulsion System Simulation', provides realistic time-series data for large commercial turbofan engines.

Data preprocessing steps are performed in the notebook.
- Min max scalingg the sensor data
- Feature extraction and engineering

**Model Architecture**
The implemented 2D CNN model consists of the following layers:

- Convolutional layers with ReLU activation
- MaxPooling layers for downsampling
- Fully connected (Dense) layers for regression

Results : Results were evaluated on the basis of Root mean square error(RMSE) and plotting graphs of RUL on the y-axis and cycles on the x-axis

