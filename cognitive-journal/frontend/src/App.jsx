import { useState, useEffect } from 'react';
import axios from 'axios';
import JournalForm from './components/JournalForm';
import EntryCard from './components/EntryCard';

const API_URL = 'http://localhost:5000/api/entries';

function App() {
  const [entries, setEntries] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Load existing entries from the database when the app first loads
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setEntries(res.data))
      .catch((err) => console.error('Failed to load entries:', err))
      .finally(() => setFetching(false));
  }, []);

  // Add a new entry to the top of the list when submitted
  const handleNewEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="container">
      <h1>🧠 Cognitive Journal</h1>
      <p className="subtitle">
        AI-powered journaling that identifies emotional patterns and cognitive thinking styles
      </p>

      <JournalForm onNewEntry={handleNewEntry} />

      {fetching ? (
        <p className="loading-msg">Loading past entries...</p>
      ) : (
        <>
          {entries.length > 0 && (
            <p className="entries-header">Past Entries ({entries.length})</p>
          )}
          {entries.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
