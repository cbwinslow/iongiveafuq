import EpisodeGenerator from './generators/episodeGenerator.js';
import fs from 'fs-extra';

const generator = new EpisodeGenerator();

async function generateContinuationStories() {
  console.log('🎭 Generating continuation stories...\n');
  
  // Continuation stories building on previous episodes
  const continuations = [
    {
      mascot: 'dumbo',
      title: 'Dumbo: The Eviction Notice Strikes Back',
      theme: 'Rock bottom has a basement',
      type: 'slice_of_life',
      setup: 'After his previous failure to handle basic adulting, Dumbo faces the consequences when his landlord arrives with backup'
    },
    {
      mascot: 'scrapz', 
      title: 'Scrapz: Trust Issues Intensify',
      theme: 'Good intentions, terrible execution',
      type: 'caper',
      setup: 'Following his last encounter with well-meaning humans, Scrapz gets reluctantly involved in Mickey the Dealer\'s latest scheme'
    },
    {
      mascot: 'patty',
      title: 'Patty LaHam: When the Spotlight Fades',
      theme: 'False hope is the cruelest hope', 
      type: 'relationship_drama',
      setup: 'After her last performance disaster, Patty receives an unexpected offer that seems too good to be true'
    },
    {
      mascot: 'buzz',
      title: 'Buzz: The Morning After Reality Check',
      theme: 'The system is rigged',
      type: 'workplace_comedy',
      setup: 'Buzz wakes up to discover he somehow agreed to a job interview while blackout drunk'
    },
    {
      mascot: 'rizzo', // This will be our dramatic focus
      title: 'Rizzo: Dr. Needham\'s Return',
      theme: 'Some bridges are meant to be burned',
      type: 'revenge_plot',
      setup: 'Rizzo\'s worst nightmare comes true when Dr. Needham tracks him down with a new experimental proposal'
    }
  ];

  const episodes = [];
  
  for (const cont of continuations) {
    console.log(`Generating: ${cont.title}...`);
    
    const episode = generator.generateEpisode({
      primaryMascot: cont.mascot,
      theme: cont.theme,
      episodeType: cont.type,
      includeVillain: cont.mascot === 'rizzo' // Include villain for dramatic Rizzo story
    });
    
    // Override title and setup for continuity
    episode.title = cont.title;
    episode.setup = cont.setup;
    episode.continuation = true;
    episode.dramatic_focus = cont.mascot === 'rizzo';
    
    const files = await generator.saveEpisode(episode);
    
    console.log(`✓ Generated: "${episode.title}"`);
    console.log(`  Theme: ${cont.theme}`);
    console.log(`  Dramatic Focus: ${episode.dramatic_focus ? 'YES' : 'No'}`);
    console.log(`  Files: ${files.markdown}\n`);
    
    episodes.push(episode);
  }
  
  // Generate video storyboard for dramatic Rizzo episode
  const rizzoEpisode = episodes.find(e => e.primary_mascot === 'rizzo');
  if (rizzoEpisode) {
    console.log('🎬 Generating video storyboard for dramatic episode...');
    await generateVideoStoryboard(rizzoEpisode);
  }
  
  console.log('🎭 All continuation stories generated!');
  return episodes;
}

async function generateVideoStoryboard(episode) {
  const storyboard = {
    episode_id: episode.id,
    title: episode.title,
    total_runtime: '3-4 minutes',
    video_format: 'Sequential 5-10 second clips',
    dramatic_focus: true,
    scenes: []
  };
  
  // Break each episode scene into 5-10 second video clips
  episode.scenes.forEach((scene, sceneIndex) => {
    const sceneClips = generateSceneClips(scene, sceneIndex, episode);
    storyboard.scenes.push({
      scene_number: scene.scene_number,
      scene_title: scene.title,
      total_scene_time: `${sceneClips.length * 7}s (approx)`,
      clips: sceneClips
    });
  });
  
  // Add video production notes
  storyboard.production_notes = {
    character_consistency: 'Maintain exact character designs from previous episodes',
    art_style: 'Gritty urban realism with cyberpunk neon accents',
    animation_style: 'Limited animation with detailed character expressions',
    color_palette: 'Muted grays with neon pink, green, blue highlights',
    mood_lighting: 'Dramatic shadows, harsh fluorescents, neon underlighting',
    camera_work: 'Close-ups for emotional beats, wide shots for environment',
    transitions: 'Quick cuts for tension, slow fades for mood'
  };
  
  storyboard.audio_direction = {
    dialogue: 'Authentic character voices with environmental audio',
    sound_effects: 'Urban decay ambience, dripping, distant sirens',
    music: 'Minimal, atmospheric, tension-building',
    voice_acting: 'Match established character speech patterns exactly'
  };
  
  // Save storyboard
  const storyboardPath = `generated/video-storyboards/storyboard_${episode.id}_${Date.now()}.json`;
  await fs.ensureDir('generated/video-storyboards');
  await fs.writeJson(storyboardPath, storyboard, { spaces: 2 });
  
  // Create detailed video script
  const videoScript = formatVideoScript(storyboard);
  const scriptPath = `generated/video-storyboards/video_script_${episode.id}_${Date.now()}.md`;
  await fs.writeFile(scriptPath, videoScript);
  
  console.log(`📹 Video storyboard saved: ${storyboardPath}`);
  console.log(`📝 Video script saved: ${scriptPath}`);
}

