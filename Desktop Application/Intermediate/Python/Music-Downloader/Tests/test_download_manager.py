import pytest
import os
import sys

#   argparse rasing exception, following 2 lines solved it
sys.argv=['']
del sys

#   TODO: Further tests to be written
class TestDownloadManager():
    @pytest.fixture(scope="module")
    def manager_obj(self):
        from scripts import download_manager
        return download_manager.Manager()

    def test_get_dec_url(self, manager_obj):
        enc_url = "ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDy9OyCHwmG0FcgA1ieF26kd4Vm\/WhQL0FHWbLZmxKh9EBgAPgqc99pQBw7tS9a8Gtq"
        dec_url = manager_obj.get_dec_url(enc_url)
        assert dec_url == "https://aac.saavncdn.com/274/5ec5d630172f4cf8e143fe7ec8fc816d_320.mp4"

    def test_format_filename(self, manager_obj):
        filename = manager_obj.format_filename('Psycho *Saiyaan ?(From "Saaho")')
        forbidden = r'"\:/<>?*|'
        assert forbidden not in filename
        assert filename.endswith(".m4a")

    def test_get_download_location(self, manager_obj):
        location = os.path.normpath(manager_obj.get_download_location("Arijit Singh", "Aashiqui 2", "Tum Hi Ho"))
        assert location == os.path.join(os.getcwd(), "Arijit Singh", "Aashiqui 2", "Tum Hi Ho")