import http.server
import urllib.parse
import urllib.request
import json
import os
import sys

CLIENT_ID = os.environ.get("GOOGLE_ADS_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("GOOGLE_ADS_CLIENT_SECRET", "")
REDIRECT_URI = "http://127.0.0.1:8080/"
if not CLIENT_ID or not CLIENT_SECRET:
    print("Set GOOGLE_ADS_CLIENT_ID and GOOGLE_ADS_CLIENT_SECRET env vars first.")
    sys.exit(1)
SCOPE = "https://www.googleapis.com/auth/adwords"
CONFIG_PATH = "/home/abdullah/.gemini/config/mcp_config.json"

AUTH_URL = (
    f"https://accounts.google.com/o/oauth2/auth?"
    f"response_type=code&"
    f"client_id={urllib.parse.quote(CLIENT_ID)}&"
    f"redirect_uri={urllib.parse.quote(REDIRECT_URI)}&"
    f"scope={urllib.parse.quote(SCOPE)}&"
    f"access_type=offline&"
    f"prompt=consent"
)

def exchange_code(code):
    data = urllib.parse.urlencode({
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": REDIRECT_URI
    }).encode("utf-8")
    
    req = urllib.request.Request("https://oauth2.googleapis.com/token", data=data)
    try:
        with urllib.request.urlopen(req) as resp:
            tokens = json.loads(resp.read().decode("utf-8"))
            refresh_token = tokens.get("refresh_token")
            access_token = tokens.get("access_token")
            print("\nSuccessfully received tokens!")
            print(f"Refresh Token: {refresh_token}")
            
            if refresh_token:
                update_config(refresh_token)
            return tokens
    except Exception as e:
        print(f"Failed to exchange code: {e}")
        return None

def update_config(refresh_token):
    if not os.path.exists(CONFIG_PATH):
        print(f"Config path {CONFIG_PATH} does not exist.")
        return
    with open(CONFIG_PATH, "r") as f:
        config = json.load(f)
    
    if "mcpServers" in config and "google-ads" in config["mcpServers"]:
        config["mcpServers"]["google-ads"]["env"]["GOOGLE_ADS_REFRESH_TOKEN"] = refresh_token
        with open(CONFIG_PATH, "w") as f:
            json.dump(config, f, indent=2)
        print(f"Updated {CONFIG_PATH} with new refresh token!")

class OAuthHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        qs = urllib.parse.parse_qs(parsed.query)
        if "code" in qs:
            code = qs["code"][0]
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<h1>Google Ads Authorization Successful!</h1><p>You may now close this tab and return to your terminal/chat.</p>")
            print(f"\nReceived authorization code: {code}")
            tokens = exchange_code(code)
            # Exit server after successful exchange
            sys.exit(0)
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"No code found in request.")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1].startswith("--code="):
        code = sys.argv[1].split("=", 1)[1]
        exchange_code(code)
    else:
        print("="*80)
        print("GOOGLE ADS RE-AUTHENTICATION")
        print("="*80)
        print("\nPlease open the following URL in your browser to authorize:")
        print(f"\n{AUTH_URL}\n")
        print("="*80)
        print("Waiting for callback on http://127.0.0.1:8080/ ...")
        server = http.server.HTTPServer(("127.0.0.1", 8080), OAuthHandler)
        server.serve_forever()
