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

export interface HomeFooterData {
  heading: { en: string; hi: string };
  doctorName: string;
  qualifications: string;
  specialty: string;
  experienceTitle: string;
  experienceSubtitle: string;
  hospitalName: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  phoneUrl: string;
  whatsappLabel: string;
  whatsappUrl: string;
  email: string;
  emailUrl: string;
  website: string;
  websiteUrl: string;
  doctorImage: string;
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

export const HOME_FOOTER_DATA: HomeFooterData = {
  heading: {
    en: 'Medical Supervision',
    hi: 'चिकित्सकीय पर्यवेक्षण'
  },
  doctorName: 'Dr. Kaushal Kumar',
  qualifications: 'M.S. · M.Ch.   ·    Plastic Surgeon',
  specialty: '',
  experienceTitle: '30+ Years Experience',
  experienceSubtitle: 'Serving Bareilly since 1996',
  hospitalName: 'Eshan Hospital',
  addressLine1: 'F-1, Rampur Garden,Bareilly, UP 243001',
  addressLine2: '',
  phone: '9837041574',
  phoneUrl: 'tel:+919837041574',
  whatsappLabel: 'WhatsApp',
  whatsappUrl: 'https://wa.me/919837041574',
  email: 'info@eshanhospital.com',
  emailUrl: 'mailto:info@eshanhospital.com',
  website: 'www.eshanhospital.com',
  websiteUrl: 'https://www.eshanhospital.com',
  doctorImage: '/images/doctor-profile.png'
};