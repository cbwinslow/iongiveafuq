import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface DigitalProduct {
  id: string;
  guid: string;
  type: string;
  price: number;
  description: string;
  character: string;
  createdAt: string;
  pdfUrl: string;
}

export class DigitalProductService {
  private static instance: DigitalProductService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.API_URL || 'http://localhost:3000/api';
  }

  public static getInstance(): DigitalProductService {
    if (!DigitalProductService.instance) {
      DigitalProductService.instance = new DigitalProductService();
    }
    return DigitalProductService.instance;
  }

  async createProduct(productData: Omit<DigitalProduct, 'id' | 'createdAt' | 'pdfUrl'>): Promise<DigitalProduct> {
    const guid = uuidv4();
    const createdAt = new Date().toISOString();
    
    // Generate PDF with GUID
    const pdfUrl = await this.generateProductPDF(guid, productData.character);

    const product: DigitalProduct = {
      id: uuidv4(),
      guid,
      ...productData,
      createdAt,
      pdfUrl
    };

    try {
      const response = await axios.post<DigitalProduct>(
        `${this.baseUrl}/products`,
        product
      );
      return response.data;
    } catch (error) {
      console.error('Error creating digital product:', error);
      throw error;
    }
  }

  private async generateProductPDF(guid: string, character: string): Promise<string> {
    // This would interface with a PDF generation service
    // For now, we'll return a placeholder URL
    return `https://storage.example.com/products/${guid}.pdf`;
  }

  async getProducts(): Promise<DigitalProduct[]> {
    try {
      const response = await axios.get<DigitalProduct[]>(
        `${this.baseUrl}/products`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const digitalProductService = DigitalProductService.getInstance();
