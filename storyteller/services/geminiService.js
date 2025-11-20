import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs-extra';
import path from 'path';

/**
 * Service for interacting with Google Gemini API
 * Supports Imagen 3 for image generation and Veo 3 for video generation
 */
class GeminiService {
  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️  GOOGLE_API_KEY not set. Gemini features will be disabled.');
      this.enabled = false;
      return;
    }
    
    this.enabled = true;
    this.genAI = new GoogleGenerativeAI(apiKey);
    
    // Initialize models
    this.textModel = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Output directories
    this.imageOutputDir = './generated/images';
    this.videoOutputDir = './generated/videos';
    fs.ensureDirSync(this.imageOutputDir);
    fs.ensureDirSync(this.videoOutputDir);
  }

  /**
   * Check if Gemini service is enabled
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Generate an image using Imagen 3
   * @param {Object} options - Image generation options
   * @param {string} options.prompt - The image generation prompt
   * @param {string} options.negativePrompt - What to avoid in the image
   * @param {number} options.width - Image width (default: 1024)
   * @param {number} options.height - Image height (default: 1024)
   * @param {string} options.style - Visual style hints
   * @param {string} options.characterRef - Character reference for consistency
   * @returns {Promise<Object>} Generated image metadata
   */
  async generateImage(options) {
    if (!this.enabled) {
      return this.getMockImageResponse(options);
    }

    const {
      prompt,
      negativePrompt = '',
      width = 1024,
      height = 1024,
      style = 'gritty urban realism',
      characterRef = null,
      filename = null
    } = options;

    try {
      // Construct enhanced prompt with style and character references
      const enhancedPrompt = this.buildImagePrompt(prompt, style, characterRef, negativePrompt);
      
      console.log(`🎨 Generating image with Imagen 3...`);
      console.log(`   Prompt: ${enhancedPrompt.substring(0, 100)}...`);

      // Note: As of now, Gemini API doesn't directly expose Imagen 3 through the SDK
      // This is a placeholder for when the API becomes available
      // For now, we'll use the text model to generate detailed image descriptions
      const result = await this.textModel.generateContent({
        contents: [{
          role: 'user',
          parts: [{
            text: `Generate a detailed image generation prompt for Imagen 3 based on this request: ${enhancedPrompt}`
          }]
        }]
      });

      const response = await result.response;
      const generatedPrompt = response.text();

      // Generate filename if not provided
      const imageFilename = filename || `image_${Date.now()}.json`;
      const imagePath = path.join(this.imageOutputDir, imageFilename);

      // Save image metadata (in production, this would be the actual image)
      const imageData = {
        prompt: enhancedPrompt,
        enhancedPrompt: generatedPrompt,
        style,
        width,
        height,
        characterRef,
        negativePrompt,
        timestamp: new Date().toISOString(),
        status: 'ready_for_generation',
        model: 'imagen-3'
      };

      await fs.writeJson(imagePath, imageData, { spaces: 2 });

      console.log(`✅ Image metadata saved: ${imagePath}`);

      return {
        success: true,
        imagePath,
        metadata: imageData,
        message: 'Image generation request prepared. Use the enhanced prompt with Imagen 3 API.'
      };
    } catch (error) {
      console.error('❌ Error generating image:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate a video using Veo 3
   * @param {Object} options - Video generation options
   * @param {string} options.prompt - The video generation prompt
   * @param {Array} options.scenes - Array of scene descriptions
   * @param {number} options.duration - Video duration in seconds
   * @param {string} options.style - Visual style
   * @param {string} options.aspectRatio - Aspect ratio (16:9, 9:16, 1:1)
   * @returns {Promise<Object>} Generated video metadata
   */
  async generateVideo(options) {
    if (!this.enabled) {
      return this.getMockVideoResponse(options);
    }

    const {
      prompt,
      scenes = [],
      duration = 10,
      style = 'cinematic animation',
      aspectRatio = '16:9',
      fps = 24,
      characterRefs = [],
      filename = null
    } = options;

    try {
      // Construct enhanced video prompt
      const enhancedPrompt = this.buildVideoPrompt(prompt, scenes, style, characterRefs);
      
      console.log(`🎬 Generating video with Veo 3...`);
      console.log(`   Duration: ${duration}s`);
      console.log(`   Scenes: ${scenes.length}`);

      // Note: Similar to Imagen, Veo 3 API may not be directly available yet
      // We'll generate detailed video specifications
      const result = await this.textModel.generateContent({
        contents: [{
          role: 'user',
          parts: [{
            text: `Generate a detailed video production specification for Veo 3 based on this request: ${enhancedPrompt}. Include shot-by-shot breakdown, camera movements, lighting, and transitions.`
          }]
        }]
      });

      const response = await result.response;
      const videoSpec = response.text();

      // Generate filename if not provided
      const videoFilename = filename || `video_${Date.now()}.json`;
      const videoPath = path.join(this.videoOutputDir, videoFilename);

      // Save video metadata
      const videoData = {
        prompt: enhancedPrompt,
        videoSpec,
        scenes,
        duration,
        style,
        aspectRatio,
        fps,
        characterRefs,
        timestamp: new Date().toISOString(),
        status: 'ready_for_generation',
        model: 'veo-3'
      };

      await fs.writeJson(videoPath, videoData, { spaces: 2 });

      console.log(`✅ Video metadata saved: ${videoPath}`);

      return {
        success: true,
        videoPath,
        metadata: videoData,
        message: 'Video generation request prepared. Use the specification with Veo 3 API.'
      };
    } catch (error) {
      console.error('❌ Error generating video:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Animate existing content (episodes/comics) into video format
   * @param {Object} content - Content to animate (episode or comic)
   * @param {string} contentType - Type of content ('episode' or 'comic')
   * @returns {Promise<Object>} Animation result
   */
  async animateContent(content, contentType = 'episode') {
    if (!this.enabled) {
      return this.getMockAnimationResponse(content, contentType);
    }

    try {
      let scenes = [];
      
      if (contentType === 'episode' && content.scenes) {
        // Convert episode scenes to video scenes
        scenes = content.scenes.map((scene, index) => ({
          sceneNumber: index + 1,
          description: scene.description || scene.action,
          dialogue: scene.dialogue || [],
          duration: 5 + Math.floor(Math.random() * 5), // 5-10 seconds per scene
          visualStyle: content.visual_style || 'gritty urban realism',
          characters: scene.characters || []
        }));
      } else if (contentType === 'comic' && content.panels) {
        // Convert comic panels to video scenes
        scenes = content.panels.map((panel, index) => ({
          sceneNumber: index + 1,
          description: panel.description,
          dialogue: panel.dialogue ? [{ character: 'narrator', text: panel.dialogue }] : [],
          duration: 3 + Math.floor(Math.random() * 3), // 3-6 seconds per panel
          visualStyle: content.style || 'comic book animation',
          composition: panel.composition
        }));
      }

      const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);

      const videoOptions = {
        prompt: `Animate ${contentType}: ${content.title}`,
        scenes,
        duration: totalDuration,
        style: content.style || 'animated storytelling',
        aspectRatio: '16:9',
        characterRefs: content.characters || [],
        filename: `animated_${contentType}_${content.id}.json`
      };

      return await this.generateVideo(videoOptions);
    } catch (error) {
      console.error(`❌ Error animating ${contentType}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Build enhanced image prompt with style and character consistency
   */
  buildImagePrompt(basePrompt, style, characterRef, negativePrompt) {
    let prompt = basePrompt;
    
    if (characterRef) {
      prompt = `${characterRef}. ${prompt}`;
    }
    
    prompt = `${prompt}. Style: ${style}. High quality, detailed, professional artwork.`;
    
    if (negativePrompt) {
      prompt += ` Avoid: ${negativePrompt}`;
    }
    
    return prompt;
  }

  /**
   * Build enhanced video prompt with scene details
   */
  buildVideoPrompt(basePrompt, scenes, style, characterRefs) {
    let prompt = `${basePrompt}\n\n`;
    
    if (characterRefs.length > 0) {
      prompt += `Characters: ${characterRefs.join(', ')}\n\n`;
    }
    
    prompt += `Visual Style: ${style}\n\n`;
    
    if (scenes.length > 0) {
      prompt += 'Scene Breakdown:\n';
      scenes.forEach((scene, index) => {
        prompt += `Scene ${index + 1}: ${scene.description || scene}\n`;
      });
    }
    
    return prompt;
  }

  /**
   * Mock response when API is disabled (for testing/development)
   */
  getMockImageResponse(options) {
    console.log('🔨 Mock image generation (GOOGLE_API_KEY not set)');
    return {
      success: true,
      mock: true,
      imagePath: './generated/images/mock_image.json',
      metadata: {
        prompt: options.prompt,
        style: options.style,
        width: options.width || 1024,
        height: options.height || 1024,
        timestamp: new Date().toISOString(),
        status: 'mock_generation',
        model: 'imagen-3'
      },
      message: 'Mock image generation. Set GOOGLE_API_KEY to use real API.'
    };
  }

  /**
   * Mock response for video generation
   */
  getMockVideoResponse(options) {
    console.log('🔨 Mock video generation (GOOGLE_API_KEY not set)');
    return {
      success: true,
      mock: true,
      videoPath: './generated/videos/mock_video.json',
      metadata: {
        prompt: options.prompt,
        scenes: options.scenes,
        duration: options.duration,
        style: options.style,
        timestamp: new Date().toISOString(),
        status: 'mock_generation',
        model: 'veo-3'
      },
      message: 'Mock video generation. Set GOOGLE_API_KEY to use real API.'
    };
  }

  /**
   * Mock response for animation
   */
  getMockAnimationResponse(content, contentType) {
    console.log(`🔨 Mock ${contentType} animation (GOOGLE_API_KEY not set)`);
    return {
      success: true,
      mock: true,
      videoPath: `./generated/videos/mock_animated_${contentType}.json`,
      metadata: {
        contentType,
        contentId: content.id,
        title: content.title,
        timestamp: new Date().toISOString(),
        status: 'mock_generation',
        model: 'veo-3'
      },
      message: `Mock ${contentType} animation. Set GOOGLE_API_KEY to use real API.`
    };
  }
}

// Export singleton instance
const geminiService = new GeminiService();
export default geminiService;
