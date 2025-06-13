const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config(); // Loads OPENAI_API_KEY from .env

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
 apiKey: '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'
});


// Create OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// Optional custom replies (currently unused)
const predefinedReplies = {
  "hello": "Hi there! 😊 How can I assist you today?",
  "introduce yourself": "I am a Bot made of code. I'm here to help you!",
  "how are you?": "I'm good, how about you?",
  "bye": "Goodbye! Have a great day 👋"
};

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    });

    const responseText = completion.choices[0].message.content;
    res.json({ reply: responseText });

  } catch (error) {
    console.error('❌ OpenAI Error:', error);
    res.status(500).json({ reply: "Sorry, I couldn't generate a response." });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running at http://localhost:5000');
});
