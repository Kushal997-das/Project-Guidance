import 'package:flutter/material.dart';
import 'main_screen.dart';

void main() {
  runApp(MyApp());
}

// ignore: must_be_immutable
class MyApp extends StatelessWidget {
  MyApp({Key? key}) : super(key: key);

  static Map<int, Color> color = {
    50: Colors.cyan.shade50,
    100: Colors.cyan.shade100,
    200: Colors.cyan.shade200,
    300: Colors.cyan.shade300,
    400: Colors.cyan.shade400,
    500: Colors.cyan.shade500,
    600: Colors.cyan.shade600,
    700: Colors.cyan.shade700,
    800: Colors.cyan.shade800,
    900: Colors.cyan.shade900,
  };
  MaterialColor primeColor = MaterialColor(0xFF263238, color);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: primeColor,
          scaffoldBackgroundColor: const Color(0xFF000000),
        ),
        home: const MainScreen());
  }
}
