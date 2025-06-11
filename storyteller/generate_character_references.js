import fs from 'fs-extra';
import { MASCOTS } from './data/mascots.js';

async function generateCharacterReferences() {
  console.log('🎨 Generating detailed character reference sheets...\n');
  
  const characterRefs = {};
  
  for (const [key, mascot] of Object.entries(MASCOTS)) {
    console.log(`Creating reference sheet for ${mascot.name}...`);
    
    const reference = {
      character_name: mascot.name,
      species: mascot.species,
      tier: mascot.tier,
      tagline: mascot.tagline,
      visual_consistency: {
        core_design: generateCoreDesign(mascot),
        facial_features: generateFacialFeatures(mascot),
        body_language: generateBodyLanguage(mascot),
        clothing_accessories: generateClothingAccessories(mascot),
        color_palette: generateColorPalette(mascot),
        signature_poses: generateSignaturePoses(mascot),
        expression_guide: generateExpressionGuide(mascot)
      },
      animation_notes: {
        movement_style: generateMovementStyle(mascot),
        idle_animations: generateIdleAnimations(mascot),
        signature_gestures: generateSignatureGestures(mascot),
        emotional_tells: generateEmotionalTells(mascot)
      },
      voice_and_audio: {
        voice_description: mascot.personality.speech_pattern,
        catchphrases: [mascot.tagline],
        vocal_quirks: generateVocalQuirks(mascot),
        breathing_patterns: generateBreathingPatterns(mascot)
      },
      environmental_interaction: {
        preferred_locations: generatePreferredLocations(mascot),
        prop_interactions: generatePropInteractions(mascot),
        lighting_preferences: generateLightingPreferences(mascot),
        camera_angles: generateCameraAngles(mascot)
      },
      detailed_image_prompts: generateDetailedImagePrompts(mascot, key)
    };
    
    characterRefs[key] = reference;
    
    // Save individual reference sheet
    const refPath = `generated/character-references/reference_${key}_${Date.now()}.json`;
    await fs.ensureDir('generated/character-references');
    await fs.writeJson(refPath, reference, { spaces: 2 });
    
    // Create markdown version
    const markdown = formatReferenceSheet(reference);
    const mdPath = `generated/character-references/reference_${key}_${Date.now()}.md`;
    await fs.writeFile(mdPath, markdown);
    
    console.log(`✓ Reference sheet created: ${mdPath}`);
  }
  
  // Create master consistency guide
  const consistencyGuide = {
    project_name: 'ION Give A Fuq Character Universe',
    art_direction: {
      overall_style: 'Gritty urban realism with cyberpunk neon accents',
      character_rendering: 'Detailed, expressive, authentic to personality',
      environment_style: 'Urban decay with selective neon highlighting',
      color_philosophy: 'Muted reality with vibrant accent colors',
      lighting_approach: 'Dramatic shadows, harsh fluorescents, neon underlighting'
    },
    consistency_rules: {
      character_proportions: 'Maintain exact proportions across all media',
      facial_features: 'Keep signature features consistent (eyes, expressions, scars)',
      clothing_weathering: 'All items should show appropriate wear and damage',
      color_accuracy: 'Use exact color codes for signature items',
      personality_visual: 'Every pose and expression must reflect character personality'
    },
    technical_specifications: {
      resolution: 'Minimum 1920x1080 for video, 300dpi for print',
      file_formats: 'PNG with transparency for characters, JPG for backgrounds',
      animation_framerate: '24fps for smooth character animation',
      color_space: 'sRGB for digital, CMYK for print',
      layer_organization: 'Separate layers for character, props, background, effects'
    },
    characters: characterRefs
  };
  
  const guidePath = `generated/character-references/MASTER_CONSISTENCY_GUIDE_${Date.now()}.json`;
  await fs.writeJson(guidePath, consistencyGuide, { spaces: 2 });
  
  const guideMarkdown = formatConsistencyGuide(consistencyGuide);
  const guideMdPath = `generated/character-references/MASTER_CONSISTENCY_GUIDE_${Date.now()}.md`;
  await fs.writeFile(guideMdPath, guideMarkdown);
  
  console.log(`\n🎨 Master consistency guide created: ${guideMdPath}`);
  console.log('🎨 All character reference sheets generated!');
}

