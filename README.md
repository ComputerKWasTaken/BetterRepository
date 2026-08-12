# BetterRepository

<p align="center">
  <img src="public/betterrepository_logo.png" alt="BetterRepository Logo" width="80" height="80">
</p>

<p align="center">
  <strong>AI Dungeon Resource Hub</strong><br>
  A curated collection of AI Instructions, Plot Components, Story Cards, Scripts, and Guides.<br>
  Everything you need to craft <span style="color: #4ade80">better adventures</span>.
</p>

<p align="center">
  <a href="#what-you-can-find">What's Here</a> •
  <a href="#want-to-contribute">Contribute</a> •
  <a href="https://betterrepository.netlify.app/credits">Credits</a> •
  <a href="#for-developers">For Developers</a>
</p>

---

## What You Can Find

| Resource | Description |
|----------|-------------|
| **AI Instructions** | Rules and guidelines for AI behavior, writing style, and narrative control. |
| **Plot Components** | Author's Notes, Plot Essentials, and Story Summary templates. |
| **Story Cards** | Templates for Story Cards, including characters, locations, factions, abilities, and more. |
| **Scripts** | JavaScript examples for game systems, tracking, and automation. |
| **Guides** | Public walkthroughs for AI Dungeon systems, BetterDungeon, and Ultrascripts. |

Published resources are **free**, **tested**, and **ready to copy-paste** into your adventures.

## V1.7

V1.7 refreshes the site around the released BetterDungeon V2 baseline:

- polished navigation, global search, and responsive layouts;
- thirteen documented Story Card command presets backed by the public seed data;
- refreshed guides for all nine shipped Ultrascripts modules;
- byte-aligned Enhanced and Required templates with working copy and download controls.

Stateboy appears only as an **unpublished preview**. Its public copy and download
controls remain disabled until the dedicated Stateboy release stage.

---

## Want to Contribute?

**You don't need to know how to code.** If you've made something cool for AI Dungeon, I'd love to add it!

### The Easy Way

1. **Go to [better-repository.netlify.app/contribute](https://better-repository.netlify.app/contribute)**
2. **Fill out the form** by pasting your content (AI Instruction, Story Card, Script, etc.) and tell me what it does
3. **Hit submit** with no account needed
4. Done! I'll review it and add it to the collection.

You can also share in the **[AI Dungeon Discord](https://discord.gg/aidungeon)** and ping me.

> 📖 See [CONTRIBUTING.md](CONTRIBUTING.md) for more details and formatting tips.

---

## For Developers

<details>
<summary>Click to expand technical details</summary>

### Tech Stack

- **Vue 3** + **Vite** for fast, modern frontend
- **Tailwind CSS** for utility-first styling
- **Vue Router** for client-side routing
- **Lucide Icons** for clean iconography

### Quick Start

```bash
# Clone and install
git clone https://github.com/ComputerKWasTaken/BetterRepository.git
cd BetterRepository
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
├── components/     # Reusable UI components
├── data/           # Repository content (instructions, cards, etc.)
├── pages/          # Main page views
├── composables/    # Vue composables
├── router/         # Route definitions
└── styles/         # Global CSS
```

</details>

---

## License

Open source under the [MIT License](LICENSE).

## Support

BetterRepository is free and open source. If it has helped you build better adventures and you would like to support BetterRepository, BetterDungeon, and my other projects, visit my [Ko-fi page](https://ko-fi.com/computerk).

<p align="center">
  Made with ❤️ by <strong>computerK</strong> for the AI Dungeon community
</p>
