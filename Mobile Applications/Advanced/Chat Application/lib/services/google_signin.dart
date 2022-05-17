import 'package:firebase_auth/firebase_auth.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_sign_in/google_sign_in.dart';

  final googlesignin = GoogleSignIn();
  GoogleSignInAccount? acc;
  GoogleSignInAccount get user => acc!;

Future googleSignIn() async {
    try {
      final googleuser = await GoogleSignIn().signIn();
      if(googleuser == null) return;
      acc = googleuser;
      final googleauth = await googleuser.authentication;
      
      final credential = GoogleAuthProvider.credential(
        accessToken: googleauth.accessToken,
        idToken: googleauth.idToken,
      );
      await FirebaseAuth.instance.signInWithCredential(credential);
    } catch (e) {
      Fluttertoast.showToast(msg: e.toString());
    }
}

Future logout() async {
    await googlesignin.disconnect();
}