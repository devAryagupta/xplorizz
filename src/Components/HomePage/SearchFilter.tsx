import React from "react";
import Select from "react-select";

const categories = [
  { value: "adventure", label: "Adventure" },
  { value: "nature", label: "Nature" },
  { value: "wildlife", label: "Wildlife" }
];

const SearchFilter: React.FC = () => {
  return (
    <div className="container mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Find Your Next Destination</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select options={categories} placeholder="Select Category" />
        <input
          type="text"
          placeholder="Search Destination..."
          className="border p-2 rounded w-full"
        />
        <input type="range" min="100" max="5000" className="w-full" />
      </div>
    </div>
  );
};

export default SearchFilter;
