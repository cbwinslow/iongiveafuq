#!/usr/bin/env node

/**
 * Comic Illustration & Animation Generator
 * 
 * Generates illustrated comic panels and animates them into cartoon format
 * using Google Gemini Imagen 3 for illustrations and Veo 3 for animations.
 * Uses the character reference library for consistency.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { MASCOTS, STORY_ELEMENTS } from './data/mascots.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const USE_MOCK = !GOOGLE_API_KEY;

if (USE_MOCK) {
  console.log(chalk.yellow('⚠️  Running in MOCK mode - set GOOGLE_API_KEY for real generation'));
}

const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;

/**
 * Comic templates with complete storylines
 */
const COMIC_TEMPLATES = [
  {
    title: "Dumbo's Job Interview",
    mascot: 'dumbo',
    format: 'four_panel',
    theme: 'Good intentions, terrible execution',
    panels: [
      {
        scene: 'Dumbo sitting on couch preparing for job interview',
        dialogue: 'Dumbo: "Today\'s the day. I\'m gonna nail this interview."',
        action: 'Dumbo looking at laptop with determination',
        mood: 'hopeful but delusional'
      },
      {
        scene: 'Dumbo arriving 3 hours late, disheveled',
        dialogue: 'Interviewer: "The interview was at 9 AM. It\'s noon."\nDumbo: "I thought traffic would be lighter..."',
        action: 'Dumbo standing in doorway looking confused',
        mood: 'awkward realization'
      },
      {
        scene: 'During interview, Dumbo scrolling phone',
        dialogue: 'Interviewer: "What makes you qualified for this position?"\nDumbo: "Uh... sorry, what?"',
        action: 'Dumbo not paying attention, looking at phone',
        mood: 'complete lack of awareness'
      },
      {
        scene: 'Dumbo back on couch with pizza',
        dialogue: 'Dumbo: "They weren\'t looking for someone with my skills anyway."',
        action: 'Dumbo eating pizza, unemployment letter visible',
        mood: 'defeated acceptance'
      }
    ]
  },
  {
    title: "Scrapz's Caring Moment",
    mascot: 'scrapz',
    format: 'three_panel',
    theme: 'The Day Scrapz Gave a Shit',
    panels: [
      {
        scene: 'Scrapz in alley smoking, notices injured kitten',
        dialogue: 'Scrapz: "Not my problem."',
        action: 'Scrapz walking past, cigarette in mouth',
        mood: 'deliberately indifferent'
      },
      {
        scene: 'Scrapz looking back at kitten in rain',
        dialogue: 'Scrapz: "...Shit."',
        action: 'Scrapz stopped, looking over shoulder',
        mood: 'internal conflict'
      },
      {
        scene: 'Scrapz holding kitten under jacket, still smoking',
        dialogue: 'Scrapz: "This doesn\'t mean I care."',
        action: 'Scrapz walking away with kitten, trying to look tough',
        mood: 'reluctant caring'
      }
    ]
  },
  {
    title: "Buzz's Bar Philosophy",
    mascot: 'buzz',
    format: 'three_panel',
    theme: 'Misery loves company',
    panels: [
      {
        scene: 'Buzz at bar with other drinkers',
        dialogue: 'Buzz: "You know what the secret to life is?"',
        action: 'Buzz swaying with beer bottle raised',
        mood: 'drunken wisdom incoming'
      },
      {
        scene: 'Close-up of Buzz looking philosophical',
        dialogue: 'Buzz: "Lower your expectations... then lower them again."',
        action: 'Buzz pointing with beer bottle',
        mood: 'profound drunk insight'
      },
      {
        scene: 'Everyone at bar toasting',
        dialogue: 'All: "Cheers to that!"',
        action: 'Group of drunks raising glasses',
        mood: 'shared dysfunction celebration'
      }
    ]
  },
  {
    title: "Patty's Fabulous Problem",
    mascot: 'patty',
    format: 'four_panel',
    theme: 'The system is rigged',
    panels: [
      {
        scene: 'Patty getting ready for performance',
        dialogue: 'Patty: "Tonight, I\'m going to slay!"',
        action: 'Patty applying makeup dramatically',
        mood: 'confident and fabulous'
      },
      {
        scene: 'Patty on stage, crowd looks unimpressed',
        dialogue: 'Crowd: "*silence*"',
        action: 'Patty mid-performance, awkward silence',
        mood: 'confidence wavering'
      },
      {
        scene: 'Patty backstage looking defeated',
        dialogue: 'Patty: "They just don\'t get art..."',
        action: 'Patty sitting in chair removing makeup',
        mood: 'vulnerable moment'
      },
      {
        scene: 'Patty walking out in full glam anyway',
        dialogue: 'Patty: "Their loss. I\'m still fabulous."',
        action: 'Patty strutting out with head high',
        mood: 'resilient confidence'
      }
    ]
  },
  {
    title: "Rizzo's Survival Tip",
    mascot: 'rizzo',
    format: 'single_panel',
    theme: 'False hope is the cruelest hope',
    panels: [
      {
        scene: 'Rizzo lying dramatically near poison bottle',
        dialogue: 'Rizzo: "The key to survival? Set the bar so low that just waking up is an achievement."',
        action: 'Rizzo in classic defeated pose',
        mood: 'dark wisdom'
      }
    ]
  }
];

