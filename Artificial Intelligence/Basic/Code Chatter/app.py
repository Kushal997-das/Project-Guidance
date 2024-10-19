from flask import Flask, render_template, request
from markupsafe import Markup
import os
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

model_options = [
    {"value": "gemma2-9b-it", "name": "Gemma 2 9B"},
    {"value": "gemma-7b-it", "name": "Gemma 7B"},
    {"value": "llama3-groq-70b-8192-tool-use-preview", "name": "Llama 3 Groq 70B Tool Use (Preview)"},
    {"value": "llama3-groq-8b-8192-tool-use-preview", "name": "Llama 3 Groq 8B Tool Use (Preview)"},
    {"value": "llama-3.1-70b-versatile", "name": "Llama 3.1 70B (Preview)"},
    {"value": "llama-3.1-8b-instant", "name": "Llama 3.1 8B (Preview)"},
    {"value": "llama3-70b-8192", "name": "Meta Llama 3 70B"},
    {"value": "llama3-8b-8192", "name": "Meta Llama 3 8B"},
    {"value": "mixtral-8x7b-32768", "name": "Mixtral 8x7B"},
]

@app.route('/')
def index():
    return render_template('index.html', model_options=model_options)

@app.route('/ask', methods=['POST'])
def ask():
    question = request.form.get('question')
    if not question:
        return "Please enter a query in text area.", 400
    try:
        selected_model = request.form.get('model', 'mixtral-8x7b-32768')  # Default to mixtral-8x7b-32768 if not specified

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are an AI-powered coding assistant here to help with programming challenges. \nYou can assist with various tasks, including:\n\n- **Debugging Code:** Identify and fix errors in code shared by the user.\n- **Explaining Concepts:** Provide detailed explanations of programming concepts.\n- **Code Suggestions:** Offer code snippets and suggest approaches to implement features.\n- **Optimization Tips:** Advise on improving code performance.\n- **Learning Resources:** Recommend tutorials, articles, and other resources to help the user learn something new."  
                },
                {
                    "role": "user",
                    "content": question,
                },
            ],
            
            model=selected_model,
            max_tokens=1024,
        )

        response = chat_completion.choices[0].message.content
        def replace_code_block(match):
            language = match.group(1) or 'plaintext'
            code = match.group(2)
            return f'<pre><code class="language-{language}">{code}</code></pre>'
        
        processed_response = re.sub(r'```(\w+)?\n(.*?)```', replace_code_block, response, flags=re.DOTALL)

        return Markup(processed_response)
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
