import React from 'react';
import HeroSection from './HeroSection';
import CategoryNavigation from './CategoryNavigation';
import FeaturedCarousel from './FeaturedCarousel';
import BlogGrid from './BlogGrid';
import './BlogPage.css';
import BlogFeatures from './BlogFeature';
const BlogPage: React.FC = () => {
  return (
    <div className="blog-page">
      <HeroSection />
      <CategoryNavigation />
      <FeaturedCarousel />
      <BlogGrid />
      <BlogFeatures />
    </div>
  );
};

export default BlogPage;