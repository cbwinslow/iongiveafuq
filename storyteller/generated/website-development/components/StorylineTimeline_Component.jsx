
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineMarker } from './TimelineMarker';
import { EpisodePreview } from './EpisodePreview';
import { CharacterProgression } from './CharacterProgression';

export const StorylineTimeline = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [characterFilter, setCharacterFilter] = useState('all');
  
  const timelinePhases = [
    {
      id: 'origins',
      title: 'Origins',
      description: 'Where it all began - meet the dysfunction',
      episodes: [...], // episode data
      characterDevelopment: {...} // character progress data
    },
    // ... other phases
  ];
  
  return (
    <div className="storyline-timeline">
      <motion.header 
        className="timeline-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="timeline-title">The ION Give A Fuq Story</h1>
        <p className="timeline-subtitle">
          Follow the journey from zero shits given to... well, one shit given
        </p>
        
        <CharacterFilter 
          selected={characterFilter}
          onChange={setCharacterFilter}
        />
      </motion.header>
      
      <motion.div 
        className="timeline-container"
        layout
      >
        {timelinePhases.map((phase, index) => (
          <TimelinePhase 
            key={phase.id}
            phase={phase}
            index={index}
            isSelected={selectedPhase === phase.id}
            onSelect={() => setSelectedPhase(
              selectedPhase === phase.id ? null : phase.id
            )}
            characterFilter={characterFilter}
          />
        ))}
      </motion.div>
      
      <AnimatePresence>
        {selectedPhase && (
          <EpisodeModal 
            phase={timelinePhases.find(p => p.id === selectedPhase)}
            onClose={() => setSelectedPhase(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TimelinePhase = ({ phase, index, isSelected, onSelect, characterFilter }) => {
  return (
    <motion.div 
      className="timeline-phase"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <motion.div 
        className="phase-marker"
        whileHover={{ scale: 1.1 }}
        onClick={onSelect}
      >
        <NeonMarker phase={phase.id} />
      </motion.div>
      
      <motion.div 
        className="phase-content"
        animate={{ 
          height: isSelected ? 'auto' : '120px',
          opacity: isSelected ? 1 : 0.8 
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <h3 className="phase-title">{phase.title}</h3>
        <p className="phase-description">{phase.description}</p>
        
        <AnimatePresence>
          {isSelected && (
            <motion.div 
              className="episode-grid"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {phase.episodes
                .filter(ep => characterFilter === 'all' || ep.characters.includes(characterFilter))
                .map((episode, epIndex) => (
                  <EpisodeCard 
                    key={episode.id}
                    episode={episode}
                    index={epIndex}
                  />
                ))
              }
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
      