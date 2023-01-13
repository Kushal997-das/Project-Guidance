import 'package:flutter/material.dart';
import 'package:netflix_clone/screens/main_pages/home_page/homepage.dart';

class SignUp extends StatelessWidget {
  const SignUp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        padding: const EdgeInsets.symmetric(horizontal: 25),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 75),
                    child: IconButton(
                        onPressed: (){
                          Navigator.pop(context);
                        }, icon: const Icon(Icons.close, size: 30,),
                    ),                  
                  )
                ],
            ),
            const SizedBox(
              height: 60,
            ),
            const Text("Ready to watch?",
            style: TextStyle(
              color: Colors.black,
              fontSize: 28,
              fontWeight: FontWeight.w500
            ),
            ),
            const SizedBox(
              height: 20,
            ),
            Text("Enter your email to create or sign in to your account.",
              style: TextStyle(
                  color: Colors.black.withOpacity(.7),
                  fontSize: 16,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(
              height: 40,
            ),
            TextFormField(
              style: const TextStyle(fontSize: 16),
              cursorColor: Colors.black,
              decoration: const InputDecoration(
                contentPadding:  EdgeInsets.all(20),
                filled: true,
                fillColor: Colors.white,
                labelText: 'Enter you email',
                focusedBorder:  OutlineInputBorder(
                  borderSide: BorderSide(
                    color: Colors.blue
                  )
                ),
                border: OutlineInputBorder(),
                labelStyle: TextStyle(fontSize: 16),
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const HomePage()),
                );
              },
              style: ElevatedButton.styleFrom(
                fixedSize: const Size(double.maxFinite, 54),
                  primary: const Color(0xffe50914),
                  elevation: 0,
                  padding: const EdgeInsets.symmetric(vertical: 12)),
              child: const Text(
                "GET STARTED",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w300),
              ),
            ),
          ],
        ),
      )
    );
  }
}
