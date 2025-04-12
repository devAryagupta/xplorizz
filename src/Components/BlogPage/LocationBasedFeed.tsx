import React, { useEffect, useState } from 'react';

const LocationBasedFeed: React.FC = () => {
  const [location, setLocation] = useState<string>('Unknown');
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const loc = `${position.coords.latitude}, ${position.coords.longitude}`;
        setLocation(loc);
        // TODO: Fetch posts based on location using 'loc'
        // e.g.: fetch(`/api/posts?location=${loc}`).then(res => res.json()).then(setPosts);
      });
    }
  }, []);

  return (
    <div className="location-feed">
      <p>Your detected location: {location}</p>
      {posts.length === 0 ? (
        <p>No posts for your region yet.</p>
      ) : (
        posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </div>
  );
};

export default LocationBasedFeed;