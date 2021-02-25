import 'package:sqflite/sqflite.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

// Some of Functions I made here at the time of debugging...
// Code Has no effect on that...
// I will soon removed the unusable functions

class DatabaseHelper {
  // Database Columns
  String _colName = "name";
  String _colPwd = "password";
  String _colPoints = "points";
  String _colLevels = "levels";
  String _colTotalPromoDoro = "totalPromoDoroCounter";
  String _colPromoDoro1Counter = "PromoDoroCounter1";
  String _colPromoDoro2Counter = "PromoDoroCounter2";
  String _colPromoDoro3Counter = "PromoDoroCounter3";
  String _colPromoDoro4Counter = "PromoDoroCounter4";

  // Application variables
  static String tableName = 'storeInformation';

  // Create Singleton Objects(Only Created once in the whole application)
  static DatabaseHelper _databaseHelper;
  static Database _database;

  // Instantiate the obj
  DatabaseHelper._createInstance();

  // For access Singleton object
  factory DatabaseHelper() {
    if (_databaseHelper == null)
      _databaseHelper = DatabaseHelper._createInstance();
    return _databaseHelper;
  }

  Future<Database> get database async {
    if (_database == null) _database = await initializeDatabase();
    return _database;
  }

  // For make a database
  Future<Database> initializeDatabase() async {
    // Get the directory path to store the database
    Directory directory = await getApplicationDocumentsDirectory();
    String path = directory.path + 'storeData.db';

    // create the database
    var getDatabase =
        await openDatabase(path, version: 1, onCreate: _createTable);
    return getDatabase;
  }

  // For make a table
  void _createTable(Database db, int newVersion) async {
    await db.execute(
        'CREATE TABLE $tableName($_colName TEXT, $_colPwd TEXT, $_colPoints INTEGER, $_colLevels INTEGER, $_colTotalPromoDoro INTEGER, $_colPromoDoro1Counter INTEGER, $_colPromoDoro2Counter INTEGER, $_colPromoDoro3Counter INTEGER, $_colPromoDoro4Counter INTEGER)');
  }

  // Insert Data to the Table
  Future<int> insertData(String _name, String _pwd) async {
    Database db = await this.database;
    var map = Map<String, dynamic>();
    map[_colName] = _name;
    map[_colPwd] = _pwd;
    map[_colPoints] = 0;
    map[_colLevels] = 0;
    map[_colTotalPromoDoro] = 0;
    map[_colPromoDoro1Counter] = 0;
    map[_colPromoDoro2Counter] = 0;
    map[_colPromoDoro3Counter] = 0;
    map[_colPromoDoro4Counter] = 0;
    var result = await db.insert(tableName, map);
    return result;
  }

  // Data Fetching to validate
  Future<List<Map<String, dynamic>>> inputDataCheckingWithNameAndPassword(
      String _name, String _pwd) async {
    Database db = await this.database;

    var result = await db.rawQuery(
        "SELECT $_colName, $_colPwd FROM $tableName WHERE $_colName = '$_name' AND $_colPwd = '$_pwd'");
    return result;
  }

  // User Name fetch to validate
  Future<List<Map<String, dynamic>>> userNameChecking(String _name) async {
    Database db = await this.database;

    var result = await db.rawQuery(
        "SELECT $_colName FROM $tableName WHERE $_colName = '$_name'");
    return result;
  }

  // Data Fetching to validate
  Future<List<Map<String, dynamic>>> allDataChecking() async {
    Database db = await this.database;

    var result = await db.rawQuery("SELECT * FROM $tableName");
    return result;
  }

  // Data Fetching to see the result
  Future<List<Map<String, dynamic>>> allDataFetching(String _userName) async {
    Database db = await this.database;
    try {
      var result = await db.rawQuery(
          "SELECT * FROM $tableName WHERE ${this._colName} = '$_userName'");
      return result;
    } catch (e) {
      return null;
    }
  }

  // Update Details
  void updateSettings(
      String _oldUserName, String _newUserName, String _passwordIs) async {
    Database db = await this.database;
    List<Map<String, dynamic>> result;

    if (_passwordIs == "")
      result = await db.rawQuery(
          "UPDATE $tableName SET $_colName = '$_newUserName' WHERE $_colName = '$_oldUserName'");
    else
      result = await db.rawQuery(
          "UPDATE $tableName SET $_colName = '$_newUserName', $_colPwd = '$_passwordIs' WHERE $_colName = '$_oldUserName'");
  }

