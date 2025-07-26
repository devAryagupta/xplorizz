import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingModal from "./BookingModal";
import "./LocalGuideList.css";

interface Guide {
  _id: string;
  profilePhoto?: string;
  name: string;
  expertise: string;
  languages: string[];
  destinationsCovered: string[];
  availability: boolean;
  contactInfo: {
    email: string;
    phone: string;
  };
  pricePerHour: number;
  rating: number;
}

interface LocalGuideListProps {
  destination: string;
}

const LocalGuideList: React.FC<LocalGuideListProps> = ({ destination }) => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const[destinationFilter, setDestinationFilter] = useState<string>("");

  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      try {
        const params: any = {};
        if (languageFilter) params.language = languageFilter;
        if (maxPrice) params.maxPrice = maxPrice;
        if (destinationFilter) params.destination = destinationFilter;
        const res = await axios.get("/api/guides", { params });
        setGuides(res.data);
        // Debugging output
        //console.log("Fetched guides:", res.data);
      } catch (err) {
        console.error("Error fetching guides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [languageFilter, maxPrice, destinationFilter]);

  return (
    <div className="local-guide-list p-4">
      <h2 className="text-2xl mb-4">Our Local Guides</h2>
      <div className="guide-filters mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Filter by language"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Price per hour"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by destination"
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading guides...</p>
      ) : guides.length === 0 ? (
        <p className="text-center text-gray-500">No guides available.</p>
      ) : (
        <div className="guide-grid">
          {guides.map((guide) => (
            <div key={guide._id} className="card">
              <div className="img-bx">
                {guide.profilePhoto ? (
                  <img src={guide.profilePhoto} alt={guide.name} />
                ) : (
                  <div className="passport-photo empty" />
                )}
              </div>
              <div className="content">
                <h2>
                  {guide.name}
                  <br />
                  <span>{guide.expertise}</span>

                </h2>
                <p>Languages: {guide.languages.join(", ")}</p>
                <p>Price: ₹{guide.pricePerHour}/hr</p>
                <p>Rating: {guide.rating?.toFixed(1) || "N/A"}</p>
                <p>Destination:{guide.destinationsCovered}</p>
                <button
                  onClick={() => setSelectedGuide(guide)}
                  className="btn bg-blue-600 text-white rounded-lg py-2"
                >
                  Book Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedGuide && (
        <BookingModal
          guideId={selectedGuide._id}
          guideName={selectedGuide.name}
          onClose={() => setSelectedGuide(null)}
        />
      )}
    </div>
  );
};

export default LocalGuideList;