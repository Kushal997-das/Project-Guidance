import 'package:flutter/material.dart';
import 'package:youtube_clone/main.dart';
import 'package:youtube_clone/AppBar/search.dart';

class NotificationsView extends StatelessWidget {
  const NotificationsView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text("Notifications"),
        actions: [
          IconButton(
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return alertDialog;
                },
              );
            },
            icon: const Icon(
              Icons.cast_outlined,
            ),
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
          ),
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.more_vert),
          ),
        ],
      ),
      body: ListView(
        children: [
          Row(
            children: [
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  primary: Colors.transparent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(50),
                  ),
                ),
                child: const Text("All"),
              ),
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  primary: Colors.transparent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(50),
                  ),
                ),
                child: const Text("Mentions"),
              )
            ],
          ),
          thisWeek,
          older
        ],
      ),
    );
  }
}

final Widget thisWeek = Column(
  children: [
    const ListTile(
      title: Text("This Week"),
    ),
    ListTile(
      leading: const Icon(Icons.account_circle),
      title: const Text("Video Name"),
      subtitle: const Text("5 days ago"),
      trailing: IconButton(
        onPressed: () {},
        icon: const Icon(Icons.more_vert),
      ),
    ),
    ListTile(
      leading: const Icon(Icons.account_circle),
      title: const Text("Video Name"),
      subtitle: const Text("7 days ago"),
      trailing: IconButton(
        onPressed: () {},
        icon: const Icon(Icons.more_vert),
      ),
    ),
    ListTile(
      leading: const Icon(Icons.account_circle),
      title: const Text("Video Name"),
      subtitle: const Text("11 days ago"),
      trailing: IconButton(
        onPressed: () {},
        icon: const Icon(Icons.more_vert),
      ),
    ),
    ListTile(
      leading: const Icon(Icons.account_circle),
      title: const Text("Video Name"),
      subtitle: const Text("13 days ago"),
      trailing: IconButton(
        onPressed: () {},
        icon: const Icon(Icons.more_vert),
      ),
    ),
  ],
);

final Widget older = Column(
  children: [
    const ListTile(
      title: Text("Older"),
    ),
    ListTile(
      leading: const Icon(Icons.account_circle),
      title: const Text("Video Name"),
      subtitle: const Text("21 days ago"),
      trailing: IconButton(
        onPressed: () {},
        icon: const Icon(Icons.more_vert),
      ),
    ),
    ListTile(
      leading: const Icon(Icons.account_circle),
      title: const Text("Video Name"),
      subtitle: const Text("25 days ago"),
      trailing: IconButton(
        onPressed: () {},
        icon: const Icon(Icons.more_vert),
      ),
    ),
    ListTile(
      leading: const Icon(Icons.account_circle),
      title: const Text("Video Name"),
      subtitle: const Text("27 days ago"),
      trailing: IconButton(
        onPressed: () {},
        icon: const Icon(Icons.more_vert),
      ),
    ),
  ],
);
