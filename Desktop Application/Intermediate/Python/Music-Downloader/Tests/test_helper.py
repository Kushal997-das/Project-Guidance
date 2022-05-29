import pytest
import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)

from scripts import helper

class TestHelper():
    @pytest.mark.parametrize("url, result", [
        ("https://www.jiosaavn.com/album/bewafai/y3DlZsa6XD0_", "album"),
        ("https://www.jiosaavn.com/featured/icons---mohd-rafi/HzNAgZVIJT4_", "playlist"),
        ("https://www.jiosaavn.com/artist/udit-narayan-songs/kLtmb7Vh8Rs_", "artist"),
        ("https://www.jiosaavn.com/song/psycho-saiyaan-from-saaho/B1EORCx4blc", "song")])
    def test_scan_url(self, url, result):
        assert helper.scan_url(url) == result

    def test_setProxy(self):
        proxies, headers = helper.setProxy()
        assert proxies is not None
        assert headers is not None
