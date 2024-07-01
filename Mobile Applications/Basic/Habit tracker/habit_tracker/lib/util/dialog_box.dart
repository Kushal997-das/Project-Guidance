import 'package:flutter/material.dart';
import 'package:habit_tracker/util/button.dart';

class DialogBox extends StatelessWidget {
  final controller;
  VoidCallback onSave;
  VoidCallback onCancel;
  DialogBox({super.key, required this.controller,
  required this.onSave, required this.onCancel});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: Colors.purple[100],
      content: SizedBox(
        height: 150,
        width: 100,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            TextField(
              controller: controller,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  //borderRadius: BorderRadius.circular(15),
                ),
                hintText: 'Enter task!'
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
                child: Row(
                  children: [
                    MyButton(text: 'Save', onPressed: onSave),
                    const Padding(padding: EdgeInsetsDirectional.symmetric(horizontal: 18)),
                    MyButton(text: 'Cancel', onPressed: onCancel),
                  ],
                ),
              ),
          ]
            ),
        ),
      );
  }
}