import EpisodeGenerator from './generators/episodeGenerator.js';

const generator = new EpisodeGenerator();

async function generateInteractionStories() {
  // Define interesting mascot pairs for interactions
  const interactions = [
    { primary: 'dumbo', secondary: 'scrapz', theme: 'The system is rigged' },
    { primary: 'scrapz', secondary: 'patty', theme: 'Everyone\'s got their vice' },
    { primary: 'patty', secondary: 'buzz', theme: 'Misery loves company' },
    { primary: 'buzz', secondary: 'rizzo', theme: 'Rock bottom isn\'t the bottom' },
    { primary: 'rizzo', secondary: 'dumbo', theme: 'False hope is the cruelest hope' }
  ];
  
  console.log('🤝 Generating mascot interaction stories...\n');
  
  for (const interaction of interactions) {
    console.log(`Generating story: ${interaction.primary} + ${interaction.secondary}...`);
    
    const episode = generator.generateEpisode({ 
      primaryMascot: interaction.primary,
      theme: interaction.theme,
      episodeType: 'relationship_drama' // Focus on character interactions
    });
    
    const files = await generator.saveEpisode(episode);
    
    console.log(`✓ Generated: "${episode.title}"`);
    console.log(`  Theme: ${interaction.theme}`);
    console.log(`  Characters: ${episode.characters.join(', ')}`);
    console.log(`  Markdown: ${files.markdown}`);
    console.log(`  Comic: ${files.comic}\n`);
  }
  
  console.log('🤝 All interaction stories generated!');
}

generateInteractionStories().catch(console.error);
