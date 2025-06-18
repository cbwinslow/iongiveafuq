import { Link } from 'react-router-dom';
import dogImg from '../assets/mascots/dog_placeholder.png';

export default function Navbar() {
  return (
    <nav className="bg-black py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        <img src={dogImg} alt="Mascot" className="h-8 w-8 rounded-full" />
        <span className="text-neon-pink font-extrabold text-2xl">
          iongiveafuq.com
        </span>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-neon-green">
            Home
          </Link>
        </li>
        <li>
          <a href="#" className="hover:text-neon-green">
            Store
          </a>
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
