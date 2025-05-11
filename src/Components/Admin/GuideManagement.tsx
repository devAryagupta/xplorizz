import React, { useEffect, useState } from "react";
import axios from "axios";

interface Guide {
  _id: string;
  name: string;
  expertise: string;
  languages: string[];
  pricePerHour: number;
  contactInfo: { email: string; phone: string };
  verified: boolean;
}

const GuideManagement: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/guides", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGuides(res.data);
    } catch (err) {
      console.error("Error fetching guides", err);
    } finally {
      setLoading(false);
    }
  };
  const handleVerify = async (id: string) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/guides/${id}/verify`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchGuides();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/guides/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchGuides();
    } catch (err) {
      console.error("Error deleting guide", err);
      alert("Failed to delete. See console for details.");
    }
  };

  const handleUpdate = (guide: Guide) => {
    // e.g. navigate to an edit form or open a modal
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Local Guides</h2>
      {loading ? (
        <p>Loading guides...</p>
      ) : (
        <div className="space-y-4">
          {guides.map((guide) => (
            <div key={guide._id} className="border p-4 rounded">
              <h3 className="font-semibold">{guide.name}</h3>
              <p>Expertise: {guide.expertise}</p>
              <p>Languages: {guide.languages.join(", ")}</p>
              <p>Price: ₹{guide.pricePerHour}/hour</p>
            
              {/* Additional update or delete functionality can be added here */}

              <p>Contact: {guide.contactInfo.email} / {guide.contactInfo.phone}</p>
              {!guide.verified && (
                <button
                  onClick={() => handleVerify(guide._id)}
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Verify
                </button>
              )}
              <button
                onClick={() => handleUpdate(guide)}
                className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(guide._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuideManagement;