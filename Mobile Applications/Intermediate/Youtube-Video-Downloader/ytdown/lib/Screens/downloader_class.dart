import 'package:flutter_youtube_downloader/flutter_youtube_downloader.dart';

class Download {
  Future<void> downloadVideo(
      String? youTubeLink, String? title, int? itag) async {
    await FlutterYoutubeDownloader.downloadVideo(youTubeLink!, title!, itag);
  }
}
