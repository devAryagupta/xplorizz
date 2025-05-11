import React, { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  author: string;
  content: string;
  approved: boolean;
}

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const approveBlog = async (blogId: string) => {
    setApproveLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/blogs/${blogId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog approved!");
      fetchBlogs();
    } catch (err) {
      console.error("Error approving blog:", err);
    } finally {
      setApproveLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Blogs</h2>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="border p-4 rounded">
              <h3 className="font-semibold">{blog.title}</h3>
              <p>Author: {blog.author}</p>
              <p>Status: {blog.approved ? "Approved" : "Pending"}</p>
              {!blog.approved && (
                <button
                  onClick={() => approveBlog(blog._id)}
                  disabled={approveLoading}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;