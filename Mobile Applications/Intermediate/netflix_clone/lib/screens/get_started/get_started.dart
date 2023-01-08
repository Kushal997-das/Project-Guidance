import 'package:flutter/material.dart';
import 'package:netflix_clone/screens/get_started/pages/page1.dart';
import 'package:netflix_clone/screens/get_started/pages/page2.dart';
import 'package:netflix_clone/screens/get_started/pages/page3.dart';
import 'package:netflix_clone/screens/get_started/pages/page4.dart';
import 'package:netflix_clone/screens/get_started/signin/sign_in.dart';
import 'package:netflix_clone/screens/get_started/signup/sign_up.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

class GetStarted extends StatefulWidget {
  const GetStarted({Key? key}) : super(key: key);

  @override
  State<GetStarted> createState() => _GetStartedState();
}

class _GetStartedState extends State<GetStarted> {
  final PageController _controller = PageController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff0c0c0c),
      body: Stack(
        children: [
          PageView(
            controller: _controller,
            children: const [
              PageFirst(),
              PageSecond(),
              PageThird(),
              PageFourth(),
            ],
          ),
          ShaderMask(
            shaderCallback: (rect) {
              return const LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.black, Colors.transparent],
              ).createShader(Rect.fromLTRB(0, 0, rect.width, rect.height));
            },
            blendMode: BlendMode.dstIn,
            child: Container(
              color: Colors.black,
              height: MediaQuery.of(context).size.height * .2,
            ),
          ),
          Container(
            padding: const EdgeInsets.only(top: 38, left: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Image.asset(
                  'assets/images/netflix_symbol.png',
                  height: 84,
                ),
                Row(
                  children: [
                    TextButton(
                        onPressed: () {},
                        child: const Text(
                          "PRIVACY",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.w500),
                        )),
                    TextButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => const SignIn()),
                          );
                        },
                        child: const Text(
                          "SIGN IN",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.w500),
                        )),
                    IconButton(
                        onPressed: () {},
                        icon: Icon(
                          Icons.more_vert_outlined,
                          color: Colors.grey.withOpacity(.75),
                        ))
                  ],
                )
              ],
            ),
          ),
          Container(
              alignment: Alignment.bottomCenter * .96,
              child: SmoothPageIndicator(
                controller: _controller,
                count: 4,
                effect: ColorTransitionEffect(
                    spacing: 8,
                    dotHeight: 6,
                    dotWidth: 6,
                    dotColor: Colors.grey.withOpacity(.5),
                    activeDotColor: Colors.white),
              )),
        ],
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 12),
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const SignUp()),
            );
          },
          style: ElevatedButton.styleFrom(
              primary: const Color(0xffe50914),
              elevation: 0,
              padding: const EdgeInsets.symmetric(vertical: 12)),
          child: const Text(
            "GET STARTED",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.w300),
          ),
        ),
      ),
    );
  }
}
