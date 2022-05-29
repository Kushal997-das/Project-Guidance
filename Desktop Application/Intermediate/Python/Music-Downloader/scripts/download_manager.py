from mutagen.mp4 import MP4, MP4Cover
import urllib.request
import html
import json
import base64
import os

from pySmartDL import SmartDL

from .pyDes import *
from .helper import argManager

REQUEST_TIMEOUT = 60

class Manager():
    def __init__(self):
        self.unicode = str
        self.args = argManager()
        self.des_cipher = self.setDecipher()
    
    def setDecipher(self):
        return des(b"38346591", ECB, b"\0\0\0\0\0\0\0\0", pad=None, padmode=PAD_PKCS5)
    
    def get_dec_url(self, enc_url):
        enc_url = base64.b64decode(enc_url.strip())
        dec_url = self.des_cipher.decrypt(enc_url, padmode=PAD_PKCS5).decode('utf-8')
        dec_url = dec_url.replace('_96.mp4', '_320.mp4')
        return dec_url
    
    def format_filename(self, filename):
        filename = html.unescape(filename) + '.m4a'
        filename = filename.replace("\"", "'")
        filename = filename.replace(":", "-")
        filename = filename.replace('"', "-")
        filename = filename.replace('/', "-")
        filename = filename.replace("<", "-")
        filename = filename.replace(">", "-")
        filename = filename.replace("?", "-")
        filename = filename.replace("*", "-")
        filename = filename.replace("|", "-")
        return filename
    
    def get_download_location(self, *args):
        if self.args.outFolder is None:
            location = os.getcwd()
        else:
            location = self.args.outFolder
        for folder in args:
            location = os.path.join(location, folder)
        return location
    
    def start_download(self, filename, location, dec_url):
        if os.path.isfile(location):
            print("Downloaded {0}".format(filename))
            return False
        else :
            print("Downloading {0}".format(filename))
            obj = SmartDL(dec_url, location, timeout=REQUEST_TIMEOUT)
            obj.start()
            return True
    
    def downloadSongs(self, songs_json, album_name='songs', artist_name='Non-Artist'):
        for song in songs_json['songs']:
            try:
                dec_url = self.get_dec_url(song['encrypted_media_url'])
                filename = self.format_filename(song['song'])
            except Exception as e:
                print('Download Error: {0}'.format(e))
            try:
                location = self.get_download_location(artist_name, album_name, filename)
                has_downloaded = self.start_download(filename, location, dec_url)
                if has_downloaded:
                    try:
                        name = songs_json['name'] if ('name' in songs_json) else songs_json['listname']
                    except:
                        name = ''
                    try:
                        self.addtags(location, song, name)
                    except Exception as e:
                        print("============== Error Adding Meta Data ==============")
                        print("Error : {0}".format(e))
                    print('\n')
            except Exception as e:
                print('Download Error : {0}'.format(e))
    
    def addtags(self, filename, json_data, playlist_name):
        audio = MP4(filename)
        audio['\xa9nam'] = html.unescape(self.unicode(json_data['song']))
        audio['\xa9ART'] = html.unescape(self.unicode(json_data['primary_artists']))
        audio['\xa9alb'] = html.unescape(self.unicode(json_data['album']))
        audio['aART'] = html.unescape(self.unicode(json_data['singers']))
        audio['\xa9wrt'] = html.unescape(self.unicode(json_data['music']))
        audio['desc'] = html.unescape(self.unicode(json_data['starring']))
        audio['\xa9gen'] = html.unescape(self.unicode(playlist_name))
        # audio['cprt'] = track['copyright'].encode('utf-8')
        # audio['disk'] = [(1, 1)]
        # audio['trkn'] = [(int(track['track']), int(track['maxtracks']))]
        audio['\xa9day'] = html.unescape(self.unicode(json_data['year']))
        audio['cprt'] = html.unescape(self.unicode(json_data['label']))
        # if track['explicit']:
        #    audio['rtng'] = [(str(4))]
        cover_url = json_data['image'][:-11] + '500x500.jpg'
        fd = urllib.request.urlopen(cover_url)
        cover = MP4Cover(fd.read(), getattr(MP4Cover, 'FORMAT_PNG' if cover_url.endswith('png') else 'FORMAT_JPEG'))
        fd.close()
        audio['covr'] = [cover]
        audio.save()