/**
 * Generate comic illustrations
 */
async function generateComicIllustrations(comicTemplate) {
  console.log(chalk.cyan(`\n🎨 Generating illustrations for: ${comicTemplate.title}\n`));

  const outputDir = path.join(__dirname, 'generated', 'comic-illustrations', 
    comicTemplate.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
  await fs.ensureDir(outputDir);

  const comic = {
    ...comicTemplate,
    generatedAt: new Date().toISOString(),
    illustrations: []
  };

  for (let i = 0; i < comicTemplate.panels.length; i++) {
    const panel = comicTemplate.panels[i];
    const panelNum = i + 1;
    
    console.log(chalk.blue(`  Panel ${panelNum}/${comicTemplate.panels.length}: ${panel.scene}`));

    // Generate detailed prompt using character references
    const characterPrompt = MASCOTS[comicTemplate.mascot]?.promptDetails || comicTemplate.mascot;
    const prompt = `Comic book panel illustration: ${panel.scene}. ${panel.action}. ${characterPrompt}. Dark humor comic book style with gritty urban cyberpunk aesthetic, neon accents, detailed linework, professional comic book quality. Panel shows: ${panel.dialogue}. Mood: ${panel.mood}. High quality digital comic art.`;

    try {
      if (USE_MOCK) {
        const illustration = {
          panel: panelNum,
          filename: `panel_${panelNum}.png`,
          scene: panel.scene,
          dialogue: panel.dialogue,
          prompt,
          status: 'mock'
        };
        comic.illustrations.push(illustration);
        
        // Create mock file
        const mockPath = path.join(outputDir, illustration.filename);
        await fs.writeFile(mockPath, `MOCK COMIC PANEL ${panelNum}\n${panel.scene}\n${panel.dialogue}`);
        console.log(chalk.gray(`    ✓ Mock created`));
      } else {
        // Real generation with Imagen 3
        const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });
        
        const result = await model.generateContent({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.8,
            responseModalities: ['image']
          }
        });

        const illustration = {
          panel: panelNum,
          filename: `panel_${panelNum}.png`,
          scene: panel.scene,
          dialogue: panel.dialogue,
          prompt,
          status: 'generated'
        };

        if (result.response?.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
          const imageBase64 = result.response.candidates[0].content.parts[0].inlineData.data;
          const imageBuffer = Buffer.from(imageBase64, 'base64');
          const imagePath = path.join(outputDir, illustration.filename);
          await fs.writeFile(imagePath, imageBuffer);
          console.log(chalk.green(`    ✓ Generated`));
        }

        comic.illustrations.push(illustration);
      }
    } catch (error) {
      console.error(chalk.red(`    ✗ Error: ${error.message}`));
      comic.illustrations.push({
        panel: panelNum,
        filename: `panel_${panelNum}.png`,
        scene: panel.scene,
        dialogue: panel.dialogue,
        status: 'failed',
        error: error.message
      });
    }
  }

  // Save comic metadata
  const metadataPath = path.join(outputDir, 'comic.json');
  await fs.writeJson(metadataPath, comic, { spaces: 2 });

  // Generate comic strip HTML for viewing
  await generateComicHTML(comic, outputDir);

  console.log(chalk.green(`\n✓ Comic illustrated: ${comicTemplate.title}`));
  console.log(chalk.gray(`  Location: ${outputDir}\n`));

  return comic;
}

