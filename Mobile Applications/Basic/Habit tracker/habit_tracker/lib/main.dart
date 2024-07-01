import 'package:flutter/material.dart';
import 'package:habit_tracker/screens/landing_screen.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';


void main() async {
  
  //initialise hive
await Hive.initFlutter();

//open a box
await Hive.openBox("HABIT_DATABASE");
runApp(const MainApp());

}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LandingScreen(),
      theme: ThemeData(primarySwatch: Colors.purple),
    );
  }
}