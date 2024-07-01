import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class Intro1 extends StatefulWidget {
  const Intro1({super.key});

  @override
  State<Intro1> createState() => _Intro1State();
}

class _Intro1State extends State<Intro1> {
  bool _isVisible = false;

  @override
  void initState() {
    super.initState();
    // Delayed visibility of the text
    Future.delayed(const Duration(seconds: 1), () {
      setState(() {
        _isVisible = true;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.blue[300],
      child: Stack( // Wrap with Stack
        children: [
          Center(
            child: Lottie.asset(
              'assets/ani1.json',
              height: 300,
              width: 300,
              fit: BoxFit.contain,
            ),
          ),
          AnimatedPositioned(
            duration: const Duration(seconds: 1),
            curve: Curves.easeInOut,
            top: _isVisible ? 200 : 400, // Initial and final position of the text
            left: 0,
            right: 0,
            child: AnimatedOpacity(
              duration: const Duration(milliseconds: 500), // Fade in duration
              opacity: _isVisible ? 1.0 : 0.0, // Fade in the text
              child: const Center(
                child: Text(
                  'Welcome to Habit Tracker!',
                  style: TextStyle(
                    fontSize: 24,
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}