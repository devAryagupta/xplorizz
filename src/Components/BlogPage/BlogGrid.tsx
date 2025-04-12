import React from 'react';
import BlogCard from './BlogCard';

export interface Blog {
  id: number;
  title: string;
  author: string;
  readTime: string;
  excerpt: string;
  image: string;
  category: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: 'Blog Post 1',
    author: 'Guide One',
    readTime: '5 min',
    excerpt: 'Lorem ipsum...',
    image: '/path/to/image1.jpg',
    category: 'Adventure',
  },
  {
    id: 2,
    title: 'Blog Post 2',
    author: 'Guide Two',
    readTime: '7 min',
    excerpt: 'Lorem ipsum...',
    image: '/path/to/image2.jpg',
    category: 'Nature',
  },
];

const BlogGrid: React.FC = () => {
  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogGrid;