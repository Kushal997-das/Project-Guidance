module com.game.connectfour.connect4 {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.game.connectfour to javafx.fxml;
    exports com.game.connectfour;
}