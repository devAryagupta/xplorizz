import React from 'react';
import { Blog } from './BlogGrid';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-meta">
        {blog.author} · {blog.readTime}
      </p>
      <p className="blog-excerpt">{blog.excerpt}</p>
      <span className="blog-category">{blog.category}</span>
      <button className="read-more-btn">Read More</button>
    </div>
  );
};

export default BlogCard;