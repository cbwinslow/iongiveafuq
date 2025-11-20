# ION Give A Fuq - Storytelling Agent

A comprehensive dark humor storytelling agent that generates backstories, episodic content, and comic strips for the ION Give A Fuq mascots. This agent creates authentic, character-driven narratives with a gritty urban aesthetic and consistent dark comedy tone.

## 🎭 Features

- **📖 Backstory Generation**: Deep, detailed character backstories with dark humor and authentic psychological depth
- **🎬 Episode Creation**: Multi-scene episodes with dialogue, character interactions, and narrative arcs
- **📰 Comic Strip Generation**: Complete comic scripts with panel layouts, dialogue, and art direction
- **🎨 Google Gemini Integration**: Image generation with Imagen 3 and video animation with Veo 3
- **🌐 Web Interface**: User-friendly web app for content generation and management
- **🎲 Random Generation**: AI-driven content creation with thematic consistency
- **⚙️ Content Management**: File organization, statistics, and batch operations

## 📁 Project Structure

```
storyteller/
├── data/
│   └── mascots.js              # Character database and story elements
├── generators/
│   ├── backstoryGenerator.js   # Detailed character backstory creation
│   ├── episodeGenerator.js     # Multi-scene episode generation
│   ├── comicGenerator.js       # Comic strip and panel creation
│   └── geminiContentGenerator.js # Gemini AI visual content generation
├── services/
│   └── geminiService.js        # Google Gemini API integration
├── web/
│   ├── server.js              # Express web server with REST API
│   └── public/
│       └── index.html         # Web interface
├── generated/                 # Output directory for all content
│   ├── backstories/          # Character backstory files
│   ├── episodes/             # Episode scripts and markdown
│   └── comics/               # Comic scripts and art direction
├── index.js                  # CLI interface
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🚀 Installation

1. **Clone or navigate to the storyteller directory:**
   ```bash
   cd storyteller
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create output directories:**
   ```bash
   mkdir -p generated/{backstories,episodes,comics,images,videos,gemini-content}
   ```

4. **Configure Google Gemini API (optional):**
   ```bash
   # Set your Google API key for Gemini features
   export GOOGLE_API_KEY=your_api_key_here
   
   # Or create a .env file in the project root
   echo "GOOGLE_API_KEY=your_api_key_here" >> ../.env
   ```
   
   Note: Without an API key, the system runs in mock mode for testing.

## 🎯 Usage

### Command Line Interface

**Start the interactive CLI:**
```bash
npm start
```

**Generate specific content:**
```bash
# Generate backstory for specific mascot
npm run generate-backstories dumbo

# Generate a single episode
npm run generate-episode

# Generate comics
npm run generate-comic

# Run Gemini integration demo
npm run gemini-demo test
npm run gemini-demo character-refs
npm run gemini-demo character-package dumbo
```

### Web Interface

**Start the web server:**
```bash
npm run web
```

Then open http://localhost:3000 in your browser.

**Features available in web interface:**
- Interactive mascot selection
- Customizable content generation
- Real-time content preview
- File management and statistics
- Batch content creation

### API Endpoints

The web server provides a REST API for programmatic access:

#### Mascots
- `GET /api/mascots` - List all mascots
- `GET /api/mascots/:mascot` - Get specific mascot data

#### Backstories
- `POST /api/backstories/generate` - Generate single backstory
- `POST /api/backstories/generate-all` - Generate all backstories

#### Episodes
- `POST /api/episodes/generate` - Generate single episode
- `POST /api/episodes/generate-series` - Generate episode series

#### Comics
- `POST /api/comics/generate` - Generate single comic
- `POST /api/comics/generate-series` - Generate comic series
- `POST /api/comics/themed` - Generate themed comics

#### Content Management
- `GET /api/content/stats` - Get content statistics
- `GET /api/content/list` - List all generated content
- `POST /api/package/generate` - Generate complete content package

