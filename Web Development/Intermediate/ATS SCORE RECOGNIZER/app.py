from flask import Flask, request, render_template
import os
import nltk
import fitz  # PyMuPDF
import re
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Ensure nltk data directory is set up
nltk_data_path = os.path.join(os.path.dirname(__file__), 'nltk_data')
if not os.path.exists(nltk_data_path):
    os.makedirs(nltk_data_path)

nltk.data.path.append(nltk_data_path)

try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', download_dir=nltk_data_path)

# Create uploads directory if it doesn't exist
uploads_dir = os.path.join(os.path.dirname(__file__), 'uploads')
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)

@app.route('/', methods=['GET', 'POST'])
def index():
    score = None
    error = None
    detailed_scores = None

    if request.method == 'POST':
        resume_file = request.files.get('resume')
        job_description = request.form.get('job_description')
        cgpa = request.form.get('cgpa')

        if not resume_file or not job_description or not cgpa:
            error = "Please provide all required fields."
            return render_template('index.html', error=error)

        # Save the uploaded file
        filename = secure_filename(resume_file.filename)
        resume_path = os.path.join(uploads_dir, filename)
        resume_file.save(resume_path)

        # Extract text from the resume
        resume_text = extract_text_from_file(resume_path)

        # Calculate score
        try:
            cgpa = float(cgpa)
            score, detailed_scores = calculate_score(resume_text, job_description, cgpa)
        except ValueError:
            error = "Invalid CGPA value. Please enter a number."
            return render_template('index.html', error=error)

    return render_template('index.html', score=score, detailed_scores=detailed_scores, error=error)

def extract_text_from_file(file_path):
    text = ""
    try:
        # Use PyMuPDF to extract text from PDF
        pdf_document = fitz.open(file_path)
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
        pdf_document.close()
    except Exception as e:
        print(f"Error extracting text from {file_path}: {e}")
    return text

def extract_contact_info(resume_text):
    contact_info = {
        'name': None,
        'phone': None,
        'email': None,
        'github': None
    }

    # Regex for phone number (simple pattern)
    phone_pattern = re.compile(r'(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}')
    match_phone = phone_pattern.search(resume_text)
    contact_info['phone'] = match_phone.group() if match_phone else None

    # Regex for email
    email_pattern = re.compile(r'[\w\.-]+@[\w\.-]+')
    match_email = email_pattern.search(resume_text)
    contact_info['email'] = match_email.group() if match_email else None

    # Regex for GitHub
    github_pattern = re.compile(r'github\.com/[a-zA-Z0-9_-]+')
    match_github = github_pattern.search(resume_text)
    contact_info['github'] = match_github.group() if match_github else None

    # Extract name (assume first line is the name)
    lines = resume_text.split('\n')
    contact_info['name'] = lines[0].strip() if lines else None

    return contact_info

def calculate_score(resume_text, job_description, cgpa):
    score = 0
    detailed_scores = {
        'skills': 0,
        'projects': 0,
        'education': 0,
        'info': 0,
    }

    # Extract contact information
    contact_info = extract_contact_info(resume_text)

    # Check for basic information and assign scores
    if contact_info['name']:
        score += 5
        detailed_scores['info'] += 5  # Score for name
    if contact_info['phone']:
        score += 5
        detailed_scores['info'] += 5  # Score for phone
    if contact_info['email']:
        score += 5
        detailed_scores['info'] += 5  # Score for email
    if contact_info['github']:
        score += 5
        detailed_scores['info'] += 5  # Score for GitHub

    # Check for CGPA
    if cgpa is not None and cgpa >= 60:
        score += 10  # Points for good CGPA
    else:
        score -= 5  # Penalty for low CGPA

    # Check for skills
    skills_list = ["html", "css", "javascript", "python", "sql", "php", "django"]  # Example skills
    for skill in skills_list:
        if skill in resume_text.lower():
            detailed_scores['skills'] += 10  # Add points for each skill found
    score += detailed_scores['skills']

    # Check for projects
    if 'projects' in resume_text.lower():
        detailed_scores['projects'] += 10
        score += detailed_scores['projects']

    # Check for education
    if 'bachelor' in resume_text.lower() or 'degree' in resume_text.lower():
        detailed_scores['education'] += 10
        score += detailed_scores['education']

    # Adjust score to a range from 0 to 100
    score = min(max(score, 0), 100)

    return score, detailed_scores

if __name__ == '__main__':
    app.run(debug=True)