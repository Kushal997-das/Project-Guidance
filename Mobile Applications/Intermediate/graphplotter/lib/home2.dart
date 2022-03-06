import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';


class Home2 extends StatefulWidget {

  final List<Data> e1;
  // ignore: use_key_in_widget_constructors
  const Home2(this.e1);

  @override
  _Home2State createState() => _Home2State();
}

    TextEditingController x = TextEditingController();
    TextEditingController y = TextEditingController();

class _Home2State extends State<Home2> {
    late List<Data> _data;
    late TooltipBehavior _tooltip;
    
  
    @override
  void initState() {
    _data = getdata();
    _tooltip = TooltipBehavior(enable: true);
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
            body: SfCartesianChart(
              title: ChartTitle(text: "Graph"),
              tooltipBehavior: _tooltip,
              series: <ChartSeries>[
                LineSeries<Data,double>(
                dataSource: _data, 
                xValueMapper: (Data data,_) => data.time, 
                yValueMapper: (Data data,_) => data.expense,
                dataLabelSettings: const DataLabelSettings(isVisible: true)
                )
              ],
              primaryXAxis: NumericAxis(edgeLabelPlacement: EdgeLabelPlacement.shift),
              primaryYAxis: NumericAxis(edgeLabelPlacement: EdgeLabelPlacement.shift),
            ),
        ),
      );
  }
  List<Data> getdata() {
    return widget.e1;
  }
}

class Data {
  Data (this.expense,this.time);
  final double expense;
  final double time;
}
