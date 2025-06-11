import fs from 'fs-extra';

async function generateVideoProduction() {
  console.log('🎬 Creating comprehensive video production package...\n');
  
  // Load the dramatic Rizzo episode for video adaptation
  const episodeFiles = await fs.readdir('generated/episodes');
  const rizzoEpisode = episodeFiles.find(f => f.includes('98de3eca-bc17-4aa5-a214-0da1aa93e805'));
  
  if (!rizzoEpisode) {
    console.error('Rizzo episode not found!');
    return;
  }
  
  const episode = await fs.readJson(`generated/episodes/${rizzoEpisode.replace('.md', '.json')}`);
  
  // Create comprehensive video production package
  const videoProduction = {
    project_name: 'ION Give A Fuq: Dr. Needham\'s Return',
    episode_title: episode.title,
    target_runtime: '3-4 minutes',
    production_type: 'Dramatic short film with dark humor',
    priority: 'HIGH - Flagship dramatic content',
    
    technical_specs: {
      resolution: '1920x1080 (Full HD)',
      framerate: '24fps',
      aspect_ratio: '16:9',
      color_space: 'Rec. 709',
      audio_format: '48kHz/24-bit stereo',
      compression: 'H.264 high profile',
      file_format: 'MP4 container'
    },
    
    visual_style: {
      art_direction: 'Gritty urban realism with cyberpunk neon accents',
      color_grading: 'Desaturated with selective neon highlights',
      lighting_mood: 'Dramatic shadows, harsh fluorescents, medical cold lighting',
      camera_style: 'Handheld feel, intimate close-ups, dramatic angles',
      animation_style: 'Limited animation with detailed character expressions',
      effects_style: 'Minimal but impactful - smoke, neon flicker, shadows'
    },
    
    audio_design: {
      dialogue_style: 'Clear, character-appropriate voice acting',
      sound_effects: 'Urban ambience, medical equipment, footsteps, breathing',
      music_style: 'Minimal atmospheric score, tension-building',
      ambient_audio: 'Sewer drips, distant traffic, fluorescent hum',
      mixing_approach: 'Dialogue-forward with immersive environmental audio'
    },
    
    production_pipeline: await generateProductionPipeline(),
    shot_list: await generateDetailedShotList(episode),
    character_animation_specs: await generateAnimationSpecs(),
    environment_assets: await generateEnvironmentAssets(),
    visual_effects_specs: await generateVFXSpecs(),
    post_production_guide: await generatePostProductionGuide()
  };
  
  // Save comprehensive production package
  const prodPath = `generated/video-production/RIZZO_DRAMATIC_EPISODE_PRODUCTION_${Date.now()}.json`;
  await fs.ensureDir('generated/video-production');
  await fs.writeJson(prodPath, videoProduction, { spaces: 2 });
  
  // Create production markdown
  const prodMarkdown = await formatProductionGuide(videoProduction);
  const prodMdPath = `generated/video-production/PRODUCTION_GUIDE_${Date.now()}.md`;
  await fs.writeFile(prodMdPath, prodMarkdown);
  
  // Generate individual component files
  await generateIndividualAssets(videoProduction);
  
  console.log(`🎬 Video production package created: ${prodMdPath}`);
  console.log('📁 Individual asset files generated in video-production directory');
  
  return videoProduction;
}

async function generateProductionPipeline() {
  return {
    phase_1_preproduction: {
      duration: '1-2 days',
      tasks: [
        'Generate all character reference images using detailed prompts',
        'Create environment backgrounds for each scene location',
        'Record voice acting sessions for all dialogue',
        'Create sound effect library for urban environments',
        'Design motion graphics templates for neon effects'
      ]
    },
    phase_2_asset_creation: {
      duration: '2-3 days', 
      tasks: [
        'Create character animation rigs for each mascot',
        'Build environment assets with proper layering',
        'Generate prop models (cigarettes, bottles, medical equipment)',
        'Create particle effects for smoke, steam, sparks',
        'Design typography and text overlays'
      ]
    },
    phase_3_animation: {
      duration: '3-4 days',
      tasks: [
        'Animate character performances for each scene',
        'Create camera movements and transitions',
        'Implement lighting changes and effects',
        'Add secondary animation (smoke, background elements)',
        'Time all actions to audio tracks'
      ]
    },
    phase_4_post_production: {
      duration: '1-2 days',
      tasks: [
        'Color grading and visual consistency passes',
        'Audio mixing and sound design integration', 
        'Add visual effects and neon highlights',
        'Final editing and pacing adjustments',
        'Export final video in multiple formats'
      ]
    }
  };
}