#### Google Gemini Integration
- `GET /api/gemini/status` - Check Gemini API status
- `POST /api/gemini/image/generate` - Generate image with Imagen 3
- `POST /api/gemini/video/generate` - Generate video with Veo 3
- `POST /api/gemini/animate/episode` - Animate an episode
- `POST /api/gemini/animate/comic` - Animate a comic
- `POST /api/gemini/generate/character-references` - Generate character reference sheets
- `POST /api/gemini/generate/character-package` - Generate complete visual package for a character
- `POST /api/gemini/generate/backstory-images` - Generate images for a backstory
- `POST /api/gemini/generate/episode-video` - Generate video for an episode
- `POST /api/gemini/generate/comic-animation` - Generate animated comic

## 🎨 Character Profiles

### Dumbo the Dog
- **Tier**: Fuqs
- **Personality**: Goofy, carefree, chronically unemployed
- **Setting**: Cluttered apartment, permanent couch resident
- **Voice**: Defeated resignation with occasional frustrated energy

### Scrapz the Cat
- **Tier**: Shits  
- **Personality**: Sarcastic, street-smart, emotionally unavailable
- **Setting**: Urban alleys, dive bars, abandoned buildings
- **Voice**: Sharp cynicism barely masking deeper hurt

### Patty LaHam the Pig
- **Tier**: Bonus
- **Personality**: Flamboyant, dramatic, struggling performer
- **Setting**: Underground drag clubs, seedy motels
- **Voice**: Theatrical drama covering genuine vulnerability

### Buzz the Donkey
- **Tier**: Damns
- **Personality**: Friendly drunk, perpetually optimistic despite failure
- **Setting**: Dive bars, unemployment office, park benches
- **Voice**: Slurred optimism fighting bitter reality

### Rizzo the Rat
- **Tier**: Ultimate Despair
- **Personality**: Morbidly humorous, unlucky, philosophically dark
- **Setting**: Sewers, abandoned buildings, margins of society
- **Voice**: Dark humor as defense against trauma

## 📝 Content Examples

### Backstory Output
```markdown
# The Couch Chronicles: How Dreams Die in Pizza Boxes

**Character:** Dumbo  
**Generated:** 2024-06-11

## Origin Story
Dumbo wasn't always a couch-dwelling waste of fur and potential. Once upon a time—back when he still showered regularly—he was Dennis "Dumbo" McGillicuddy, junior marketing executive at Synergy Solutions Inc...

## The Turning Point
The exact moment Dumbo gave up can be pinpointed to 3:47 PM on a rainy Thursday in March...

## Current State
Present-day Dumbo exists in a carefully constructed ecosystem of minimal effort and maximum comfort...
```

### Episode Output
```markdown
# Dumbo's Tuesday from Hell

**Episode ID:** ep_12345
**Primary Character:** Dumbo
**Theme:** Rock bottom isn't the bottom

## Plot Outline
Dumbo faces a typical day that goes from bad to worse when his simple plan attracts unwanted attention...

## Scene 1: Rock Bottom Has a Basement
**Location:** The Broken Dreams Apartment Complex
**Action:** Dumbo begins their day with the usual routine of avoiding responsibility...
```

### Comic Output
```markdown
# Dumbo's Daily Dose of Reality

**Format:** three_panel (Classic three-panel format, setup-development-punchline)
**Style:** gritty urban realism

## Panel 1
**Composition:** wide establishing shot
**Description:** Opening panel establishing Dumbo in their typical environment...
**Dialogue:** "Well, shit. Another day, another disappointment."
```

## 🎲 Story Elements

### Themes
- Rock bottom isn't the bottom
- Good intentions, terrible execution
- The system is rigged
- False hope is the cruelest hope
- Everyone's got their vice
- Misery loves company

### Locations
- Sal's Dive Bar
- The Roach Motel  
- Unemployment Office
- 24-Hour Laundromat
- Pawn Shop Paradise
- The Broken Dreams Apartment Complex

### Recurring Characters
- **Villains**: Dr. Needham (mad scientist), Slumlord Jenkins, Officer Kowalski
- **NPCs**: Sal the Bartender, Mickey the Dealer, Karen the Social Worker
- **Supporting Cast**: Madame Zelda, Eddie the Pawn Shop Owner

## 🎨 Visual Style Guide

### Art Direction
- **Aesthetic**: Gritty urban realism with cyberpunk neon accents
- **Color Palette**: Muted grays with neon pink, green, and blue highlights
- **Mood**: Dark humor grounded in authentic emotional truth
- **Character Design**: Consistent with mascot reference sheets
- **Environment**: Detailed urban decay, lived-in spaces

