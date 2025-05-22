export interface SpecialEffect {
  name: string;
  type: string;
  duration: number;
  properties: {
    [key: string]: any;
  };
}

export interface Transition {
  name: string;
  type: string;
  duration: number;
  properties: {
    [key: string]: any;
  };
}

export interface Merchandise {
  name: string;
  type: string;
  character: string;
  price: number;
  description: string;
  effects: string[];
}

export class EffectsService {
  private static instance: EffectsService;
  private effects: SpecialEffect[];
  private transitions: Transition[];
  private merchandise: Merchandise[];

  private constructor() {
    this.effects = [
      // Character-specific effects
      {
        name: 'charmz_glow',
        type: 'glow',
        duration: 2000,
        properties: {
          color: '#FFD700',
          intensity: 0.8,
          pulse: true
        }
      },
      {
        name: 'scrapz_smoke',
        type: 'smoke',
        duration: 1500,
        properties: {
          color: '#8B4513',
          density: 0.7,
          drift: true
        }
      },
      {
        name: 'dumbo_sweat',
        type: 'particles',
        duration: 1000,
        properties: {
          color: '#FFFFFF',
          size: 2,
          count: 10
        }
      },
      {
        name: 'buzz_drunk',
        type: 'blur',
        duration: 500,
        properties: {
          amount: 2,
          color: '#FF0000',
          pulse: true
        }
      },
      {
        name: 'patty_sparkle',
        type: 'particles',
        duration: 1200,
        properties: {
          color: '#FF00FF',
          size: 3,
          count: 20
        }
      },
      {
        name: 'rizzo_cough',
        type: 'particles',
        duration: 800,
        properties: {
          color: '#8B0000',
          size: 2,
          count: 5
        }
      },

      // Scene-specific effects
      {
        name: 'neon_flash',
        type: 'light',
        duration: 500,
        properties: {
          color: ['#FF00FF', '#00FF00', '#0000FF'],
          intensity: 0.5,
          frequency: 100
        }
      },
      {
        name: 'rain_drops',
        type: 'particles',
        duration: 2000,
        properties: {
          color: '#FFFFFF',
          size: 1,
          count: 50,
          speed: 2
        }
      },
      {
        name: 'confetti',
        type: 'particles',
        duration: 1500,
        properties: {
          colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
          size: 3,
          count: 30
        }
      },
      {
        name: 'city_lights',
        type: 'light',
        duration: 3000,
        properties: {
          colors: ['#FF00FF', '#00FF00', '#0000FF'],
          intensity: 0.3,
          frequency: 500
        }
      }
    ];

    this.transitions = [
      {
        name: 'fade',
        type: 'opacity',
        duration: 1000,
        properties: {
          start: 1,
          end: 0,
          ease: 'linear'
        }
      },
      {
        name: 'slide',
        type: 'position',
        duration: 1200,
        properties: {
          direction: 'left',
          distance: 100,
          ease: 'easeOut'
        }
      },
      {
        name: 'morph',
        type: 'transform',
        duration: 1500,
        properties: {
          shape: 'circle',
          scale: 1.5,
          ease: 'easeInOut'
        }
      },
      {
        name: 'zoom',
        type: 'scale',
        duration: 800,
        properties: {
          start: 1,
          end: 1.5,
          ease: 'easeOut'
        }
      },
      {
        name: 'shake',
        type: 'position',
        duration: 500,
        properties: {
          distance: 10,
          frequency: 10,
          ease: 'none'
        }
      },
      {
        name: 'pan',
        type: 'position',
        duration: 2000,
        properties: {
          direction: 'right',
          distance: 200,
          ease: 'easeInOut'
        }
      }
    ];

    this.merchandise = [
      {
        name: 'Charmz Sunglasses',
        type: 'accessory',
        character: 'charmz',
        price: 29.99,
        description: 'Charmz-style designer sunglasses with gold frame',
        effects: ['charmz_glow', 'sparkle']
      },
      {
        name: 'Scrapz Cigarette Pack',
        type: 'accessory',
        character: 'scrapz',
        price: 19.99,
        description: 'Limited edition cigarette pack with Scrapz design',
        effects: ['scrapz_smoke', 'glow']
      },
      {
        name: 'Dumbo T-Shirt',
        type: 'clothing',
        character: 'dumbo',
        price: 24.99,
        description: 'Official Dumbo merchandise t-shirt',
        effects: ['dumbo_sweat', 'glow']
      },
      {
        name: 'Buzz Beer Mug',
        type: 'accessory',
        character: 'buzz',
        price: 14.99,
        description: 'Buzz-themed beer mug with special design',
        effects: ['buzz_drunk', 'glow']
      },
      {
        name: 'Patty Designer Dress',
        type: 'clothing',
        character: 'patty',
        price: 49.99,
        description: 'Exclusive Patty-style designer dress',
        effects: ['patty_sparkle', 'glow']
      },
      {
        name: 'Rizzo Bandana',
        type: 'accessory',
        character: 'rizzo',
        price: 9.99,
        description: 'Rizzo-themed bandana with special design',
        effects: ['rizzo_cough', 'glow']
      }
    ];
  }

  public static getInstance(): EffectsService {
    if (!EffectsService.instance) {
      EffectsService.instance = new EffectsService();
    }
    return EffectsService.instance;
  }

  getEffects(): SpecialEffect[] {
    return this.effects;
  }

  getTransitions(): Transition[] {
    return this.transitions;
  }

  getMerchandise(): Merchandise[] {
    return this.merchandise;
  }

  getEffect(name: string): SpecialEffect {
    return this.effects.find(effect => effect.name === name);
  }

  getTransition(name: string): Transition {
    return this.transitions.find(transition => transition.name === name);
  }

  getMerchandiseItem(name: string): Merchandise {
    return this.merchandise.find(item => item.name === name);
  }

  getCharacterMerchandise(character: string): Merchandise[] {
    return this.merchandise.filter(item => item.character === character);
  }
}

export const effectsService = EffectsService.getInstance();
