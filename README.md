# Portfolio

Personal site inspired by [shikun.io](https://shikun.io/), with [Clarity](https://shikun.io/projects/clarity) for paper/project pages.

## Site structure

| Page | File | Purpose |
|------|------|---------|
| **Home** | `index.html` | Landing page (Hello, bio, profile) — like [shikun.io](https://shikun.io/) |
| **Research** | `research.html` | Redirects to Projects (publications list) |
| **Projects** | `projects.html` | Project list → links to Clarity paper pages |
| **About** | `about.html` | Bio + news |
| **Paper / project** | `project.html` | Clarity minimal layout for one paper (`?src=content/papers/….md`) |

## Edit content

- **Home & nav:** `content/home.md`
- **Sections:** `content/sections/*.md`
- **Paper pages:** `content/papers/*.md` → open via `project.html?src=content/papers/your-file.md`

## Preview

```bash
python3 -m http.server 8080
```

- Home: http://localhost:8080/
- Example paper page: http://localhost:8080/project.html?src=content/papers/example-paper.md

## Clarity TOC on paper pages

`project.html` loads `navbar.js` for the hoverable table of contents. Comment out that script to disable.

## Deploy

Push to `main` → GitHub Actions publishes the repo root. **Settings → Pages → GitHub Actions**.
