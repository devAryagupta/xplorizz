import React, { useState } from 'react';
import axios from 'axios';

const UGCSubmission: React.FC = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // For simplicity, use a local URL. For production, upload to server/cloud.
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const username = sessionStorage.getItem("username"); // Save username in session on login
      if (!token || !username) {
        alert("Please log in to submit.");
        setLoading(false);
        return;
      }
      await axios.post(
        "/api/blogs",
        {
          title: `UGC: ${category} ${location}`,
          category,
          content,
          imageUrl: image,
          tags: [location],
          author: username,
          // approved: false, // If you add this field to Blog.js
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Submitted for review!");
      setContent('');
      setCategory('');
      setLocation('');
      setImage('');
    } catch (err) {
      alert("Submission failed.");
    }
    setLoading(false);
  };

  return (
    <div className="ugc-submission">
      <h4>Share Your Travel Story</h4>
      <textarea
        placeholder="Write your story here..."
        rows={10}
        style={{ width: '100%' }}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="submission-options">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="adventure">Adventure</option>
          <option value="culture">Culture</option>
          <option value="budget">Budget</option>
        </select>
        <input
          type="text"
          placeholder="Location Tag"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit for Review"}
      </button>
    </div>
  );
};

export default UGCSubmission;