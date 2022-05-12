import psutil
import math
from tkinter import *
from tkinter import messagebox
import time
import threading
from tkinter import ttk
import platform


def convert_size(size_bytes):
    if size_bytes == 0:
        return "0B"
    size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return "%s %s" % (s, size_name[i])


# get network usages
def getNetworkUsages(wifiVar, top):
    dictry = psutil.net_io_counters(pernic=True)
    speed = dictry.get('Wi-Fi')
    wifiVar.set(
        'Data Usages (Wi-Fi) : {}'.format(convert_size(speed.bytes_recv)))
    top.after(500, lambda: getNetworkUsages(wifiVar, top))


def getNetSpeed(top, netSpeedVar, ul, dl, t0, up_down):
    while True:
        last_up_down = up_down
        upload = psutil.net_io_counters(pernic=True)['Wi-Fi'][0]
        download = psutil.net_io_counters(pernic=True)['Wi-Fi'][1]
        t1 = time.time()
        up_down = (upload, download)
        try:
            ul, dl = [(now - last) / (t1 - t0) / 1024.0
                      for now, last in zip(up_down, last_up_down)]
            t0 = time.time()
        except:
            pass
        if dl > 0.1 or ul >= 0.1:
            time.sleep(0.75)
            netSpeedVar.set(
                'Down : {:0.2f} kB/s \n'.format(dl) + 'Up : {:0.2f} kB/s'.format(ul))
        else:
            netSpeedVar.set(
                'Down : {:0.2f} kB/s \n'.format(0.00) + 'Up : {:0.2f} kB/s'.format(0.00))
        # top.after(500, lambda: getNetSpeed(top,netSpeedVar,ul,dl,t0,up_down))
        time.sleep(1)


def getCpuPercent(cpuVar):
    while True:
        cpuVar.set('CPU : {}%'.format(psutil.cpu_percent(interval=1)))
        time.sleep(1)


def main():
    global top
    top = Tk()

    # Tab layout
    tabControl = ttk.Notebook(top)
    tab1 = ttk.Frame(tabControl)
    tab2 = ttk.Frame(tabControl)
    tabControl.add(tab1, text='  Data  ')
    tabControl.add(tab2, text='  CPU  ')
    tabControl.pack(expand=True, fill=BOTH)

    # for wifi text
    wifiVar = StringVar()
    wifilabel = ttk.Label(tab1, font=('Verdana', 10), textvariable=wifiVar)
    getNetworkUsages(wifiVar, top)

    # for net speed text
    netSpeedVar = StringVar()
    netSpeedLabel = ttk.Label(tab1, font=(
        'Verdana', 12), textvariable=netSpeedVar)

    # for CPU text
    cpuVar = StringVar()
    cpuLabel = ttk.Label(tab2, font=('Verdana', 12), textvariable=cpuVar)
    cpuInfo = StringVar()
    cpuInfoLabel = ttk.Label(tab2, font=('Verdana', 10), textvariable=cpuInfo)

    cpuThread = threading.Thread(target=getCpuPercent, args=(cpuVar,))
    cpuThread.daemon = True
    cpuThread.start()

    uname = platform.uname()
    cpuInfo.set(f"System: {uname.system}\n"
                f"Node Name: {uname.node}\n"
                f"Version: {uname.version}\n"
                f"Machine: {uname.machine}\n"
                f"Processor: {uname.processor}")

    # Thread safety for net speed
    ul = 0.00
    dl = 0.00
    t0 = time.time()
    upload = psutil.net_io_counters(pernic=True)['Wi-Fi'][0]
    download = psutil.net_io_counters(pernic=True)['Wi-Fi'][1]
    up_down = (upload, download)
    netSpeedThread = threading.Thread(
        target=getNetSpeed, args=(top, netSpeedVar, ul, dl, t0, up_down,))
    netSpeedThread.daemon = True
    netSpeedThread.start()

    # widgets packing
    # Tab 1
    netSpeedLabel.grid(row=0, column=0, sticky=W, pady=16, padx=68)
    wifilabel.grid(row=1, column=0, sticky=W, pady=16, padx=32)
    # Tab 2
    cpuLabel.grid(row=0, column=0, sticky=W, pady=6, padx=16)
    cpuInfoLabel.grid(row=1, column=0, sticky=W, pady=0, padx=16)

    # windows settings
    # top.resizable(0, 0)
    top.title('Internet Speed Meter')
    top.geometry('300x150')
    top.minsize(300, 150)
    top.maxsize(500, 500)
    top.mainloop()


if __name__ == "__main__":
    main()