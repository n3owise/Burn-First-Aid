import burnsDataJson from './burns-data.json';

export interface BurnGuide {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  imageUrl: string;
}

export interface GuideSectionItem {
  image: string;
  text: {
    en: string;
    hi: string;
  };
}

export interface GuideStep {
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
}

export interface GuideContentData {
  id: string;
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  heroImage: string;
  dos: GuideSectionItem[];
  donts: GuideSectionItem[];
  steps: GuideStep[];
  warnings: { en: string; hi: string }[];
}

// Load all burn guides from JSON file (excluding hidden ones)
export const BURN_GUIDES: BurnGuide[] = burnsDataJson.guides
  .filter(guide => !guide.hidden)
  .map(guide => ({
    id: guide.id,
    title: guide.title,
    description: guide.description,
    imageUrl: guide.imageUrl
  }));

// Function to get full guide data by ID
export const getGuideDataById = (id: string): GuideContentData | undefined => {
  const guide = burnsDataJson.guides.find(g => g.id === id);
  if (!guide) return undefined;
  
  return {
    id: guide.id,
    title: guide.title,
    subtitle: guide.subtitle,
    heroImage: guide.heroImage,
    dos: guide.dos,
    donts: guide.donts,
    steps: guide.steps,
    warnings: guide.warnings
  };
};