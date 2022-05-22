package com.example.main;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.io.IOException;

public class HelloApplication extends Application {

    public static void main(String[] args) {
        System.out.println("Main");
        launch();
    }

    @Override
    public void init() throws Exception {
        System.out.println("Init");
        super.init();
    }

    @Override
    public void start(Stage stage) throws IOException {
        System.out.println("Start");
        FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("hello-view.fxml"));
        VBox rootNode = fxmlLoader.load();
        MenuBar menuBar = createMenu();
        rootNode.getChildren().add(0, menuBar);
        Scene scene = new Scene(rootNode);
        stage.setTitle("Temperature Convertor Tool");
        stage.setScene(scene);
        stage.show();
    }

    private MenuBar createMenu() {
        // File Menu
        Menu fileMenu = new Menu("File");
        MenuItem newMenuItem = new MenuItem("New");
        newMenuItem.setOnAction(event -> {
            System.out.println("New Menu Item Clicked");
        });
        SeparatorMenuItem separatorMenuItem = new SeparatorMenuItem();
        MenuItem quitMenuItem = new MenuItem("Quit");
        quitMenuItem.setOnAction(event -> {
            Platform.exit();
            System.exit(0);
        });
        fileMenu.getItems().addAll(newMenuItem, separatorMenuItem, quitMenuItem);

        // Help Menu
        Menu helpMenu = new Menu("Help");
        MenuItem aboutMenuItem = new MenuItem("About");
        aboutMenuItem.setOnAction(event -> {
            aboutApp();
        });
        helpMenu.getItems().addAll(aboutMenuItem);

        // MenuBar
        MenuBar menuBar = new MenuBar();
        menuBar.getMenus().addAll(fileMenu, helpMenu);

        return menuBar;
    }

    private void aboutApp() {
        Alert alertDialogue = new Alert(Alert.AlertType.INFORMATION);
        alertDialogue.setTitle("About The Developer");
        alertDialogue.setHeaderText("Bhushan Thombre");
        alertDialogue.setContentText("Hello There, Myself Bhushan and I am a programming geek.\n" +
                "Connect with me: \n" +
                "Twitter - https://twitter.com/bhushanat11\n" +
                "Github - https://github.com/Bhushan-Thombre\n" +
                "LinkedIn - \nhttps://www.linkedin.com/in/bhushan-thombre-209910207/");
        alertDialogue.show();
    }

    @Override
    public void stop() throws Exception {
        System.out.println("Stop");
        super.stop();
    }
}