  // Update Points of a Particular User
  void updatePoints(String _userName, int _newPoints) async {
    Database db = await this.database;
    var result = await db.rawQuery(
        "UPDATE $tableName SET $_colPoints = $_newPoints WHERE $_colName = '$_userName'");
  }

  // Update Levels of a Particular User
  void updateLevels(String _userName, int _newLevels) async {
    Database db = await this.database;
    var result = await db.rawQuery(
        "UPDATE $tableName SET $_colLevels = $_newLevels WHERE $_colName = '$_userName'");
  }

  // Update PromoDoro Counter
  void updateCounter(
      String _userName, int _promoDoroNumber, int _promoDoroValue) async {
    Database db = await this.database;
    switch (_promoDoroNumber) {
      case 1:
        List<Map<String, dynamic>> result = await db.rawQuery(
            "SELECT $_colPromoDoro1Counter FROM $tableName WHERE $_colName = '$_userName'");
        result[0].forEach((key, value) async {
          await db.rawQuery(
              "UPDATE $tableName SET $_colPromoDoro1Counter = ${value + 1} WHERE $_colName = '$_userName'");
        });
        break;
      case 2:
        List<Map<String, dynamic>> result = await db.rawQuery(
            "SELECT $_colPromoDoro2Counter FROM $tableName WHERE $_colName = '$_userName'");
        result[0].forEach((key, value) async {
          await db.rawQuery(
              "UPDATE $tableName SET $_colPromoDoro2Counter = ${value + 1} WHERE $_colName = '$_userName'");
        });
        break;
      case 3:
        List<Map<String, dynamic>> result = await db.rawQuery(
            "SELECT $_colPromoDoro3Counter FROM $tableName WHERE $_colName = '$_userName'");
        result[0].forEach((key, value) async {
          await db.rawQuery(
              "UPDATE $tableName SET $_colPromoDoro3Counter = ${value + 1} WHERE $_colName = '$_userName'");
        });
        break;
      case 4:
        List<Map<String, dynamic>> result = await db.rawQuery(
            "SELECT $_colPromoDoro4Counter FROM $tableName WHERE $_colName = '$_userName'");
        result[0].forEach((key, value) async {
          await db.rawQuery(
              "UPDATE $tableName SET $_colPromoDoro4Counter = ${value + 1} WHERE $_colName = '$_userName'");
        });
        break;
    }

    List<Map<String, dynamic>> result = await db.rawQuery(
        "SELECT $_colTotalPromoDoro FROM $tableName WHERE $_colName = '$_userName'");

    result[0].forEach((key, value) async {
      await db.rawQuery(
          "UPDATE $tableName SET $_colTotalPromoDoro = ${value + 1} WHERE $_colName = '$_userName'");
    });
  }

  // get All PomoDoro Counter and Total Specific Value
  Future<Map<String, dynamic>> getCounter(String _userName) async {
    Database db = await this.database;

    List<Map<String, dynamic>> valueTake = await db.rawQuery(
        "SELECT $_colPromoDoro1Counter,$_colPromoDoro2Counter,$_colPromoDoro3Counter,$_colPromoDoro4Counter,$_colTotalPromoDoro FROM $tableName WHERE $_colName = '$_userName'");
    return valueTake[0];
  }

  // Get Points of a particular user
  Future<List<Map<String, dynamic>>> getPoints(String _userName) async {
    Database db = await this.database;
    var result = await db.rawQuery(
        "SELECT $_colPoints FROM $tableName WHERE $_colName = '$_userName'");
    return result;
  }

  // Get Levels of a particular user
  Future<List<Map<String, dynamic>>> getLevels(String _userName) async {
    Database db = await this.database;
    var result = await db.rawQuery(
        "SELECT $_colLevels FROM $tableName WHERE $_colName = '$_userName'");
    return result;
  }

  // Delete All the record for the database
  void deleteData() async {
    Database db = await this.database;
    await db.rawQuery("DELETE FROM $tableName");
  }
}
