import os
import smtplib
import pandas as pd
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv
from email.utils import formataddr

# Load environment variables from .env file
load_dotenv()

# Read email content from file
def read_email_content(file_path):
    try:
        with open(file_path, 'r') as file:
            return file.read()
    except FileNotFoundError:
        raise FileNotFoundError(f"Email content file not found: {file_path}")
    except IOError:
        raise IOError(f"Error reading email content file: {file_path}")

# Attach file to email
def attach_file(msg, file_path):
    try:
        with open(file_path, "rb") as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', f'attachment; filename={os.path.basename(file_path)}')
            msg.attach(part)
    except FileNotFoundError:
        raise FileNotFoundError(f"Attachment file not found: {file_path}")
    except IOError:
        raise IOError(f"Error reading attachment file: {file_path}")

# Main execution
try:
    excel_file = os.getenv('RECEIVER_EMAIL_FILE')
    df = pd.read_excel(excel_file)

    email = os.getenv('EMAIL')
    sender_name = os.getenv('SENDER_NAME')
    password = os.getenv('EMAIL_PASSWORD')

    if not password:
        raise ValueError("Email password not found in environment variables")

    sent_from = formataddr((sender_name, email))
    subject = 'Research Internship Application'

    # Read email content from file
    email_content_file = os.getenv('EMAIL_CONTENT_FILE')
    text = read_email_content(email_content_file)

    file_path = os.getenv('ATTACHMENT_FILE')

    smtpserver = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    smtpserver.ehlo()
    smtpserver.login(email, password)

    for index, row in df.iterrows():
        try:
            msg = MIMEMultipart()
            sent_to = row['Email']
            
            msg['From'] = sent_from
            msg['To'] = sent_to
            msg['Subject'] = subject

            body = text

            msg.attach(MIMEText(body, 'plain'))

            attach_file(msg, file_path)

            message = msg.as_string()

            smtpserver.sendmail(email, sent_to, message)
            print(f"Email sent successfully to {sent_to}")
        except smtplib.SMTPException as e:
            print(f"Failed to send email to {sent_to}. Error: {str(e)}")
        except Exception as e:
            print(f"An error occurred while processing email for {sent_to}. Error: {str(e)}")

except FileNotFoundError as e:
    print(f"File not found error: {str(e)}")
except IOError as e:
    print(f"IO error: {str(e)}")
except pd.errors.EmptyDataError:
    print("The Excel file is empty.")
except Exception as e:
    print(f"An unexpected error occurred: {str(e)}")
finally:
    try:
        smtpserver.quit()
    except:
        pass  # If the server connection wasn't established, this will fail silently

print("Email sending process completed.")