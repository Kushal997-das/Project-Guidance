import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class Intro2 extends StatefulWidget {
  const Intro2({super.key});

  @override
  State<Intro2> createState() => _Intro2State();
}

class _Intro2State extends State<Intro2> {
  bool _isVisible2 = false;

  @override
  void initState() {
    super.initState();
    // Delayed visibility of the text
    Future.delayed(const Duration(seconds: 1), () {
      setState(() {
        _isVisible2 = true;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.greenAccent,
      child: Stack( // Wrap with Stack
        children: [
          Center(
            child: Lottie.asset(
              'assets/ani2.json',
              height: 300,
              width: 300,
              fit: BoxFit.contain,
            ),
          ),
          AnimatedPositioned(
            duration: const Duration(seconds: 1),
            curve: Curves.easeInOut,
            top: _isVisible2 ? 600 : 50, // Initial and final position of the text
            left: 0,
            right: 0,
            child: AnimatedOpacity(
              duration: const Duration(milliseconds: 500), // Fade in duration
              opacity: _isVisible2 ? 1.0 : 0.0, // Fade in the text
              child: const Center(
                child: Text(
                  'Take small steps to a better you',
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