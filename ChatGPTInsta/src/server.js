const express = require('express');
const axios = require('axios');
const openai = require('openai');
const cors = require('cors');

openai.apiKey = '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';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    console.log("received request");
    const { topic } = req.body;

  try {
    const response = await openai.ChatCompletion.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI that generates Instagram post titles and popular hashtags based on a given topic.',
        },
        {
          role: 'user',
          content: `Generate a title and hashtags for a post about ${topic}.`,
        },
      ],
      temperature: 0.8,
      max_tokens: 100,
    });

    const result = response.choices[0].message.content;
    const [titleLine, hashtagsLine] = result.split('\n');
    const title = titleLine.replace('Title:', '').trim();
    const hashtags = hashtagsLine.replace('Hashtags:', '').trim();

    res.json({ title, hashtags });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating title and hashtags');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
