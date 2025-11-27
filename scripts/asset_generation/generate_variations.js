#!/usr/bin/env node
// Batch prompt helper for Veo 3, Wan 2.2, Sora, or any HTTP image/video generator.
// Uses Node 18+ fetch; set GEN_API_URL and GEN_API_KEY env vars to run.

import fs from 'fs';
import path from 'path';

const apiUrl = process.env.GEN_API_URL;
const apiKey = process.env.GEN_API_KEY;
const model = process.env.GEN_MODEL || 'wan-2.2';

const characters = ['Dumbo', 'Rizzo', 'Buzz', 'Patty LaHam', 'Scrapz'];
const styles = ['synthwave neon', 'comic inked', 'toy photography', 'cinematic storyboard'];
const seeds = [101, 202, 303, 404];

const outDir = path.join(process.cwd(), 'artwork', 'renders');
fs.mkdirSync(outDir, { recursive: true });

if (!apiUrl || !apiKey) {
  console.warn('GEN_API_URL and GEN_API_KEY not set; running in dry-run mode.');
}

const promptFor = (character, style) =>
  `${character} hero shot, ${style}, volumetric lighting, crisp details, 4k`;

async function generate() {
  for (const character of characters) {
    for (const style of styles) {
      for (const seed of seeds) {
        const prompt = promptFor(character, style);
        const payload = {
          model,
          prompt,
          seed,
          output_format: 'png',
          aspect_ratio: '16:9',
        };

        const filename = `${character.toLowerCase().replace(/\s+/g, '-')}_${style
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/gi, '')}_seed-${seed}.png`;
        const targetPath = path.join(outDir, filename);

        if (!apiUrl || !apiKey) {
          fs.writeFileSync(
            targetPath.replace('.png', '.json'),
            JSON.stringify({ prompt, payload, note: 'dry-run (no API credentials)' }, null, 2)
          );
          console.log('Dry-run wrote request stub:', targetPath);
          continue;
        }

        console.log(`Requesting ${prompt} → ${filename}`);
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error('Failed request', response.status, await response.text());
          continue;
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(targetPath, buffer);
        console.log('Saved', targetPath);
      }
    }
  }
}

generate();
