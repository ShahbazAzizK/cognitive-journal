import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/entries';

function JournalForm({ onNewEntry }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (text.trim().length < 10) {
      setError('Please write at least 10 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(API_URL, { text });
      onNewEntry(response.data); // Pass the new entry up to App
      setText('');               // Clear the textarea
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong. Try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="journal-form">
      <p className="section-title" style={{ marginBottom: '0.75rem' }}>
        Write your thoughts
      </p>
      {error && <div className="error-msg">{error}</div>}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling today? Write freely — your entry will be analyzed for emotional patterns and cognitive thinking styles..."
        disabled={loading}
      />
      <button onClick={handleSubmit} disabled={loading || text.trim().length < 10}>
        {loading ? '⏳ Analyzing with AI...' : '🧠 Analyze My Entry'}
      </button>
    </div>
  );
}

export default JournalForm;
