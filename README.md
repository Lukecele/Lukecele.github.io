<div align="center">

# Luca's Cave

**Medicina · Bioinformatica · Oncologia computazionale**

[![Website](https://img.shields.io/badge/🌐_Official_Site-lucacelebrano.me-60d9c5?style=for-the-badge)](https://lucacelebrano.me/)
[![PWA](https://img.shields.io/badge/PWA-Installable-blue?style=for-the-badge)](https://lucacelebrano.me/)
[![GitHub](https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Lukecele/Lukecele.github.io)

<p>
  <a href="https://lucacelebrano.me/">Apri il portfolio di ricerca (lucacelebrano.me) ↗</a>
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
- **Missioni laterali** — easter egg interattivi originali, citazioni video
  italiane da Tolkien, Naruto, Disney, Harry Potter e Dragon Ball, più musica
  opzionale in Luca's Cave.

## Technical profile

This is a static site with a minimal npm bundle step:

- semantic HTML;
- custom responsive CSS;
- small vanilla JavaScript layer bundled with esbuild;
- Google Analytics (GA4) & Google Tag Manager telemetry with custom event click streaming;
- Web App Manifest and service worker;
- Open Graph and Twitter metadata;
- JSON-LD `Person` structured data;
- `robots.txt` and XML sitemap;
- generated PNG/SVG social and app icons;
- no backend or database required.

The interface is designed for keyboard navigation, reduced motion preferences,
mobile screens and large desktop displays. Audio is opt-in and never starts
automatically.

## Local preview

Install dependencies and build the browser bundle:

```bash
npm install
npm run build
python3 -m http.server 4173
```

Open <http://localhost:4173>.

## Deployment

The production deployment is hosted statically on GitHub Pages with custom domain:

**[lucacelebrano.me](https://lucacelebrano.me/)**

Continuous deployment triggers automatically on push to the `main` branch.

## Updating the portfolio

Most content is in [`index.html`](./index.html), visual tokens and responsive
rules are in [`styles.css`](./styles.css), and the interactive layer is in
[`app.js`](./app.js). Update links and publication status there, then push to
`main`; GitHub Pages redeploys automatically.

## License

The portfolio source is provided for personal and educational use. Research
software, manuscripts, trademarks and linked third-party resources retain the
licenses and terms of their respective repositories.