function generateCoreDesign(mascot) {
  const designs = {
    dumbo: 'Overweight dog with droopy, bloodshot eyes and permanent stubble. Slouched posture, always looks like he just woke up. Asymmetrical features suggesting poor life choices.',
    scrapz: 'Lean, scarred alley cat with torn left ear and missing patches of fur. Perpetual scowl, yellow teeth, always has cigarette. Battle-worn and street-hardened appearance.',
    patty: 'Theatrical pig in drag with exaggerated feminine features. Slightly smudged makeup, jewelry that\'s seen better days. Confident posture despite underlying vulnerability.',
    buzz: 'Slightly cross-eyed donkey with unsteady stance. Five o\'clock shadow, disheveled appearance. Always looks like he\'s swaying slightly from alcohol.',
    rizzo: 'Gaunt rat with greenish pallor and X-shaped scars over eyes. Wears tiny skull-and-crossbones bandana. Appears both fragile and resilient.'
  };
  
  return designs[mascot.name.toLowerCase()] || 'Standard character design with personality-appropriate wear and weathering';
}

function generateFacialFeatures(mascot) {
  const features = {
    dumbo: 'Large, droopy brown eyes with heavy lids. Wide, flat nose. Mouth usually slack or forming minimal expressions. Stubble on chin area.',
    scrapz: 'Sharp, narrow green eyes with permanent squint. Torn left ear with multiple notches. Scar across bridge of nose. Cigarette usually dangling from lips.',
    patty: 'Dramatic eye makeup (sometimes smudged). Long fake eyelashes. Lipstick in bold colors. Expressive eyebrows. Snout often lifted in confident pose.',
    buzz: 'Slightly crossed brown eyes that don\'t quite focus together. Scraggly beard. Red nose from drinking. Mouth often open in confused expression.',
    rizzo: 'Eyes marked with X-shaped scars, giving "cartoon dead" appearance but still expressive. Gaunt cheeks. Small skull bandana tied around head.'
  };
  
  return features[mascot.name.toLowerCase()] || 'Expressive features that reflect character personality and life experiences';
}

function generateBodyLanguage(mascot) {
  const bodyLanguage = {
    dumbo: 'Slouched shoulders, hands often in pockets or hanging limp. Slow, minimal movements. Sits heavily, sprawls when lying down.',
    scrapz: 'Tense, alert posture. Quick, efficient movements. Often crouched or ready to bolt. Smoking gestures are habitual and practiced.',
    patty: 'Dramatic, theatrical poses. Hand gestures emphasize speech. Hip cocked, chin up when confident. Deflates when vulnerable.',
    buzz: 'Unsteady on feet, slight sway even when standing still. Gestures with drink in hand. Leans on things for support.',
    rizzo: 'Careful, deliberate movements. Often hunched or curled up for protection. Quick, darting glances. Defensive positioning.'
  };
  
  return bodyLanguage[mascot.name.toLowerCase()] || 'Body language consistent with character personality and emotional state';
}

function generateClothingAccessories(mascot) {
  const clothing = {
    dumbo: 'Stained undershirt, boxers, sometimes ratty bathrobe. Everything is wrinkled and looks slept in. Mismatched socks.',
    scrapz: 'No clothing but always has cigarette. Sometimes wears torn leather jacket or bandana. Ash stains on fur.',
    patty: 'Sequined dress (often with loose sequins), feather boa, oversized sunglasses, gaudy jewelry. High heels. Everything sparkly but worn.',
    buzz: 'Stained tank top, flip-flops. Often has beer bottle in hand or tucked under arm. Clothes hang loose on frame.',
    rizzo: 'Skull-and-crossbones bandana is signature item. Sometimes has tiny poison bottle prop. Occasionally wears lab coat remnants.'
  };
  
  return clothing[mascot.name.toLowerCase()] || 'Clothing and accessories that reflect character\'s lifestyle and personality';
}

function generateColorPalette(mascot) {
  const palettes = {
    dumbo: 'Muted browns and grays for fur, yellowed whites for clothing, bloodshot red in eyes. Dull, desaturated colors overall.',
    scrapz: 'Gray and black striped fur with battle scars. Bright orange cigarette ember. Green eyes. Ash gray smoke.',
    patty: 'Pink and white pig coloring with bright makeup colors - hot pink lipstick, blue eyeshadow, gold jewelry. Sequins catch light.',
    buzz: 'Brown donkey fur with reddish nose from drinking. Stained yellow tank top. Brown beer bottles. Bloodshot eyes.',
    rizzo: 'Sickly green-gray fur, bright red blood in scars, black and white skull bandana, purple poison bottle.'
  };
  
  return palettes[mascot.name.toLowerCase()] || 'Color palette reflecting character mood and environment';
}

