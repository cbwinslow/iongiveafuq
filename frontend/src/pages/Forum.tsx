import { forumThreads } from '../data/catalog';

export default function Forum() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase text-gray-400">Forum</p>
        <h1 className="text-3xl font-bold">Community HQ</h1>
        <p className="text-gray-300 text-sm">
          Threads for merch QA, lore speculation, and art requests. Posting is stubbed for now.
        </p>
      </header>
      <div className="space-y-3">
        {forumThreads.map(thread => (
          <article key={thread.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-gray-400">{thread.tag}</p>
                <h3 className="text-lg font-semibold">{thread.title}</h3>
              </div>
              <span className="text-xs text-gray-400">{thread.lastUpdated}</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">{thread.replies} replies</p>
            <button className="mt-3 bg-gray-700 text-gray-200 px-3 py-2 rounded">Open thread</button>
          </article>
        ))}
      </div>
    </div>
  );
}
