import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:countup/countup.dart';

class PomoDoroSumUp extends StatelessWidget {
  List _storeValueTake = List<int>();

  PomoDoroSumUp(this._storeValueTake);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.bottomCenter,
              end: Alignment.topCenter,
              colors: [Colors.pinkAccent, Colors.redAccent],
            ),
          ),
          child: ListView(
            children: [
              heading(context),
              upperText(context),
              pomoDoroData(context, "PomoDoro 1", this._storeValueTake[0]),
              pomoDoroData(context, "PomoDoro 2", this._storeValueTake[1]),
              pomoDoroData(context, "PomoDoro 3", this._storeValueTake[2]),
              pomoDoroData(context, "PomoDoro 4", this._storeValueTake[3]),
              SizedBox(
                height: 20.0,
              ),
              pomoDoroData(context, "Total PomoDoro", this._storeValueTake[4]),
              footerText(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget heading(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height / 12,
      alignment: Alignment.bottomCenter,
      child: Text(
        "PomoDoro Result",
        style: TextStyle(
          fontSize: 30.0,
          color: Colors.yellowAccent,
          fontFamily: 'Lora',
          fontStyle: FontStyle.italic,
        ),
      ),
    );
  }

  Widget upperText(BuildContext context) {
    return Container(
        margin: EdgeInsets.only(
          top: 20.0,
        ),
        height: MediaQuery.of(context).size.height / 10,
        child: Row(children: [
          Expanded(
            child: Container(
              alignment: Alignment.center,
              child: Text(
                "PomoDoro Name",
                style: TextStyle(
                  fontSize: 22.0,
                  fontFamily: 'Lora',
                  fontWeight: FontWeight.w700,
                  color: Colors.lightGreenAccent,
                ),
              ),
            ),
          ),
          Expanded(
            child: Container(
              alignment: Alignment.center,
              child: Text(
                "Frequency",
                style: TextStyle(
                  fontSize: 25.0,
                  fontFamily: 'Lora',
                  fontWeight: FontWeight.w700,
                  color: Colors.lightGreenAccent,
                ),
              ),
            ),
          )
        ]));
  }

  Widget pomoDoroData(
      BuildContext context, String pomoDoroName, int frequency) {
    return Container(
      height: MediaQuery.of(context).size.height / 10,
      alignment: Alignment.center,
      child: Row(
        children: [
          Expanded(
            child: Container(
              alignment: Alignment.center,
              child: Text(
                pomoDoroName,
                style: TextStyle(
                  fontSize: 20.0,
                  fontFamily: 'Lora',
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 1.0,
                ),
              ),
            ),
          ),
          Expanded(
            child: Container(
              alignment: Alignment.center,
              child: Countup(
                begin: 0.0,
                end: frequency.toDouble(),
                duration: Duration(seconds: 2),
                curve: Curves.easeInQuad,
                textAlign: TextAlign.justify,
                softWrap: true,
                style: TextStyle(
                  fontSize: 30.0,
                  fontFamily: 'Lora',
                  fontWeight: FontWeight.w700,
                  color: Colors.yellowAccent,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget footerText(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height * (1.5 / 8),
      alignment: Alignment.center,
      child: Text(
        "Hope You Enjoy It",
        style: TextStyle(
          fontSize: 30.0,
          fontFamily: 'Lora',
          fontWeight: FontWeight.w700,
          fontStyle: FontStyle.italic,
          color: Colors.lightGreenAccent,
          letterSpacing: 1.0,
        ),
      ),
    );
  }
}
