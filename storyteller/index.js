#!/usr/bin/env node

import BackstoryGenerator from './generators/backstoryGenerator.js';
import EpisodeGenerator from './generators/episodeGenerator.js';
import ComicGenerator from './generators/comicGenerator.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';

class IONGiveAFuqStorytellingAgent {
  constructor() {
    this.backstoryGenerator = new BackstoryGenerator();
    this.episodeGenerator = new EpisodeGenerator();
    this.comicGenerator = new ComicGenerator();
    
    this.outputDir = './generated';
    fs.ensureDirSync(this.outputDir);
    
    console.log(chalk.cyan('🎭 ION Give A Fuq Storytelling Agent'));
    console.log(chalk.gray('Dark humor backstories and episodic content generator'));
    console.log('');
  }

  async showMainMenu() {
    const choices = [
      { name: '📖 Generate Mascot Backstories', value: 'backstories' },
      { name: '🎬 Generate Story Episodes', value: 'episodes' },
      { name: '📰 Generate Comic Strips', value: 'comics' },
      { name: '🔥 Generate Complete Content Package', value: 'package' },
      { name: '📊 View Generated Content', value: 'view' },
      { name: '🎲 Random Content Generator', value: 'random' },
      { name: '⚙️  Content Management', value: 'manage' },
      { name: '❌ Exit', value: 'exit' }
    ];

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices
      }
    ]);

    await this.handleAction(action);
  }

  async handleAction(action) {
    switch (action) {
      case 'backstories':
        await this.handleBackstoryGeneration();
        break;
      case 'episodes':
        await this.handleEpisodeGeneration();
        break;
      case 'comics':
        await this.handleComicGeneration();
        break;
      case 'package':
        await this.handleCompletePackage();
        break;
      case 'view':
        await this.handleViewContent();
        break;
      case 'random':
        await this.handleRandomGeneration();
        break;
      case 'manage':
        await this.handleContentManagement();
        break;
      case 'exit':
        console.log(chalk.yellow('Thanks for using the storytelling agent!'));
        process.exit(0);
      default:
        console.log(chalk.red('Unknown action'));
    }
    
    // Return to main menu
    console.log('');
    await this.showMainMenu();
  }

  async handleBackstoryGeneration() {
    console.log(chalk.blue('\n📖 Backstory Generation'));
    
    const { scope } = await inquirer.prompt([
      {
        type: 'list',
        name: 'scope',
        message: 'Generate backstories for:',
        choices: [
          { name: 'All mascots', value: 'all' },
          { name: 'Specific mascot', value: 'specific' },
          { name: 'Random mascot', value: 'random' }
        ]
      }
    ]);

    let results;
    
    if (scope === 'all') {
      console.log(chalk.cyan('Generating backstories for all mascots...'));
      results = await this.backstoryGenerator.generateAllBackstories();
      
      Object.entries(results).forEach(([mascot, files]) => {
        console.log(chalk.green(`✓ ${mascot}: ${files.markdown}`));
      });
      
    } else if (scope === 'specific') {
      const { mascot } = await inquirer.prompt([
        {
          type: 'list',
          name: 'mascot',
          message: 'Select mascot:',
          choices: ['dumbo', 'scrapz', 'patty', 'buzz', 'rizzo']
        }
      ]);
      
      console.log(chalk.cyan(`Generating backstory for ${mascot}...`));
      results = await this.backstoryGenerator.saveBackstory(mascot);
      console.log(chalk.green(`✓ Generated: ${results.markdown}`));
      
    } else {
      const mascots = ['dumbo', 'scrapz', 'patty', 'buzz', 'rizzo'];
      const randomMascot = mascots[Math.floor(Math.random() * mascots.length)];
      
      console.log(chalk.cyan(`Generating backstory for ${randomMascot}...`));
      results = await this.backstoryGenerator.saveBackstory(randomMascot);
      console.log(chalk.green(`✓ Generated: ${results.markdown}`));
    }
  }

  async handleEpisodeGeneration() {
    console.log(chalk.blue('\n🎬 Episode Generation'));
    
    const { count, options } = await inquirer.prompt([
      {
        type: 'number',
        name: 'count',
        message: 'How many episodes to generate?',
        default: 1,
        validate: (input) => input > 0 && input <= 10
      },
      {
        type: 'confirm',
        name: 'options',
        message: 'Customize episode options?',
        default: false
      }
    ]);

    let episodeOptions = {};
    
    if (options) {
      const customization = await inquirer.prompt([
        {
          type: 'list',
          name: 'primaryMascot',
          message: 'Primary mascot:',
          choices: [
            'random',
            'dumbo',
            'scrapz', 
            'patty',
            'buzz',
            'rizzo'
          ]
        },
        {
          type: 'list',
          name: 'episodeType',
          message: 'Episode type:',
          choices: [
            'random',
            'slice_of_life',
            'caper',
            'relationship_drama',
            'workplace_comedy',
            'mystery',
            'revenge_plot'
          ]
        },
        {
          type: 'confirm',
          name: 'includeVillain',
          message: 'Include a villain?',
          default: false
        }
      ]);
      
      if (customization.primaryMascot !== 'random') {
        episodeOptions.primaryMascot = customization.primaryMascot;
      }
      if (customization.episodeType !== 'random') {
        episodeOptions.episodeType = customization.episodeType;
      }
      episodeOptions.includeVillain = customization.includeVillain;
    }

    if (count === 1) {
      console.log(chalk.cyan('Generating episode...'));
      const episode = this.episodeGenerator.generateEpisode(episodeOptions);
      const results = await this.episodeGenerator.saveEpisode(episode);
      
      console.log(chalk.green(`✓ Generated: "${episode.title}"`));
      console.log(chalk.gray(`   Markdown: ${results.markdown}`));
      console.log(chalk.gray(`   Comic: ${results.comic}`));
    } else {
      console.log(chalk.cyan(`Generating ${count} episodes...`));
      const results = await this.episodeGenerator.generateEpisodeSeries(count);
      
      results.forEach((result, i) => {
        console.log(chalk.green(`✓ Episode ${i + 1}: "${result.episode.title}"`));
      });
    }
  }

  async handleComicGeneration() {
    console.log(chalk.blue('\n📰 Comic Generation'));
    
    const { count, customize } = await inquirer.prompt([
      {
        type: 'number',
        name: 'count',
        message: 'How many comics to generate?',
        default: 1,
        validate: (input) => input > 0 && input <= 10
      },
      {
        type: 'confirm',
        name: 'customize',
        message: 'Customize comic options?',
        default: false
      }
    ]);

    let comicOptions = {};
    
    if (customize) {
      const customization = await inquirer.prompt([
        {
          type: 'list',
          name: 'format',
          message: 'Comic format:',
          choices: [
            'random',
            'single_panel',
            'three_panel',
            'four_panel', 
            'six_panel',
            'full_page'
          ]
        },
        {
          type: 'list',
          name: 'primaryMascot',
          message: 'Primary mascot:',
          choices: [
            'random',
            'dumbo',
            'scrapz',
            'patty',
            'buzz',
            'rizzo'
          ]
        },
        {
          type: 'list',
          name: 'comicType',
          message: 'Comic type:',
          choices: [
            'random',
            'daily_struggle',
            'social_commentary',
            'relationship_humor',
            'workplace_satire',
            'existential_crisis',
            'vice_addiction'
          ]
        }
      ]);
      
      Object.entries(customization).forEach(([key, value]) => {
        if (value !== 'random') {
          comicOptions[key] = value;
        }
      });
    }

    if (count === 1) {
      console.log(chalk.cyan('Generating comic...'));
      const comic = this.comicGenerator.generateComic(comicOptions);
      const results = await this.comicGenerator.saveComic(comic);
      
      console.log(chalk.green(`✓ Generated: "${comic.title}"`));
      console.log(chalk.gray(`   Script: ${results.script}`));
      console.log(chalk.gray(`   Art Direction: ${results.art_direction}`));
    } else {
      console.log(chalk.cyan(`Generating ${count} comics...`));
      const results = await this.comicGenerator.generateComicSeries(count, comicOptions);
      
      results.forEach((result, i) => {
        console.log(chalk.green(`✓ Comic ${i + 1}: "${result.comic.title}"`));
      });
    }
  }

  async handleCompletePackage() {
    console.log(chalk.blue('\n🔥 Complete Content Package Generation'));
    console.log(chalk.gray('This will generate backstories, episodes, and comics for all mascots'));
    
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Generate complete content package? (This may take a few minutes)',
        default: true
      }
    ]);

    if (!confirm) return;

    console.log(chalk.cyan('\n📖 Generating all backstories...'));
    const backstories = await this.backstoryGenerator.generateAllBackstories();
    
    console.log(chalk.cyan('\n🎬 Generating episode series...'));
    const episodes = await this.episodeGenerator.generateEpisodeSeries(5);
    
    console.log(chalk.cyan('\n📰 Generating comic series...'));
    const comics = await this.comicGenerator.generateComicSeries(5);
    
    // Generate package summary
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
    
    console.log(chalk.green('\n✅ Complete content package generated!'));
    console.log(chalk.yellow(`📋 Package summary: ${summaryPath}`));
    console.log(chalk.gray(`   - ${packageSummary.contents.backstories} backstories`));
    console.log(chalk.gray(`   - ${packageSummary.contents.episodes} episodes`));
    console.log(chalk.gray(`   - ${packageSummary.contents.comics} comics`));
  }

  async handleViewContent() {
    console.log(chalk.blue('\n📊 View Generated Content'));
    
    const generatedDir = './generated';
    if (!await fs.pathExists(generatedDir)) {
      console.log(chalk.yellow('No generated content found.'));
      return;
    }

    const subdirs = ['backstories', 'episodes', 'comics'];
    const contentCounts = {};
    
    for (const subdir of subdirs) {
      const path = `${generatedDir}/${subdir}`;
      if (await fs.pathExists(path)) {
        const files = await fs.readdir(path);
        contentCounts[subdir] = files.filter(f => f.endsWith('.md')).length;
      } else {
        contentCounts[subdir] = 0;
      }
    }
    
    console.log(chalk.cyan('Generated Content Summary:'));
    console.log(chalk.gray(`📖 Backstories: ${contentCounts.backstories} files`));
    console.log(chalk.gray(`🎬 Episodes: ${contentCounts.episodes} files`));
    console.log(chalk.gray(`📰 Comics: ${contentCounts.comics} files`));
    
    const { viewType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'viewType',
        message: 'What would you like to view?',
        choices: [
          { name: 'Recent backstories', value: 'backstories' },
          { name: 'Recent episodes', value: 'episodes' },
          { name: 'Recent comics', value: 'comics' },
          { name: 'Package summaries', value: 'packages' }
        ]
      }
    ]);
    
    await this.showRecentFiles(viewType);
  }

  async showRecentFiles(type) {
    const path = `./generated/${type}`;
    if (!await fs.pathExists(path)) {
      console.log(chalk.yellow(`No ${type} found.`));
      return;
    }
    
    const files = await fs.readdir(path);
    const markdownFiles = files
      .filter(f => f.endsWith('.md'))
      .sort((a, b) => b.localeCompare(a)) // Sort by filename (newest first)
      .slice(0, 5); // Show last 5
    
    if (markdownFiles.length === 0) {
      console.log(chalk.yellow(`No ${type} files found.`));
      return;
    }
    
    console.log(chalk.cyan(`\nRecent ${type}:`));
    markdownFiles.forEach((file, i) => {
      console.log(chalk.gray(`${i + 1}. ${file}`));
    });
    
    const { viewFile } = await inquirer.prompt([
      {
        type: 'list',
        name: 'viewFile',
        message: 'Select file to preview:',
        choices: [
          ...markdownFiles.map(f => ({ name: f, value: f })),
          { name: 'Back to menu', value: 'back' }
        ]
      }
    ]);
    
    if (viewFile !== 'back') {
      const content = await fs.readFile(`${path}/${viewFile}`, 'utf8');
      console.log(chalk.blue(`\n--- ${viewFile} ---`));
      console.log(content.substring(0, 1000) + (content.length > 1000 ? '\n...(truncated)' : ''));
      console.log(chalk.blue(`--- End of ${viewFile} ---\n`));
    }
  }

  async handleRandomGeneration() {
    console.log(chalk.blue('\n🎲 Random Content Generator'));
    
    const generators = [
      { name: 'Random backstory', action: () => this.generateRandomBackstory() },
      { name: 'Random episode', action: () => this.generateRandomEpisode() },
      { name: 'Random comic', action: () => this.generateRandomComic() },
      { name: 'Random content mix', action: () => this.generateRandomMix() }
    ];
    
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What random content should I generate?',
        choices: generators.map(g => g.name)
      }
    ]);
    
    const generator = generators.find(g => g.name === choice);
    await generator.action();
  }

  async generateRandomBackstory() {
    const mascots = ['dumbo', 'scrapz', 'patty', 'buzz', 'rizzo'];
    const randomMascot = mascots[Math.floor(Math.random() * mascots.length)];
    
    console.log(chalk.cyan(`🎲 Generating random backstory for ${randomMascot}...`));
    const results = await this.backstoryGenerator.saveBackstory(randomMascot);
    console.log(chalk.green(`✓ Generated: ${results.markdown}`));
  }

  async generateRandomEpisode() {
    console.log(chalk.cyan('🎲 Generating random episode...'));
    const episode = this.episodeGenerator.generateEpisode();
    const results = await this.episodeGenerator.saveEpisode(episode);
    console.log(chalk.green(`✓ Generated: "${episode.title}"`));
    console.log(chalk.gray(`   Files: ${results.markdown}`));
  }

  async generateRandomComic() {
    console.log(chalk.cyan('🎲 Generating random comic...'));
    const comic = this.comicGenerator.generateComic();
    const results = await this.comicGenerator.saveComic(comic);
    console.log(chalk.green(`✓ Generated: "${comic.title}"`));
    console.log(chalk.gray(`   Files: ${results.script}`));
  }

  async generateRandomMix() {
    console.log(chalk.cyan('🎲 Generating random content mix...'));
    
    const actions = [
      () => this.generateRandomBackstory(),
      () => this.generateRandomEpisode(), 
      () => this.generateRandomComic()
    ];
    
    // Generate 2-4 random pieces of content
    const count = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < count; i++) {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      await randomAction();
    }
    
    console.log(chalk.green(`✅ Generated ${count} random pieces of content!`));
  }

  async handleContentManagement() {
    console.log(chalk.blue('\n⚙️ Content Management'));
    
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Content management options:',
        choices: [
          { name: 'Clean up old files', value: 'cleanup' },
          { name: 'Create content index', value: 'index' },
          { name: 'Export all content', value: 'export' },
          { name: 'Generate content stats', value: 'stats' }
        ]
      }
    ]);
    
    switch (action) {
      case 'cleanup':
        await this.cleanupOldFiles();
        break;
      case 'index':
        await this.createContentIndex();
        break;
      case 'export':
        await this.exportAllContent();
        break;
      case 'stats':
        await this.generateContentStats();
        break;
    }
  }

  async cleanupOldFiles() {
    console.log(chalk.cyan('🧹 Cleaning up old files...'));
    
    const { days } = await inquirer.prompt([
      {
        type: 'number',
        name: 'days',
        message: 'Delete files older than how many days?',
        default: 30,
        validate: (input) => input > 0
      }
    ]);
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const generatedDir = './generated';
    const subdirs = ['backstories', 'episodes', 'comics'];
    let deletedCount = 0;
    
    for (const subdir of subdirs) {
      const path = `${generatedDir}/${subdir}`;
      if (await fs.pathExists(path)) {
        const files = await fs.readdir(path);
        
        for (const file of files) {
          const filePath = `${path}/${file}`;
          const stats = await fs.stat(filePath);
          
          if (stats.mtime < cutoffDate) {
            await fs.remove(filePath);
            deletedCount++;
          }
        }
      }
    }
    
    console.log(chalk.green(`✓ Cleaned up ${deletedCount} old files`));
  }

  async createContentIndex() {
    console.log(chalk.cyan('📋 Creating content index...'));
    
    const index = {
      created_at: new Date().toISOString(),
      content_summary: {},
      files: {}
    };
    
    const generatedDir = './generated';
    const subdirs = ['backstories', 'episodes', 'comics'];
    
    for (const subdir of subdirs) {
      const path = `${generatedDir}/${subdir}`;
      if (await fs.pathExists(path)) {
        const files = await fs.readdir(path);
        const markdownFiles = files.filter(f => f.endsWith('.md'));
        
        index.content_summary[subdir] = markdownFiles.length;
        index.files[subdir] = markdownFiles.map(f => ({
          filename: f,
          path: `${path}/${f}`,
          created: new Date().toISOString() // Could parse from filename
        }));
      }
    }
    
    const indexPath = `${generatedDir}/content_index_${Date.now()}.json`;
    await fs.writeJson(indexPath, index, { spaces: 2 });
    
    console.log(chalk.green(`✓ Content index created: ${indexPath}`));
  }

  async exportAllContent() {
    console.log(chalk.cyan('📦 Exporting all content...'));
    
    const exportDir = `./exports/export_${Date.now()}`;
    await fs.ensureDir(exportDir);
    
    const generatedDir = './generated';
    if (await fs.pathExists(generatedDir)) {
      await fs.copy(generatedDir, exportDir);
    }
    
    console.log(chalk.green(`✓ All content exported to: ${exportDir}`));
  }

  async generateContentStats() {
    console.log(chalk.cyan('📊 Generating content statistics...'));
    
    const stats = {
      generated_at: new Date().toISOString(),
      mascot_coverage: {},
      content_types: {},
      themes_covered: [],
      total_files: 0
    };
    
    // This would analyze the generated content for patterns
    // For now, just show basic file counts
    
    const generatedDir = './generated';
    const subdirs = ['backstories', 'episodes', 'comics'];
    
    for (const subdir of subdirs) {
      const path = `${generatedDir}/${subdir}`;
      if (await fs.pathExists(path)) {
        const files = await fs.readdir(path);
        const count = files.filter(f => f.endsWith('.md') || f.endsWith('.json')).length;
        stats.content_types[subdir] = count;
        stats.total_files += count;
      }
    }
    
    const statsPath = `${generatedDir}/content_stats_${Date.now()}.json`;
    await fs.writeJson(statsPath, stats, { spaces: 2 });
    
    console.log(chalk.green('📊 Content Statistics:'));
    console.log(chalk.gray(`   Total files: ${stats.total_files}`));
    Object.entries(stats.content_types).forEach(([type, count]) => {
      console.log(chalk.gray(`   ${type}: ${count} files`));
    });
    
    console.log(chalk.green(`✓ Detailed stats saved: ${statsPath}`));
  }

  async start() {
    console.log(chalk.magenta('Welcome to the ION Give A Fuq Storytelling Agent!'));
    console.log(chalk.gray('Generate dark humor backstories, episodes, and comics for your mascots.'));
    console.log('');
    
    await this.showMainMenu();
  }
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const agent = new IONGiveAFuqStorytellingAgent();
  agent.start().catch(console.error);
}

export default IONGiveAFuqStorytellingAgent;
