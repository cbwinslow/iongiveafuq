/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

function readIfExists(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function hasLineMatching(text, regex) {
  if (!text) return false;
  return text.split(/\r?\n/).some((line) => regex.test(line));
}

describe('Documentation integrity for iongiveafuq project (as per diff)', () => {
  // Candidate files where the diff content could live:
  const docsCandidates = [
    'README.md',
    'docs/landing-page.md',
    'docs/site-index.md',
    'context.md',
    // Fallback: some projects place docs in docs/index or similar.
    'docs/README.md'
  ];

  const presentDocs = docsCandidates.filter((p) => exists(p));
  const combinedText = presentDocs.map((p) => `#FILE:${p}\n` + readIfExists(p)).filter(Boolean).join('\n\n');

  test('At least one top-level docs file exists for validation', () => {
    expect(presentDocs.length).toBeGreaterThan(0);
  });

  describe('Repository layout section', () => {
    test('Mentions backend and frontend directories in a code block', () => {
      // Look for lines "backend/" and "frontend/" as listed in the diff
      const hasBackendLine = hasLineMatching(combinedText, /^\s*backend\/\s+Express API service/i);
      const hasFrontendLine = hasLineMatching(combinedText, /^\s*frontend\/\s+React \+ Vite web app/i);
      // Allow either direct code block lines or simple mentions
      const mentionsBackend = hasBackendLine || /backend\/\s*Express API service/i.test(combinedText);
      const mentionsFrontend = hasFrontendLine || /frontend\/\s*React \+ Vite web app/i.test(combinedText);

      expect(mentionsBackend).toBe(true);
      expect(mentionsFrontend).toBe(true);
    });

    test('Mentions mascot reference and context docs', () => {
      expect(/# Mascot Character Reference Guide\.md/i.test(combinedText)).toBe(true);
      expect(/context\.md/i.test(combinedText)).toBe(true);
    });
  });

  describe('Running locally instructions', () => {
    test('Frontend dev server commands are present and correct', () => {
      const hasCd = /(^|\n)\s*cd\s+frontend\s*($|\n)/i.test(combinedText);
      const hasNpmInstall = /(^|\n)\s*npm\s+install\s*($|\n)/i.test(combinedText);
      const hasNpmRunDev = /(^|\n)\s*npm\s+run\s+dev\s*(#.*)?($|\n)/i.test(combinedText);
      expect(hasCd).toBe(true);
      expect(hasNpmInstall).toBe(true);
      expect(hasNpmRunDev).toBe(true);
      // Often mentions http://localhost:5173
      expect(/http:\/\/localhost:5173/i.test(combinedText)).toBe(true);
    });

    test('Backend API run commands are present and correct', () => {
      const hasCd = /(^|\n)\s*cd\s+backend\s*($|\n)/i.test(combinedText);
      const hasNpmInstall = /(^|\n)\s*npm\s+install\s*($|\n)/i.test(combinedText);
      const hasNpmStart = /(^|\n)\s*npm\s+start\s*(#.*)?($|\n)/i.test(combinedText);
      expect(hasCd).toBe(true);
      expect(hasNpmInstall).toBe(true);
      expect(hasNpmStart).toBe(true);
      // Mentions http://localhost:4000
      expect(/http:\/\/localhost:4000/i.test(combinedText)).toBe(true);
    });

    test('Docker compose instructions are documented with expected ports', () => {
      expect(/docker\s+compose\s+up\s+-d\s+--build/i.test(combinedText)).toBe(true);
      expect(/web:\s*http:\/\/localhost\s*\(port\s*80\)/i.test(combinedText)).toBe(true);
      expect(/api:\s*http:\/\/localhost:4000/i.test(combinedText)).toBe(true);
    });

    test('One-click deploy script is mentioned with .env instructions', () => {
      expect(/\.\/scripts\/one_click_deploy\.sh/i.test(combinedText)).toBe(true);
      expect(/cp\s+\.env\.example\s+\.env/i.test(combinedText)).toBe(true);
      // Mentions Cloudflare tokens and variables such as PORT / VITE_API_URL
      expect(/Cloudflare tokens/i.test(combinedText)).toBe(true);
      expect(/\bPORT\b/i.test(combinedText)).toBe(true);
      expect(/\bVITE_API_URL\b/i.test(combinedText)).toBe(true);
    });
  });

  describe('Deployment and CI/CD references', () => {
    test('Mentions GitHub Actions workflow path', () => {
      expect(/\.github\/workflows\/ci\.yml/i.test(combinedText)).toBe(true);
    });

    test('Mentions GHCR and SSH deploy to server', () => {
      // Generalized check for GHCR push and SSH deploy
      const mentionsGHCR = /push(?:es)?\s+.*\s+GHCR/i.test(combinedText) || /\bGHCR\b/.test(combinedText);
      const mentionsSSH = /\bSSH\b.*\bdeploy/i.test(combinedText) || /SSH\s+deploys/i.test(combinedText);
      expect(mentionsGHCR || mentionsSSH).toBe(true);
    });
  });

  describe('Features section', () => {
    test('Mentions animated landing page, navbar, and Express API health endpoint', () => {
      expect(/Animated landing page/i.test(combinedText)).toBe(true);
      expect(/Navbar/i.test(combinedText)).toBe(true);
      expect(/\/api\/health/i.test(combinedText)).toBe(true);
    });

    test('Mentions Dockerfiles and example GitHub workflow', () => {
      expect(/Dockerfiles/i.test(combinedText)).toBe(true);
      expect(/Example GitHub workflow/i.test(combinedText)).toBe(true);
    });
  });

  describe('Mascots and assets references', () => {
    test('Mentions frontend/src/components/mascots path and Dumbo mascot', () => {
      expect(/frontend\/src\/components\/mascots\//i.test(combinedText)).toBe(true);
      expect(/\bDumbo\b/i.test(combinedText)).toBe(true);
    });

    test('If mascots directory exists, it contains descriptive text files', () => {
      const mascotsDir = path.join('frontend', 'src', 'components', 'mascots');
      if (!exists(mascotsDir)) {
        // Skip if directory doesn't exist; document why
        console.warn('Mascots directory not found, skipping content checks.');
        return;
      }
      const files = fs.readdirSync(mascotsDir);
      const txtFiles = files.filter((f) => f.toLowerCase().endsWith('.txt') || f.toLowerCase().endsWith('.md'));
      expect(txtFiles.length).toBeGreaterThan(0);
    });
  });

  describe('Further information and contributing sections', () => {
    test('Mentions context.md as deeper dive', () => {
      expect(/The `?context\.md`? file/i.test(combinedText)).toBe(true);
    });

    test('Contributing section includes steps to install deps and run tests in both frontend and backend', () => {
      expect(/We welcome pull requests/i.test(combinedText)).toBe(true);
      expect(/npm install --prefix frontend/i.test(combinedText)).toBe(true);
      expect(/npm install --prefix backend/i.test(combinedText)).toBe(true);
      expect(/npm test --prefix frontend/i.test(combinedText)).toBe(true);
      expect(/npm test --prefix backend/i.test(combinedText)).toBe(true);
    });

    test('Mentions maintaining DIFF_*.md and RECOMMENDATIONS_*.md logs', () => {
      const mentionsDiff = /DIFF_.*\.md/i.test(combinedText);
      const mentionsRecs = /RECOMMENDATIONS_.*\.md/i.test(combinedText);
      expect(mentionsDiff || mentionsRecs).toBe(true);
    });
  });

  describe('Referenced docs exist where possible', () => {
    test('If referenced, landing-page.md and site-index.md should exist (soft check)', () => {
      // Only enforce existence if they are referenced in the combined text
      const referencesLanding = /docs\/landing-page\.md/i.test(combinedText);
      const referencesIndex = /docs\/site-index\.md/i.test(combinedText);

      const landingExists = exists(path.join('docs', 'landing-page.md'));
      const siteIndexExists = exists(path.join('docs', 'site-index.md'));

      if (referencesLanding) {
        expect(landingExists).toBe(true);
      }
      if (referencesIndex) {
        expect(siteIndexExists).toBe(true);
      }
    });
  });

  describe('Link-like strings basic validation', () => {
    test('No obviously malformed http links in docs files', () => {
      // Basic heuristic: lines with "http" should match http(s)://host...
      const badLinks = [];
      const httpLines = combinedText.split(/\r?\n/).filter((l) => /http/i.test(l));
      httpLines.forEach((line) => {
        const urls = line.match(/https?:\/\/[^\s)]+/gi) || [];
        // If "http" appears but no URL matched, it's suspicious
        if (/http/i.test(line) && urls.length === 0) {
          badLinks.push(line.trim());
        }
      });
      // Allow zero bad links
      expect(badLinks).toEqual([]);
    });
  });
});