function EmotionBar({ label, score }) {
  const percentage = Math.round(score * 100);

  return (
    <div className="emotion-bar">
      <span className="emotion-label">{label}</span>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="emotion-score">{percentage}%</span>
    </div>
  );
}

export default EmotionBar;
