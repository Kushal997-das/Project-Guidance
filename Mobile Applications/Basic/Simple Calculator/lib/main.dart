import 'package:flutter/material.dart';
import 'actual_work.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    theme: ThemeData.dark(),
    title: "Simple Calculator",
    home: MyCalculator(),
  ));
}

class MyCalculator extends StatefulWidget {
  State<StatefulWidget> createState() => Calculator();
}
