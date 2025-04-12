import React from 'react';
import UGCSubmission from './UGCSubmission';
import LocationBasedFeed from './LocationBasedFeed';
import SocialMediaFeed from './SocialMediaFeed';
import AICuratedBlogs from './AICuratedBlogs';
import GuestGuideColumns from './GuestGuideColumns';
import CommunityThreads from './CommunityThreads';
import CollabPosts from './CollabPosts';
import RealTripBlogs from './RealTripBlogs';
import CuratedTravelPacks from './CuratedTravelPacks';
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
        <h3>4. AI Curated Blogs</h3>
        <AICuratedBlogs />
      </section>
      <section>
        <h3>5. Guest Guide Columns</h3>
        <GuestGuideColumns />
      </section>
      <section>
        <h3>6. Community Threads & Comments</h3>
        <CommunityThreads />
      </section>
      <section>
        <h3>7. Collaborative Blog Posts</h3>
        <CollabPosts />
      </section>
      <section>
        <h3>8. Real Trip Stories</h3>
        <RealTripBlogs />
      </section>
      <section>
        <h3>9. Curated Travel Packs</h3>
        <CuratedTravelPacks />
      </section>
      <section>
        <h3>10. Video Blog Integration</h3>
        <VideoBlogIntegration />
      </section>
    </div>
  );
};

export default BlogFeatures;