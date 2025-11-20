#!/usr/bin/env node

/**
 * Character Consistency Generator
 * 
 * Generates 50 consistent reference images for each character using Google Gemini Imagen 3
 * to establish a working consistent body of character artwork for comics and animations.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for API key
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const USE_MOCK = !GOOGLE_API_KEY;

if (USE_MOCK) {
  console.log(chalk.yellow('⚠️  No GOOGLE_API_KEY found - running in MOCK mode'));
  console.log(chalk.yellow('   Set GOOGLE_API_KEY environment variable for real generation'));
}

// Initialize Gemini
const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;

// Character definitions with detailed prompts
const CHARACTERS = {
  dumbo: {
    name: 'Dumbo',
    basePrompt: 'Dumbo the ugly dog: droopy eyes, goofy-looking face, awkward posture, lazy expression, messy fur, cartoon style with cyberpunk neon accents',
    variations: [
      'lounging on cluttered sofa',
      'looking confused and defeated',
      'eating pizza from box',
      'scratching himself awkwardly',
      'staring blankly at TV',
      'sleeping in messy environment',
      'drinking from beer can',
      'looking annoyed',
      'trying to get up from couch',
      'surrounded by snack wrappers',
      'full body standing pose',
      'sitting pose from front',
      'sitting pose from side',
      'sitting pose from back',
      '3/4 view upper body',
      'close-up of face - neutral',
      'close-up of face - confused',
      'close-up of face - annoyed',
      'close-up of face - defeated',
      'close-up of face - slightly happy',
      'paw/hand detail view',
      'tail detail view',
      'ear detail view',
      'in urban alley with neon signs',
      'in dive bar setting',
      'in small apartment',
      'walking down street',
      'standing with arms crossed',
      'pointing at something',
      'shrugging shoulders',
      'covering face with paws',
      'holding phone looking at screen',
      'with other characters - group shot',
      'action pose - jumping',
      'action pose - running',
      'sitting on ground',
      'leaning against wall',
      'looking over shoulder',
      'from low angle perspective',
      'from high angle perspective',
      'dramatic lighting from side',
      'with neon pink lighting',
      'with neon green lighting',
      'with neon blue lighting',
      'in rain with neon reflections',
      'silhouette against neon signs',
      'character turnaround - front view',
      'character turnaround - side view',
      'character turnaround - back view',
      'character turnaround - 3/4 view',
      'expression sheet - multiple emotions'
    ]
  },
  scrapz: {
    name: 'Scrapz',
    basePrompt: 'Scrapz the cat: torn ear, ragged fur, grumpy expression, perpetual cigarette, sarcastic attitude, alley cat aesthetic with cyberpunk neon style',
    variations: [
      'smoking cigarette looking bored',
      'blowing smoke rings',
      'flicking ashes dismissively',
      'middle finger gesture',
      'lounging in alley',
      'sitting on dumpster',
      'giving side-eye glare',
      'scratching with back leg',
      'hissing at someone',
      'walking away dismissively',
      'full body standing pose',
      'sitting pose from front',
      'sitting pose from side',
      'sitting pose from back',
      '3/4 view upper body',
      'close-up of face - cynical',
      'close-up of face - annoyed',
      'close-up of face - sarcastic smirk',
      'close-up of face - bored',
      'close-up of face - rare moment of caring',
      'paw detail with claws',
      'torn ear close-up',
      'tail detail view',
      'in urban alley at night',
      'on fire escape',
      'in dive bar',
      'on rooftop',
      'leaning against brick wall',
      'arms crossed defensive pose',
      'pointing accusingly',
      'waving dismissively',
      'protecting small kitten',
      'with other characters - reluctant interaction',
      'action pose - pouncing',
      'action pose - walking away',
      'crouched defensive pose',
      'stretched out lazy pose',
      'looking back over shoulder',
      'from low angle - intimidating',
      'from high angle - vulnerable',
      'dramatic side lighting',
      'with neon pink reflections',
      'with neon green glow',
      'with neon blue highlights',
      'in rain looking miserable',
      'silhouette with cigarette glow',
      'character turnaround - front',
      'character turnaround - side',
      'character turnaround - back',
      'character turnaround - 3/4',
      'expression sheet - various moods'
    ]
  },
  patty: {
    name: 'Patty LaHam',
    basePrompt: 'Patty LaHam the pig: flamboyant attire, oversized sunglasses, glittery dress, dramatic feather boa, sparkling jewelry, confident strut, theatrical personality with cyberpunk glamour',
    variations: [
      'dramatic runway walk',
      'striking fierce pose',
      'adjusting sunglasses dramatically',
      'tossing feather boa',
      'blowing kiss to fans',
      'looking fabulous and confident',
      'checking appearance in mirror',
      'applying lipstick',
      'dramatic hair flip',
      'waving dismissively at haters',
      'full body standing - front',
      'full body standing - side',
      'full body standing - back',
      'sitting on throne pose',
      '3/4 glamour shot',
      'close-up face - confident',
      'close-up face - dramatic',
      'close-up face - vulnerable moment',
      'close-up face - fierce',
      'close-up face - playful wink',
      'jewelry detail - close-up',
      'dress detail - sparkles',
      'feather boa detail',
      'in underground drag club',
      'on stage with spotlight',
      'backstage in dressing room',
      'walking down neon-lit street',
      'hands on hips power pose',
      'touching up makeup',
      'adjusting outfit',
      'reading mean comment dismissively',
      'comforting another character',
      'with other characters - group glamour',
      'action pose - dramatic twirl',
      'action pose - strutting',
      'sitting crossed legs',
      'leaning on wall seductively',
      'looking over shoulder flirtatiously',
      'from low angle - powerful',
      'from high angle - dramatic',
      'dramatic spotlight from above',
      'with neon pink stage lights',
      'with neon green glow',
      'with neon blue mood lighting',
      'in rain staying fabulous',
      'silhouette with sparkle effects',
      'character turnaround - front',
      'character turnaround - side',
      'character turnaround - back',
      'character turnaround - 3/4',
      'expression sheet - dramatic range'
    ]
  },
  buzz: {
    name: 'Buzz',
    basePrompt: 'Buzz the drunken donkey: slightly cross-eyed, swaying stance, holding beer bottles, appearing intoxicated, friendly expression, disheveled appearance with cyberpunk neon bar aesthetic',
    variations: [
      'swaying with beer bottle',
      'hiccup animation moment',
      'stumbling forward',
      'trying to stay balanced',
      'drinking from bottle',
      'spilling drink on self',
      'confused drunk expression',
      'overly friendly gesture',
      'slurred speech moment',
      'passed out on bar',
      'full body standing - wobbling',
      'sitting on bar stool - front',
      'sitting on bar stool - side',
      'leaning on bar - back view',
      '3/4 view with bottle',
      'close-up face - drunk smile',
      'close-up face - confused',
      'close-up face - cross-eyed',
      'close-up face - emotional drunk',
      'close-up face - passed out',
      'hoof detail holding bottle',
      'tail detail',
      'ear detail flopping',
      'in dive bar at night',
      'outside bar stumbling',
      'on park bench',
      'at unemployment office',
      'leaning against lamppost',
      'arms spread wide friendly',
      'pointing unsteadily',
      'waving enthusiastically',
      'hugging bottle lovingly',
      'trying to help another character',
      'with other characters - party time',
      'action pose - stumbling run',
      'action pose - falling over',
      'sitting on ground',
      'lying down dizzy',
      'looking up from ground',
      'from low angle - towering drunkenly',
      'from high angle - vulnerable',
      'dramatic bar lighting',
      'with neon pink bar signs',
      'with neon green beer signs',
      'with neon blue mood lighting',
      'in rain getting soaked',
      'silhouette against bar window',
      'character turnaround - front',
      'character turnaround - side',
      'character turnaround - back',
      'character turnaround - 3/4',
      'expression sheet - drunk emotions'
    ]
  },
  rizzo: {
    name: 'Rizzo',
    basePrompt: 'Rizzo the sick rat: gaunt alley rat, greenish tint, X\'s for eyes, skull-and-crossbones bandana, morbidly humorous, unlucky appearance, dark comedy aesthetic with cyberpunk sewer setting',
    variations: [
      'lying on back dramatically',
      'weak comedic cough',
      'dramatic twitch',
      'playing dead',
      'near poison bottle',
      'looking miserable but funny',
      'dragging self along ground',
      'making dark joke gesture',
      'shrugging at fate',
      'somehow still surviving',
      'full body standing - hunched',
      'sitting pose - defeated',
      'lying down pose - side',
      'curled up pose',
      '3/4 view looking pathetic',
      'close-up face - sick',
      'close-up face - dark humor smile',
      'close-up face - X eyes',
      'close-up face - actually concerned',
      'close-up face - philosophical',
      'paw detail - tiny and weak',
      'tail detail - ratty',
      'bandana detail close-up',
      'in sewer setting',
      'in abandoned building',
      'in dark alley',
      'near trash pile',
      'defensive posture',
      'explaining something',
      'warning gesture',
      'accepting fate gesture',
      'rare moment of wisdom',
      'with other characters - voice of experience',
      'action pose - scurrying away',
      'action pose - defensive stance',
      'hiding behind object',
      'peeking around corner',
      'looking up hopefully',
      'from low angle - small and vulnerable',
      'from high angle - pathetic',
      'dramatic shadows',
      'with dim neon pink glow',
      'with sickly neon green',
      'with cold neon blue',
      'in rain looking extra miserable',
      'silhouette small and alone',
      'character turnaround - front',
      'character turnaround - side',
      'character turnaround - back',
      'character turnaround - 3/4',
      'expression sheet - dark humor range'
    ]
  }
};

/**
 * Generate character reference images
 */
