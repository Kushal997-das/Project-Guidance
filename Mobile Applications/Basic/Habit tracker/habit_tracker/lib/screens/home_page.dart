import 'package:flutter/material.dart';
import 'package:habit_tracker/data/habit_database.dart';
import 'package:habit_tracker/data/monthly_summary.dart';
import 'package:habit_tracker/util/button.dart';
import 'package:habit_tracker/util/dialog_box.dart';
import 'package:habit_tracker/util/floating_button.dart';
import 'package:habit_tracker/util/habit_tile.dart';
import 'package:hive/hive.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  HabitDatabase db = HabitDatabase();
  final _myBox = Hive.box("HABIT_DATABASE");

  @override
  void initState() {
    // if app first runs, check this
    if (_myBox.get("CURRENT_HABITLIST") == null) {
      db.createDefaultData();
    } else {
      // else, load data
      db.loadData();
    }
    // update database
    db.updateDatabase();

    super.initState();
  }

  // to toggle checkbox value
  void toggleFunction(bool? value, int index) {
    setState(() {
      db.todaysHabitList[index][1] = value;
    });
    db.updateDatabase();
  }

  // to edit habit name
  void editHabit(int index, String habitName) {
    _newHabitNameController.text = habitName;
    showDialog(
      context: context,
      builder: (context) {
        return DialogBox(
          controller: _newHabitNameController,
          onSave: () => saveExistingHabit(index),
          onCancel: cancelHabit,
        );
      },
    );
  }

  // save edited habit
  void saveExistingHabit(int index) {
    setState(() {
      db.todaysHabitList[index][0] = _newHabitNameController.text;
    });
    _newHabitNameController.clear();
    Navigator.of(context).pop();
    db.updateDatabase();
  }

  // to delete habit
  void deleteHabit(int index) {
    showDialog(
      context: context, 
      builder: (BuildContext context) {
        return AlertDialog(
        backgroundColor: Colors.purple[100],
        title: Padding(
          padding: const EdgeInsets.all(8.0),
          child: const Text("Are you sure you want to delete this habit?",
          style: TextStyle(fontSize: 20)),
        ),
        actions: [
          Center(
          child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
            child: MyButton(
              text: "Cancel",
              onPressed: cancelHabit,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
            child: MyButton(
              text: "Delete",
              onPressed: () {
                setState(() {
                  db.todaysHabitList.removeAt(index);
                });
                Navigator.of(context).pop(); // Close the dialog after deletion
              },
            ),
          ),
        ],
      ),
    ),
  ],
);
      }
      );
    db.updateDatabase();
  }

  // save habit
  void saveHabit() {
    setState(() {
      db.todaysHabitList.add([_newHabitNameController.text, false]);
      _newHabitNameController.clear();
    });
    Navigator.of(context).pop();
    db.updateDatabase();
  }

  // cancel a habit
  void cancelHabit() {
    _newHabitNameController.clear();
    Navigator.of(context).pop();
  }

  // create a new habit
  final _newHabitNameController = TextEditingController();
  void createNewHabit() {
    showDialog(
      context: context,
      builder: (context) {
        return DialogBox(
          controller: _newHabitNameController,
          onSave: saveHabit,
          onCancel: cancelHabit,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.purple[400],
      floatingActionButton: myFloatingButton(
        onPressed: () => createNewHabit(),
      ),
      body: ListView(
        children: [
          // monthly summary heat map
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              children: [
                MonthlySummary(
                  datasets: db.heatMapDataSet,
                  startDate: _myBox.get("START_DATE"),)
              ],
            ),
          ),
          // list of habits
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: db.todaysHabitList.length,
            itemBuilder: (context, index) {
              return HabitTile(
                habitName: db.todaysHabitList[index][0],
                habitCompleted: db.todaysHabitList[index][1],
                onChanged: (value) => toggleFunction(value, index),
                editButton: (context) => editHabit(index, db.todaysHabitList[index][0]),
                deleteButton: (context) => deleteHabit(index),
              );
            },
          ),
        ],
      ),
      
    );
  }
}