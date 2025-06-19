import React from "react";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import Dumbo from "./components/mascots/Dumbo";
import ArtworkViewer from "./components/viewer/ArtworkViewer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-8 flex flex-col items-center"
      >
        <Dumbo />
        <div className="mt-8 w-full">
          <ArtworkViewer />
        </div>
      </motion.main>
    </div>
  );
}
