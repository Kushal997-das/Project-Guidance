from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL path and parameters
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        params = urllib.parse.parse_qs(parsed_path.query)

        # Set the response code and content type
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        # Serve different content based on the path
        if path == '/':
            self.wfile.write(b"<html><body><h1>Welcome to the Simple Web Server!</h1></body></html>")
        elif path == '/hello':
            name = params.get('name', ['World'])[0]
            response = f"<html><body><h1>Hello, {name}!</h1></body></html>"
            self.wfile.write(response.encode('utf-8'))
        else:
            self.send_error(404, "Page not found")

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8080):
    server_address = ('', port)  # Listen on all interfaces
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
