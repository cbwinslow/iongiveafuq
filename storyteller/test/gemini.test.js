import geminiService from '../services/geminiService.js';
import GeminiContentGenerator from '../generators/geminiContentGenerator.js';
import { strict as assert } from 'assert';

/**
 * Basic tests for Gemini integration
 * These tests run in mock mode (without API key)
 */

console.log('🧪 Running Gemini integration tests...\n');

async function testGeminiService() {
  console.log('Test 1: Gemini Service Initialization');
  assert.ok(geminiService, 'Gemini service should be initialized');
  console.log('  ✓ Service initialized\n');
  
  console.log('Test 2: Image Generation');
  const imageResult = await geminiService.generateImage({
    prompt: 'Test character',
    style: 'cartoon',
    width: 512,
    height: 512
  });
  assert.strictEqual(imageResult.success, true, 'Image generation should succeed');
  assert.ok(imageResult.metadata, 'Should return metadata');
  console.log('  ✓ Image generation successful\n');
  
  console.log('Test 3: Video Generation');
  const videoResult = await geminiService.generateVideo({
    prompt: 'Test video',
    duration: 5,
    scenes: ['Scene 1', 'Scene 2']
  });
  assert.strictEqual(videoResult.success, true, 'Video generation should succeed');
  assert.ok(videoResult.metadata, 'Should return metadata');
  console.log('  ✓ Video generation successful\n');
  
  console.log('Test 4: Content Animation');
  const mockEpisode = {
    id: 'test-episode',
    title: 'Test Episode',
    scenes: [
      { description: 'Opening scene', dialogue: [] },
      { description: 'Closing scene', dialogue: [] }
    ]
  };
  const animationResult = await geminiService.animateContent(mockEpisode, 'episode');
  assert.strictEqual(animationResult.success, true, 'Animation should succeed');
  console.log('  ✓ Content animation successful\n');
}

async function testGeminiContentGenerator() {
  console.log('Test 5: Gemini Content Generator Initialization');
  const generator = new GeminiContentGenerator();
  assert.ok(generator, 'Generator should be initialized');
  console.log('  ✓ Generator initialized\n');
}

async function runTests() {
  try {
    await testGeminiService();
    await testGeminiContentGenerator();
    
    console.log('✅ All tests passed!\n');
    console.log('Note: Tests ran in mock mode. Set GOOGLE_API_KEY to test with real API.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

runTests();
