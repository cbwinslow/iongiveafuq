import { MASCOTS, RECURRING_CHARACTERS, STORY_ELEMENTS } from '../data/mascots.js';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class ComicGenerator {
  constructor() {
    this.outputDir = './generated/comics';
    this.scriptsDir = './generated/comic-scripts';
    fs.ensureDirSync(this.outputDir);
    fs.ensureDirSync(this.scriptsDir);
    
    // Comic style and format configurations
    this.comicFormats = {
      'single_panel': { panels: 1, description: 'Single panel comic strip, like newspaper editorial cartoons' },
      'three_panel': { panels: 3, description: 'Classic three-panel format, setup-development-punchline' },
      'four_panel': { panels: 4, description: 'Four-panel comic strip, allows for more story development' },
      'six_panel': { panels: 6, description: 'Six-panel format for more complex storytelling' },
      'full_page': { panels: 8, description: 'Full page comic with multiple panels and layouts' }
    };
    
    this.visualStyles = [
      'gritty urban realism', 'noir comic book style', 'underground comix aesthetic',
      'detailed pen and ink', 'dark humor illustration', 'cyberpunk comic art',
      'street art inspired', 'graphic novel quality', 'indie comic style'
    ];
  }

  // Generate a standalone comic strip
  generateComic(options = {}) {
    const {
      format = this.selectRandomFormat(),
      primaryMascot = this.selectRandomMascot(),
      theme = this.selectRandomTheme(),
      comicType = this.selectComicType(),
      style = this.selectRandomStyle()
    } = options;

    const comic = {
      id: uuidv4(),
      title: this.generateComicTitle(primaryMascot, theme, comicType),
      timestamp: new Date().toISOString(),
      format: format,
      style: style,
      primary_mascot: primaryMascot,
      supporting_characters: this.selectSupportingCharacters(primaryMascot),
      theme: theme,
      type: comicType,
      setup: this.generateComicSetup(primaryMascot, theme, comicType),
      panels: [],
      punchline: this.generatePunchline(primaryMascot, theme),
      visual_notes: this.generateVisualNotes(style, format),
      image_prompts: []
    };

    // Generate panels based on format
    const panelCount = this.comicFormats[format].panels;
    for (let i = 0; i < panelCount; i++) {
      const panel = this.generatePanel(comic, i, panelCount);
      comic.panels.push(panel);
    }

    // Generate overall image prompts for the entire comic
    comic.image_prompts = this.generateComicImagePrompts(comic);

    return comic;
  }

  selectRandomFormat() {
    const formats = Object.keys(this.comicFormats);
    return formats[Math.floor(Math.random() * formats.length)];
  }

  selectRandomMascot() {
    const mascots = Object.keys(MASCOTS);
    return mascots[Math.floor(Math.random() * mascots.length)];
  }

  selectRandomTheme() {
    return STORY_ELEMENTS.themes[Math.floor(Math.random() * STORY_ELEMENTS.themes.length)];
  }

  selectComicType() {
    const types = [
      'daily_struggle', 'social_commentary', 'relationship_humor', 'workplace_satire',
      'existential_crisis', 'vice_addiction', 'authority_problems', 'financial_woes',
      'family_dysfunction', 'medical_humor', 'legal_troubles', 'dating_disasters'
    ];
    return types[Math.floor(Math.random() * types.length)];
  }

  selectRandomStyle() {
    return this.visualStyles[Math.floor(Math.random() * this.visualStyles.length)];
  }

  selectSupportingCharacters(primaryMascot) {
    const characters = [];
    
    // Maybe add another mascot (30% chance)
    if (Math.random() < 0.3) {
      const otherMascots = Object.keys(MASCOTS).filter(m => m !== primaryMascot);
      if (otherMascots.length > 0) {
        characters.push(otherMascots[Math.floor(Math.random() * otherMascots.length)]);
      }
    }
    
    // Maybe add an NPC (50% chance)
    if (Math.random() < 0.5) {
      const npcs = Object.keys(RECURRING_CHARACTERS.npcs);
      characters.push(`npc_${npcs[Math.floor(Math.random() * npcs.length)]}`);
    }
    
    // Maybe add a villain (20% chance)
    if (Math.random() < 0.2) {
      const villains = Object.keys(RECURRING_CHARACTERS.villains);
      characters.push(`villain_${villains[Math.floor(Math.random() * villains.length)]}`);
    }
    
    return characters;
  }

  generateComicTitle(primaryMascot, theme, comicType) {
    const mascot = MASCOTS[primaryMascot];
    
    const titleTemplates = {
      daily_struggle: [
        `${mascot.name}'s Daily Dose of Reality`,
        `Another Day in Paradise (Population: 1)`,
        `${mascot.name} vs. Basic Adulting`,
        `Life Lessons from Rock Bottom`
      ],
      social_commentary: [
        `${mascot.name} Explains Society`,
        `The Truth According to ${mascot.name}`,
        `${mascot.name}'s Social Studies`,
        `Why Everything's Broken (A ${mascot.name} Perspective)`
      ],
      relationship_humor: [
        `${mascot.name}'s Guide to Human Connection`,
        `Love is a Battlefield (And Everyone's Losing)`,
        `${mascot.name} and the Art of Disappointment`,
        `Relationship Status: It's Complicated (And Doomed)`
      ],
      existential_crisis: [
        `${mascot.name} Questions Everything`,
        `The Meaning of Life (Spoiler: There Isn't One)`,
        `${mascot.name}'s Existential Meltdown`,
        `Why We're All Just Pretending`
      ],
      vice_addiction: [
        `${mascot.name}'s Chemical Romance`,
        `Addiction and Other Hobbies`,
        `${mascot.name} and the Pursuit of Numbness`,
        `Self-Medication for Dummies`
      ]
    };

    const templates = titleTemplates[comicType] || titleTemplates.daily_struggle;
    return templates[Math.floor(Math.random() * templates.length)];
  }

  generateComicSetup(primaryMascot, theme, comicType) {
    const mascot = MASCOTS[primaryMascot];
    
    const setups = {
      daily_struggle: `${mascot.name} wakes up to face another day of ${this.generateDailyChallenge()}`,
      social_commentary: `${mascot.name} observes ${this.generateSocialPhenomenon()} and shares their unique perspective`,
      relationship_humor: `${mascot.name} encounters ${this.generateRelationshipSituation()} and responds predictably`,
      workplace_satire: `${mascot.name} deals with ${this.generateWorkplaceProblem()} using their special brand of problem-solving`,
      existential_crisis: `${mascot.name} contemplates ${this.generateExistentialQuestion()} while ${this.generateMundaneActivity()}`,
      vice_addiction: `${mascot.name}'s relationship with ${this.generateVice()} leads to ${this.generateConsequence()}`,
      authority_problems: `${mascot.name} has an encounter with ${this.generateAuthorityFigure()} that goes exactly as expected`,
      financial_woes: `${mascot.name} attempts to solve their money problems with ${this.generateFinancialScheme()}`,
      family_dysfunction: `${mascot.name} receives ${this.generateFamilyContact()} and reacts with characteristic grace`,
      medical_humor: `${mascot.name}'s attempt to address their health issues involves ${this.generateMedicalSituation()}`,
      legal_troubles: `${mascot.name} finds themselves explaining ${this.generateLegalSituation()} to confused authorities`,
      dating_disasters: `${mascot.name}'s romantic life takes another turn when ${this.generateDatingScenario()}`
    };

    return setups[comicType] || setups.daily_struggle;
  }

  generateDailyChallenge() {
    const challenges = [
      'bills they can\'t pay', 'responsibilities they can\'t avoid', 'people they can\'t tolerate',
      'problems they didn\'t create', 'expectations they can\'t meet', 'reality they can\'t escape'
    ];
    return challenges[Math.floor(Math.random() * challenges.length)];
  }

  generateSocialPhenomenon() {
    const phenomena = [
      'people pretending to have their lives together', 'social media happiness performances',
      'the gig economy\'s effect on human dignity', 'gentrification in their neighborhood',
      'corporate wellness initiatives', 'influencer culture', 'the housing crisis'
    ];
    return phenomena[Math.floor(Math.random() * phenomena.length)];
  }

  generateRelationshipSituation() {
    const situations = [
      'an ex who wants to "reconnect"', 'a dating app match with unrealistic expectations',
      'a well-meaning friend trying to set them up', 'their mother asking about grandchildren',
      'someone who thinks they can "fix" them', 'a romantic interest with their own baggage'
    ];
    return situations[Math.floor(Math.random() * situations.length)];
  }

  generateWorkplaceProblem() {
    const problems = [
      'mandatory team-building exercises', 'performance review season',
      'a new manager with "innovative ideas"', 'office politics and power struggles',
      'technology that doesn\'t work', 'corporate restructuring announcements'
    ];
    return problems[Math.floor(Math.random() * problems.length)];
  }

  generateExistentialQuestion() {
    const questions = [
      'the pointlessness of existence', 'whether free will is real',
      'the absurdity of human behavior', 'the meaning of suffering',
      'why people pretend to be happy', 'the inevitability of disappointment'
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  generateMundaneActivity() {
    const activities = [
      'doing laundry', 'waiting for the bus', 'grocery shopping',
      'paying bills', 'cleaning their living space', 'watching TV'
    ];
    return activities[Math.floor(Math.random() * activities.length)];
  }

  generateVice() {
    const vices = [
      'alcohol', 'cigarettes', 'junk food', 'social media',
      'gambling', 'shopping', 'prescription medication', 'toxic relationships'
    ];
    return vices[Math.floor(Math.random() * vices.length)];
  }

  generateConsequence() {
    const consequences = [
      'predictable problems', 'expensive mistakes', 'social embarrassment',
      'health complications', 'financial difficulties', 'relationship drama'
    ];
    return consequences[Math.floor(Math.random() * consequences.length)];
  }

  generateAuthorityFigure() {
    const figures = [
      'a police officer', 'their landlord', 'a government bureaucrat',
      'a medical professional', 'a judge', 'their parole officer'
    ];
    return figures[Math.floor(Math.random() * figures.length)];
  }

  generateFinancialScheme() {
    const schemes = [
      'a get-rich-quick opportunity', 'selling their possessions',
      'a cryptocurrency investment', 'borrowing from dangerous people',
      'a pyramid scheme pitch', 'freelance work they\'re unqualified for'
    ];
    return schemes[Math.floor(Math.random() * schemes.length)];
  }

  generateFamilyContact() {
    const contacts = [
      'a guilt-trip phone call from their mother', 'an invitation to a family gathering',
      'news about a relative\'s success', 'a request for money from a sibling',
      'holiday cards they haven\'t reciprocated', 'family drama they tried to avoid'
    ];
    return contacts[Math.floor(Math.random() * contacts.length)];
  }

  generateMedicalSituation() {
    const situations = [
      'avoiding the doctor despite obvious symptoms', 'reading WebMD and self-diagnosing',
      'dealing with insurance bureaucracy', 'prescription side effects',
      'waiting rooms and medical bills', 'alternative medicine experiments'
    ];
    return situations[Math.floor(Math.random() * situations.length)];
  }

  generateLegalSituation() {
    const situations = [
      'a minor traffic violation', 'a misunderstanding with law enforcement',
      'small claims court drama', 'probation requirements',
      'outstanding warrants for unpaid fines', 'jury duty they tried to avoid'
    ];
    return situations[Math.floor(Math.random() * situations.length)];
  }

  generateDatingScenario() {
    const scenarios = [
      'they match with someone way out of their league', 'their date discovers their living situation',
      'they run into their ex while on a date', 'their date wants to split everything 50/50',
      'they can\'t afford the restaurant they suggested', 'their date starts therapy-talking them'
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }

  generatePanel(comic, panelIndex, totalPanels) {
    const isFirst = panelIndex === 0;
    const isLast = panelIndex === totalPanels - 1;
    const isMiddle = !isFirst && !isLast;

    const panel = {
      panel_number: panelIndex + 1,
      composition: this.generatePanelComposition(panelIndex, totalPanels),
      description: this.generatePanelDescription(comic, panelIndex, isFirst, isLast, isMiddle),
      dialogue: this.generatePanelDialogue(comic, panelIndex, isFirst, isLast, isMiddle),
      visual_focus: this.generateVisualFocus(comic, panelIndex),
      mood: this.generatePanelMood(comic, panelIndex),
      image_prompt: ''
    };

    // Generate specific image prompt for this panel
    panel.image_prompt = this.generatePanelImagePrompt(comic, panel);

    return panel;
  }

  generatePanelComposition(panelIndex, totalPanels) {
    const compositions = {
      single: ['full panel establishing shot'],
      first: ['wide establishing shot', 'medium shot introducing character'],
      middle: ['close-up for emphasis', 'medium shot showing action', 'reaction shot'],
      last: ['close-up for punchline', 'wide shot showing aftermath', 'zoom out for perspective']
    };

    if (totalPanels === 1) return compositions.single[0];
    if (panelIndex === 0) return compositions.first[panelIndex % compositions.first.length];
    if (panelIndex === totalPanels - 1) return compositions.last[Math.floor(Math.random() * compositions.last.length)];
    return compositions.middle[Math.floor(Math.random() * compositions.middle.length)];
  }

  generatePanelDescription(comic, panelIndex, isFirst, isLast, isMiddle) {
    const mascot = MASCOTS[comic.primary_mascot];
    
    if (isFirst) {
      return `Opening panel establishing ${mascot.name} in their typical environment: ${mascot.appearance.setting}. The scene shows ${comic.setup}. ${mascot.name} displays their characteristic ${mascot.personality.primary[0]} demeanor.`;
    }

    if (isLast) {
      return `Final panel delivering the punchline: ${comic.punchline}. ${mascot.name}'s expression perfectly captures their ${mascot.personality.dark_traits[0]} nature as they deliver their trademark cynical wisdom.`;
    }

    if (isMiddle) {
      const middleActions = [
        `${mascot.name} attempts to deal with the situation using their unique problem-solving approach`,
        `The situation escalates as ${mascot.name} encounters the reality of their circumstances`,
        `${mascot.name} provides commentary on the absurdity of their situation`,
        `Other characters react to ${mascot.name}'s behavior with typical human obliviousness`
      ];
      return middleActions[Math.floor(Math.random() * middleActions.length)];
    }

    return `${mascot.name} continues to navigate their complicated existence with characteristic grace.`;
  }

  generatePanelDialogue(comic, panelIndex, isFirst, isLast, isMiddle) {
    const mascot = MASCOTS[comic.primary_mascot];
    
    const dialogues = {
      dumbo: {
        first: [
          "Well, shit. Another day, another disappointment.",
          "I was having a perfectly mediocre day until...",
          "Why does everything require me to leave the couch?",
          "Can't the universe just... not, for like five minutes?"
        ],
        middle: [
          "This is exactly why I don't leave the house.",
          "I'm too sober for this conversation.",
          "Can we solve this with minimal effort on my part?",
          "I miss when my biggest problem was finding the remote."
        ],
        last: [
          "Next time, I'm staying on the couch.",
          "And that's why I gave up trying.",
          "Tomorrow I'm not answering the door.",
          "At least failure is consistent."
        ]
      },
      scrapz: {
        first: [
          "Let me guess, you need someone else to clean up your mess.",
          "This has 'bad idea' written all over it.",
          "I don't do charity work, and I don't do favors.",
          "What fresh hell is this?"
        ],
        middle: [
          "I told you this was a bad idea.",
          "Everyone's got an angle. What's yours?",
          "Trust me, it gets worse from here.",
          "I've seen this shit before. It doesn't end well."
        ],
        last: [
          "And that's why I work alone.",
          "Next time, count me out.",
          "I need a cigarette and some alone time.",
          "Same shit, different day."
        ]
      },
      patty: {
        first: [
          "Honey, I've seen enough drama for one lifetime.",
          "Please tell me this doesn't involve my professional life.",
          "I'm too pretty for whatever you're about to suggest.",
          "Let me stop you right there before you ruin my day."
        ],
        middle: [
          "This is going straight into my therapy sessions.",
          "I'm charging consultation fees for this conversation.",
          "Sweetie, you have no idea what you're dealing with.",
          "This is why I drink before noon."
        ],
        last: [
          "Well, that was a complete disaster.",
          "I need a drink and a long bath.",
          "This is exactly why I have trust issues.",
          "At least I look good while everything falls apart."
        ]
      },
      buzz: {
        first: [
          "Hold on, let me get another drink before you continue.",
          "Is this gonna be one of those conversations I regret?",
          "I'm too drunk for this, but not drunk enough.",
          "Why do all my problems start with someone saying my name?"
        ],
        middle: [
          "This calls for professional drinking.",
          "I've made worse decisions on less alcohol.",
          "At least the bar's still open.",
          "Dolores was right about everything, wasn't she?"
        ],
        last: [
          "I'm gonna need something stronger than beer.",
          "Why does everything end with me drinking alone?",
          "At least I'm consistent in my disappointments.",
          "This calls for a celebration... or drowning my sorrows."
        ]
      },
      rizzo: {
        first: [
          "Death would be preferable to whatever you're about to ask.",
          "I've survived worse than whatever's coming.",
          "Let me guess, someone needs the expert on suffering.",
          "This is either very bad news or very bad news disguised as good news."
        ],
        middle: [
          "Some stories don't have happy endings, just honest ones.",
          "I should have stayed in the sewer.",
          "Pain is just life reminding you that you're still breathing.",
          "At least when you expect the worst, you're rarely disappointed."
        ],
        last: [
          "Well, that was predictably awful.",
          "At least nobody died... this time.",
          "Some lessons are learned the hard way.",
          "And that's why hope is dangerous."
        ]
      }
    };

    const characterDialogues = dialogues[comic.primary_mascot.toLowerCase()];
    if (!characterDialogues) return "...";

    let dialogueSet;
    if (isFirst) dialogueSet = characterDialogues.first;
    else if (isLast) dialogueSet = characterDialogues.last;
    else dialogueSet = characterDialogues.middle;

    const selectedLine = dialogueSet[Math.floor(Math.random() * dialogueSet.length)];
    
    return {
      speaker: mascot.name,
      line: selectedLine,
      tone: mascot.personality.speech_pattern,
      balloon_type: this.selectBalloonType(selectedLine)
    };
  }

  selectBalloonType(line) {
    if (line.includes('...')) return 'thought_bubble';
    if (line.includes('!')) return 'exclamation';
    if (line.includes('?')) return 'question';
    if (line.includes('shit') || line.includes('fuck') || line.includes('damn')) return 'rough_speech';
    return 'standard_speech';
  }

  generateVisualFocus(comic, panelIndex) {
    const focuses = [
      'character expression and body language',
      'environmental details that reinforce mood',
      'interaction between characters',
      'symbolic objects or props',
      'contrast between character and setting',
      'facial close-up for emotional impact'
    ];
    return focuses[Math.floor(Math.random() * focuses.length)];
  }

  generatePanelMood(comic, panelIndex) {
    const moods = [
      'cynical resignation', 'dark humor', 'bitter irony',
      'weary acceptance', 'sarcastic defiance', 'gallows humor',
      'existential dread', 'chemical numbness', 'spite-fueled determination'
    ];
    return moods[Math.floor(Math.random() * moods.length)];
  }

  generatePunchline(primaryMascot, theme) {
    const mascot = MASCOTS[primaryMascot];
    
    const punchlines = {
      dumbo: [
        "And that's why I stay on the couch.",
        "At least failure is predictable.",
        "Tomorrow I'm disconnecting the doorbell.",
        "Pizza delivery doesn't judge me this much."
      ],
      scrapz: [
        "This is why I don't trust humans.",
        "Same shit, different species.",
        "I need a cigarette and some alone time.",
        "Nine lives, zero fucks given."
      ],
      patty: [
        "Honey, I've seen worse at amateur night.",
        "This is going in my memoir: 'Lipstick on a Pig'.",
        "At least I look fabulous while everything's falling apart.",
        "This calls for retail therapy and day drinking."
      ],
      buzz: [
        "This is why I drink.",
        "Dolores was right about everything.",
        "At least the bar doesn't judge me.",
        "I'm gonna need something stronger."
      ],
      rizzo: [
        "And that's why hope is dangerous.",
        "Some stories don't have happy endings.",
        "Pain is just life's way of saying hello.",
        "At least when you expect nothing, you're never disappointed."
      ]
    };

    const characterPunchlines = punchlines[primaryMascot.toLowerCase()] || [
      "Life's a bitch, and then you pay taxes."
    ];

    return characterPunchlines[Math.floor(Math.random() * characterPunchlines.length)];
  }

  generateVisualNotes(style, format) {
    return {
      art_style: style,
      color_palette: this.generateColorPalette(),
      typography: this.generateTypography(),
      panel_borders: this.generatePanelBorders(format),
      background_treatment: this.generateBackgroundTreatment(),
      character_consistency: this.generateConsistencyNotes()
    };
  }

  generateColorPalette() {
    const palettes = [
      'muted urban grays with neon accent colors',
      'high contrast black and white with single color highlights',
      'desaturated colors reflecting urban decay',
      'noir-inspired shadows with selective color',
      'cyberpunk neon on dark backgrounds',
      'sepia tones with modern color pops'
    ];
    return palettes[Math.floor(Math.random() * palettes.length)];
  }

  generateTypography() {
    const typography = [
      'hand-lettered dialogue with rough edges',
      'clean sans-serif for readability',
      'varied fonts reflecting character personalities',
      'traditional comic book lettering',
      'graffiti-inspired text for urban feel',
      'mixed digital and hand-drawn text'
    ];
    return typography[Math.floor(Math.random() * typography.length)];
  }

  generatePanelBorders(format) {
    const borders = {
      single_panel: 'thick black border with rough edges',
      three_panel: 'clean panel separation with consistent spacing',
      four_panel: 'traditional comic strip borders',
      six_panel: 'varied panel sizes with creative layouts',
      full_page: 'dynamic panel shapes and sizes'
    };
    return borders[format] || 'standard comic panel borders';
  }

  generateBackgroundTreatment() {
    const treatments = [
      'detailed urban environments',
      'selective focus with blurred backgrounds',
      'symbolic/abstract backgrounds',
      'photorealistic settings',
      'minimalist backgrounds focusing on characters',
      'textured backgrounds suggesting mood'
    ];
    return treatments[Math.floor(Math.random() * treatments.length)];
  }

  generateConsistencyNotes() {
    return {
      character_models: 'Maintain consistent character proportions and features across panels',
      expressions: 'Exaggerate facial expressions for comic effect while staying true to character',
      clothing: 'Keep signature clothing items and accessories consistent',
      body_language: 'Reflect character personalities through posture and gestures',
      environmental_consistency: 'Maintain lighting and perspective consistency within scenes'
    };
  }

  generatePanelImagePrompt(comic, panel) {
    const mascot = MASCOTS[comic.primary_mascot];
    
    return `Comic book panel ${panel.panel_number}: ${panel.composition}, showing ${mascot.name} ${panel.description}. ${panel.visual_focus}. Character says: "${panel.dialogue.line}". Art style: ${comic.style}, ${comic.visual_notes.color_palette}. Mood: ${panel.mood}. Professional comic book illustration with consistent character design.`;
  }

  generateComicImagePrompts(comic) {
    const prompts = [];
    
    // Full comic layout prompt
    prompts.push({
      type: 'full_comic_layout',
      prompt: `Complete ${comic.format} comic strip titled "${comic.title}". ${this.comicFormats[comic.format].description}. Art style: ${comic.style}. Color palette: ${comic.visual_notes.color_palette}. Shows ${MASCOTS[comic.primary_mascot].name} story about ${comic.theme}. Professional comic book quality with consistent character design throughout all panels.`
    });

    // Individual panel prompts
    comic.panels.forEach(panel => {
      prompts.push({
        type: `panel_${panel.panel_number}`,
        prompt: panel.image_prompt
      });
    });

    // Character reference sheet
    prompts.push({
      type: 'character_reference',
      prompt: `Character reference sheet for ${MASCOTS[comic.primary_mascot].name}: multiple views and expressions, ${MASCOTS[comic.primary_mascot].appearance.features || MASCOTS[comic.primary_mascot].appearance.eyes}, ${MASCOTS[comic.primary_mascot].appearance.signature_items?.join(', ') || 'signature items'}. Art style: ${comic.style}. For use in comic book illustration. Professional character design sheet.`
    });

    return prompts;
  }

  // Save comic to files
  async saveComic(comic) {
    const filename = `comic_${comic.id}_${Date.now()}.json`;
    const filepath = path.join(this.outputDir, filename);
    
    await fs.writeJson(filepath, comic, { spaces: 2 });
    
    // Create readable script format
    const script = this.formatAsScript(comic);
    const scriptPath = path.join(this.scriptsDir, `comic_script_${comic.id}_${Date.now()}.md`);
    await fs.writeFile(scriptPath, script);
    
    // Create art direction document
    const artDirection = this.formatAsArtDirection(comic);
    const artPath = path.join(this.outputDir, `art_direction_${comic.id}_${Date.now()}.md`);
    await fs.writeFile(artPath, artDirection);
    
    return {
      json: filepath,
      script: scriptPath,
      art_direction: artPath
    };
  }

  formatAsScript(comic) {
    let script = `# ${comic.title}

**Comic ID:** ${comic.id}  
**Format:** ${comic.format} (${this.comicFormats[comic.format].description})  
**Primary Character:** ${MASCOTS[comic.primary_mascot].name}  
**Theme:** ${comic.theme}  
**Style:** ${comic.style}  

## Story Setup
${comic.setup}

## Panels
`;

    comic.panels.forEach(panel => {
      script += `
### Panel ${panel.panel_number}

**Composition:** ${panel.composition}  
**Visual Focus:** ${panel.visual_focus}  
**Mood:** ${panel.mood}  

**Description:**  
${panel.description}

**Dialogue:**  
**${panel.dialogue.speaker}:** "${panel.dialogue.line}"  
*Tone: ${panel.dialogue.tone}*  
*Balloon Type: ${panel.dialogue.balloon_type}*

---
`;
    });

    script += `
## Punchline
${comic.punchline}

## Visual Style Notes
- **Art Style:** ${comic.visual_notes.art_style}
- **Color Palette:** ${comic.visual_notes.color_palette}
- **Typography:** ${comic.visual_notes.typography}
- **Panel Borders:** ${comic.visual_notes.panel_borders}
- **Background Treatment:** ${comic.visual_notes.background_treatment}

---
*Generated by iongiveafuq Comic Generator*
`;

    return script;
  }

  formatAsArtDirection(comic) {
    let artDirection = `# Art Direction: ${comic.title}

## Overall Vision
Create a ${comic.format} comic strip that captures the dark humor and authentic cynicism of ${MASCOTS[comic.primary_mascot].name}'s worldview. The visual style should reinforce the theme of "${comic.theme}" while maintaining the authentic urban decay aesthetic of the iongiveafuq universe.

## Character Design
**Primary Character: ${MASCOTS[comic.primary_mascot].name}**
- ${MASCOTS[comic.primary_mascot].appearance.features || MASCOTS[comic.primary_mascot].appearance.eyes}
- Signature items: ${MASCOTS[comic.primary_mascot].appearance.signature_items?.join(', ') || 'as described in character reference'}
- Setting context: ${MASCOTS[comic.primary_mascot].appearance.setting}
- Personality reflected in design: ${MASCOTS[comic.primary_mascot].personality.primary.join(', ')}

## Visual Style Guidelines
- **Art Style:** ${comic.style}
- **Color Approach:** ${comic.visual_notes.color_palette}
- **Typography:** ${comic.visual_notes.typography}
- **Background Treatment:** ${comic.visual_notes.background_treatment}

## Character Consistency Notes
${Object.entries(comic.visual_notes.character_consistency).map(([key, value]) => `- **${key.replace('_', ' ')}:** ${value}`).join('\n')}

## Panel-by-Panel Art Direction

`;

    comic.panels.forEach(panel => {
      artDirection += `### Panel ${panel.panel_number}
- **Composition:** ${panel.composition}
- **Visual Focus:** ${panel.visual_focus}
- **Mood:** ${panel.mood}
- **Key Elements:** ${panel.description}
- **Dialogue Placement:** "${panel.dialogue.line}" (${panel.dialogue.balloon_type})

`;
    });

    artDirection += `
## Image Generation Prompts

${comic.image_prompts.map((prompt, i) => `${i + 1}. **${prompt.type}:** ${prompt.prompt}`).join('\n')}

## Final Notes
This comic should feel authentic to the character's voice and worldview. The humor comes from truth, not exaggeration. The art should support the dark comedy by grounding it in realistic urban environments and genuine emotional expressions.

---
*Art Direction by iongiveafuq Comic Generator*
`;

    return artDirection;
  }

  // Generate a series of comics
  async generateComicSeries(count = 5, options = {}) {
    const comics = [];
    console.log(`Generating ${count} comics...`);
    
    for (let i = 0; i < count; i++) {
      console.log(`Generating comic ${i + 1}/${count}...`);
      
      // Vary the format and mascot for each comic
      const formats = Object.keys(this.comicFormats);
      const mascots = Object.keys(MASCOTS);
      
      const comicOptions = {
        format: formats[i % formats.length],
        primaryMascot: mascots[i % mascots.length],
        ...options
      };
      
      const comic = this.generateComic(comicOptions);
      const savedFiles = await this.saveComic(comic);
      
      comics.push({
        comic,
        files: savedFiles
      });
    }
    
    console.log(`Generated ${count} comics successfully!`);
    return comics;
  }

  // Generate comics for specific themes or events
  async generateThemedComics(theme, count = 3) {
    const comics = [];
    console.log(`Generating ${count} comics with theme: ${theme}...`);
    
    for (let i = 0; i < count; i++) {
      const comic = this.generateComic({ theme });
      const savedFiles = await this.saveComic(comic);
      comics.push({ comic, files: savedFiles });
    }
    
    return comics;
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new ComicGenerator();
  
  const args = process.argv.slice(2);
  const command = args[0] || 'single';
  
  switch (command) {
    case 'single':
      const comic = generator.generateComic();
      generator.saveComic(comic)
        .then(result => {
          console.log(`Comic generated: ${comic.title}`);
          console.log(`Files: ${JSON.stringify(result, null, 2)}`);
        })
        .catch(console.error);
      break;
      
    case 'series':
      const count = parseInt(args[1]) || 5;
      generator.generateComicSeries(count)
        .catch(console.error);
      break;
      
    case 'themed':
      const theme = args[1] || 'Rock bottom isn\'t the bottom';
      const themedCount = parseInt(args[2]) || 3;
      generator.generateThemedComics(theme, themedCount)
        .catch(console.error);
      break;
      
    default:
      console.log('Usage: node comicGenerator.js [single|series|themed] [options]');
      console.log('  single - Generate one comic');
      console.log('  series [count] - Generate a series of comics');
      console.log('  themed [theme] [count] - Generate comics with specific theme');
  }
}

export default ComicGenerator;