### Comic Formats
- **Single Panel**: Editorial cartoon style
- **Three Panel**: Classic setup-development-punchline
- **Four Panel**: Extended narrative development
- **Six Panel**: Complex storytelling with multiple beats
- **Full Page**: Magazine-style layout with varied panel sizes

## 🔧 Development

### Adding New Content Types
1. Create generator class in `generators/`
2. Add API endpoints in `web/server.js`
3. Update web interface in `web/public/index.html`
4. Add CLI commands in `index.js`

### Character Development
- Expand `data/mascots.js` with new personality traits
- Add relationship dynamics in character database
- Create new recurring characters and villains
- Develop location-specific story elements

### Google Gemini Integration

The storytelling agent now integrates with Google's Gemini AI for visual and video content generation:

**🎨 Imagen 3 - Image Generation**
- Generate character reference sheets with consistent designs
- Create scene illustrations for backstories and episodes
- Produce comic panel artwork with style consistency
- Generate environment backgrounds and props
- Support for various artistic styles and dimensions

**🎬 Veo 3 - Video Generation**
- Animate episodes into video format
- Convert comic strips into animated sequences
- Generate promotional videos for characters
- Create scene-by-scene video productions
- Support for cinematic effects and transitions

**Features:**
- **Character Packages**: Complete visual asset packages including references, expressions, environments, and promo videos
- **Content Animation**: Automatically convert existing content (episodes, comics) into animated videos
- **Batch Processing**: Generate multiple images or videos in a single operation
- **Mock Mode**: Test integration without API key using simulated responses
- **Flexible Styling**: Control visual style, dimensions, and artistic direction

**Usage Examples:**

```javascript
// Generate character reference
const result = await geminiService.generateImage({
  prompt: 'Dumbo the dog character reference',
  style: 'character design sheet',
  width: 1024,
  height: 1024
});

// Animate an episode
const video = await geminiService.animateContent(episode, 'episode');

// Generate complete character package
const package = await geminiContentGenerator.generateCharacterPackage('dumbo');
```

**CLI Demo:**

```bash
# Test Gemini integration
npm run gemini-demo test

# Generate character references for all mascots
npm run gemini-demo character-refs

# Create complete visual package for a character
npm run gemini-demo character-package dumbo

# Generate custom image
npm run gemini-demo image "Dumbo sitting on couch surrounded by pizza boxes"

# Generate custom video
npm run gemini-demo video "Dumbo waking up, looking confused at his surroundings"
```

**API Endpoints:**

All Gemini endpoints are available at `/api/gemini/*`:
- Check status, generate images/videos, animate content, batch operations
- See API Endpoints section above for complete list

### Traditional API Integration
The storytelling agent can also integrate with:
- Text-to-speech services (for character voices)
- Content management systems
- Social media platforms

## 📊 Content Statistics

The system tracks:
- Character usage frequency
- Theme coverage
- Content type distribution
- File generation timestamps
- Story element utilization

## 🎯 Best Practices

### Story Quality
- Maintain authentic character voices
- Ground humor in emotional truth
- Avoid excessive shock value
- Build consistent character relationships
- Create realistic consequences for actions

### Technical
- Regular content backups
- Organized file naming conventions
- Consistent API response formats
- Error handling for all generators
- Performance monitoring for large batches

## 🚨 Content Warnings

This storytelling agent generates content with:
- Dark humor and cynical themes
- References to addiction and mental health
- Adult situations and language
- Social commentary and satire
- Authentic portrayals of struggle

All content is fictional and intended for mature audiences familiar with dark comedy genres.

## 📜 License

This project is part of the ION Give A Fuq ecosystem. All generated content maintains the established character voices and universe consistency.

## 🤝 Contributing

When adding new story elements:
1. Maintain character authenticity
2. Follow established voice patterns
3. Respect existing continuity
4. Test content generation thoroughly
5. Update documentation

---

*"Some stories don't have happy endings, just honest ones."* - Rizzo the Rat

Generated by ION Give A Fuq Storytelling Agent