async function generateDetailedShotList(episode) {
  const shotList = {
    total_shots: 0,
    estimated_runtime: '3 minutes 30 seconds',
    scenes: []
  };
  
  let shotCounter = 1;
  
  episode.scenes.forEach((scene, sceneIndex) => {
    const sceneShots = {
      scene_number: scene.scene_number,
      scene_title: scene.title,
      location: scene.location,
      time_of_day: scene.time_of_day,
      mood: scene.mood,
      estimated_duration: '45-60 seconds',
      shots: []
    };
    
    // Generate 8-12 shots per scene for dramatic pacing
    const shotCount = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < shotCount; i++) {
      const shot = {
        shot_number: shotCounter++,
        duration: '3-8 seconds',
        shot_type: generateShotType(i, shotCount),
        camera_movement: generateCameraMovement(i, shotCount),
        framing: generateFraming(i, shotCount),
        subject: generateShotSubject(scene, i),
        lighting: generateShotLighting(scene, i),
        audio_focus: generateAudioFocus(scene, i),
        animation_notes: generateAnimationNotes(scene, i),
        image_prompt: generateShotImagePrompt(scene, i, shotCounter - 1),
        technical_notes: generateTechnicalNotes(scene, i)
      };
      
      sceneShots.shots.push(shot);
    }
    
    shotList.scenes.push(sceneShots);
  });
  
  shotList.total_shots = shotCounter - 1;
  return shotList;
}

function generateShotType(shotIndex, totalShots) {
  const shotTypes = [
    'Wide establishing shot',
    'Medium shot',
    'Close-up',
    'Extreme close-up',
    'Over-the-shoulder',
    'Point of view',
    'Reaction shot',
    'Cutaway',
    'Insert shot',
    'Two-shot'
  ];
  
  if (shotIndex === 0) return 'Wide establishing shot';
  if (shotIndex === totalShots - 1) return 'Wide conclusion shot';
  
  return shotTypes[Math.floor(Math.random() * shotTypes.length)];
}

function generateCameraMovement(shotIndex, totalShots) {
  const movements = [
    'Static hold',
    'Slow push in',
    'Pull back reveal',
    'Pan left to right',
    'Pan right to left',
    'Tilt up',
    'Tilt down',
    'Handheld follow',
    'Orbit around subject',
    'Zoom in slowly'
  ];
  
  return movements[Math.floor(Math.random() * movements.length)];
}

function generateFraming(shotIndex, totalShots) {
  const framings = [
    'Rule of thirds composition',
    'Centered subject',
    'Low angle dramatic',
    'High angle oppressive',
    'Dutch angle unsettling',
    'Symmetrical composition',
    'Depth of field focus',
    'Foreground/background layers',
    'Silhouette against light',
    'Environmental framing'
  ];
  
  return framings[Math.floor(Math.random() * framings.length)];
}

function generateShotSubject(scene, shotIndex) {
  const subjects = [
    'Rizzo in environment',
    'Dr. Needham looming presence',
    'Medical equipment detail',
    'Character reaction',
    'Environmental details',
    'Prop interaction',
    'Shadow and lighting',
    'Character dialogue',
    'Emotional beat',
    'Transition element'
  ];
  
  return subjects[Math.floor(Math.random() * subjects.length)];
}

function generateShotLighting(scene, shotIndex) {
  return `${scene.visual_details.mood_lighting} with dramatic shadows and ${scene.mood} atmosphere`;
}

