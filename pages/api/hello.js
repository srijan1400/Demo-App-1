import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/generate-insights', async (req, res) => {
  try {
    const { data } = await axios.post(
      'https://api.openai.com/v1/engines/davinci/jobs',
      {
        prompt: 'Generate insights from the following data:',
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.5,
      }
    );

    res.json({ insights: data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

export default router;
