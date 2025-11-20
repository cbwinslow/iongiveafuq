# Gemini Integration - Example Usage

This document demonstrates practical examples of using the Google Gemini integration to generate and animate content.

## Example 1: Generate Character Reference Images

```bash
# Using CLI
npm run gemini-demo character-refs
```

**Output:**
```
🎨 Generating character reference sheets for all mascots...

Generating reference for Dumbo...
Generating reference for Scrapz...
Generating reference for Patty...
Generating reference for Buzz...
Generating reference for Rizzo...

✅ Generation complete!
Results:
  dumbo: ✓
    → ./generated/images/character_ref_dumbo.json
  scrapz: ✓
    → ./generated/images/character_ref_scrapz.json
  ...
```

## Example 2: Create Complete Character Package

```bash
# Generate everything needed for Dumbo
npm run gemini-demo character-package dumbo
```

**What You Get:**
- Character reference sheet (front, side, back views)
- Expression sheet (8 different emotions)
- 3 environment backgrounds (home, street, bar)
- 15-second promotional video

**Output Location:** `./generated/gemini-content/character_package_[uuid].json`

## Example 3: Generate Custom Images via CLI

```bash
# Simple image
npm run gemini-demo image "Dumbo the dog sitting on a worn couch"

# Detailed scene
npm run gemini-demo image "Scrapz the cat prowling through a dark alley at night, neon signs reflecting in puddles, gritty urban atmosphere"
```

## Example 4: Generate Custom Video via CLI

```bash
npm run gemini-demo video "Dumbo waking up on his couch, stretching, looking around confused at the pizza boxes"
```

## Example 5: Using the API - Generate Image

```bash
curl -X POST http://localhost:3000/api/gemini/image/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Dumbo the dog in his apartment, surrounded by clutter",
    "style": "gritty urban realism",
    "width": 1024,
    "height": 1024,
    "characterRef": "Dumbo - scruffy brown dog with tired eyes",
    "negativePrompt": "bright colors, happy atmosphere"
  }'
```

**Response:**
```json
{
  "success": true,
  "imagePath": "./generated/images/image_1234567890.json",
  "metadata": {
    "prompt": "Dumbo - scruffy brown dog with tired eyes. Dumbo the dog in his apartment, surrounded by clutter. Style: gritty urban realism. High quality, detailed, professional artwork. Avoid: bright colors, happy atmosphere",
    "enhancedPrompt": "[AI-generated detailed prompt]",
    "style": "gritty urban realism",
    "width": 1024,
    "height": 1024,
    "timestamp": "2025-11-20T13:00:00.000Z",
    "model": "imagen-3"
  }
}
```

## Example 6: Generate Video via API

```bash
curl -X POST http://localhost:3000/api/gemini/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Dumbo discovering his apartment is a mess",
    "scenes": [
      "Opening shot: Dumbo sleeping on couch",
      "Dumbo opens eyes slowly",
      "Dumbo sits up, looks around",
      "Camera pans showing pizza boxes and clutter",
      "Dumbo sighs and lies back down"
    ],
    "duration": 15,
    "style": "cinematic animation",
    "aspectRatio": "16:9"
  }'
```

## Example 7: Animate Existing Content

First, generate an episode:
```bash
npm run generate-episode
```

This creates a file like `./generated/episodes/episode_[uuid].json`

Then animate it:
```bash
curl -X POST http://localhost:3000/api/gemini/animate/episode \
  -H "Content-Type: application/json" \
  -d '{
    "episodeId": "episode_[uuid]"
  }'
```

**Note:** Replace `[uuid]` with the actual episode ID from the generated file.

## Example 8: Programmatic Usage in JavaScript

