import pytest

#   TODO: Further tests to be written
class TestAlbum():
    @pytest.fixture(scope="module")
    def album_obj(self):
        from scripts.content import album
        from scripts import helper

        proxies, headers = helper.setProxy()
        return album.Album(proxies, headers, url="https://www.jiosaavn.com/album/kuch-bhi-ho-jaye/2EvVc5JXg3I_")

    def test_getAlbumID(self, album_obj):
        album_id = album_obj.getAlbumID()
        assert  album_id == "19805392"
        assert type(album_id) is str

    def test_setAlbumID(self, album_obj):
        album_obj.setAlbumID("19805392")
        assert album_obj.albumID == "19805392"

    def test_getAlbum(self, album_obj):
        songs_json, album_name = album_obj.getAlbum()
        assert type(songs_json) is dict
        assert type(songs_json["songs"]) is list
        assert type(album_name) is str