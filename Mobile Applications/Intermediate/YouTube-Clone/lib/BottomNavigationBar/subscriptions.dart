import 'package:flutter/material.dart';

class SubscriptionsView extends StatelessWidget {
  const SubscriptionsView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: 1,
        itemBuilder: (context, index) {
          return Column(
            children: [
              accountsView,
              referenceTab,
              videoView,
              videoView,
              videoView,
            ],
          );
        },
      ),
    );
  }
}

//for account icons
final Widget accountIcon = IconButton(
  onPressed: () {},
  icon: const Icon(Icons.account_circle),
  iconSize: 60,
);
final Widget accountsView = SizedBox(
    width: 500,
    height: 105,
    child: ListView.builder(
        itemCount: 6,
        scrollDirection: Axis.horizontal,
        itemBuilder: ((context, index) {
          return Column(
            children: [
              accountIcon,
              const Text("Account"),
            ],
          );
        })));

//for references tab
final Widget referenceTab = SizedBox(
    width: 500,
    height: 60,
    child: ListView.separated(
      itemCount: 5,
      scrollDirection: Axis.horizontal,
      itemBuilder: (context, index) {
        return Column(
          children: [
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                primary: Colors.transparent,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(50),
                ),
              ),
              child: const Text(
                "Reference 1",
                style: TextStyle(fontSize: 15),
              ),
            )
          ],
        );
      },
      separatorBuilder: (context, index) {
        return const Divider();
      },
    ));

//for below videos
final Widget thumbnailScreen = Container(
  //width: 400,
  //height: 160,
  color: Colors.teal,
  child: Image.asset('assets/images/flutter.png'),
);
const Widget thumbnailTitle = ListTile(
  leading: Icon(
    Icons.account_circle,
    size: 45,
  ),
  title: Text("Title Here", style: TextStyle(fontSize: 18)),
  subtitle: Text(
    "Subtitle Here",
    style: TextStyle(fontSize: 12),
  ),
);
final Widget videoView = SizedBox(
  // width: 400,
  child: Column(
    children: [thumbnailScreen, thumbnailTitle],
  ),
);
