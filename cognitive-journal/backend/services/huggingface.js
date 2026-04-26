const axios = require('axios');

const HF_MODEL_URL =
  'https://router.huggingface.co/hf-inference/models/SamLowe/roberta-base-go_emotions';

async function analyzeEmotions(text) {
  try {
    const response = await axios.post(
      HF_MODEL_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const emotions = Array.isArray(response.data[0]) ? response.data[0] : response.data;
    const sorted = [...emotions].sort((a, b) => b.score - a.score);
    return sorted.slice(0, 5);
  } catch (error) {
    const status = error.response?.status;
    const details = error.response?.data;

    if (status === 503) {
      throw new Error('Model is loading, please try again in 20 seconds');
    }

    throw new Error(`Hugging Face API error (${status ?? 'no-status'}): ${JSON.stringify(details)}`);
  }
}

module.exports = { analyzeEmotions };