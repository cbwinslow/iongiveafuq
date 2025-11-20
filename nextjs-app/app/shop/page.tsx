'use client';

import { useState } from 'react';

/**
 * E-Commerce Shop Page for ION Give A Fuq T-Shirts
 * Features character-themed merchandise with designs from comics and animations
 */

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  character: string;
  design: string;
  images: string[];
  sizes: string[];
  tier: string;
}

// Product catalog based on character designs
const PRODUCTS: Product[] = [
  {
    id: 'tshirt-scrapz-gave-shit',
    name: 'The Day Scrapz Gave a Shit',
    description: 'Split character transformation showing Scrapz\'s journey from cynical to caring. Features LEFT: Classic cynical Scrapz with "I DON\'T GIVE A SHIT" and RIGHT: Caring Scrapz protecting kitten with "BUT I GIVE A SHIT ABOUT THIS"',
    price: 29.99,
    character: 'scrapz',
    design: 'transformation',
    images: ['/products/scrapz-flagship.png'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tier: 'shihts'
  },
  {
    id: 'tshirt-scrapz-cares',
    name: 'Scrapz Cares (Don\'t Tell Anyone)',
    description: 'Finger to lips gesture with hidden heart design. Perfect for those who care but won\'t admit it.',
    price: 24.99,
    character: 'scrapz',
    design: 'secret-caring',
    images: ['/products/scrapz-cares.png'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tier: 'fuhqs'
  },
  {
    id: 'tshirt-dumbo-interview',
    name: 'Dumbo\'s Job Interview',
    description: 'Four-panel comic strip showing Dumbo\'s disastrous job interview. "They weren\'t looking for someone with my skills anyway."',
    price: 27.99,
    character: 'dumbo',
    design: 'comic-strip',
    images: ['/products/dumbo-interview.png'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tier: 'fuhqs'
  },
  {
    id: 'tshirt-buzz-philosophy',
    name: 'Buzz\'s Bar Philosophy',
    description: '"Lower your expectations... then lower them again." Buzz\'s drunk wisdom for life.',
    price: 25.99,
    character: 'buzz',
    design: 'philosophy',
    images: ['/products/buzz-philosophy.png'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tier: 'dayums'
  },
  {
    id: 'tshirt-patty-fabulous',
    name: 'Patty\'s Fabulous Problem',
    description: 'Four-panel transformation showing Patty\'s resilience. "Their loss. I\'m still fabulous."',
    price: 26.99,
    character: 'patty',
    design: 'fabulous',
    images: ['/products/patty-fabulous.png'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tier: 'rats-azzes'
  },
  {
    id: 'tshirt-rizzo-survival',
    name: 'Rizzo\'s Survival Tip',
    description: 'Single panel wisdom: "Set the bar so low that just waking up is an achievement."',
    price: 22.99,
    character: 'rizzo',
    design: 'wisdom',
    images: ['/products/rizzo-survival.png'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tier: 'darns'
  },
  {
    id: 'tshirt-even-cynics',
    name: 'Even Cynics Have Hearts',
    description: 'Anatomical heart with cigarette, smoke forming hearts. For the reluctant romantics.',
    price: 27.99,
    character: 'scrapz',
    design: 'anatomical',
    images: ['/products/even-cynics.png'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tier: 'shihts'
  },
  {
    id: 'tshirt-zero-to-one',
    name: 'From Zero Shits to One Shit Given',
    description: 'Progress bar showing character growth journey. Perfect for documenting your transformation.',
    price: 25.99,
    character: 'scrapz',
    design: 'progress',
    images: ['/products/zero-to-one.png'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tier: 'dayums'
  }
];

// Tier colors matching the brand
const TIER_COLORS: Record<string, string> = {
  'fuhqs': '#ff4ecd',      // neon-pink
  'shihts': '#39ff14',     // neon-green
  'dayums': '#3bf7ff',     // neon-blue
  'rats-azzes': '#ff6b35', // neon-orange
  'darns': '#ffff00'       // neon-yellow
};

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [cart, setCart] = useState<Array<{ product: Product; size: string; quantity: number }>>([]);
  const [filter, setFilter] = useState<string>('all');

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.character === filter);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black py-6 px-6 border-b-2 border-neon-pink shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-neon-pink" style={{ textShadow: '0 0 20px #ff4ecd' }}>
            ION Give A Fuq - Shop
          </h1>
          <div className="relative">
            <button className="bg-neon-green text-black px-6 py-2 rounded-lg font-bold hover:bg-opacity-80 transition">
              Cart ({cart.length})
            </button>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-neon-pink text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Bar */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              filter === 'all' 
                ? 'bg-neon-pink text-black' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            All Characters
          </button>
          {['scrapz', 'dumbo', 'buzz', 'patty', 'rizzo'].map(char => (
            <button
              key={char}
              onClick={() => setFilter(char)}
              className={`px-6 py-2 rounded-lg font-bold transition capitalize ${
                filter === char
                  ? 'bg-neon-green text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {char}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-neon-pink transition-all duration-300 border-2 border-transparent hover:border-neon-pink"
            >
              {/* Product Image */}
              <div className="relative h-80 bg-gray-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <div 
                    className="text-8xl mb-4"
                    style={{ 
                      color: TIER_COLORS[product.tier] || '#ff4ecd',
                      textShadow: `0 0 30px ${TIER_COLORS[product.tier] || '#ff4ecd'}`
                    }}
                  >
                    👕
                  </div>
                  <p className="text-sm text-gray-400">Design Preview</p>
                  <p className="text-xs text-gray-500 mt-2">{product.design}</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-neon-green">{product.name}</h3>
                  <span 
                    className="text-xs px-2 py-1 rounded uppercase font-bold"
                    style={{ 
                      backgroundColor: TIER_COLORS[product.tier],
                      color: '#000'
                    }}
                  >
                    {product.tier}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-neon-pink">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">
                    Character: {product.character}
                  </span>
                </div>

                {/* Size Selection */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">Size:</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-neon-pink focus:outline-none"
                  >
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product, selectedSize)}
                  className="w-full bg-neon-green text-black font-bold py-3 rounded-lg hover:bg-opacity-80 transition shadow-lg hover:shadow-neon-green"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-neon-pink p-6 shadow-2xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-400">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart
                </p>
                <p className="text-3xl font-bold text-neon-pink">
                  Total: ${cartTotal.toFixed(2)}
                </p>
              </div>
              <button className="bg-neon-pink text-black px-12 py-4 rounded-lg font-bold text-xl hover:bg-opacity-80 transition shadow-xl">
                Checkout
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No products found for this character</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black py-8 px-6 mt-20 border-t-2 border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            ION Give A Fuq - Fresh outta fuqs since 2025
          </p>
          <p className="text-gray-600 text-sm mt-2">
            All characters and designs © ION Give A Fuq
          </p>
        </div>
      </footer>
    </div>
  );
}
