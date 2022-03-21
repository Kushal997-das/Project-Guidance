import 'package:flutter/material.dart';
import './downloader_class.dart';
import 'package:webview_flutter/webview_flutter.dart';

class Browse extends StatefulWidget {
  @override
  _BrowseState createState() => _BrowseState();
}

class _BrowseState extends State<Browse> {
  int _itag = 22;
  final link = "https://m.youtube.com";
  WebViewController? _controller;
  bool _showDownloadButton = false;
  void checkURL() async {
    if (await _controller!.currentUrl() == "https://m.youtube.com/") {
      setState(() {
        _showDownloadButton = false;
      });
    } else {
      setState(() {
        _showDownloadButton = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    checkURL();
    return WillPopScope(
        child: Scaffold(
          body: WebView(
            javascriptMode: JavascriptMode.unrestricted,
            initialUrl: link,
            onWebViewCreated: (controller) {
              setState(() {
                _controller = controller;
              });
            },
          ),
          floatingActionButton: _showDownloadButton == false
              ? Container()
              : FloatingActionButton(
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) =>
                          _buildPopupDialog(context),
                    );
                  },
                  child: const Icon(Icons.download),
                  backgroundColor: Colors.red[800],
                ),
        ),
        onWillPop: () async {
          if (await _controller!.canGoBack()) {
            _controller!.goBack();
          }
          return false;
        });
  }

  Widget _buildPopupDialog(BuildContext context) {
    return AlertDialog(
      title: const Text('Select quality'),
      content: StatefulBuilder(
          builder: (BuildContext context, StateSetter setState) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
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
              onPressed: () async {
                final url = await _controller!.currentUrl();
                final title = await _controller!.getTitle();
                Download().downloadVideo(url!, title!, _itag);
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
        );
      }),
      actions: [
        FlatButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          textColor: Theme.of(context).primaryColor,
          child: const Text('Close'),
        ),
      ],
    );
  }
}
