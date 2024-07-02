import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';

class HabitTile extends StatelessWidget {
  final String habitName;
  final bool habitCompleted;
  final Function(bool?)? onChanged;
  final void Function(BuildContext)? editButton;
  final void Function(BuildContext)? deleteButton;

  const HabitTile({super.key,
  required this.habitName,
  required this.habitCompleted,
  required this.onChanged,
  required this.editButton,
  required this.deleteButton,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Slidable(
        endActionPane: ActionPane(
          motion: StretchMotion(),
          children: [
    
            //delete button
            SlidableAction(onPressed: deleteButton,
            backgroundColor: Colors.red,
            icon: Icons.delete,
            borderRadius: BorderRadius.circular(12),
            ),
          ]
          
          ),
          startActionPane: ActionPane(
            motion: StretchMotion(), 
            children: [

              //edit habit
            SlidableAction(onPressed:editButton,
            backgroundColor: Colors.green,
            icon: Icons.edit,
            borderRadius: BorderRadius.circular(12),
            ),

            ]),
        child: Container(
          padding: EdgeInsets.all(24),
          decoration: BoxDecoration(color:Colors.purple[100],
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            //checkbox
            Checkbox(value: habitCompleted, onChanged: onChanged),
        
            //habit name
            Text(habitName),
          ],
        ),
            ),
      ));
  }
}