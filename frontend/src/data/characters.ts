export interface Character {
  id: string;
  name: string;
  species: string;
  appearance: string[];
  personality: string[];
  interactions: string[];
  position: {
    x: number;
    y: number;
    z: number;
  };
  animations: string[];
}

export const CHARACTERS: Character[] = [
  {
    id: 'charmz',
    name: 'Charmz',
    species: 'Human',
    appearance: ['Blonde hair', 'Confident smile', 'Fashionable attire', 'Radiant personality'],
    personality: ['Charming', 'Witty', 'Sassy', 'Confident'],
    interactions: ['Flirting with characters', 'Making sarcastic remarks', 'Commanding attention'],
    position: { x: 0, y: 0, z: 0 },
    animations: ['flirting', 'smiling', 'waving']
  },
  {
    id: 'scrapz',
    name: 'Scrapz the Cat',
    species: 'Cat',
    appearance: ['Torn ear', 'Ragged fur', 'Grumpy facial expression', 'Perpetual cigarette'],
    personality: ['Lazy', 'Sarcastic', 'Indifferent', 'Rebellious'],
    interactions: ['Smoking', 'Blowing smoke rings', 'Flicking ashes'],
    position: { x: 0, y: 0, z: 0 },
    animations: ['smoking', 'idle', 'dismissive']
  },
  {
    id: 'dumbo',
    name: 'Dumbo the Ugly Dog',
    species: 'Dog',
    appearance: ['Droopy eyes', 'Goofy-looking face', 'Awkward posture'],
    personality: ['Goofy', 'Carefree', 'Humorous', 'Oblivious'],
    interactions: ['Licking self', 'Sitting on sofa'],
    position: { x: 0, y: 0, z: 0 },
    animations: ['idle', 'licking', 'laughing']
  },
  {
    id: 'patty',
    name: 'Patty LaHam',
    species: 'Pig',
    appearance: ['Flamboyant attire', 'Oversized sunglasses', 'Glittery dress'],
    personality: ['Flamboyant', 'Confident', 'Dramatic', 'Glamorous'],
    interactions: ['Runway walks', 'Posing'],
    position: { x: 0, y: 0, z: 0 },
    animations: ['walking', 'posing', 'waving']
  },
  {
    id: 'buzz',
    name: 'Buzz the Drunken Donkey',
    species: 'Donkey',
    appearance: ['Cross-eyed', 'Swaying stance', 'Beer bottles'],
    personality: ['Drunken', 'Humorous', 'Clumsy', 'Friendly'],
    interactions: ['Stumbling', 'Swaying'],
    position: { x: 0, y: 0, z: 0 },
    animations: ['stumbling', 'drinking', 'laughing']
  },
  {
    id: 'rizzo',
    name: 'Rizzo the Sick Rat',
    species: 'Rat',
    appearance: ['Gaunt', 'Greenish tint', 'X eyes', 'Skull bandana'],
    personality: ['Morbidly humorous', 'Unlucky', 'Sarcastic'],
    interactions: ['Coughing', 'Lying on back'],
    position: { x: 0, y: 0, z: 0 },
    animations: ['coughing', 'twitching', 'idle']
  }
];

// Function to randomize character positions
export const randomizeCharacterPositions = (characters: Character[]): Character[] => {
  const positions = [
    { x: -2, y: 0, z: 0 },
    { x: 2, y: 0, z: 0 },
    { x: 0, y: 0, z: 2 },
    { x: 0, y: 0, z: -2 },
    { x: 1, y: 0, z: 1 }
  ];

  // Shuffle positions
  const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);

  // Assign new positions
  return characters.map((char, index) => ({
    ...char,
    position: shuffledPositions[index]
  }));
};
