'use client';

import { useState } from 'react';

/**
 * Character Reference Gallery
 * Displays 50 consistent character images per mascot for reference and consistency
 */

interface CharacterRef {
  id: number;
  character: string;
  variation: string;
  filename: string;
  category: string;
}

// Character metadata
const CHARACTERS = {
  dumbo: {
    name: 'Dumbo the Dog',
    tier: 'fuqs',
    color: '#ff4ecd',
    description: 'Droopy eyes, goofy-looking face, awkward posture. The couch potato mascot.'
  },
  scrapz: {
    name: 'Scrapz the Cat',
    tier: 'shits',
    color: '#39ff14',
    description: 'Torn ear, ragged fur, grumpy expression. The cynical alley cat.'
  },
  patty: {
    name: 'Patty LaHam the Pig',
    tier: 'bonus',
    color: '#ff6b35',
    description: 'Flamboyant attire, oversized sunglasses, dramatic feather boa. The fabulous diva.'
  },
  buzz: {
    name: 'Buzz the Donkey',
    tier: 'damns',
    color: '#3bf7ff',
    description: 'Cross-eyed, swaying stance, holding beer bottles. The friendly drunk.'
  },
  rizzo: {
    name: 'Rizzo the Rat',
    tier: 'despair',
    color: '#888888',
    description: 'Gaunt, greenish tint, X\'s for eyes. The ultimate despair mascot.'
  }
};

// Reference categories
const REFERENCE_CATEGORIES = [
  'Full Body Poses',
  'Face Close-ups',
  'Action Poses',
  'Expressions',
  'Environment Shots',
  'Lighting Variations',
  'Character Turnaround',
  'Detail Shots'
];

