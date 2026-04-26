const distortionMap = {
  fear: {
    name: 'Catastrophizing',
    description:
      'Expecting the worst possible outcome, often exaggerating the likelihood of disaster.',
    example: '"If I fail this exam, my entire career is over."',
  },
  sadness: {
    name: 'Personalization',
    description:
      'Blaming yourself for events outside your control, or taking excessive responsibility.',
    example: '"Everyone had a bad time at the party — it must be my fault."',
  },
  anger: {
    name: 'Mind Reading',
    description:
      'Assuming you know what others are thinking, usually negative thoughts about you.',
    example: '"They didn\'t reply to my message. They obviously hate me."',
  },
  disgust: {
    name: 'Labelling',
    description:
      'Assigning a fixed, global label to yourself or others based on a single event.',
    example: '"I made one mistake. I\'m a complete failure."',
  },
  disappointment: {
    name: 'All-or-Nothing Thinking',
    description:
      'Seeing situations in black and white, with no middle ground.',
    example: '"If it\'s not perfect, it\'s worthless."',
  },
  nervousness: {
    name: 'Fortune Telling',
    description:
      'Predicting a negative outcome before the event has occurred.',
    example: '"I know I\'m going to embarrass myself in the interview."',
  },
  remorse: {
    name: 'Overgeneralization',
    description:
      'Drawing broad conclusions from a single negative event.',
    example: '"This went wrong once, so it will always go wrong."',
  },
  grief: {
    name: 'Mental Filter',
    description:
      'Focusing exclusively on a negative detail while ignoring the bigger picture.',
    example: '"One person criticized my work — the whole project is a failure."',
  },
  annoyance: {
    name: 'Emotional Reasoning',
    description:
      'Assuming that because you feel something strongly, it must be true.',
    example: '"I feel like an idiot, therefore I must be one."',
  },
  joy: null,       // Positive emotions don't trigger distortions
  love: null,
  gratitude: null,
  admiration: null,
  amusement: null,
  excitement: null,
  pride: null,
  optimism: null,
  relief: null,
  caring: null,
};

function mapDistortions(emotions) {
  const distortions = [];
  const seen = new Set(); // Avoid duplicate distortions

  for (const emotion of emotions) {
    const label = emotion.label.toLowerCase();
    const distortion = distortionMap[label];

    // Only add if: a distortion exists for this emotion,
    // the score is high enough (> 15%), and we haven't added this one before
    if (distortion && emotion.score > 0.15 && !seen.has(distortion.name)) {
      distortions.push({
        name: distortion.name,
        description: distortion.description,
        example: distortion.example,
        triggerEmotion: emotion.label,
        confidence: Math.round(emotion.score * 100),
      });
      seen.add(distortion.name);
    }
  }

  return distortions;
}

module.exports = { mapDistortions };
