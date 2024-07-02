import 'package:flutter/material.dart';
import 'package:flutter_heatmap_calendar/flutter_heatmap_calendar.dart';
import 'package:habit_tracker/datetime/date_time.dart';

class MonthlySummary extends StatelessWidget {
  final Map<DateTime, int>? datasets;
  final String startDate;

  const MonthlySummary({
    super.key,
    required this.datasets,
    required this.startDate,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 25, bottom: 25),
      child: HeatMap(
        startDate: createDateTimeObject(startDate),
        endDate: DateTime.now().add(Duration(days: 0)),
        datasets: datasets,
        colorMode: ColorMode.color,
        defaultColor: Colors.grey[200],
        textColor: Colors.white,
        showColorTip: false,
        showText: true,
        scrollable: true,
        size: 30,
        colorsets: const {
  1: Color.fromARGB(20, 128, 0, 128),   // Light purple (similar to purple[100])
  2: Color.fromARGB(40, 128, 0, 128),
  3: Color.fromARGB(60, 128, 0, 128),
  4: Color.fromARGB(80, 128, 0, 128),
  5: Color.fromARGB(100, 128, 0, 128),
  6: Color.fromARGB(120, 128, 0, 128),
  7: Color.fromARGB(150, 128, 0, 128),
  8: Color.fromARGB(180, 128, 0, 128),
  9: Color.fromARGB(220, 128, 0, 128),
  10: Color.fromARGB(255, 128, 0, 128),  // Dark purple (similar to purple[400])
},
        onClick: (value) {
          ScaffoldMessenger.of(context)
              .showSnackBar(SnackBar(content: Text(value.toString())));
        },
      ),
    );
  }
}