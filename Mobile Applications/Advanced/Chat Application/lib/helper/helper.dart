// ignore_for_file: camel_case_types

import 'package:shared_preferences/shared_preferences.dart';

class helpermethod {
  static String sharedpreferencesloggedin = "ISLOGGEDIN";
  static String sharedpreferenceusername = "USERNAMEKEY";
  static String sharedpreferenceemail = "USEREMAIL";

  static Future<bool> saveuserloggedinsharedpreference(bool isuserloggedin) async {
    SharedPreferences pre = await SharedPreferences.getInstance();
    return await pre.setBool(sharedpreferencesloggedin, isuserloggedin);
  }

  static Future<bool> saveusernameloggedinsharedpreference(String username) async {
    SharedPreferences pre = await SharedPreferences.getInstance();
    return await pre.setString(sharedpreferenceusername, username);
  }

  static Future<bool> saveemailloggedinsharedpreference(String email) async {
    SharedPreferences pre = await SharedPreferences.getInstance();
    return await pre.setString(sharedpreferenceemail, email);
  }

  static Future<bool?> getuserloggedinsharedpreference() async {
    SharedPreferences pre = await SharedPreferences.getInstance();
    return pre.getBool(sharedpreferencesloggedin);
  }

  static Future<String?> getusernameloggedinsharedpreference() async {
    SharedPreferences pre = await SharedPreferences.getInstance();
    return pre.getString(sharedpreferenceusername);
  }

  static Future<String?> getemailloggedinsharedpreference() async {
    SharedPreferences pre = await SharedPreferences.getInstance();
    return pre.getString(sharedpreferenceemail);
  }
}