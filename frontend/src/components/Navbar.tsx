import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-black py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-neon-pink font-extrabold text-2xl">
        <Link to="/">iongiveafuq.com</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-neon-green">
            Home
          </Link>
        </li>
        <li>
          <Link to="/store" className="hover:text-neon-green">
            Store
          </Link>
        </li>
        <li>
          <Link to="/mascots" className="hover:text-neon-green">
            Mascots
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-neon-green">
            Cart
          </Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:text-neon-green">
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-neon-green">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
