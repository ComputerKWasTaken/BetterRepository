# Contributing to BetterRepository

First off, thank you for considering contributing to BetterRepository! It's people like you that make this resource valuable for the entire AI Dungeon community.

## Table of Contents

- [What I Accept](#what-i-accept)
- [How to Contribute](#how-to-contribute)
- [Submission Guidelines](#submission-guidelines)
- [Contribution Format](#contribution-format)
- [Code Contributions](#code-contributions)
- [Questions?](#questions)

---

## What I Accept

I welcome contributions in the following categories:

### AI Instructions
- Complete instruction sets for specific AI models
- Individual instructions for specific behaviors
- Anti-repetition and writing style rules
- Character and NPC behavior guidelines
- Coherence and consistency rules
- Gameplay and control modifiers

### Plot Components
- Author's Note templates
- Plot Essentials templates
- Story Summary formats
- Character sheet templates
- Relationship tracking templates
- World state templates

### Story Cards
- Character cards with full personality profiles
- Location cards with detailed descriptions
- Faction and organization cards
- Item and artifact cards
- Creature and monster cards

### Scripts
- Game system scripts (dice, combat, probability)
- Tracking systems (time, inventory, relationships)
- Magic and ability systems
- Output formatting scripts
- Utility and helper scripts

---

## How to Contribute

There are several ways to contribute to BetterRepository:

### Option 1: Discord (Easiest)

1. Join the [AI Dungeon Discord](https://discord.gg/aidungeon)
2. Share your contributions in the appropriate community channels
3. Tag me for review (if you're interesting in adding it to the repository)
4. Quality submissions will be added to the repository

### Option 2: GitHub Pull Request (Preferred for Code)

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/yourusername/BetterRepository.git
   ```
3. **Create a branch** for your contribution:
   ```bash
   git checkout -b add-my-contribution
   ```
4. **Add your contribution** following the format guidelines below
5. **Commit** your changes:
   ```bash
   git commit -m "Add: [Brief description of your contribution]"
   ```
6. **Push** to your fork:
   ```bash
   git push origin add-my-contribution
   ```
7. **Open a Pull Request** on GitHub with a clear description

### Option 3: Issue Submission

If you're not comfortable with Git, you can:
1. Open an [Issue](https://github.com/yourusername/BetterRepository/issues) on GitHub
2. Use the "Contribution Submission" template
3. Paste your contribution in the issue body
4. A maintainer will review and add it for you

---

## Submission Guidelines

Please ensure your contributions meet these criteria:

### ✅ Do

- **Test your contributions** - Make sure they work as intended in AI Dungeon
- **Include clear descriptions** - Explain what it does, when to use it, and any requirements
- **Specify compatible models** - Note which AI models work best (or if it's universal)
- **Credit original authors** - If adapting existing work, credit the original creator
- **Keep it focused** - One contribution per submission (unless it's a related set)
- **Use proper formatting** - Follow the format templates below

### ❌ Don't

- Submit untested content
- Submit duplicate content (check if it already exists)
- Submit content that violates AI Dungeon's Terms of Service
- Submit content that promotes harm or is inappropriate
- Submit copyrighted content without permission
- Submit low-effort or joke submissions

---

## Contribution Format

When adding content to the repository data files, use this format:

### AI Instructions Format

```javascript
{
  id: 'unique-kebab-case-id',
  name: 'Human Readable Name',
  category: 'category-id', // e.g., 'writing-style', 'characterization', etc.
  tags: ['tag1', 'tag2', 'tag3'],
  models: ['Model Name'], // Optional: specific models, or omit for universal
  description: 'Brief one-line description of what this does.',
  purpose: 'More detailed explanation of when and why to use this.',
  content: `The actual instruction content goes here.
- Use proper formatting
- Keep it clear and concise`
}
```

### Template Format (for Plot Components)

```javascript
{
  id: 'template-name',
  name: 'Template Display Name',
  category: 'templates',
  placement: 'authors-note', // or 'plot-essentials', 'story-summary'
  tags: ['template', 'placement-type'],
  description: 'What this template is for.',
  purpose: 'Detailed usage instructions.',
  content: `[Template content here]
Field: [User fills this in]
Another Field: [Instructions]`
}
```

### Category IDs

Use these category IDs when contributing:

| ID | Category |
|---|---|
| `complete-sets` | Complete AI Instruction Sets |
| `writing-style` | Writing Style & Prose |
| `characterization` | Character Behavior |
| `coherence` | Story Coherence |
| `gameplay` | Gameplay & Control |
| `world-setting` | World & Setting |
| `templates` | Templates |
| `formatting` | Formatting & Output |

---

## Code Contributions

If you're contributing to the codebase itself (bug fixes, features, etc.):

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Make your changes
5. Test thoroughly
6. Submit a pull request

### Code Style

- Use Vue 3 Composition API with `<script setup>`
- Follow existing code patterns and naming conventions
- Use Tailwind CSS for styling
- Keep components focused and reusable
- Add comments for complex logic
- Test on multiple screen sizes

### Commit Messages

Use clear, descriptive commit messages:

```
Add: New feature or content
Fix: Bug fix
Update: Improvements to existing features
Remove: Removed features or content
Refactor: Code refactoring
Docs: Documentation updates
Style: Formatting, styling changes
```

---

## Questions?

- **Discord**: Join the AI Dungeon community Discord
- **GitHub Issues**: Open an issue for questions or discussions
- **Pull Request Comments**: Ask questions directly in your PR

---

## Recognition

All contributors are recognized in the repository. Your username/name will be credited alongside your contributions.

Thank you for helping make BetterRepository better for everyone! 🎉
