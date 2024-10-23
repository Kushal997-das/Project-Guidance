import socket
import os
from datetime import datetime

def detect_intrusion():
    try:
        # Create a raw socket
        s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_TCP)
    except PermissionError:
        print("You need to run this script as an administrator/root.")
        return

    # Bind the socket to the desired network interface (IP)
    # Replace '0.0.0.0' to listen to all interfaces or use a specific IP
    try:
        s.bind(("0.0.0.0", 0))
    except socket.error as e:
        print(f"Socket binding error: {e}")
        return

    print("Intrusion detection started. Press Ctrl+C to stop.")

    try:
        while True:
            # Receive packets
            packet, addr = s.recvfrom(65565)
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            print(f"Packet detected from {addr} at {timestamp}: {packet}")
    except KeyboardInterrupt:
        print("\nDetection stopped by user.")
    finally:
        s.close()

# Start the intrusion detection
detect_intrusion()
