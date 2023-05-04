import os
import re
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

openai.api_key = os.getenv("OPENAI_API_KEY")

#OpenAPI requuired function 
@app.route("/generate", methods=["POST"])
def generate():
    topic = request.json['topic']
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an AI that generates Instagram post titles and popular hashtags based on a given topic."},
            {"role": "user", "content": f"Generate a title and 5 hashtags for a post about {topic}."}
        ],
        temperature=0.8,
        max_tokens=150,
    )
    title, hashtags = parse_response(response['choices'][0]['message']['content'])
    return jsonify({'title': title, 'hashtags': hashtags})

#OpenAI API call to generate the title and hashtags
def generate_prompt(topic):
    return f"""Generate an engaging title for your Instagram post related to '{topic}' and provide 5 popular hashtags related to '{topic}'.

Title:
Hashtags:"""

#function that parses the response from the API and makes it readable
def parse_response(response_text):
    lines = response_text.strip().split('Hashtags:') # split the response into title and hashtags
    title = lines[0].strip("Title:").strip()
    hashtags = lines[1].strip("Hashtags:").strip()
    hashtags = re.sub(r'\d+\.\s+', '', hashtags) # remove the numbering
    return title, hashtags

if __name__ == "__main__":
    app.run(port=5000)