import { Link } from 'react-router-dom';
import Dumbo from '../components/mascots/Dumbo';
import ArtworkViewer from '../components/viewer/ArtworkViewer';
import { products, wallpapers, comicIssues } from '../data/catalog';

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div className="space-y-4">
          <p className="uppercase tracking-widest text-sm text-gray-400">Fuqverse launchpad</p>
          <h1 className="text-4xl md:text-5xl font-black text-neon-green leading-tight">
            Stories, merch, and motion labs in one neon city.
          </h1>
          <p className="text-lg text-gray-200">
            Prototype characters with AI, preview comics, and drop straight into a cart-ready store—
            all wired for fast iteration and community feedback.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/store" className="bg-neon-green text-black px-4 py-2 rounded font-semibold">
              Shop merch
            </Link>
            <Link to="/wallpapers" className="border border-neon-green px-4 py-2 rounded font-semibold">
              Grab wallpapers
            </Link>
            <Link to="/comics" className="text-neon-green underline">
              Read comics
            </Link>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <Dumbo />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          title="AI content lab"
          body="Batch prompts through Veo 3, Wan 2.2, and Sora-ready JSON playbooks."
          cta="View workflows"
          to="/docs/content-generation-workflows"
        />
        <FeatureCard
          title="Comics + animation"
          body="Inline readers, storyboard previews, and shot lists for the crew."
          cta="Open comic viewer"
          to="/comics"
        />
        <FeatureCard
          title="Wallpapers & gallery"
          body="Curated 4K/ultrawide drops across mascots with searchable tags."
          cta="See drops"
          to="/wallpapers"
        />
      </section>

      <section className="bg-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured merch</h2>
          <Link to="/store" className="text-neon-green text-sm underline">
            View store
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {products.slice(0, 3).map(product => (
            <div key={product.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="text-sm uppercase tracking-wide text-gray-400">{product.category}</p>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-300 text-sm">{product.description}</p>
              <p className="text-neon-green font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Latest wallpapers</h2>
            <p className="text-gray-300 text-sm">Desktop + mobile friendly renders.</p>
          </div>
          <Link to="/wallpapers" className="text-neon-green underline text-sm">
            Browse all wallpapers
          </Link>
        </div>
        <div className="grid mt-4 gap-4 md:grid-cols-3">
          {wallpapers.map(wallpaper => (
            <div key={wallpaper.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h3 className="font-semibold">{wallpaper.title}</h3>
              <p className="text-xs text-gray-400">{wallpaper.resolution}</p>
              <p className="text-sm text-gray-300 mt-1">{wallpaper.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {wallpaper.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Comic viewer preview</h2>
          <Link to="/comics" className="text-neon-green underline text-sm">
            Jump to reader
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {comicIssues.map(issue => (
            <div key={issue.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{issue.title}</h3>
                <span className="text-xs uppercase text-gray-400">Issue {issue.issueNumber}</span>
              </div>
              <p className="text-gray-300 mt-2">{issue.summary}</p>
              <p className="text-xs text-gray-400 mt-2">Focus: {issue.focusCharacter}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 rounded-xl p-4 border border-gray-800 shadow-lg">
        <ArtworkViewer />
      </section>
    </div>
  );
}

function FeatureCard({ title, body, cta, to }: { title: string; body: string; cta: string; to: string }) {
  return (
    <Link to={to} className="block bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-neon-green transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-4">{body}</p>
      <span className="text-neon-green text-sm font-semibold">{cta} →</span>
    </Link>
  );
}
