export interface StoryArc {
  title: string;
  theme: string;
  background: string;
  panels: {
    [key: string]: {
      character: string;
      animation: string;
      catchphrase: string;
      interaction: string;
      effects: string[];
      transitions: string[];
      merchandise: string[];
    };
  };
  specialEffects: string[];
  backgroundTransitions: string[];
}

export class StoryArcService {
  private static instance: StoryArcService;
  private arcs: StoryArc[];

  private constructor() {
    this.arcs = [
      {
        title: "The Arrival",
        theme: "arrival",
        background: "neon_alley",
        panels: {
          "panel_1": {
            character: "charmz",
            animation: "walking",
            catchphrase: "I don't give a damn about this place...",
            interaction: "adjusting_sunglasses",
            effects: ["glow", "rain"],
            transitions: ["fade_in", "pan_right"],
            merchandise: ["sunglasses", "designer_coffee"]
          },
          "panel_2": {
            character: "scrapz",
            animation: "eyeing_charmz",
            catchphrase: "I don't give a fuck... but this one's different...",
            interaction: "smoking",
            effects: ["smoke", "flicker"],
            transitions: ["zoom_in", "shake"],
            merchandise: ["cigarette_pack", "grungy_tshirt"]
          },
          "panel_3": {
            character: "dumbo",
            animation: "drooling",
            catchphrase: "I don't give a damn... but I could look better...",
            interaction: "cleaning_up",
            effects: ["flicker", "glow"],
            transitions: ["slide_up", "morph"],
            merchandise: ["ugly_tshirt", "pizza_box"]
          }
        },
        specialEffects: ["neon_flash", "rain_drops", "graffiti_appear"],
        backgroundTransitions: ["fade", "slide", "morph"]
      },
      {
        title: "The Competition",
        theme: "competition",
        background: "fashion_runway",
        panels: {
          "panel_1": {
            character: "patty",
            animation: "catwalk",
            catchphrase: "I don't give a damn about her style...",
            interaction: "throwing_shade",
            effects: ["sparkles", "flash"],
            transitions: ["fade_in", "spin"],
            merchandise: ["designer_dress", "glitter_boots"]
          },
          "panel_2": {
            character: "buzz",
            animation: "singing",
            catchphrase: "I don't give a damn... but I could be less drunk...",
            interaction: "drinking",
            effects: ["glow", "flicker"],
            transitions: ["zoom_in", "shake"],
            merchandise: ["beer_mug", "drunk_tshirt"]
          },
          "panel_3": {
            character: "rizzo",
            animation: "watching",
            catchphrase: "I don't give a damn... but I could be more interested...",
            interaction: "coughing",
            effects: ["glow", "flicker"],
            transitions: ["fade_in", "pan_left"],
            merchandise: ["sick_tshirt", "bandana"]
          }
        },
        specialEffects: ["spotlight", "confetti", "catwalk_lights"],
        backgroundTransitions: ["fade", "slide", "morph"]
      },
      {
        title: "The Resolution",
        theme: "resolution",
        background: "city_skyline",
        panels: {
          "panel_1": {
            character: "charmz",
            animation: "posing",
            catchphrase: "I don't give a damn about their competition...",
            interaction: "hair_flip",
            effects: ["stars", "lightning"],
            transitions: ["fade_in", "pan_right"],
            merchandise: ["designer_gown", "champagne"]
          },
          "panel_2": {
            character: "all",
            animation: "group_scene",
            catchphrase: "I don't give a damn about their attention...",
            interaction: "all_interacting",
            effects: ["glow", "sparkles"],
            transitions: ["zoom_in", "morph"],
            merchandise: ["group_tshirt", "merch_box"]
          }
        },
        specialEffects: ["city_lights", "clouds_move", "moon_glow"],
        backgroundTransitions: ["fade", "slide", "morph"]
      }
    ];
  }

  public static getInstance(): StoryArcService {
    if (!StoryArcService.instance) {
      StoryArcService.instance = new StoryArcService();
    }
    return StoryArcService.instance;
  }

  getArcs(): StoryArc[] {
    return this.arcs;
  }

  getArc(title: string): StoryArc {
    return this.arcs.find(arc => arc.title === title);
  }

  getPanel(arcTitle: string, panelId: string): any {
    const arc = this.getArc(arcTitle);
    return arc?.panels[panelId];
  }

  getMerchandise(arcTitle: string): string[] {
    const arc = this.getArc(arcTitle);
    return arc?.panels
      ? Object.values(arc.panels)
          .flatMap(panel => panel.merchandise)
          .filter((value, index, self) => self.indexOf(value) === index)
      : [];
  }

  getSpecialEffects(arcTitle: string): string[] {
    const arc = this.getArc(arcTitle);
    return arc?.specialEffects || [];
  }

  getBackgroundTransitions(arcTitle: string): string[] {
    const arc = this.getArc(arcTitle);
    return arc?.backgroundTransitions || [];
  }
}

export const storyArcService = StoryArcService.getInstance();
