import socket
import os
from datetime import datetime

def detect_intrusion():
    # Create a raw socket
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_TCP)
    except PermissionError:
        print("You need to run this script as an administrator/root.")
        return

    # Bind the socket to the desired network interface and port
    try:
        s.bind(("192.168.1.1", 0))  # Replace with your IP
    except socket.error as e:
        print(f"Socket binding error: {e}")
        return

    # Include the IP headers in the captured packets
    s.setsockopt(socket.IPPROTO_IP, socket.IP_HDRINCL, 1)

    # Enable promiscuous mode (Windows-specific)
    if os.name == 'nt':  # Check if it's Windows
        s.ioctl(socket.SIO_RCVALL, socket.RCVALL_ON)

    print("Intrusion detection started. Press Ctrl+C to stop.")

    # Packet capture loop
    try:
        while True:
            packet, _ = s.recvfrom(65565)
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            print(f"Packet detected at {timestamp}: {packet}")
    except KeyboardInterrupt:
        print("\nDetection stopped by user.")
    finally:
        # Disable promiscuous mode (Windows-specific)
        if os.name == 'nt':
            s.ioctl(socket.SIO_RCVALL, socket.RCVALL_OFF)
        s.close()

# Start the intrusion detection
detect_intrusion()