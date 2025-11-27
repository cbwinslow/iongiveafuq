export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tshirt' | 'comic' | 'action-figure' | 'bundle' | 'print';
  tags: string[];
  image?: string;
};

export type Wallpaper = {
  id: string;
  title: string;
  resolution: string;
  tags: string[];
  description: string;
};

export type ComicIssue = {
  id: string;
  title: string;
  issueNumber: number;
  summary: string;
  focusCharacter: string;
  previewPanels: string[];
};

export type ArtPiece = {
  id: string;
  title: string;
  medium: string;
  palette: string;
  description: string;
};

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  category: string;
  url: string;
};

export type ForumThread = {
  id: string;
  title: string;
  replies: number;
  tag: string;
  lastUpdated: string;
};

export type SearchResult = {
  id: string;
  title: string;
  snippet: string;
  type:
    | 'product'
    | 'wallpaper'
    | 'comic'
    | 'art'
    | 'blog'
    | 'forum'
    | 'page';
  path: string;
};

export const products: Product[] = [
  {
    id: 'tee-dumbo-neon',
    name: 'Neon Dumbo Tee',
    description: 'Soft cotton tee featuring Dumbo in neon grid-world style.',
    price: 28,
    category: 'tshirt',
    tags: ['apparel', 'dumbo', 'streetwear'],
  },
  {
    id: 'tee-rizzo-rush',
    name: 'Rizzo Rush Tee',
    description: 'Action pose of Rizzo sprinting through holo-billboards.',
    price: 30,
    category: 'tshirt',
    tags: ['apparel', 'rizzo', 'cyber'],
  },
  {
    id: 'comic-issue-1',
    name: 'Issue #1: Dawn of the Fuqverse',
    description: 'Origin story special with character dossiers and a double-spread map.',
    price: 12,
    category: 'comic',
    tags: ['comic', 'origin', 'lore'],
  },
  {
    id: 'action-buzz',
    name: 'Buzz Action Figure',
    description: 'Fully articulated Buzz figure with plasma-spear accessory.',
    price: 45,
    category: 'action-figure',
    tags: ['collectible', 'buzz', 'action'],
  },
  {
    id: 'bundle-starter',
    name: 'Starter Bundle',
    description: 'Shirt, comic, and wallpaper pack to onboard new fans.',
    price: 70,
    category: 'bundle',
    tags: ['bundle', 'starter', 'value'],
  },
  {
    id: 'print-mascot-squad',
    name: 'Mascot Squad Poster',
    description: 'A2 print of the entire crew framed by neon circuitry.',
    price: 22,
    category: 'print',
    tags: ['poster', 'crew', 'art'],
  },
];

export const wallpapers: Wallpaper[] = [
  {
    id: 'wall-dumbo-synthwave',
    title: 'Dumbo Synthwave City',
    resolution: '4K',
    tags: ['dumbo', 'city', 'synthwave'],
    description: 'Purple-and-teal skyline with Dumbo perched on a neon girder.',
  },
  {
    id: 'wall-rizzo-jump',
    title: 'Rizzo Rooftop Jump',
    resolution: '4K',
    tags: ['rizzo', 'motion', 'night'],
    description: 'Freeze-frame of Rizzo leaping between towers with light trails.',
  },
  {
    id: 'wall-scrapz-lab',
    title: 'Scrapz in the Lab',
    resolution: 'Ultrawide',
    tags: ['scrapz', 'laboratory', 'holograms'],
    description: 'Workbench of holographic schematics and floating widgets.',
  },
];

export const comicIssues: ComicIssue[] = [
  {
    id: 'issue-1',
    title: 'Dawn of the Fuqverse',
    issueNumber: 1,
    focusCharacter: 'Dumbo',
    summary:
      'The crew discovers the first neon rift and races to stabilize it before the city dissolves.',
    previewPanels: [
      'Dumbo cutting through a wall of pixels with a grappling hook.',
      'Patty LaHam decoding a holographic glyph in midair.',
      'Buzz standing guard as the skyline glitches behind him.',
    ],
  },
  {
    id: 'issue-2',
    title: 'Rooftop Relay',
    issueNumber: 2,
    focusCharacter: 'Rizzo',
    summary: 'A courier chase across skybridges reveals a saboteur in the ranks.',
    previewPanels: [
      'Rizzo sprinting across a glass bridge while drones swarm.',
      'Scrapz tossing an EMP disk to halt the pursuit.',
    ],
  },
];

