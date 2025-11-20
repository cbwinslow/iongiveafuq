# Google Gemini Integration Guide

## Overview

The ION Give A Fuq storytelling agent now integrates with Google's Gemini AI platform to generate visual and animated content using:

- **Imagen 3**: Advanced image generation for character designs, scenes, and artwork
- **Veo 3**: Video generation and animation for bringing stories to life

## Setup

### 1. Install Dependencies

Dependencies are already included in `package.json`. If needed:

```bash
cd storyteller
npm install
```

### 2. Configure API Key

Get a Google API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

**Option A: Environment Variable**
```bash
export GOOGLE_API_KEY=your_api_key_here
```

**Option B: .env File**
```bash
# In the project root directory
echo "GOOGLE_API_KEY=your_api_key_here" >> .env
```

**Note**: Without an API key, the system runs in mock mode for testing and development.

## Features

### Image Generation with Imagen 3

Generate high-quality images for characters, scenes, and environments.

**Supported Features:**
- Character reference sheets
- Expression sheets
- Scene illustrations
- Background environments
- Comic panel artwork
- Custom dimensions and styles

**Example:**
```javascript
import geminiService from './services/geminiService.js';

const result = await geminiService.generateImage({
  prompt: 'Dumbo the dog sitting on a couch surrounded by pizza boxes',
  style: 'gritty urban realism',
  width: 1024,
  height: 1024,
  characterRef: 'Dumbo - scruffy dog with tired eyes',
  negativePrompt: 'blurry, low quality'
});
```

### Video Generation with Veo 3

Create animated videos from text descriptions or existing content.

**Supported Features:**
- Scene-by-scene video generation
- Episode animation
- Comic strip animation
- Promotional videos
- Customizable duration and style

**Example:**
```javascript
const result = await geminiService.generateVideo({
  prompt: 'Dumbo waking up on his couch, looking around confused',
  scenes: [
    'Opening shot of cluttered apartment',
    'Close-up of Dumbo opening eyes',
    'Dumbo sits up, surveys his surroundings'
  ],
  duration: 15,
  style: 'cinematic animation',
  aspectRatio: '16:9',
  fps: 24
});
```

### Content Animation

Automatically convert existing content (episodes, comics) into animated videos.

**Example:**
```javascript
// Load an episode
const episode = await fs.readJson('./generated/episodes/episode_id.json');

// Animate it
const result = await geminiService.animateContent(episode, 'episode');
```

## CLI Usage

### Gemini Demo Tool

The `gemini-demo.js` script provides easy command-line access to Gemini features.

**Basic Commands:**

```bash
# Run integration tests
npm run gemini-demo test

# Generate character references for all mascots
npm run gemini-demo character-refs

# Generate complete visual package for a character
npm run gemini-demo character-package dumbo

# Generate a custom image
npm run gemini-demo image "Scrapz the cat in a dark alley at night"

# Generate a custom video
npm run gemini-demo video "Buzz the donkey walking into a bar"
```

## API Endpoints

### Check Status

```bash
GET /api/gemini/status
```

Returns:
```json
{
  "enabled": true,
  "models": {
    "imagen": "imagen-3",
    "veo": "veo-3"
  },
  "timestamp": "2025-11-20T13:00:00.000Z"
}
```

### Generate Image

```bash
POST /api/gemini/image/generate
Content-Type: application/json

{
  "prompt": "Character illustration of Dumbo",
  "style": "gritty urban realism",
  "width": 1024,
  "height": 1024
}
```

### Generate Video

```bash
POST /api/gemini/video/generate
Content-Type: application/json

{
  "prompt": "Short scene of Dumbo on his couch",
  "scenes": ["Dumbo sleeping", "Dumbo wakes up"],
  "duration": 10,
  "style": "animated"
}
```

### Animate Episode

```bash
POST /api/gemini/animate/episode
Content-Type: application/json

{
  "episodeId": "episode-uuid-here"
}
```

### Animate Comic

```bash
POST /api/gemini/animate/comic
Content-Type: application/json

{
  "comicId": "comic-uuid-here"
}
```

### Generate Character Package

```bash
POST /api/gemini/generate/character-package
Content-Type: application/json

{
  "mascot": "dumbo"
}
```

Creates a complete visual package including:
- Character reference sheet
- Expression sheet
- Environment backgrounds (home, street, bar)
- Promotional video (15 seconds)

### Generate Character References

```bash
POST /api/gemini/generate/character-references
```

Generates reference sheets for all mascots.

### Batch Image Generation

```bash
POST /api/gemini/batch/images
Content-Type: application/json

{
  "prompts": [
    {"prompt": "Dumbo on couch", "style": "illustration"},
    {"prompt": "Scrapz in alley", "style": "noir"}
  ]
}
```

## Programming Guide

### Using GeminiService

The `geminiService` is a singleton that handles all Gemini API interactions.

```javascript
import geminiService from './services/geminiService.js';

// Check if service is enabled
if (geminiService.isEnabled()) {
  console.log('Gemini is ready!');
}

// Generate an image
const imageResult = await geminiService.generateImage({
  prompt: 'Your image description',
  style: 'artistic style',
  width: 1024,
  height: 1024
});

if (imageResult.success) {
  console.log('Image saved to:', imageResult.imagePath);
}
```

### Using GeminiContentGenerator

The `GeminiContentGenerator` provides high-level content generation methods.

