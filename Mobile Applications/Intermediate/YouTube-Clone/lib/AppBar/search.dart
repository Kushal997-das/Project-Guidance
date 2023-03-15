import 'package:flutter/material.dart';

class SearchView extends StatelessWidget {
  const SearchView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const TextField(
          decoration: InputDecoration(
            hintText: "Search YouTube",
            border: OutlineInputBorder(),
          ),
          autofocus: true,
          textInputAction: TextInputAction.search,
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.keyboard_voice_rounded),
          )
        ],
      ),
    );
  }
}
