import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:hello_promodoro/FrontEnd/welcomeScreen.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    title: "Mr. Pomodoro",
    home: Welcome(),
  ));
}
