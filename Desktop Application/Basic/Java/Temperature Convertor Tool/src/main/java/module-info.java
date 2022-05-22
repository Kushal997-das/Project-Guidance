module com.example.main.temperature_convertor_tool {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.main.temperature_convertor_tool to javafx.fxml;
    exports com.example.main.temperature_convertor_tool;
}