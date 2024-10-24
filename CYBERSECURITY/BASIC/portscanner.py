import socket

def scan_ports(ip, port_range):
    open_ports = []
    for port in range(1, port_range):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket.setdefaulttimeout(1)
        result = sock.connect_ex((ip, port))
        if result == 0:
            open_ports.append(port)
        sock.close()
    return open_ports

# Example usage
target_ip = "192.168.1.1"
ports = scan_ports(target_ip, 100)
print(f"Open ports: {ports}")
