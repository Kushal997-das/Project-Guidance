import 'package:flutter/material.dart';
import 'package:netflix_clone/screens/main_pages/home_page/homepage.dart';

class SignIn extends StatelessWidget {
  const SignIn({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff0c0c0c),
      appBar: AppBar(
          backgroundColor: const Color(0xff0c0c0c),
          elevation: 0,
          title: Image.asset(
            'assets/images/netflix_logo.png',
            width: 120,
          )),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        scrollDirection: Axis.vertical,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 100),
          child: Column(
            children: [
              TextFormField(
                cursorColor: Colors.white,
                style: const TextStyle(color: Colors.white, fontSize: 16),
                decoration: InputDecoration(
                  contentPadding: const EdgeInsets.all(20),
                  filled: true,
                  fillColor: Colors.grey.withOpacity(.2),
                  labelText: 'Email or phone number',
                  focusedBorder: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10))),
                  border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10))),
                  labelStyle: TextStyle(
                    color: Colors.white.withOpacity(.7),
                    fontSize: 16,
                  ),
                ),
              ),
              const SizedBox(
                height: 16,
              ),
              TextFormField(
                style: const TextStyle(color: Colors.white, fontSize: 16),
                obscureText: true,
                cursorColor: Colors.white,
                decoration: InputDecoration(
                  contentPadding: const EdgeInsets.all(20),
                  filled: true,
                  fillColor: Colors.grey.withOpacity(.2),
                  labelText: 'Password',
                  focusedBorder: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10))),
                  border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10))),
                  labelStyle: TextStyle(
                      color: Colors.white.withOpacity(.7), fontSize: 16),
                ),
              ),
              const SizedBox(
                height: 34,
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const HomePage()),
                  );
                },
                style: ElevatedButton.styleFrom(
                    elevation: 0,
                    fixedSize: const Size(double.maxFinite, 60),
                    primary: Colors.transparent,
                    shape: const RoundedRectangleBorder(
                        side: BorderSide(color: Colors.white, width: 2),
                        borderRadius: BorderRadius.all(Radius.circular(10)))),
                child: const Text(
                  "Sign In",
                  style: TextStyle(color: Colors.white, fontSize: 16),
                ),
              ),
              const SizedBox(
                height: 30,
              ),
              TextButton(
                  onPressed: () {},
                  child: Text(
                    'Need help?',
                    style: TextStyle(
                        color: Colors.white.withOpacity(.5),
                        fontSize: 14,
                        fontWeight: FontWeight.w500),
                  )
              ),
              TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: Text(
                    'New to Netflix? Sign up now.',
                    style: TextStyle(
                        color: Colors.white.withOpacity(.7),
                        fontSize: 14,
                        fontWeight: FontWeight.w500),
                  )
              ),
              TextButton(
                  onPressed: () {},
                  child: Text(
                    "Sign-in is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.",
                    style: TextStyle(
                        color: Colors.white.withOpacity(.3),
                        fontSize: 12,
                  ),
                    textAlign: TextAlign.center,
              ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
