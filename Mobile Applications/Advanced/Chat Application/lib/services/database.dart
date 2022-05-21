import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fluttertoast/fluttertoast.dart';

class DataBaseMethods {
  getUserbyusername(String username) async {
   return await FirebaseFirestore.instance.collection("users")
    .where("Name", isEqualTo: username)
    .get();
  }

  getUserbyemail(String email) async {
   return await FirebaseFirestore.instance.collection("users")
    .where("email", isEqualTo: email)
    .get();
  }

  userinfo(userMap) {
    FirebaseFirestore.instance.collection("users")
    .add(userMap).catchError((e) {
      Fluttertoast.showToast(msg: e.toString());
    });
  }

  createChatroom(String? roomid, chatroomMap) {
    FirebaseFirestore.instance.collection("chatroom").doc(roomid).set(chatroomMap).catchError((e) {
      Fluttertoast.showToast(msg: e.toString());
    });
  }

  addConversationMsg(String chatroomid, messagemap) {
    FirebaseFirestore.instance.collection("chatroom").doc(chatroomid).collection("chats").add(messagemap).catchError((e) {
      Fluttertoast.showToast(msg: e.toString());
    });
  }

  getConversationMsg(String chatroomid) async {
    return FirebaseFirestore.instance.collection("chatroom").doc(chatroomid).collection("chats").orderBy("time").snapshots();
  }

  getChatRoom(String? username) async {
    return FirebaseFirestore.instance.collection("chatroom").where("users", arrayContains: username).snapshots();
  }
}