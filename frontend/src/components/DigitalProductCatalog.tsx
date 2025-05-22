import { useState, useEffect } from 'react';
import { digitalProductService } from '../services/digitalProducts';
import { imageGenerationService } from '../services/imageGeneration';

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

export const DigitalProductCatalog = () => {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [characterImages, setCharacterImages] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    fetchProducts();
    preloadCharacterImages();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await digitalProductService.getProducts();
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const preloadCharacterImages = async () => {
    const uniqueCharacters = [...new Set(products.map(p => p.character))];
    const images = await Promise.all(
      uniqueCharacters.map(char => imageGenerationService.preGenerateImagesForCharacter(char))
    );
    setCharacterImages(Object.fromEntries(uniqueCharacters.map((char, i) => [char, images[i]])));
  };

  const handleBuyProduct = async (product: DigitalProduct) => {
    try {
      // Implement purchase logic here
      console.log('Purchasing product:', product);
    } catch (error) {
      console.error('Error purchasing product:', error);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="digital-product-catalog">
      <h2>Digital Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {characterImages[product.character]?.[0] && (
                <img 
                  src={characterImages[product.character][0]}
                  alt={product.character}
                />
              )}
            </div>
            <div className="product-details">
              <h3>{product.type}</h3>
              <p>{product.description}</p>
              <p>Character: {product.character}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <button onClick={() => handleBuyProduct(product)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
