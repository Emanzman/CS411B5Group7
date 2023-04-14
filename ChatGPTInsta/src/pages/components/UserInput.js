import React from 'react';
import './UserInput.css'

class UserInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userTopic : null,
            userCaptions : null,
            userHashtags : null
        }
    }    

    topicInput(input){
        this.setState({userTopic : input.target.value})
    }

    captionInput(input){
        this.setState({userCaptions : input.target.value})
    }

    hashtagInput(input){
        this.setState({userHashtags : input.target.value})
    }


    async generateButton(){
        console.log("generating...");

        try {
            const response = await fetch('http://localhost:5000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    topic: this.state.userTopic,
                    userHashtags: this.state.userHashtags
                })
            });
            if(response.ok) {
                const data = await response.json();
                this.props.setCaption(data.title);
                this.props.setTags(data.hashtags);
            } else {
                console.error("Error generating shit", response.status);
            }
        } catch (error) {
            console.error("error again gunna", error);
        }
    }
      
    render(){
        return(
        <div className="fixed-banner">
            <input onChange={(input)=>{this.topicInput(input)}} type="text" placeholder="Enter some of your previous post captions..." className="input-style"/>
            <input onChange={(input)=>{this.captionInput(input)}} type="text" placeholder="(Optional) Type your post topic or description..." className="optional-style"/>
            <input onChange={(input)=>{this.hashtagInput(input)}} type="text" placeholder="Type guaranteed hashtags..." className="shortInput-style"/> 
            <button onClick={()=>{
                this.generateButton(); 
                this.props.setCaption(this.state.userTopic);
                this.props.setTags(this.state.userHashtags);
            }} className="generate-button">Generate</button>
            <button onClick={()=>{this.generateButton()}} className="upload-button">Upload</button>
            {this.props.userHashtags}
        </div>
        ) 
    }
}

export default UserInput;