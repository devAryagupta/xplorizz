import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FeaturedBlog {
  _id: string;
  title: string;
  imageUrl?: string;
  content: string;
}



const FeaturedCarousel: React.FC = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<FeaturedBlog[]>([]);
    const [modalBlog, setModalBlog] = useState<FeaturedBlog | null>(null);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/blogs?approved=true')
      .then(res => { const ugcOnly = res.data.filter((b: FeaturedBlog) => b.title.includes('UGC'));
        setFeaturedBlogs(ugcOnly);  // Filter to only include UGC blogs
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="featured-carousel">
        {featuredBlogs.map((blog) => (
          <div key={blog._id} className="carousel-item">
            <img src={blog.imageUrl || '/default-image.jpg'} alt={blog.title} />
            <h3>{blog.title}</h3>
            <button className="read-more" onClick={()=>setModalBlog(blog)}>Read More</button>
          </div>
        ))}
      </div>

      {modalBlog && (
        <div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setModalBlog(null)}
        >
          <div
            className="modal-content bg-white p-6 rounded max-w-lg w-full"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{modalBlog.title}</h2>
            {modalBlog.imageUrl && (
              <img
                src={modalBlog.imageUrl}
                alt={modalBlog.title}
                className="mb-4 w-full object-cover h-48 rounded"
              />
            )}
            <p className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>
              {modalBlog.content}
            </p>
            <button
              onClick={() => setModalBlog(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedCarousel;