import { MASCOTS } from '../data/mascots.js';
import geminiService from '../services/geminiService.js';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generator that uses Google Gemini (Imagen 3 + Veo 3) to create visual and animated content
 */
class GeminiContentGenerator {
  constructor() {
    this.outputDir = './generated/gemini-content';
    fs.ensureDirSync(this.outputDir);
  }

  /**
   * Generate character reference images for all mascots
   * @returns {Promise<Object>} Results of image generation
   */
  async generateCharacterReferences() {
    console.log('🎨 Generating character reference images with Imagen 3...\n');
    
    const results = {};
    
    for (const [key, mascot] of Object.entries(MASCOTS)) {
      console.log(`Generating reference for ${mascot.name}...`);
      
      const characterPrompt = this.buildCharacterPrompt(mascot);
      
      const imageResult = await geminiService.generateImage({
        prompt: characterPrompt,
        style: 'character reference sheet, detailed illustration',
        width: 1024,
        height: 1024,
        negativePrompt: 'blurry, low quality, distorted, realistic photo',
        filename: `character_ref_${key}.json`
      });
      
      results[key] = imageResult;
    }
    
    // Save summary
    const summaryPath = path.join(this.outputDir, 'character_references_summary.json');
    await fs.writeJson(summaryPath, {
      generated_at: new Date().toISOString(),
      count: Object.keys(results).length,
      results
    }, { spaces: 2 });
    
    console.log(`\n✅ Character references generated: ${summaryPath}\n`);
    return results;
  }