```javascript
import geminiService from './services/geminiService.js';
import GeminiContentGenerator from './generators/geminiContentGenerator.js';
import { MASCOTS } from './data/mascots.js';

// Initialize generator
const generator = new GeminiContentGenerator();

// Generate a single image
async function generateSceneImage() {
  const result = await geminiService.generateImage({
    prompt: 'Dumbo sitting on his couch, pizza box open on lap',
    style: 'gritty urban realism',
    width: 1024,
    height: 1024,
    characterRef: MASCOTS.dumbo.description
  });
  
  console.log('Image saved to:', result.imagePath);
  return result;
}

// Generate a video sequence
async function generateStoryVideo() {
  const scenes = [
    { description: 'Dumbo on couch', duration: 3 },
    { description: 'Phone rings', duration: 2 },
    { description: 'Dumbo ignores phone', duration: 3 },
    { description: 'Goes back to sleep', duration: 2 }
  ];
  
  const result = await geminiService.generateVideo({
    prompt: 'A day in the life of Dumbo',
    scenes: scenes.map(s => s.description),
    duration: scenes.reduce((sum, s) => sum + s.duration, 0),
    style: 'slice of life animation',
    aspectRatio: '16:9',
    characterRefs: ['Dumbo']
  });
  
  console.log('Video saved to:', result.videoPath);
  return result;
}

// Generate complete character package
async function setupCharacter() {
  const pkg = await generator.generateCharacterPackage('dumbo');
  console.log('Package ID:', pkg.package_id);
  console.log('Components:', Object.keys(pkg.components));
  return pkg;
}

// Run examples
await generateSceneImage();
await generateStoryVideo();
await setupCharacter();
```

## Example 9: Batch Processing

Generate multiple images at once:

```bash
curl -X POST http://localhost:3000/api/gemini/batch/images \
  -H "Content-Type: application/json" \
  -d '{
    "prompts": [
      {
        "prompt": "Dumbo on couch",
        "style": "comic book art",
        "width": 1024,
        "height": 768
      },
      {
        "prompt": "Scrapz in alley",
        "style": "noir style",
        "width": 1024,
        "height": 768
      },
      {
        "prompt": "Buzz at bar",
        "style": "atmospheric illustration",
        "width": 1024,
        "height": 768
      }
    ]
  }'
```

## Example 10: Comic Strip to Animation

Generate a comic:
```bash
npm run generate-comic
```

Convert it to animation:
```bash
curl -X POST http://localhost:3000/api/gemini/animate/comic \
  -H "Content-Type: application/json" \
  -d '{
    "comicId": "comic_[uuid]"
  }'
```

## Example 11: Web Interface

Start the web server:
```bash
npm run web
```

Open http://localhost:3000 in your browser, then:

1. Navigate to character generation
2. Select "Dumbo" from mascot dropdown
3. Click "Generate Character Package"
4. Wait for generation to complete
5. View generated files in `./generated/gemini-content/`

## Example 12: Testing Without API Key

All examples work in mock mode without a Google API key:

```bash
# This works without GOOGLE_API_KEY
npm run gemini-demo test

# Mock image generation
npm run gemini-demo image "Test prompt"
```

Mock mode:
- Generates metadata files
- Does not make real API calls
- Perfect for development and testing
- Shows what the real API would generate

## Tips for Best Results

### Image Generation
1. **Be Specific**: Include character details, setting, mood, lighting
2. **Use Style Guides**: Reference existing art styles
3. **Negative Prompts**: Specify what to avoid
4. **Character References**: Provide consistent character descriptions

### Video Generation
1. **Scene Breakdown**: Divide story into clear scenes
2. **Duration Planning**: Allow enough time per scene (3-5 seconds minimum)
3. **Transitions**: Plan how scenes connect
4. **Character Consistency**: Use same character references throughout

### Batch Operations
1. **Group Similar Requests**: Process related content together
2. **Monitor Progress**: Check generated files incrementally
3. **Error Handling**: Handle partial failures in batches
4. **Resource Management**: Be mindful of API quotas

## Common Patterns

### Pattern 1: Content Pipeline
```
Generate Story → Generate Images → Generate Video → Publish
```

### Pattern 2: Character Development
```
Character Refs → Expression Sheets → Environment Backgrounds → Test Animations
```

### Pattern 3: Episode Production
```
Write Episode → Generate Scenes → Create Storyboard → Animate → Add Effects
```

## Output Files

All generated content is organized in:
```
storyteller/generated/
├── images/           # Individual images
├── videos/           # Individual videos
└── gemini-content/   # Complete packages
```

Each file contains metadata about the generation request and can be used as input for subsequent operations.

## Next Steps

1. Try the examples above
2. Modify prompts to match your needs
3. Combine multiple generations into complete content
4. Set up your Google API key for real generation
5. Explore the full API documentation in GEMINI_INTEGRATION.md
