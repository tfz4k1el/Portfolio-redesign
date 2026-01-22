import { Project } from './types';

export const COLORS = {
  black: '#0F0F0F',
  white: '#F5F5F5',
  blue: '#80DEEA',
  gray: '#2A2A2A',
};

export const PROJECTS: Project[] = [
  {
    id: '001',
    title: 'nxStudio',
    description: 'A product validation and development planning tool for founders. It transforms messy ideas into structured, AI-ready development projects using the nxhuman framework.',
    tech: ['B2B', 'WEB', 'RESPONSIVE'],
    role: 'Lead Architect',
    desktopImg: '/assets/images/nx-project-page-desktop.png',
    mobileImg: '/assets/images/nx-project-page-mobile.png',
    stats: [
      { label: 'Latency', value: '4ms' },
      { label: 'Updates', value: '120/s' },
    ],
  },
  {
    id: '002',
    title: 'BLU Studio',
    description: 'Designed and built a novel brand-shoot ecosystem for Blu Studios, delivering a fully responsive booking platform with interactive moodboards, real-time model selection, dynamic cost calculation, and seamless slot, shoot-type, and model filtering.',
    tech: ['B2B', 'WEB', 'RESPONSIVE'],
    role: 'UI/UX Designer',
    desktopImg: '/assets/images/homepage-desktop.jpg',
    mobileImg: '/assets/images/mobile-view-calendar.jpg',
    stats: [
      { label: 'Conversion', value: '+45%' },
      { label: 'Users', value: '2.5k' },
    ],
  },
  {
    id: '003',
    title: 'Vire',
    description: 'A mobile-first Progressive Web App designed for seamless ticket booking and event management. Features a highly optimized interface for touch interactions, real-time ticket validation, and an engaging user journey from discovery to access.',
    tech: ['Mobile', 'PWA', 'B2B'],
    role: 'Product Designer',
    mobileImages: [
        ['/assets/images/vire-login.jpg', '/assets/images/vire-your-tickets.jpg'],
        ['/assets/images/vire-claimed.jpg', '/assets/images/vire-live-ticket.jpg'],
        ['/assets/images/vire-blend.jpg']
    ],
    stats: [
      { label: 'Engagement', value: 'High' },
      { label: 'Retention', value: '85%' },
    ],
  },
  {
    id: '004',
    title: 'T2Chat',
    description: 'Collaborated with the T2Chat team to design and animate a high-energy motion graphic promo. The video highlights the app\'s real-time capabilities and sleek interface (replacing tRPC complexities), bridging technical features with engaging visual storytelling using After Effects.',
    tech: ['Motion Graphics', 'Promo', 'Visuals'],
    role: 'Motion Designer',
    videoUrl: '/videos/T2Chat.mp4',
    // tweetId: '1935401498126758254', 
    stats: [
      { label: 'Views', value: 'High' },
      { label: 'Impact', value: 'High' },
    ],
  },
];