function generateAudioFocus(scene, shotIndex) {
  const audioFoci = [
    'Character dialogue prominent',
    'Environmental ambience',
    'Sound effects emphasis',
    'Musical score highlight',
    'Breathing and intimacy',
    'Footsteps and movement',
    'Medical equipment sounds',
    'Urban background noise',
    'Silence for tension',
    'Mixed dialogue and effects'
  ];
  
  return audioFoci[Math.floor(Math.random() * audioFoci.length)];
}

function generateAnimationNotes(scene, shotIndex) {
  const notes = [
    'Subtle character breathing and micro-expressions',
    'Full performance animation with lip sync',
    'Limited animation - focus on key poses',
    'Secondary animation - smoke, steam, particles',
    'Camera movement animation only',
    'Character gesture and body language',
    'Facial expression changes',
    'Environmental animation - lights, shadows',
    'Prop interaction animation',
    'Transition animation between shots'
  ];
  
  return notes[Math.floor(Math.random() * notes.length)];
}

function generateShotImagePrompt(scene, shotIndex, shotNumber) {
  return `Shot ${shotNumber}: ${generateShotType(shotIndex, 10)} of ${scene.location}, ${scene.mood} atmosphere, Rizzo and supporting characters, cinematic lighting, professional film quality, detailed character animation, gritty urban realism style, ${scene.visual_details.mood_lighting}`;
}

function generateTechnicalNotes(scene, shotIndex) {
  const notes = [
    'Ensure character model consistency',
    'Color grade for mood and atmosphere',
    'Add particle effects for environmental detail',
    'Focus on facial expression detail',
    'Maintain lighting continuity',
    'Audio sync critical for this shot',
    'Special attention to character interaction',
    'Environmental storytelling important',
    'Transition setup for next shot',
    'Visual effects integration needed'
  ];
  
  return notes[Math.floor(Math.random() * notes.length)];
}

async function generateAnimationSpecs() {
  return {
    character_rigs: {
      rizzo: {
        facial_controls: 'Eyes (X-scars), mouth, eyebrows, ear movement',
        body_controls: 'Full body IK, tail animation, breathing cycle',
        props: 'Skull bandana, poison bottle, medical equipment interaction',
        special_features: 'Coughing animation, pain reactions, defensive postures'
      },
      dr_needham: {
        facial_controls: 'Sinister expressions, glasses adjustment, mouth movements',
        body_controls: 'Authoritative posture, lab coat movement, hand gestures',
        props: 'Clipboard, medical instruments, keys',
        special_features: 'Intimidating presence, clinical movements'
      },
      supporting_characters: {
        controls: 'Basic facial and body animation for reactions',
        interaction: 'Limited but authentic character responses'
      }
    },
    animation_principles: {
      timing: '24fps with held frames for emphasis',
      spacing: 'Slower timing for dramatic moments, quick cuts for tension',
      anticipation: 'Strong anticipation for character reactions',
      follow_through: 'Natural follow-through on all movements',
      arcs: 'Natural movement arcs for organic feel',
      staging: 'Clear staging for dramatic storytelling'
    },
    performance_guidelines: {
      rizzo_performance: 'Defensive, wary, building to courageous defiance',
      needham_performance: 'Cold, clinical, increasingly threatening',
      emotional_arc: 'Tension building to confrontation to resolution',
      dialogue_timing: 'Allow pauses for emotional weight',
      physical_acting: 'Subtle but clear body language storytelling'
    }
  };
}

