import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:youtube_clone/main.dart';

class AppbarController extends StatefulWidget {
  const AppbarController({Key? key}) : super(key: key);
  static ScrollController scrollController = ScrollController();
  @override
  State<AppbarController> createState() => _AppbarControllerState();
}

class _AppbarControllerState extends State<AppbarController> {
  bool isScrollingDown = false;
  @override
  void initState() {
    super.initState();
    AppbarController.scrollController.addListener(
      () {
        if (AppbarController.scrollController.position.userScrollDirection ==
            ScrollDirection.reverse) {
          if (!isScrollingDown) {
            isScrollingDown = true;
            MainPage.showAppbar = false;
            setState(() {});
          }
        }
        if (AppbarController.scrollController.position.userScrollDirection ==
            ScrollDirection.forward) {
          if (isScrollingDown) {
            isScrollingDown = false;
            MainPage.showAppbar = true;
            setState(() {});
          }
        }
      },
    );
  }

  @override
  void dispose() {
    AppbarController.scrollController.dispose();
    AppbarController.scrollController.removeListener(() {});
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold();
  }
}