  /**
   * Generate images for a backstory
   * @param {Object} backstory - Backstory object
   * @returns {Promise<Object>} Results of image generation
   */
  async generateBackstoryImages(backstory) {
    console.log(`🎨 Generating images for backstory: ${backstory.title}\n`);
    
    const results = [];
    
    // Generate images for key moments
    const imagesToGenerate = [
      {
        name: 'origin',
        prompt: backstory.image_prompts?.origin || this.buildBackstoryImagePrompt(backstory, 'origin')
      },
      {
        name: 'turning_point',
        prompt: backstory.image_prompts?.turning_point || this.buildBackstoryImagePrompt(backstory, 'turning_point')
      },
      {
        name: 'current_state',
        prompt: backstory.image_prompts?.current_state || this.buildBackstoryImagePrompt(backstory, 'current_state')
      }
    ];
    
    for (const imageSpec of imagesToGenerate) {
      const imageResult = await geminiService.generateImage({
        prompt: imageSpec.prompt,
        style: 'gritty urban realism, dramatic lighting',
        width: 1024,
        height: 1024,
        characterRef: `${backstory.mascot} - ${MASCOTS[backstory.mascot.toLowerCase()]?.description}`,
        filename: `backstory_${backstory.id}_${imageSpec.name}.json`
      });
      
      results.push({
        name: imageSpec.name,
        result: imageResult
      });
    }
    
    return {
      backstory_id: backstory.id,
      backstory_title: backstory.title,
      images: results,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Generate animated comic from comic script
   * @param {Object} comic - Comic object
   * @returns {Promise<Object>} Result of animation generation
   */
  async animateComic(comic) {
    console.log(`🎬 Animating comic: ${comic.title}\n`);
    
    // First, generate images for each panel
    const panelImages = [];
    
    for (let i = 0; i < comic.panels.length; i++) {
      const panel = comic.panels[i];
      
      const imageResult = await geminiService.generateImage({
        prompt: panel.image_prompt || panel.description,
        style: comic.style || 'comic book art',
        width: 1024,
        height: 768,
        characterRef: comic.primary_mascot,
        filename: `comic_${comic.id}_panel_${i + 1}.json`
      });
      
      panelImages.push({
        panel_number: i + 1,
        image: imageResult
      });
    }
    
    // Then, animate the comic as a video
    const animationResult = await geminiService.animateContent(comic, 'comic');
    
    return {
      comic_id: comic.id,
      comic_title: comic.title,
      panel_images: panelImages,
      animation: animationResult,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Generate animated episode video
   * @param {Object} episode - Episode object
   * @returns {Promise<Object>} Result of video generation
   */
  async generateEpisodeVideo(episode) {
    console.log(`🎬 Generating video for episode: ${episode.title}\n`);
    
    // Generate key frame images for each scene
    const sceneImages = [];
    
    for (let i = 0; i < episode.scenes.length; i++) {
      const scene = episode.scenes[i];
      
      const imageResult = await geminiService.generateImage({
        prompt: scene.image_prompts?.[0] || scene.description || scene.action,
        style: 'cinematic animation, dramatic lighting',
        width: 1920,
        height: 1080,
        characterRef: episode.primary_mascot,
        filename: `episode_${episode.id}_scene_${i + 1}.json`
      });
      
      sceneImages.push({
        scene_number: i + 1,
        scene_title: scene.title,
        image: imageResult
      });
    }
    
    // Generate the full animated video
    const videoResult = await geminiService.animateContent(episode, 'episode');
    
    return {
      episode_id: episode.id,
      episode_title: episode.title,
      scene_images: sceneImages,
      video: videoResult,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Generate complete visual package for a character
   * @param {string} mascotKey - Mascot identifier
   * @returns {Promise<Object>} Complete visual package
   */
  async generateCharacterPackage(mascotKey) {
    console.log(`📦 Generating complete visual package for ${mascotKey}...\n`);
    
    const mascot = MASCOTS[mascotKey];
    if (!mascot) {
      throw new Error(`Unknown mascot: ${mascotKey}`);
    }
    
    const packageId = uuidv4();
    const results = {
      package_id: packageId,
      mascot: mascot.name,
      timestamp: new Date().toISOString(),
      components: {}
    };
    
    // Character reference
    console.log('Generating character reference...');
    results.components.character_reference = await geminiService.generateImage({
      prompt: this.buildCharacterPrompt(mascot),
      style: 'character reference sheet, multiple angles',
      width: 1024,
      height: 1024,
      filename: `package_${packageId}_character_ref.json`
    });
    
    // Expression sheet
    console.log('Generating expression sheet...');
    results.components.expressions = await geminiService.generateImage({
      prompt: this.buildExpressionSheetPrompt(mascot),
      style: 'character expression sheet, multiple emotions',
      width: 1024,
      height: 1024,
      filename: `package_${packageId}_expressions.json`
    });
    
    // Environment backgrounds (3 key locations)
    console.log('Generating environment backgrounds...');
    const environments = ['home', 'street', 'bar'];
    results.components.environments = [];
    
    for (const env of environments) {
      const envResult = await geminiService.generateImage({
        prompt: this.buildEnvironmentPrompt(mascot, env),
        style: 'detailed background illustration, urban setting',
        width: 1920,
        height: 1080,
        filename: `package_${packageId}_env_${env}.json`
      });
      
      results.components.environments.push({
        location: env,
        result: envResult
      });
    }
    
    // Promotional video
    console.log('Generating promotional video...');
    results.components.promo_video = await geminiService.generateVideo({
      prompt: this.buildPromoVideoPrompt(mascot),
      duration: 15,
      style: 'cinematic trailer style',
      aspectRatio: '16:9',
      characterRefs: [mascot.name],
      filename: `package_${packageId}_promo.json`
    });
    
    // Save package summary
    const packagePath = path.join(this.outputDir, `character_package_${packageId}.json`);
    await fs.writeJson(packagePath, results, { spaces: 2 });
    
    console.log(`\n✅ Complete visual package saved: ${packagePath}\n`);
    return results;
  }

  /**
   * Build detailed character prompt
   */
  buildCharacterPrompt(mascot) {
    return `Character design for ${mascot.name}, ${mascot.description}. 
Full body reference sheet showing front, side, and back views. 
Style: ${mascot.visual_style || 'gritty urban realism'}, detailed character art. 
Personality traits visible in design: ${mascot.personality.join(', ')}. 
High quality illustration, professional character design.`;
  }

  /**
   * Build expression sheet prompt
   */
  buildExpressionSheetPrompt(mascot) {
    const expressions = ['neutral', 'happy', 'sad', 'angry', 'confused', 'tired', 'smirking', 'defeated'];
    return `Expression sheet for ${mascot.name} showing ${expressions.join(', ')}. 
Multiple facial expressions in grid layout. 
Style: ${mascot.visual_style || 'gritty urban realism'}. 
Consistent character design, professional quality.`;
  }

  /**
   * Build environment prompt
   */
  buildEnvironmentPrompt(mascot, location) {
    const locationDescriptions = {
      home: `${mascot.name}'s living space, cluttered and lived-in, personal items visible`,
      street: 'urban street scene at night, neon signs, gritty city atmosphere',
      bar: 'dive bar interior, dim lighting, worn furniture, bottles on shelves'
    };
    
    return `${locationDescriptions[location]}. 
Background illustration for ${mascot.name} character. 
Style: gritty urban realism with cyberpunk neon accents. 
Detailed environment art, atmospheric lighting, no characters.`;
  }

  /**
   * Build promo video prompt
   */
  buildPromoVideoPrompt(mascot) {
    return `15-second promotional video for ${mascot.name}. 
Opening shot: Character in their typical environment. 
Mid shots: Show personality through actions and expressions. 
Closing shot: Character logo reveal. 
Style: Cinematic trailer, dramatic lighting, urban atmosphere. 
Mood: ${mascot.personality.join(', ')}. 
Transitions: Quick cuts with style.`;
  }

  /**
   * Build backstory image prompt
   */
  buildBackstoryImagePrompt(backstory, section) {
    const sectionDescriptions = {
      origin: 'The beginning, before things went wrong, hopeful mood',
      turning_point: 'The moment everything changed, dramatic and emotional',
      current_state: 'Present day reality, showing the aftermath'
    };
    
    return `Illustration for ${backstory.mascot}'s backstory: ${backstory.title}. 
Scene: ${sectionDescriptions[section]}. 
Based on: ${backstory.content[section]?.substring(0, 200)}... 
Style: Gritty urban realism, emotional storytelling, dramatic lighting.`;
  }

  /**
   * Save generated content
   */
  async saveGeneratedContent(content, filename) {
    const filepath = path.join(this.outputDir, filename);
    await fs.writeJson(filepath, content, { spaces: 2 });
    return filepath;
  }
}

export default GeminiContentGenerator;
