import 'dart:ui';
import 'dart:math';
import 'package:math_expressions/math_expressions.dart';
import 'package:flutter/material.dart';

class Calculator extends State<StatefulWidget> {
  var _store;

  @override
  void initState() {
    super.initState();
    _store = "";
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          leading: Icon(Icons.calculate_outlined),
          title: Text(
            "Simple Calculator",
            style: TextStyle(
              fontSize: 30.0,
              fontFamily: 'Lora',
              fontWeight: FontWeight.w300,
            ),
          ),
        ),
        body: ListView(
          children: [
            Container(
              padding: EdgeInsets.only(top: 150.0, bottom: 70.0, right: 5.0),
              child: Text(
                _store,
                style: TextStyle(fontSize: 30.0),
              ),
              alignment: Alignment(1, 1),
            ),
            Container(
              child: Row(
                children: [
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "+",
                        style: TextStyle(
                            fontSize: 30.0, color: Colors.yellow[900]),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '+';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "-",
                        style: TextStyle(
                            fontSize: 30.0, color: Colors.yellow[900]),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '-';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "X",
                        style: TextStyle(
                            fontSize: 30.0, color: Colors.yellow[900]),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '*';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "/",
                        style: TextStyle(
                            fontSize: 30.0, color: Colors.yellow[900]),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '/';
                        });
                      },
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 30.0),
              child: Row(
                children: [
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "1",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '1';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "2",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '2';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "3",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '3';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "C",
                        style:
                            TextStyle(fontSize: 30.0, color: Colors.redAccent),
                      ),
                      onPressed: () {
                        setState(() {
                          _store = " ";
                        });
                      },
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 30.0),
              child: Row(
                children: [
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "4",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '4';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "5",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '5';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "6",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '6';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        ".",
                        style: TextStyle(fontSize: 30.0, color: Colors.blue),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '.';
                        });
                      },
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 30.0),
              child: Row(
                children: [
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "7",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '7';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "8",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '8';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "9",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '9';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: IconButton(
                        color: Colors.black26,
                        icon: Image.asset('images/reciprocal.png'),
                        iconSize: 52,
                        onPressed: null,
                      ),
                      onPressed: () {
                        setState(() {
                          String evaluated = prediction();
                          if (evaluated == "error") {
                            _store = " ";
                            showErrorMessage(context);
                          } else {
                            double takeValue = 1 / double.parse(evaluated);
                            takeValue.toInt() == takeValue
                                ? _store = takeValue.toInt().toString()
                                : _store = takeValue.toString();
                          }
                        });
                      },
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 30.0),
              child: Row(
                children: [
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "0",
                        style: TextStyle(fontSize: 30.0, color: Colors.purple),
                      ),
                      onPressed: () {
                        setState(() {
                          _store += '0';
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: IconButton(
                        color: Colors.black26,
                        icon: Image.asset('images/square.png'),
                        iconSize: 52,
                        onPressed: null,
                      ),
                      onPressed: () {
                        setState(() {
                          String evaluated = prediction();
                          if (evaluated == "error") {
                            _store = " ";
                            showErrorMessage(context);
                          } else {
                            double takeValue = (double.parse(evaluated) *
                                    double.parse(evaluated))
                                .roundToDouble();
                            takeValue.toInt() == takeValue
                                ? _store = takeValue.toInt().toString()
                                : _store = takeValue.toString();
                          }
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: IconButton(
                        color: Colors.black26,
                        icon: Image.asset('images/sqroot.png'),
                        iconSize: 52,
                        onPressed: null,
                      ),
                      onPressed: () {
                        setState(() {
                          String evaluated = prediction();
                          if (evaluated == "error") {
                            _store = " ";
                            showErrorMessage(context);
                          } else {
                            double takeValue = sqrt(double.parse(evaluated));
                            takeValue.toInt() == takeValue
                                ? _store = takeValue.toInt().toString()
                                : _store = takeValue.toString();
                          }
                        });
                      },
                    ),
                  ),
                  Expanded(
                    child: FloatingActionButton(
                      backgroundColor: Colors.white,
                      elevation: 15.0,
                      child: Text(
                        "=",
                        style: TextStyle(fontSize: 30.0, color: Colors.red),
                      ),
                      onPressed: () {
                        setState(() {
                          String evaluated = prediction();
                          if (evaluated == "error") {
                            _store = " ";
                            showErrorMessage(context);
                          } else
                            _store = evaluated;
                        });
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String prediction() {
    try {
      Parser p = Parser();
      Expression exp = p.parse(_store); // Building Expression
      ContextModel cm = ContextModel();
      double eval =
          exp.evaluate(EvaluationType.REAL, cm); // Evaluating expression

      if (eval.toInt() == eval) return eval.toInt().toString();
      return eval.toString();
    } catch (e) {
      return "error";
    }
  }

  Widget showErrorMessage(BuildContext context) {
    AlertDialog alertDialog = AlertDialog(
      title: Text(
        "Expression Error",
        style: TextStyle(color: Colors.red),
      ),
      content: Text(
        "Expression not correct to evaluate",
        style: TextStyle(color: Colors.yellowAccent, letterSpacing: 1.0),
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
    );

    showDialog(
        context: context,
        builder: (BuildContext context) {
          return alertDialog;
        });
  }
}
