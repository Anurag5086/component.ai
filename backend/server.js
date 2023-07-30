const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/completions", async (req, res) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Hello world" },
        ],
      },
    ],
  });
  console.log(response.data.choices[0].message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