/**
 * Animate comic into cartoon format
 */
async function animateComic(comic, outputDir) {
  console.log(chalk.cyan(`\n🎬 Animating comic: ${comic.title}\n`));

  // Create animation script
  const animationScript = {
    title: comic.title,
    duration: comic.panels.length * 5, // 5 seconds per panel
    scenes: comic.panels.map((panel, i) => ({
      panel: i + 1,
      duration: 5,
      illustration: `panel_${i + 1}.png`,
      dialogue: panel.dialogue,
      action: panel.action,
      transitions: i < comic.panels.length - 1 ? 'fade' : 'none'
    }))
  };

  try {
    if (USE_MOCK) {
      console.log(chalk.gray('  Mock animation - creating animation script'));
      const animPath = path.join(outputDir, 'animation.json');
      await fs.writeJson(animPath, animationScript, { spaces: 2 });
      console.log(chalk.gray(`  ✓ Animation script created`));
    } else {
      // Real animation with Veo 3
      const model = genAI.getGenerativeModel({ model: 'veo-3.0-generate-001' });
      
      const videoPrompt = `Animate comic strip "${comic.title}" with ${comic.panels.length} panels. ${comic.theme}. Each panel should be displayed for 5 seconds with smooth transitions. Include dialogue overlays. Dark humor cyberpunk aesthetic with neon effects. Professional cartoon animation quality.`;

      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [{ text: videoPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          responseModalities: ['video']
        }
      });

      if (result.response?.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const videoBase64 = result.response.candidates[0].content.parts[0].inlineData.data;
        const videoBuffer = Buffer.from(videoBase64, 'base64');
        const videoPath = path.join(outputDir, 'animated.mp4');
        await fs.writeFile(videoPath, videoBuffer);
        console.log(chalk.green(`  ✓ Animation generated: animated.mp4`));
      }
    }

    // Save animation script
    const scriptPath = path.join(outputDir, 'animation.json');
    await fs.writeJson(scriptPath, animationScript, { spaces: 2 });
  } catch (error) {
    console.error(chalk.red(`  ✗ Animation error: ${error.message}`));
  }

  console.log(chalk.green(`✓ Animation complete\n`));
}

/**
 * Generate HTML viewer for comic
 */
