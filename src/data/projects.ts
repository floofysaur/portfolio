export interface Project {
  title: string;
  meta: string;
  href: string;
  image: string;
  /** Width on the 1020px desktop grid; also used as the flex ratio on smaller screens. */
  width: number;
}

/** Featured projects, in rows of two (order matches the live site). */
export const projects: Project[][] = [
  [
    { title: 'In-App Purchases @ Duolingo', meta: 'Product Design | Summer 2026', href: '/duolingo', image: '/images/projects/duolingo.webp', width: 547 },
    { title: 'Data Loss Prevention @ RBC', meta: 'Design Engineering | Summer 2025', href: '/dlp-dashboard', image: '/images/projects/rbc.webp', width: 437 },
  ],
  [
    { title: 'Face Swap @ Magic Hour (YC W24)', meta: 'Product Design | March 2024', href: '/magic-hour', image: '/images/projects/magic-hour.webp', width: 437 },
    { title: 'Furward', meta: 'Game Design | Summer 2024', href: '/furward', image: '/images/projects/furward.webp', width: 547 },
  ],
  [
    { title: 'Apricity: Gratitude Journalling', meta: 'Design + Development | In progress', href: '/apricity', image: '/images/projects/apricity.webp', width: 537 },
    { title: 'TypeLab: Inspiring Font Discovery', meta: 'Full-stack Design | Fall 2025', href: '/type-lab', image: '/images/projects/typelab.webp', width: 447 },
  ],
];

export interface Tidbit {
  title: string;
  description: string;
  href?: string;
  /** Opens a popup instead of a link */
  overlay?: string;
  /** Thumbnail art, cropped inside the 120px tile the same way the live site does. */
  thumb: { src: string; size: string; position: string; bg?: string };
}

export const tidbits: Tidbit[] = [
  {
    title: 'Popcat Press',
    description: "A small Etsy shop I've been running over the past few years…",
    href: 'https://www.etsy.com/shop/PopcatPress',
    thumb: { src: '/images/tidbits/popcat.webp', size: '385px', position: '-93px -46px' },
  },
  {
    title: 'Froggy Focus',
    description: 'A cute pomodoro Chrome extension',
    href: 'https://chromewebstore.google.com/detail/Froggy%20Pomodoro/iffmnnkbohjeolbkigbpbbmlfeflndmj',
    thumb: { src: '/images/tidbits/froggy.png', size: '127px', position: '-4px -2px', bg: 'var(--thumb-bg)' },
  },
  {
    title: 'Co-working & Café',
    description: 'A small website I designed + developed',
    href: 'https://floofysaur.github.io/apricity/',
    thumb: { src: '/images/tidbits/cafe.png', size: '111px', position: '4px 4px', bg: 'var(--thumb-bg)' },
  },
  {
    title: 'Kirple',
    description: 'AI-powered creature game where your interactions unlock animated memories',
    overlay: 'ov-kirple',
    thumb: { src: '/images/tidbits/kirple.webp', size: '512px', position: '-135px -69px' },
  },
  {
    title: 'Market-Bench @ AfterQuery',
    description: 'An AI benchmark to evaluate LLMs',
    href: 'https://www.marketbench.ai/',
    thumb: { src: '/images/tidbits/afterquery.png', size: 'cover', position: 'center' },
  },
];
