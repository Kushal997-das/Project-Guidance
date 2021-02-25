import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:circular_countdown_timer/circular_countdown_timer.dart';
import 'package:hello_promodoro/FrontEnd/alertDialogShow.dart';
import 'package:rflutter_alert/rflutter_alert.dart';
import 'package:hello_promodoro/Backend/Authentication.dart';
import 'package:wakelock/wakelock.dart';

class PromoDoroClock extends StatefulWidget {
  double wTime, bTime;
  int userPoints, userLevels, userPromoDoroCounter;
  String userName;
  Authenticate authenticate;

  PromoDoroClock(this.wTime, this.bTime, this.userPoints, this.userName,
      this.authenticate, this.userLevels, this.userPromoDoroCounter);

  @override
  State<StatefulWidget> createState() {
    return PromoDoro(
        this.wTime.toInt(),
        this.bTime.toInt(),
        this.userPoints,
        this.userName,
        this.authenticate,
        this.userLevels,
        this.userPromoDoroCounter);
  }
}

class PromoDoro extends State<PromoDoroClock> {
  int wTime, bTime, _userPoints, _userLevels, _userPromoDoroCounter;
  double percentCompleteness = 0.0;
  bool _startTimerEnabled = true;
  String timerCounter = "Sleep Mode", _userName;
  Authenticate _authenticate;

  CountDownController _controller = CountDownController();

  PromoDoro(this.wTime, this.bTime, this._userPoints, this._userName,
      this._authenticate, this._userLevels, this._userPromoDoroCounter);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomPadding: false,
        body: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          color: Colors.blueAccent,
          alignment: Alignment.center,
          child: Column(
            children: [
              Container(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height * (1 / 8),
                alignment: Alignment.center,
                padding: EdgeInsets.only(
                  top: 20.0,
                ),
                child: Text(
                  "PromoDoro Counter",
                  style: TextStyle(
                    fontSize: 30.0,
                    color: Colors.white,
                    fontFamily: 'Lora',
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              circularProgress(context),
              instructionControl(context),
            ],
          ),
        ));
  }

