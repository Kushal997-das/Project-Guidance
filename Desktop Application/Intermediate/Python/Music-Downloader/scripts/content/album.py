import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
import json

from ..download_manager import Manager

class Album():
    def __init__(self, proxies, headers, url=None):
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        self.proxies = proxies
        self.headers = headers
        self.albumID = None
        self.songs_json = []
        self.album_name = ''
        self.url = url

    def getAlbumID(self, url=None):
        if url:
            input_url = url
        else:
            input_url = self.url
        token = input_url.split("/")[-1]
        input_url = "https://www.jiosaavn.com/api.php?__call=webapi.get&token={0}&type=album&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0".format(token)
        try:
            res = requests.get(input_url, proxies=self.proxies, headers=self.headers)
        except Exception as e:
            print('Error accessing website error: {0}'.format(e))
            exit()
        try:
            content_json = res.json()
            self.albumID = content_json["id"]
        except Exception as e:
            print("Unable to get albumID: {0}".format(e))
        return self.albumID
    
    def setAlbumID(self, albumID):
        self.albumID = albumID
    
    def getAlbum(self, albumID=None):
        if albumID is None:
            albumID = self.albumID
        response = requests.get(
            'https://www.jiosaavn.com/api.php?_format=json&__call=content.getAlbumDetails&albumid={0}'.format(albumID),
            verify=False, proxies=self.proxies, headers=self.headers)
        if response.status_code == 200:
            self.songs_json = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
            self.songs_json = json.loads(self.songs_json)
            print("Album name: ",self.songs_json["name"])
            self.album_name=self.songs_json["name"]
            self.album_name = self.album_name.replace("&quot;", "'")
        return self.songs_json, self.album_name
    
    def downloadAlbum(self, artist_name=''):
        if self.albumID is not None:
            print("Initiating Album Download")
            manager = Manager()
            self.getAlbum()
            if artist_name:
                manager.downloadSongs(self.songs_json, self.album_name, artist_name=artist_name)
            else:
                manager.downloadSongs(self.songs_json, self.album_name)
    
    def start_download(self):
        self.getAlbumID()
        self.downloadAlbum()