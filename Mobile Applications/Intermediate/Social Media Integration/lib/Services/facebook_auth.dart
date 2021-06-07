import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login_facebook/flutter_login_facebook.dart';

import 'package:social_media_integration/screens/display_screen.dart';
import 'error_msg.dart';

class FaceBookAuth {
  /// Make Object of Facebook Sign In
  final FacebookLogin _facebookLogin = FacebookLogin();

  /// Facebook Log In Functionality
  Future<void> facebookLogIn(BuildContext context) async {
    try {
      /// First Check already Facebook Signed In or not
      if (!await _facebookLogin.isLoggedIn) {
        final FacebookLoginResult _fbLogInResult =
            await _facebookLogin.logIn(customPermissions: ['email']);

        /// If user not choose any Facebook account, nothing to do here
        if (_fbLogInResult != null && _fbLogInResult.accessToken != null) {
          final OAuthCredential _oAuthCredential =
              FacebookAuthProvider.credential(_fbLogInResult.accessToken.token);

          /// If Already Sign In with other Firebase Auth Credentials Sign out out at first
          if (FirebaseAuth.instance.currentUser != null)
            FirebaseAuth.instance.signOut();

          /// Make UserCredential(Which Contains User Data)
          final UserCredential fbUser =
              await FirebaseAuth.instance.signInWithCredential(_oAuthCredential);

          /// Navigate to the Display Screen with user data
          Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                  builder: (_) => DisplayUserData(
                      userName: fbUser.additionalUserInfo.profile['name'],
                      userEmail: fbUser.additionalUserInfo.profile['email'],
                      userProfilePicUrl: fbUser.additionalUserInfo
                          .profile['picture']['data']['url'])));
        }
      } else {
        /// If Already Logged In, make log out and reLogIn
        print('Already Fb Logged In');
        await logOut();
        await facebookLogIn(context);
      }
    } catch (e) {
      print('Facebook Log In Error: ${e.toString()}');

      /// If User Mail registered with other credentials warns the user
      if (e.toString().contains(
          '[firebase_auth/account-exists-with-different-credential] An account already exists with the same email address but different sign-in credentials'))
        showErrorMessage(context);
    }
  }

  Future<void> logOut() async {
    try {
      if (await _facebookLogin.isLoggedIn) {
        await _facebookLogin.logOut();/// Sign Out from Facebook Auth
        await FirebaseAuth.instance.signOut();/// Sign out from FirebaseAuth.instance
      }
    } catch (e) {
      print('Facebook Log out Error: ${e.toString()}');
    }
  }

  /// This is for check through if user Logged in through through google or not
  Future<bool> fbSignInCredentialCheck() async {
    try{
      if (await _facebookLogin.isLoggedIn) return true;
      return false;
    }catch(e){
      return false;
    }
  }
}