async function generateComicHTML(comic, outputDir) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${comic.title}</title>
  <style>
    body {
      background: #1a1a1a;
      color: #fff;
      font-family: 'Courier New', monospace;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: #ff4ecd;
      text-align: center;
      text-shadow: 0 0 10px #ff4ecd;
    }
    .comic-info {
      background: #2a2a2a;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .panels {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .panel {
      background: #2a2a2a;
      border: 2px solid #39ff14;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
    }
    .panel img {
      width: 100%;
      border-radius: 4px;
      background: #333;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialogue {
      margin-top: 10px;
      padding: 10px;
      background: #1a1a1a;
      border-left: 3px solid #3bf7ff;
      font-style: italic;
    }
    .scene {
      color: #39ff14;
      font-size: 0.9em;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>🎨 ${comic.title}</h1>
  
  <div class="comic-info">
    <p><strong>Format:</strong> ${comic.format}</p>
    <p><strong>Theme:</strong> ${comic.theme}</p>
    <p><strong>Mascot:</strong> ${comic.mascot}</p>
    <p><strong>Generated:</strong> ${new Date(comic.generatedAt).toLocaleString()}</p>
  </div>

  <div class="panels">
    ${comic.illustrations.map((ill, i) => `
      <div class="panel">
        <h3>Panel ${ill.panel}</h3>
        <img src="${ill.filename}" alt="Panel ${ill.panel}" 
             onerror="this.innerHTML='<div style=\\'padding:50px;text-align:center\\'>Panel ${ill.panel}<br/>${ill.status === 'mock' ? 'Mock' : 'Loading...'}</div>'" />
        <div class="scene">${ill.scene}</div>
        <div class="dialogue">${ill.dialogue.replace(/\n/g, '<br/>')}</div>
      </div>
    `).join('')}
  </div>

  <div style="margin-top: 40px; text-align: center; color: #666;">
    <p>ION Give A Fuq - Comic Generator</p>
  </div>
</body>
</html>`;

  const htmlPath = path.join(outputDir, 'index.html');
  await fs.writeFile(htmlPath, html);
}

/**
 * Generate all comics
 */
async function generateAllComics(withAnimation = false) {
  console.log(chalk.cyan.bold('\n═══════════════════════════════════════════════════════════'));
  console.log(chalk.cyan.bold('  ION Give A Fuq - Comic Illustration Generator'));
  console.log(chalk.cyan.bold('═══════════════════════════════════════════════════════════\n'));

  const results = [];

  for (const template of COMIC_TEMPLATES) {
    try {
      const comic = await generateComicIllustrations(template);
      
      if (withAnimation) {
        const outputDir = path.join(__dirname, 'generated', 'comic-illustrations', 
          template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        await animateComic(comic, outputDir);
      }
      
      results.push({ title: template.title, status: 'success' });
    } catch (error) {
      console.error(chalk.red(`❌ Failed ${template.title}: ${error.message}`));
      results.push({ title: template.title, status: 'failed', error: error.message });
    }
  }

  console.log(chalk.cyan.bold('\n═══════════════════════════════════════════════════════════'));
  console.log(chalk.green.bold('  ✓ Comic Generation Complete!'));
  console.log(chalk.cyan.bold('═══════════════════════════════════════════════════════════\n'));
  console.log(chalk.white(`Total comics: ${COMIC_TEMPLATES.length}`));
  console.log(chalk.white(`Successful: ${results.filter(r => r.status === 'success').length}`));
  console.log(chalk.white(`Failed: ${results.filter(r => r.status === 'failed').length}\n`));
}

// CLI Interface
const args = process.argv.slice(2);
const command = args[0];

if (command === 'all') {
  const withAnimation = args.includes('--animate');
  generateAllComics(withAnimation).catch(console.error);
} else if (command === 'animate') {
  const comicIndex = parseInt(args[1]) || 0;
  if (COMIC_TEMPLATES[comicIndex]) {
    generateComicIllustrations(COMIC_TEMPLATES[comicIndex])
      .then(comic => {
        const outputDir = path.join(__dirname, 'generated', 'comic-illustrations', 
          COMIC_TEMPLATES[comicIndex].title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        return animateComic(comic, outputDir);
      })
      .catch(console.error);
  } else {
    console.error(chalk.red('Invalid comic index'));
  }
} else {
  console.log(chalk.cyan.bold('\n═══════════════════════════════════════════════════════════'));
  console.log(chalk.cyan.bold('  ION Give A Fuq - Comic Illustration Generator'));
  console.log(chalk.cyan.bold('═══════════════════════════════════════════════════════════\n'));
  console.log(chalk.white('Usage:'));
  console.log(chalk.yellow('  node generate_comic_illustrations.js all           # Generate all comics'));
  console.log(chalk.yellow('  node generate_comic_illustrations.js all --animate # Generate and animate'));
  console.log(chalk.yellow('  node generate_comic_illustrations.js animate <n>   # Animate comic by index\n'));
  console.log(chalk.white('Available comics:'));
  COMIC_TEMPLATES.forEach((t, i) => {
    console.log(chalk.yellow(`  ${i}. ${t.title} (${t.format}, ${t.panels.length} panels)`));
  });
  console.log();
}

export { generateComicIllustrations, animateComic, COMIC_TEMPLATES };
