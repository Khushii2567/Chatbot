
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config(); // if using .env file

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY });

// const openai = new OpenAI({
//   apiKey: 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 });

const botReply = {
  "hello" : "Hii there !! how can I help you today?",
  "Introduce yourself":"I am a Bot made up of code and I am here to help you", 
  "How are you?" : "I am good, whats about you?",
  "bye":"GoodBye!!, Have a good day"
}


app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if available
      messages: [{ role: "user", content: userMessage }]
    });

    const botReply = completion.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ reply: "Sorry, I couldn't generate a response." });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running at http://localhost:5000');
});