export default function GalleryPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<string>('dumbo');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Generate reference data (in production, this would come from the manifest.json files)
  const generateReferences = (character: string): CharacterRef[] => {
    const refs: CharacterRef[] = [];
    const categories = ['poses', 'faces', 'action', 'expressions', 'environment', 'lighting', 'turnaround', 'details'];
    
    for (let i = 1; i <= 50; i++) {
      const categoryIndex = Math.floor((i - 1) / 7);
      refs.push({
        id: i,
        character,
        variation: `Variation ${i}`,
        filename: `${character}_ref_${String(i).padStart(3, '0')}.png`,
        category: categories[categoryIndex % categories.length]
      });
    }
    return refs;
  };

  const references = generateReferences(selectedCharacter);
  const filteredRefs = selectedCategory === 'all' 
    ? references 
    : references.filter(ref => ref.category === selectedCategory);

  const currentChar = CHARACTERS[selectedCharacter as keyof typeof CHARACTERS];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black py-6 px-6 border-b-2 border-neon-pink shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-neon-pink mb-2" style={{ textShadow: '0 0 20px #ff4ecd' }}>
            Character Reference Gallery
          </h1>
          <p className="text-gray-400">
            50 consistent reference images per character for comics and animations
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Character Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neon-green mb-4">Select Character</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(CHARACTERS).map(([key, char]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCharacter(key);
                  setSelectedCategory('all');
                }}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  selectedCharacter === key
                    ? 'bg-opacity-100 shadow-2xl border-2 scale-105'
                    : 'bg-gray-800 hover:bg-gray-700 border-2 border-transparent'
                }`}
                style={{
                  backgroundColor: selectedCharacter === key ? char.color + '20' : undefined,
                  borderColor: selectedCharacter === key ? char.color : undefined,
                  boxShadow: selectedCharacter === key ? `0 0 30px ${char.color}50` : undefined
                }}
              >
                <div 
                  className="text-5xl mb-2"
                  style={{ 
                    filter: `drop-shadow(0 0 10px ${char.color})`
                  }}
                >
                  {key === 'dumbo' && '🐶'}
                  {key === 'scrapz' && '🐱'}
                  {key === 'patty' && '🐷'}
                  {key === 'buzz' && '🫏'}
                  {key === 'rizzo' && '🐀'}
                </div>
                <h3 className="font-bold text-lg capitalize">{key}</h3>
                <p className="text-xs text-gray-400 mt-1">{char.tier}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Character Info */}
        <div 
          className="mb-8 p-6 rounded-xl border-2"
          style={{
            backgroundColor: currentChar.color + '10',
            borderColor: currentChar.color
          }}
        >
          <h2 className="text-3xl font-bold mb-2" style={{ color: currentChar.color }}>
            {currentChar.name}
          </h2>
          <p className="text-gray-300 mb-4">{currentChar.description}</p>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 rounded-lg font-bold" style={{ backgroundColor: currentChar.color, color: '#000' }}>
              {references.length} References
            </span>
            <span className="text-gray-400">Tier: {currentChar.tier}</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              selectedCategory === 'all'
                ? 'bg-neon-pink text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            All ({references.length})
          </button>
          {['poses', 'faces', 'action', 'expressions', 'environment', 'lighting', 'turnaround', 'details'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-lg font-bold transition capitalize ${
                selectedCategory === cat
                  ? 'bg-neon-green text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-400">
            Showing {filteredRefs.length} of {references.length} references
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-neon-pink text-black' : 'bg-gray-800'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'list' ? 'bg-neon-pink text-black' : 'bg-gray-800'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Reference Gallery */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'
          : 'space-y-4'
        }>
          {filteredRefs.map(ref => (
            <div
              key={ref.id}
              onClick={() => setSelectedImage(ref.id)}
              className={`bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-neon-green ${
                viewMode === 'list' ? 'flex items-center' : ''
              }`}
            >
              {/* Image Placeholder */}
              <div 
                className={`bg-gray-900 flex items-center justify-center ${
                  viewMode === 'grid' ? 'h-48' : 'w-32 h-32'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${currentChar.color}20 0%, #1a1a1a 100%)`
                }}
              >
                <div className="text-center p-4">
                  <div 
                    className="text-4xl mb-2"
                    style={{ filter: `drop-shadow(0 0 10px ${currentChar.color})` }}
                  >
                    {selectedCharacter === 'dumbo' && '🐶'}
                    {selectedCharacter === 'scrapz' && '🐱'}
                    {selectedCharacter === 'patty' && '🐷'}
                    {selectedCharacter === 'buzz' && '🫏'}
                    {selectedCharacter === 'rizzo' && '🐀'}
                  </div>
                  <p className="text-xs text-gray-500">#{ref.id}</p>
                </div>
              </div>

              {/* Reference Info */}
              <div className={`p-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="font-bold text-sm text-neon-green">
                  Reference #{String(ref.id).padStart(3, '0')}
                </h3>
                <p className="text-xs text-gray-400 capitalize">{ref.category}</p>
                <p className="text-xs text-gray-500 mt-1">{ref.variation}</p>
                {viewMode === 'list' && (
                  <p className="text-xs text-gray-600 mt-2">{ref.filename}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRefs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No references found for this category</p>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full">
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-neon-green">
                      {currentChar.name} - Reference #{String(selectedImage).padStart(3, '0')}
                    </h2>
                    <p className="text-gray-400">
                      {references.find(r => r.id === selectedImage)?.filename}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-4xl text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                
                {/* Large Image Display */}
                <div 
                  className="w-full h-96 bg-gray-900 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${currentChar.color}20 0%, #1a1a1a 100%)`
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="text-9xl mb-4"
                      style={{ filter: `drop-shadow(0 0 20px ${currentChar.color})` }}
                    >
                      {selectedCharacter === 'dumbo' && '🐶'}
                      {selectedCharacter === 'scrapz' && '🐱'}
                      {selectedCharacter === 'patty' && '🐷'}
                      {selectedCharacter === 'buzz' && '🫏'}
                      {selectedCharacter === 'rizzo' && '🐀'}
                    </div>
                    <p className="text-gray-400">Reference Image #{selectedImage}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Category: {references.find(r => r.id === selectedImage)?.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black py-8 px-6 mt-20 border-t-2 border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            Character Reference Library - ION Give A Fuq
          </p>
          <p className="text-gray-600 text-sm mt-2">
            50 references per character × 5 characters = 250 total reference images
          </p>
        </div>
      </footer>
    </div>
  );
}
