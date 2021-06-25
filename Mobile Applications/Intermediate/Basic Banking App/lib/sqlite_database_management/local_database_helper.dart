import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class LocalStorageHelper {
  /// Database Name
  final String _databaseName = 'basic_banking_app_data_storage.db';

  /// Table Name
  final String _userDataTable = 'Users_Data_Store';
  final String _transactionTable = 'Transaction_Table';

  /// Database Columns For User Table Name
  final String _colUserName = 'user_name';
  final String _colEmail = 'user_mail';
  final String _colCurrBal = 'user_balance';

  /// Database Columns for Transaction Table
  final String _colDebitedAccEmail = 'debited_email';
  final String _colDebitedAccName = 'debited_name';
  final String _colCreditedAccEmail = 'credited_email';
  final String _colCreditedAccName = 'credited_name';
  final String _colTransactionAmount = 'transacted_amount';

  /// Create Singleton Objects(Only Created once in the whole application)
  static LocalStorageHelper _localStorageHelper;
  static Database _database;

  /// Instantiate the obj
  LocalStorageHelper._createInstance();

  /// For access Singleton object
  factory LocalStorageHelper() {
    if (_localStorageHelper == null)
      _localStorageHelper = LocalStorageHelper._createInstance();
    return _localStorageHelper;
  }

  Future<Database> get database async {
    if (_database == null) _database = await initializeDatabase();
    return _database;
  }

  /// For make a database
  Future<Database> initializeDatabase() async {
    /// Get the directory path to store the database

    final Directory directory = await getExternalStorageDirectory();
    print('Directory Path: ${directory.path}');

    final Directory newDirectory =
        await Directory(directory.path + '/.Databases/').create();
    final String path = newDirectory.path + '/${this._databaseName}';

    // create the database
    final Database getDatabase = await openDatabase(path, version: 1);
    return getDatabase;
  }

  /// For Current user and connections general data to store
  /// General Data Plays a Huge role for managing interaction with connections

  /// Create Table for User Data Store
  Future<void> createTableToStoreUserData() async {
    try {
      final Database db = await this.database;

      await db.execute(
          'CREATE TABLE ${this._userDataTable}($_colUserName TEXT, $_colEmail TEXT PRIMARY KEY, $_colCurrBal TEXT)');
    } catch (e) {
      print('Error: Store User Data Error: Already Table Created');
    }
  }

  /// Insert Data for User Data Store
  Future<bool> insertUserDataToTable(
      {@required String userName,
      @required String userEmail,
      @required String userInitialBalance}) async {
    try {
      final Database db = await this.database;

      final Map<String, Object> map = Map<String, Object>();

      map[this._colUserName] = userName;
      map[this._colEmail] = userEmail;
      map[this._colCurrBal] = userInitialBalance;

      final int result = await db.insert(this._userDataTable, map);

      print('User Table Data insertion Result : $result');

      return result > 0 ? true : false;
    } catch (e) {
      print('Error: Insert Data Error in User Data Table: ${e.toString()}');
      return false;
    }
  }

  /// Take it out all data from User Data Table
  Future<List<Map<String, Object>>> extractDataFromUserStoredData() async {
    try {
      final Database db = await this.database;

      final List<Map<String, Object>> result =
          await db.rawQuery('SELECT * FROM ${this._userDataTable}');

      return result == null ? [] : result;
    } catch (e) {
      print(
          'Error: Extract Data from User Stored Table Error: ${e.toString()}');
      return [];
    }
  }

  /// After Account Balance After Transactions
  Future<bool> updateAccountBalance(
      {@required String updatedBal, @required String userEmail}) async {
    try {
      final Database db = await this.database;

      final int result = await db.rawUpdate(
          "UPDATE ${this._userDataTable} SET ${this._colCurrBal} = '$updatedBal' WHERE ${this._colEmail} = '$userEmail'");

      print('Update Result: $result');

      return result > 0 ? true : false;
    } catch (e) {
      print('Error: Update Account Balance Error: ${e.toString()}');
      return false;
    }
  }

  /// User Data Extract
  Future<String> extractCurrAmountOrCurrUserName(String userMail,
      {String purpose = 'Balance'}) async {
    try {
      final Database db = await this.database;

      List<Map<String, Object>> result;

      if (purpose == 'Balance')
        result = await db.rawQuery(
            "SELECT $_colCurrBal FROM $_userDataTable WHERE $_colEmail = '$userMail'");
      else
        result = await db.rawQuery(
            "SELECT $_colUserName FROM $_userDataTable WHERE $_colEmail = '$userMail'");

      return purpose == 'Balance'
          ? result[0][_colCurrBal].toString()
          : result[0][_colUserName].toString();
    } catch (e) {
      print('Error Extract Current amount or Current User: ${e.toString()}');
      return '';
    }
  }

  /// Table for Live Transaction
  Future<void> createTableForLiveTransactions() async {
    try {
      final Database db = await this.database;

      await db.execute(
          'CREATE TABLE ${this._transactionTable}($_colCreditedAccEmail TEXT, $_colCreditedAccName TEXT, $_colDebitedAccEmail TEXT, $_colDebitedAccName TEXT, $_colTransactionAmount TEXT)');
    } catch (e) {
      print('Error: Create Table For Transaction Error}');
    }
  }

  /// Insert Data in the Transaction Table
  Future<bool> insertDataInTransactionTable(
      {@required String creditedEmail,
      @required String creditedName,
      @required String debitedEmail,
      @required String debitedName,
      @required String transactedAmount}) async {
    try {
      final Database db = await this.database;

      final Map<String, Object> map = Map<String, Object>();

      map[this._colDebitedAccName] = debitedName;
      map[this._colDebitedAccEmail] = debitedEmail;
      map[this._colCreditedAccName] = creditedName;
      map[this._colCreditedAccEmail] = creditedEmail;

      final int result = await db.insert(this._transactionTable, map);

      print('Transaction Table Data Insertion Result: $result');

      return result > 0 ? true : false;
    } catch (e) {
      print('Error: Insert Data in Transaction Table: ${e.toString()}');
      return false;
    }
  }

  Future<List<Map<String, Object>>> extractDataFromTransactionTable() async {
    try {
      final Database db = await this.database;

      final List<Map<String, Object>> result =
          await db.rawQuery('SELECT * FROM ${this._transactionTable}');

      print('Transaction Extracted Result is: $result');

      return result == null ? [] : result;
    } catch (e) {
      print(
          'Error: Extract Data from Transaction Table Error: ${e.toString()}');
      return [];
    }
  }
}
