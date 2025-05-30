import React from 'react';
import ReactPlayer from 'react-player';

const VideoBlogIntegration: React.FC = () => {
  return (
    <div className="video-blog-integration">
      <ReactPlayer url="https://videos.pexels.com/video-files/29772579/12793349_1920_1080_30fps.mp4" controls width="100%" />
      <p>Embed your video blogs or social media video content here.</p>
    </div>
  );
};

export default VideoBlogIntegration;