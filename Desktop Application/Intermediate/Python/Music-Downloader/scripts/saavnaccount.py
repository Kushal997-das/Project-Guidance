import requests
import json

from .content.playlist import Playlist
from .content.album import Album
from .content.podcast import Podcast
from .download_manager import Manager

class Account():
    def __init__(self, proxies, headers, email, password):
        self.headers = {
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9.1; Samsung S10 Build/LMY47O)',
            'Host': 'www.saavn.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        self.proxies = proxies
        self.headers = headers
        self.email = email
        self.password = password
        self.url = 'https://www.saavn.com/api.php'
        self.session = None
        self.library_json = None
    
    def getAccountSession(self, email=None, password=None, action=None):
        if email is None:
            email = self.email
        if password is None:
            password = self.password
        
        payload = {
                'password': password,
                '_marker': '0',
                'cc': '',
                'ctx': 'android',
                'network_operator': '',
                'email': email,
                'state': 'logout',
                'v': '224',
                'app_version': '6.8.2',
                'build': 'Pro',
                'api_version': '4',
                'network_type': 'WIFI',
                'username': email,
                '_format': 'json',
                '__call': action,
                'manufacturer': 'Samsung',
                'readable_version': '6.8.2',
                'network_subtype': '',
                'model': 'Samsung Galaxy S10'
        }

        self.session = requests.Session()
        response = self.session.post(self.url, headers=self.headers, data=payload)
        return self.session, response

    def createAccount(self, email=None, password=None):
        session, response = self.getAccountSession(email, password, action='user.createV2')
        data = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
        data = json.loads(data)
        # print(data)
        if data.get('error'):
            return False
        elif data.get('data').get('uid'):
            return True
        else:
            return False

    def activateLibrary(self, email=None, password=None):
        # Function to Emualate android signin and activate library

        session, response = self.getAccountSession(email, password, action='user.login')
        data = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
        data = json.loads(data)
        # print(data)
        if data.get('error'):
            return False
        elif data.get('data').get('uid'):
            try:
                response = session.get("https://www.saavn.com/api.php?_marker=0&cc=&ctx=android&state=login&v=224&app_version=6.8.2&api_version=4&_format=json&__call=library.getAll")
                library_json = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
                library_json = json.loads(library_json)
                # print(library_json)
                self.logout(session)
                return True
            except Exception as e:
                print(str(e))
                return False
        else:
            return False

    def getLibrarySession(self, email=None, password=None):
        # Function to Emualate android signin and activate library and return library_json and session instance

        session, response = self.getAccountSession(email, password, action='user.login')
        data = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
        data = json.loads(data)
        # print(data)
        if data.get('error'):
            return False
        elif data.get('data').get('uid'):
            try:
                response = session.get("https://www.saavn.com/api.php?_marker=0&cc=&ctx=android&state=login&v=224&app_version=6.8.2&api_version=4&_format=json&__call=library.getAll", headers=self.headers)
                self.library_json = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
                self.library_json = json.loads(self.library_json)
                # print(self.library_json)
                return (self.library_json, session)
            except Exception as e:
                print(str(e))
                return False
        else:
            return False

    def logout(self, session):
        payload = {
                '_marker': '0',
                'cc': '',
                'ctx': 'android',
                'network_operator': '',
                'state': 'logout',
                'v': '224',
                'app_version': '6.8.2',
                'build': 'Pro',
                'api_version': '4',
                'network_type': 'WIFI',
                '_format': 'json',
                '__call': 'user.logout',
                'manufacturer': 'Samsung',
                'readable_version': '6.8.2',
                'network_subtype': '',
                'model': 'Samsung Galaxy S10'
        }
        response = session.post(self.url, headers=self.headers, data=payload)
        print(response.text)

    def cloneAccount(self, nEmail, nPassword, createNewAcc):
        #Function to clone songs, albums and playlists to another account
        if createNewAcc:
            up_success = self.createAccount(nEmail, nPassword)
            if up_success:
                print('Account created successfully')
        else:
            up_success = True
        if up_success:
            n_account = self.getLibrarySession(nEmail, nPassword)
            o_account = self.getLibrarySession(self.email, self.password)
        else:
            print('Account creation failed !!!')
            return False
        if n_account and o_account:
            olibrary_json = o_account[0]
            o_session = o_account[1]
            nlibrary_json = n_account[0]
            n_session = n_account[1]

            np_data = {}
            np = nlibrary_json.get('playlist')
            for playlist in np:
                songs_json = []
                response = requests.get(
                    'https://www.jiosaavn.com/api.php?listid={0}&_format=json&__call=playlist.getDetails'.format(playlist['id']))
                if response.status_code == 200:
                    songs_json = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
                    songs_json = json.loads(songs_json)
                np_data[songs_json['listname']] = playlist['id']

            url = "https://www.jiosaavn.com/api.php?__call=user.login&_marker=0"
            payload = { "username": nEmail, "password": nPassword }
            session = requests.Session()
            session.post(url, data=payload)   #Getting browser session for easy song and album addition

            print('Adding songs to new account')
            songs = olibrary_json.get('song')
            if songs is None:
                songs = []
            for song in songs:
                session.get('https://www.saavn.com/api.php?_marker=0&entity_type=song&entity_ids={0}&_format=json&__call=library.add'.format(song))
            print('Adding adding albums to new account')
            albums = olibrary_json.get('album')
            if albums is None:
                albums = []
            for album in albums:
                session.get('https://www.saavn.com/api.php?_marker=0&entity_type=album&entity_ids={0}&_format=json&__call=library.add'.format(album))
            print('Adding playlists to new account')
            playlists = olibrary_json.get('playlist')
            if playlists is None:
                playlists = []
            for playlist in playlists:
                songs_json = []
                response = requests.get(
                    'https://www.jiosaavn.com/api.php?listid={0}&_format=json&__call=playlist.getDetails'.format(playlist['id']))
                if response.status_code == 200:
                    songs_json = [x for x in response.text.splitlines() if x.strip().startswith('{')][0]
                    songs_json = json.loads(songs_json)
                else:
                    print('Unable to get playlist details from original')

                p_copy = {
                    '_marker': '0',
                    'ctx': 'android',
                    'network_operator': '',
                    'state': 'login',
                    'v': '224',
                    'app_version': '6.8.2',
                    'build': 'Pro',
                    'api_version': '4',
                    'network_type': 'WIFI',
                    '_format': 'json',
                    '__call': 'playlist.copyPlaylist',
                    'destListName': songs_json['listname'],
                    'srcListId': playlist['id'],
                    'manufacturer': 'Samsung',
                    'readable_version': '6.8.2',
                    'network_subtype': '',
                    'model': 'Samsung Galaxy S10'
                }
                res = n_session.post('https://www.jiosaavn.com/api.php', headers=self.headers, data=p_copy)
                print(playlist['id'])
                print(res)
                print(res.text)
                print(res.text.strip().replace('\n', ''))
            print('Logging out of both accounts')
            self.logout(o_session)
            self.logout(n_session)
            return True
        else:
            return False

    def get_details_n_clone(self, clone, create, copy):
        if clone:
            if not create and not copy:
                print('Invalid parameters entered !!!')
                return
            if create:
                nEmail = input('Enter the email for new account(TO): ')
                nPassword = input('Enter the password for new account(TO): ')
                success = self.cloneAccount(nEmail, nPassword, True)
            elif copy:
                nEmail = input('Enter the email of copy account(TO): ')
                nPassword = input('Enter the password of copy account(TO): ')
                success = self.cloneAccount(nEmail, nPassword, False)

            if success:
                print('The email for clone is: {0}'.format(nEmail))
                print('The password for clone is: {0}'.format(nPassword))
            else:
                print('Error: Failed to clone account')
        else:
            print('Invalid parameters entered !!!')
            return

    def create_user(self, email=None, password=None):
        if email is None and password is None:
            email = self.email
            password = self.password
        success = self.createAccount(email, password)
        if success:
            self.activateLibrary(email, password)
            print('\nSUCCESS')
            print('Your Account email is: ', email)
            print('Your Account password is: ',password)
        else:
            print('Failed to create user')
    
    def start_download_playlist(self):
        playlist = Playlist(self.proxies, self.headers)
        library_json, session = self.getLibrarySession()
        playlistIDs = library_json.get('playlist')
        if playlistIDs is not None:
            print("Playlists found: {}".format(len(playlistIDs)))
            for pl in playlistIDs:
                playlistID = pl['id']
                manager = Manager()
                songs_json = playlist.getPlaylist(playlistID)
                manager.downloadSongs(songs_json)
    
    def start_download_album(self):
        library_json, session = self.getLibrarySession()
        albumIDs = library_json.get('album')
        if albumIDs is not None:
            print("Albums found: {}".format(len(albumIDs)))
            for albumID in albumIDs:
                try:
                    album = Album(self.proxies, self.headers)
                    album.setAlbumID(albumID)
                    album.downloadAlbum()
                except:
                    print('Error getting album with ID: {}'.format(albumID))
    
    def start_download_podcast(self):
        library_json, session = self.getLibrarySession()
        podcast = Podcast(self.proxies, self.headers)
        podcast.dowloadAllPodcasts(library_json)