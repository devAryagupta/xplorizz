import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./BlogSectionSlider.css";

// configure Swiper modules globally
SwiperCore.use([Autoplay, Pagination, Navigation]);

const categories = [
  { value: "all", label: "All" },
  { value: "adventure", label: "Adventure Travel" },
  { value: "nature", label: "Nature & Wildlife" },
  { value: "budget", label: "Budget Travel" },
  { value: "luxury", label: "Luxury Travel" },
  { value: "cultural", label: "Cultural & Historical" },
  { value: "food", label: "Food & Local Cuisines" },
];

const BlogSection: React.FC = () => {
  const articlesData = [
    {
      id: 1,
      title: "10 Budget Travel Tips",
      featuredImage: "https://4.bp.blogspot.com/-VpLNDxpZn3o/VyL6g4D5jGI/AAAAAAAAKOQ/mYyaDvkaSkcHT-VDSLLPvdqA0FXQtPvpgCLcB/s1600/Gateway_of_India.jpg",
      category: "budget",
      excerpt:
        "Learn valuable tips to travel on a tight budget while still enjoying an incredible experience.",
      link: "/blog/budget-travel-tips",
    },
    {
      id: 2,
      title: "Best Adventure Spots",
      featuredImage: "https://static.toiimg.com/photo/msid-84408827,width-96,height-65.cms",
      category: "adventure",
      excerpt:
        "Discover thrilling adventure destinations that will push your limits and ignite your spirit.",
      link: "/blog/adventure-spots",
    },
    // Add more articles as needed
  ];
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articlesData.filter((article) =>
    (selectedCategory === "all" || article.category === selectedCategory) &&
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="blog-section py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-4xl font-bold text-center text-gray-800 mb-4">
          Latest Travel Tips
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {/* Blog Categories Filter */}
          <div className="flex  flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${
                  selectedCategory === cat.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              
              >
                {cat.label}
              </button>
            ))}
          </div>
          {/* Search Box */}
          <div className="mt-6 md:mt-0 w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Slider Carousel */}
        <div className="blog-slider-container">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            navigation={true}
          >
            {filteredArticles.map((article) => (
              <SwiperSlide key={article.id}>
                <div className="blog-slide relative rounded-lg overflow-hidden shadow-lg"style={{ display: 'flex' }}>
                  <div className="featured-image-wrapper">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="slide-overlay"></div>
                  <div className="slide-content absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-3">
                      {article.title}
                    </h3>
                    <p className="mb-4 text-base max-w-lg leading-relaxed">{article.excerpt}</p>
                    <ul className="list-disc pl-5 mb-3 text-sm">
                      <li>Quick Tip 1</li>
                      <li>Quick Tip 2</li>
                    </ul>
                    <a
                      href={article.link}
                      className="read-more inline-block bg-blue-600 hover:bg-blue-600 transition duration-300 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;