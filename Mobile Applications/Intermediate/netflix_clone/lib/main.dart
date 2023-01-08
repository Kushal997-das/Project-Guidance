import 'package:flutter/material.dart';
import 'package:netflix_clone/screens/get_started/get_started.dart';
import 'package:netflix_clone/screens/main_pages/home_page/homepage.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: GetStarted(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xff0c0c0c),
      child: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/images/netflix_logo.png',
              width: MediaQuery.of(context).size.width*.65,
            ),
            // getProgressBar()
          ],
        ),
      ),
    );
  }

  getProgressBar() {
    return const CircularProgressIndicator(color: Color(0xffe50914),);
  }
}