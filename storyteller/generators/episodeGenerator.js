import { MASCOTS, RECURRING_CHARACTERS, STORY_ELEMENTS } from '../data/mascots.js';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class EpisodeGenerator {
  constructor() {
    this.outputDir = './generated/episodes';
    this.comicsDir = './generated/comics';
    fs.ensureDirSync(this.outputDir);
    fs.ensureDirSync(this.comicsDir);
    
    // Track character relationships and ongoing storylines
    this.continuity = {
      character_states: {},
      relationship_dynamics: {},
      ongoing_plots: [],
      location_history: {}
    };
  }

  // Generate a complete episode with multiple scenes
  generateEpisode(options = {}) {
    const {
      primaryMascot = this.selectRandomMascot(),
      theme = this.selectRandomTheme(),
      episodeType = this.selectEpisodeType(),
      includeVillain = Math.random() > 0.6
    } = options;

    const episode = {
      id: uuidv4(),
      title: this.generateEpisodeTitle(primaryMascot, theme, episodeType),
      timestamp: new Date().toISOString(),
      primary_mascot: primaryMascot,
      theme: theme,
      type: episodeType,
      characters: this.selectEpisodeCharacters(primaryMascot, includeVillain),
      setting: this.selectPrimaryLocation(),
      plot_outline: this.generatePlotOutline(primaryMascot, theme, episodeType),
      scenes: [],
      moral: this.generateMoral(theme),
      image_prompts: [],
      comic_panels: []
    };

    // Generate 3-5 scenes per episode
    const sceneCount = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < sceneCount; i++) {
      const scene = this.generateScene(episode, i, sceneCount);
      episode.scenes.push(scene);
      episode.image_prompts.push(...scene.image_prompts);
      episode.comic_panels.push(...scene.comic_panels);
    }

    return episode;
  }

  selectRandomMascot() {
    const mascots = Object.keys(MASCOTS);
    return mascots[Math.floor(Math.random() * mascots.length)];
  }

  selectRandomTheme() {
    return STORY_ELEMENTS.themes[Math.floor(Math.random() * STORY_ELEMENTS.themes.length)];
  }

  selectEpisodeType() {
    const types = [
      'slice_of_life', 'caper', 'relationship_drama', 'workplace_comedy',
      'mystery', 'revenge_plot', 'intervention', 'heist', 'court_appearance',
      'family_reunion', 'medical_emergency', 'financial_crisis'
    ];
    return types[Math.floor(Math.random() * types.length)];
  }

  selectEpisodeCharacters(primaryMascot, includeVillain) {
    const characters = [primaryMascot];
    
    // Add 1-2 other mascots
    const otherMascots = Object.keys(MASCOTS).filter(m => m !== primaryMascot);
    const mascotCount = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < mascotCount && i < otherMascots.length; i++) {
      const randomIndex = Math.floor(Math.random() * otherMascots.length);
      characters.push(otherMascots.splice(randomIndex, 1)[0]);
    }
    
    // Add NPCs
    const npcKeys = Object.keys(RECURRING_CHARACTERS.npcs);
    const npcCount = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < npcCount; i++) {
      const randomNPC = npcKeys[Math.floor(Math.random() * npcKeys.length)];
      characters.push(`npc_${randomNPC}`);
    }
    
    // Maybe add a villain
    if (includeVillain) {
      const villainKeys = Object.keys(RECURRING_CHARACTERS.villains);
      const randomVillain = villainKeys[Math.floor(Math.random() * villainKeys.length)];
      characters.push(`villain_${randomVillain}`);
    }
    
    return characters;
  }

  selectPrimaryLocation() {
    return STORY_ELEMENTS.locations[Math.floor(Math.random() * STORY_ELEMENTS.locations.length)];
  }

  generateEpisodeTitle(primaryMascot, theme, episodeType) {
    const mascotName = MASCOTS[primaryMascot].name;
    
    const titleTemplates = {
      slice_of_life: [
        `${mascotName}'s Tuesday from Hell`,
        `Another Day, Another Disappointment`,
        `${mascotName} and the Art of Not Trying`,
        `Tuesday Blues and Overdue Bills`
      ],
      caper: [
        `${mascotName}'s Get Rich Quick Scheme`,
        `The Great [Location] Heist`,
        `How to Steal Everything and Gain Nothing`,
        `${mascotName}'s Criminal Mastermind Moment`
      ],
      relationship_drama: [
        `${mascotName} Meets Their Match`,
        `Love is a Battlefield (And Everyone's Losing)`,
        `${mascotName}'s Romantic Catastrophe`,
        `When Hearts Break and Wallets Empty`
      ],
      workplace_comedy: [
        `${mascotName} Gets a Job (Sort Of)`,
        `Employee of the Month (By Default)`,
        `${mascotName}'s Professional Development`,
        `Work-Life Balance for the Unemployable`
      ],
      mystery: [
        `The Case of the Missing [Item]`,
        `${mascotName}, Detective (Unwillingly)`,
        `Who Stole ${mascotName}'s Last Shred of Dignity?`,
        `Mystery at the [Location]`
      ],
      revenge_plot: [
        `${mascotName}'s Revenge (Goes Wrong)`,
        `Payback's a Bitch (And So Is Karma)`,
        `${mascotName} Settles Old Scores`,
        `Revenge Served Cold and Disappointing`
      ]
    };

    const templates = titleTemplates[episodeType] || titleTemplates.slice_of_life;
    let title = templates[Math.floor(Math.random() * templates.length)];
    
    // Replace placeholders
    title = title.replace('[Location]', this.selectPrimaryLocation());
    title = title.replace('[Item]', this.selectRandomItem());
    
    return title;
  }

  selectRandomItem() {
    const items = [
      'Last Beer', 'Dignity', 'Rent Money', 'Self-Respect', 'Lucky Cigarette',
      'Welfare Check', 'Expired Medicine', 'Phone Charger', 'Pizza Coupons',
      'Fake ID', 'Pet Rock', 'Stolen Wallet', 'Last Clean Shirt'
    ];
    return items[Math.floor(Math.random() * items.length)];
  }

  generatePlotOutline(primaryMascot, theme, episodeType) {
    const mascot = MASCOTS[primaryMascot];
    const plotDevice = STORY_ELEMENTS.plot_devices[Math.floor(Math.random() * STORY_ELEMENTS.plot_devices.length)];
    
    const outlines = {
      slice_of_life: `${mascot.name} faces a typical day that goes from bad to worse when ${plotDevice.toLowerCase()}. What starts as a simple attempt to ${this.generateSimpleTask()} becomes a meditation on ${theme.toLowerCase()} as ${mascot.name} encounters the usual cast of neighborhood characters and discovers that even small victories come with a price.`,
      
      caper: `When ${mascot.name} overhears about an opportunity to solve their financial problems, they convince other mascots to join a poorly planned scheme involving ${this.generateCrimeTarget()}. However, ${plotDevice.toLowerCase()}, leading to a series of increasingly desperate decisions that prove ${theme.toLowerCase()}.`,
      
      relationship_drama: `${mascot.name}'s carefully constructed solitude is disrupted when they're forced to interact with ${this.generateRelationshipCatalyst()}. As ${plotDevice.toLowerCase()}, both characters must confront their issues with trust, intimacy, and the fact that ${theme.toLowerCase()}.`,
      
      mystery: `When ${this.generateMysteriousEvent()} occurs at ${this.selectPrimaryLocation()}, ${mascot.name} reluctantly becomes involved in figuring out what happened. The investigation reveals uncomfortable truths about the neighborhood's residents and demonstrates that ${theme.toLowerCase()}.`
    };

    return outlines[episodeType] || outlines.slice_of_life;
  }

  generateSimpleTask() {
    const tasks = [
      'pay overdue rent', 'buy cigarettes', 'avoid eviction', 'find food',
      'get their prescription filled', 'return library books', 'cash a check',
      'avoid their ex', 'pick up welfare check', 'find clean clothes'
    ];
    return tasks[Math.floor(Math.random() * tasks.length)];
  }

  generateCrimeTarget() {
    const targets = [
      'the pawn shop\'s till', 'expired lottery tickets', 'free samples at the grocery store',
      'the plasma donation center\'s computer system', 'unpaid parking meters',
      'the welfare office\'s filing cabinet', 'their landlord\'s mailbox'
    ];
    return targets[Math.floor(Math.random() * targets.length)];
  }

  generateRelationshipCatalyst() {
    const catalysts = [
      'a former friend who\'s gotten their life together', 'a social worker with good intentions',
      'another mascot having a breakdown', 'someone from their past who recognizes them',
      'a new neighbor who hasn\'t learned to avoid them yet', 'their parole officer'
    ];
    return catalysts[Math.floor(Math.random() * catalysts.length)];
  }

  generateMysteriousEvent() {
    const events = [
      'someone\'s welfare check goes missing', 'the local dealer disappears',
      'expensive items start appearing in the dumpster', 'the power gets cut to half the building',
      'anonymous cash donations appear under everyone\'s door', 'the building\'s WiFi password changes daily'
    ];
    return events[Math.floor(Math.random() * events.length)];
  }

  generateScene(episode, sceneIndex, totalScenes) {
    const isOpening = sceneIndex === 0;
    const isClosing = sceneIndex === totalScenes - 1;
    const isTurningPoint = sceneIndex === Math.floor(totalScenes / 2);

    const scene = {
      scene_number: sceneIndex + 1,
      title: this.generateSceneTitle(episode, sceneIndex, isOpening, isClosing, isTurningPoint),
      location: this.selectSceneLocation(episode, sceneIndex),
      characters_present: this.selectSceneCharacters(episode, sceneIndex),
      time_of_day: this.selectTimeOfDay(),
      mood: this.selectSceneMood(episode, sceneIndex),
      action: this.generateSceneAction(episode, sceneIndex, isOpening, isClosing, isTurningPoint),
      dialogue: this.generateSceneDialogue(episode, sceneIndex),
      visual_details: this.generateVisualDetails(episode, sceneIndex),
      image_prompts: [],
      comic_panels: []
    };

    // Generate image prompts for this scene
    scene.image_prompts = this.generateSceneImagePrompts(scene, episode);
    scene.comic_panels = this.generateComicPanels(scene, episode);

    return scene;
  }

  generateSceneTitle(episode, sceneIndex, isOpening, isClosing, isTurningPoint) {
    if (isOpening) return "Rock Bottom Has a Basement";
    if (isClosing) return "Same Shit, Different Day";
    if (isTurningPoint) return "When Bad Gets Worse";
    
    const titles = [
      "The Plot Thickens (Like Curdled Milk)",
      "Meanwhile, In Hell...",
      "Things Get Complicated",
      "Enter the Complications",
      "The Situation Deteriorates",
      "Reality Checks In"
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
  }

  selectSceneLocation(episode, sceneIndex) {
    // First scene usually at primary location, others can vary
    if (sceneIndex === 0) return episode.setting;
    
    const locations = STORY_ELEMENTS.locations.filter(loc => loc !== episode.setting);
    return locations[Math.floor(Math.random() * locations.length)];
  }

  selectSceneCharacters(episode, sceneIndex) {
    // Always include primary mascot
    const characters = [episode.primary_mascot];
    
    // Add 1-3 other characters from episode cast
    const otherCharacters = episode.characters.filter(c => c !== episode.primary_mascot);
    const characterCount = 1 + Math.floor(Math.random() * Math.min(3, otherCharacters.length));
    
    for (let i = 0; i < characterCount; i++) {
      const randomChar = otherCharacters[Math.floor(Math.random() * otherCharacters.length)];
      if (!characters.includes(randomChar)) {
        characters.push(randomChar);
      }
    }
    
    return characters;
  }

  selectTimeOfDay() {
    const times = [
      'early morning', 'late morning', 'noon', 'afternoon', 
      'evening', 'late night', '3 AM (why is it always 3 AM?)'
    ];
    return times[Math.floor(Math.random() * times.length)];
  }

  selectSceneMood() {
    const moods = [
      'desperately optimistic', 'resigned cynicism', 'barely contained rage',
      'pharmaceutical numbness', 'gallows humor', 'existential dread',
      'spite-fueled determination', 'chemical courage', 'dark comedy'
    ];
    return moods[Math.floor(Math.random() * moods.length)];
  }

  generateSceneAction(episode, sceneIndex, isOpening, isClosing, isTurningPoint) {
    const primaryMascot = MASCOTS[episode.primary_mascot];
    
    if (isOpening) {
      return `${primaryMascot.name} begins their day with the usual routine of avoiding responsibility and managing expectations. The catalyst for today's adventure presents itself in the form of ${this.generateCatalyst()}. Despite every instinct screaming "don't get involved," circumstances and poor judgment combine to draw ${primaryMascot.name} into the situation.`;
    }
    
    if (isTurningPoint) {
      return `The situation escalates when ${this.generateComplication()}. What seemed like a manageable problem reveals itself to be connected to larger issues involving ${this.generateConnectedProblem()}. ${primaryMascot.name} realizes they're in deeper than anticipated and that their usual strategy of "ignore it and hope it goes away" won't work this time.`;
    }
    
    if (isClosing) {
      return `The episode concludes with ${primaryMascot.name} having learned nothing from their experience but somehow finding themselves in a slightly different variation of the same situation they started in. Victory is redefined as "not making things significantly worse," and the audience is reminded that some problems don't get solved—they just get replaced with new problems.`;
    }
    
    // Middle scenes
    const actions = [
      `${primaryMascot.name} attempts to apply their unique problem-solving skills to the situation, which predictably makes everything more complicated.`,
      `A conversation with ${this.generateRandomCharacter(episode)} reveals new information that changes ${primaryMascot.name}'s understanding of the situation.`,
      `${primaryMascot.name}'s past comes back to haunt them when ${this.generatePastConnection()} becomes relevant to current events.`,
      `An attempt to take the easy way out backfires spectacularly, forcing ${primaryMascot.name} to confront the consequences of their choices.`
    ];
    
    return actions[Math.floor(Math.random() * actions.length)];
  }

  generateCatalyst() {
    const catalysts = [
      'an overdue bill', 'a knock at the door', 'a phone call they can\'t ignore',
      'running out of their vice of choice', 'an unexpected encounter with someone from their past',
      'a minor emergency that requires leaving their comfort zone'
    ];
    return catalysts[Math.floor(Math.random() * catalysts.length)];
  }

  generateComplication() {
    const complications = [
      'their simple plan attracts unwanted attention', 'someone they trusted betrays them',
      'law enforcement becomes involved', 'their addiction/vice creates a new problem',
      'a misunderstanding escalates out of control', 'their reputation precedes them'
    ];
    return complications[Math.floor(Math.random() * complications.length)];
  }

  generateConnectedProblem() {
    const problems = [
      'organized crime', 'government bureaucracy', 'family dysfunction',
      'medical malpractice', 'corporate greed', 'systemic inequality',
      'their own psychological damage', 'neighborhood politics'
    ];
    return problems[Math.floor(Math.random() * problems.length)];
  }

  generateRandomCharacter(episode) {
    const characters = episode.characters.filter(c => c !== episode.primary_mascot);
    return this.getCharacterName(characters[Math.floor(Math.random() * characters.length)]);
  }

  getCharacterName(characterKey) {
    if (characterKey.startsWith('npc_')) {
      const npcKey = characterKey.replace('npc_', '');
      return RECURRING_CHARACTERS.npcs[npcKey]?.name || 'Unknown NPC';
    }
    if (characterKey.startsWith('villain_')) {
      const villainKey = characterKey.replace('villain_', '');
      return RECURRING_CHARACTERS.villains[villainKey]?.name || 'Unknown Villain';
    }
    return MASCOTS[characterKey]?.name || 'Unknown Character';
  }

  generatePastConnection() {
    const connections = [
      'an old debt', 'a former relationship', 'a previous crime',
      'a family obligation', 'a professional grudge', 'a shared trauma',
      'an unpaid favor', 'a forgotten promise'
    ];
    return connections[Math.floor(Math.random() * connections.length)];
  }

  generateSceneDialogue(episode, sceneIndex) {
    const primaryMascot = MASCOTS[episode.primary_mascot];
    
    // Generate 3-5 dialogue exchanges
    const dialogues = [];
    const exchangeCount = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < exchangeCount; i++) {
      const speaker = this.selectDialogueSpeaker(episode, sceneIndex);
      const line = this.generateDialogueLine(speaker, episode, i, exchangeCount);
      dialogues.push({
        speaker: this.getCharacterName(speaker),
        line: line,
        tone: this.getCharacterTone(speaker),
        subtext: this.generateSubtext(speaker, line)
      });
    }
    
    return dialogues;
  }

  selectDialogueSpeaker(episode, sceneIndex) {
    // Vary speakers throughout the scene
    const sceneCharacters = this.selectSceneCharacters(episode, sceneIndex);
    return sceneCharacters[Math.floor(Math.random() * sceneCharacters.length)];
  }

  generateDialogueLine(speaker, episode, lineIndex, totalLines) {
    const character = this.getCharacterData(speaker);
    
    if (!character) return "...";
    
    const isOpening = lineIndex === 0;
    const isClosing = lineIndex === totalLines - 1;
    
    if (isOpening) {
      return this.generateOpeningLine(character, episode);
    }
    
    if (isClosing) {
      return this.generateClosingLine(character, episode);
    }
    
    return this.generateMiddleLine(character, episode);
  }

  getCharacterData(characterKey) {
    if (characterKey.startsWith('npc_')) {
      const npcKey = characterKey.replace('npc_', '');
      return RECURRING_CHARACTERS.npcs[npcKey];
    }
    if (characterKey.startsWith('villain_')) {
      const villainKey = characterKey.replace('villain_', '');
      return RECURRING_CHARACTERS.villains[villainKey];
    }
    return MASCOTS[characterKey];
  }

  generateOpeningLine(character, episode) {
    const openingLines = {
      dumbo: [
        "Look, I didn't ask for this shit to happen...",
        "Can we just pretend this is someone else's problem?",
        "I was having a perfectly mediocre day until...",
        "This better not require me to put on pants."
      ],
      scrapz: [
        "Let me guess, you need someone else to clean up your mess.",
        "I don't do charity work, and I don't do favors.",
        "This has 'bad idea' written all over it.",
        "What's in it for me? And don't say 'satisfaction.'"
      ],
      patty: [
        "Honey, I've seen enough drama for one lifetime.",
        "Please tell me this doesn't involve my professional life.",
        "I'm too pretty for whatever you're about to suggest.",
        "Let me stop you right there before you ruin my day."
      ],
      buzz: [
        "Hold on, let me get another drink before you continue.",
        "Is this gonna be one of those conversations I regret?",
        "I'm too drunk for this, but not drunk enough.",
        "Why do all my problems start with someone saying my name?"
      ],
      rizzo: [
        "Death would be preferable to whatever you're about to ask.",
        "I've survived worse than whatever's coming.",
        "Let me guess, someone needs the expert on suffering.",
        "This is either very bad news or very bad news disguised as good news."
      ]
    };

    const characterLines = openingLines[character.name?.toLowerCase()] || [
      "Well, this should be interesting.",
      "I have a bad feeling about this.",
      "Why do I always get involved in these situations?"
    ];

    return characterLines[Math.floor(Math.random() * characterLines.length)];
  }

  generateClosingLine(character, episode) {
    const closingLines = {
      dumbo: [
        "Next time, I'm staying on the couch.",
        "I need a pizza and a nap, in that order.",
        "Why do I let myself get talked into these things?",
        "Tomorrow I'm not answering the door."
      ],
      scrapz: [
        "I told you this was a bad idea.",
        "Next time, count me out.",
        "I need a cigarette and some alone time.",
        "This is why I work alone."
      ],
      patty: [
        "Well, that was a complete disaster.",
        "I need a drink and a long bath.",
        "Next time, I'm charging consultation fees.",
        "This is going straight into my therapy sessions."
      ],
      buzz: [
        "I'm gonna need something stronger than beer.",
        "Why does everything end with me drinking alone?",
        "At least the bar's still open.",
        "This calls for a celebration... or drowning my sorrows."
      ],
      rizzo: [
        "Well, that was predictably awful.",
        "At least nobody died... this time.",
        "I should have stayed in the sewer.",
        "Some stories don't have happy endings, just honest ones."
      ]
    };

    const characterLines = closingLines[character.name?.toLowerCase()] || [
      "That went about as well as expected.",
      "Some lessons are learned the hard way.",
      "At least it's over."
    ];

    return characterLines[Math.floor(Math.random() * characterLines.length)];
  }

  generateMiddleLine(character, episode) {
    // Generate contextual dialogue based on character personality and episode theme
    const themes = {
      trust: ["Trust is for people who haven't been burned yet.", "I learned not to trust anyone the hard way."],
      money: ["Money doesn't solve problems, it just changes them.", "I'd sell my soul for rent money, but nobody's buying."],
      family: ["Family's just people who disappoint you from birth.", "Blood is thicker than water, but both can drown you."],
      authority: ["The system's rigged against people like us.", "Authority figures are just bullies with badges."]
    };

    // Default middle lines per character
    const defaultLines = {
      dumbo: [
        "This is getting complicated, and I don't do complicated.",
        "Can we solve this with minimal effort on my part?",
        "I'm starting to regret leaving the house."
      ],
      scrapz: [
        "I've seen this shit before, it doesn't end well.",
        "Everyone's got an angle, what's yours?",
        "Trust me, it gets worse from here."
      ]
    };

    const characterName = character.name?.toLowerCase();
    const characterLines = defaultLines[characterName] || [
      "This is not what I signed up for.",
      "Things just keep getting worse.",
      "Why does this always happen?"
    ];

    return characterLines[Math.floor(Math.random() * characterLines.length)];
  }

  getCharacterTone(characterKey) {
    const tones = {
      dumbo: "defeated resignation with occasional flashes of frustrated energy",
      scrapz: "sharp cynicism barely masking deeper hurt",  
      patty: "theatrical drama covering genuine vulnerability",
      buzz: "slurred optimism fighting against bitter reality",
      rizzo: "dark humor as a defense mechanism against trauma"
    };

    return tones[characterKey] || "weary sarcasm";
  }

  generateSubtext(characterKey, line) {
    // What the character really means beneath what they're saying
    const subtexts = [
      "desperately wants to be proven wrong about people",
      "terrified of being vulnerable again",
      "secretly hoping someone will save them",
      "protecting themselves from further disappointment",
      "testing whether this person can be trusted",
      "revealing more about their pain than intended"
    ];

    return subtexts[Math.floor(Math.random() * subtexts.length)];
  }

  generateVisualDetails(episode, sceneIndex) {
    const location = this.selectSceneLocation(episode, sceneIndex);
    const timeOfDay = this.selectTimeOfDay();
    
    return {
      setting_description: this.generateSettingDescription(location, timeOfDay),
      character_appearances: this.generateCharacterAppearances(episode, sceneIndex),
      environmental_details: this.generateEnvironmentalDetails(location),
      mood_lighting: this.generateMoodLighting(timeOfDay, episode.theme),
      props_and_objects: this.generateProps(episode, sceneIndex)
    };
  }

  generateSettingDescription(location, timeOfDay) {
    const descriptions = {
      "Sal's Dive Bar": {
        general: "A dimly lit establishment where hope goes to die and problems get temporarily drowned",
        early_morning: "Empty stools still warm from last night's regulars, fluorescent lights humming over spilled dreams",
        evening: "The usual crowd gathering like moths to a flame, or flies to shit"
      },
      "The Roach Motel": {
        general: "Where dignity comes to die and rent checks bounce higher than expectations",
        late_night: "Thin walls broadcasting everyone's failures in surround sound",
        afternoon: "Sunlight revealing every stain, scratch, and broken promise"
      }
    };

    const locationData = descriptions[location] || {
      general: "A place where life happens to people who've stopped trying to control it"
    };

    return locationData[timeOfDay] || locationData.general;
  }

  generateCharacterAppearances(episode, sceneIndex) {
    const appearances = {};
    const sceneCharacters = this.selectSceneCharacters(episode, sceneIndex);
    
    sceneCharacters.forEach(characterKey => {
      const character = this.getCharacterData(characterKey);
      if (character) {
        appearances[this.getCharacterName(characterKey)] = this.generateCharacterAppearance(character);
      }
    });
    
    return appearances;
  }

  generateCharacterAppearance(character) {
    if (character.appearance) {
      return `${character.appearance.features || character.appearance.eyes}, ${character.appearance.signature_items?.join(', ') || 'typical attire'}, showing signs of ${this.generateWearCondition()}`;
    }
    
    return "Tired, worn down, but still clinging to whatever dignity remains";
  }

  generateWearCondition() {
    const conditions = [
      "recent poor decisions", "chronic exhaustion", "chemical enhancement",
      "financial stress", "emotional damage", "physical deterioration",
      "psychological wear", "spiritual emptiness"
    ];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  generateEnvironmentalDetails(location) {
    const details = {
      "Sal's Dive Bar": "Sticky floors, broken dreams, and the ghost of better times",
      "The Roach Motel": "Peeling paint, broken promises, and the smell of desperation",
      "Unemployment Office": "Fluorescent judgment, bureaucratic indifference, and crushed hope",
      "24-Hour Laundromat": "Spinning cycles of futility, industrial detergent, and late-night confessions"
    };
    
    return details[location] || "The accumulated weight of poor life choices made manifest";
  }

  generateMoodLighting(timeOfDay, theme) {
    const lighting = {
      "early morning": "Harsh fluorescent reality cutting through last night's delusions",
      "late night": "Neon desperation casting rainbow shadows on concrete dreams",
      "afternoon": "Unforgiving daylight exposing every flaw and failure",
      "evening": "Golden hour irony - beauty highlighting ugliness"
    };
    
    return lighting[timeOfDay] || "The kind of lighting that makes everyone look like they've made poor life choices";
  }

  generateProps(episode, sceneIndex) {
    const props = [
      "crumpled bills", "empty bottles", "overdue notices", "worn photographs",
      "expired coupons", "lucky charms that aren't working", "broken promises",
      "cellular phones with cracked screens", "lottery tickets", "prescription bottles"
    ];
    
    const selectedProps = [];
    const propCount = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < propCount; i++) {
      const randomProp = props[Math.floor(Math.random() * props.length)];
      if (!selectedProps.includes(randomProp)) {
        selectedProps.push(randomProp);
      }
    }
    
    return selectedProps;
  }

  generateSceneImagePrompts(scene, episode) {
    const prompts = [];
    
    // Wide establishing shot
    prompts.push({
      type: "establishing_shot",
      prompt: `Wide establishing shot of ${scene.location} during ${scene.time_of_day}, ${scene.visual_details.setting_description}, cinematic composition, dark humor aesthetic, urban decay, neon lighting accents, professional digital art style`
    });
    
    // Character interaction shot
    if (scene.characters_present.length > 1) {
      prompts.push({
        type: "character_interaction",
        prompt: `${scene.characters_present.map(c => this.getCharacterName(c)).join(' and ')} in ${scene.location}, showing their relationship dynamics, detailed character expressions, ${scene.mood} atmosphere, realistic style with dark comedy undertones`
      });
    }
    
    // Close-up emotional beat
    prompts.push({
      type: "emotional_closeup", 
      prompt: `Close-up shot of ${this.getCharacterName(episode.primary_mascot)} showing ${scene.mood}, detailed facial expression, dramatic lighting, capturing the emotional weight of ${episode.theme}, photorealistic digital art`
    });
    
    return prompts;
  }

  generateComicPanels(scene, episode) {
    const panels = [];
    const panelCount = 3 + Math.floor(Math.random() * 2); // 3-4 panels per scene
    
    for (let i = 0; i < panelCount; i++) {
      panels.push({
        panel_number: i + 1,
        description: this.generatePanelDescription(scene, episode, i, panelCount),
        dialogue: this.selectPanelDialogue(scene, i),
        visual_style: "detailed comic book art with dark humor elements",
        composition: this.generatePanelComposition(i, panelCount),
        image_prompt: this.generatePanelImagePrompt(scene, episode, i)
      });
    }
    
    return panels;
  }

  generatePanelDescription(scene, episode, panelIndex, totalPanels) {
    const isFirst = panelIndex === 0;
    const isLast = panelIndex === totalPanels - 1;
    
    if (isFirst) {
      return `Opening panel showing ${this.getCharacterName(episode.primary_mascot)} in ${scene.location}, establishing the scene's mood and setting`;
    }
    
    if (isLast) {
      return `Closing panel capturing the resolution or cliffhanger, showing the emotional aftermath of the scene's events`;
    }
    
    return `Action panel showing character interaction and plot development, focusing on ${scene.action.substring(0, 100)}...`;
  }

  selectPanelDialogue(scene, panelIndex) {
    if (scene.dialogue && scene.dialogue[panelIndex]) {
      return scene.dialogue[panelIndex];
    }
    
    return {
      speaker: "Narrator",
      line: "...",
      tone: "omniscient cynicism"
    };
  }

  generatePanelComposition(panelIndex, totalPanels) {
    const compositions = [
      "wide establishing shot",
      "medium shot focusing on characters", 
      "close-up for emotional impact",
      "dramatic angle emphasizing conflict"
    ];
    
    return compositions[panelIndex % compositions.length];
  }

  generatePanelImagePrompt(scene, episode, panelIndex) {
    return `Comic book panel ${panelIndex + 1}: ${scene.visual_details.setting_description}, ${this.getCharacterName(episode.primary_mascot)} and other characters, ${scene.mood} atmosphere, detailed comic art style, dark humor aesthetic, professional illustration`;
  }

  generateMoral(theme) {
    const morals = {
      "Rock bottom isn't the bottom": "There's always another level of failure waiting to be discovered.",
      "Good intentions, terrible execution": "The road to hell is paved with good intentions and terrible planning.",
      "The system is rigged": "The house always wins, especially when you're not playing with a full deck.",
      "False hope is the cruelest hope": "Hope is the last thing to die, which makes it the most painful.",
      "Everyone's got their vice": "We all have something that helps us avoid dealing with reality.",
      "Some bridges are meant to be burned": "Sometimes destroying your past is the only way to move forward."
    };
    
    return morals[theme] || "Life's a bitch, and then you die. But first, you pay taxes.";
  }

  // Save episode to files
  async saveEpisode(episode) {
    const filename = `episode_${episode.id}_${Date.now()}.json`;
    const filepath = path.join(this.outputDir, filename);
    
    await fs.writeJson(filepath, episode, { spaces: 2 });
    
    // Create readable markdown version
    const markdownContent = this.formatEpisodeAsMarkdown(episode);
    const markdownPath = path.join(this.outputDir, `episode_${episode.id}_${Date.now()}.md`);
    await fs.writeFile(markdownPath, markdownContent);
    
    // Create comic script
    const comicScript = this.formatAsComicScript(episode);
    const comicPath = path.join(this.comicsDir, `comic_${episode.id}_${Date.now()}.md`);
    await fs.writeFile(comicPath, comicScript);
    
    return { 
      json: filepath, 
      markdown: markdownPath, 
      comic: comicPath 
    };
  }

  formatEpisodeAsMarkdown(episode) {
    let markdown = `# ${episode.title}

**Episode ID:** ${episode.id}  
**Generated:** ${new Date(episode.timestamp).toLocaleString()}  
**Primary Character:** ${MASCOTS[episode.primary_mascot].name}  
**Theme:** ${episode.theme}  
**Type:** ${episode.type}  

## Plot Outline
${episode.plot_outline}

## Characters
${episode.characters.map(c => `- ${this.getCharacterName(c)}`).join('\n')}

## Scenes
`;

    episode.scenes.forEach((scene, index) => {
      markdown += `
### Scene ${scene.scene_number}: ${scene.title}

**Location:** ${scene.location}  
**Time:** ${scene.time_of_day}  
**Mood:** ${scene.mood}  

**Action:**  
${scene.action}

**Visual Details:**  
- Setting: ${scene.visual_details.setting_description}
- Lighting: ${scene.visual_details.mood_lighting}
- Props: ${scene.visual_details.props_and_objects.join(', ')}

**Key Dialogue:**
${scene.dialogue.map(d => `- **${d.speaker}:** "${d.line}" *(${d.tone})*`).join('\n')}

`;
    });

    markdown += `
## Moral of the Story
${episode.moral}

## Image Generation Prompts
${episode.image_prompts.map((img, i) => `${i + 1}. **${img.type}:** ${img.prompt}`).join('\n')}

---
*Generated by iongiveafuq Storytelling Agent*
`;

    return markdown;
  }

  formatAsComicScript(episode) {
    let script = `# ${episode.title}
## Comic Script

**Characters:** ${episode.characters.map(c => this.getCharacterName(c)).join(', ')}
**Theme:** ${episode.theme}

`;

    episode.scenes.forEach((scene, sceneIndex) => {
      script += `
## Scene ${scene.scene_number}: ${scene.title}

`;
      
      scene.comic_panels.forEach((panel, panelIndex) => {
        script += `
### Panel ${panel.panel_number}

**Composition:** ${panel.composition}  
**Description:** ${panel.description}

**Dialogue:**  
${panel.dialogue.speaker}: "${panel.dialogue.line}"

**Art Direction:**  
${panel.image_prompt}

---
`;
      });
    });

    script += `
## Final Note
**Moral:** ${episode.moral}

*This comic script is designed for dark humor with authentic character voices and realistic urban decay aesthetics.*
`;

    return script;
  }

  // Generate multiple episodes
  async generateEpisodeSeries(count = 5) {
    const episodes = [];
    console.log(`Generating ${count} episodes...`);
    
    for (let i = 0; i < count; i++) {
      console.log(`Generating episode ${i + 1}/${count}...`);
      
      // Vary the primary mascot for each episode
      const mascots = Object.keys(MASCOTS);
      const primaryMascot = mascots[i % mascots.length];
      
      const episode = this.generateEpisode({ primaryMascot });
      const savedFiles = await this.saveEpisode(episode);
      
      episodes.push({
        episode,
        files: savedFiles
      });
    }
    
    console.log(`Generated ${count} episodes successfully!`);
    return episodes;
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new EpisodeGenerator();
  
  const args = process.argv.slice(2);
  const count = parseInt(args[0]) || 1;
  
  if (count === 1) {
    // Generate single episode
    const episode = generator.generateEpisode();
    generator.saveEpisode(episode)
      .then(result => {
        console.log(`Episode generated: ${episode.title}`);
        console.log(`Files: ${JSON.stringify(result, null, 2)}`);
      })
      .catch(console.error);
  } else {
    // Generate series
    generator.generateEpisodeSeries(count)
      .catch(console.error);
  }
}

export default EpisodeGenerator;
