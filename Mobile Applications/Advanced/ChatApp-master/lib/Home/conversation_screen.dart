// ignore_for_file: non_constant_identifier_names, prefer_const_constructors_in_immutables, use_key_in_widget_constructors, must_be_immutable

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:mychatapp/helper/constants.dart';
import 'package:mychatapp/services/database.dart';

class ConversationScreen extends StatefulWidget {
  final String chatroomid;
  String? user;
  ConversationScreen(this.chatroomid,this.user);

  @override
  _ConversationScreenState createState() => _ConversationScreenState();
}

class _ConversationScreenState extends State<ConversationScreen> {
  DataBaseMethods dataBaseMethods = DataBaseMethods();
  TextEditingController textEditingController = TextEditingController();
  Stream? chatmsg;

  Widget ChatMessageList() {
    return StreamBuilder(
      stream: chatmsg,
      builder: (context,snapshot) {
        if(!snapshot.hasData) {
          return Container();
        }
        return ListView.builder(
          itemCount: (snapshot.data as QuerySnapshot).docs.length,
          itemBuilder: (context,index) {
            return MessageTile(
              (snapshot.data as QuerySnapshot).docs[index]["message"],
              (snapshot.data as QuerySnapshot).docs[index]["sender"] == constants.name 
            );
          }
        );
      }
    );
  }

  sendMessages() {
    if(textEditingController.text.isNotEmpty) {
      Map<String,dynamic> msgmap = {
        "message" : textEditingController.text,
        "sender" : constants.name,
        "time" : DateTime.now().millisecondsSinceEpoch
      };
    dataBaseMethods.addConversationMsg(widget.chatroomid, msgmap);
    textEditingController.text = "";
    }
  }
  
  @override
  void initState() {
    super.initState();
    dataBaseMethods.getConversationMsg(widget.chatroomid).then((val) {
      setState(() {
        chatmsg = val;
      });
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.user!,style: const TextStyle(color: Colors.black),),
        backgroundColor: Colors.green[50],
          elevation: 0.0,
          shadowColor: Colors.transparent,
          centerTitle: true,
          iconTheme: const IconThemeData(
            color: Colors.green
          ),
      ),
      body: Container(
        color: Colors.green[100],
        child: Stack(
          children: [
            ChatMessageList(),
            Container(
              alignment: Alignment.bottomCenter,
              child: Container(
                color: const Color(0x54FFFFFF),
                padding: const EdgeInsets.symmetric(horizontal: 24,vertical: 16),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: textEditingController,
                        decoration: const InputDecoration(
                          hintText: "Message",
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
                        elevation: 0.0,
                        child: const Icon(Icons.send,),
                        onPressed: () {
                          sendMessages();
                        },
                        backgroundColor: Colors.greenAccent,
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],),
      ),
    );
  }
}

class MessageTile extends StatelessWidget {
  final String msg;
  final bool sender;
  MessageTile(this.msg,this.sender);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      alignment: sender ? Alignment.centerRight : Alignment.centerLeft,
      width: MediaQuery.of(context).size.width,
      padding: EdgeInsets.only(left: sender ? 0 : 20, right: sender ? 20 : 0),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24,vertical: 16),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: sender ? [Colors.green,Colors.green.shade400] : [Colors.white30,Colors.white70],
          ),
          borderRadius: sender ? const BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
            bottomLeft: Radius.circular(20)
          ) : 
          const BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
            bottomRight: Radius.circular(20)
          )
        ),
        child: Text(
          msg,
          style: const TextStyle(
            color: Colors.black,
            fontSize: 16
          ),
        ),
      ),
    );
  }
}