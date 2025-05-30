import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagList = tags.split(',').map(t => t.trim());
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/blogs", {
        title,
        category,
        content,
        imageUrl,
        tags: tagList,
        author: "Admin"  // Replace with dynamic author info if available
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Blog created:", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-blog">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <ReactQuill value={content} onChange={setContent} />
        <input 
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;