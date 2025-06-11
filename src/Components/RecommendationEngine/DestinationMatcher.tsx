import React, { useState } from "react";
import axios from "axios";

interface Destination {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
  region: string;
  season: string;
}

const DestinationMatcher: React.FC = () => {
  const [interest, setInterest] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [results, setResults] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/recommendations", {
        interest,
        budget,
        duration,
        location,
        season,
      });
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="destination-matcher">
      <h2>Find Your Perfect Destination</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Interest (e.g., Adventure)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Season (optional)"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        />
        <button type="submit">Get Recommendations</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="destination-results">
          {results.map((dest) => (
            <div key={dest._id} className="destination-card">
              {dest.imageUrl && <img src={dest.imageUrl} alt={dest.name} />}
              <h3>{dest.name}</h3>
              <p>{dest.description}</p>
              <p>Region: {dest.region}</p>
              <button>Explore More</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationMatcher;