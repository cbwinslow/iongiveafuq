import { comicIssues } from '../data/catalog';

export default function Comics() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-gray-400">Comic viewer</p>
          <h1 className="text-3xl font-bold">Read issues, previews, and animation beats</h1>
          <p className="text-gray-300 text-sm">
            Inline preview cards plus storyboard beats for motion tests.
          </p>
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded border border-gray-700 text-sm text-right">
          <p className="font-semibold">Quick shortcuts</p>
          <p>1) Pick an issue</p>
          <p>2) Tap a panel to open the storyboard modal (coming soon)</p>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {comicIssues.map(issue => (
          <article key={issue.id} className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-gray-400">Issue {issue.issueNumber}</p>
                <h3 className="text-xl font-semibold">{issue.title}</h3>
              </div>
              <span className="text-xs text-gray-400">Focus: {issue.focusCharacter}</span>
            </div>
            <p className="text-gray-300 mt-2">{issue.summary}</p>
            <div className="mt-3 space-y-2">
              {issue.previewPanels.map((panel, index) => (
                <div
                  key={`${issue.id}-panel-${index}`}
                  className="bg-gray-900 px-3 py-2 rounded border border-gray-700 text-sm"
                >
                  <span className="text-gray-400 mr-2">Panel {index + 1}:</span>
                  {panel}
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-neon-green text-black py-2 rounded font-semibold">
              Open reader mock
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
