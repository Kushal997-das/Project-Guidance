import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:payment_gateway_integration/Screens/landing_page.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    themeMode: ThemeMode.dark,
    home: LandingPage(),
  ));
}
