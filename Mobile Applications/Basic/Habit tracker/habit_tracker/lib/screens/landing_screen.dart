import 'package:flutter/material.dart';
import 'package:habit_tracker/screens/home_page.dart';
import 'package:habit_tracker/screens/intro_screens/page_1.dart';
import 'package:habit_tracker/screens/intro_screens/page_2.dart';
import 'package:habit_tracker/screens/intro_screens/page_3.dart';
import 'package:hive/hive.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

class LandingScreen extends StatefulWidget {
  const LandingScreen({super.key});

  @override
  State<LandingScreen> createState() => _LandingScreenState();
}
//page controller
PageController _controller = PageController();

//keep track if we are on last page or not
bool onLastPage = false;

class _LandingScreenState extends State<LandingScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          PageView(
            controller: _controller,
            onPageChanged: (index) {
              setState(() {
                onLastPage = (index ==2);
              });
            },
        children: const [
          Intro1(),
          Intro2(),
          Intro3(),
        ]
      ),
        //dot indicators
        Container(
          alignment: const Alignment(0, 0.9),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              //skip
              
              GestureDetector(
                onTap: () {
                  _controller.jumpToPage(2);
                },
                child: const Text("Skip")),

              //dot indicator
              SmoothPageIndicator(
                controller: _controller,
                count: 3,
                effect: const JumpingDotEffect(),
                ),

              //next or done
              onLastPage
              ? GestureDetector(
              onTap: () {
                Navigator.push(context,
                MaterialPageRoute(builder: (context) {
                  return const HomePage();
                },
                ),
                );
                },
              child: const Text('Done'),
              )
              : GestureDetector(
              onTap: () {
                  _controller.nextPage(
                    duration: const Duration(milliseconds: 500),
                    curve: Curves.easeIn);
                },
              child: const Text('Next'),
              )
            ],
          ),
        )
        
        ],
      )
    );
  }
}