export const artPieces: ArtPiece[] = [
  {
    id: 'art-dumbo-holo',
    title: 'Dumbo: Hologram Breaker',
    medium: 'Digital neon matte-painting',
    palette: 'Electric cyan, magenta, obsidian',
    description: 'Dumbo splitting a neon wave with a reinforced gauntlet.',
  },
  {
    id: 'art-buzz-guard',
    title: 'Buzz: Sentinel of the Spires',
    medium: 'Ink + glow overlays',
    palette: 'Emerald, chrome, deep blue',
    description: 'Buzz overlooking the lower levels with a plasma spear.',
  },
  {
    id: 'art-patty-signal',
    title: 'Patty LaHam: Signal Crafter',
    medium: 'Vector poster',
    palette: 'Sunset orange, slate, ultraviolet',
    description: 'Patty weaving signals into a protective lattice.',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'devlog-ai-pipeline',
    title: 'AI Pipelines for Character Variations',
    summary: 'How we batch prompts through Veo, Wan 2.2, and local models.',
    category: 'Devlog',
    url: '/docs/content-generation-workflows',
  },
  {
    id: 'lore-rift',
    title: 'Lore Drop: The First Rift',
    summary: 'An in-universe chronicle that pairs with Issue #1.',
    category: 'Lore',
    url: '/comics',
  },
  {
    id: 'wallpaper-pack',
    title: 'Wallpaper Pack Changelog',
    summary: 'New renders with 4K and ultrawide crops for all mascots.',
    category: 'Release',
    url: '/wallpapers',
  },
];

export const forumThreads: ForumThread[] = [
  {
    id: 'thread-production-feedback',
    title: 'Production feedback: shirts and figure QC',
    replies: 42,
    tag: 'merch',
    lastUpdated: '2h ago',
  },
  {
    id: 'thread-lore-speculation',
    title: 'Lore speculation: who opened the rift?',
    replies: 67,
    tag: 'story',
    lastUpdated: '5h ago',
  },
  {
    id: 'thread-wallpaper-requests',
    title: 'Wallpaper requests + monitor aspect ratios',
    replies: 19,
    tag: 'art',
    lastUpdated: '1d ago',
  },
];

const searchablePages: SearchResult[] = [
  {
    id: 'page-store',
    title: 'Store',
    snippet: 'Buy tees, comics, figures, and bundles.',
    type: 'page',
    path: '/store',
  },
  {
    id: 'page-wallpapers',
    title: 'Wallpapers',
    snippet: 'High-resolution desktop and mobile backgrounds.',
    type: 'page',
    path: '/wallpapers',
  },
  {
    id: 'page-comics',
    title: 'Comic Viewer',
    snippet: 'Preview panels and in-browser viewing.',
    type: 'page',
    path: '/comics',
  },
  {
    id: 'page-blog',
    title: 'Blog',
    snippet: 'Devlogs, lore drops, and release notes.',
    type: 'page',
    path: '/blog',
  },
  {
    id: 'page-forum',
    title: 'Forum',
    snippet: 'Community QA, requests, and production updates.',
    type: 'page',
    path: '/forum',
  },
];

export function searchCatalog(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return searchablePages;

  const productResults = products
    .filter(product =>
      [product.name, product.description, ...product.tags].some(text =>
        text.toLowerCase().includes(normalized)
      )
    )
    .map<SearchResult>(product => ({
      id: `product-${product.id}`,
      title: product.name,
      snippet: product.description,
      type: 'product',
      path: '/store',
    }));

  const wallpaperResults = wallpapers
    .filter(wallpaper =>
      [wallpaper.title, wallpaper.description, ...wallpaper.tags].some(text =>
        text.toLowerCase().includes(normalized)
      )
    )
    .map<SearchResult>(wallpaper => ({
      id: `wallpaper-${wallpaper.id}`,
      title: wallpaper.title,
      snippet: `${wallpaper.description} (${wallpaper.resolution})`,
      type: 'wallpaper',
      path: '/wallpapers',
    }));

  const comicResults = comicIssues
    .filter(issue =>
      [issue.title, issue.summary, issue.focusCharacter].some(text =>
        text.toLowerCase().includes(normalized)
      )
    )
    .map<SearchResult>(issue => ({
      id: `comic-${issue.id}`,
      title: `${issue.title} (Issue ${issue.issueNumber})`,
      snippet: issue.summary,
      type: 'comic',
      path: '/comics',
    }));

  const artResults = artPieces
    .filter(piece =>
      [piece.title, piece.description, piece.medium, piece.palette].some(text =>
        text.toLowerCase().includes(normalized)
      )
    )
    .map<SearchResult>(piece => ({
      id: `art-${piece.id}`,
      title: piece.title,
      snippet: `${piece.medium} — ${piece.palette}`,
      type: 'art',
      path: '/artwork',
    }));

  const blogResults = blogPosts
    .filter(post =>
      [post.title, post.summary, post.category].some(text =>
        text.toLowerCase().includes(normalized)
      )
    )
    .map<SearchResult>(post => ({
      id: `blog-${post.id}`,
      title: post.title,
      snippet: post.summary,
      type: 'blog',
      path: post.url,
    }));

  const forumResults = forumThreads
    .filter(thread =>
      [thread.title, thread.tag].some(text => text.toLowerCase().includes(normalized))
    )
    .map<SearchResult>(thread => ({
      id: `forum-${thread.id}`,
      title: thread.title,
      snippet: `${thread.replies} replies — ${thread.tag}`,
      type: 'forum',
      path: '/forum',
    }));

  return [
    ...productResults,
    ...wallpaperResults,
    ...comicResults,
    ...artResults,
    ...blogResults,
    ...forumResults,
    ...searchablePages.filter(page =>
      [page.title, page.snippet].some(text =>
        text.toLowerCase().includes(normalized)
      )
    ),
  ];
}
