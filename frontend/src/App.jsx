import React from 'react';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import Dumbo from './components/mascots/Dumbo';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-8 flex justify-center"
      >
        <Dumbo />
      </motion.main>
    </div>
  );
}