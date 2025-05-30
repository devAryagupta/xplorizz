import React, { useState } from 'react';
import HeroSection from './HeroSection';
import CategoryNavigation from './CategoryNavigation';
import FeaturedCarousel from './FeaturedCarousel';
import BlogList from './BlogList';
import BlogFeatures from './BlogFeature';
import './BlogPage.css';


const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  return (
    <div className="blog-page">
      <HeroSection />
      <CategoryNavigation onSelectCategory={setSelectedCategory}/>
      <FeaturedCarousel />
      <BlogList categoryFilter={selectedCategory}/>
      <BlogFeatures />
    </div>
  );
};

export default BlogPage;