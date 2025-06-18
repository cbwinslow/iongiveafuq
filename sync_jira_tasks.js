// sync_jira_tasks.js
// Usage: node sync_jira_tasks.js
// Requires: axios (install with `npm install axios`)

const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

// === CONFIGURATION ===
const JIRA_BASE_URL = 'https://cloudcurio.atlassian.net';
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY || 'ION';
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const TASKS_FILE = './jira_tasks.json';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

if (!JIRA_EMAIL || !JIRA_API_TOKEN) {
  console.error('Error: JIRA_EMAIL and JIRA_API_TOKEN environment variables must be set.');
  process.exit(1);
}

async function getExistingJiraSummaries() {
  const issues = [];
  let startAt = 0;
  let total = 1;
  while (startAt < total) {
    const res = await axios.get(
      `${JIRA_BASE_URL}/rest/api/3/search`,
      {
        params: {
          jql: `project=${JIRA_PROJECT_KEY}`,
          fields: 'summary',
          startAt,
          maxResults: 50
        },
        auth: { username: JIRA_EMAIL, password: JIRA_API_TOKEN }
      }
    );
    total = res.data.total;
    issues.push(...res.data.issues.map(i => i.fields.summary));
    startAt += 50;
  }
  return new Set(issues);
}

async function createJiraIssue(summary, description = undefined) {
  let attempt = 0;
  while (attempt < MAX_RETRIES) {
    try {
      await axios.post(
        `${JIRA_BASE_URL}/rest/api/3/issue`,
        {
          fields: {
            project: { key: JIRA_PROJECT_KEY },
            summary,
            issuetype: { name: 'Task' },
            ...(description ? { description } : {})
          }
        },
        {
          auth: { username: JIRA_EMAIL, password: JIRA_API_TOKEN },
          headers: { 'Content-Type': 'application/json' }
        }
      );
      return true;
    } catch (e) {
      attempt++;
      if (attempt >= MAX_RETRIES) {
        console.error(`Failed to create Jira issue: ${summary}`);
        if (e.response) {
          console.error('Status:', e.response.status, e.response.statusText);
          console.error('Response:', JSON.stringify(e.response.data));
        } else {
          console.error(e.message);
        }
        return false;
      } else {
        console.warn(`Retrying (${attempt}/${MAX_RETRIES}) for: ${summary}`);
        await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
      }
    }
  }
}

async function main() {
  let tasks;
  try {
    tasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
  } catch (e) {
    console.error('Failed to read or parse jira_tasks.json:', e.message);
    process.exit(1);
  }
  const existing = await getExistingJiraSummaries();
  const created = [], skipped = [], failed = [];
  for (const task of tasks) {
    let summary, description;
    if (typeof task === 'string') {
      summary = task;
    } else if (typeof task === 'object' && task.summary) {
      summary = task.summary;
      description = task.description;
    } else {
      console.warn('Skipping invalid task entry:', task);
      continue;
    }
    if (!existing.has(summary)) {
      console.log(`Creating Jira issue: ${summary}`);
      const ok = await createJiraIssue(summary, description);
      if (ok) created.push(summary); else failed.push(summary);
    } else {
      console.log(`Already exists in Jira: ${summary}`);
      skipped.push(summary);
    }
  }
  console.log('\nSync complete.');
  console.log('Created:', created.length);
  console.log('Skipped (already exists):', skipped.length);
  if (failed.length) {
    console.log('Failed:', failed.length, failed);
  }
}

main().catch(e => {
  if (e.response) {
    console.error('Fatal error:', e.response.status, e.response.statusText);
    console.error('Response:', JSON.stringify(e.response.data, null, 2));
  } else {
    console.error('Fatal error:', e.message);
  }
  process.exit(1);
});
