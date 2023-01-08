import 'package:flutter/material.dart';

class PageThird extends StatelessWidget {
  const PageThird({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ShaderMask(
            shaderCallback: (rect) {
              return const LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.black, Colors.transparent],
              ).createShader(Rect.fromLTRB(0, 0, rect.width, rect.height*.6));
            },
            blendMode: BlendMode.dstIn,
            child: Image.asset(
                'assets/images/netflix_bg.jpg',
                height: MediaQuery.of(context).size.height,
                fit: BoxFit.cover,
                alignment: Alignment.centerRight*.5
            )
        ),
        Column(
          children: [
            SizedBox(
              height: MediaQuery.of(context).size.height*.5,
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width*.15),
              child: const Text(
                "No annoying contracts",
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.bold
                ),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 20,),
            Container(
              padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width*.15),
              child: Text(
                "Join today, cancel at any time.",
                style: TextStyle(
                  color: Colors.white.withOpacity(.7),
                  fontSize: 16,
                ),
                textAlign: TextAlign.center,
              ),
            )
          ],
        )
      ],
    );
  }
}
