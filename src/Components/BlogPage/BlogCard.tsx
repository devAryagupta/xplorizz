import React, { useState } from 'react';
import { Blog } from './BlogList';

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="blog-card p-6 border rounded shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1">

      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4">
        {expanded ? blog.content : blog.excerpt}
      </p>
      <button
        onClick={() => setExpanded(e => !e)}
        className="text-blue-600 hover:underline mb-2"
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
      <span className="block mt-3 text-xs uppercase text-gray-400">{blog.category}</span>
    </div>
  );
};

export default BlogCard;