function generateSignaturePoses(mascot) {
  const poses = {
    dumbo: ['Sprawled on couch', 'Standing with shoulders slumped', 'Sitting with head in hands', 'Lying flat on back'],
    scrapz: ['Smoking while leaning against wall', 'Crouched and alert', 'Walking away dismissively', 'Flicking cigarette ash'],
    patty: ['Runway pose with hand on hip', 'Dramatic hair flip', 'Applying makeup in mirror', 'Collapsed in chair exhausted'],
    buzz: ['Swaying with beer bottle', 'Leaning on bar', 'Stumbling forward', 'Passed out in chair'],
    rizzo: ['Curled up defensively', 'Peering cautiously around corner', 'Lying on back playing dead', 'Hunched over in thought']
  };
  
  return poses[mascot.name.toLowerCase()] || ['Standing neutral', 'Sitting relaxed', 'Walking forward', 'Emotional reaction'];
}

function generateExpressionGuide(mascot) {
  const expressions = {
    dumbo: {
      default: 'Blank, slightly confused stare',
      annoyed: 'Heavy sigh, rolling eyes',
      surprised: 'Mouth slightly open, eyebrows raised minimally',
      defeated: 'Eyes closed, head hanging down'
    },
    scrapz: {
      default: 'Perpetual scowl with cigarette',
      angry: 'Bared teeth, ears back, fur standing up',
      dismissive: 'Eye roll, turning head away',
      calculating: 'Narrow eyes, slight smirk'
    },
    patty: {
      default: 'Confident smile with chin up',
      dramatic: 'Hand to forehead, eyes closed',
      vulnerable: 'Makeup smudged, shoulders down',
      performing: 'Big smile, jazz hands'
    },
    buzz: {
      default: 'Confused but friendly expression',
      drunk: 'Lopsided grin, unfocused eyes',
      melancholy: 'Staring into distance sadly',
      optimistic: 'Wide smile despite circumstances'
    },
    rizzo: {
      default: 'Wary, guarded expression',
      philosophical: 'Thoughtful, looking up',
      pain: 'Wincing, holding side',
      dark_humor: 'Grim smile, knowing look'
    }
  };
  
  return expressions[mascot.name.toLowerCase()] || {
    default: 'Neutral expression',
    happy: 'Smile',
    sad: 'Frown',
    angry: 'Scowl'
  };
}

function generateMovementStyle(mascot) {
  const movement = {
    dumbo: 'Slow, lazy movements. Minimal effort in everything. Shuffles rather than walks.',
    scrapz: 'Quick, efficient, street-smart movements. Always aware of surroundings.',
    patty: 'Dramatic, theatrical movements. Exaggerated gestures when performing.',
    buzz: 'Unsteady, swaying movements. Often stumbles or sways.',
    rizzo: 'Careful, deliberate movements. Quick darting motions when startled.'
  };
  
  return movement[mascot.name.toLowerCase()] || 'Movement style appropriate to character personality';
}

function generateIdleAnimations(mascot) {
  const idles = {
    dumbo: ['Scratching belly', 'Yawning', 'Looking at phone', 'Adjusting position on couch'],
    scrapz: ['Taking drags from cigarette', 'Flicking ash', 'Grooming paw', 'Scanning environment'],
    patty: ['Checking makeup in compact mirror', 'Adjusting boa', 'Striking poses', 'Touching up lipstick'],
    buzz: ['Swaying slightly', 'Taking sips from bottle', 'Hiccupping', 'Looking around confused'],
    rizzo: ['Coughing weakly', 'Adjusting bandana', 'Twitching tail', 'Peering around cautiously']
  };
  
  return idles[mascot.name.toLowerCase()] || ['Standing normally', 'Breathing', 'Occasional blink'];
}

function generateSignatureGestures(mascot) {
  const gestures = {
    dumbo: ['Shrugging shoulders', 'Waving hand dismissively', 'Pointing at TV', 'Rubbing eyes'],
    scrapz: ['Flicking cigarette', 'Giving middle finger', 'Sharpening claws', 'Spitting'],
    patty: ['Hair flip', 'Hand on hip', 'Dramatic arm sweep', 'Blowing kisses'],
    buzz: ['Raising bottle in toast', 'Scratching head confused', 'Stumbling gestures', 'Pointing unsteadily'],
    rizzo: ['Touching scars', 'Defensive positioning', 'Philosophical pointing', 'Weak coughing']
  };
  
  return gestures[mascot.name.toLowerCase()] || ['Generic pointing', 'Hand waving', 'Head nodding'];
}

