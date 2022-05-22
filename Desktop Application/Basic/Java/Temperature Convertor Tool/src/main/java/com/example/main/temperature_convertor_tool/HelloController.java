package com.example.main.temperature_convertor_tool;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;

import java.net.URL;
import java.util.ResourceBundle;

public class HelloController implements Initializable {

    @FXML
    public Label welcomeLabel;
    @FXML
    public ChoiceBox<String> choiceBox;
    @FXML
    public TextField userInputField;
    @FXML
    public Button convertButton;

    private static final String C_TO_F_Text = "Celsius to Fahrenheit";
    private static final String F_TO_C_Text = "Fahrenheit to Celsius";

    public boolean isC_TO_F = true;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        choiceBox.getItems().add(C_TO_F_Text);
        choiceBox.getItems().add(F_TO_C_Text);
        choiceBox.setValue(C_TO_F_Text);
        choiceBox.getSelectionModel().selectedIndexProperty().addListener((observableValue, number, t1) -> {
            if (t1.equals(C_TO_F_Text)) {
                isC_TO_F = true;
            } else {
                isC_TO_F = false;
            }
        });

        convertButton.setOnAction(event -> {
            convert();
        });
    }

    private void convert() {
        String input = userInputField.getText();
        float enteredTemperature = 0.0f;
        try {
            enteredTemperature = Float.parseFloat(input);
        }catch (Exception ex) {
            warnUser();
            return;
        }

        float newTemperature = 0.0f;
        if (isC_TO_F) {
            newTemperature = (enteredTemperature * 9 / 5) + 32;
        }else {
            newTemperature = (enteredTemperature - 32) * 5 / 9;
        }
        display(newTemperature);
    }

    private void warnUser() {
        Alert errorAlert = new Alert(Alert.AlertType.ERROR);
        errorAlert.setTitle("Error Occurred");
        errorAlert.setHeaderText("Invalid Input");
        errorAlert.setContentText("Please Enter Valid Temperature");
        errorAlert.show();
    }

    private void display(Float newTemperature) {
        String unit;
        if (isC_TO_F) {
            unit = "F";
        }else {
            unit = "C";
        }
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("Result");
        alert.setHeaderText("Result");
        alert.setContentText("The new Temperature is: " + newTemperature + unit);
        alert.show();
    }
}