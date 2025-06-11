import { MASCOTS, RECURRING_CHARACTERS, STORY_ELEMENTS } from '../data/mascots.js';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class BackstoryGenerator {
  constructor() {
    this.outputDir = './generated/backstories';
    fs.ensureDirSync(this.outputDir);
  }

  // Generate comprehensive backstory for a mascot
  generateBackstory(mascotKey) {
    const mascot = MASCOTS[mascotKey];
    if (!mascot) {
      throw new Error(`Unknown mascot: ${mascotKey}`);
    }

    const backstory = {
      id: uuidv4(),
      mascot: mascot.name,
      title: `The ${this.getBackstoryTitle(mascot)}`,
      timestamp: new Date().toISOString(),
      content: {
        origin: this.generateOriginStory(mascot),
        turning_point: this.generateTurningPoint(mascot),
        downward_spiral: this.generateDownwardSpiral(mascot),
        current_state: this.generateCurrentState(mascot),
        relationships: this.generateRelationships(mascot),
        daily_routine: this.generateDailyRoutine(mascot),
        deepest_fears: this.generateDeepestFears(mascot),
        hidden_shame: this.generateHiddenShame(mascot),
        last_good_day: this.generateLastGoodDay(mascot)
      },
      image_prompts: this.generateImagePrompts(mascot),
      voice_notes: this.generateVoiceNotes(mascot)
    };

    return backstory;
  }

  getBackstoryTitle(mascot) {
    const titles = {
      dumbo: "Couch Chronicles: How Dreams Die in Pizza Boxes",
      scrapz: "Nine Lives, Zero Shits Given: A Street Cat's Fall from Grace", 
      patty: "Lipstick on a Pig: When Glitter Can't Hide the Pain",
      buzz: "Bottom Shelf Philosophy: A Donkey's Guide to Liquid Courage",
      rizzo: "Lab Rat to Gutter Rat: A Tail of Medical Malpractice"
    };
    
    return titles[mascot.name.toLowerCase()] || `The Tragic Tale of ${mascot.name}`;
  }

  generateOriginStory(mascot) {
    const origins = {
      dumbo: `Dumbo wasn't always a couch-dwelling waste of fur and potential. Once upon a time—back when he still showered regularly—he was Dennis "Dumbo" McGillicuddy, junior marketing executive at Synergy Solutions Inc. He had a corner cubicle, a 401k, and genuine hope that his boss would notice his "innovative thinking outside the box."

That was before the Great Restructuring of 2019. Before his fiancée Linda discovered his browser history and left him for her yoga instructor. Before his mother started introducing him as "my son who had so much potential." 

The descent began with a single sick day that turned into a week, then a month. Unemployment benefits became his new salary, pizza delivery his new social interaction, and the couch his new office. What started as temporary became permanent when Dumbo realized that giving up felt surprisingly liberating.`,

      scrapz: `Scrapz used to be Mittens—yes, fucking Mittens—the pride and joy of the Whitman family on Maple Street. Picture-perfect suburban life: manicured lawn, two-car garage, and a cat who knew his place on the windowsill watching birds he'd never catch.

Everything changed the night 8-year-old Timmy Whitman forgot to close the back door. One taste of freedom led to a three-day bender in the city's underbelly. When Scrapz finally crawled home, torn ear and all, the Whitmans had already adopted a "replacement"—a fluffy Persian named Princess.

Standing in his own backyard, watching Princess eat from his bowl, something snapped. Scrapz burned his pet registration papers in the garden (metaphorically—cats can't actually light matches) and never looked back. The streets taught him that trust is for suckers and kindness is just manipulation with better PR.`,

      patty: `Patricia LaHam was born Preston Hamsworth III on a pig farm in rural Nebraska, where gender expression meant choosing between overalls or slightly different overalls. The family patriarch, Preston Sr., had simple expectations: marry a nice girl, take over the farm, and produce Preston IV.

But little Preston had different dreams, sparked by a smuggled copy of "RuPaul's Drag Race" watched on a neighbor's satellite dish. At 16, he traded his inheritance for a Greyhound ticket and a stolen credit card, arriving in the city with $47 and enough attitude to power Times Square.

The transformation to Patty LaHam wasn't just about finding her true identity—it was about survival. When conventional jobs wouldn't hire a "confused farm boy," the underground drag scene provided both family and income. Unfortunately, the scene's darker sides—the drugs, the dangerous clients, the crushing financial reality—came with the glamour.`,

      buzz: `Buzz wasn't always Buzz. He was Buster Reynolds, union foreman at the steel mill, with a mortgage, a wife named Dolores, and weekend barbecues that actually featured conversation instead of monologues about his ex-wife.

The first drink was celebratory—landing the contract that would secure everyone's jobs for another five years. The second was commiserative when the plant closed anyway, outsourced to Malaysia. The third through three-thousandth were just survival.

Dolores lasted longer than most wives would have, sticking through the job loss, the foreclosure, even the first DUI. But there's only so many times you can wake up to find your husband passed out in the neighbor's azaleas before love turns to pity, then to disgust, then to attorney fees. The divorce papers arrived on a Tuesday. Buzz celebrated with a bottle of Jack Daniels and never really stopped.`,

      rizzo: `Rizzo's story begins in a place that shouldn't exist: Sub-basement Level B-7 of Needham Pharmaceutical Research, where "ethics committees" were just another budget line to eliminate. Born as Test Subject 847-R, Rizzo's earliest memories involve needles, observation windows, and the growing realization that his daily "vitamins" were slowly killing him.

Dr. Cornelius Needham's experiments pushed the boundaries of what creatures could survive, all in the name of advancing human medicine. Cancer cells, experimental toxins, psychological torture disguised as "behavioral modification"—Rizzo endured it all while maintaining detailed mental notes about every violation of basic decency.

The escape came during a fire drill gone wrong. While alarms blared and lab techs evacuated, Rizzo picked the lock he'd been studying for months and vanished into the city's sewer system. But freedom came with a price: his body was already too damaged to fully recover, leaving him in a permanent state of "not quite dead, not quite alive."`
    };

    return origins[mascot.name.toLowerCase()] || `${mascot.name} has a mysterious past that shaped their current cynical worldview.`;
  }

  generateTurningPoint(mascot) {
    const turningPoints = {
      dumbo: `The exact moment Dumbo gave up can be pinpointed to 3:47 PM on a rainy Thursday in March. He was sitting in his car outside Linda's apartment, watching her load boxes into the yoga instructor's Prius, when his phone buzzed with a text from his mother: "Dennis, honey, maybe it's time to consider community college?" 

That's when it hit him—everyone had already written him off. His own mother was suggesting community college. Linda was literally moving in with a man who called himself "Chakra Steve." His boss had replaced him with an intern who worked for college credit and kombucha.

Dumbo turned off his phone, drove to the nearest liquor store, and bought enough beer to forget his own name. When he woke up three days later on his couch, still wearing the same clothes, he realized this felt more honest than the previous ten years of "trying."`,

      scrapz: `The turning point came during Scrapz's first winter on the streets, when hypothermia was setting in and he was desperate enough to approach strangers for help. A kind-looking elderly woman named Mrs. Henderson took him in, gave him warm milk, and let him sleep by her fireplace.

For two weeks, Scrapz allowed himself to hope. Maybe humans weren't all monsters. Maybe there was still kindness in the world. Maybe he could trust again.

Then Mrs. Henderson's granddaughter visited and revealed the truth: Grandma had been feeding him expired cat food and planning to take him to the kill shelter once she "fattened him up for a humane death." The cruelty wasn't even malicious—it was casual, thoughtless, efficient.

That night, Scrapz pissed in Mrs. Henderson's shoes, shredded her favorite curtains, and walked back into the cold. He lit his first cigarette with matches stolen from her kitchen and never again mistook human kindness for anything but manipulation with better packaging.`,

      patty: `Patty's turning point arrived in the form of a modeling contract that seemed too good to be true—because it was. "Elite Model Management" turned out to be a front for an escort service, and by the time Patty realized the truth, she was already in debt for "training fees," "portfolio costs," and "wardrobe investments."

The first "modeling session" was a 50-year-old businessman in a hotel room who wanted to "explore his feminine side" while Patty played along. The money was good—great, actually—but each transaction chipped away at the identity she'd fought so hard to build.

Within six months, Patty went from aspiring performer to high-end sex worker, justifying each compromise as "temporary" while sinking deeper into a world where dignity was a luxury she couldn't afford. The glitter and glamour became armor against the reality that she was selling the very authenticity she'd risked everything to find.`,

      buzz: `Buzz's point of no return wasn't dramatic—it was bureaucratic. Standing in line at the unemployment office for the fourth time that month, watching other desperate people clutch their paperwork like life preservers, he overheard two caseworkers joking about "chronic filers" who'd never get their lives together.

"See that donkey over there?" one said, not knowing Buzz could hear. "He'll be back next week with some new excuse. They always are. Some people are just unemployable."

Instead of anger, Buzz felt relief. Finally, someone had said out loud what he'd suspected all along—he was fundamentally broken, unemployable, a lost cause. The pressure to keep trying, to "network" and "upskill" and "leverage his experience," could finally stop.

He celebrated this revelation at Murphy's Pub and never left the barstool. Why fight a label when you could embrace it? Why disappoint people when you could exceed their low expectations?`,

      rizzo: `Rizzo's turning point came not during his escape, but three months later, when he finally worked up the courage to contact animal rights organizations about Needham's lab. He had evidence, memories, even physical scars that could shut down the operation and save other test subjects.

But every organization he contacted wanted him to go public, to be the "face of laboratory animal abuse." They wanted photo shoots, interviews, speaking engagements—all things that would make him a target for Needham's considerable resources and questionable ethics.

The final straw came when a well-meaning activist suggested he write a book: "From Lab Rat to Survivor: A Journey of Hope." Hope. The word made him physically ill. Hope was what they'd used to torture him, always promising the experiments would end soon, that he was helping save lives, that his suffering had meaning.

That night, Rizzo threw away the activists' business cards and embraced a simpler truth: some wounds don't heal, some systems don't change, and some stories don't have happy endings. But they can have honest ones.`
    };

    return turningPoints[mascot.name.toLowerCase()] || `A pivotal moment shattered ${mascot.name}'s remaining illusions about life.`;
  }

  generateDownwardSpiral(mascot) {
    const spirals = {
      dumbo: `The spiral was magnificently efficient. First went personal hygiene—why shower when you're not leaving the couch? Then basic nutrition—pizza delivery accepts credit cards, vegetables require shopping. Social connections evaporated as Dumbo stopped returning calls, stopped making excuses, stopped pretending he was "going through a rough patch."

The unemployment benefits ran out, but Dumbo had discovered gig economy apps that let him earn just enough for rent and pizza without human interaction. Door Dash, Uber Eats, Instacart—the modern economy had evolved to enable his hermit lifestyle perfectly.

Credit cards maxed out buying comfort: streaming services, gaming subscriptions, premium pizza toppings. When the cards were declined, Dumbo learned to live off dollar store ramen and free trial periods. Rock bottom kept revealing new sub-basements of failure.

The final insult was his mother's Christmas card, addressed to "Dennis McGillicuddy or Current Resident"—even she had given up using his real name.`,

      scrapz: `Scrapz's descent was methodical. First came petty theft—food from garbage cans escalated to shoplifting, then breaking into apartments, finally running cons on tourists. Each crime was justified as survival, but the real motivation was proving that everyone was as corrupt as he suspected.

The cigarette habit started as an image thing—tough street cats smoke—but became a physical need that demanded increasingly desperate funding. Scrapz began selling information to loan sharks, trading gossip about which apartments had valuables, which old ladies kept cash hidden.

Trust became a weapon he wielded against others. Scrapz would befriend strays, learn their stories, then sell them out to animal control or use their vulnerabilities for blackmail. Each betrayal proved his core thesis: everyone disappoints, so disappoint them first.

The lowest point came when he sold out a pregnant stray named Whiskers to a testing facility, knowing she'd never see her kittens again. The money bought him a carton of cigarettes and the confirmation that he'd successfully killed whatever conscience he'd once possessed.`,

      patty: `Patty's spiral was lubricated with premium vodka and designer drugs. What started as "business expenses"—looking good for clients—became self-medication for the psychological toll of her work. Each encounter required more chemical courage, each morning demanded stronger solutions for the shame hangover.

The debt cycle was perfect: earn money selling intimacy, spend money buying numbness, need more money for better drugs, accept worse clients for better pay. Patty's standards dropped in direct proportion to her bar tab, until she was servicing anyone with cash and a pulse.

Relationships became impossible. How do you explain your job to a potential partner? How do you trust someone when your profession is built on fantasy? Patty's romantic life devolved into a series of increasingly toxic arrangements with clients who wanted to "save" her or own her or punish her.

The breaking point was waking up in a stranger's basement, missing two days of memory and most of her jewelry, with nothing but a wad of cash and a business card for "Dr. Needham's Special Services"—apparently even rock bottom had a scientific research division.`,

      buzz: `Buzz's spiral was impressively comprehensive. First the day drinking became full-time drinking. Then driving under the influence became a hobby, collecting DUIs like merit badges. The job prospects disappeared along with his driver's license, creating perfect conditions for a hermit lifestyle funded by disability claims and informal loans.

Friends stopped calling after Buzz's third alcohol-fueled breakdown at a barbecue, where he explained in graphic detail why everyone's marriages would end in bitter divorce. Family members blocked his number after he started calling them at 3 AM to confess various sins and demand forgiveness.

The gambling addiction was almost an afterthought—something to do while drinking, a way to potentially solve all problems with one lucky bet. Sports betting became lottery tickets became scratch-offs became whatever Mama Rosetti's organization was running that week.

Rock bottom was getting arrested for public intoxication outside the courthouse where his divorce was finalized, explaining to the judge through slurred speech that he was "celebrating his freedom to disappoint only himself." The judge's expression of pity was somehow worse than contempt.`,

      rizzo: `Rizzo's spiral was less about falling and more about discovering how deep the basement of human cruelty could go. The physical damage from Needham's experiments left him in constant pain, requiring increasingly dangerous self-medication with stolen pharmaceuticals and street drugs that probably contained more rat poison than his body already had.

Living in the sewers provided shelter but accelerated his decay. The toxic environment, combined with his compromised immune system, created a perfect storm of infection, disease, and slow poisoning. Every day alive felt like a victory and a punishment simultaneously.

The psychological damage manifested as increasingly elaborate revenge fantasies against Needham and anyone associated with the pharmaceutical industry. Rizzo spent months planning break-ins, gathering evidence, preparing for a reckoning that his deteriorating health made impossible to execute.

The final degradation was discovering that Needham had been promoted to head of "Ethical Research Standards" at a major university, giving interviews about the importance of treating lab animals humanely. Evil wasn't being punished—it was being rewarded with tenure and a pension plan.`
    };

    return spirals[mascot.name.toLowerCase()] || `${mascot.name}'s life steadily deteriorated through a series of increasingly poor decisions.`;
  }

  generateCurrentState(mascot) {
    const currentStates = {
      dumbo: `Present-day Dumbo exists in a carefully constructed ecosystem of minimal effort and maximum comfort. His couch has molded to his exact body shape. His coffee table is an archaeological site of pizza boxes, each layer representing a different week of surrender. The TV remote is his most prized possession, followed closely by his phone charger and the menu for Giovanni's Pizza (they know him by voice).

He's achieved a zen-like state of not giving a fuck that borders on enlightenment. Bills get paid (sometimes) through a complex system of app-based work that requires leaving the apartment for exactly as long as necessary. Social interaction is limited to delivery drivers and the occasional concerned text from his mother, which he answers with thumbs-up emojis.

Dumbo has become a connoisseur of other people's failures, finding deep satisfaction in reality TV and social media drama. His current life philosophy can be summarized as: "Why try when you can watch other people try and fail more spectacularly?"`,

      scrapz: `Current-day Scrapz operates as the neighborhood's unofficial information broker and small-time criminal consultant. His permanent address is "wherever it's warm and no one asks questions," rotating between abandoned buildings, 24-hour laundromats, and the occasional bleeding-heart human's fire escape.

He's achieved a reputation as someone who can procure anything illegal for the right price, knows everyone's secrets, and maintains strict professional standards in all dishonest dealings. Honor among thieves isn't just a saying—it's Scrapz's entire business model.

His daily routine involves strategic positioning at key gossip intersections: outside the courthouse, near the unemployment office, behind the bars where humans think they're having private conversations. Information is currency, cigarettes are breakfast, and trust is still for suckers who haven't learned better yet.`,

      patty: `Present-day Patty has found an uneasy equilibrium between survival and self-destruction. She performs three nights a week at underground drag clubs where the audience appreciates authenticity over polish, and the tips aren't enough to live on but sufficient to maintain her habits.

Her apartment is a study in contrasts: designer clothes hanging next to thrift store finds, expensive makeup surrounding expired prescription bottles, glamorous photos hiding behind unpaid bills. She's mastered the art of looking fabulous while falling apart, turning financial catastrophe into performance art.

Patty's become a mentor figure for newer performers, teaching them the hard-learned lessons about protecting themselves in a world that wants to consume their authenticity. Her advice is brutal but necessary: "Never do anything for free, never trust a client who says he's different, and always keep your real name secret."`,

      buzz: `Current Buzz has achieved a sustainable level of functional alcoholism that allows him to maintain housing and basic dignity while staying perpetually buzzed. He's mastered the scheduling of various social services, knowing exactly which churches serve free meals on which days and where the most comfortable public benches are located.

His social circle consists entirely of other regulars at Murphy's Pub, where he's achieved the status of "beloved bar philosopher." His unsolicited life advice, delivered through slurred speech and beer breath, has become unexpectedly popular among other patrons facing their own rock bottoms.

Buzz has embraced his role as the neighborhood's cautionary tale, finding purpose in serving as an example of what happens when you give up on giving up. His current life motto: "I may be a failure, but at least I'm consistent."`,

      rizzo: `Present-day Rizzo exists in the spaces between life and death, too stubborn to die and too damaged to fully live. He's become the unofficial historian of society's discarded, maintaining detailed mental records of every injustice, every systemic failure, every person who disappeared without anyone caring.

His current habitat shifts between abandoned buildings, storm drains, and the occasional sympathetic human's basement, always staying mobile enough to avoid Needham's periodic attempts to "reclaim lost property." Survival is a daily negotiation between his body's limitations and his mind's refusal to surrender.

Rizzo has evolved into something between a prophet and a ghost, appearing at crucial moments to deliver warnings about the true cost of trusting institutions. His presence serves as a reminder that some wounds don't heal, some stories don't have happy endings, but they can have honest ones.`
    };

    return currentStates[mascot.name.toLowerCase()] || `${mascot.name} currently exists in a state of resigned acceptance of their circumstances.`;
  }

  generateRelationships(mascot) {
    // This would generate detailed relationship dynamics with NPCs and other mascots
    const relationships = {
      dumbo: {
        mother: "Calls weekly, he responds with emojis. She's given up on intervention, now just hopes he's alive.",
        ex_fiancee_linda: "Blocked on all social media, but he still checks her Instagram through private browsing.",
        pizza_delivery_guy: "Tony from Giovanni's - the closest thing Dumbo has to a friend. They discuss sports scores and weather.",
        landlord: "Mr. Kowalski tolerates late rent because Dumbo never complains and rarely leaves the apartment."
      },
      scrapz: {
        dealer_mickey: "Reliable supplier of cigarettes and information. Mutual professional respect.",
        bartender_sal: "Allows Scrapz to warm up in the bar during winter, ignores his small-time hustling.",
        officer_kowalski: "Cat and mouse game - Kowalski knows Scrapz is dirty but can never prove anything.",
        other_strays: "They fear and respect him. He's the neighborhood's unofficial crime boss."
      }
      // Would continue for all mascots...
    };

    return relationships[mascot.name.toLowerCase()] || {};
  }

  generateDailyRoutine(mascot) {
    const routines = {
      dumbo: `9 AM: Wake up (whenever the sun hits the TV screen just right)
10 AM: Check phone for any emergencies (there never are)
10:15 AM: Order coffee through delivery app
11 AM: Begin daily routine of scrolling through other people's drama
1 PM: Consider getting dressed, decide against it
2 PM: Order lunch (usually pizza, sometimes Chinese if feeling adventurous)
3-7 PM: Peak productivity hours for couch warming
7 PM: Dinner (see lunch)
8 PM-2 AM: Binge-watch shows about people with worse problems
2 AM: Fall asleep on couch, wake up at 9 AM, repeat`,

      scrapz: `Dawn: Check overnight messages under doors and in mailboxes (intelligence gathering)
Morning: Strategic positioning near courthouse/unemployment office for gossip collection
Noon: Trading information and small favors for cash/cigarettes
Afternoon: Scouting new opportunities, avoiding animal control
Evening: Networking at dive bars and alleys where humans think they have privacy
Night: Planning tomorrow's petty crimes while chain-smoking
Late night: Sleeping wherever it's warm and no one asks questions`
      // Would continue for all mascots...
    };

    return routines[mascot.name.toLowerCase()] || `${mascot.name} follows a daily routine optimized for minimal effort and maximum survival.`;
  }

  generateDeepestFears(mascot) {
    const fears = {
      dumbo: "That his mother will stop calling. That someone will force him to get a real job. That Linda will get married and be happy. That he'll run out of pizza delivery options. That his couch will break and he'll have to sit upright.",
      scrapz: "That someone will show him genuine kindness and he'll fall for it again. That animal control will finally catch him. That he'll get sick and have no one to help. That his reputation will soften and other strays will see him as weak.",
      patty: "That her looks will fade before she can escape this life. That someone from her old life will recognize her. That she'll overdose and no one will find her for days. That she's becoming the cautionary tale she used to pity.",
      buzz: "That he'll sober up and remember everything he's lost. That Dolores is happy without him. That his liver will give out before he's ready. That someone will expect him to be responsible for another person.",
      rizzo: "That Dr. Needham will find him and drag him back to the lab. That he'll recover and have to live with full awareness of his trauma. That other test subjects are still suffering while he's free. That his story will die with him."
    };

    return fears[mascot.name.toLowerCase()] || `${mascot.name} fears having to confront the reality of their choices.`;
  }

  generateHiddenShame(mascot) {
    const shames = {
      dumbo: "Still has Linda's engagement ring in his sock drawer and sometimes puts it on while drunk. Writes long emails to his former boss explaining why he was actually right, then deletes them. Secretly hopes his mother will stage an intervention.",
      scrapz: "Keeps a photo of his kitten self with the Whitman family. Sometimes feeds hungry strays, then denies it aggressively. Cried when he heard Whiskers died in the testing facility.",
      patty: "Sends anonymous money orders to her family farm every Christmas from the postal code they still think she died near. Practices acceptance speeches for awards she'll never receive. Has a secret savings account labeled 'escape fund' with $37 in it.",
      buzz: "Maintains a storage unit with all his awards from the steel mill and photos from his marriage. Attends AA meetings but sits in the back and never speaks. Pays child support for kids that aren't biologically his.",
      rizzo: "Secretly hopes Dr. Needham will be brought to justice and sometimes plans elaborate revenge scenarios. Keeps a journal documenting everything he remembers from the lab. Wishes he could have saved the other test subjects."
    };

    return shames[mascot.name.toLowerCase()] || `${mascot.name} harbors secret shame about their past choices and current situation.`;
  }

  generateLastGoodDay(mascot) {
    const lastGoodDays = {
      dumbo: "The day before the office restructuring was announced. Dennis had actually gotten a compliment on his quarterly report from his supervisor. He bought Linda flowers on the way home and they ordered Thai food and watched Netflix without arguing about what to watch. They talked about vacation plans for the summer. For twelve hours, everything was perfect.",

      scrapz: "The last night with the Whitman family, when 8-year-old Timmy had snuck him treats under the dinner table and whispered about their secret plans to build a cat fort in the backyard. Mittens had purred himself to sleep on Timmy's bed, completely safe and loved and trusting that tomorrow would be just like today.",

      patty: "Her first night performing as Patty LaHam at an amateur drag night in Chicago. The crowd was small but enthusiastic, and she'd won second place and $50. Afterward, three queens had invited her for diner food and coffee, and she'd felt like she finally belonged somewhere. Nobody asked about her past or her future—just celebrated her present.",

      buzz: "The night of his 20th wedding anniversary, before the plant closure rumors started. He and Dolores had gone to Antonio's, their special occasion restaurant, and she'd worn the dress from their second date. They'd danced to their wedding song in the restaurant's back corner, and other diners had applauded. Dolores had whispered that she was proud of him, and he'd believed she meant it.",

      rizzo: "The morning he was scheduled to be euthanized at the lab—a mercy killing after months of failed experiments. But there had been a paperwork error, a scheduling mix-up, and instead of the euthanasia chamber, he'd been accidentally fed breakfast. For those few hours, eating real food and believing he was going to die peacefully, Rizzo had felt something resembling peace."
    };

    return lastGoodDays[mascot.name.toLowerCase()] || `${mascot.name}'s last truly good day occurred before everything went wrong.`;
  }

  generateImagePrompts(mascot) {
    return {
      portrait: `High-detail character portrait of ${mascot.name}, ${mascot.appearance.features || mascot.appearance.eyes}, ${mascot.appearance.signature_items.join(', ')}, dark humor aesthetic, gritty urban setting, cyberpunk lighting with neon accents, professional digital art style`,
      
      origin_scene: `Cinematic scene showing ${mascot.name}'s origin story, ${mascot.backstory_elements.origin}, dramatic lighting, emotional storytelling through visual composition, detailed background elements`,
      
      current_lifestyle: `Environmental character shot of ${mascot.name} in their current habitat: ${mascot.appearance.setting}, lived-in details, authentic mess, mood lighting, photorealistic style with dark humor undertones`,
      
      interaction_scene: `${mascot.name} interacting with recurring characters, showing their relationships and social dynamics, multiple characters, urban setting, narrative composition`
    };
  }

  generateVoiceNotes(mascot) {
    return {
      speech_pattern: mascot.personality.speech_pattern,
      catchphrases: [
        mascot.tagline,
        // Add more specific catchphrases per character
      ],
      internal_monologue_style: `Cynical, self-aware, darkly humorous observations about ${mascot.personality.primary.join(', ')} tendencies`,
      dialogue_examples: [
        `"${mascot.tagline}"`,
        // Add character-specific dialogue samples
      ]
    };
  }

  // Save backstory to file
  async saveBackstory(mascotKey) {
    const backstory = this.generateBackstory(mascotKey);
    const filename = `${mascotKey}_backstory_${Date.now()}.json`;
    const filepath = path.join(this.outputDir, filename);
    
    await fs.writeJson(filepath, backstory, { spaces: 2 });
    
    // Also create a readable markdown version
    const markdownContent = this.formatAsMarkdown(backstory);
    const markdownPath = path.join(this.outputDir, `${mascotKey}_backstory_${Date.now()}.md`);
    await fs.writeFile(markdownPath, markdownContent);
    
    return { json: filepath, markdown: markdownPath };
  }

  formatAsMarkdown(backstory) {
    return `# ${backstory.title}

**Character:** ${backstory.mascot}  
**Generated:** ${new Date(backstory.timestamp).toLocaleString()}

## Origin Story
${backstory.content.origin}

## The Turning Point
${backstory.content.turning_point}

## The Downward Spiral
${backstory.content.downward_spiral}

## Current State
${backstory.content.current_state}

## Daily Routine
${backstory.content.daily_routine}

## Deepest Fears
${backstory.content.deepest_fears}

## Hidden Shame
${backstory.content.hidden_shame}

## Last Good Day
${backstory.content.last_good_day}

## Image Generation Prompts

### Portrait
${backstory.image_prompts.portrait}

### Origin Scene
${backstory.image_prompts.origin_scene}

### Current Lifestyle
${backstory.image_prompts.current_lifestyle}

### Interaction Scene
${backstory.image_prompts.interaction_scene}

---
*Generated by iongiveafuq Storytelling Agent*
`;
  }

  // Generate all mascot backstories
  async generateAllBackstories() {
    const results = {};
    const mascotKeys = Object.keys(MASCOTS);
    
    console.log(`Generating backstories for ${mascotKeys.length} mascots...`);
    
    for (const key of mascotKeys) {
      console.log(`Generating backstory for ${key}...`);
      results[key] = await this.saveBackstory(key);
    }
    
    console.log('All backstories generated successfully!');
    return results;
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new BackstoryGenerator();
  
  const args = process.argv.slice(2);
  if (args.length === 0) {
    // Generate all backstories
    generator.generateAllBackstories().catch(console.error);
  } else {
    // Generate specific mascot backstory
    const mascotKey = args[0].toLowerCase();
    generator.saveBackstory(mascotKey)
      .then(result => {
        console.log(`Backstory generated for ${mascotKey}:`);
        console.log(`JSON: ${result.json}`);
        console.log(`Markdown: ${result.markdown}`);
      })
      .catch(console.error);
  }
}

export default BackstoryGenerator;
