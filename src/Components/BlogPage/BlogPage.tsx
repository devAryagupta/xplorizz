import React from 'react';
import HeroSection from './HeroSection';
import CategoryNavigation from './CategoryNavigation';
import FeaturedCarousel from './FeaturedCarousel';
import BlogList from './BlogList';
import BlogFeatures from './BlogFeature';
import './BlogPage.css';

const BlogPage: React.FC = () => (
  <div className="blog-page">
    <HeroSection />
    <CategoryNavigation />
    <FeaturedCarousel />
    <BlogList />
    <BlogFeatures />

  </div>
);

export default BlogPage;