function generateEmotionalTells(mascot) {
  const tells = {
    dumbo: 'Gets even more slouched when sad, barely opens eyes when annoyed',
    scrapz: 'Fur stands up when angry, cigarette burns faster when stressed',
    patty: 'Makeup runs when crying, posture becomes rigid when defensive',
    buzz: 'Drinking increases when emotional, becomes more unsteady when upset',
    rizzo: 'Coughs more when stressed, curls up tighter when afraid'
  };
  
  return tells[mascot.name.toLowerCase()] || 'Emotional state reflected in posture and expression';
}

function generateVocalQuirks(mascot) {
  const quirks = {
    dumbo: 'Often trails off mid-sentence, frequent "uh" and "whatever" fillers',
    scrapz: 'Gravelly voice from smoking, lots of profanity, sharp delivery',
    patty: 'Dramatic inflection, extends vowels theatrically, uses honey/sweetie',
    buzz: 'Slight slur even when sober, hiccups, overly friendly tone',
    rizzo: 'Weak voice, occasional coughing fits, dry dark humor delivery'
  };
  
  return quirks[mascot.name.toLowerCase()] || 'Speech patterns consistent with character personality';
}

function generateBreathingPatterns(mascot) {
  const breathing = {
    dumbo: 'Heavy, labored breathing especially when moving',
    scrapz: 'Controlled breathing between cigarette drags',
    patty: 'Dramatic sighs, breath control for performance',
    buzz: 'Irregular breathing, occasional hiccups',
    rizzo: 'Shallow, careful breathing with occasional coughs'
  };
  
  return breathing[mascot.name.toLowerCase()] || 'Normal breathing pattern';
}

function generatePreferredLocations(mascot) {
  const locations = {
    dumbo: ['Living room couch', 'Bedroom', 'Kitchen (near fridge)', 'Bathroom'],
    scrapz: ['Dark alleys', 'Fire escapes', 'Rooftops', 'Behind dumpsters'],
    patty: ['Dressing rooms', 'Stage areas', 'Bars', 'Hotel rooms'],
    buzz: ['Dive bars', 'Bar stools', 'Park benches', 'Unemployment office'],
    rizzo: ['Sewers', 'Abandoned buildings', 'Medical facilities', 'Underground spaces']
  };
  
  return locations[mascot.name.toLowerCase()] || ['Various urban locations'];
}

function generatePropInteractions(mascot) {
  const props = {
    dumbo: 'Interacts with TV remote, pizza boxes, beer cans, couch cushions',
    scrapz: 'Always has cigarette, uses lighters, interacts with trash, climbs fire escapes',
    patty: 'Uses makeup, jewelry, mirrors, microphones, stage props',
    buzz: 'Holds beer bottles, leans on bars, uses ATMs, sits on stools',
    rizzo: 'Carries poison bottle, interacts with medical equipment, hides in small spaces'
  };
  
  return props[mascot.name.toLowerCase()] || 'Standard prop interactions';
}

function generateLightingPreferences(mascot) {
  const lighting = {
    dumbo: 'Dim, flickering TV light, harsh fluorescent overhead, lazy afternoon sunlight',
    scrapz: 'Harsh streetlights, neon signs, shadows and dramatic contrast',
    patty: 'Stage lights, vanity mirror bulbs, colorful neon, spotlight effects',
    buzz: 'Warm bar lighting, beer neon signs, dim atmospheric lighting',
    rizzo: 'Cold fluorescent, harsh medical lighting, deep shadows, green undertones'
  };
  
  return lighting[mascot.name.toLowerCase()] || 'Standard lighting appropriate to scene';
}

function generateCameraAngles(mascot) {
  const angles = {
    dumbo: 'Low angles emphasizing his lethargy, eye-level for relatability',
    scrapz: 'Street-level shots, dramatic angles emphasizing his edge',
    patty: 'Performance angles, mirror shots, dramatic high and low angles',
    buzz: 'Slightly unsteady camera work, bar-height shots, reaction shots',
    rizzo: 'Low angles from his perspective, medical/clinical angles, shadow play'
  };
  
  return angles[mascot.name.toLowerCase()] || 'Standard camera angles for clear character visibility';
}

