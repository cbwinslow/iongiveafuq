# Jira Integration & Project Sync Workflow

## Overview
This guide documents how to integrate the ION Give A Fuq project with Jira, push project details and tasks, and repeat the process for future projects.

---

## 1. Prerequisites
- Access to your Jira Cloud site: https://cloudcurio.atlassian.net
- Jira project created (e.g., "iongiveafuq")
- Jira API token (generate at https://id.atlassian.com/manage-profile/security/api-tokens)
- Your Jira email address

---

## 2. Project Details to Sync
- **Project:** ION Give A Fuq
- **Description:**
  - Dark humor, character-driven merch and digital content brand
  - Interactive React website (Vite, Tailwind, Framer Motion)
  - Animated mascots, story-driven e-commerce, and video content
  - Full launch plan, business model, and technical roadmap
- **Repository Links:**
  - GitHub: [add your repo URL]
  - GitLab: [add your repo URL]
- **Key Roadmap Phases:**
  - Foundation: React app, design system, asset prep
  - Hero & Landing: Animated hero, mascot interactions, tier showcase
  - Storyline Timeline: Interactive timeline, episode previews, merch integration
  - Integration & Polish: Shopify, CMS, analytics, optimization
- **Next Steps / Tasks:**
  - Fill mascot component placeholders
  - Import real mascot artwork
  - Build cart & Stripe checkout
  - Harden backend & add Postgres schema
  - Configure Caddy/Let’s Encrypt
  - Add/expand tests, CI, and e2e
  - Launch social media and marketing campaigns
- **Recommendations:**
  - Add CI step to run build and tests
  - Use "type": "module" in frontend
  - Add README in artwork folder
  - Reference artwork dynamically
  - Ensure asset paths are valid in CI

---

## 3. Automate Task Creation in Jira

### Bash Script Example
Replace the variables with your Jira details and API token.

```bash
#!/bin/bash
JIRA_BASE_URL="https://cloudcurio.atlassian.net"
JIRA_PROJECT_KEY="ION" # Replace with your actual project key
JIRA_EMAIL="your-email@domain.com"
JIRA_API_TOKEN="your-jira-api-token"

TASKS=(
  "Fill mascot component placeholders"
  "Import real mascot artwork"
  "Build cart & Stripe checkout"
  "Harden backend & add Postgres schema"
  "Configure Caddy/Let’s Encrypt"
  "Add/expand tests, CI, and e2e"
  "Launch social media and marketing campaigns"
)

for TASK in "${TASKS[@]}"; do
  curl -s -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
    -X POST \
    --data "{\n      \"fields\": {\n        \"project\": { \"key\": \"$JIRA_PROJECT_KEY\" },\n        \"summary\": \"$TASK\",\n        \"issuetype\": { \"name\": \"Task\" }\n      }\n    }" \
    -H "Content-Type: application/json" \
    "$JIRA_BASE_URL/rest/api/3/issue"
done
```

---

## 4. Repeat for Future Projects
- Copy this file and update project details as needed.
- Use the script to bulk-create tasks in any new Jira project.
- Add additional fields (description, labels, etc.) as needed in the script JSON.

---

## 5. References
- [Jira Cloud REST API Docs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
- [Generate Jira API Token](https://id.atlassian.com/manage-profile/security/api-tokens)

---

*Last updated: 2025-06-18*
