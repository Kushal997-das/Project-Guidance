# GroqDev: AI-Powered Coding Assistant

GroqDev is an advanced Flask-based application that harnesses the power of the Groq API to provide intelligent coding assistance. This versatile tool offers multiple AI model selections, enabling developers to leverage artificial intelligence for various coding tasks, including code completion, debugging, and optimization.

## 🌟 Key Features

- **AI-Powered Coding Assistance**: Utilize state-of-the-art AI models to enhance your coding process.
- **Multi-Model Support**: Choose from a range of AI models to best suit your specific coding needs.
- **Syntax Highlighting**: Enjoy clear, color-coded syntax for multiple programming languages.
- **One-Click Code Copying**: Easily copy generated code snippets with a single click.
- **Responsive Design**: Access GroqDev seamlessly across various devices and screen sizes.
- **User-Friendly Interface**: Intuitive design for effortless interaction with AI models.

## 🚀 Technology Stack

- **Backend**: ![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=Python&logoColor=white) ![Flask](https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=Flask&logoColor=white)
- **Frontend**: ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black) ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white) ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white)
- **AI Integration**: ![Groq API](https://img.shields.io/badge/-Groq%20API-4A154B?style=flat-square&logo=Groq&logoColor=white)

## 🛠️ Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yashksaini-coder/GroqDev.git
   cd GroqDev
   ```

2. **Set Up a Virtual Environment** (Recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   Create a `.env` file in the root directory with the following content:
   ```
   GROQ_API_KEY=your_api_key_here
   FLASK_ENV=development
   ```
   Replace `your_api_key_here` with your actual Groq API key.

5. **Run the Application**
   ```bash
   python app.py
   ```

6. **Access the Application**
   Open your web browser and navigate to `http://localhost:5000`

## 💻 Usage Guide

1. **Enter Your Query**: Type your coding question or describe the task in the provided textarea.
2. **Select AI Model**: Choose the most appropriate AI model for your task from the dropdown menu.
3. **Submit Query**: Click the "Ask" button to send your request to the AI.
4. **View Response**: The AI-generated code or explanation will appear in the display area.
5. **Copy Code**: Use the copy button next to code snippets for easy copying.

## 🧪 Running Tests

Ensure the quality and reliability of GroqDev by running the test suite:

```bash
python -m pytest tests/
```

## 🤝 Contributing

We welcome contributions to GroqDev! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 🙏 Acknowledgments

- Thanks to the Groq team for their powerful API
- Shoutout to all contributors who have helped shape GroqDev

---

⭐ If you find [GroqDev](https://github.com/yashksaini-coder/GroqDev) helpful, please star this repository to show your support!