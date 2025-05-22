import { Character } from '../data/characters';
import { useState } from 'react';

interface StoryProps {
  character: Character;
}

export const StoryComponent = ({ character }: StoryProps) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [panels, setPanels] = useState<string[]>([]);

  useEffect(() => {
    // This is where we'll generate the comic panels using Stable Diffusion or ComfyUI
    // For now, we'll use placeholder text
    const storyPanels = [
      `Panel 1: ${character.name} is sitting in their usual spot, looking unimpressed.`,
      `Panel 2: A customer approaches, asking for a "fuck".`,
      `Panel 3: ${character.name} responds with a sarcastic remark.`,
      `Panel 4: The customer leaves, shaking their head.`,
      `Panel 5: ${character.name} goes back to their usual activity.`,
    ];
    setPanels(storyPanels);
  }, [character]);

  return (
    <div className="story-container">
      <h2>{character.name}'s Story</h2>
      <div className="comic-panels">
        {panels.map((panel, index) => (
          <div
            key={index}
            className={`comic-panel ${index === currentPanel ? 'active' : ''}`}
          >
            <p>{panel}</p>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button
          onClick={() => setCurrentPanel((prev) => (prev > 0 ? prev - 1 : prev))}
          disabled={currentPanel === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPanel((prev) => (prev < panels.length - 1 ? prev + 1 : prev))}
          disabled={currentPanel === panels.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
