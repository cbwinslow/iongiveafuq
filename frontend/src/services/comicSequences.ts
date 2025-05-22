export interface ComicPanel {
  character: string;
  animation: string;
  background: string;
  catchphrase: string;
  effects: string[];
  interactions: string[];
}

export interface ComicSequence {
  title: string;
  panels: ComicPanel[];
  theme: string;
}

export const COMIC_SEQUENCES: ComicSequence[] = [
  {
    title: "The Arrival",
    theme: "neon_alley",
    panels: [
      {
        character: "charmz",
        animation: "walking",
        background: "neon_alley",
        catchphrase: "I don't give a damn about this place...",
        effects: ["glow", "rain"],
        interactions: ["adjusting_sunglasses", "phone_check"]
      },
      {
        character: "scrapz",
        animation: "eyeing_charmz",
        background: "neon_alley",
        catchphrase: "I don't give a fuck... but this one's different...",
        effects: ["smoke", "flicker"],
        interactions: ["smoking", "cigarette_drop"]
      },
      {
        character: "dumbo",
        animation: "drooling",
        background: "messy_apartment",
        catchphrase: "I don't give a damn... but I could look better...",
        effects: ["flicker", "glow"],
        interactions: ["cleaning_up", "awkward_smile"]
      },
      {
        character: "buzz",
        animation: "stumbling",
        background: "dark_alley",
        catchphrase: "I don't give a damn... but I could be less drunk...",
        effects: ["glow", "flicker"],
        interactions: ["drinking", "falling_over"]
      },
      {
        character: "patty",
        animation: "catwalk",
        background: "fashion_runway",
        catchphrase: "I don't give a damn... but I could show her how it's done...",
        effects: ["sparkles", "flash"],
        interactions: ["posing", "throwing_shade"]
      }
    ]
  },
  {
    title: "The Competition",
    theme: "fashion_runway",
    panels: [
      {
        character: "patty",
        animation: "catwalk",
        background: "fashion_runway",
        catchphrase: "I don't give a damn about her style...",
        effects: ["sparkles", "glitter"],
        interactions: ["posing", "adjusting_outfit"]
      },
      {
        character: "scrapz",
        animation: "sulking",
        background: "dark_alley",
        catchphrase: "I don't give a fuck... but I could look cooler...",
        effects: ["smoke", "flicker"],
        interactions: ["smoking", "adjusting_clothes"]
      },
      {
        character: "buzz",
        animation: "singing",
        background: "dark_alley",
        catchphrase: "I don't give a damn... but I could be less drunk...",
        effects: ["glow", "flicker"],
        interactions: ["drinking", "trying_to_focus"]
      },
      {
        character: "dumbo",
        animation: "trying_to_impress",
        background: "messy_apartment",
        catchphrase: "I don't give a damn... but I could be more impressive...",
        effects: ["flicker", "glow"],
        interactions: ["spilling_food", "awkward_smile"]
      },
      {
        character: "rizzo",
        animation: "watching",
        background: "dark_alley",
        catchphrase: "I don't give a damn... but I could be more interested...",
        effects: ["glow", "flicker"],
        interactions: ["coughing", "twitching"]
      }
    ]
  },
  {
    title: "The Resolution",
    theme: "city_skyline",
    panels: [
      {
        character: "charmz",
        animation: "posing",
        background: "city_skyline",
        catchphrase: "I don't give a damn about their competition...",
        effects: ["stars", "lightning"],
        interactions: ["hair_flip", "smoking"]
      },
      {
        character: "all",
        animation: "group_scene",
        background: "rooftop",
        catchphrase: "I don't give a damn about their attention...",
        effects: ["glow", "sparkles"],
        interactions: ["all_interacting", "dynamic_movement"]
      }
    ]
  }
];
