import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `hover:text-neon-green transition-colors ${isActive ? 'text-neon-green font-semibold' : ''}`;

export default function Navbar() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-black py-4 px-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between shadow-md sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4">
        <div className="text-neon-pink font-extrabold text-2xl">
          <Link to="/">iongiveafuq.com</Link>
        </div>
        <div className="md:hidden">
          <SearchBar />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 gap-3">
        <ul className="flex flex-wrap gap-3 md:gap-4 items-center">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/store" className={navLinkClass}>
              Store
            </NavLink>
          </li>
          <li>
            <NavLink to="/wallpapers" className={navLinkClass}>
              Wallpapers
            </NavLink>
          </li>
          <li>
            <NavLink to="/comics" className={navLinkClass}>
              Comics
            </NavLink>
          </li>
          <li>
            <NavLink to="/artwork" className={navLinkClass}>
              Artwork
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" className={navLinkClass}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={navLinkClass}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/forum" className={navLinkClass}>
              Forum
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={navLinkClass}>
              Cart
              {cartCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-neon-green text-black rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
