import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

void showToast(String errorMsg, FToast errToast,
    {Color toastColor = Colors.green,
    int seconds = 2,
    ToastGravity toastGravity = ToastGravity.BOTTOM,
    double fontSize = 20.0,
    Color bgColor = Colors.black54}) {
  if (errorMsg == null) return;
  Widget toast = Container(
    padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 10.0),
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(15.0),
      color: bgColor,
    ),
    child: Text(
      errorMsg,
      textAlign: TextAlign.center,
      style: TextStyle(
        color: toastColor,
        fontSize: fontSize,
        fontFamily: 'Lora',
        letterSpacing: 1.0,
        fontWeight: FontWeight.w400,
      ),
    ),
  );

  errToast.showToast(
    child: toast,
    gravity: toastGravity,
    toastDuration: Duration(seconds: seconds),
  );
}
