import ComicGenerator from './generators/comicGenerator.js';

const generator = new ComicGenerator();

async function generateComics() {
  console.log('📰 Generating comic strips...\n');
  
  // Generate a variety of comic formats for different mascots
  const comicSpecs = [
    { primaryMascot: 'dumbo', format: 'three_panel', comicType: 'daily_struggle' },
    { primaryMascot: 'scrapz', format: 'four_panel', comicType: 'social_commentary' },
    { primaryMascot: 'patty', format: 'single_panel', comicType: 'existential_crisis' },
    { primaryMascot: 'buzz', format: 'three_panel', comicType: 'vice_addiction' },
    { primaryMascot: 'rizzo', format: 'six_panel', comicType: 'relationship_humor' }
  ];
  
  for (const spec of comicSpecs) {
    console.log(`Generating ${spec.format} comic for ${spec.primaryMascot}...`);
    
    const comic = generator.generateComic(spec);
    const files = await generator.saveComic(comic);
    
    console.log(`✓ Generated: "${comic.title}"`);
    console.log(`  Format: ${spec.format} (${spec.comicType})`);
    console.log(`  Script: ${files.script}`);
    console.log(`  Art Direction: ${files.art_direction}\n`);
  }
  
  console.log('📰 All comics generated!');
}

generateComics().catch(console.error);
