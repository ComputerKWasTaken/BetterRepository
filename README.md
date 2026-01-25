# BetterRepository

<p align="center">
  <img src="public/betterrepository_logo.png" alt="BetterRepository Logo" width="80" height="80">
</p>

<p align="center">
  <strong>A curated collection of AI Instructions, Plot Components, Story Cards, and Scripts for AI Dungeon.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#credits">Credits</a>
</p>

---

## Overview

BetterRepository is a community-driven resource hub for AI Dungeon players and scenario creators. Find the perfect AI Instructions, templates, story cards, and scripts to enhance your adventures, all in one place.

**No fuss. No hassle. All seamless.**

## Features

- **AI Instructions** - Curated rules and guidelines for AI behavior, writing style, and narrative control
- **Plot Components** - Author's Notes, Plot Essentials, and Story Summary templates
- **Story Cards** - Pre-made character, location, faction, and item cards
- **Scripts** - Custom scripts and automation for advanced users
- **Smart Search** - Find exactly what you need with powerful filtering
- **Local Preferences** - Your favorites and settings saved via cookies

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/BetterRepository.git
cd BetterRepository
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to deploy to any static hosting provider.

## Project Structure

```
BetterRepository/
├── public/                 # Static assets
│   └── favicon.svg
├── src/
│   ├── components/         # Vue components
│   │   ├── layout/         # Layout components (Sidebar, etc.)
│   │   └── ui/             # Reusable UI components
│   ├── composables/        # Vue composables (usePreferences)
│   ├── data/               # Data files (repository content)
│   ├── pages/              # Page components
│   │   ├── HomePage.vue
│   │   ├── AIInstructionsPage.vue
│   │   ├── PlotComponentsPage.vue
│   │   ├── StoryCardsPage.vue
│   │   ├── ScriptsPage.vue
│   │   └── ContributePage.vue
│   ├── router/             # Vue Router configuration
│   ├── styles/             # Global styles
│   ├── App.vue             # Root component
│   └── main.js             # Application entry
├── core/                   # Original repository data
├── design/                 # Design assets and theme
├── index.html              # HTML entry point
├── package.json
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md
```

## Tech Stack

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vue Router](https://router.vuejs.org/)** - Official router for Vue.js
- **[Lucide Icons](https://lucide.dev/)** - Beautiful & consistent icons
- **[js-cookie](https://github.com/js-cookie/js-cookie)** - Cookie handling for preferences

## Contributing

I welcome contributions from the AI Dungeon community! Whether you have AI Instructions, templates, story cards, or scripts to share, I'd love to include them.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute.

### Quick Contribution Methods

1. **Discord** - Share in the AI Dungeon Discord community channels
2. **GitHub** - Submit a pull request with your contributions
3. **Direct Submission** - Use our submission form (coming soon)

## Credits

BetterRepository is heavily inspired by:
- **[OffMetaGamer's AI Instructions Repository](https://docs.google.com/document/d/1na9MeTcx0QY6MkZdQSkFQFL91sT8BSiJ_6gxrC5sNEU)** - The original comprehensive AI Instructions document
- **BetterDungeon** - My browser extension for AI Dungeon that inspired the UI/UX design for coherency across my various projects

### Community Contributors

A huge thank you to everyone who has contributed instructions, templates, and feedback to make this resource possible.

- **OffMetaGamer** - For creating the original comprehensive AI Instructions document
- **The AI Dungeon Community** - For sharing their knowledge and creativity

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ for the AI Dungeon community
</p>
