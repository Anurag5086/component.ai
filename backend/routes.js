const axios = require("axios");

module.exports = function (app) {
  app.post("/ask_openai", async (req, res) => {
    try {
      const { question } = req.body;

      // Make a POST request to the OpenAI API with your question
      const response = await axios.post(
        `${process.env.API_BASE_URL}completions`,
        {
          prompt: question,
          max_tokens: 150, // You can adjust this value to get different length responses
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      );

      const answer = response.data.choices[0].text;
      res.json({ answer });
    } catch (error) {
      console.error("Error requesting OpenAI API:", error.message);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
};
