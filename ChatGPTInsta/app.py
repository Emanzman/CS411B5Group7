import os
import openai
from flask import Flask, redirect, render_template, request, url_for, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/generate", methods=["POST"])
def generate():
    topic = request.json['topic']
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an AI that generates Instagram post titles and popular hashtags based on a given topic."},
            {"role": "user", "content": f"Generate a title and hashtags for a post about {topic}."}
        ],
        temperature=0.8,
        max_tokens=100,
    )
    title, hashtags = parse_response(response['choices'][0]['message']['content'])
    return jsonify({'title': title, 'hashtags': hashtags})


# def index():
#     if request.method == "POST":
#         topic = request.form["topic"]
#         response = openai.ChatCompletion.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {"role": "system", "content": "You are an AI that generates Instagram post titles and popular hashtags based on a given topic."},
#                 {"role": "user", "content": f"Generate a title and hashtags for a post about {topic}."}
#             ],
#             temperature=0.8,
#             max_tokens=100,
#         )
        
#         print("API RESP?:", response['choices'][0]['message']['content'])
        
#         print("parsed title:", title)
#         print("parsed hashtags:", hashtags)
#         return render_template("index.html", title=title, hashtags=hashtags)
#     return render_template("index.html")




def generate_prompt(topic):
    return f"""Generate an engaging title for your Instagram post related to '{topic}' and provide 3 popular hashtags related to '{topic}'.

Title:
Hashtags:"""

def parse_response(response_text):
    # print("RESPONSE TEXT:", response_text)
    lines = response_text.strip().split('Hashtags:')
    # print("LINES 0:", lines[0])
    # print("LINES 1:", lines[1])
    # print(len(lines))
    # print("LINES:", lines)
    if(len(lines) < 2):
        return "Title not generated", "Hashtags not generated"
    
    title = lines[0].strip("Title:").strip()
    # print("THIS IS THE TITLE:", title)
    hashtags = lines[1].strip("Hashtags:").strip()
    # print("THIS IS THE HASHTAGS:", hashtags)
    return title, hashtags

if __name__ == "__main__":
    app.run(port=5000)