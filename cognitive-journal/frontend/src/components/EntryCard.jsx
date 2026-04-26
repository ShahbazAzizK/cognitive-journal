import EmotionBar from './EmotionBar';

function EntryCard({ entry }) {
  const date = new Date(entry.createdAt).toLocaleString('en-PK', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="entry-card">
      {/* Date and dominant emotion */}
      <div className="entry-date">{date}</div>
      <div className="dominant-badge">
        Dominant emotion: {entry.dominantEmotion}
      </div>

      {/* The original journal text */}
      <p className="entry-text">"{entry.text}"</p>

      {/* Emotion breakdown with visual bars */}
      <div className="emotions-section">
        <p className="section-title">Emotion Analysis</p>
        {entry.emotions.map((emotion) => (
          <EmotionBar
            key={emotion.label}
            label={emotion.label}
            score={emotion.score}
          />
        ))}
      </div>

      {/* Cognitive distortions detected */}
      <div>
        <p className="section-title">Cognitive Patterns Detected</p>
        {entry.distortions.length === 0 ? (
          <div className="no-distortions">
            ✓ No significant cognitive distortions detected in this entry.
          </div>
        ) : (
          <div className="distortions-section">
            {entry.distortions.map((d, i) => (
              <div key={i} className="distortion-card">
                <div className="distortion-name">{d.name}</div>
                <div className="distortion-desc">{d.description}</div>
                <div className="distortion-example">{d.example}</div>
                <div className="distortion-trigger">
                  Triggered by: {d.triggerEmotion} ({d.confidence}% confidence)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EntryCard;
