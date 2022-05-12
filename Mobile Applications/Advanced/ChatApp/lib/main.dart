import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/services.dart';
import 'package:mychatapp/Home/mainscreen.dart';
import 'package:mychatapp/helper/authenticate.dart';
import 'package:mychatapp/helper/helper.dart';

void main() async {
   WidgetsFlutterBinding.ensureInitialized();
   await Firebase.initializeApp();
   SystemChrome.setSystemUIOverlayStyle(
     const SystemUiOverlayStyle(
       statusBarColor: Colors.transparent,
       statusBarBrightness: Brightness.light
     )
   );
   runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({ Key? key }) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool isuserloggedin=false;

  @override
  void initState() {
    getloggedinstate();
    super.initState();
  }

  getloggedinstate() async {
    return await helpermethod.getuserloggedinsharedpreference().then((value) {
      setState(() {
        isuserloggedin = value!;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: isuserloggedin ? const HomeScreen() : const Authenticate(),
      title: "MyChatApp"
    );
  }
}