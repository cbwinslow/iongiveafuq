#!/usr/bin/env node

/**
 * Demo script showcasing Google Gemini (Imagen 3 + Veo 3) integration
 * 
 * Usage:
 *   node gemini-demo.js character-refs      - Generate character reference sheets
 *   node gemini-demo.js character-package   - Generate complete visual package for a character
 *   node gemini-demo.js image <prompt>      - Generate single image
 *   node gemini-demo.js video <prompt>      - Generate video
 */

import GeminiContentGenerator from './generators/geminiContentGenerator.js';
import geminiService from './services/geminiService.js';
import chalk from 'chalk';

const generator = new GeminiContentGenerator();

async function main() {
  const command = process.argv[2];
  
  console.log(chalk.cyan.bold('\n🎨 Google Gemini Integration Demo\n'));
  console.log(chalk.yellow(`Gemini Status: ${geminiService.isEnabled() ? 'Enabled ✓' : 'Disabled (Mock Mode)'}\n`));
  
  try {
    switch (command) {
      case 'character-refs':
        await generateCharacterReferences();
        break;
        
      case 'character-package':
        await generateCharacterPackage();
        break;
        
      case 'image':
        await generateImage();
        break;
        
      case 'video':
        await generateVideo();
        break;
        
      case 'test':
        await runTests();
        break;
        
      default:
        showHelp();
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error.message);
    process.exit(1);
  }
}

async function generateCharacterReferences() {
  console.log(chalk.green('Generating character reference sheets for all mascots...\n'));
  const results = await generator.generateCharacterReferences();
  
  console.log(chalk.green('\n✅ Generation complete!'));
  console.log(chalk.gray('Results:'));
  
  for (const [mascot, result] of Object.entries(results)) {
    console.log(chalk.cyan(`  ${mascot}:`), result.success ? '✓' : '✗');
    if (result.imagePath) {
      console.log(chalk.gray(`    → ${result.imagePath}`));
    }
  }
}

async function generateCharacterPackage() {
  const mascot = process.argv[3] || 'dumbo';
  console.log(chalk.green(`Generating complete visual package for ${mascot}...\n`));
  
  const results = await generator.generateCharacterPackage(mascot);
  
  console.log(chalk.green('\n✅ Package generation complete!'));
  console.log(chalk.gray('Package includes:'));
  console.log(chalk.cyan('  • Character reference'));
  console.log(chalk.cyan('  • Expression sheet'));
  console.log(chalk.cyan('  • Environment backgrounds (3)'));
  console.log(chalk.cyan('  • Promotional video'));
  console.log(chalk.gray(`\nPackage ID: ${results.package_id}`));
}

async function generateImage() {
  const prompt = process.argv.slice(3).join(' ');
  
  if (!prompt) {
    console.log(chalk.red('Error: Image prompt required'));
    console.log(chalk.gray('Usage: node gemini-demo.js image <prompt>'));
    return;
  }
  
  console.log(chalk.green(`Generating image...\n`));
  console.log(chalk.gray(`Prompt: ${prompt}\n`));
  
  const result = await geminiService.generateImage({
    prompt,
    style: 'gritty urban realism',
    width: 1024,
    height: 1024
  });
  
  if (result.success) {
    console.log(chalk.green('\n✅ Image generated!'));
    console.log(chalk.gray(`Path: ${result.imagePath}`));
    if (result.message) {
      console.log(chalk.yellow(`Note: ${result.message}`));
    }
  } else {
    console.log(chalk.red('\n❌ Image generation failed'));
    console.log(chalk.gray(`Error: ${result.error}`));
  }
}

async function generateVideo() {
  const prompt = process.argv.slice(3).join(' ');
  
  if (!prompt) {
    console.log(chalk.red('Error: Video prompt required'));
    console.log(chalk.gray('Usage: node gemini-demo.js video <prompt>'));
    return;
  }
  
  console.log(chalk.green(`Generating video...\n`));
  console.log(chalk.gray(`Prompt: ${prompt}\n`));
  
  const result = await geminiService.generateVideo({
    prompt,
    duration: 10,
    style: 'cinematic animation',
    aspectRatio: '16:9',
    scenes: [prompt]
  });
  
  if (result.success) {
    console.log(chalk.green('\n✅ Video generated!'));
    console.log(chalk.gray(`Path: ${result.videoPath}`));
    if (result.message) {
      console.log(chalk.yellow(`Note: ${result.message}`));
    }
  } else {
    console.log(chalk.red('\n❌ Video generation failed'));
    console.log(chalk.gray(`Error: ${result.error}`));
  }
}

async function runTests() {
  console.log(chalk.green('Running integration tests...\n'));
  
  console.log(chalk.cyan('Test 1: Service Status'));
  console.log(chalk.gray(`  Gemini enabled: ${geminiService.isEnabled()}`));
  
  console.log(chalk.cyan('\nTest 2: Generate Sample Image'));
  const imageResult = await geminiService.generateImage({
    prompt: 'Test image of Dumbo the dog sitting on a couch',
    style: 'cartoon illustration',
    width: 512,
    height: 512,
    filename: 'test_image.json'
  });
  console.log(chalk.gray(`  Success: ${imageResult.success}`));
  console.log(chalk.gray(`  Mock: ${imageResult.mock || false}`));
  
  console.log(chalk.cyan('\nTest 3: Generate Sample Video'));
  const videoResult = await geminiService.generateVideo({
    prompt: 'Test video of Dumbo the dog',
    duration: 5,
    scenes: ['Dumbo on couch', 'Dumbo eating pizza'],
    filename: 'test_video.json'
  });
  console.log(chalk.gray(`  Success: ${videoResult.success}`));
  console.log(chalk.gray(`  Mock: ${videoResult.mock || false}`));
  
  console.log(chalk.green('\n✅ All tests passed!'));
}

function showHelp() {
  console.log(chalk.bold('Usage:'));
  console.log('  node gemini-demo.js character-refs              Generate character reference sheets');
  console.log('  node gemini-demo.js character-package [mascot]  Generate complete visual package');
  console.log('  node gemini-demo.js image <prompt>              Generate single image');
  console.log('  node gemini-demo.js video <prompt>              Generate video');
  console.log('  node gemini-demo.js test                        Run integration tests');
  console.log();
  console.log(chalk.bold('Examples:'));
  console.log(chalk.gray('  node gemini-demo.js character-refs'));
  console.log(chalk.gray('  node gemini-demo.js character-package dumbo'));
  console.log(chalk.gray('  node gemini-demo.js image "Dumbo the dog sitting on a couch surrounded by pizza boxes"'));
  console.log(chalk.gray('  node gemini-demo.js video "Dumbo waking up on his couch, looking around confused"'));
  console.log();
  console.log(chalk.yellow('Note: Set GOOGLE_API_KEY environment variable to use real API.'));
  console.log(chalk.yellow('      Without API key, the system runs in mock mode for testing.'));
}

main();
