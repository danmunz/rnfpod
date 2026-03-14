export interface Segment {
  title: string;
  timestamp: number;
  description?: string;
  accent?: string;
}

export interface Resource {
  title: string;
  url: string;
}

export interface Episode {
  number: number;
  title: string;
  slug: string;
  date: string;
  duration: string;
  published: boolean;
  audioUrl: string;
  topics: string[];
  gradient: string;
  annotation?: string;
  segments: Segment[];
  resources: Resource[];
  description: string; // markdown body (show notes)
}

export interface PodcastConfig {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  email: string;
  language: string;
  categories: string[];
  imageUrl: string;
  siteUrl: string;
  mediaBaseUrl: string;
}
