import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

import 'package:basic_banking_app/Screens/landing_page.dart';

void main() {
  runApp(MaterialApp(
    themeMode: ThemeMode.dark,
    debugShowCheckedModeBanner: false,
    home: LandingPage(),
  ));
}
