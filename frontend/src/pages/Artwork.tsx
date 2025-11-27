import ArtworkViewer from '../components/viewer/ArtworkViewer';
import { artPieces } from '../data/catalog';

export default function Artwork() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-gray-400">Artwork</p>
          <h1 className="text-3xl font-bold">Concept art, posters, and printable assets</h1>
          <p className="text-gray-300 text-sm">
            Browse curated pieces and feed the viewer with backend-powered search.
          </p>
        </div>
        <div className="text-right text-sm text-gray-300">
          <p className="font-semibold">Workflow</p>
          <p>1) Scroll curated picks</p>
          <p>2) Use the viewer below for live assets</p>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {artPieces.map(piece => (
          <article key={piece.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-xs uppercase text-gray-400">{piece.medium}</p>
            <h3 className="text-lg font-semibold">{piece.title}</h3>
            <p className="text-xs text-gray-400">Palette: {piece.palette}</p>
            <p className="text-sm text-gray-300 mt-2">{piece.description}</p>
          </article>
        ))}
      </div>
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <ArtworkViewer />
      </div>
    </div>
  );
}
