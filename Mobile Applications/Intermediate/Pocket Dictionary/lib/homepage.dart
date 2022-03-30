import 'dart:convert';
import 'package:http/http.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String time = "";
  Map BookList = {};
  var activeMeterIndex;
  Map words = {};
  TextEditingController newWordCont = TextEditingController();

  String greeting() {
    var tempTime = TimeOfDay.now().hour;
    if (0 <= tempTime && tempTime < 12) {
      return "Good Morning";
    } else if (12 <= tempTime && tempTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  void getWords() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var existing_words = prefs.getString('words');
    setState(() {
      if (existing_words.runtimeType != Null) {
        BookList = json.decode(existing_words.toString());
      }
    });
  }

  void addWords() {
    showDialog(
        context: context,
        builder: (_) {
          return AlertDialog(
            backgroundColor:
                const Color.fromARGB(255, 34, 193, 195).withAlpha(250),
            shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(10))),
            title:
                const Text("Enter word", style: TextStyle(color: Colors.white)),
            content: TextField(
              style: const TextStyle(color: Colors.white),
              cursorColor: Colors.white,
              controller: newWordCont,
              decoration: const InputDecoration(
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
              ),
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.pop(context);
                  newWordCont.text = "";
                },
                child:
                    const Text("Close", style: TextStyle(color: Colors.white)),
              ),
              TextButton(
                onPressed: () async {
                  var response = (json.decode((await get(Uri.parse(
                          "https://api.dictionaryapi.dev/api/v2/entries/en/${newWordCont.text}")))
                      .body));
                  if (response.runtimeType.toString() == "List<dynamic>") {
                    List temp1 = [
                      newWordCont.text,
                      response[0]['meanings'][0]['definitions'][0]['definition']
                    ];
                    if (!BookList.containsKey(temp1[0])) {
                      BookList[temp1[0]] = temp1[1];
                    }
                  } else if (response.runtimeType.toString() ==
                      "_InternalLinkedHashMap<String, dynamic>") {
                    List temp1 = [newWordCont.text, response['title']];
                    if (!BookList.containsKey(temp1[0])) {
                      BookList[temp1[0]] = temp1[1];
                    }
                  }
                  SharedPreferences prefs =
                      await SharedPreferences.getInstance();
                  prefs.setString('words', json.encode(BookList));
                  setState(() {});
                  Navigator.pop(context);
                  newWordCont.text = "";
                },
                child: const Text(
                  "Add",
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ],
          );
        });
  }

  @override
  void initState() {
    super.initState();
    time = greeting();
    getWords();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
          gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
            Color.fromARGB(255, 34, 193, 195),
            Color.fromARGB(255, 213, 236, 148)
          ],
              stops: [
            .3,
            .75
          ])),
      child: Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            backgroundColor: Colors.transparent,
            toolbarHeight: 120,
            elevation: 0,
            title: Padding(
              padding: const EdgeInsets.only(top: 25.0),
              child: Text(
                "$time!",
                style: GoogleFonts.sourceSansPro(
                    textStyle: const TextStyle(
                        height: 1.5,
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 31)),
              ),
            ),
            actions: [
              Padding(
                padding: const EdgeInsets.only(top: 25.0, right: 20.0),
                child: Container(
                    width: 45,
                    decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border:
                            Border.all(width: 4.0, color: Colors.limeAccent)),
                    child: IconButton(
                        padding: const EdgeInsets.all(3.0),
                        icon: const Icon(Icons.add),
                        onPressed: () {
                          addWords();
                        },
                        color: Colors.black,
                        iconSize: 30)),
              )
            ],
          ),
          body: Container(
            padding: const EdgeInsets.only(top: 25.0, left: 10.0, right: 10.0),
            child: BookList.isNotEmpty
                ? Column(children: [
                    Expanded(
                      child: ListView.builder(
                          // padding:
                          // const EdgeInsets.only(top: 15.0, bottom: 15.0),
                          itemCount: BookList.length,
                          itemBuilder: (context, i) {
                            return ExpansionPanelList(
                              elevation: 0,
                              expansionCallback: (int index, bool status) {
                                setState(() {
                                  activeMeterIndex =
                                      activeMeterIndex == i ? null : i;
                                });
                              },
                              children: [
                                ExpansionPanel(
                                  backgroundColor: Colors.transparent,
                                  isExpanded: activeMeterIndex == i,
                                  headerBuilder:
                                      (BuildContext context, bool isExpanded) =>
                                          Container(
                                    padding: const EdgeInsets.only(left: 15.0),
                                    alignment: Alignment.centerLeft,
                                    child: Padding(
                                      padding: const EdgeInsets.only(top: 15.0),
                                      child: Text(
                                          "${BookList.keys.toList()[i]}",
                                          style: const TextStyle(fontSize: 20)),
                                    ),
                                  ),
                                  body: Container(
                                    padding: const EdgeInsets.only(left: 15.0),
                                    alignment: Alignment.centerLeft,
                                    child: Padding(
                                      padding: const EdgeInsets.only(
                                          top: 5.0, bottom: 10.0),
                                      child: Text(
                                        "${BookList[BookList.keys.toList()[i]]}",
                                        style: const TextStyle(fontSize: 16),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            );
                          }),
                    )
                  ])
                : Center(
                    child: RichText(
                    text: const TextSpan(
                      text: 'No Words found ',
                      style: TextStyle(
                          color: Colors.black87,
                          fontSize: 22.0,
                          fontWeight: FontWeight.bold),
                      children: <TextSpan>[
                        TextSpan(
                            text: '\u2639', style: TextStyle(fontSize: 25.0)),
                      ],
                    ),
                  )),
          )),
    );
  }
}
