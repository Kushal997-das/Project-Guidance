package com.app.currencyconverter.controller;

import com.app.currencyconverter.api.CurrencyApi;
import javafx.fxml.FXML;
import javafx.scene.control.*;

import java.io.IOException;
import java.util.TreeMap;

/*
 * This project uses the well known Model-View-Controller(MVC) pattern
 *
 * This is the controller class for the main application window.
 * All API handling and event delegations are done from withing this class
 *
 */
public class CurrencyConvertedController {

    @FXML private ComboBox<String> comboBoxCurrency1;
    @FXML private ComboBox<String> comboBoxCurrency2;

    @FXML private TextField txtCurrency1;
    @FXML private TextField txtCurrency2;

    @FXML private Label lblCurrency1;
    @FXML private Label lblCurrency2;

    @FXML private Label lblExcCurrency1;
    @FXML private Label lblExcCurrency2;
    @FXML private Label lblExchangeAmount;
    @FXML private Label lblStaticAmount;
    @FXML private Label lblEqualsSign;

    // Stores all the country names along with their currency codes
    private static TreeMap<String, String> list = null;

    // Stores the country selected in the 'From' dropdown
    private static String currency1 = null;
    // Stores the country selected in the 'To' dropdown
    private static String currency2 = null;

    // Stores the amount in the 'From' text input
    private static Double rate1 = null;
    // Stores the amount in the 'To' text input
    private static Double rate2 = null;

    // Upon success(see below), the exchange rate for the selected
    // 'From' country to the 'To' country is stored in here
    private static Double exchangeRate = null;

    // The exchange rates display is disabled by default. Once the appropriate
    // data is fetched, the part is shown using this method
    private void showExchangeCurrencyStats(){
        lblStaticAmount.setVisible(true);
        lblExcCurrency1.setVisible(true);
        lblExcCurrency2.setVisible(true);
        lblExchangeAmount.setVisible(true);
        lblEqualsSign.setVisible(true);
    }

    // Hides the exchange rates display
    private void hideExchangeCurrencyStats(){
        lblStaticAmount.setVisible(false);
        lblExcCurrency1.setVisible(false);
        lblExcCurrency2.setVisible(false);
        lblExchangeAmount.setVisible(false);
        lblEqualsSign.setVisible(false);
    }

    // For a given input from the drop-down(combo-box) list, this function returns the country currency code
    private String getCountryCode(String selectedItem){
        return selectedItem.substring(selectedItem.indexOf("(")+1, selectedItem.length()-1);
    }

    // Everytime a currency selection is changed in the drop-down list, this function gets called via the event handlers
    // This function checks if both the 'From' and 'To' fields have a currency assigned, then it calls the API for
    // exchange rates and sets the exchange rate for that from-to currency combo
    private void onSelectedCurrencyChanged(){
        if (currency1 != null && currency2 != null){
            try {
                exchangeRate = CurrencyApi.getExchangeData(currency1, currency2);
                lblExchangeAmount.setText(String.format("%5.2f", exchangeRate));
                showExchangeCurrencyStats();
            } catch (IOException e) {
                new Alert(Alert.AlertType.ERROR, e.getMessage(), ButtonType.OK).show();
            }
        }
    }

    // Everytime the amount in the 'From' input is changed, the amount in the other currency is calculated
    // and displayed in the 'To' input field.
    private void onBaseCurrencyAmountChanged(){
        rate2 = rate1*exchangeRate;
        txtCurrency2.setText(String.format("%5.2f", rate2));
    }

    // Everytime the amount in the 'To' input is changed, the amount in the other currency is calculated
    // and displayed in the 'From' input field.
    private void onDesiredCurrencyAmountChanged(){
        rate1 = rate2/exchangeRate;
        txtCurrency1.setText(String.format("%5.2f", rate1));
    }

    @FXML
    public void initialize(){
        try{
            hideExchangeCurrencyStats();

            // Fetching and setting the combo box and the global variable
            list = (TreeMap<String, String>) CurrencyApi.getSymbolNames();
            list.keySet().forEach(key -> {
                comboBoxCurrency1.getItems().add(String.format("%s (%s)", list.get(key), key));
                comboBoxCurrency2.getItems().add(String.format("%s (%s)", list.get(key), key));
            });

            // Adding listeners to the input fields so that if anything except a '.' or digit is entered,
            // it replaces them with empty character
            txtCurrency1.textProperty().addListener(((observableValue, oldValue, newValue) -> {
                if (!newValue.matches("\\d*")) {
                    txtCurrency1.setText(newValue.replaceAll("[^\\d|^.]", ""));
                }
            }));
            txtCurrency2.textProperty().addListener(((observableValue, oldValue, newValue) -> {
                if (!newValue.matches("\\d*")) {
                    txtCurrency2.setText(newValue.replaceAll("[^\\d|^.]", ""));
                }
            }));

        }catch (IOException e){
            new Alert(Alert.AlertType.ERROR, e.getMessage(), ButtonType.OK).show();
        }
    }

    // Event handler for `From` combo Box
    @FXML
    public void onCurrency1Clicked(){
        currency1 = getCountryCode(comboBoxCurrency1.getSelectionModel().getSelectedItem());
        lblCurrency1.setText(currency1);
        lblExcCurrency1.setText(currency1);
        onSelectedCurrencyChanged();
    }

    // Event handler for `To` combo Box
    @FXML
    public void onCurrency2Clicked(){
        currency2 = getCountryCode(comboBoxCurrency2.getSelectionModel().getSelectedItem());
        lblCurrency2.setText(currency2);
        lblExcCurrency2.setText(currency2);
        onSelectedCurrencyChanged();
    }

    // Event handler for `From` input text
    @FXML
    public void onCurrency1TextChanged() {
        try{
            rate1 = Double.valueOf(txtCurrency1.getText());
            onBaseCurrencyAmountChanged();
        }catch (NullPointerException | NumberFormatException ignored){}
    }

    // Event handler for `To` input text
    @FXML
    public void onCurrency2TextChanged() {
        try{
            rate2 = Double.valueOf(txtCurrency2.getText());
            onDesiredCurrencyAmountChanged();
        }catch (NullPointerException | NumberFormatException ignored){}
    }

}
