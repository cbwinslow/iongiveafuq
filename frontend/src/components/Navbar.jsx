export default function Navbar() {
  return (
    <nav className="bg-black py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-neon-pink font-extrabold text-2xl">
        iongiveafuq.com
      </div>
      <ul className="flex space-x-4">
        <li>
          <a href="#" className="hover:text-neon-green">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-neon-green">
            Store
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-neon-green">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
