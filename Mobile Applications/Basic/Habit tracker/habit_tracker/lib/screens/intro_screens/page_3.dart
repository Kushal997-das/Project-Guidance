
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class Intro3 extends StatefulWidget {
  const Intro3({super.key});

  @override
  State<Intro3> createState() => _Intro3State();
}

class _Intro3State extends State<Intro3> {
  bool _isVisible3 = false;

@override
void initState() {
    super.initState();
    // Delayed visibility of the text
    Future.delayed(const Duration(seconds: 1), () {
      setState(() {
        _isVisible3 = true;
      });
    });
  }
  @override
  Widget build(BuildContext context) {
    return Container (
      color: Colors.pink[100],
      child: Stack (
        children : [
          Center(
            child: Lottie.asset(
              'assets/ani3.json',
              height: 200,
              width: 200,
              fit: BoxFit.contain,
            )
          ),
          AnimatedPositioned(
            duration: const Duration(seconds: 1),
            curve: Curves.easeInOut,
            top: _isVisible3 ? 600 : 5, // Initial and final position of the text
            left: 0,
            right: 0,
            child: AnimatedOpacity(
              duration: const Duration(milliseconds: 500), // Fade in duration
              opacity: _isVisible3 ? 1.0 : 0.0, // Fade in the text
              child: const Center(
                child: Text(
                  'Start your journey towards success today',
                  style: TextStyle(
                    fontSize: 22,
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
        ]
      )
    );
  }
}
