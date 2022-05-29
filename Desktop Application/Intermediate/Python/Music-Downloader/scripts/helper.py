import os
import argparse
import json
import re

def scan_url(url):
    url_parts = url.split('/')
    if 'album' in url_parts:
        return 'album'
    elif 'artist' in url_parts:
        return 'artist'
    elif 'playlist' in url_parts or 'featured' in url_parts:
        return 'playlist'
    elif 'song' in url_parts:
        return 'song'

def setProxy():
    proxy_ip = ''
    if ('http_proxy' in os.environ):
        proxy_ip = os.environ['http_proxy']
    proxies = {
        'http': proxy_ip,
        'https': proxy_ip,
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:49.0) Gecko/20100101 Firefox/49.0',
        'cache-control': 'private, max-age=0, no-cache'
    }
    return proxies, headers

def argManager():
    parser = argparse.ArgumentParser()
    parser.add_argument("-artist", "--artist", action="store_true", help="Download for an Artist")
    parser.add_argument("-song", "--song", action="store_true", help="Download Songs")
    parser.add_argument("-album", "--album", action="store_true", help="Download Albums")
    parser.add_argument("-fast", "--fast", action="store_true", help="Get details asynchronously")

    parser.add_argument("-user", "--user", action="store_true", help="Signin as JioSaavn user")
    parser.add_argument("-p", "--p", action="store_true", help="Download Playlists by signing in")
    parser.add_argument("-a", "--a", action="store_true", help="Download Albums by signing in")
    parser.add_argument("-s", "--s", action="store_true", help="Download Shows by signing in")

    parser.add_argument("-clone", "--clone", action="store_true", help="Clone songs,albums,playlists to new account")
    parser.add_argument("-create", "--create", action="store_true", help="To create new account for cloning")
    parser.add_argument("-copy", "--copy", action="store_true", help="To copy to another account")

    parser.add_argument("-o", "--outFolder", help="Path to store the Downloaded songs folder")
    parser.add_argument("-u", "--url", help="URL of the song, playlist, album, artist")
    parser.add_argument("-e", "--email", help="Email of the Jio Saavn User")
    parser.add_argument("-pw", "--password", help="Password of the Jio Saavn User")
    parser.add_argument("-f", "--file", help="file with the urls of songs, albums, playlists, artists")
    args = parser.parse_args()
    return args