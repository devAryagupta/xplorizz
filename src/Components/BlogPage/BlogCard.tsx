import React, { useState } from 'react';
import { Blog } from './BlogList';

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="blog-card p-4 border rounded shadow-sm">

      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-2">
        {expanded ? blog.content : blog.excerpt}
      </p>
      <button
        onClick={() => setExpanded(e => !e)}
        className="text-blue-600 hover:underline"
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
      <span className="block mt-2 text-xs uppercase text-gray-400">{blog.category}</span>
    </div>
  );
};

export default BlogCard;