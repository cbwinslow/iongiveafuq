import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import BackstoryGenerator from '../generators/backstoryGenerator.js';
import EpisodeGenerator from '../generators/episodeGenerator.js';
import ComicGenerator from '../generators/comicGenerator.js';
import GeminiContentGenerator from '../generators/geminiContentGenerator.js';
import geminiService from '../services/geminiService.js';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StorytellingWebServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    
    this.backstoryGenerator = new BackstoryGenerator();
    this.episodeGenerator = new EpisodeGenerator();
    this.comicGenerator = new ComicGenerator();
    this.geminiContentGenerator = new GeminiContentGenerator();
    this.geminiService = geminiService;
    
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, 'public')));
    
    // Error handling middleware
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
    });
  }

  setupRoutes() {
    // Health check
    this.app.get('/api/health', (req, res) => {
      res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'iongiveafuq-storytelling-agent'
      });
    });

    // Mascot information
    this.app.get('/api/mascots', async (req, res) => {
      const { MASCOTS } = await import('../data/mascots.js');
      res.json(MASCOTS);
    });

    this.app.get('/api/mascots/:mascot', async (req, res) => {
      try {
        const { MASCOTS } = await import('../data/mascots.js');
        const mascot = MASCOTS[req.params.mascot];
        if (!mascot) {
          return res.status(404).json({ error: 'Mascot not found' });
        }
        res.json(mascot);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Backstory routes
    this.app.post('/api/backstories/generate', async (req, res) => {
      try {
        const { mascot } = req.body;
        
        if (!mascot) {
          return res.status(400).json({ error: 'Mascot parameter required' });
        }

        const backstory = this.backstoryGenerator.generateBackstory(mascot);
        const files = await this.backstoryGenerator.saveBackstory(mascot);
        
        res.json({
          backstory,
          files,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/backstories/generate-all', async (req, res) => {
      try {
        const results = await this.backstoryGenerator.generateAllBackstories();
        res.json({
          results,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Episode routes
    this.app.post('/api/episodes/generate', async (req, res) => {
      try {
        const options = req.body || {};
        const episode = this.episodeGenerator.generateEpisode(options);
        const files = await this.episodeGenerator.saveEpisode(episode);
        
        res.json({
          episode,
          files,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/episodes/generate-series', async (req, res) => {
      try {
        const { count = 5 } = req.body;
        const results = await this.episodeGenerator.generateEpisodeSeries(count);
        
        res.json({
          results,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Comic routes
    this.app.post('/api/comics/generate', async (req, res) => {
      try {
        const options = req.body || {};
        const comic = this.comicGenerator.generateComic(options);
        const files = await this.comicGenerator.saveComic(comic);
        
        res.json({
          comic,
          files,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/comics/generate-series', async (req, res) => {
      try {
        const { count = 5, options = {} } = req.body;
        const results = await this.comicGenerator.generateComicSeries(count, options);
        
        res.json({
          results,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/comics/themed', async (req, res) => {
      try {
        const { theme, count = 3 } = req.body;
        
        if (!theme) {
          return res.status(400).json({ error: 'Theme parameter required' });
        }

        const results = await this.comicGenerator.generateThemedComics(theme, count);
        
        res.json({
          results,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Content management routes
    this.app.get('/api/content/list', async (req, res) => {
      try {
        const generatedDir = './generated';
        const subdirs = ['backstories', 'episodes', 'comics'];
        const content = {};
        
        for (const subdir of subdirs) {
          const dirPath = path.join(generatedDir, subdir);
          if (await fs.pathExists(dirPath)) {
            const files = await fs.readdir(dirPath);
            content[subdir] = files
              .filter(f => f.endsWith('.md') || f.endsWith('.json'))
              .map(f => ({
                filename: f,
                path: `${subdir}/${f}`,
                type: f.endsWith('.md') ? 'markdown' : 'json'
              }));
          } else {
            content[subdir] = [];
          }
        }
        
        res.json(content);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.get('/api/content/stats', async (req, res) => {
      try {
        const generatedDir = './generated';
        const subdirs = ['backstories', 'episodes', 'comics'];
        const stats = {
          generated_at: new Date().toISOString(),
          content_types: {},
          total_files: 0
        };
        
        for (const subdir of subdirs) {
          const dirPath = path.join(generatedDir, subdir);
          if (await fs.pathExists(dirPath)) {
            const files = await fs.readdir(dirPath);
            const count = files.filter(f => f.endsWith('.md') || f.endsWith('.json')).length;
            stats.content_types[subdir] = count;
            stats.total_files += count;
          } else {
            stats.content_types[subdir] = 0;
          }
        }
        
        res.json(stats);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.get('/api/content/file/:type/:filename', async (req, res) => {
      try {
        const { type, filename } = req.params;
        const filePath = path.join('./generated', type, filename);
        
        if (!await fs.pathExists(filePath)) {
          return res.status(404).json({ error: 'File not found' });
        }
        
        const content = await fs.readFile(filePath, 'utf8');
        const isJson = filename.endsWith('.json');
        
        res.json({
          filename,
          type,
          content: isJson ? JSON.parse(content) : content,
          is_json: isJson
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Complete package generation
    this.app.post('/api/package/generate', async (req, res) => {
      try {
        console.log('Generating complete content package...');
        
        const backstories = await this.backstoryGenerator.generateAllBackstories();
        const episodes = await this.episodeGenerator.generateEpisodeSeries(5);
        const comics = await this.comicGenerator.generateComicSeries(5);
        
        const packageSummary = {
          generated_at: new Date().toISOString(),
          package_id: `pkg_${Date.now()}`,
          contents: {
            backstories: Object.keys(backstories).length,
            episodes: episodes.length,
            comics: comics.length
          },
          files: {
            backstories,
            episodes: episodes.map(e => e.files),
            comics: comics.map(c => c.files)
          }
        };
        
        const summaryPath = `./generated/package_summary_${Date.now()}.json`;
        await fs.writeJson(summaryPath, packageSummary, { spaces: 2 });
        
        res.json({
          package: packageSummary,
          summary_path: summaryPath
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Random generation endpoints
    this.app.post('/api/random/backstory', async (req, res) => {
      try {
        const mascots = ['dumbo', 'scrapz', 'patty', 'buzz', 'rizzo'];
        const randomMascot = mascots[Math.floor(Math.random() * mascots.length)];
        
        const backstory = this.backstoryGenerator.generateBackstory(randomMascot);
        const files = await this.backstoryGenerator.saveBackstory(randomMascot);
        
        res.json({
          mascot: randomMascot,
          backstory,
          files,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/random/episode', async (req, res) => {
      try {
        const episode = this.episodeGenerator.generateEpisode();
        const files = await this.episodeGenerator.saveEpisode(episode);
        
        res.json({
          episode,
          files,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/random/comic', async (req, res) => {
      try {
        const comic = this.comicGenerator.generateComic();
        const files = await this.comicGenerator.saveComic(comic);
        
        res.json({
          comic,
          files,
          generated_at: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Google Gemini integration routes
    this.app.get('/api/gemini/status', (req, res) => {
      res.json({
        enabled: this.geminiService.isEnabled(),
        models: {
          imagen: 'imagen-3',
          veo: 'veo-3'
        },
        timestamp: new Date().toISOString()
      });
    });

    this.app.post('/api/gemini/image/generate', async (req, res) => {
      try {
        const options = req.body || {};
        const result = await this.geminiService.generateImage(options);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/gemini/video/generate', async (req, res) => {
      try {
        const options = req.body || {};
        const result = await this.geminiService.generateVideo(options);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/gemini/animate/episode', async (req, res) => {
      try {
        const { episodeId } = req.body;
        
        if (!episodeId) {
          return res.status(400).json({ error: 'Episode ID required' });
        }

        // Load episode from file
        const episodePath = `./generated/episodes/${episodeId}.json`;
        if (!await fs.pathExists(episodePath)) {
          return res.status(404).json({ error: 'Episode not found' });
        }

        const episode = await fs.readJson(episodePath);
        const result = await this.geminiService.animateContent(episode, 'episode');
        
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/gemini/animate/comic', async (req, res) => {
      try {
        const { comicId } = req.body;
        
        if (!comicId) {
          return res.status(400).json({ error: 'Comic ID required' });
        }

        // Load comic from file
        const comicPath = `./generated/comics/${comicId}.json`;
        if (!await fs.pathExists(comicPath)) {
          return res.status(404).json({ error: 'Comic not found' });
        }

        const comic = await fs.readJson(comicPath);
        const result = await this.geminiService.animateContent(comic, 'comic');
        
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/gemini/batch/images', async (req, res) => {
      try {
        const { prompts = [] } = req.body;
        
        if (!Array.isArray(prompts) || prompts.length === 0) {
          return res.status(400).json({ error: 'Prompts array required' });
        }

        const results = [];
        for (const promptOptions of prompts) {
          const result = await this.geminiService.generateImage(promptOptions);
          results.push(result);
        }

        res.json({
          success: true,
          generated: results.length,
          results,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Gemini content generation routes
    this.app.post('/api/gemini/generate/character-references', async (req, res) => {
      try {
        const results = await this.geminiContentGenerator.generateCharacterReferences();
        res.json({
          success: true,
          results,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/gemini/generate/character-package', async (req, res) => {
      try {
        const { mascot } = req.body;
        
        if (!mascot) {
          return res.status(400).json({ error: 'Mascot parameter required' });
        }

        const results = await this.geminiContentGenerator.generateCharacterPackage(mascot);
        res.json({
          success: true,
          results,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/gemini/generate/backstory-images', async (req, res) => {
      try {
        const { backstoryId } = req.body;
        
        if (!backstoryId) {
          return res.status(400).json({ error: 'Backstory ID required' });
        }

        // Load backstory
        const backstoryPath = `./generated/backstories/${backstoryId}.json`;
        if (!await fs.pathExists(backstoryPath)) {
          return res.status(404).json({ error: 'Backstory not found' });
        }

        const backstory = await fs.readJson(backstoryPath);
        const results = await this.geminiContentGenerator.generateBackstoryImages(backstory);
        
        res.json({
          success: true,
          results,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/gemini/generate/episode-video', async (req, res) => {
      try {
        const { episodeId } = req.body;
        
        if (!episodeId) {
          return res.status(400).json({ error: 'Episode ID required' });
        }

        // Load episode
        const episodePath = `./generated/episodes/${episodeId}.json`;
        if (!await fs.pathExists(episodePath)) {
          return res.status(404).json({ error: 'Episode not found' });
        }

        const episode = await fs.readJson(episodePath);
        const results = await this.geminiContentGenerator.generateEpisodeVideo(episode);
        
        res.json({
          success: true,
          results,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/gemini/generate/comic-animation', async (req, res) => {
      try {
        const { comicId } = req.body;
        
        if (!comicId) {
          return res.status(400).json({ error: 'Comic ID required' });
        }

        // Load comic
        const comicPath = `./generated/comics/${comicId}.json`;
        if (!await fs.pathExists(comicPath)) {
          return res.status(404).json({ error: 'Comic not found' });
        }

        const comic = await fs.readJson(comicPath);
        const results = await this.geminiContentGenerator.animateComic(comic);
        
        res.json({
          success: true,
          results,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Serve the frontend
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🎭 ION Give A Fuq Storytelling Agent running on port ${this.port}`);
      console.log(`🌐 Open http://localhost:${this.port} to access the web interface`);
    });
  }
}

// Start server if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new StorytellingWebServer();
  server.start();
}

export default StorytellingWebServer;
