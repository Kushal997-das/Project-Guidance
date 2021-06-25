import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'package:basic_banking_app/sqlite_database_management/local_database_helper.dart';
import 'package:basic_banking_app/Screens/common_message_show.dart';
import 'package:basic_banking_app/Screens/user_information.dart';
import 'package:basic_banking_app/helpers/toast_builder.dart';

class CustomersView extends StatefulWidget {
  const CustomersView({Key key}) : super(key: key);

  @override
  _CustomersViewState createState() => _CustomersViewState();
}

class _CustomersViewState extends State<CustomersView> {
  /// User Information Collection Container
  final List<Map<String, String>> _usersCollection = [];

  /// Some Controller for TextField
  final TextEditingController _userName = TextEditingController();
  final TextEditingController _userEmail = TextEditingController();
  final TextEditingController _userCurrAmount = TextEditingController();

  /// Some objects for important class
  final LocalStorageHelper _localStorageHelper = LocalStorageHelper();
  final FToast _fToast = FToast();

  void _initialDataCollect() async {
    final List<Map<String, Object>> _usersCollection =
        await _localStorageHelper.extractDataFromUserStoredData();

    if (_usersCollection != null && _usersCollection.isNotEmpty) {
      _usersCollection.forEach((everyUserData) {
        if (mounted) {
          setState(() {
            this._usersCollection.add({
              everyUserData['user_name'].toString():
                  "${everyUserData['user_mail'].toString()}[[[separator]]]${everyUserData['user_balance'].toString()}",
            });
          });
        }
      });
    }
  }

  @override
  void initState() {
    this._fToast.init(context);

    this._userName.text = '';
    this._userEmail.text = '';
    this._userCurrAmount.text = '';

    this._initialDataCollect();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color.fromRGBO(34, 48, 60, 1),
        floatingActionButton: _addNewUser(),
        appBar: AppBar(
          brightness: Brightness.dark,
          backgroundColor: const Color.fromRGBO(25, 39, 52, 1),
          elevation: 10.0,
          shadowColor: Colors.white70,
          title: Text(
            'All Customers',
            style: TextStyle(color: Colors.white, fontSize: 20.0),
          ),
        ),
        body: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          child: this._usersCollection.isNotEmpty
              ? ListView.builder(
                  itemCount: this._usersCollection.length,
                  itemBuilder: (context, index) {
                    return _everyUserGeneralInformation(index);
                  },
                )
              : Center(
                  child: Text(
                    'No Customer Present',
                    style: TextStyle(color: Colors.red, fontSize: 20.0),
                  ),
                ),
        ));
  }

  /// General Information Show
  Widget _everyUserGeneralInformation(int index) {
    return Card(
        elevation: 0.0,
        color: Color.fromRGBO(34, 48, 60, 1),
        child: Container(
          height: 80,
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: Color.fromRGBO(34, 48, 60, 1),
              onPrimary: Colors.lightBlueAccent,
              elevation: 0.0,
            ),
            onPressed: () {
              print('User Information');

              /// Selected User Email and Bank Balance Show
              final List<String> userAdditionalInformation = this
                  ._usersCollection[index]
                  .values
                  .first
                  .toString()
                  .split('[[[separator]]]');

              /// Switch to User Information Screen
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (_) => UserInformation(
                            userName: this
                                ._usersCollection[index]
                                .keys
                                .first
                                .toString(),
                            userEmail: userAdditionalInformation[0],
                            userCurrAcc: userAdditionalInformation[1],
                          )));
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Container(
                    alignment: Alignment.centerLeft,
                    padding: EdgeInsets.only(
                      top: 5.0,
                      bottom: 5.0,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Text(
                          this._usersCollection[index].keys.first.toString(),
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              color: Colors.lightBlue, fontSize: 18.0),
                        ),
                        Text(
                          this
                              ._usersCollection[index]
                              .values
                              .first
                              .toString()
                              .split('[[[separator]]]')[0],
                          textAlign: TextAlign.center,
                          style:
                              TextStyle(color: Colors.white70, fontSize: 16.0),
                        ),
                      ],
                    ),
                  ),
                ),
                Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                    'Rs. ${this._usersCollection[index].values.first.toString().split('[[[separator]]]')[1]}',
                    style: TextStyle(color: Colors.amber, fontSize: 16.0),
                  ),
                ),
              ],
            ),
          ),
        ));
  }

  _addNewUser() {
    return FloatingActionButton(
      backgroundColor: Colors.green,
      elevation: 10.0,
      child: Icon(
        Icons.add,
        size: 30.0,
      ),
      onPressed: () {
        print('Add New User');
        _popUpWindowToTakeNewUserInformation();
      },
    );
  }

  void _popUpWindowToTakeNewUserInformation() {
    showDialog(
        context: context,
        builder: (_) => AlertDialog(
              backgroundColor: const Color.fromRGBO(34, 48, 60, 0.6),
              elevation: 5.0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(40.0),
              ),
              title: Center(
                child: Text(
                  'New User Information',
                  style: TextStyle(color: Colors.amber, fontSize: 20.0),
                ),
              ),
              content: Container(
                width: double.maxFinite,
                height: MediaQuery.of(context).size.height / 2.8,
                padding: const EdgeInsets.only(left: 10.0, right: 10.0),
                child: ListView(
                  shrinkWrap: true,
                  children: [
                    Center(
                      child: TextField(
                        controller: this._userName,
                        style: TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                          labelText: 'User Name',
                          labelStyle: TextStyle(color: Colors.white70),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.lightBlue),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 10.0,
                    ),
                    Center(
                      child: TextField(
                        controller: this._userEmail,
                        style: TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                          labelText: 'User Email',
                          labelStyle: TextStyle(color: Colors.white70),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.lightBlue),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 10.0,
                    ),
                    Center(
                      child: TextField(
                        controller: this._userCurrAmount,
                        style: TextStyle(color: Colors.white),
                        keyboardType: TextInputType.number,
                        decoration: InputDecoration(
                          labelText: 'Initial Account Balance',
                          labelStyle: TextStyle(color: Colors.white70),
                          enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.lightBlue),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 15.0,
                    ),
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        child: Text(
                          'Save',
                          style: TextStyle(color: Colors.green, fontSize: 18.0),
                        ),
                        style: TextButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30.0),
                            side: BorderSide(color: Colors.green),
                          ),
                        ),
                        onPressed: () async {
                          await _newInformationTake();
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ));
  }

  /// New User Information Take
  Future<void> _newInformationTake() async {
    print('New User Information Save');
    if (this._userName.text != '' &&
        this._userEmail.text != '' &&
        this._userCurrAmount.text != '') {
      try {
        showToast('Saving Information', this._fToast, toastColor: Colors.amber);
      } catch (e) {
        print('Error: Customers Details Error');
      }

      final bool response = await _localStorageHelper.insertUserDataToTable(
          userName: this._userName.text,
          userEmail: this._userEmail.text,
          userInitialBalance: this._userCurrAmount.text);

      if (response) {
        if (mounted) {
          setState(() {
            this._usersCollection.add({
              this._userName.text:
                  "${this._userEmail.text}[[[separator]]]${this._userCurrAmount.text}",
            });

            this._userEmail.clear();
            this._userName.clear();
            this._userCurrAmount.clear();
          });
        }

        Navigator.pop(context);
      } else {
        showCommonDialog(
            title: "Email Already Present. Try Another Email",
            context: context);
      }
    } else {
      showCommonDialog(title: "Any TextField Can't be Empty", context: context);
    }
  }
}
