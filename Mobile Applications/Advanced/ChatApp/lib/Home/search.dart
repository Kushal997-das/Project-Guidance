import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mychatapp/Home/conversation_screen.dart';
import 'package:mychatapp/helper/constants.dart';
import 'package:mychatapp/services/database.dart';

class Search extends StatefulWidget {
  const Search({ Key? key }) : super(key: key);

  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  TextEditingController searchtextediter = TextEditingController();
  DataBaseMethods dataBaseMethods = DataBaseMethods();
  QuerySnapshot? snapshot;
  

  Widget searchlist() {
    return snapshot != null ? ListView.builder(
      shrinkWrap: true,
      itemCount: snapshot?.docs.length,
      itemBuilder: (BuildContext context,int index) { 
        return searchList(
          snapshot?.docs[index]["Name"],
          snapshot?.docs[index]["email"]
        );
      },
    ) : Container();
  }

  createchatforconversation(String username) {
    if(username != constants.name) {
      String chatroomid = getchatroomid(username, constants.name);
      List<String?> users = [username,constants.name];
      Map<String,dynamic> chatroommap = {
        "users": users,
        "chatroomid": chatroomid
      };
      dataBaseMethods.createChatroom(chatroomid,chatroommap);
      Navigator.push(context,MaterialPageRoute(builder: (context) => ConversationScreen(chatroomid,username)));
    }
    else {
      Fluttertoast.showToast(msg: "You cannot message yourself");
    }
  }

  initiatesearch() {
    dataBaseMethods.getUserbyusername(searchtextediter.text).then((val) { 
      setState(() {
        snapshot = val;
      }); 
    });
  }

  Widget searchList(String username,String email) {
    return Container(
      height: 110,
      padding: const EdgeInsets.symmetric(horizontal: 24,vertical: 16),
      child: Row(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(username,style: const TextStyle(fontWeight: FontWeight.bold,fontSize: 17),),
              const SizedBox(height: 20),
              Text(email,style: const TextStyle(fontWeight: FontWeight.bold,fontSize: 17))
            ],
          ),
          const Spacer(),
          GestureDetector(
            onTap: () => createchatforconversation(username),
            child: Container(
              height: 40,
              width: 70,
              decoration: BoxDecoration(
                color: Colors.greenAccent,
                borderRadius: BorderRadius.circular(30),
              ),
              child: const Center(child: Text("Message")),
            ),
          )
        ],
      ),
    );
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Search",style: TextStyle(color: Colors.black),),
        backgroundColor: Colors.green[100],
        elevation: 0.0,
        centerTitle: true,
        iconTheme: const IconThemeData(
          color: Colors.green
        ),
      ),
      body: Container(
        color: Colors.green[100],
        child: Column(
          children: [
            Container(
              color: const Color(0x54FFFFFF),
              padding: const EdgeInsets.symmetric(horizontal: 24,vertical: 16),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: searchtextediter,
                      decoration: const InputDecoration(
                        hintText: "Enter username",
                        hintStyle: TextStyle(
                          color: Colors.grey,
                        ),
                        border: InputBorder.none,
                      ),
                    )
                  ),
                  SizedBox(
                    height: 40,
                    width: 40,
                    child: FloatingActionButton(
                      child: const Icon(Icons.search),
                      onPressed: () {
                      initiatesearch();
                      },
                      backgroundColor: Colors.greenAccent,
                      elevation: 0.0,
                    ),
                  ),
                ],
              ),
            ),
          searchlist()
          ],
        ),
      ),
    );
  }

  String getchatroomid(String? a,String? b) {
  if(a!.substring(0,1).codeUnitAt(0) > b!.substring(0,1).codeUnitAt(0)) {
    // ignore: unnecessary_string_escapes
    return "$b\_$a";
  }
  else {
    // ignore: unnecessary_string_escapes
    return "$a\_$b";
  }
}
}

