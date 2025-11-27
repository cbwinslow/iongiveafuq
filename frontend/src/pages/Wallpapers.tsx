import { wallpapers } from '../data/catalog';

export default function Wallpapers() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-gray-400">Wallpapers</p>
          <h1 className="text-3xl font-bold">Desktop, mobile, and ultrawide drops</h1>
          <p className="text-gray-300 text-sm">
            Download-ready render set for each mascot with consistent neon palettes.
          </p>
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded border border-gray-700 text-sm">
          Tip: right-click save is disabled in viewer; use the download button on each card.
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {wallpapers.map(wallpaper => (
          <article key={wallpaper.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{wallpaper.title}</h3>
              <span className="text-xs text-gray-400">{wallpaper.resolution}</span>
            </div>
            <p className="text-sm text-gray-300">{wallpaper.description}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {wallpaper.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-200">
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-4 w-full bg-neon-green text-black py-2 rounded font-semibold">
              Download mock
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