async function generateEnvironmentAssets() {
  return {
    locations: {
      municipal_court: {
        description: 'Harsh fluorescent lighting, institutional feel, cold and bureaucratic',
        key_elements: 'Benches, filing cabinets, forms, fluorescent lights',
        lighting_setup: 'Cold overhead fluorescents with harsh shadows',
        atmosphere: 'Oppressive, institutional, dehumanizing',
        camera_positions: 'Low angles to emphasize institutional power'
      },
      laundromat_24hour: {
        description: 'Spinning cycles of futility, industrial detergent smell, late night isolation',
        key_elements: 'Washing machines, dryers, fluorescent lights, plastic chairs',
        lighting_setup: 'Mixed fluorescent and machine indicator lights',
        atmosphere: 'Lonely, cyclical, working-class struggle',
        camera_positions: 'Medium shots through machines, reflections in glass'
      },
      sals_dive_bar: {
        description: 'Where hope goes to die and problems get temporarily drowned',
        key_elements: 'Bar stools, neon beer signs, sticky floors, regulars',
        lighting_setup: 'Warm amber lighting with neon highlights',
        atmosphere: 'Familiar desperation, working-class camaraderie',
        camera_positions: 'Bar-level shots, mirror reflections, intimate angles'
      },
      needham_lab_flashback: {
        description: 'Clinical horror, medical equipment, sterile environment',
        key_elements: 'Examination tables, medical instruments, cages, computers',
        lighting_setup: 'Cold clinical lighting with harsh shadows',
        atmosphere: 'Threatening, medical horror, scientific detachment',
        camera_positions: 'Low angles from Rizzo\'s perspective, clinical overhead shots'
      }
    },
    environmental_storytelling: {
      wear_and_tear: 'Everything shows age, use, and neglect',
      class_indicators: 'Visual cues about economic struggle',
      emotional_resonance: 'Environments reflect character emotional states',
      practical_details: 'Functional elements that characters interact with'
    }
  };
}

async function generateVFXSpecs() {
  return {
    practical_effects: {
      cigarette_smoke: 'Realistic smoke animation for Scrapz scenes',
      neon_flicker: 'Subtle neon sign flickering for atmosphere',
      fluorescent_hum: 'Visual representation of harsh lighting',
      steam_effects: 'Environmental steam from pipes, vents',
      dust_particles: 'Floating dust in shafts of light'
    },
    digital_effects: {
      color_grading: 'Desaturated base with selective neon highlighting',
      light_rays: 'Dramatic light shafts through windows, doors',
      shadow_enhancement: 'Deepened shadows for dramatic contrast',
      glow_effects: 'Subtle glow on neon elements',
      atmospheric_haze: 'Slight haze for depth and mood'
    },
    character_effects: {
      rizzo_scars: 'Subtle highlighting of X-shaped eye scars',
      needham_presence: 'Subtle menacing aura through lighting',
      breathing_vapor: 'Visible breath in cold environments',
      medical_equipment: 'Blinking lights, digital displays',
      emotional_highlights: 'Subtle color shifts for emotional beats'
    },
    transition_effects: {
      scene_transitions: 'Quick cuts with brief flash frames',
      time_transitions: 'Subtle time-of-day lighting changes',
      emotional_transitions: 'Color temperature shifts',
      flashback_effects: 'Desaturated, slightly blurred flashback sequences'
    }
  };
}

async function generatePostProductionGuide() {
  return {
    editing_approach: {
      pacing: 'Deliberate pacing building to dramatic climax',
      cuts: 'Sharp cuts for tension, holds for emotional weight',
      transitions: 'Minimal transitions - focus on story flow',
      rhythm: 'Audio-driven editing rhythm'
    },
    color_grading: {
      base_look: 'Desaturated, slightly cool base tone',
      highlights: 'Selective neon color enhancement',
      shadows: 'Deep, rich shadows with retained detail',
      skin_tones: 'Natural but slightly desaturated',
      mood_shifts: 'Subtle color temperature changes for emotional beats'
    },
    audio_mixing: {
      dialogue: 'Clear, present, character-appropriate levels',
      sound_effects: 'Immersive but not overwhelming',
      music: 'Subtle, atmospheric, supporting not leading',
      ambience: 'Rich environmental soundscape',
      dynamic_range: 'Full dynamic range for emotional impact'
    },
    final_output: {
      master_version: '1920x1080, 24fps, high bitrate for archival',
      web_version: '1920x1080, 24fps, optimized for streaming',
      social_clips: 'Various short clips for social media promotion',
      behind_scenes: 'Making-of content showing process'
    }
  };
}

