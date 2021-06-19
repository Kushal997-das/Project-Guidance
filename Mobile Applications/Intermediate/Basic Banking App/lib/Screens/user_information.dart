import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

import 'package:basic_banking_app/Screens/select_user_to_transfer_money.dart';

class UserInformation extends StatefulWidget {
  final String userName;
  final String userEmail;
  final String userCurrAcc;

  UserInformation(
      {@required this.userName,
      @required this.userEmail,
      @required this.userCurrAcc});

  @override
  _UserInformationState createState() => _UserInformationState();
}

class _UserInformationState extends State<UserInformation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(34, 48, 60, 1),
      body: Container(
        alignment: Alignment.center,
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: ListView(
          shrinkWrap: true,
          children: [
            Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.only(bottom: 20.0),
              child: Text(
                'User Account Information',
                style:
                    TextStyle(color: Colors.lightGreenAccent, fontSize: 20.0),
              ),
            ),
            _everyUserGeneralInformation('User Name', widget.userName),
            _everyUserGeneralInformation('User Email', widget.userEmail),
            _everyUserGeneralInformation(
                'Bank Balance', 'Rs. ${widget.userCurrAcc}'),
            _transferMoney(),
          ],
        ),
      ),
    );
  }

  Widget _everyUserGeneralInformation(String leftText, String rightText) {
    return Card(
        elevation: 0.0,
        color: Color.fromRGBO(34, 48, 60, 1),
        child: Container(
          height: 80,
          padding: EdgeInsets.only(left: 10.0, right: 10.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                alignment: Alignment.centerLeft,
                padding: EdgeInsets.only(
                  top: 5.0,
                  bottom: 5.0,
                ),
                child: Text(
                  leftText,
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.lightBlue, fontSize: 18.0),
                ),
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                    rightText,
                    style: TextStyle(color: Colors.amber, fontSize: 16.0),
                  ),
                ),
              ),
            ],
          ),
        ));
  }

  Widget _transferMoney() {
    return Center(
      child: TextButton(
        style: TextButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(40.0),
            side: BorderSide(color: Colors.green),
          ),
        ),
        child: Text(
          'Transfer Money',
          style: TextStyle(color: Colors.green, fontSize: 18.0),
        ),
        onPressed: () {
          print('Transfer Money Button Clicked');

          /// Some Screen Pop Out
          Navigator.pop(context);
          Navigator.pop(context);

          /// User Selection Page to Transfer Money
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (_) => SelectConnection(
                        currUserEmail: widget.userEmail,
                        currAccountMoney: widget.userCurrAcc,
                        currAccUserName: widget.userName,
                      )));
        },
      ),
    );
  }
}
