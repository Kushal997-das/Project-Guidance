import requests
from bs4 import BeautifulSoup
import json
import os

from ..helper import setProxy, argManager
from ..download_manager import Manager

class Podcast:
    def __init__(self, proxies, headers, url=None):
        self.proxies = proxies
        self.headers = headers
        self.url = None
    
    def getPodcast(self, showId):
        show_homepage_json = []
        show_json = {}
        response = requests.get(
                    'https://www.jiosaavn.com/api.php?_format=json&show_id={}&__call=show.getHomePage'.format(showId), proxies=self.proxies, headers=self.headers)
        show_homepage_json = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
        show_homepage_json = json.loads(show_homepage_json)
        no_of_seasons = len(show_homepage_json['seasons'])
        for season in range(no_of_seasons):   # Note that season value starts from 0 for the program but from 1 for the url
            no_of_episodes = show_homepage_json['seasons'][season]['more_info']['numEpisodes']
            response = requests.get(
                'https://www.jiosaavn.com/api.php?season_number={}&show_id={}&n={}&_format=json&__call=show.getAllEpisodes&sort_order=asc'.
                format(season+1, showId, no_of_episodes),
                 proxies=self.proxies, headers=self.headers)
            season_json = [x for x in response.text.splitlines() if x.strip().startswith('[')][0]
            season_json = json.loads(season_json)  # A list containing all the episodes in the season
            show_json[season] = season_json   # To build a dictionary containing all the season in the show
        return show_json
    
    def downloadPodcast(self, show_json):
        manager = Manager()
        show_name = show_json.get(0)[0]['more_info']['show_title']
        print("Show Name: {}".format(show_name))
        for season, season_json in show_json.items():
            season_name = 'Season {}'.format(season+1)
            print("Season: {}".format(season_name))
            for episode in season_json:
                try:
                    dec_url = manager.get_dec_url(episode['more_info']['encrypted_media_url'])
                    # dec_url = dec_url.replace('_96.mp4', '_320.mp4')   # Change in url gives invalid xml
                    filename = manager.format_filename(episode['title'])
                except Exception as e:
                    print('Download Error: {0}'.format(e))
                try:
                    location = manager.get_download_location(show_name, season_name, filename)
                    has_downloaded = manager.start_download("Show: {} - Season: {} - Episode: {}".format(
                        show_name, season_name, filename),
                        location, dec_url)
                    if has_downloaded:
                        # TODO: Add tags for to the podcast episodes
                        print('\n')
                except Exception as e:
                    print('Download Error: {0}'.format(e))
    
    def dowloadAllPodcasts(self, library_json):
        if library_json.get('show') is not None:
            for showId in library_json['show']:
                # TODO download the show
                self.downloadPodcast(self.getPodcast(showId))