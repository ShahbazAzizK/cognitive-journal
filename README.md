🧠 Cognitive Reflection AI Journal

Hello! This is a full-stack MERN application that combines journaling with Natural Language Processing (NLP). Instead of just saving text, it helps users understand their own minds by identifying emotional states and common cognitive distortions.
🌟 What it does

    Journaling with Depth: Write your thoughts; get instant insights.

    Emotion Detection: Uses the SamLowe/roberta-base-go_emotions model via Hugging Face to analyze the "vibe" of your writing.

    Pattern Recognition: Identifies cognitive distortions like all-or-nothing thinking or catastrophizing.

    Growth Tracking: Saves your entries to MongoDB so you can look back and see how your perspective has shifted over time.

🛠️ The Tech Stack

    Frontend: React (for a smooth, responsive UI)

    Backend: Node.js & Express

    Database: MongoDB (storing the soul of the app)

    Intelligence: Hugging Face Inference API

🚀 How to Run it

    Clone it: ```bash
    git clone https://www.google.com/search?q=https://github.com/yourusername/cognitive-ai-journal.git

    Add your Secrets: Create a .env in the backend folder with your MONGO_URI and HUGGING_FACE_TOKEN.

    Install & Start:
    Bash

    # In both /frontend and /backend
    npm install
    npm start / npm run dev

✨ Why this project exists

I built this to prove that AI isn't just for chatbots—it can be a tool for psychological insight. It demonstrates how to weave pre-trained machine learning models into a standard MERN architecture to create something genuinely helpful.

    "We do not learn from experience... we learn from reflecting on experience." – John Dewey