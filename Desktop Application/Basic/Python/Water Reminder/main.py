# Water Reminder - by Shubham Singh | github: LiQuiD-404

import time  # to create a delay after every reminder
from plyer import notification

if __name__ == "__main__":
    while True:
        notification.notify(
            title="Take a Break! Have a glass of water",
            message="80% of all illness in the developing world is water related.",
            app_icon="<Location of icon.py file>", timeout=12)

        time.sleep(60*60)  # Reminds the user after every one hour
