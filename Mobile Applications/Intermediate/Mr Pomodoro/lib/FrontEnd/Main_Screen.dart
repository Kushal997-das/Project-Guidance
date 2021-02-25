import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hello_promodoro/Backend/Authentication.dart';
import 'package:hello_promodoro/FrontEnd/pomodoro_clock.dart';
import 'package:hello_promodoro/FrontEnd/pointsAndLevelsShow.dart';
import 'package:hello_promodoro/FrontEnd/accountDetailsMake.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rflutter_alert/rflutter_alert.dart';
import 'package:url_launcher/url_launcher.dart';
import 'PomoDoroAllCounterShow.dart';

class MainController extends StatefulWidget {
  String userName;
  Authenticate authenticate;

  MainController(this.userName, this.authenticate);

  @override
  State<StatefulWidget> createState() {
    return Functionality(this.userName, this.authenticate);
  }
}

class Functionality extends State<MainController> {
  String _userName;
  int userPoints;
  Authenticate authenticate;

  Functionality(this._userName, this.authenticate);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.redAccent,
        actions: [
          GestureDetector(
            onTap: () {
              clearCache(context);
            },
            child: Container(
              margin: EdgeInsets.only(
                right: 15.0,
              ),
              child: Icon(
                Icons.cached_rounded,
                size: 25.0,
              ),
            ),
          ),
        ],
        title: Text(
          "Pomodoro List",
          textAlign: TextAlign.center,
          style: TextStyle(
            fontFamily: 'Lora',
            fontSize: 20.0,
          ),
        ),
      ),
      drawer: makeDrawer(),
      body: mainBody(context),
    );
  }

  Widget makeDrawer() {
    return Drawer(
        elevation: 20.0,
        child: ListView(
          children: <Widget>[
            heading(),
            sideMenu("Account", Icons.account_box),
            sideMenu("About", Icons.account_box_outlined),
            sideMenu("Exit", Icons.exit_to_app_rounded),
          ],
        ));
  }

  Widget heading() {
    return Container(
      color: Theme.of(context).primaryColor,
      width: double.infinity,
      height: 130.0,
      padding: EdgeInsets.only(top: 20.0),
      child: Row(
        children: [
          Expanded(
              child: Image.asset(
            'images/hi.gif',
            fit: BoxFit.fill,
            width: 100.0,
          )),
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(left: 12.0),
              child: Text(
                this._userName,
                style: TextStyle(
                  fontSize: 27.0,
                  fontFamily: 'Lora',
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget sideMenu(String titleName, IconData takeIcon) {
    String command;
    if (titleName == "Dashboard") {
      command = "DashBoard Pressed";
    } else if (titleName == "Account") {
      command = "Account Pressed";
    } else if (titleName == "Exit") {
      command = "Exit Pressed";
    } else {
      command = "About Pressed";
    }
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(20.0),
          bottomRight: Radius.circular(20.0),
        ),
      ),
      margin: EdgeInsets.only(bottom: 10.0),
      elevation: 14.0,
      shadowColor: Colors.blueAccent,
      child: ListTile(
        hoverColor: Colors.deepOrange,
        leading: Icon(
          takeIcon,
          color: Colors.green,
        ),
        title: Text(
          titleName,
          style:
              TextStyle(fontSize: 25.0, fontFamily: 'Lora', color: Colors.red),
        ),
        onTap: () async {
          if (titleName == "Account") {
            List takeInformation =
                await authenticate.fetchDataToPreview(this._userName);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) =>
                        AccountInformation(this._userName, takeInformation)));
          } else if (titleName == "About") {
            const url =
                'https://github.com/SamarpanCoder2002/Mr-Promodoro/blob/main/About/aboutThisApp.md';
            if (await canLaunch(url)) {
              await launch(
                url,
                forceSafariVC: true,
              );
            } else {
              clearCache(context);
            }
          } else {
            Navigator.pop(context);
            Navigator.pop(context);
          }
        },
      ),
    );
  }

  Widget mainBody(BuildContext context) {
    return ListView(
      children: [
        differentPromoDoro(1),
        differentPromoDoro(2),
        differentPromoDoro(3),
        differentPromoDoro(4),
        achievement(),
        normalDashboardMake(context),
      ],
    );
  }

  Widget differentPromoDoro([int num = 1]) {
    String timeManagement = "";
    double wTime, bTime;
    if (num == 1) {
      timeManagement = "15min: Working, 3min: Break";
      wTime = 15.0;
      bTime = 3.0;
    } else if (num == 2) {
      timeManagement = "25min: Working, 5min: Break";
      wTime = 25.0;
      bTime = 5.0;
    } else if (num == 3) {
      timeManagement = "45min: Working, 15min: Break";
      wTime = 45.0;
      bTime = 15.0;
    } else {
      timeManagement = "90min: Working, 30min: Break";
      wTime = 90.0;
      bTime = 30.0;
    }
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      color: Colors.indigoAccent,
      elevation: 20.0,
      margin: EdgeInsets.only(
        bottom: 10.0,
        left: 7.0,
        right: 7.0,
        top: 7.0,
      ),
      child: Container(
        alignment: Alignment.center,
        padding: EdgeInsets.only(
          top: 10.0,
          bottom: 10.0,
          left: 8.0,
          right: 8.0,
        ),
        child: ListTile(
          leading: Icon(
            Icons.work_outline_rounded,
            color: Colors.amber,
            size: 40.0,
          ),
          title: Text(
            "PomoDoro $num",
            style: TextStyle(
              fontSize: 23.0,
              fontFamily: 'Lora',
              fontWeight: FontWeight.w700,
              color: Colors.brown[800],
            ),
          ),
          subtitle: Text(
            timeManagement,
            style: TextStyle(
              fontSize: 18.0,
              fontFamily: 'Lora',
              color: Colors.yellow,
            ),
          ),
          onTap: () async {
            int _userPoints =
                await authenticate.getPointsFromDatabase(this._userName);
            int _userLevels =
                await authenticate.getLevelsFromDatabase(this._userName);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => PromoDoroClock(
                        wTime,
                        bTime,
                        _userPoints,
                        this._userName,
                        this.authenticate,
                        _userLevels,
                        num)));
          },
        ),
      ),
    );
  }

  Widget achievement() {
    return Row(
      children: <Widget>[
        achivementStore("point"),
        achivementStore("level"),
      ],
    );
  }

  Widget achivementStore([String using]) {
    Icon iconStore;
    String workingStore;
    double sizeFont;
    var paddingStore;
    if (using == "point") {
      iconStore = Icon(
        Icons.control_point_duplicate_outlined,
      );
      workingStore = "Points Earned";
      sizeFont = 20.0;
      paddingStore = EdgeInsets.only(
        top: 3.0,
        bottom: 3.0,
      );
    } else {
      iconStore = Icon(
        Icons.trending_up_outlined,
      );
      workingStore = "Levels Achieved";
      sizeFont = 16.0;
      paddingStore = EdgeInsets.only(
        top: 7.0,
        bottom: 7.0,
      );
    }
    return Expanded(
        child: Container(
      alignment: Alignment.bottomCenter,
      margin: EdgeInsets.only(
        top: 25.0,
        left: 10.0,
        right: 10.0,
      ),
      child: RaisedButton(
        padding: paddingStore,
        color: Colors.lightBlueAccent,
        elevation: 20.0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
          side: BorderSide(color: Colors.blueAccent, width: 2.0),
        ),
        child: Row(
          children: [
            Expanded(
              child: iconStore,
            ),
            Expanded(
                child: Text(
              workingStore,
              style: TextStyle(
                  fontSize: sizeFont,
                  fontFamily: 'Roboto',
                  fontWeight: FontWeight.w500),
            )),
          ],
        ),
        onPressed: () async {
          if (using == "point") {
            int pointsTake =
                await this.authenticate.getPointsFromDatabase(this._userName);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) =>
                        PointsOrValuesShowOnScreen(pointsTake)));
          } else {
            int levelsTake =
                await this.authenticate.getLevelsFromDatabase(this._userName);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) =>
                        PointsOrValuesShowOnScreen(levelsTake, "Levels")));
          }
        },
      ),
    ));
  }

  Widget normalDashboardMake(BuildContext context) {
    return Center(
      child: Container(
        alignment: Alignment.center,
        width: 180.0,
        margin: EdgeInsets.only(
          top: 40.0,
        ),
        child: RaisedButton(
          elevation: 20.0,
          padding: EdgeInsets.all(2.0),
          color: Colors.lightBlueAccent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
            side: BorderSide(
              width: 2.0,
              color: Colors.blue,
            ),
          ),
          child: ListTile(
            leading: Icon(
              Icons.countertops_rounded,
              size: 30.0,
            ),
            title: Text(
              "PomoDoro Counter",
              style: TextStyle(
                  fontSize: 15.0,
                  fontFamily: 'Lora',
                  fontWeight: FontWeight.w700),
            ),
          ),
          onPressed: () async {
            List pointsTake =
                await this.authenticate.getPomoDoroCounter(this._userName);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => PomoDoroSumUp(pointsTake)));
          },
        ),
      ),
    );
  }

  Future<void> clearCache(BuildContext context) async {
    final cacheDir = await getTemporaryDirectory();
    if (cacheDir.existsSync()) {
      cacheDir.deleteSync(recursive: true);
    }
    Alert(
        type: AlertType.success,
        context: context,
        title: "Cache Cleared",
        style: AlertStyle(
          alertBorder: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
        )).show();
  }
}
