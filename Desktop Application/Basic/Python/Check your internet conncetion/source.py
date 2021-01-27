import urllib
from urllib.request import urlopen
def connectionCheck():
    try:


        urlopen('https://github.com/Kushal997-das',timeout=3)
        return True
    except urllib.error.URLError as Error:
        return False

if connectionCheck():
    print("Yes your internet is connected")
else:
    print("opps!😅 your internet is not connected with your System")