async function generateCharacterReferences(characterKey) {
  const character = CHARACTERS[characterKey];
  if (!character) {
    console.error(chalk.red(`❌ Unknown character: ${characterKey}`));
    return;
  }

  console.log(chalk.cyan(`\n🎨 Generating 50 reference images for ${character.name}...\n`));

  const outputDir = path.join(__dirname, 'generated', 'character-references', characterKey);
  await fs.ensureDir(outputDir);

  const manifest = {
    character: character.name,
    characterKey,
    generatedAt: new Date().toISOString(),
    totalImages: 50,
    basePrompt: character.basePrompt,
    images: []
  };

  for (let i = 0; i < 50; i++) {
    const variationIndex = i % character.variations.length;
    const variation = character.variations[variationIndex];
    const prompt = `${character.basePrompt}, ${variation}. Dark humor aesthetic, gritty urban cyberpunk style with neon accents. High quality character design reference.`;
    
    console.log(chalk.blue(`  [${i + 1}/50] Generating: ${variation}`));

    try {
      if (USE_MOCK) {
        // Mock mode - create placeholder
        const imageData = {
          id: i + 1,
          filename: `${characterKey}_ref_${String(i + 1).padStart(3, '0')}.png`,
          variation,
          prompt,
          status: 'mock',
          generatedAt: new Date().toISOString()
        };
        manifest.images.push(imageData);
        
        // Create a simple mock file
        const mockPath = path.join(outputDir, imageData.filename);
        await fs.writeFile(mockPath, `MOCK IMAGE - ${character.name} - ${variation}`);
        
        console.log(chalk.gray(`    ✓ Mock created`));
      } else {
        // Real generation with Gemini Imagen 3
        const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });
        
        const result = await model.generateContent({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            responseModalities: ['image']
          }
        });

        const imageData = {
          id: i + 1,
          filename: `${characterKey}_ref_${String(i + 1).padStart(3, '0')}.png`,
          variation,
          prompt,
          status: 'generated',
          generatedAt: new Date().toISOString()
        };

        // Save the generated image
        if (result.response?.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
          const imageBase64 = result.response.candidates[0].content.parts[0].inlineData.data;
          const imageBuffer = Buffer.from(imageBase64, 'base64');
          const imagePath = path.join(outputDir, imageData.filename);
          await fs.writeFile(imagePath, imageBuffer);
          console.log(chalk.green(`    ✓ Generated and saved`));
        }

        manifest.images.push(imageData);
      }
    } catch (error) {
      console.error(chalk.red(`    ✗ Error: ${error.message}`));
      manifest.images.push({
        id: i + 1,
        filename: `${characterKey}_ref_${String(i + 1).padStart(3, '0')}.png`,
        variation,
        prompt,
        status: 'failed',
        error: error.message,
        generatedAt: new Date().toISOString()
      });
    }
  }

  // Save manifest
  const manifestPath = path.join(outputDir, 'manifest.json');
  await fs.writeJson(manifestPath, manifest, { spaces: 2 });

  console.log(chalk.green(`\n✓ Generated ${manifest.images.filter(img => img.status !== 'failed').length}/50 images for ${character.name}`));
  console.log(chalk.gray(`  Manifest: ${manifestPath}\n`));

  return manifest;
}

