// ignore_for_file: use_key_in_widget_constructors, prefer_const_constructors_in_immutables

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mychatapp/helper/helper.dart';
import 'package:mychatapp/services/auth.dart';
import 'package:mychatapp/services/database.dart';

import 'mainscreen.dart';

class SignIn extends StatefulWidget {

  final Function toggle;
  SignIn(this.toggle);

  @override
  State<SignIn> createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  bool loading = false;
  final check = GlobalKey<FormState>();
  DataBaseMethods dataBaseMethods = DataBaseMethods();
  TextEditingController emailTextEditer = TextEditingController();
  TextEditingController passwordEditer = TextEditingController();
  final AuthMethod authmethod = AuthMethod();
  QuerySnapshot? snapshot;

  
  InputDecoration textdecoration(String hint) {
    return InputDecoration(
      filled: true,
        hintText: hint,
        hintStyle: const TextStyle(color: Colors.black45),
        enabledBorder: const OutlineInputBorder(
            borderSide: BorderSide(
          color: Colors.green,
        )),
        focusedBorder: const OutlineInputBorder(
            borderSide: BorderSide(
          color: Color.fromARGB(255, 243, 191, 46),
        )));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Sign In",style: TextStyle(color: Colors.black),),
        backgroundColor: Colors.green[100],
        elevation: 0.0,
        centerTitle: true,
      ),
      backgroundColor: Colors.green[100],
      body: loading ? const Center(child: CircularProgressIndicator()) : Center(
        child: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Form(
                  key: check,
                  child: Column (
                    children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: TextFormField(
                        validator: (val) { return val!.isEmpty ? "Please enter the email" : null;},
                        controller: emailTextEditer,
                        decoration: textdecoration("Email"),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: TextFormField(
                        validator: (val) { return val!.isEmpty ? "Please enter the password" : null;},
                        controller: passwordEditer,
                        obscureText: true,
                        decoration: textdecoration("Password"),
                      ),
                    ),
                    const SizedBox(height: 18,),
                    GestureDetector(
                    onTap: () {
                      if(emailTextEditer.text.isNotEmpty) {
                        AuthMethod().resetpassword(emailTextEditer.text);
                        Fluttertoast.showToast(msg: "Email sent");
                      }
                      else {
                        Fluttertoast.showToast(msg: "Please enter email");
                      } 
                    },
                    child: const Text("Forgot Password?",
                    style: TextStyle(
                      decoration: TextDecoration.underline
                    ),)
                  ),
                    const SizedBox(height: 25,),
                    SizedBox(
                      height: 50,
                      width: MediaQuery.of(context).size.width,
                      child: ElevatedButton(
                        onPressed: () async {

                        if(check.currentState!.validate()) {
                          setState(() {
                            loading=true;
                          });
                          dataBaseMethods.getUserbyemail(emailTextEditer.text).then((value) {
                              snapshot = value;
                              helpermethod.saveusernameloggedinsharedpreference(snapshot?.docs[0]["Name"]);
                            
                          });
            
                          authmethod.signinwithemailpassword(emailTextEditer.text,passwordEditer.text).then((value) async {
                            if(value!=null) {
                              helpermethod.saveuserloggedinsharedpreference(true);
                              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const HomeScreen() ));
                            }
                          });
                        }
                        else {
                          setState(() {
                            loading = false;
                          });
                        }
                    },
                    style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all(Colors.green),
                          shadowColor: MaterialStateProperty.all(Colors.transparent),
                          elevation: MaterialStateProperty.all(0),
                          shape: MaterialStateProperty.all(RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20)
                              )
                            )
                      ),
                    child: const Text("Sign in",style: TextStyle(color: Colors.black87),),
                        ),
                    ),
                    const SizedBox(height: 25,),
                    const Text("Don't have account? Register below"),
                    const SizedBox(height: 25,),
                    SizedBox(
                      height: 50,
                      width: MediaQuery.of(context).size.width,
                      child: ElevatedButton(
                        onPressed: () {
                          widget.toggle();
                        },
                        child: const Text("Sign up",style: TextStyle(color: Colors.black87),),
                        style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all(Colors.green),
                              shadowColor: MaterialStateProperty.all(Colors.transparent),
                              elevation: MaterialStateProperty.all(0),
                              shape: MaterialStateProperty.all(RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20)
                              )
                            )
                          ),
                        ),
                    ),
                    const SizedBox(height: 20,),
                    // GestureDetector(
                    //   onTap: null,
                    //   child: SizedBox(
                    //     height: 60,
                    //     width: 70,
                    //     child: Image.asset("assets/gicon.png")
                    //   ),
                    // ),
                  ],
                ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
