import 'package:firebase_auth/firebase_auth.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mychatapp/models/user.dart';

class AuthMethod {

  final FirebaseAuth _auth = FirebaseAuth.instance;

  User1? _userfromFirebase(User user) {
    return User1(user.uid); 
  }

  Future signinwithemailpassword(String email,String password) async {
    try{
      UserCredential result = await _auth.signInWithEmailAndPassword(email: email, password: password);
      User? user = result.user;
      return _userfromFirebase(user!);
    }catch (e){
      Fluttertoast.showToast(msg: e.toString());
    }
    return null;
  }

  Future signupwithemailpassword(String email,String password) async{
    try{
      UserCredential result = await _auth.createUserWithEmailAndPassword(email: email, password: password);
      User? user = result.user;
      return _userfromFirebase(user!);
    } catch(e) {
      Fluttertoast.showToast(msg: e.toString());
    }
    return null;
  }

  Future resetpassword(String email) async {
    try{
      return await _auth.sendPasswordResetEmail(email: email);
    }catch(e) {
      Fluttertoast.showToast(msg: e.toString());
    }
    return null;
  }

  Future signout() async {
    try {
      return await _auth.signOut();
    } catch (e) {
      Fluttertoast.showToast(msg: e.toString());
    }
    return null;
  }
}