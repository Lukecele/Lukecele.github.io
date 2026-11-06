<div align="center">

# Luca Celebrano Research

**Medicine · Bioinformatics · Computational Oncology**

[![Live on Vercel](https://img.shields.io/badge/Live-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://lukecele-research.vercel.app/)
[![PWA](https://img.shields.io/badge/PWA-Installable-60d9c5?style=for-the-badge)](https://lukecele-research.vercel.app/)
[![GitHub](https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Lukecele/lukecele-research)

<p>
  <a href="https://lukecele-research.vercel.app/">Open the live research portfolio ↗</a>
</p>

</div>

## What this is

A fast, static research portfolio for **Luca Celebrano**, medical student and
bioinformatics thesis student at **TIGEM**. It presents current manuscripts,
open-source computational oncology systems, spatial-omics tools, interactive
Hugging Face resources and previous Web3 engineering work.

The portfolio is intentionally separate from any thesis codebase or
institutional analysis repository. It is a personal index of research and
software, not a clinical decision system.

## Sections

- **Research & publications** — the Scientific Reports manuscript and the
  Research Square translational preprint.
- **Research systems** — Spatial Continuum Oncology, InSituGame, InSituVision-AI,
  Spatial Oncology Master and related studies.
- **Interactive lab** — Hugging Face digital twins, simulators and public
  research datasets.
- **Clinical education** — MedTerminal Cardio-Toracico.
- **Earlier engineering work** — Arbitrage Inception and open-source DeFi
  systems.
- **Side quests** — small, original interactive easter eggs and optional
  ambient audio.

## Technical profile

This is a dependency-free static site:

- semantic HTML;
- custom responsive CSS;
- small vanilla JavaScript layer;
- Web App Manifest and service worker;
- Open Graph and Twitter metadata;
- JSON-LD `Person` structured data;
- `robots.txt` and XML sitemap;
- generated PNG/SVG social and app icons;
- no backend, database or tracking scripts.

The interface is designed for keyboard navigation, reduced motion preferences,
mobile screens and large desktop displays. Audio is opt-in and never starts
automatically.

## Local preview

No package installation or build step is required:

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>.

## Deployment

The production deployment is connected to the `main` branch on Vercel:

**[lukecele-research.vercel.app](https://lukecele-research.vercel.app/)**

To create your own Vercel deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Lukecele/lukecele-research)

Use the **Other** preset with no build command and the repository root as the
output directory.

## Updating the portfolio

Most content is in [`index.html`](./index.html), visual tokens and responsive
rules are in [`styles.css`](./styles.css), and the interactive layer is in
[`app.js`](./app.js). Update links and publication status there, then push to
`main`; Vercel redeploys automatically.

## License

The portfolio source is provided for personal and educational use. Research
software, manuscripts, trademarks and linked third-party resources retain the
licenses and terms of their respective repositories.
