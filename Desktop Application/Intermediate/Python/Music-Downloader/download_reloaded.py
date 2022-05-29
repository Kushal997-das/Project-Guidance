from bs4 import BeautifulSoup
import requests

from scripts.helper import argManager, setProxy, scan_url
from scripts.content.playlist import Playlist
from scripts.content.album import Album
from scripts.content.artist import Artist
from scripts.content.song import Song
from scripts.saavnaccount import Account

class Download():
    def __init__(self):
        urls = []

    def read_urls(self, filepath):
        urls = []
        with open(filepath, "r") as fh:
            for line in fh:
                url = line.strip()
                if url:
                    urls.append(url)
        return urls

    def run(self):
        args = argManager()
        album_name="songs"
        proxies, headers = setProxy()

        # Manage for jio saavn users
        if args.user:
            if args.email and args.password:
                email = args.email
                password = args.password
            else:
                email = input('Enter your email for jiosaavn: ').strip()
                password = input("Enter your password for jiosaavn: ").strip()
            account = Account(proxies=proxies, headers=headers, email=email, password=password)
            if args.p:
                account.start_download_playlist()
            elif args.a:
                account.start_download_album()
            elif args.s:
                account.start_download_podcast()
            elif args.clone:
                account.get_details_n_clone(args.clone, args.create, args.copy)
            elif args.create:
                account.create_user(email, password)
        
        # Manage for all default downloads
        # Note: Passing the url parameter to the contructor of Playlist, Album and Artist is must
        else:
            if args.url is None and args.file is None:
                dl_urls = [input("Enter the URL : ").strip()]
            elif args.url is None and args.file:
                dl_urls = self.read_urls(args.file)
            else:
                dl_urls = [args.url]

            for dl_url in dl_urls:
                dl_type = scan_url(url=dl_url)
                if dl_type == 'playlist':      
                    playlist = Playlist(proxies, headers, dl_url)
                    playlist.start_download()
                elif dl_type == 'album':
                    album = Album(proxies, headers, dl_url)
                    album.start_download()
                elif dl_type == 'artist':
                    artist = Artist(proxies, headers, args, dl_url)
                    artist.start_download()
                elif dl_type == 'song':
                    song = Song(proxies, headers, dl_url)
                    song.start_download()
        print('DONE\n')


if __name__ == '__main__':
    obj = Download()
    obj.run()