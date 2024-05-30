# Condition Monitoring of industrial equipment

![Screenshot 2024-05-29 114742](https://github.com/jeet-Abhi123/Road-Safety-Data-Analysis-Power-BI-/assets/143840497/e6201370-dcaf-442a-9549-b83dde3d0c19)

CMAPSS stands for Commercial Modular Aero-Propulsion System Simulation. It is a system developed by NASA to study engine degradation. It is coded in MATLAB and Simulink (a toolbox of MATLAB). The engine under study is a turbofan engine (a jet engine). A turbofan engine has many components. A few important components are: Fan, Low Pressure Compressor (LPC), High Pressure Compressor (HPC), Low Pressure Turbine (LPT), High Pressure Turbine (HPT), etc. During operation, degradation occurs in each of the components. If degradation level in any component exceeds a threshold, the engine is said to have failed. We don't want jet engines to fail mid-air. Therefore, jet engines are inspected before every take off. This is a form of periodic maintenance that is not cost effective. But given the critical nature of operation (considering human lives involved), this form of maintenance strategy is justified. Even then, we need a system that can given us early warning if something is going to fail. An early warning, in many cases, may help us prepare for the problem, if not prevent it altogether. A sufficiently early warning will enable us to prevent the disaster. But if an early warning is too conservative (i.e., too early), it will lead to unnecessary waste of money. So, aim of a predictive maintenance system is to predict the RUL as accurately as possible such that it is neither too early nor too late.

In the setup, we don't study one engine at a time. Instead, simultaneously several engines are run. If degradation threshold of any engine is exceeded, that engine is turned off. From the data we can find out how many engines are being run in a particular experimental setup. We will discuss that later. First, we should get the data.

After unzipping the dataset, we will get following files: train_FD001.txt, train_FD002.txt, train_FD003.txt, train_FD004.txt, test_FD001.txt, test_FD002.txt, test_FD003.txt, test_FD004.txt, RUL_FD001.txt, RUL_FD002.txt, RUL_FD003.txt, RUL_FD004.txt, readme.txt, and pdf of a paper.

## Model Building
We build the model by preprocessing the dataset by performing some operations to make it usable for classification and regression purpose.


- We used Random forest classification for the classifying the state of the engine as good, moderate and warning condition.
- We used 2D Convolution Neural network for predicting the remaining useful life of the engine.
We achieved quite good results and the RMSE value was decreased by iterating the process of development.

## Future Development
- Implementing the CNN, XGBoost  for classification tasks.
- Implementing LSTM for RUL (in research work this has been recommended a lot).
