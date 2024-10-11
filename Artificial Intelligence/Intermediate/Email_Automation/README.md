# Email Automation Script

This Python script automates the process of sending personalized emails with attachments to multiple recipients. It reads recipient information from an Excel file and uses a Gmail account to send the emails.

## Prerequisites

1. Python 3.x installed on your system
2. A Gmail account with 2-Step Verification enabled
3. An App Password for your Gmail account

## Setup

### Gmail Account Configuration

1. **Enable 2-Step Verification**:
   - Go to your [Google Account](https://myaccount.google.com/).
   - Select "Security" from the left menu.
   - Under "Signing in to Google," select "2-Step Verification" and follow the steps to turn it on.

2. **Create an App Password**:
   - After enabling 2-Step Verification, go back to the [Security](https://myaccount.google.com/security) page.
   - Under "Signing in to Google," select "App Passwords" (you may need to sign in again).
   - At the bottom, choose "Select app" and pick "Mail" or "Other (Custom name)".
   - Choose "Select device" and pick "Other (Custom name)".
   - Enter a name for the app password (e.g., "Email Automation Script") and click "Generate".
   - Google will display a 16-character app password. **Copy this password** as you'll need it for the `.env` file.

### Script Setup

1. Clone or download this repository to your local machine.

2. Install the required Python packages:
   ```
   pip install pandas python-dotenv
   ```

3. Create a `.env` file in the same directory as the script and add the following parameters:

   ```
   EMAIL=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   SENDER_NAME=Your Name
   RECEIVER_EMAIL_FILE=path/to/your/excel/file.xlsx
   EMAIL_CONTENT_FILE=path/to/your/email_content.txt
   ATTACHMENT_FILE=path/to/your/attachment.pdf
   ```

   Replace the values with your actual information.

4. Prepare your Excel file (`RECEIVER_EMAIL_FILE`) with at least one column named 'Email' containing the recipient email addresses.

5. Create your email content file (`EMAIL_CONTENT_FILE`) with the body of your email.

6. Ensure your attachment file (`ATTACHMENT_FILE`) is in the specified location.

## Usage

Run the script using Python:

```
python email_automation_script.py
```

The script will send emails to all recipients listed in the Excel file and print the status of each email sent.

## Troubleshooting

- If you encounter a "Login Error," double-check that you're using the correct App Password in your `.env` file.
- Ensure all file paths in the `.env` file are correct and the files exist.
- If emails are not being sent, check your Gmail account for any security alerts or login attempt notifications.

## Security Note

Never share your `.env` file or commit it to version control systems. It contains sensitive information that should be kept private.
