// ignore_for_file: prefer_const_constructors_in_immutables, use_key_in_widget_constructors

import 'package:flutter/material.dart';
import 'package:mychatapp/Home/mainscreen.dart';
import 'package:mychatapp/helper/helper.dart';
import 'package:mychatapp/services/auth.dart';
import 'package:mychatapp/services/database.dart';

class SignUp extends StatefulWidget {
  final Function toggle;
  SignUp(this.toggle);

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final check = GlobalKey<FormState>();
  TextEditingController usernameTextEditer = TextEditingController();
  TextEditingController emailTextEditer = TextEditingController();
  TextEditingController passwordEditer = TextEditingController();
  bool loading = false;
  final AuthMethod authmethod = AuthMethod();
  DataBaseMethods dataBaseMethods = DataBaseMethods();
  
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
        title: const Text("Sign Up",style: TextStyle(color: Colors.black),),
        backgroundColor: Colors.green[100],
        elevation: 0.0,
        centerTitle: true,
      ),
      backgroundColor: Colors.green[100],
      body: loading ? const Center(child: CircularProgressIndicator()): Center(
        child: Form(
          key: check,
          child: SingleChildScrollView(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: TextFormField(
                      validator: (val) {return val!.isEmpty ? "Please enter the username" : null;},
                      controller: usernameTextEditer,
                      decoration: textdecoration("Name"),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: TextFormField(
                      validator: (val) {return val!.isEmpty ? "Please enter the email" : null;},
                      controller: emailTextEditer,
                      decoration: textdecoration("Email"),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: TextFormField(
                      validator: (val) {return val!.isEmpty ? "Please enter the password" : null;},
                      controller: passwordEditer,
                      obscureText: true,
                      decoration: textdecoration("Password"),
                    ),
                  ),
                  const SizedBox(height: 20,),
                  const SizedBox(height: 25,),
                  SizedBox(
                    height: 50,
                    width: MediaQuery.of(context).size.width,
                    child: ElevatedButton(
                      onPressed: () async {

                        if(check.currentState!.validate()) {
                          Map<String,String> userMap = {
                            "Name" : usernameTextEditer.text,
                            "email" : emailTextEditer.text,
                          };
                          helpermethod.saveemailloggedinsharedpreference(emailTextEditer.text);
                          helpermethod.saveusernameloggedinsharedpreference(usernameTextEditer.text);
                          setState(() {
                            loading=true;
                          });
                          authmethod.signupwithemailpassword(emailTextEditer.text,passwordEditer.text).then((value) {
                            dataBaseMethods.userinfo(userMap);
                            helpermethod.saveuserloggedinsharedpreference(true);
                            Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const HomeScreen() ));
                          });
                        }
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
                  const Text("Already Registered? Sign In below"),
                  const SizedBox(height: 20,),
                  SizedBox(
                    height: 50,
                    width: MediaQuery.of(context).size.width,
                    child: ElevatedButton(
                      onPressed: () {
                        widget.toggle();
                      },
                    child: const Text("Sign In",style: TextStyle(color: Colors.black87),),
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
            ),
          ),
        ),
      ),
    );
  }
}