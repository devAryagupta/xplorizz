import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';

export interface Blog {
  _id: string;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
 
  createdAt: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading blogs…</p>;
  if (blogs.length === 0) return <p>No blogs found.</p>;

  return (
    <div className="blog-list grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map(b => <BlogCard key={b._id} blog={b} />)}
    </div>
  );
};

export default BlogList;