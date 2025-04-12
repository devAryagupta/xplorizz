import React from 'react';

interface FeaturedBlog {
  id: number;
  title: string;
  image: string;
}

const featuredBlogs: FeaturedBlog[] = [
  { id: 1, title: 'Featured Blog 1', image: '/path/to/image1.jpg' },
  { id: 2, title: 'Featured Blog 2', image: '/path/to/image2.jpg' },
];

const FeaturedCarousel: React.FC = () => {
  return (
    <div className="featured-carousel">
      {featuredBlogs.map((blog) => (
        <div key={blog.id} className="carousel-item">
          <img src={blog.image} alt={blog.title} />
          <h3>{blog.title}</h3>
          <button className="read-more">Read More</button>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCarousel;