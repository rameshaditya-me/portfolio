# Clarity site (blank)

Static portfolio built on the [Clarity](https://shikun.io/projects/clarity) template.

## Edit

- **Homepage:** `index.html`
- **Styles / scripts:** `assets/`, `clarity/`
- **Full template examples:** `minimal.html`, `clarity.html`

## Preview locally

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/pages.yml`) publishes the repository root (including `index.html`) to GitHub Pages.

In the repo **Settings → Pages**, set **Source** to **GitHub Actions**.
