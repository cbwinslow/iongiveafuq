import EpisodeGenerator from './generators/episodeGenerator.js';

const generator = new EpisodeGenerator();

async function generateIndividualStories() {
  const mascots = ['dumbo', 'scrapz', 'patty', 'buzz', 'rizzo'];
  
  console.log('🎭 Generating individual character stories...\n');
  
  for (const mascot of mascots) {
    console.log(`Generating story for ${mascot}...`);
    
    const episode = generator.generateEpisode({ 
      primaryMascot: mascot,
      episodeType: 'slice_of_life' // Focus on character-driven stories
    });
    
    const files = await generator.saveEpisode(episode);
    
    console.log(`✓ Generated: "${episode.title}"`);
    console.log(`  Markdown: ${files.markdown}`);
    console.log(`  Comic: ${files.comic}\n`);
  }
  
  console.log('🎭 All individual character stories generated!');
}

generateIndividualStories().catch(console.error);