function generateDetailedImagePrompts(mascot, key) {
  return {
    character_portrait: `Ultra-detailed character portrait of ${mascot.name}, ${generateCoreDesign(mascot)}, ${generateFacialFeatures(mascot)}, professional character design, consistent with ION Give A Fuq universe, gritty urban realism style, detailed fur/skin texture, authentic personality expression`,
    
    full_body_reference: `Full body reference sheet of ${mascot.name}, front view, side view, back view, ${generateBodyLanguage(mascot)}, ${generateClothingAccessories(mascot)}, character design consistency, detailed proportions, urban decay aesthetic`,
    
    expression_sheet: `Expression reference sheet for ${mascot.name}, showing multiple facial expressions: ${Object.keys(generateExpressionGuide(mascot)).join(', ')}, detailed emotional range, consistent character features, professional animation reference quality`,
    
    environment_shot: `${mascot.name} in natural environment: ${generatePreferredLocations(mascot)[0]}, ${generateLightingPreferences(mascot)}, detailed background, character interacting naturally with environment, cinematic composition`,
    
    action_pose: `${mascot.name} performing signature action: ${generateSignaturePoses(mascot)[0]}, dynamic pose, detailed character animation, consistent design, professional quality`,
    
    interaction_scene: `${mascot.name} interacting with other characters, detailed group scene, consistent character designs, authentic dialogue moment, professional illustration quality`
  };
}

function formatReferenceSheet(reference) {
  return `# Character Reference Sheet: ${reference.character_name}

**Species:** ${reference.species}  
**Tier:** ${reference.tier}  
**Tagline:** "${reference.tagline}"

## Visual Consistency

### Core Design
${reference.visual_consistency.core_design}

### Facial Features
${reference.visual_consistency.facial_features}

### Body Language
${reference.visual_consistency.body_language}

### Clothing & Accessories
${reference.visual_consistency.clothing_accessories}

### Color Palette
${reference.visual_consistency.color_palette}

### Signature Poses
${reference.visual_consistency.signature_poses.map(pose => `- ${pose}`).join('\n')}

### Expression Guide
${Object.entries(reference.visual_consistency.expression_guide).map(([mood, desc]) => `- **${mood}:** ${desc}`).join('\n')}

## Animation Notes

### Movement Style
${reference.animation_notes.movement_style}

### Idle Animations
${reference.animation_notes.idle_animations.map(idle => `- ${idle}`).join('\n')}

### Signature Gestures
${reference.animation_notes.signature_gestures.map(gesture => `- ${gesture}`).join('\n')}

### Emotional Tells
${reference.animation_notes.emotional_tells}

## Voice & Audio

### Voice Description
${reference.voice_and_audio.voice_description}

### Vocal Quirks
${reference.voice_and_audio.vocal_quirks}

### Breathing Patterns
${reference.voice_and_audio.breathing_patterns}

## Environmental Interaction

### Preferred Locations
${reference.environmental_interaction.preferred_locations.join(', ')}

### Prop Interactions
${reference.environmental_interaction.prop_interactions}

### Lighting Preferences
${reference.environmental_interaction.lighting_preferences}

### Camera Angles
${reference.environmental_interaction.camera_angles}

## Detailed Image Prompts

${Object.entries(reference.detailed_image_prompts).map(([type, prompt]) => `### ${type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n${prompt}`).join('\n\n')}

---
*Character Reference Sheet for ION Give A Fuq Universe*
`;
}

function formatConsistencyGuide(guide) {
  return `# ${guide.project_name} - Master Consistency Guide

## Art Direction

### Overall Style
${guide.art_direction.overall_style}

### Character Rendering
${guide.art_direction.character_rendering}

### Environment Style
${guide.art_direction.environment_style}

### Color Philosophy
${guide.art_direction.color_philosophy}

### Lighting Approach
${guide.art_direction.lighting_approach}

## Consistency Rules

${Object.entries(guide.consistency_rules).map(([rule, desc]) => `### ${rule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n${desc}`).join('\n\n')}

## Technical Specifications

${Object.entries(guide.technical_specifications).map(([spec, desc]) => `### ${spec.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n${desc}`).join('\n\n')}

## Character Index

${Object.entries(guide.characters).map(([key, char]) => `### ${char.character_name} (${char.species})\n**Tier:** ${char.tier}\n**Tagline:** "${char.tagline}"\n**Core Design:** ${char.visual_consistency.core_design.substring(0, 100)}...`).join('\n\n')}

---
*Master Consistency Guide for Visual Production*
`;
}

generateCharacterReferences().catch(console.error);
