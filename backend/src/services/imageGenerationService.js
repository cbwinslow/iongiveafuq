const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

class ImageGenerationService {
  constructor() {
    this.apiKey = process.env.STABLE_DIFFUSION_API_KEY;
    this.apiUrl = process.env.STABLE_DIFFUSION_API_URL;
    this.storagePath = path.join(__dirname, '../storage/images');
  }

  async initialize() {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
    } catch (error) {
      console.error('Error creating storage directory:', error);
      throw error;
    }
  }

  async generateImage(prompt, characterId) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/generate`,
        {
          prompt: `${prompt} with ${characterId}, grungy style, dark background`,
          width: 1024,
          height: 1024,
          steps: 50,
          cfg_scale: 7,
          seed: Math.floor(Math.random() * 1000000)
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      const imageBuffer = Buffer.from(response.data.image, 'base64');
      const filename = `${characterId}_${Date.now()}.png`;
      const imagePath = path.join(this.storagePath, filename);

      await fs.writeFile(imagePath, imageBuffer);

      return {
        url: `/images/${filename}`,
        path: imagePath,
        characterId,
        prompt
      };
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }

  async preGenerateImagesForCharacter(characterId) {
    const prompts = [
      `${characterId} in a casual pose, grungy style`,
      `${characterId} with merchandise, dark background`,
      `${characterId} in a funny situation, comic style`,
      `${characterId} with catchphrase, graffiti style`,
      `${characterId} with product mockup, realistic lighting`
    ];

    const images = [];
    for (const prompt of prompts) {
      const image = await this.generateImage(prompt, characterId);
      images.push(image);
    }
    return images;
  }

  async getImage(characterId, prompt) {
    const images = await this.preGenerateImagesForCharacter(characterId);
    return images.find(img => img.prompt === prompt);
  }
}

module.exports = new ImageGenerationService();
