import 'package:flutter/material.dart';

class LibraryView extends StatelessWidget {
  const LibraryView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: <Widget>[
          history,
          videos,
          yourVideosdownloads,
          playlist,
        ],
      ),
    );
  }
}

final Widget history = ListTile(
  leading: const Icon(Icons.history),
  title: const Text("History"),
  trailing: TextButton(
    onPressed: () {},
    child: const Text("VIEW ALL"),
  ),
);

//history videos slider
final Widget videos = SizedBox(
  height: 175,
  child: ListView.builder(
    itemExtent: 175,
    itemCount: 5,
    scrollDirection: Axis.horizontal,
    itemBuilder: (context, index) {
      return Column(
        children: [
          thumbnail,
          textUnderThumbnail,
        ],
      );
    },
  ),
);

final Widget thumbnail = Image.asset(
  'assets/images/flutter.png',
  width: 150,
  height: 100,
);
const Widget textUnderThumbnail = ListTile(
  title: Text("Title"),
  subtitle: Text("Subtitle"),
  trailing: Icon(Icons.more_vert),
);

//bottom list tiles 1
final Widget yourVideosdownloads = Column(
  children: const [
    ListTile(
      leading: Icon(Icons.smart_display),
      title: Text("Your Videos"),
    ),
    ListTile(
      leading: Icon(Icons.download),
      title: Text("Downloads"),
      subtitle: Text("20 recommendations"),
      trailing: Icon(Icons.check_circle),
    ),
    ListTile(
      leading: Icon(Icons.local_movies),
      title: Text("Your movies"),
    ),
  ],
);

//bottom list tiles 2
final Widget playlist = Column(
  children: [
    ListTile(
      title: const Text("Playlists"),
      trailing: IconButton(
        icon: const Icon(Icons.arrow_drop_down),
        onPressed: () {},
      ),
    ),
    const ListTile(
      leading: Icon(
        Icons.add,
        color: Colors.blue,
      ),
      textColor: Colors.blue,
      title: Text("New playlist"),
    ),
    const ListTile(
      leading: Icon(
        Icons.watch_later,
      ),
      title: Text("Watch Later"),
      subtitle: Text("2 videos"),
    ),
    const ListTile(
      leading: Icon(Icons.thumb_up),
      title: Text("Liked videos"),
      subtitle: Text("2543 videos"),
    )
  ],
);
