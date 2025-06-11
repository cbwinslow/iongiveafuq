// Core mascot database with expanded personalities for dark humor storytelling
export const MASCOTS = {
  dumbo: {
    name: "Dumbo",
    species: "Dog",
    tier: "Fuqs",
    tagline: "Fresh outta fuqs – check back later.",
    appearance: {
      eyes: "droopy, bloodshot",
      posture: "awkward, slouched",
      setting: "cluttered sofa with pizza boxes, soda cans, snack wrappers",
      signature_items: ["crusty pizza slice", "stained remote control", "empty beer cans"]
    },
    personality: {
      primary: ["goofy", "carefree", "oblivious", "slothful"],
      dark_traits: ["chronically unemployed", "questionable hygiene", "serial procrastinator", "commitment-phobic"],
      speech_pattern: "slow, confused, often trails off mid-sentence",
      fears: ["responsibility", "actual work", "cleaning", "his mother's phone calls"],
      vices: ["binge-watching", "junk food addiction", "avoiding adulting"]
    },
    backstory_elements: {
      origin: "former corporate burnout who gave up on life",
      current_situation: "living off unemployment and pizza delivery apps",
      relationships: "estranged from family, few remaining friends",
      goals: "finding the remote, avoiding eviction notices"
    }
  },
  
  scrapz: {
    name: "Scrapz", 
    species: "Cat",
    tier: "Shits",
    tagline: "I couldn't give a 💩 if I tried.",
    appearance: {
      features: "torn ear, ragged fur, perpetual scowl",
      signature_items: ["half-smoked cigarette", "ash tray", "torn leather jacket"],
      setting: "dark alley, fire escape, abandoned buildings"
    },
    personality: {
      primary: ["sarcastic", "indifferent", "rebellious", "cynical"],
      dark_traits: ["chain smoker", "petty criminal", "emotionally unavailable", "trust issues"],
      speech_pattern: "deadpan, sharp wit, lots of profanity",
      fears: ["genuine emotion", "commitment", "sobriety", "his past catching up"],
      vices: ["cigarettes", "small-time hustling", "avoiding feelings"]
    },
    backstory_elements: {
      origin: "street cat who learned the hard way that life's unfair",
      current_situation: "surviving on wit and illegal activities",
      relationships: "burned bridges everywhere, lone wolf mentality",
      goals: "staying alive, getting his next fix, avoiding bigger predators"
    }
  },

  patty: {
    name: "Patty LaHam",
    species: "Pig", 
    tier: "Bonus",
    tagline: "Fabulous and fresh out of fuqs to give.",
    appearance: {
      attire: "oversized sunglasses, glittery dress, feather boa, gaudy jewelry",
      setting: "underground drag clubs, sketchy dressing rooms, seedy motels",
      signature_items: ["rhinestone tiara", "fake eyelashes", "flask of gin"]
    },
    personality: {
      primary: ["flamboyant", "dramatic", "confident", "attention-seeking"],
      dark_traits: ["substance abuse", "daddy issues", "financial troubles", "explosive temper"],
      speech_pattern: "theatrical, over-the-top, uses lots of slang and innuendo",
      fears: ["aging", "being forgotten", "running out of money", "losing her looks"],
      vices: ["alcohol", "gambling", "toxic relationships", "retail therapy"]
    },
    backstory_elements: {
      origin: "runaway from conservative farm family, found identity in underground scene",
      current_situation: "performing in dive bars to pay rent and feed habits",
      relationships: "series of toxic partners, fair-weather friends",
      goals: "stardom, validation, next drink, paying off debts"
    }
  },

  buzz: {
    name: "Buzz",
    species: "Donkey",
    tier: "Damns", 
    tagline: "Ain't got one damn left in the bottle.",
    appearance: {
      features: "cross-eyed, swaying stance, permanent five o'clock shadow",
      signature_items: ["beer bottle collection", "stained tank top", "flip-flops"],
      setting: "dive bars, liquor stores, park benches, AA meetings"
    },
    personality: {
      primary: ["friendly drunk", "clumsy", "oversharing", "optimistically delusional"],
      dark_traits: ["alcoholic", "gambling addiction", "multiple DUIs", "serial disappointment"],
      speech_pattern: "slurred, rambling, inappropriate oversharing",
      fears: ["sobriety", "his ex-wife", "the IRS", "running out of booze"],
      vices: ["alcohol", "sports betting", "karaoke", "giving unsolicited advice"]
    },
    backstory_elements: {
      origin: "former blue-collar worker who drowned his problems in booze",
      current_situation: "cycling between rock bottom and slightly above rock bottom",
      relationships: "burned every bridge, occasional drinking buddies",
      goals: "next drink, winning the lottery, getting his life together (tomorrow)"
    }
  },

  rizzo: {
    name: "Rizzo",
    species: "Rat",
    tier: "Ultimate Despair",
    tagline: "What happens when you run out of everything.",
    appearance: {
      features: "gaunt, greenish tint, X's for eyes, skull-and-crossbones bandana",
      signature_items: ["poison bottle", "death certificate collection", "tiny coffin"],
      setting: "sewers, morgues, abandoned hospitals, graveyards"
    },
    personality: {
      primary: ["morbidly humorous", "unlucky", "sarcastic", "fatalistic"],
      dark_traits: ["chronic illness", "suicidal ideation", "dark past", "cursed existence"],
      speech_pattern: "weak groans, dark humor, death puns, philosophical about suffering",
      fears: ["getting better", "hope", "false promises", "outliving his usefulness"],
      vices: ["self-medication", "dark humor as coping", "collecting obituaries", "scaring children"]
    },
    backstory_elements: {
      origin: "lab rat who escaped medical experiments, forever changed",
      current_situation: "living on borrowed time, haunting the margins of society",
      relationships: "acquaintance with death, occasional sympathy from outcasts",
      goals: "finding peace, getting revenge on his creators, warning others"
    }
  }
};

