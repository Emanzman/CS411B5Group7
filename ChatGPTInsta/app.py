import os
import re
import openai
import instaloader
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

openai.api_key = os.getenv("OPENAI_API_KEY")

#OpenAPI requuired function 
@app.route("/generate", methods=["POST"])
def generate():
    topic = request.json['topic']
    user_link = request.json.get('userLink', None)

    if user_link:
        insta_caption = get_caption_from_link(user_link)
        prompt = f"Generate a title and 5 hashtags for a post about {topic}. Get inspiration from this Instagram caption: '{insta_caption}'"
    else:
        prompt = f"Generate a title and 5 hashtags for a post about {topic}."

    response = chat_completion(prompt)
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

#function that gets the caption from the link provided by the user 
def get_caption_from_link(link):
    instaLoadInstanace = instaloader.Instaloader()
    shcode = link.split("/")[-2]

    post = instaloader.Post.from_shortcode(instaLoadInstanace.context, shcode)
    caption = post.caption
    return caption

#function needed if we want to add a chatbot feature (if the user does not provide a link... screw you openai)
def chat_completion(prompt):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {openai.api_key}'
    }
    data = {
        'model': 'gpt-3.5-turbo',
        'messages': [
            {"role": "system", "content": "You are an AI that generates Instagram post titles and popular hashtags based on a given topic."},
            {"role": "user", "content": prompt}
        ],
        'temperature': 0.8,
        'max_tokens': 150
    }
    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
    return response.json()

if __name__ == "__main__":
    app.run(port=3000)