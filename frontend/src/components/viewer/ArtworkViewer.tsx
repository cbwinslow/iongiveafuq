import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ArtworkMeta {
  id: number;
  title: string;
  filename: string;
  tags: string[];
}

export default function ArtworkViewer() {
  const [artworks, setArtworks] = useState<ArtworkMeta[]>([]);
  const [query, setQuery] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetch(`${API_URL}/api/artwork?search=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(setArtworks)
      .catch(() => setArtworks([]));
  }, [query]);

  return (
    <div className="p-4" onContextMenu={e => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search artwork..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="bg-gray-700 p-2 rounded w-full md:w-1/3"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {artworks.map(a => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-4 rounded shadow-lg"
          >
            <img
              src={`/artwork/${a.filename}`}
              alt={a.title}
              className="w-full h-auto pointer-events-none select-none"
              draggable={false}
            />
            <h3 className="text-neon-green text-center mt-2">{a.title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
