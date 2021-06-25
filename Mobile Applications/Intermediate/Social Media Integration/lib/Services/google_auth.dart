import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

import 'package:social_media_integration/screens/display_screen.dart';
import 'error_msg.dart';

class GoogleAuth {
  /// Make Object of Google Sign In
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  /// Google Log In Functionality
  Future<void> googleLogIn({@required BuildContext context}) async {
    try {
      /// First Check already Google Signed In or not
      if (!await _googleSignIn.isSignedIn()) {
        final GoogleSignInAccount _googleSignInAccount =
            await _googleSignIn.signIn();

        /// If user not choose any google account, nothing to do here
        if (_googleSignInAccount == null) {
          print('Google Sign-In Not Completed');
        } else {
          /// Make Object for Google Sign In Authentication
          final GoogleSignInAuthentication _googleAuth =
              await _googleSignInAccount.authentication;

          /// Make object fot oAuthCredential for take information about accessToken and idToken
          final OAuthCredential _oAuthCredential =
              GoogleAuthProvider.credential(
            accessToken: _googleAuth.accessToken,
            idToken: _googleAuth.idToken,
          );

          /// If Already Sign In with other Firebase Auth Credentials Sign out out at first
          if (FirebaseAuth.instance.currentUser != null)
            FirebaseAuth.instance.signOut();

          /// Make UserCredential(Which Contains User Data)
          final UserCredential _userCredential = await FirebaseAuth.instance
              .signInWithCredential(_oAuthCredential);

          /// Navigate to the Display Screen with user data
          Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                  builder: (_) => DisplayUserData(
                      userName: _userCredential.user.displayName,
                      userEmail: _userCredential.user.email,
                      userProfilePicUrl: _userCredential.user.photoURL)));
        }
      } else {
        /// If Already Logged In, make log out and reLogIn
        print('Already Signed In');
        await googleLogOut();
        await googleLogIn(context: context);
      }
    } catch (e) {
      print('Google Sign in Error: ${e.toString()}');

      /// If User Mail registered with other credentials warns the user
      if (e.toString().contains(
          '[firebase_auth/account-exists-with-different-credential] An account already exists with the same email address but different sign-in credentials'))
        showErrorMessage(context);
    }
  }

  Future<void> googleLogOut() async {
    try {
      await _googleSignIn.disconnect();/// Disconnect from google sign in
      await _googleSignIn.signOut();/// Sign Out from Google Auth
      if (FirebaseAuth.instance.currentUser != null)
        FirebaseAuth.instance.signOut();/// Sign out from FirebaseAuth.instance
    } catch (e) {
      print('Google Log out Error: ${e.toString()}');
    }
  }

  /// This is for check through if user Logged in through through google or not
  Future<bool> googleSignInAuthCredentialCheck() async {
    try {
      if (await _googleSignIn.isSignedIn()) return true;
      return false;
    } catch (e) {
      return false;
    }
  }
}