/**
 * Generate all characters
 */
async function generateAllCharacters() {
  console.log(chalk.cyan.bold('\n═══════════════════════════════════════════════════════════'));
  console.log(chalk.cyan.bold('  ION Give A Fuq - Character Consistency Generator'));
  console.log(chalk.cyan.bold('  Generating 50 reference images per character'));
  console.log(chalk.cyan.bold('═══════════════════════════════════════════════════════════\n'));

  const results = {};

  for (const characterKey of Object.keys(CHARACTERS)) {
    try {
      results[characterKey] = await generateCharacterReferences(characterKey);
    } catch (error) {
      console.error(chalk.red(`❌ Failed to generate ${characterKey}: ${error.message}`));
      results[characterKey] = { error: error.message };
    }
  }

  // Generate summary
  const summary = {
    generatedAt: new Date().toISOString(),
    mode: USE_MOCK ? 'mock' : 'production',
    totalCharacters: Object.keys(CHARACTERS).length,
    totalImagesExpected: Object.keys(CHARACTERS).length * 50,
    results
  };

  const summaryPath = path.join(__dirname, 'generated', 'character-references', 'SUMMARY.json');
  await fs.writeJson(summaryPath, summary, { spaces: 2 });

  console.log(chalk.cyan.bold('\n═══════════════════════════════════════════════════════════'));
  console.log(chalk.green.bold('  ✓ Character Reference Generation Complete!'));
  console.log(chalk.cyan.bold('═══════════════════════════════════════════════════════════\n'));
  console.log(chalk.white(`Total characters: ${summary.totalCharacters}`));
  console.log(chalk.white(`Expected images: ${summary.totalImagesExpected}`));
  console.log(chalk.white(`Summary: ${summaryPath}\n`));
}

// CLI Interface
const args = process.argv.slice(2);
const command = args[0];

if (command === 'all') {
  generateAllCharacters().catch(console.error);
} else if (command && CHARACTERS[command]) {
  generateCharacterReferences(command).catch(console.error);
} else {
  console.log(chalk.cyan.bold('\n═══════════════════════════════════════════════════════════'));
  console.log(chalk.cyan.bold('  ION Give A Fuq - Character Consistency Generator'));
  console.log(chalk.cyan.bold('═══════════════════════════════════════════════════════════\n'));
  console.log(chalk.white('Usage:'));
  console.log(chalk.yellow('  node generate_character_consistency.js all'));
  console.log(chalk.yellow('  node generate_character_consistency.js <character>\n'));
  console.log(chalk.white('Characters:'));
  Object.keys(CHARACTERS).forEach(key => {
    console.log(chalk.yellow(`  - ${key} (${CHARACTERS[key].name})`));
  });
  console.log();
}
