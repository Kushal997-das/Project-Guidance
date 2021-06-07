import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:social_media_integration/Services/facebook_auth.dart';
import 'package:social_media_integration/Services/google_auth.dart';
import 'package:social_media_integration/screens/landing_page.dart';

class DisplayUserData extends StatefulWidget {
  /// Display Page Take essential Data about user after Google/Facebook Sign In
  final String userName;
  final String userEmail;
  final String userProfilePicUrl;

  DisplayUserData(
      {@required this.userName,
      @required this.userEmail,
      @required this.userProfilePicUrl});

  @override
  _DisplayUserDataState createState() => _DisplayUserDataState();
}

class _DisplayUserDataState extends State<DisplayUserData> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(34, 48, 60, 1),
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: ListView(
          shrinkWrap: true,
          children: [
            Container(
              padding: EdgeInsets.only(top: 50.0, right: 15.0),
              alignment: Alignment.topRight,
              child: IconButton(
                icon: Icon(
                  Icons.login_outlined,
                  color: Colors.red,
                  size: 30.0,
                ),
                onPressed: _logOutWithCredentialChecking,
              ),
            ),
            Container(
              padding: EdgeInsets.only(
                  top: MediaQuery.of(context).size.height / 4 - 50),
              alignment: Alignment.center,
              child: CircleAvatar(
                  radius: 60.0,
                  backgroundImage: NetworkImage(
                    widget.userProfilePicUrl,
                  )),
            ),
            SizedBox(
              height: 10.0,
            ),
            _nameAndEmailShow(
                mainContextName: 'Name',
                valName: widget.userName,
                fontSize: 20.0),
            _nameAndEmailShow(
                mainContextName: 'Email',
                valName: widget.userEmail,
                fontSize: 18.0),
            SizedBox(
              height: 20.0,
            ),
          ],
        ),
      ),
    );
  }

  Widget _nameAndEmailShow(
      {@required String mainContextName,
      @required String valName,
      @required double fontSize}) {
    return Container(
      margin: EdgeInsets.only(top: 20.0),
      padding: EdgeInsets.only(left: 10.0),
      alignment: Alignment.center,
      child: Row(
        children: [
          Center(
              child: Text(
            '$mainContextName:',
            style: TextStyle(color: Colors.green, fontSize: fontSize),
          )),
          Expanded(
            child: Center(
              child: Text(
                valName,
                style: TextStyle(color: Colors.amber, fontSize: fontSize),
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _logOutWithCredentialChecking() async {
    /// Check if it's sign in with Google or not
    final bool response = await GoogleAuth().googleSignInAuthCredentialCheck();

    /// If signed in with Google
    if (response) {
      await GoogleAuth().googleLogOut(); // Google Log Out Event
      _switchToTheLandingPage(); //Switch to the landing page
    } else {
      /// Not Google Signed in, So check if it's sign in through facebook or not
      final bool response = await FaceBookAuth().fbSignInCredentialCheck();

      /// If Signed In with Facebook
      if (response) {
        await FaceBookAuth().logOut(); // Facebook Log out event
        _switchToTheLandingPage(); // Switch to the landing page
      }
    }
  }

  void _switchToTheLandingPage() => Navigator.pushReplacement(
      context, MaterialPageRoute(builder: (_) => LandingPage()));
}
