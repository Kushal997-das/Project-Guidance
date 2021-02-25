import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hello_promodoro/Backend/Authentication.dart';
import 'package:hello_promodoro/FrontEnd/alertDialogShow.dart';

class AccountManagerSignUp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return AccountCreate();
  }
}

class AccountCreate extends State<AccountManagerSignUp> {
  var formKey = GlobalKey<FormState>();
  TextEditingController _nameIs = TextEditingController();
  TextEditingController _pwdIs = TextEditingController();
  TextEditingController _conformPwdIs = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blueAccent,
          leading: Icon(Icons.person_add_alt_1_rounded,),
          title: Text(
            "Sign-Up",
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 28.0,
              fontFamily: 'Lora',
              fontWeight: FontWeight.w300,
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          tooltip: "Log-in",
          child: Icon(Icons.login_rounded),
          onPressed: (){
            Navigator.pop(context);
          },
        ),
        body: Form(
          key: formKey,
          child: ListView(
            children: [
              SizedBox(height: 20.0),
              inputTake("name"),
              SizedBox(height: 20.0),
              inputTake("pwd"),
              SizedBox(height: 20.0),
              inputTake(),
              SizedBox(height: 40.0),
              buttons(),
            ],
          ),
        ));
  }

  Widget inputTake([String indicator = "other"]) {
    String labelValue = "", hintValue = "";
    bool permission;
    if (indicator == "name") {
      labelValue = "User Name";
      hintValue = "e.g: Samarpan Dasgupta";
      permission = false;
    } else if (indicator == "pwd") {
      labelValue = "Enter Password";
      hintValue = "e.g: sam1246";
      permission = true;
    } else {
      labelValue = "Conform Your Password";
      hintValue = "e.g: sam1246";
      permission = true;
    }

    TextEditingController selection(){
      if(indicator == "name")
        return this._nameIs;
      else if(indicator == "pwd")
        return this._pwdIs;
      return this._conformPwdIs;
    }

    return Container(
      margin: EdgeInsets.only(
        top: 15.0,
        left: 10.0,
        right: 10.0,
      ),
      child: TextFormField(
        autofocus: !permission,
        obscureText: permission,
        maxLines: 1,
        maxLength: 10,
        controller: selection(),
        validator: (String _inputData){
          if(_inputData.length < 1 || _inputData.length>10)
            return "Maximum Length 10 and Minimum Length 1";
          else if(indicator == "other" && (this._pwdIs.text != this._conformPwdIs.text))
            return "Password and Conform Password are not Same";
          return null;
        },
        decoration: InputDecoration(
          labelText: labelValue,
          labelStyle: TextStyle(fontFamily: 'Lora', fontSize: 20.0),
          hintText: hintValue,
          hintStyle: TextStyle(fontFamily: 'Lora', fontSize: 20.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(25.0),
            borderSide: BorderSide(
              width: 5.0,
            ),
          ),
        ),
      ),
    );
  }

  Widget buttons() {
    return Container(
      margin: EdgeInsets.only(left: 10.0, right: 10.0),
      child: Row(
        children: <Widget>[
          Expanded(
            child: RaisedButton(
              color: Colors.blueAccent,
              elevation: 15.0,
              child: Text(
                "Save",
                style: TextStyle(fontSize: 25.0, fontFamily: 'Lora'),
              ),
              onPressed: () async {
                if(formKey.currentState.validate()){
                  Authenticate authenticate = Authenticate(this._nameIs.text, this._pwdIs.text);
                  bool response = await authenticate.signUp();
                  if(response) {
                    showAlertBox(context, "😍 Sign-Up Successfully 😍", "right",
                        "👈 Log-In to Continue 👌");
                  } else{
                    showAlertBox(context, "😍 Sign-Up Failed 😍", "wrong",
                        "🙀 Same User Already Exist 🙀");
                  }
                }
              },
              shape: RoundedRectangleBorder(
                side: BorderSide(width: 1.0),
                borderRadius: BorderRadius.circular(20.0),
              ),
            ),
          ),
          SizedBox(
            width: 20.0,
          ),
          Expanded(
            child: RaisedButton(
              color: Colors.blueAccent,
              elevation: 15.0,
              child: Text(
                "Cancel",
                style: TextStyle(fontSize: 25.0, fontFamily: 'Lora'),
              ),
              onPressed: () {
                Authenticate authenticate = Authenticate(this._nameIs.text, this._pwdIs.text);
                authenticate.deleteData();
                Navigator.pop(context);
              },
              shape: RoundedRectangleBorder(
                side: BorderSide(width: 1.0),
                borderRadius: BorderRadius.circular(20.0),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
