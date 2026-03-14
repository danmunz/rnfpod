/** Podcast-wide configuration. Update these values for your podcast. */
export const podcastConfig = {
  title: 'Random Neural Firings',
  subtitle: 'A dad and daughter making unexpected connections',
  description:
    'Dan (dad, 41) and AJ (daughter, 11) make unexpected connections between completely unrelated topics. Neural pathways firing at random. Ideas branching, connecting, sparking.',
  author: 'Dan & AJ',
  email: '', // TODO: add contact email
  language: 'en-us',
  categories: ['Kids & Family', 'Education', 'Science'],
  imageUrl: '', // TODO: add podcast artwork URL (3000x3000 recommended)
  siteUrl: 'https://danmunz.github.io/rnfpod',
  /** Base URL for media files on Cloudflare R2 (no trailing slash) */
  mediaBaseUrl: 'https://pub-979fb0a721b04dcba18ac2257d240f1c.r2.dev', // TODO: set to your R2 public URL, e.g. https://media.randomneuralfirings.com
};
