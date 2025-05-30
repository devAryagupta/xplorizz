import React, { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  _id: string;
  user: string;
  content: string;
  approved: boolean;
}

const ReviewsManagement: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      // Adjust the endpoint as needed for your reviews API
      const res = await axios.get("http://localhost:5000/api/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (reviewId: string) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/reviews/${reviewId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review approved!");
      fetchReviews();
    } catch (err) {
      console.error("Error approving review:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage User Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded">
              <p>
                <span className="font-semibold">{review.user}</span> says:
              </p>
              <p>{review.content}</p>
              <p>Status: {review.approved ? "Approved" : "Pending"}</p>
              {!review.approved && (
                <button
                  onClick={() => approveReview(review._id)}
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

export default ReviewsManagement;