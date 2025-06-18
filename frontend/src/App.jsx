import React from "react";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import Dumbo from "./components/mascots/Dumbo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-8 flex justify-center"
    >
      <Dumbo />
    </motion.main>
  );
}

function About() {
  return <div className="p-8">About this project...</div>;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}
