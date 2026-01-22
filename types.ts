export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  role: string;
  desktopImg?: string;
  mobileImg?: string;
  mobileImages?: (string | string[])[];
  videoUrl?: string;
  tweetId?: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface Metric {
  label: string;
  value: number | string;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
}
