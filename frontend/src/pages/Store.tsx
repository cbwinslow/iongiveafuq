import { products } from '../data/catalog';
import { useCart } from '../context/CartContext';

const categoryLabels: Record<string, string> = {
  tshirt: 'T-Shirts',
  comic: 'Comics',
  'action-figure': 'Action Figures',
  bundle: 'Bundles',
  print: 'Prints',
};

export default function Store() {
  const { addToCart } = useCart();

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-gray-400">Store</p>
          <h1 className="text-3xl font-bold">Merch, comics, and collectibles</h1>
          <p className="text-gray-300 text-sm">Mobile-friendly cards with instant add-to-cart.</p>
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded border border-gray-700 text-sm">
          Shipping + tax calculated at checkout. Digital wallpapers delivered instantly.
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {products.map(product => (
          <article key={product.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow">
            <p className="text-xs uppercase text-gray-400">{categoryLabels[product.category]}</p>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-300 mt-1">{product.description}</p>
            <p className="text-neon-green font-bold mt-2">${product.price}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-200">
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-neon-green text-black py-2 rounded font-semibold"
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
