import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:graphplotter/home2.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
  
}

    TextEditingController x = TextEditingController();
    TextEditingController y = TextEditingController();

class _HomeState extends State<Home> {

  List<Data> e1 = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          elevation: 0.0,
          title: const Text('Graph Plotter',style: TextStyle(color: Colors.black),),
          centerTitle: true,
          backgroundColor: const Color.fromARGB(255, 3, 33, 202),
        ),
        body:
         Center(
           child: SingleChildScrollView(
             child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
              Padding(padding: const EdgeInsets.only(top: 45,bottom: 15),
                child: TextField(
                  keyboardType: TextInputType.number, 
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 25,
                  ),
                  controller: x,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.deepOrangeAccent),
                      borderRadius: BorderRadius.circular(20)
                      ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.deepOrangeAccent),
                      borderRadius: BorderRadius.circular(20)
                      ),
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.blueAccent),
                      borderRadius: BorderRadius.circular(20)
                      ),
                    hintText: 'Enter the x-value',
                    hintStyle: const TextStyle(color: Colors.grey),
                  ),
                ),
              ),
              Padding(padding: const EdgeInsets.only(top: 45,bottom: 35),
                child: TextField(
                  keyboardType: TextInputType.number, 
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 25,
                  ),
                  controller: y,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.deepOrangeAccent),
                      borderRadius: BorderRadius.circular(20)
                      ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.deepOrangeAccent),
                      borderRadius: BorderRadius.circular(20)
                      ),
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.blueAccent),
                      borderRadius: BorderRadius.circular(20)
                      ),
                    hintText: 'Enter the y-value',
                    hintStyle: const TextStyle(color: Colors.grey),
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ButtonBar(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                              if(x.text.isNotEmpty && y.text.isNotEmpty){
                                e1.add(Data(double.parse(x.text),double.parse(y.text)));
                                x.clear();
                                y.clear();
                              }
                              else if(x.text.isEmpty && y.text.isEmpty) {
                                Fluttertoast.showToast(msg: "Please enter x and y axis value");
                              }
                              else if(x.text.isEmpty) {
                                Fluttertoast.showToast(msg: "Please enter x axis value");
                              }
                              else if(y.text.isEmpty) {
                                Fluttertoast.showToast(msg: "Please enter y axis value");
                              }
                          });
                        },
                        child: const Text('Add data'),
                        )
                    ],
                  ),  
              ButtonBar(
                mainAxisSize: MainAxisSize.min,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      if (e1.length >= 2) {
                          var n = MaterialPageRoute(
                            builder: (BuildContext context) =>
                              Home2(e1),
                          );
                          Navigator.of(context).push(n);
                        }
                        else {
                          Fluttertoast.showToast(msg: "Please enter atleast two values to see graph");
                        }
                    },
                    child: const Text('See Graph'),
                    )
                ],
              ),
              ButtonBar(
                mainAxisSize: MainAxisSize.min,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      if(e1.isNotEmpty) {
                        e1.removeLast();
                      } else {
                        Fluttertoast.showToast(msg: "List is already empty");
                      }
                    },
                    child: const Text('Remove Last'),
                    )
                ],
              ),
                ],
              ),
              ButtonBar(
                mainAxisSize: MainAxisSize.min,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      e1.clear();
                    },
                    child: const Text('Reset'),
                    )
                ],
              ),
                   ]),
           ),
         )
    );
  }
}
