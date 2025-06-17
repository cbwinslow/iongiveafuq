
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const TierShowcase = () => {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  
  const tiers = [
    {
      name: 'fuhqs',
      priceRange: '$19.99 - $24.99',
      mascot: 'dumbo',
      crudeTagline: 'For when you barely give a fuhq',
      bgColor: '#2D2D2D',
      accentColor: '#FF6B6B'
    },
    // ... other tiers
  ];
  
  return (
    <section className="tier-showcase">
      <motion.h2 
        className="crude-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Pick Your Flavor of Dysfunction
      </motion.h2>
      
      <motion.div 
        ref={containerRef}
        className="tier-scroll-container"
        style={{ overflowX: 'scroll' }}
      >
        <motion.div className="tier-cards-wrapper">
          {tiers.map((tier, index) => (
            <TierCard 
              key={tier.name}
              tier={tier}
              index={index}
              scrollProgress={scrollXProgress}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const TierCard = ({ tier, index, scrollProgress }) => {
  const x = useTransform(scrollProgress, [0, 1], [0, -100 * index]);
  
  return (
    <motion.div 
      className="tier-card"
      style={{ x }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <AnimatedMascot 
        character={tier.mascot}
        variant="tier_representative"
        size="medium"
      />
      
      <motion.h3 
        className="tier-name"
        whileHover={{ scale: 1.1 }}
      >
        {tier.name}
      </motion.h3>
      
      <motion.p 
        className="tier-price"
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
      >
        {tier.priceRange}
      </motion.p>
      
      <motion.p 
        className="crude-tagline"
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        {tier.crudeTagline}
      </motion.p>
      
      <CrudeButton 
        text="Shop This Shit"
        tier={tier.name}
        mascotReaction={tier.mascot}
      />
    </motion.div>
  );
};
      