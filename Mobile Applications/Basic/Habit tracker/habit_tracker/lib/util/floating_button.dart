import 'package:flutter/material.dart';
import 'package:habit_tracker/util/dialog_box.dart';

class myFloatingButton extends StatelessWidget {
  final void Function()? onPressed;
  const myFloatingButton({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      shape: CircleBorder(),
      onPressed: onPressed,
      child: Icon(Icons.add,
      ),
      );

  }
}