async function generateIndividualAssets(videoProduction) {
  // Generate shot list spreadsheet
  const shotListCSV = generateShotListCSV(videoProduction.shot_list);
  await fs.writeFile('generated/video-production/SHOT_LIST.csv', shotListCSV);
  
  // Generate character animation reference
  const animRef = JSON.stringify(videoProduction.character_animation_specs, null, 2);
  await fs.writeFile('generated/video-production/CHARACTER_ANIMATION_SPECS.json', animRef);
  
  // Generate environment asset list
  const envAssets = JSON.stringify(videoProduction.environment_assets, null, 2);
  await fs.writeFile('generated/video-production/ENVIRONMENT_ASSETS.json', envAssets);
  
  // Generate VFX specifications
  const vfxSpecs = JSON.stringify(videoProduction.visual_effects_specs, null, 2);
  await fs.writeFile('generated/video-production/VFX_SPECIFICATIONS.json', vfxSpecs);
  
  console.log('📄 Individual asset files generated successfully');
}

function generateShotListCSV(shotList) {
  let csv = 'Shot Number,Scene,Duration,Shot Type,Camera Movement,Framing,Subject,Audio Focus,Technical Notes\n';
  
  shotList.scenes.forEach(scene => {
    scene.shots.forEach(shot => {
      csv += `${shot.shot_number},${scene.scene_number},${shot.duration},"${shot.shot_type}","${shot.camera_movement}","${shot.framing}","${shot.subject}","${shot.audio_focus}","${shot.technical_notes}"\n`;
    });
  });
  
  return csv;
}

async function formatProductionGuide(production) {
  return `# ${production.project_name}

**Episode:** ${production.episode_title}  
**Target Runtime:** ${production.target_runtime}  
**Production Type:** ${production.production_type}  
**Priority:** ${production.priority}

## Technical Specifications

${Object.entries(production.technical_specs).map(([key, value]) => `- **${key.replace('_', ' ')}:** ${value}`).join('\n')}

## Visual Style

${Object.entries(production.visual_style).map(([key, value]) => `### ${key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n${value}`).join('\n\n')}

## Audio Design

${Object.entries(production.audio_design).map(([key, value]) => `### ${key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n${value}`).join('\n\n')}

## Production Pipeline

${Object.entries(production.production_pipeline).map(([phase, details]) => `### ${phase.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n**Duration:** ${details.duration}\n**Tasks:**\n${details.tasks.map(task => `- ${task}`).join('\n')}`).join('\n\n')}

## Shot Breakdown

**Total Shots:** ${production.shot_list.total_shots}  
**Estimated Runtime:** ${production.shot_list.estimated_runtime}

${production.shot_list.scenes.map(scene => `### Scene ${scene.scene_number}: ${scene.scene_title}\n**Location:** ${scene.location}\n**Duration:** ${scene.estimated_duration}\n**Shot Count:** ${scene.shots.length}`).join('\n\n')}

## Character Animation

${Object.entries(production.character_animation_specs.character_rigs).map(([char, specs]) => `### ${char.replace(/\b\w/g, l => l.toUpperCase())}\n${Object.entries(specs).map(([key, value]) => `- **${key.replace('_', ' ')}:** ${value}`).join('\n')}`).join('\n\n')}

## Environment Assets

${Object.entries(production.environment_assets.locations).map(([loc, details]) => `### ${loc.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n**Description:** ${details.description}\n**Key Elements:** ${details.key_elements}\n**Lighting:** ${details.lighting_setup}\n**Atmosphere:** ${details.atmosphere}`).join('\n\n')}

## Visual Effects

${Object.entries(production.visual_effects_specs).map(([category, effects]) => `### ${category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n${Object.entries(effects).map(([effect, desc]) => `- **${effect.replace('_', ' ')}:** ${desc}`).join('\n')}`).join('\n\n')}

## Post-Production

${Object.entries(production.post_production_guide).map(([section, details]) => `### ${section.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n${typeof details === 'object' ? Object.entries(details).map(([key, value]) => `- **${key.replace('_', ' ')}:** ${value}`).join('\n') : details}`).join('\n\n')}

---

*Comprehensive production guide for ION Give A Fuq dramatic episode*
*All specifications designed for professional video production quality*
`;
}

generateVideoProduction().catch(console.error);
