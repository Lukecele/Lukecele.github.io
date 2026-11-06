# Luca Celebrano Research Landing

Static, dependency-free research portfolio for Vercel. It presents current
research, publications, software systems, Hugging Face demos and previous Web3
engineering work without mixing the personal portfolio with any thesis codebase.

## Local preview

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>.

The site is intentionally static: no backend, tracking scripts or build step is
required. The service worker, manifest, metadata, Open Graph card, sitemap and
robots file are included for PWA, SEO and social sharing.
