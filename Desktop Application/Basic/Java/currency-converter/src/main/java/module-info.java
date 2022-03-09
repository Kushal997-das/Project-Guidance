module com.app.currencyconverter {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.net.http;
    requires org.json;

    opens com.app.currencyconverter to javafx.fxml;
    exports com.app.currencyconverter;
    exports com.app.currencyconverter.controller;
    opens com.app.currencyconverter.controller to javafx.fxml;
    exports com.app.currencyconverter.api to javafx.fxml;
}