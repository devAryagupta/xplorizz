import { motion } from "framer-motion";
import React from "react";
const HeroSection: React.FC = () => {
  return (
    <div className="relative h-screen bg-cover bg-center bg-[url('/hero-image.jpg')]">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover the World, One Adventure at a Time
        </motion.h1>
        <motion.button
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400"
          whileHover={{ scale: 1.1 }}
        >
          Start Exploring
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;
