import React from 'react';
import ReactPlayer from 'react-player';

const VideoBlogIntegration: React.FC = () => {
  return (
    <div className="video-blog-integration">
      <ReactPlayer url="https://www.youtube.com/watch?v=example" controls width="100%" />
      <p>Embed your video blogs or social media video content here.</p>
    </div>
  );
};

export default VideoBlogIntegration;