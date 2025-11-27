import { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState(params.get('query') ?? '');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full md:w-72 bg-gray-800 rounded-full overflow-hidden border border-gray-700"
    >
      <input
        aria-label="Search the site"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search products, art, lore"
        className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
      />
      <button
        type="submit"
        className="bg-neon-green text-black px-4 text-sm font-semibold hover:bg-lime-300"
      >
        Go
      </button>
    </form>
  );
}
