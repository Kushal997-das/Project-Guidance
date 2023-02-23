import 'package:flutter/material.dart';
import 'package:youtube_clone/AppBar/account_info.dart';
import 'package:youtube_clone/AppBar/notifications.dart';
import 'package:youtube_clone/AppBar/search.dart';
import 'package:youtube_clone/BottomNavigationBar/home.dart';
import 'package:youtube_clone/BottomNavigationBar/library.dart';
import 'package:youtube_clone/BottomNavigationBar/shorts.dart';
import 'package:youtube_clone/BottomNavigationBar/subscriptions.dart';
import 'package:youtube_clone/IconsFile/youtube_icons.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        appBarTheme: const AppBarTheme(
          color: Colors.white,
          foregroundColor: Colors.black,
        ),
        brightness: Brightness.light,
        primaryColor: Colors.white,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
      ),
      debugShowCheckedModeBanner: false,
      home: const MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);
  static bool showAppbar = false;
  @override
  State<MainPage> createState() => _MainPage();
}

class _MainPage extends State<MainPage> {
  int _cIndex = 0;
  void _incrementTab(index) {
    setState(() {
      _cIndex = index;
    });
  }

  final _pages = <Widget>[
    const HomeView(),
    const ShortsView(),
    const HomeView(),
    const SubscriptionsView(),
    const LibraryView(),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MainPage.showAppbar
          ? null
          : AppBar(
              elevation: 0,
              leading: Image.asset(
                'assets/logos/youtube-logo.png',
              ),
              leadingWidth: 60,
              title: Text("YouTube",
                  style: Theme.of(context).appBarTheme.titleTextStyle),
              actions: <Widget>[
                IconButton(
                  onPressed: () {
                    showDialog(
                        context: context,
                        builder: (context) {
                          return alertDialog;
                        });
                  },
                  icon: const Icon(Icons.cast_outlined),
                  iconSize: 30,
                ),
                IconButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (BuildContext context) {
                        return const NotificationsView();
                      }),
                    );
                  },
                  icon: const Icon(Icons.notifications_outlined),
                  iconSize: 30,
                ),
                IconButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (BuildContext context) {
                          return const SearchView();
                        },
                      ),
                    );
                  },
                  icon: const Icon(Icons.search),
                  iconSize: 30,
                ),
                IconButton(
                  onPressed: () {
                    Navigator.of(context).push(
                        MaterialPageRoute(builder: (BuildContext context) {
                      return const AccountDetailsView();
                    }));
                  },
                  icon: const Icon(Icons.account_circle),
                  iconSize: 30,
                ),
              ],
            ),
      body: _pages[_cIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _cIndex,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(YouTubeIcons.shorts),
            label: 'Shorts',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_circle_outline, size: 45),
            label: "",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.subscriptions_outlined),
            label: 'Subscription',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.video_library_sharp),
            label: 'Library',
          ),
        ],
        onTap: (index) {
          if (index == 1) {
            MainPage.showAppbar = true;
          } else {
            MainPage.showAppbar = false;
          }
          if (index == 2) {
            showModalBottomSheet(
                context: context,
                builder: (context) {
                  return SizedBox(
                      height: 300,
                      child: Column(
                        children: const <Widget>[
                          Padding(
                            padding: EdgeInsets.all(10),
                            child: Text(
                              "Create",
                              textAlign: TextAlign.right,
                              style: TextStyle(fontSize: 25),
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.all(10),
                            child: createShort,
                          ),
                          Padding(
                            padding: EdgeInsets.all(10),
                            child: uploadVideo,
                          ),
                          Padding(
                            padding: EdgeInsets.all(10),
                            child: goLive,
                          ),
                        ],
                      ));
                });

            index = 0;
          }
          _incrementTab(index);
        },
      ),
    );
  }
}

const Widget createShort = ListTile(
  leading: Icon(
    YouTubeIcons.shorts,
    size: 50,
  ),
  title: Text(
    "  Create a Short",
    style: TextStyle(fontSize: 18),
  ),
);
const Widget uploadVideo = ListTile(
  leading: Icon(
    YouTubeIcons.uploadvideo,
    size: 50,
  ),
  title: Text(
    "  Upload a video",
    style: TextStyle(fontSize: 18),
  ),
);
const Widget goLive = ListTile(
  leading: Icon(
    YouTubeIcons.golive,
    size: 50,
  ),
  title: Text(
    "  Go Live",
    style: TextStyle(fontSize: 18),
  ),
);

final Widget alertDialog = AlertDialog(
    title: const Text("Connect to a device"),
    content: SizedBox(
      height: 170,
      child: Column(
        children: const [
          ListTile(
            leading: CircularProgressIndicator(),
            title: Text("Searching for devices"),
          ),
          ListTile(
            leading: Icon(Icons.phonelink),
            title: Text("Link with TV code"),
          ),
          ListTile(
            leading: Icon(Icons.info),
            title: Text("Learn More"),
          )
        ],
      ),
    ));
