import React, { useEffect, useState } from 'react';

const AICuratedBlogs: React.FC = () => {
  const [aiContent, setAiContent] = useState<string>('Loading AI-curated content...');

  useEffect(() => {
    // TODO: Call your AI summarization or GPT API
    setTimeout(() => setAiContent('AI generated blog post: Top 10 Experiences in Manali'), 1500);
  }, []);

  return (
    <div className="ai-curated-blogs">
      <p>{aiContent}</p>
    </div>
  );
};

export default AICuratedBlogs;