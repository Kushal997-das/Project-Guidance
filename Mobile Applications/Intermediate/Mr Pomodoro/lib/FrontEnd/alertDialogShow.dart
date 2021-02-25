import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:hello_promodoro/Backend/Authentication.dart';
import 'package:rflutter_alert/rflutter_alert.dart';
import 'package:hello_promodoro/FrontEnd/Main_Screen.dart';
import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:page_transition/page_transition.dart';
import 'package:hello_promodoro/FrontEnd/Log_in.dart';

void goingToTheMainPage(
    BuildContext context, String userName, Authenticate authenticate) {
  Navigator.pop(context);
  Navigator.pop(context);
  Navigator.push(context, MaterialPageRoute(builder: (context) {
    return Container(
      child: AnimatedSplashScreen(
        splash: Image.asset(
          'images/Intro.png',
        ),
        nextScreen: MainController(userName, authenticate),
        splashTransition: SplashTransition.rotationTransition,
        duration: 1000,
        animationDuration: Duration(milliseconds: 500),
        pageTransitionType: PageTransitionType.rightToLeftWithFade,
      ),
    );
  }));
}

void showAlertBox(BuildContext context, String titleIs, String msgType,
    [String descIS = "", String userName = "", Authenticate authenticate]) {
  AlertType msgTypeDetection() {
    if (msgType == "right")
      return AlertType.success;
    else if (msgType == "warning") return AlertType.warning;
    return AlertType.error;
  }

  TextStyle styleMaintainTitle() {
    if (msgType == "wrong")
      return TextStyle(
          fontSize: 20.0,
          fontFamily: 'Lora',
          fontWeight: FontWeight.w700,
          color: Colors.red);
    else if (msgType == "warning")
      return TextStyle(
          fontSize: 20.0,
          fontFamily: 'Lora',
          fontWeight: FontWeight.w700,
          color: Colors.yellowAccent);
    return TextStyle(
        fontSize: 20.0,
        fontFamily: 'Lora',
        fontWeight: FontWeight.w700,
        color: Colors.green);
  }

  TextStyle styleMaintainDesc() {
    if (msgType == "wrong" || msgType == "warning")
      return TextStyle(
          fontSize: 17.0,
          fontFamily: 'Lora',
          fontWeight: FontWeight.w700,
          color: Colors.red);
    return TextStyle(
        fontSize: 17.0,
        fontFamily: 'Lora',
        fontWeight: FontWeight.w700,
        color: Colors.green);
  }

  DialogButton suitableButton() {
    if (msgType == "right") {
      return DialogButton(
          color: Colors.brown,
          child: Text(
            "Proceed",
            style: TextStyle(
              fontSize: 25.0,
              fontFamily: 'Lora',
              fontWeight: FontWeight.w700,
              color: Colors.lightGreen,
            ),
          ),
          onPressed: () {
            if (titleIs == "😍 Log-in Successfully 😍")
              goingToTheMainPage(context, userName, authenticate);
            else {
              Navigator.pop(context);
              Navigator.pop(context);
              if (titleIs == "😍 Data Updated 😍") {
                Navigator.pop(context);
                Navigator.pop(context);
                Navigator.pop(context);
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => AccountManagerLogIn()));
              }
            }
          });
    }
    return DialogButton(
        color: Colors.indigo,
        child: Text(
          "Exit",
          style: TextStyle(
            fontSize: 25.0,
            fontFamily: 'Lora',
            fontWeight: FontWeight.w700,
            color: Colors.yellow,
          ),
        ),
        onPressed: () {
          if (msgType == "warning") Navigator.pop(context);
          Navigator.pop(context);
        });
  }

  Alert(
      context: context,
      title: titleIs,
      desc: descIS,
      type: msgTypeDetection(),
      style: AlertStyle(
        backgroundColor: Colors.black54,
        descStyle: styleMaintainDesc(),
        titleStyle: styleMaintainTitle(),
      ),
      closeIcon: Icon(
        Icons.close_rounded,
        color: Colors.lightGreen,
      ),
      closeFunction: () {
        Navigator.pop(context);
      },
      buttons: [
        suitableButton(),
      ]).show();
}
