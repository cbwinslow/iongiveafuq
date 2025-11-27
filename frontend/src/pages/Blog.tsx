import { blogPosts } from '../data/catalog';

export default function Blog() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase text-gray-400">Blog</p>
        <h1 className="text-3xl font-bold">Devlogs, lore drops, and release notes</h1>
        <p className="text-gray-300 text-sm">Short reads that pair with our art and store drops.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {blogPosts.map(post => (
          <article key={post.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow">
            <p className="text-xs uppercase text-gray-400">{post.category}</p>
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-300 mt-2">{post.summary}</p>
            <a className="text-neon-green underline text-sm mt-3 inline-block" href={post.url}>
              Open
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
