import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ExperiencePage.css";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "rvxQqU2q5clB0gv9cTGCcTQMFZFAsjwEY5uKVonI5-M",
});

interface Experience {
  id: number;
  title: string;
  category: string;
  description: string;
}

interface ImageData {
  url: string;
  description: string;
  title: string;
}

const categories: string[] = ["All", "Wildlife", "Nature", "History"];

const experiences: Experience[] = [
  {
    id: 1,
    title: "Safari Adventure",
    category: "Wildlife",
    description: "Get up close with majestic animals in their natural habitat.",
  },
  {
    id: 2,
    title: "Mountain Trek",
    category: "Nature",
    description: "Explore breathtaking trails and scenic vistas.",
  },
  {
    id: 3,
    title: "Ancient Ruins Tour",
    category: "History",
    description: "Discover stories behind age-old monuments.",
  },
];

const ExperiencePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [images, setImages] = useState<Record<string, ImageData[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const uniqueCategories = Array.from(
          new Set(experiences.map((e) => e.category))
        );

        const imageFetches = await Promise.all(
          uniqueCategories.map(async (category) => {
            const result = await unsplash.search.getPhotos({
              query: `${category.toLowerCase()}, travel in India`,
              perPage: 5,
            });

            const imageDataList =
              result.response?.results.map((img) => ({
                url: img.urls?.regular || "",
                description: img.alt_description || "No description available",
                title: img.description || img.alt_description || "Untitled",
              })) || [];

            return { category, imageDataList };
          })
        );

        const imageMap: Record<string, ImageData[]> = {};
        imageFetches.forEach(({ category, imageDataList }) => {
          imageMap[category] = imageDataList;
        });

        setImages(imageMap);
      } catch (error) {
        console.error("Image fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredExperiences =
    selectedCategory === "All"
      ? experiences
      : experiences.filter((exp) => exp.category === selectedCategory);

  return (
    <div className="exp-page">
      <h1>Experiences</h1>

      <ul className="exp-categories">
        {categories.map((cat) => (
          <li
            key={cat}
            className={cat === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>

      {isLoading ? (
        <p>Loading images...</p>
      ) : (
        <div className="exp-grid">
          {filteredExperiences.map((exp) => {
            const imageList = images[exp.category] || [];
            return imageList.map((imgData, idx) => (
              <Link
                to={`/experiences/${exp.id}`}
                key={`${exp.id}-${idx}`}
                className="exp-card"
              >
                <div
                  className="exp-image"
                  style={{ backgroundImage: `url(${imgData.url})` }}
                />
                <div className="exp-info">
                  <h3>{imgData.title}</h3>
                  <p>{imgData.description}</p>
                </div>
              </Link>
            ));
          })}
        </div>
      )}
    </div>
  );
};

export default ExperiencePage;
