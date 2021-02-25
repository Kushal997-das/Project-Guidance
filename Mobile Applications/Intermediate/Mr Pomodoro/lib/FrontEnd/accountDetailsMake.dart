import 'package:countup/countup.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hello_promodoro/Backend/Authentication.dart';
import 'package:hello_promodoro/FrontEnd/DetailsEdit.dart';
import 'package:hello_promodoro/FrontEnd/alertDialogShow.dart';

import 'Log_in.dart';

class AccountInformation extends StatelessWidget {
  List _takeInformation;
  String _userName;

  AccountInformation(this._userName, this._takeInformation);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: GestureDetector(
          child: Icon(
            Icons.keyboard_backspace_outlined,
          ),
          onTap: () {
            Navigator.pop(context);
          },
        ),
        title: Text(
          "Account Details",
          style: TextStyle(
            fontSize: 23.0,
            fontFamily: 'Lora',
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
      body: makeAllChild(context),
    );
  }

  Widget makeAllChild(BuildContext context) {
    List take;
    //fetchInformation();
    return SafeArea(
        child: Container(
            decoration: BoxDecoration(
                gradient: LinearGradient(
              begin: Alignment.bottomCenter,
              end: Alignment.topCenter,
              colors: [
                Colors.pinkAccent,
                Colors.blueAccent,
                Colors.purpleAccent,
                Colors.redAccent
              ],
            )),
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            child: ListView(children: <Widget>[
              heading(context),
              propertyReturn(
                  context, "User Name", this._takeInformation[0], 20.0, 20.0),
              propertyReturn(
                  context, "Password", this._takeInformation[1], 20.0, 25.0),
              propertyReturn(context, "Points Earned",
                  this._takeInformation[2].toString(), 20.0, 25.0),
              propertyReturn(context, "Levels Achieved",
                  this._takeInformation[3].toString(), 20.0, 25.0),
              Row(
                children: [
                  Expanded(
                    child: editButton(context, "Edit Details"),
                  ),
                  Expanded(
                    child: editButton(context, "Exit"),
                  ),
                ],
              ),
              footerText(context),
            ])));
  }

  Widget heading(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
        top: 30.0,
        bottom: 10.0,
      ),
      //color: Colors.blue,
      alignment: Alignment.center,
      child: Text(
        "Your Details Here",
        style: TextStyle(
            fontSize: 30.0,
            fontFamily: 'Lora',
            fontWeight: FontWeight.w700,
            color: Colors.yellow),
      ),
    );
  }

  Widget propertyReturn(
      BuildContext context, String leftString, String rightString,
      [double firstPortion = 18.0,
      double secondPortion = 18.0,
      Color firstPortionColor = Colors.white,
      Color secondPortionColor = Colors.lightGreenAccent]) {
    int _ind;
    try {
      int.parse(rightString);
      _ind = 0;
    } catch (e) {
      _ind = 1;
    }

    return Container(
      //color: Colors.brown,
      alignment: Alignment.bottomCenter,
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height / 10,
      child: Row(
        children: [
          Expanded(
            child: Container(
              alignment: Alignment.center,
              child: Text(
                leftString,
                style: TextStyle(
                  fontSize: firstPortion,
                  fontFamily: 'Lora',
                  fontWeight: FontWeight.w700,
                  color: firstPortionColor,
                ),
              ),
            ),
          ),
          Expanded(
            child: Container(
              alignment: Alignment.center,
              child:
                  preView(_ind, rightString, secondPortionColor, secondPortion),
            ),
          ),
        ],
      ),
    );
  }

  dynamic preView(int ind, String rightString, Color secondPortionColor,
      double secondFontSize) {
    if (ind == 1) {
      return Text(
        rightString,
        style: TextStyle(
          fontSize: secondFontSize,
          fontFamily: 'Lora',
          fontWeight: FontWeight.w700,
          color: secondPortionColor,
        ),
      );
    } else {
      int _duration;
      if (int.parse(rightString) <= 100)
        _duration = 2;
      else if (int.parse(rightString) <= 1000)
        _duration = 4;
      else if (int.parse(rightString) <= 5000)
        _duration = 5;
      else
        _duration = 7;
      return Countup(
        begin: 0.0,
        end: double.parse(rightString),
        duration: Duration(seconds: _duration),
        curve: Curves.easeInQuad,
        textAlign: TextAlign.justify,
        softWrap: true,
        style: TextStyle(
          fontSize: secondFontSize,
          fontFamily: 'Lora',
          fontWeight: FontWeight.w700,
          color: secondPortionColor,
        ),
      );
    }
  }

  Widget editButton(BuildContext context, String buttonText) {
    //Color take;
    // if(buttonText == "Edit Details")
    //   take = Colors.brown;
    // else
    //   take = Colors.green;
    return Container(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height / 10,
      alignment: Alignment.bottomCenter,
      //color: take,
      child: RaisedButton(
        padding: EdgeInsets.only(
          left: 15.0,
          right: 15.0,
          top: 8.0,
          bottom: 8.0,
        ),
        color: Colors.blueAccent,
        elevation: 20.0,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
            side: BorderSide(
              width: 1.0,
            )),
        child: Text(
          buttonText,
          style: TextStyle(
            fontSize: 20.0,
            fontFamily: 'Lora',
            color: Colors.white,
          ),
        ),
        onPressed: () {
          if (buttonText == "Exit")
            Navigator.pop(context);
          else {
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => EditDetails(this._userName)));
          }
        },
      ),
    );
  }

  Widget footerText(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(
        top: 50.0,
      ),
      //color: Colors.brown,
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height / 8,
      alignment: Alignment.center,
      child: Text(
        "Hope You Enjoy It",
        style: TextStyle(
          fontSize: 30.0,
          fontFamily: 'Lora',
          fontWeight: FontWeight.w700,
          fontStyle: FontStyle.italic,
          color: Colors.yellowAccent,
          letterSpacing: 1.0,
        ),
      ),
    );
  }
}
