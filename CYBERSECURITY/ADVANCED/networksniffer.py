import socket
import struct
from datetime import datetime

def get_protocol_name(protocol_number):
    # Map protocol numbers to names
    protocols = {
        1: 'ICMP',
        6: 'TCP',
        17: 'UDP',
    }
    return protocols.get(protocol_number, 'Unknown')

def extract_ip_info(packet):
    # Unpack the IP header
    ip_header = packet[0:20]
    iph = struct.unpack('!BBHHHBBH4s4s', ip_header)

    version_ihl = iph[0]
    ip_header_length = (version_ihl & 0xF) * 4
    protocol_number = iph[6]

    # Extract source and destination IP addresses
    src_ip = socket.inet_ntoa(iph[8])
    dst_ip = socket.inet_ntoa(iph[9])
    
    return src_ip, dst_ip, protocol_number, ip_header_length

def sniff_packets():
    try:
        # Create a raw socket
        s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_IP)
    except PermissionError:
        print("You need to run this script as an administrator/root.")
        return

    # Bind the socket to listen to all interfaces
    s.bind(("0.0.0.0", 0))

    print("Network sniffer started. Press Ctrl+C to stop.")

    try:
        while True:
            # Receive packets
            packet, addr = s.recvfrom(65565)
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            # Extract IP information
            src_ip, dst_ip, protocol_number, _ = extract_ip_info(packet)
            protocol_name = get_protocol_name(protocol_number)

            # Display packet information
            print(f"Packet detected at {timestamp}: {protocol_name} from {src_ip} to {dst_ip}")
    except KeyboardInterrupt:
        print("\nSniffer stopped by user.")
    finally:
        s.close()

# Start the network sniffer
sniff_packets()