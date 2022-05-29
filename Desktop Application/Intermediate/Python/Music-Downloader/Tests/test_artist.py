import pytest

#   TODO: Further tests to be written
class TestArtist():
    @pytest.fixture(scope="module")
    def artist_obj(self):
        from scripts.content import artist
        from scripts import helper

        proxies, headers = helper.setProxy()
        args = helper.argManager()
        return artist.Artist(proxies, headers, args, url="https://www.jiosaavn.com/artist/udit-narayan-songs/kLtmb7Vh8Rs_")

    def test_getArtistID(self, artist_obj):
        artist_id = artist_obj.getArtistID()
        assert  artist_id == "455127"
        assert type(artist_id) is str

    def test_setArtistID(self, artist_obj):
        artist_obj.setArtistID("455127")
        assert artist_obj.artistID == "455127"