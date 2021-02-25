import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hello_promodoro/Backend/Authentication.dart';
import 'package:hello_promodoro/FrontEnd/alertDialogShow.dart';
import 'package:hello_promodoro/FrontEnd/Sign_up.dart';

class EditDetails extends StatefulWidget {
  String _userName;

  EditDetails(this._userName);

  @override
  State<StatefulWidget> createState() {
    return EditDetailsInput(this._userName);
  }
}

class EditDetailsInput extends State<EditDetails> {
  TextEditingController _nameIs = TextEditingController();
  TextEditingController _pwdIs = TextEditingController();
  var _formKey = GlobalKey<FormState>();
  String _oldUserName;

  EditDetailsInput(this._oldUserName);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blueAccent,
          leading: Icon(Icons.login),
          title: Text(
            "Update Details",
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 28.0,
              fontFamily: 'Lora',
              fontWeight: FontWeight.w300,
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          tooltip: "Sign-Up",
          child: Icon(Icons.person_add_alt_1_outlined),
          onPressed: () {
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => AccountManagerSignUp()));
          },
        ),
        body: Form(
          key: _formKey,
          child: ListView(
            children: [
              SizedBox(height: 20.0),
              inputTake(context, "name"),
              SizedBox(height: 20.0),
              inputTake(context),
              SizedBox(height: 40.0),
              buttons(),
            ],
          ),
        ));
  }

  Widget inputTake(BuildContext context, [String indicator = "other"]) {
    String labelValue = "", hintValue = "";
    bool permission;

    indicator == "name"
        ? labelValue = "Update User Name"
        : labelValue = "Update Password/Old Password";
    indicator == "name"
        ? hintValue = "e.g: Samarpan"
        : hintValue = "e.g: sam145";
    indicator == "name" ? permission = false : permission = true;

    TextEditingController takeControl(String indicator) =>
        indicator == "name" ? this._nameIs : this._pwdIs;

    return Container(
      alignment: Alignment.topCenter,
      width: MediaQuery.of(context).size.width,
      margin: EdgeInsets.only(
        top: 10.0,
        left: 10.0,
        right: 10.0,
      ),
      child: TextFormField(
        autofocus: !permission,
        obscureText: permission,
        maxLines: 1,
        maxLength: 10,
        controller: takeControl(indicator),
        validator: (String _inputData) {
          if (_inputData.length < 1 || _inputData.length > 10)
            return "Maximum Length 10 and Minimum Length 1";
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
                if (_formKey.currentState.validate()) {
                  Authenticate authenticate =
                      Authenticate(this._nameIs.text, this._pwdIs.text);
                  bool response = await authenticate.getData();
                  if (response) {
                    authenticate.updateSettingHelper(
                        this._oldUserName, this._nameIs.text, this._pwdIs.text);
                    showAlertBox(
                        context,
                        "😍 Data Updated 😍",
                        "right",
                        "🥰 Log-In to Continue 🥰",
                        this._oldUserName,
                        authenticate);
                  } else {
                    showAlertBox(context, "👿 Update Error 👿", "wrong",
                        "Same User Name Already Exist\n\n Try Other User Name");
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
                Authenticate authenticate =
                    Authenticate(this._nameIs.text, this._pwdIs.text);
                authenticate.getAllData();
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
