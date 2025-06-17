import { motion } from "framer-motion";
import dumboImg from "../../../../artwork/mascots/dog_placeholder.png"; // replace with real asset

export default function Dumbo() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="bg-gray-800 p-6 rounded-xl shadow-xl text-center max-w-sm"
    >
      <h2 className="text-3xl font-bold text-neon-blue mb-4">Meet Dumbo!</h2>
      <img
        src={dumboImg}
        alt="Dumbo the Dog"
        className="mx-auto mb-4 w-64 h-auto rounded-lg"
      />
      <p className="text-lg">“Fresh outta fuqs. Check back later!”</p>
    </motion.div>
  );
}
