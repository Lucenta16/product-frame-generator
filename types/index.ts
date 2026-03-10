export type Marketplace = 'amazon' | 'ebay';

export type Plan = 'free' | 'pro';

export interface MarketplacePreset {
  name: string;
  width: number;
  height: number;
  description: string;
}

export interface MarketplaceConfig {
  name: string;
  presets: MarketplacePreset[];
  aspectRatio: string;
  backgroundColor: string;
}

export const MARKETPLACE_CONFIGS: Record<Marketplace, MarketplaceConfig> = {
  amazon: {
    name: 'Amazon',
    presets: [
      {
        name: 'Amazon Standard',
        width: 1000,
        height: 1000,
        description: 'Minimum zoom requirement',
      },
      {
        name: 'Amazon HD',
        width: 2000,
        height: 2000,
        description: 'Recommended high quality',
      },
    ],
    aspectRatio: '1:1',
    backgroundColor: '#FFFFFF',
  },
  ebay: {
    name: 'eBay',
    presets: [
      {
        name: 'eBay Standard',
        width: 1600,
        height: 1600,
        description: 'Recommended',
      },
      {
        name: 'eBay Lightweight',
        width: 1000,
        height: 1000,
        description: 'Smaller file size',
      },
    ],
    aspectRatio: '1:1',
    backgroundColor: '#FFFFFF',
  },
};

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  marketplace: Marketplace;
  created_at: string;
  border_color?: string;
  border_thickness?: number;
  background_color?: string;
  selected_badges?: Badge[];
  badge_size?: number;
  selected_preset_name?: string | null;
}

export interface Image {
  id: string;
  project_id: string;
  original_url: string;
  processed_url: string | null;
  width: number;
  height: number;
  created_at: string;
}

export interface UsageLimit {
  id: string;
  user_id: string;
  exports_count: number;
  plan: Plan;
  created_at: string;
}

export interface FrameSettings {
  borderColor: string;
  borderThickness: number;
  backgroundColor: string;
}

export interface BadgePosition {
  x: number;
  y: number;
}

export interface Badge {
  id: string;
  name: string;
  url: string;
  color?: string; // Custom color for badges with currentColor support
}

export const DEFAULT_BADGES: Badge[] = [
  { id: '100quality', name: '100% Quality', url: '/badges/100quality.svg', color: '#000000' },
  { id: 'freereturn', name: 'Free Return', url: '/badges/freereturn.svg', color: '#000000' },
  { id: 'specialoffer', name: 'Special Offer', url: '/badges/specialoffer.svg', color: '#000000' },
];

export interface ExportSettings {
  marketplace: Marketplace;
  preset: MarketplacePreset;
  frame: FrameSettings;
  badge?: {
    badge: Badge;
    position: BadgePosition;
  };
}

export const FREE_PLAN_EXPORT_LIMIT = 5;
