package com.game.connectfour;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;
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

    private HelloController controller;

    @Override
    public void start(Stage stage) throws IOException {
        System.out.println("Start");
        FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("game.fxml"));
        GridPane rootNode = fxmlLoader.load();
        Pane menuPane = (Pane)rootNode.getChildren().get(0);
        MenuBar menuBar = createMenu();
        menuBar.prefWidthProperty().bind(stage.widthProperty());
        menuPane.getChildren().add(menuBar);
        controller = fxmlLoader.getController();
        controller.createPlayground();
        Scene scene = new Scene(rootNode);
        stage.setTitle("Connect 4 Game");
        stage.setScene(scene);
        stage.show();
    }

    private MenuBar createMenu() {
        Menu fileMenu = new Menu("File");
        MenuItem newMenuItem = new MenuItem("New Game");
        newMenuItem.setOnAction(event -> {
            controller.resetGame();
        });
        MenuItem resetMenuItem = new MenuItem("Reset Game");
        resetMenuItem.setOnAction(event -> {
            controller.resetGame();
        });
        SeparatorMenuItem separatorMenuItem = new SeparatorMenuItem();
        MenuItem exitMenuItem = new MenuItem("Exit");
        exitMenuItem.setOnAction(event -> {
            exitGame();
        });
        fileMenu.getItems().addAll(newMenuItem, resetMenuItem, separatorMenuItem, exitMenuItem);

        Menu helpMenu = new Menu("Help");
        MenuItem aboutGame = new MenuItem("About Game");
        aboutGame.setOnAction(event -> {
            aboutConnect4();
        });
        SeparatorMenuItem separatorMenuItem1 = new SeparatorMenuItem();
        MenuItem aboutMe = new MenuItem("About Me");
        aboutMe.setOnAction(event -> {
            aboutMe();
        });
        helpMenu.getItems().addAll(aboutGame, separatorMenuItem1, aboutMe);

        MenuBar menuBar = new MenuBar();
        menuBar.getMenus().addAll(fileMenu, helpMenu);

        return menuBar;
    }

    private void aboutMe() {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("About The Developer");
        alert.setHeaderText("Bhushan Thombre");
        alert.setContentText("Hello There, Myself Bhushan and I am a programming geek.\n" +
                "Connect with me: \n" +
                "Twitter - https://twitter.com/bhushanat11\n" +
                "Github - https://github.com/Bhushan-Thombre\n" +
                "LinkedIn - \nhttps://www.linkedin.com/in/bhushan-thombre-209910207/");
        alert.show();
    }

    private void aboutConnect4() {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("About Connect 4 Game");
        alert.setHeaderText("How To Play?");
        alert.setContentText("Connect Four is a two-player connection game in which the \nplayers first choose a color " +
                "and then take turns dropping \ncolored discs from the top into a seven-column, six-row \nvertically suspended grid. " +
                "The pieces fall straight down, \noccupying the next available space within the column. " +
                "The \nobjective of the game is to be the first to form a horizontal, \nvertical, or diagonal line of four of one's own discs. " +
                "Connect \nFour is a solved game. The first player can always win by playin\ng the right moves.");
        alert.show();
    }

    private void exitGame() {
        Platform.exit();
        System.exit(0);
    }

    @Override
    public void stop() throws Exception {
        System.out.println("Stop");
        super.stop();
    }
}