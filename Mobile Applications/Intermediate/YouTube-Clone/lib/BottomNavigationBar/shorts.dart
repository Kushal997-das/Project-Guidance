import 'package:flutter/material.dart';
import 'package:youtube_clone/AppBar/search.dart';
import 'package:youtube_clone/IconsFile/youtube_icons.dart';

class ShortsView extends StatefulWidget {
  const ShortsView({Key? key}) : super(key: key);

  @override
  State<ShortsView> createState() => _ShortsViewState();
}

class _ShortsViewState extends State<ShortsView> {
  Color _iconColorLike = Colors.white;
  Color _iconColorDislike = Colors.white;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        toolbarOpacity: 1,
        actions: [
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
          ),
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.camera_alt),
          ),
        ],
      ),
      body: Stack(
        children: <Widget>[
          shortsVideo,
          Positioned(
            bottom: 10,
            right: 10,
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 2),
                  child: Column(
                    children: [
                      IconButton(
                        onPressed: () {
                          setState(
                            () {
                              if (_iconColorLike == Colors.white &&
                                  _iconColorDislike == Colors.white) {
                                _iconColorLike = Colors.blue;
                              } else if (_iconColorLike == Colors.white &&
                                  _iconColorDislike == Colors.blue) {
                                _iconColorDislike = Colors.white;
                                _iconColorLike = Colors.blue;
                              } else if (_iconColorLike == Colors.blue) {
                                _iconColorLike = Colors.white;
                              }
                            },
                          );
                        },
                        icon: Icon(
                          Icons.thumb_up,
                          color: _iconColorLike,
                        ),
                        iconSize: 30,
                      ),
                      const Text("35K"),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 2),
                  child: Column(
                    children: [
                      IconButton(
                        onPressed: () {
                          setState(
                            () {
                              if (_iconColorDislike == Colors.white &&
                                  _iconColorLike == Colors.white) {
                                _iconColorDislike = Colors.blue;
                              } else if (_iconColorDislike == Colors.white &&
                                  _iconColorLike == Colors.blue) {
                                _iconColorLike = Colors.white;
                                _iconColorDislike = Colors.blue;
                              } else if (_iconColorDislike == Colors.blue) {
                                _iconColorDislike = Colors.white;
                              }
                            },
                          );
                        },
                        icon: Icon(
                          Icons.thumb_down,
                          color: _iconColorDislike,
                        ),
                        iconSize: 30,
                      ),
                      const Text("Dislike"),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 2),
                  child: Column(
                    children: [
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(Icons.comment),
                        iconSize: 30,
                      ),
                      const Text("88"),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 2),
                  child: Column(
                    children: [
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(YouTubeIcons.forward),
                        iconSize: 30,
                      ),
                      const Text("Share"),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 2),
                  child: IconButton(
                    onPressed: () {},
                    icon: const Icon(Icons.more_horiz),
                    iconSize: 30,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 3),
                  child: SizedBox(
                    width: 40,
                    child: Image.asset('assets/gifs/sound.gif'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

final Widget shortsVideo = Align(
  alignment: Alignment.bottomCenter,
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.stretch,
    children: <Widget>[
      Padding(
        padding: const EdgeInsets.only(top: 110),
        child: Image.asset('assets/gifs/cars1.gif'),
      ),
      const Padding(
        padding: EdgeInsets.only(top: 10),
        child: Text(
          "    Video title #tag1 #tag2 #tag3",
          style: TextStyle(fontSize: 15),
        ),
      ),
      ListTile(
        leading: const Icon(Icons.account_circle),
        title: Row(
          children: [
            const Text("Youtube account  "),
            ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  primary: Colors.red,
                ),
                child: const Text("Subscribe")),
          ],
        ),
      ),
    ],
  ),
);
