import React, { useState } from "react";
import axios from "axios";

interface DestinationFormProps {
  destination?: any; // Use a proper type/interface based on your schema
  onSuccess: () => void;
}

const DestinationForm: React.FC<DestinationFormProps> = ({ destination, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: destination?.name || "",
    type: destination?.type || "",
    activities: destination?.activities?.join(", ") || "",
    budgetMin: destination?.budget?.min || "",
    budgetMax: destination?.budget?.max || "",
    idealDuration: destination?.idealDuration || "",
    region: destination?.region || "",
    season: destination?.season || "",
    imageUrl: destination?.imageUrl || "",
    description: destination?.description || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      if (destination) {
        // Update destination
        await axios.put(`/api/destinations/${destination._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new destination
        await axios.post("/api/destinations", formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      onSuccess();
    } catch (err) {
      console.error("Error saving destination:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded mb-2 w-full" required />
      <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" className="border p-2 rounded mb-2 w-full" required />
      <input name="activities" value={formData.activities} onChange={handleChange} placeholder="Activities (comma separated)" className="border p-2 rounded mb-2 w-full" />
      <input 
        name="budgetMin" 
        type="number" 
        value={formData.budgetMin} 
        onChange={handleChange} 
        placeholder="Budget Min" 
        className="border p-2 rounded mb-2 w-full" 
        required 
      />
      <input 
        name="budgetMax" 
        type="number" 
        value={formData.budgetMax} 
        onChange={handleChange} 
        placeholder="Budget Max" 
        className="border p-2 rounded mb-2 w-full" 
        required 
      />
      <input 
        name="idealDuration" 
        type="number" 
        value={formData.idealDuration} 
        onChange={handleChange} 
        placeholder="Ideal Duration (days)" 
        className="border p-2 rounded mb-2 w-full" 
        required 
      />
      <input name="region" value={formData.region} onChange={handleChange} placeholder="Region" className="border p-2 rounded mb-2 w-full" />
      <input name="season" value={formData.season} onChange={handleChange} placeholder="Season" className="border p-2 rounded mb-2 w-full" />
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded mb-2 w-full" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded mb-2 w-full" />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        {destination ? "Update Destination" : "Create Destination"}
      </button>
    </form>
  );
};

export default DestinationForm;