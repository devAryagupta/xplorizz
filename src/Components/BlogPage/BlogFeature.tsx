import React from 'react';
import UGCSubmission from './UGCSubmission';
import LocationBasedFeed from './LocationBasedFeed';
import SocialMediaFeed from './SocialMediaFeed';



import VideoBlogIntegration from './VideoBlogIntegration';

const BlogFeatures: React.FC = () => {
  return (
    <div className="blog-features">
      <h2>Community & Curated Blogs</h2>
      <section>
        <h3>1. UGC Blog Submission</h3>
        <UGCSubmission />
      </section>
      <section>
        <h3>2. Location-Based Smart Feed</h3>
        <LocationBasedFeed />
      </section>
      <section>
        <h3>3. Social Media Content Curation</h3>
        <SocialMediaFeed />
      </section>
      <section>
        <h3>4. Video Blog Integration</h3>
        <VideoBlogIntegration />
      </section>
    </div>
  );
};

export default BlogFeatures;