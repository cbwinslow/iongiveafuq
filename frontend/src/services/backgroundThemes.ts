export interface BackgroundTheme {
  name: string;
  style: {
    color: string;
    lighting: string;
    effects: string[];
  };
  elements: {
    [key: string]: {
      position: {
        x: number;
        y: number;
        z: number;
      };
      scale: number;
      rotation: number;
      animation: string;
    };
  };
}

export interface ThemeCollection {
  [key: string]: BackgroundTheme;
}

export const THEMES: ThemeCollection = {
  'neon_alley': {
    name: 'Neon Alley',
    style: {
      color: '#1a1a1a',
      lighting: 'neon',
      effects: ['glow', 'flicker', 'rain']
    },
    elements: {
      'neon_sign_1': {
        position: { x: -2, y: 1, z: 0 },
        scale: 1.5,
        rotation: 0,
        animation: 'glow'
      },
      'trash_can': {
        position: { x: 2, y: 0, z: 0 },
        scale: 1,
        rotation: 0,
        animation: 'idle'
      },
      'graffiti_wall': {
        position: { x: 0, y: 0, z: -2 },
        scale: 2,
        rotation: 0,
        animation: 'idle'
      }
    }
  },
  'fashion_runway': {
    name: 'Fashion Runway',
    style: {
      color: '#222222',
      lighting: 'spotlights',
      effects: ['sparkles', 'glitter', 'flash']
    },
    elements: {
      'runway': {
        position: { x: 0, y: 0, z: 0 },
        scale: 1,
        rotation: 0,
        animation: 'idle'
      },
      'lights': {
        position: { x: 0, y: 2, z: 0 },
        scale: 1,
        rotation: 0,
        animation: 'flash'
      },
      'audience': {
        position: { x: 0, y: 0, z: -2 },
        scale: 1,
        rotation: 0,
        animation: 'idle'
      }
    }
  },
  'city_skyline': {
    name: 'City Skyline',
    style: {
      color: '#000000',
      lighting: 'moonlight',
      effects: ['fog', 'stars', 'lightning']
    },
    elements: {
      'buildings': {
        position: { x: 0, y: 0, z: 0 },
        scale: 1,
        rotation: 0,
        animation: 'idle'
      },
      'moon': {
        position: { x: 2, y: 2, z: 0 },
        scale: 0.5,
        rotation: 0,
        animation: 'idle'
      },
      'clouds': {
        position: { x: 0, y: 1, z: 2 },
        scale: 2,
        rotation: 0,
        animation: 'move'
      }
    }
  }
};

export const getTheme = (themeName: string): BackgroundTheme => {
  const theme = THEMES[themeName];
  if (!theme) {
    throw new Error(`Theme not found: ${themeName}`);
  }
  return theme;
};
