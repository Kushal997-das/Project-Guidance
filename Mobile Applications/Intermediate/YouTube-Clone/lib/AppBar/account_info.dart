import 'package:flutter/material.dart';

class AccountDetailsView extends StatefulWidget {
  const AccountDetailsView({Key? key}) : super(key: key);

  @override
  State<AccountDetailsView> createState() => _AccountDetailsViewState();
}

class _AccountDetailsViewState extends State<AccountDetailsView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        leading: GestureDetector(
          child: IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: const Icon(
              Icons.close,
              size: 30,
            ),
          ),
        ),
      ),
      body: ListView(
        children: [
          yourChannel,
          const Divider(
            thickness: 3,
          ),
          purchases,
          const Divider(
            thickness: 3,
          ),
          settings,
          const Divider(
            thickness: 3,
          ),
          youtubeApps,
        ],
      ),
      bottomNavigationBar: const Text(
        "Privacy Policy . Terms of Service",
        textAlign: TextAlign.center,
      ),
    );
  }
}

final Widget yourChannel = Column(
  children: [
    const ListTile(
      leading: Icon(Icons.account_circle),
      title: Text("Gaurav Patil"),
      trailing: Icon(Icons.navigate_next),
    ),
    TextButton(
      onPressed: () {},
      child: const Text("Manage your Google Account"),
    ),
    const ListTile(
      leading: Icon(Icons.account_box),
      title: Text("Your Channel"),
    ),
    const ListTile(
      leading: Icon(Icons.add),
      title: Text("Turn on Incognito"),
    ),
    const ListTile(
      leading: Icon(Icons.person_add),
      title: Text("Add account"),
    ),
  ],
);
final Widget purchases = Column(
  children: const [
    ListTile(
      leading: Icon(Icons.smart_display),
      title: Text("Get YouTube Premium"),
    ),
    ListTile(
      leading: Icon(Icons.monetization_on),
      title: Text("Purchases and memberships"),
    ),
    ListTile(
      leading: Icon(Icons.stacked_bar_chart),
      title: Text("Time watched"),
    ),
    ListTile(
      leading: Icon(Icons.security),
      title: Text("Your data in YouTube"),
    ),
  ],
);

final Widget settings = Column(
  children: const [
    ListTile(
      leading: Icon(Icons.settings),
      title: Text("Settings"),
    ),
    ListTile(
      leading: Icon(Icons.help),
      title: Text("Help and feedback"),
    ),
  ],
);

final Widget youtubeApps = Column(
  children: [
    ListTile(
      leading: Image.asset(
        'assets/logos/youtube-studio.png',
        height: 40,
        width: 40,
      ),
      title: const Text("YouTube Studio"),
    ),
    ListTile(
      leading: Image.asset(
        'assets/logos/youtube-music.png',
        height: 40,
        width: 40,
      ),
      title: const Text("YouTube Music"),
    ),
    ListTile(
      leading: Image.asset(
        'assets/logos/youtube-kids.png',
        height: 40,
        width: 40,
      ),
      title: const Text("YouTube Kids"),
    ),
  ],
);
