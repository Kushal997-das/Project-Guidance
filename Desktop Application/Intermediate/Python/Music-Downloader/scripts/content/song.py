import requests
import json


from ..helper import setProxy, argManager
from ..download_manager import Manager

class Song():
    def __init__(self, proxies, headers, url=None):
        self.session = requests.session()
        self.session.headers.update(headers)
        self.session.proxies.update(proxies)
        self.payload = {
                '_marker': '0',
                'cc': '',
                'pids': None,
                'ctx': 'android',
                'network_operator': '',
                'v': '224',
                'app_version': '6.8.2',
                'build': 'Pro',
                'api_version': '4',
                'network_type': 'WIFI',
                '_format': 'json',
                '__call': 'song.getDetails',
                'manufacturer': 'Samsung',
                'readable_version': '6.8.2',
                'network_subtype': '',
                'model': 'Samsung Galaxy S10'
            }
        self.args = argManager()
        self.url = url
        self.songID = None
        self.song_json = None

    def setSongID(self, song_id):
        self.songID = song_id

    def getSongID(self):
        if self.url:
            input_url = self.url
        else:
            input_url = input("Enter the URL : ")
        token = input_url.split("/")[-1]
        input_url = "https://www.jiosaavn.com/api.php?__call=webapi.get&token={0}&type=song&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0".format(token)
        response = self.session.get(input_url)
        try:
            self.songID = response.json()["songs"][0]["id"]
            return self.songID
        except Exception as e:
            print("Unable to get the song from URL")
            print(e)
            exit()

    def getSong(self, song_id=None):
        if song_id is None:
            self.payload["pids"] = self.getSongID()
        else:
            self.payload["pids"] = song_id
        url = "https://www.jiosaavn.com/api.php" # POST request
        response = self.session.post(url, data=self.payload)
        try:
            song_json = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
            self.song_json = json.loads(song_json)
        except Exception as e:
            print("An error occured getting the song information")
            print(e)
        finally:
            return self.song_json

    def downloadSong(self, album_name='songs', artist_name='Non-Artist'):
        manager = Manager()
        song = self.song_json[self.songID]
        try:
            dec_url = manager.get_dec_url(song["more_info"]['encrypted_media_url'])
            filename = manager.format_filename(song['title'])
        except Exception as e:
            print('Download Error : {0}'.format(e))
        try:
            location = manager.get_download_location(artist_name, album_name, filename)
            has_downloaded = manager.start_download(filename, location, dec_url)
            if has_downloaded:
                name = song.get('subtitle', '')
                try:
                    song["song"] = song["title"]
                    song["primary_artists"] = song["more_info"]["artistMap"]["primary_artists"][0]["name"]
                    song["album"] = song["more_info"]["album"]
                    song["singers"] = ", ".join([artist["name"] for artist in song["more_info"]["artistMap"]["primary_artists"]])
                    song["music"] = song["more_info"]["music"]
                    song["starring"] = ""
                    song["label"] = song["more_info"]["label"]
                except Exception as e:
                    print("Error creating song tag information")
                    print(e)
                manager.addtags(location, song, name)
                print('\n')
        except Exception as e:
            print('Download Error : {0}'.format(e))

    def start_download(self):
        self.getSongID()
        self.getSong()
        self.downloadSong()


if __name__ == '__main__':
    pass