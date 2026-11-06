<div align="center">

# Caverna di Luca

**Medicina · Bioinformatica · Oncologia computazionale**

[![Live on Vercel](https://img.shields.io/badge/Live-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://lukecele-research.vercel.app/)
[![PWA](https://img.shields.io/badge/PWA-Installable-60d9c5?style=for-the-badge)](https://lukecele-research.vercel.app/)
[![GitHub](https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Lukecele/lukecele-research)

<p>
  <a href="https://lukecele-research.vercel.app/">Apri il portfolio di ricerca ↗</a>
</p>

</div>

## Cos'è

Un portfolio statico e veloce per **Luca Celebrano**, studente di medicina e
tesi in bioinformatica al **TIGEM**. Presenta manoscritti attuali, sistemi open
source di oncologia computazionale, strumenti di spatial omics, risorse
interattive Hugging Face e il precedente lavoro di ingegneria Web3.

Il portfolio è volutamente separato da qualsiasi codebase di tesi o repository
istituzionale di analisi. È un indice personale di ricerca e software, non un
sistema di supporto alle decisioni cliniche.

## Sezioni

- **Ricerca e pubblicazioni** — il manoscritto per Scientific Reports e il
  preprint traslazionale su Research Square.
- **Sistemi di ricerca** — Spatial Continuum Oncology, InSituGame,
  InSituVision-AI, Spatial Oncology Master e studi collegati.
- **Laboratorio interattivo** — digital twin, simulatori e dataset pubblici
  di ricerca su Hugging Face.
- **Formazione clinica** — MedTerminal Cardio-Toracico.
- **Lavoro ingegneristico precedente** — Arbitrage Inception e sistemi DeFi
  open source.
- **Missioni laterali** — easter egg interattivi originali, citazioni video e
  musica opzionale nella Caverna di Luca.

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
