import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

void showErrorMessage(BuildContext context) {
  showDialog(
    context: context,
    builder: (_) => AlertDialog(
      backgroundColor: const Color.fromRGBO(34, 48, 60, 0.8),
      elevation: 5.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(40.0),
      ),
      title: Center(
        child: Text(
          'Log-in Error',
          style: TextStyle(color: Colors.red, fontSize: 20.0),
        ),
      ),
      content: Text(
        'Connected Mail Present with other Credentials',
        textAlign: TextAlign.center,
        style: TextStyle(color: Colors.amber, fontSize: 18.0),
      ),
    ),
  );
}