```javascript
import GeminiContentGenerator from './generators/geminiContentGenerator.js';

const generator = new GeminiContentGenerator();

// Generate character references
const refs = await generator.generateCharacterReferences();

// Generate complete character package
const package = await generator.generateCharacterPackage('dumbo');

// Generate images for a backstory
const backstoryImages = await generator.generateBackstoryImages(backstory);

// Animate a comic
const animatedComic = await generator.animateComic(comic);

// Generate episode video
const episodeVideo = await generator.generateEpisodeVideo(episode);
```

## Output Structure

Generated content is organized in the following directories:

```
storyteller/generated/
├── images/              # Individual images from Imagen 3
├── videos/              # Videos from Veo 3
└── gemini-content/      # Complete packages and metadata
```

### Output Files

**Image Output:**
```json
{
  "prompt": "Original prompt",
  "enhancedPrompt": "AI-enhanced detailed prompt",
  "style": "gritty urban realism",
  "width": 1024,
  "height": 1024,
  "characterRef": "Character reference text",
  "timestamp": "2025-11-20T13:00:00.000Z",
  "status": "ready_for_generation",
  "model": "imagen-3"
}
```

**Video Output:**
```json
{
  "prompt": "Original prompt",
  "videoSpec": "Detailed shot-by-shot breakdown",
  "scenes": [...],
  "duration": 15,
  "style": "cinematic animation",
  "aspectRatio": "16:9",
  "fps": 24,
  "timestamp": "2025-11-20T13:00:00.000Z",
  "status": "ready_for_generation",
  "model": "veo-3"
}
```

## Customization

### Image Styles

Supported visual styles:
- `gritty urban realism` - Default style for the project
- `comic book art` - Comic strip style
- `noir comic book style` - Dark, high-contrast
- `cyberpunk comic art` - Neon-accented futuristic
- `character reference sheet` - Clean, multi-angle design
- `cinematic animation` - Film-quality rendering

### Video Settings

- **Duration**: 5-60 seconds (configurable)
- **Aspect Ratios**: 16:9, 9:16, 1:1
- **Frame Rates**: 24fps, 30fps, 60fps
- **Styles**: Cinematic, animated, comic book, realistic

## Mock Mode

When `GOOGLE_API_KEY` is not set, the system operates in mock mode:

- All API calls succeed with mock responses
- No actual API requests are made
- Metadata files are still generated
- Perfect for testing and development

Example mock response:
```json
{
  "success": true,
  "mock": true,
  "imagePath": "./generated/images/mock_image.json",
  "message": "Mock image generation. Set GOOGLE_API_KEY to use real API."
}
```

## Testing

Run the test suite:

```bash
npm test
```

This runs `test/gemini.test.js` which validates:
- Service initialization
- Image generation
- Video generation
- Content animation
- Generator initialization

## Best Practices

### Prompts

**Good Prompts:**
- Be specific and descriptive
- Include character details
- Specify mood and atmosphere
- Mention style preferences

**Example:**
```
"Dumbo the dog, scruffy brown fur with tired eyes, sitting on a worn 
couch in a cluttered apartment. Pizza boxes scattered around. Late 
afternoon lighting through dusty windows. Gritty urban realism style."
```

### Performance

- Generate images before videos (videos may use images as references)
- Use batch processing for multiple images
- Cache character references for consistency
- Monitor API usage and costs

### Error Handling

Always check the `success` field in responses:

```javascript
const result = await geminiService.generateImage(options);

if (!result.success) {
  console.error('Generation failed:', result.error);
  // Handle error
} else {
  console.log('Success:', result.imagePath);
}
```

## Troubleshooting

### API Key Issues

**Problem**: "GOOGLE_API_KEY not set" warning
**Solution**: Set the environment variable or add to .env file

**Problem**: "API key invalid"
**Solution**: Verify key at https://makersuite.google.com/app/apikey

### Generation Issues

**Problem**: Images/videos not generating
**Solution**: 
1. Check API key is valid
2. Verify internet connectivity
3. Check API quota and billing
4. Review error messages in console

**Problem**: Poor quality output
**Solution**:
1. Improve prompt specificity
2. Add style guidance
3. Use negative prompts to avoid unwanted elements
4. Adjust resolution settings

## API Limits and Costs

- Check Google AI Studio for current pricing
- Monitor usage in Google Cloud Console
- Implement rate limiting for production use
- Use mock mode for development to avoid costs

## Future Enhancements

Potential additions:
- Real-time streaming for video generation
- Image-to-video conversion
- Voice generation integration
- Multi-character scene generation
- Automated storyboard creation
- Style transfer between images

## Support

For issues or questions:
1. Check this documentation
2. Review error messages in console
3. Test with mock mode first
4. Verify API key and permissions
5. Check Google AI documentation

## Example Workflows

### Generate Complete Character Assets

```bash
# 1. Generate character package
npm run gemini-demo character-package dumbo

# 2. Generate backstory
node generators/backstoryGenerator.js dumbo

# 3. Generate images for backstory
curl -X POST http://localhost:3000/api/gemini/generate/backstory-images \
  -H "Content-Type: application/json" \
  -d '{"backstoryId": "backstory-uuid"}'
```

### Create Animated Episode

```bash
# 1. Generate episode
node generators/episodeGenerator.js

# 2. Animate episode
curl -X POST http://localhost:3000/api/gemini/animate/episode \
  -H "Content-Type: application/json" \
  -d '{"episodeId": "episode-uuid"}'
```

### Batch Generate Character References

```bash
# Generate all character references
npm run gemini-demo character-refs

# Or via API
curl -X POST http://localhost:3000/api/gemini/generate/character-references
```

---

**Note**: This integration is designed to work with Google's Gemini API. As the API evolves, features and capabilities may change. Always refer to the latest Google AI documentation for the most current information.