  Widget circularProgress(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height * (3.7 / 8),
      margin: EdgeInsets.only(
        top: 10.0,
        bottom: 10.0,
      ),
      child: CircularCountDownTimer(
        duration: this.wTime * 60,
        initialDuration: 0,
        controller: _controller,
        width: MediaQuery.of(context).size.width - 60,
        height: MediaQuery.of(context).size.height,
        ringColor: Colors.white,
        ringGradient: null,
        fillColor: Colors.orange,
        fillGradient: LinearGradient(
          begin: Alignment.centerRight,
          end: Alignment.centerLeft,
          colors: [
            Colors.orange,
            Colors.yellowAccent,
            Colors.red,
            Colors.lightGreenAccent,
          ],
        ),
        backgroundGradient: null,
        strokeWidth: 25.0,
        strokeCap: StrokeCap.butt,
        textStyle: TextStyle(
            fontSize: 45.0, color: Colors.white, fontWeight: FontWeight.bold),
        textFormat: CountdownTextFormat.HH_MM_SS,
        autoStart: false,
        onStart: () {
          setState(() {
            Wakelock.enable();
          });
        },
        onComplete: () {
          int pointsEarned = 0;
          setState(() {
            Wakelock.disable();
            if (this.wTime == 15) {
              this._userPoints += 5;
              pointsEarned = 5;
            } else if (this.wTime == 25) {
              this._userPoints += 10;
              pointsEarned = 10;
            } else if (this.wTime == 45) {
              this._userPoints += 15;
              pointsEarned = 15;
            } else {
              this._userPoints += 20;
              pointsEarned = 20;
            }
            this._authenticate.updatePoints(this._userName, this._userPoints);
            int permission = 0;
            if (this._userPoints >= 10 && this._userPoints < 30) {
              this._userLevels = 1;
              permission = 1;
            } else if (this._userPoints >= 30 && this._userPoints < 100) {
              this._userLevels = 2;
              permission = 1;
            } else if (this._userPoints >= 100 && this._userPoints < 500) {
              this._userLevels = 3;
              permission = 1;
            } else if (this._userPoints >= 500 && this._userPoints < 1000) {
              this._userLevels = 4;
              permission = 1;
            } else if (this._userPoints >= 1000 && this._userPoints < 2000) {
              this._userLevels = 5;
              permission = 1;
            } else if (this._userPoints >= 2000 && this._userPoints < 4000) {
              this._userLevels = 6;
              permission = 1;
            } else if (this._userPoints >= 4000 && this._userPoints < 6000) {
              this._userLevels = 7;
              permission = 1;
            } else if (this._userPoints >= 6000 && this._userPoints < 8000) {
              this._userLevels = 8;
              permission = 1;
            } else if (this._userPoints >= 8000 && this._userPoints < 10000) {
              this._userLevels = 9;
              permission = 1;
            } else if (this._userPoints >= 10000) {
              this._userLevels = 10;
              permission = 1;
            }
            if (permission == 1)
              this._authenticate.updateLevels(this._userName, this._userLevels);
            this._authenticate.updatePromoDoroCounter(
                this._userName, this._userPromoDoroCounter, this._userPoints);
          });
          Alert(
              context: this.context,
              title: "Congrats! You Completed This PromoDoro 😍",
              desc:
                  "${this.wTime} minute Working Time Successfully Completed\n\nYou have Earned $pointsEarned Points 😍\n\nNow Take A Break for ${this.bTime} minutes and \ntry other PromoDoro 👍",
              type: AlertType.success,
              closeIcon: Icon(Icons.close_rounded),
              closeFunction: () {
                Navigator.pop(context);
                Navigator.pop(context);
              },
              buttons: [
                DialogButton(
                    color: Colors.blueAccent,
                    child: Text(
                      "Bye",
                      style: TextStyle(
                          fontSize: 20.0,
                          fontFamily: 'Lora',
                          fontWeight: FontWeight.w700,
                          color: Colors.white),
                    ),
                    onPressed: () {
                      Navigator.pop(context);
                      Navigator.pop(context);
                    }),
              ]).show();
        },
      ),
    );
  }

  Widget instructionControl(BuildContext context) {
    return Expanded(
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height * (4 / 8),
        alignment: Alignment.topCenter,
        margin: EdgeInsets.only(top: 15.0),
        padding: EdgeInsets.only(
          top: MediaQuery.of(context).size.height * (4 / 8) * (1 / 8),
        ),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topRight: Radius.circular(40.0),
            topLeft: Radius.circular(40.0),
          ),
        ),
        child: Column(
          children: [
            Row(
              children: [
                denoting(context, "Working Time", this.wTime, 1),
                denoting(context, "Break Time", this.bTime, 0),
              ],
            ),
            Row(
              children: [
                Expanded(
                  child: instructionalButton(context, 1),
                ),
                Expanded(
                  child: instructionalButton(context, 0),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget denoting(BuildContext context, String primaryFont, int timeLimit,
      int firstPortion) {
    double moderateFontSize = 25.0, leftPadding = 0.0, leftPadding2 = 0.0;
    if (firstPortion == 1) {
      moderateFontSize = 23.0;
      leftPadding = MediaQuery.of(context).size.width / 30;
      if (primaryFont == "Working Time") leftPadding2 = 20.0;
    }
    return Expanded(
      child: Column(
        children: [
          Container(
            alignment: Alignment.topCenter,
            height: MediaQuery.of(context).size.height * (1 / 20),
            padding: EdgeInsets.only(
              left: leftPadding,
            ),
            child: Text(
              primaryFont,
              style: TextStyle(
                fontSize: moderateFontSize,
                fontFamily: 'Lora',
              ),
            ),
          ),
          Container(
            alignment: Alignment.topCenter,
            height: MediaQuery.of(context).size.height * (1 / 15),
            padding: EdgeInsets.only(left: leftPadding2),
            child: Text(
              "$timeLimit min",
              style: TextStyle(fontSize: 40.0, fontFamily: 'Lora'),
            ),
          ),
        ],
      ),
    );
  }

  Widget instructionalButton(BuildContext context, int functionality) {
    String instruction = "Stop";
    double moderateFontSize = 23.0;
    if (functionality == 1) {
      instruction = "Start Timer";
      return timerConfiguration(context, instruction, moderateFontSize);
    } else
      return stopConfig(context, instruction, moderateFontSize);
  }

  Widget timerConfiguration(
      BuildContext context, String instruction, double moderateFontSize) {
    return Container(
        margin: EdgeInsets.only(
          left: 20.0,
        ),
        alignment: Alignment.center,
        height: MediaQuery.of(context).size.height * (1 / 6),
        child: RaisedButton(
          elevation: 15.0,
          padding: EdgeInsets.all(10.0),
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20.0),
              side: BorderSide(
                width: 1.0,
              )),
          color: Colors.blue,
          child: Text(
            instruction,
            style: TextStyle(
              fontSize: moderateFontSize,
              fontFamily: 'Lora',
              color: Colors.white,
            ),
          ),
          onPressed: _startTimerEnabled == true ? _startManagement : null,
        ));
  }

  Widget stopConfig(
      BuildContext context, String instruction, double moderateFontSize) {
    return Container(
      alignment: Alignment.center,
      height: MediaQuery.of(context).size.height * (1 / 6),
      child: RaisedButton(
        elevation: 15.0,
        padding: EdgeInsets.all(10.0),
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
            side: BorderSide(
              width: 1.0,
            )),
        color: Colors.blue,
        child: Text(
          instruction,
          style: TextStyle(
            fontSize: moderateFontSize,
            fontFamily: 'Lora',
            color: Colors.white,
          ),
        ),
        onPressed: () => _stopManagement(context),
      ),
    );
  }

  void _startManagement() {
    setState(() {
      _startTimerEnabled = false;
    });
    _controller.start();
  }

  void _stopManagement(BuildContext context) {
    Wakelock.disable();
    if (_controller.getTime() != "00:00:00") {
      _controller.pause();
      showAlertBox(context, "You Not Completed This PromoDoro 😰", "warning",
          "You Not Gained Any Points From it!!!\nBetter Luck Next Time 😋");
    } else
      showAlertBox(context, "PromoDoro Counter Not Started 😰", "warning",
          "After Starting PromoDoro Counter \n You Can Stop It 😰");
  }
}
