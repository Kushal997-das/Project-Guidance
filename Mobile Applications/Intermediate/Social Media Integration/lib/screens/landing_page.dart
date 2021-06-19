import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';

import 'package:social_media_integration/Services/facebook_auth.dart';
import 'package:social_media_integration/Services/google_auth.dart';

class LandingPage extends StatefulWidget {
  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  /// For Controlling Loading Screen(Modal Progress HUD)
  bool _isLoading = false;

  /// Make objects for Google and Facebook Sign In Authentication
  final GoogleAuth _googleAuth = GoogleAuth();
  final FaceBookAuth _faceBookAuth = FaceBookAuth();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(34, 48, 60, 1),
      body: ModalProgressHUD(
        inAsyncCall: this._isLoading,
        color: const Color.fromRGBO(0, 0, 0, 1),
        child: Container(
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
                  text: 'Social Media Integration',
                  marginFromTopVal: 30.0,
                  fontSize: 20.0,
                  color: Colors.green),
              _landingPageColumnWidgets(
                  text: 'Log-In With',
                  marginFromTopVal: 40.0,
                  fontSize: 20.0,
                  color: Colors.amber),
              _socialMediaLogInAccess(),
            ],
          ),
        ),
      ),
    );
  }

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

  Widget _socialMediaLogInAccess() {
    return Padding(
      padding: EdgeInsets.only(
        top: 30.0,
        bottom: 20.0,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          GestureDetector(
            onTap: _googleSignIn,// Make Functionality for Google Sign In
            child: SizedBox(
                width: 45,
                child: Image.asset(
                  'assets/google.png',
                )),
          ),
          SizedBox(
            width: 50.0,
          ),
          GestureDetector(
            onTap: _facebookSignIn,// Make Functionality for Facebook Sign In
            child: SizedBox(
                width: 45,
                child: Image.asset(
                  'assets/fbook.png',
                )),
          ),
        ],
      ),
    );
  }

  void _googleSignIn() async {
    print('Google Logo Pressed');

    /// Loading Started
    if (mounted) {
      setState(() {
        this._isLoading = true;
      });
    }

    /// For Google Sign In
    await _googleAuth.googleLogIn(context: context);

    /// Loading Off
    if (mounted) {
      setState(() {
        this._isLoading = false;
      });
    }
  }

  void _facebookSignIn() async{
    print('Facebook Logo Pressed');

    /// Loading Started
    if (mounted) {
      setState(() {
        this._isLoading = true;
      });
    }

    /// For Facebook Sign In
    await _faceBookAuth.facebookLogIn(context);

    /// Loading Off
    if (mounted) {
      setState(() {
        this._isLoading = false;
      });
    }
  }
}
