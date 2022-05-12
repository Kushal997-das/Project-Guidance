// ignore_for_file: prefer_const_constructors_in_immutables, use_key_in_widget_constructors

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:mychatapp/Home/conversation_screen.dart';
import 'package:mychatapp/Home/search.dart';
import 'package:mychatapp/helper/authenticate.dart';
import 'package:mychatapp/helper/constants.dart';
import 'package:mychatapp/helper/helper.dart';
import 'package:mychatapp/services/auth.dart';
import 'package:mychatapp/services/database.dart';


class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {

  AuthMethod authMethod = AuthMethod();
  DataBaseMethods dataBaseMethods = DataBaseMethods();
  Stream? chatroom;

  Widget chatroomlist() {
    return StreamBuilder(
      stream: chatroom,
      builder: (context,snapshot) {
        if(snapshot.hasData) {
          return ListView.builder(
          itemCount: (snapshot.data as QuerySnapshot).docs.length,
          itemBuilder: (context,index) {
              return ChatroomTile(
                (snapshot.data as QuerySnapshot).docs[index]["chatroomid"].toString().replaceAll("_", "").replaceAll(constants.name!, ""),
                (snapshot.data as QuerySnapshot).docs[index]["chatroomid"]
              );
            }
          );
        }
        else {
          return Container();
        }
      }
    );
  }

  @override
  void initState() {
    getuserinfo();
    super.initState();
  }

  getuserinfo() async {
    constants.name= (await helpermethod.getusernameloggedinsharedpreference());
    dataBaseMethods.getChatRoom(constants.name).then((value) {
      setState(() {
        chatroom = value; 
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
          backgroundColor: Colors.green[50],
          appBar: AppBar(
            title: const Text("MyChatApp",style: TextStyle(color: Colors.black),),
            backgroundColor: Colors.green[50],
            elevation: 0.0,
            shadowColor: Colors.transparent,
            centerTitle: true,
            iconTheme: const IconThemeData(
              color: Colors.green
            ),
            actions: [
              GestureDetector(
                child: Container(
                  child: const Icon(Icons.logout),
                  padding: const EdgeInsets.symmetric(vertical: 2,horizontal: 9),
                  ),
                onTap: () {
                  authMethod.signout();
                  helpermethod.saveuserloggedinsharedpreference(false);
                  Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) =>const Authenticate()));
                }
                ) 
            ],
          ),
          body: chatroomlist(),
          floatingActionButton: FloatingActionButton(
              child: const Icon(Icons.search),
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context)  => const Search()));
              },
              backgroundColor: Colors.greenAccent,
            ),
      );
  }
}

class ChatroomTile extends StatelessWidget {
  final String username;
  final String chatroomid;
  ChatroomTile(this.username,this.chatroomid);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(context,MaterialPageRoute(builder: (context) => ConversationScreen(chatroomid,username)));
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24,vertical: 16),
        width: MediaQuery.of(context).size.width,
        color: Colors.green[100],
        child: Row(
          children: [
            Container(
              width: 40,
              height: 40,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: Colors.greenAccent[100],
                borderRadius: BorderRadius.circular(40)
              ),
              child: Text(username.substring(0,1).toUpperCase()), 
            ),
            const SizedBox(width: 8,),
            Text(username)
          ],
        ),
      ),
    );
  }
}