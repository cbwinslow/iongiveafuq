
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AnimatedMascot } from './AnimatedMascot';
import { FloatingLogo } from './FloatingLogo';
import { ParticleBackground } from './ParticleBackground';

export const AnimatedHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <motion.section 
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <ParticleBackground />
      
      {/* Multiple floating ION logos */}
      <FloatingLogo 
        variant="main" 
        position="center" 
        animation="neon_pulse" 
      />
      <FloatingLogo 
        variant="graffiti" 
        position="top-left" 
        animation="glitch_flicker" 
      />
      <FloatingLogo 
        variant="neon" 
        position="bottom-right" 
        animation="breathing_pulse" 
      />
      
      {/* All mascots with signature animations */}
      <AnimatedMascot 
        character="dumbo" 
        position="bottom-left"
        idleAnimation="lazy_couch_shift"
        clickInteraction="annoyed_grunt"
      />
      <AnimatedMascot 
        character="scrapz" 
        position="top-right"
        idleAnimation="cigarette_smoke"
        clickInteraction="middle_finger_flash"
      />
      <AnimatedMascot 
        character="patty" 
        position="center-left"
        idleAnimation="dramatic_pose_cycle"
        clickInteraction="hair_flip_sparkle"
      />
      <AnimatedMascot 
        character="buzz" 
        position="center-right"
        idleAnimation="swaying_with_bottle"
        clickInteraction="hiccup_stumble"
      />
      <AnimatedMascot 
        character="rizzo" 
        position="bottom-center"
        idleAnimation="defensive_curl_uncurl"
        clickInteraction="cough_and_hide"
      />
      
      {/* Hero content */}
      <motion.div 
        className="hero-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <TypewriterText 
          text="We Don't Give a Fuq... But We Give You Options"
          glitchEffect={true}
        />
        <motion.p 
          className="hero-subtext"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Premium tier dysfunction for the authentically broken
        </motion.p>
        
        <CrudeCTAButton 
          text="Shop Your Tier of Despair"
          mascotApproval="scrapz_middle_finger"
        />
      </motion.div>
    </motion.section>
  );
};
      