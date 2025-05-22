export interface StoryPanel {
  character: string;
  description: string;
  background: string;
  interactions: string[];
  catchphrase: string;
  animations: string[];
}

export interface StoryArc {
  title: string;
  panels: StoryPanel[];
  backgroundThemes: string[];
}

export const CHARMZ_STORIES: StoryArc[] = [
  {
    title: "The Arrival",
    panels: [
      {
        character: "charmz",
        description: "Charmz arrives in the grungy alley, her blonde hair catching the neon lights as she surveys her new domain.",
        background: "dark alley with neon signs",
        interactions: [
          "Adjusts her designer sunglasses",
          "Checks her phone with a bored expression",
          "Sips from a designer coffee cup"
        ],
        catchphrase: "I don't give a damn about this place, but it's got potential...",
        animations: ["walking", "adjusting_sunglasses", "sipping_coffee"]
      },
      {
        character: "scrapz",
        description: "Scrapz notices Charmz from his usual spot, cigarette hanging from his mouth as he watches her with interest.",
        background: "grungy alley with neon signs",
        interactions: [
          "Blows smoke rings",
          "Flicks ashes",
          "Leans against wall"
        ],
        catchphrase: "I don't give a fuck about anyone, but this one's different...",
        animations: ["smoking", "blowing_smoke", "looking_interesting"]
      },
      {
        character: "dumbo",
        description: "Dumbo, lounging on his sofa, notices Charmz and immediately sits up straighter, drooling slightly.",
        background: "messy apartment with pizza boxes",
        interactions: [
          "Quickly wipes mouth",
          "Tries to look casual",
          "Fails miserably"
        ],
        catchphrase: "I don't give a damn about being ugly... but I could look better for her...",
        animations: ["drooling", "sitting_up", "looking_awkward"]
      }
    ],
    backgroundThemes: [
      "neon alley",
      "grungy apartment",
      "urban decay"
    ]
  },
  {
    title: "The Competition",
    panels: [
      {
        character: "buzz",
        description: "Buzz, already drunk, tries to impress Charmz with his 'cool' antics, stumbling around the alley.",
        background: "dark alley with empty beer bottles",
        interactions: [
          "Stumbling around",
          "Trying to look cool",
          "Failing miserably"
        ],
        catchphrase: "I don't give a damn about being drunk... but I could be less drunk for her...",
        animations: ["stumbling", "drinking", "looking_drunk"]
      },
      {
        character: "patty",
        description: "Patty, in her flamboyant attire, tries to outshine Charmz with her dramatic runway walk.",
        background: "fashion runway with neon lights",
        interactions: [
          "Strutting down runway",
          "Posing dramatically",
          "Throwing shade"
        ],
        catchphrase: "I don't give a damn about her style... but I could show her how it's done...",
        animations: ["walking", "posing", "throwing_shade"]
      },
      {
        character: "rizzo",
        description: "Rizzo, lying on his back with his skull bandana, watches the chaos unfold with a weak groan.",
        background: "dark alley with poison bottles",
        interactions: [
          "Weakly groaning",
          "Lying on back",
          "Watching from afar"
        ],
        catchphrase: "I don't give a damn about any of this... but I could give a damn about that...",
        animations: ["coughing", "twitching", "watching"]
      }
    ],
    backgroundThemes: [
      "fashion runway",
      "urban nightlife",
      "dark alley"
    ]
  },
  {
    title: "The Resolution",
    panels: [
      {
        character: "charmz",
        description: "Charmz sits on a rooftop overlooking the city, her blonde hair blowing in the wind as she smirks at her new 'fans'.",
        background: "city skyline at night",
        interactions: [
          "Smirking",
          "Looking over city",
          "Sipping champagne"
        ],
        catchphrase: "I don't give a damn about their competition... but I could use this to my advantage...",
        animations: ["smirking", "looking_over_city", "sipping_champagne"]
      },
      {
        character: "all",
        description: "All the characters gather around Charmz, each trying to get her attention in their own way.",
        background: "rooftop with neon lights",
        interactions: [
          "Scrapz smoking",
          "Dumbo trying to look casual",
          "Buzz stumbling",
          "Patty posing",
          "Rizzo coughing"
        ],
        catchphrase: "I don't give a damn about their attention... but I could make them work for it...",
        animations: ["all_interacting", "group_scene", "dynamic_movement"]
      }
    ],
    backgroundThemes: [
      "city skyline",
      "rooftop view",
      "neon lights"
    ]
  }
];