// Recurring NPCs and villains for consistent storytelling
export const RECURRING_CHARACTERS = {
  // Villains
  villains: {
    dr_needham: {
      name: "Dr. Cornelius Needham",
      role: "Mad Scientist",
      description: "Rizzo's former tormentor, still conducting illegal experiments",
      motivation: "Creating the perfect test subject",
      signature: "Always wears bloodstained lab coat, speaks in medical jargon"
    },
    landlord_jenkins: {
      name: "Slumlord Jenkins", 
      role: "Predatory Landlord",
      description: "Owns half the dive apartments in town, harasses tenants",
      motivation: "Maximum profit, minimum maintenance",
      signature: "Cheap suits, gold teeth, always has eviction notices"
    },
    officer_kowalski: {
      name: "Officer Stan Kowalski",
      role: "Corrupt Cop",
      description: "Takes bribes, plants evidence, has it in for street animals",
      motivation: "Power and easy money",
      signature: "Donut crumbs on uniform, suspicious arrest records"
    },
    mama_rosetti: {
      name: "Mama Rosetti",
      role: "Mob Boss",
      description: "Runs underground gambling, loan sharking, protection rackets",
      motivation: "Controlling the neighborhood's vices",
      signature: "Always cooking, never stops talking about 'family business'"
    }
  },

  // Supporting NPCs
  npcs: {
    bartender_sal: {
      name: "Sal the Bartender",
      role: "Confidant",
      description: "Seen it all, heard it all, judges nobody",
      personality: "Wise, patient, occasionally gives cryptic advice"
    },
    dealer_mickey: {
      name: "Mickey the Dealer",
      role: "Substance Provider",
      description: "Sells everything from cigarettes to harder stuff",
      personality: "Paranoid, twitchy, surprisingly loyal to regular customers"
    },
    social_worker_karen: {
      name: "Karen the Social Worker",
      role: "Unwanted Help",
      description: "Genuinely tries to help but completely out of touch",
      personality: "Naive, persistent, accidentally condescending"
    },
    psychic_madame_zelda: {
      name: "Madame Zelda",
      role: "Fortune Teller",
      description: "May or may not be actually psychic, definitely dramatic",
      personality: "Mysterious, theatrical, surprisingly accurate predictions"
    },
    pawn_shop_eddie: {
      name: "Eddie the Pawn Shop Owner",
      role: "Fence/Information Broker",
      description: "Buys and sells anything, knows everyone's business",
      personality: "Shrewd, gossipy, surprisingly sentimental about some items"
    }
  }
};

// Story themes and elements for dark humor episodes
export const STORY_ELEMENTS = {
  themes: [
    "Rock bottom isn't the bottom",
    "Good intentions, terrible execution", 
    "The system is rigged",
    "False hope is the cruelest hope",
    "Everyone's got their vice",
    "Misery loves company",
    "Quick fixes make bigger problems",
    "The past always catches up",
    "Some bridges are meant to be burned",
    "Dignity is a luxury"
  ],
  
  locations: [
    "Sal's Dive Bar",
    "The Roach Motel",
    "Unemployment Office",
    "24-Hour Laundromat", 
    "Pawn Shop Paradise",
    "Dr. Needham's Underground Lab",
    "The Broken Dreams Apartment Complex",
    "Lucky's Liquor Store",
    "The Alley Behind Everything",
    "Municipal Court",
    "Madame Zelda's Fortune Telling Parlor",
    "The Plasma Donation Center"
  ],

  plot_devices: [
    "Get-rich-quick scheme goes wrong",
    "Past mistakes come back to haunt",
    "Misunderstanding escalates absurdly", 
    "Authority figure abuses power",
    "Vice leads to bigger problems",
    "Good deed punished",
    "Bad luck compounds exponentially",
    "Secret revealed at worst time",
    "Temptation proves irresistible",
    "Rock bottom has a basement"
  ]
};