function generateSceneClips(scene, sceneIndex, episode) {
  const clips = [];
  const baseClipDuration = 7; // seconds
  
  // Opening clip - establish scene
  clips.push({
    clip_number: 1,
    duration: '5-8 seconds',
    shot_type: 'Wide establishing shot',
    description: `Establish ${scene.location} at ${scene.time_of_day}. ${scene.visual_details.setting_description}`,
    camera_movement: 'Slow zoom in',
    lighting: scene.visual_details.mood_lighting,
    audio: 'Environmental ambience, location-specific sounds',
    character_focus: 'Environment setup',
    image_prompt: `Cinematic establishing shot of ${scene.location}, ${scene.visual_details.setting_description}, ${scene.mood} atmosphere, professional film quality, detailed urban environment`
  });
  
  // Character introduction clip
  clips.push({
    clip_number: 2, 
    duration: '6-10 seconds',
    shot_type: 'Medium shot to close-up',
    description: `${episode.primary_mascot} enters scene. ${scene.action.substring(0, 100)}...`,
    camera_movement: 'Follow character movement',
    lighting: 'Character-focused lighting',
    audio: 'Footsteps, character breathing, ambient sounds',
    character_focus: episode.primary_mascot,
    image_prompt: `${episode.primary_mascot} character shot in ${scene.location}, detailed character model, authentic personality expression, ${scene.mood} mood, cinematic lighting`
  });
  
  // Dialogue/action clips (2-3 clips per scene)
  const dialogueCount = Math.min(scene.dialogue?.length || 2, 3);
  for (let i = 0; i < dialogueCount; i++) {
    const dialogue = scene.dialogue?.[i];
    clips.push({
      clip_number: 3 + i,
      duration: '5-8 seconds',
      shot_type: dialogue ? 'Close-up for dialogue' : 'Medium shot for action',
      description: dialogue ? `${dialogue.speaker}: "${dialogue.line}"` : `Action beat: ${scene.action.substring(100, 200)}...`,
      camera_movement: 'Subtle push-in for emphasis',
      lighting: 'Dramatic character lighting',
      audio: dialogue ? `${dialogue.speaker} voice acting: ${dialogue.tone}` : 'Action sound effects',
      character_focus: dialogue?.speaker || episode.primary_mascot,
      image_prompt: `Close-up shot of ${dialogue?.speaker || episode.primary_mascot} speaking/acting, detailed facial expression, ${scene.mood} emotion, professional character animation quality`
    });
  }
  
  // Scene conclusion clip
  clips.push({
    clip_number: clips.length + 1,
    duration: '4-6 seconds', 
    shot_type: 'Pull back or reaction shot',
    description: `Scene conclusion: ${scene.action.substring(-100)}`,
    camera_movement: 'Slow pull back or hold',
    lighting: 'Transition lighting to next scene',
    audio: 'Scene conclusion sounds, transition music',
    character_focus: 'All characters in scene',
    image_prompt: `Final scene shot with all characters, ${scene.location} environment, transition moment, cinematic composition`
  });
  
  return clips;
}

function formatVideoScript(storyboard) {
  let script = `# Video Production Script: ${storyboard.title}

**Total Runtime:** ${storyboard.total_runtime}  
**Format:** ${storyboard.video_format}  
**Dramatic Focus:** ${storyboard.dramatic_focus ? 'HIGH DRAMA EPISODE' : 'Standard Episode'}

## Production Notes

### Visual Consistency
${storyboard.production_notes.character_consistency}

### Art Direction
- **Style:** ${storyboard.production_notes.art_style}
- **Animation:** ${storyboard.production_notes.animation_style}
- **Colors:** ${storyboard.production_notes.color_palette}
- **Lighting:** ${storyboard.production_notes.mood_lighting}

### Camera Work
- **Movement:** ${storyboard.production_notes.camera_work}
- **Transitions:** ${storyboard.production_notes.transitions}

### Audio Direction
- **Dialogue:** ${storyboard.audio_direction.dialogue}
- **SFX:** ${storyboard.audio_direction.sound_effects}
- **Music:** ${storyboard.audio_direction.music}
- **Voice:** ${storyboard.audio_direction.voice_acting}

## Scene Breakdown

`;

  storyboard.scenes.forEach(scene => {
    script += `### Scene ${scene.scene_number}: ${scene.scene_title}
**Total Time:** ${scene.total_scene_time}

`;
    
    scene.clips.forEach(clip => {
      script += `#### Clip ${clip.clip_number} (${clip.duration})
**Shot:** ${clip.shot_type}  
**Camera:** ${clip.camera_movement}  
**Focus:** ${clip.character_focus}

**Description:** ${clip.description}

**Lighting:** ${clip.lighting}  
**Audio:** ${clip.audio}

**Image Prompt:** ${clip.image_prompt}

---
`;
    });
    script += '\n';
  });

  script += `
## Video Assembly Instructions

1. **Pre-Production:**
   - Generate all images using provided prompts
   - Ensure character model consistency across all clips
   - Create environment assets for each location

2. **Production:**
   - Animate each 5-10 second clip individually
   - Focus on character expression and believable movement
   - Maintain lighting consistency within scenes

3. **Post-Production:**
   - Sequence clips according to storyboard timing
   - Add transition effects between scenes
   - Layer audio: dialogue, SFX, ambient, music
   - Color correction for mood consistency

4. **Quality Control:**
   - Verify character appearance matches established designs
   - Check audio sync and clarity
   - Ensure dramatic pacing for emotional impact

---
*Generated by ION Give A Fuq Video Production System*
`;

  return script;
}

generateContinuationStories().catch(console.error);
