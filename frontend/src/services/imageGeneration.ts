import axios from 'axios';

interface ImageGenerationRequest {
  prompt: string;
  style: string;
  character: string;
  size: string;
}

interface ImageGenerationResponse {
  imageUrl: string;
  id: string;
  created: number;
}

export class ImageGenerationService {
  private static instance: ImageGenerationService;
  private baseUrl: string;
  private apiKey: string;

  private constructor() {
    // Load from environment variables or config
    this.baseUrl = process.env.IMAGE_GENERATION_API || 'https://stable-diffusion-api.example.com';
    this.apiKey = process.env.STABLE_DIFFUSION_API_KEY || '';
  }

  public static getInstance(): ImageGenerationService {
    if (!ImageGenerationService.instance) {
      ImageGenerationService.instance = new ImageGenerationService();
    }
    return ImageGenerationService.instance;
  }

  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      const response = await axios.post<ImageGenerationResponse>(
        `${this.baseUrl}/generate`,
        {
          ...request,
          apiKey: this.apiKey
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }

  async preGenerateImagesForCharacter(characterId: string): Promise<string[]> {
    const prompts = [
      `${characterId} in a casual pose, grungy style`,
      `${characterId} with merchandise, dark background`,
      `${characterId} in a funny situation, comic style`,
      `${characterId} with catchphrase, graffiti style`,
      `${characterId} with product mockup, realistic lighting`
    ];

    const images: string[] = [];
    for (const prompt of prompts) {
      const image = await this.generateImage({
        prompt,
        style: 'grungy',
        character: characterId,
        size: '1024x1024'
      });
      images.push(image.imageUrl);
    }
    return images;
  }
}

// Export singleton instance
export const imageGenerationService = ImageGenerationService.getInstance();
