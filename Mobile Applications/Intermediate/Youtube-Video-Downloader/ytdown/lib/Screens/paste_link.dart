import 'package:flutter/material.dart';
import './downloader_class.dart';

class PasteLink extends StatefulWidget {
  @override
  _PasteLinkState createState() => _PasteLinkState();
}

class _PasteLinkState extends State<PasteLink> {
  TextEditingController _textController = TextEditingController();
  int _itag = 22;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextFormField(
              controller: _textController,
              decoration: const InputDecoration(
                labelText: "Paste link here",
                icon: Icon(Icons.paste),
              ),
            ),
            ListTile(
              title: const Text('HD'),
              leading: Radio<int>(
                value: 22,
                groupValue: _itag,
                onChanged: (int? value) {
                  setState(() {
                    _itag = value!;
                  });
                },
              ),
            ),
            ListTile(
              title: const Text('480p'),
              leading: Radio<int>(
                value: 59,
                groupValue: _itag,
                onChanged: (int? value) {
                  setState(() {
                    _itag = value!;
                  });
                },
              ),
            ),
            ListTile(
              title: const Text('1080p Video only'),
              leading: Radio<int>(
                value: 248,
                groupValue: _itag,
                onChanged: (int? value) {
                  setState(() {
                    _itag = value!;
                  });
                },
              ),
            ),
            ListTile(
              title: const Text('1080p Video only'),
              leading: Radio<int>(
                groupValue: _itag,
                value: 303,
                onChanged: (int? value) {
                  setState(() {
                    _itag = value!;
                  });
                },
              ),
            ),
            ListTile(
              title: const Text('1080p Video only'),
              leading: Radio<int>(
                groupValue: _itag,
                value: 399,
                onChanged: (int? value) {
                  setState(() {
                    _itag = value!;
                  });
                },
              ),
            ),
            ListTile(
              title: const Text('Audio only'),
              leading: Radio<int>(
                value: 251,
                groupValue: _itag,
                onChanged: (int? value) {
                  setState(() {
                    _itag = value!;
                  });
                },
              ),
            ),
            ElevatedButton(
              onPressed: () {
                if (_textController.text.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("No link pasted")));
                } else {
                  Download().downloadVideo(_textController.text,
                      _textController.text.substring(17), _itag);
                }
              },
              style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(Colors.red[600])),
              child: Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(20),
                margin: const EdgeInsets.all(20),
                width: double.infinity,
                color: Colors.red[800],
                child: const Text(
                  'Download',
                  style: TextStyle(fontSize: 20, color: Colors.white),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
