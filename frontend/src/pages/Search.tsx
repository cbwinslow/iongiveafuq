import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchCatalog, SearchResult } from '../data/catalog';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('query') ?? '');
  const [results, setResults] = useState<SearchResult[]>(searchCatalog(query));

  useEffect(() => {
    setResults(searchCatalog(query));
    setParams({ query });
  }, [query, setParams]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-gray-400">Search</p>
          <h1 className="text-3xl font-bold">Find merch, art, lore, and community threads</h1>
        </div>
        <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700 text-sm">
          Indexed: products, wallpapers, comics, art, blog, forum, pages.
        </div>
      </header>
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Try: Dumbo, wallpaper, bundle, lore"
          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
        />
      </div>
      <div className="space-y-3">
        {results.map(result => (
          <Link
            key={result.id}
            to={result.path}
            className="block bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-neon-green"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{result.title}</h3>
              <span className="text-xs uppercase text-gray-400">{result.type}</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">{result.snippet}</p>
          </Link>
        ))}
        {results.length === 0 && <p className="text-gray-400">No results yet. Try another keyword.</p>}
      </div>
    </div>
  );
}
