import React, { useState } from 'react';
import './UserInput.css';
import axios from 'axios';

const UserInput = (props) => {
  const [userTopic, setUserTopic] = useState('');
  const [userCaptions, setUserCaptions] = useState('');
  const [userHashtags, setUserHashtags] = useState('');

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('/generate', { topic: userTopic });
      console.log('Resp:', response.data)
      const { title, hashtags } = response.data;

      props.setCaption(title);
      props.setTags(hashtags);
    } catch (error) {
      console.error('Error generating title and hashtags:', error);
    }
  };

  return (
    <div className="fixed-banner">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(input) => setUserTopic(input.target.value)}
          type="text"
          placeholder="Enter some of your previous post captions..."
          className="input-style"
        />
        <input
          onChange={(input) => setUserCaptions(input.target.value)}
          type="text"
          placeholder="(Optional) Type your post topic or description..."
          className="optional-style"
        />
        <input
          onChange={(input) => setUserHashtags(input.target.value)}
          type="text"
          placeholder="Type guaranteed hashtags..."
          className="shortInput-style"
        />
        <button type="submit" className="generate-button" onClick={handleSubmit}>
          Generate
        </button>
      </form>
      <button onClick={() => console.log('Uploading')} className="upload-button">
        Upload
      </button>
    </div>
  );
};

export default UserInput;