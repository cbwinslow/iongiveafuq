import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-gray-400">Cart</p>
          <h1 className="text-3xl font-bold">Ready for checkout</h1>
        </div>
        {items.length > 0 && (
          <button
            className="text-sm text-red-300 underline"
            onClick={() => clearCart()}
          >
            Clear cart
          </button>
        )}
      </header>

      {items.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
          <p className="text-gray-300">Your items will appear here.</p>
          <Link to="/store" className="text-neon-green underline mt-2 inline-block">
            Go to store
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-3">
            {items.map(item => (
              <article key={item.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase text-gray-400">{item.category}</p>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-sm text-red-300 underline">
                    Remove
                  </button>
                </div>
                <p className="text-sm text-gray-300">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gray-700 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-gray-900 border border-gray-700 rounded">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-gray-700 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-neon-green font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-3">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Subtotal</span>
              <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400">Taxes and shipping calculated at checkout.</p>
            <button className="w-full bg-neon-green text-black py-2 rounded font-semibold">
              Checkout mock
            </button>
            <Link to="/store" className="block text-center text-neon-green underline text-sm">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
