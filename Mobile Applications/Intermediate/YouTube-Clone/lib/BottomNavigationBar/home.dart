import 'package:flutter/material.dart';
import '../Controllers/appbar_controller.dart';

class HomeView extends StatefulWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: listView,
    );
  }
}

final Widget thumbnail = Container(
  color: Colors.teal,
  child: Image.asset('assets/images/flutter.png'),
);
const Widget title = ListTile(
  leading: Icon(
    Icons.account_circle,
    size: 45,
  ),
  title: Text(
    "Title Here",
    style: TextStyle(fontSize: 18),
  ),
  subtitle: Text(
    "Subtitle Here",
    style: TextStyle(fontSize: 12),
  ),
);

final Widget listView = ListView.separated(
  controller: AppbarController.scrollController,
  itemCount: 3,
  itemBuilder: (context, index) {
    return Column(
      children: [thumbnail, title],
    );
  },
  separatorBuilder: (context, index) {
    return const Divider(
      height: 10,
      thickness: 1,
      color: Colors.grey,
    );
  },
);
