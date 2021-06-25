import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'package:basic_banking_app/Screens/customers_details.dart';
import 'package:basic_banking_app/helpers/toast_builder.dart';
import 'package:basic_banking_app/sqlite_database_management/local_database_helper.dart';

class LandingPage extends StatefulWidget {
  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  /// Make Object of some Special Class
  final LocalStorageHelper _localStorageHelper = LocalStorageHelper();
  final FToast _fToast = FToast();

  /// Extract Initialize Data
  void _extractImportantUserData() async {
    await _localStorageHelper.createTableToStoreUserData();
    await _localStorageHelper.createTableForLiveTransactions();
  }

  @override
  void initState() {
    this._fToast.init(context);

    _extractImportantUserData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(34, 48, 60, 1),
      body: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: ListView(
          shrinkWrap: true,
          children: [
            Container(
              margin: EdgeInsets.only(top: 60),
              alignment: Alignment.center,
              child: Image.asset('assets/tsf_logo.png'),
            ),
            _landingPageColumnWidgets(
                text: 'The Sparks Foundation',
                marginFromTopVal: 0.0,
                fontSize: 25.0,
                color: Colors.amber),
            _landingPageColumnWidgets(
                text: 'Mobile App Development Internship',
                marginFromTopVal: 30.0,
                fontSize: 22.0),
            _landingPageColumnWidgets(
                text: 'Basic Banking App',
                marginFromTopVal: 30.0,
                fontSize: 20.0,
                color: Colors.green),
            _viewAllCustomers(),
          ],
        ),
      ),
    );
  }

  /// Landing Page Some Instruction Screen
  Widget _landingPageColumnWidgets(
      {@required String text,
      @required double marginFromTopVal,
      @required double fontSize,
      Color color = Colors.white70}) {
    return Container(
      alignment: Alignment.center,
      margin: EdgeInsets.only(top: marginFromTopVal),
      child: Text(
        text,
        style: TextStyle(
          color: color,
          fontSize: fontSize,
        ),
      ),
    );
  }

  /// All Customers List
  Widget _viewAllCustomers() {
    return Container(
      margin: EdgeInsets.only(top: 30.0),
      alignment: Alignment.center,
      child: TextButton(
        style: TextButton.styleFrom(
          primary: Colors.green,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(40.0),
              side: BorderSide(color: Colors.green)),
        ),
        child: Text(
          'View All Customers',
          style: TextStyle(color: Colors.green, fontSize: 16.0),
        ),
        onPressed: () async {
          print('View All Customers Button Pressed');
          try {
            showToast('User Data Extracting', this._fToast,
                toastGravity: ToastGravity.CENTER, toastColor: Colors.amber);
          } catch (e) {
            print('Landing Page Toast Show Error:');
          }
          Navigator.push(
              context, MaterialPageRoute(builder: (_) => CustomersView()));
        },
      ),
    );
  }
}
