# Portfolio

Personal site inspired by [shikun.io](https://shikun.io/), with [Clarity](https://shikun.io/projects/clarity) for paper/project pages.

## Site structure

| Page | File | Purpose |
|------|------|---------|
| **Home** | `index.html` | Landing page (Hello, bio, profile) — like [shikun.io](https://shikun.io/) |
| **Research** | `research.html` | Redirects to Projects (publications list) |
| **Projects** | `projects.html` | Project list → links to Clarity paper pages |
| **About** | `about.html` | Bio + news |
| **Notebooks** | `notebooks.html` | ML/DL notebooks list → links to [Easy-Classical-ML-DL](https://github.com/rameshaditya-me/Easy-Classical-ML-DL) on GitHub Pages |
| **Paper / project** | `project.html` | Clarity minimal layout for one paper (`?src=content/papers/….md`) |

## Edit content

- **Home & nav:** `content/home.md`
- **Sections:** `content/sections/*.md`
- **Paper pages:** `content/papers/*.md` → open via `project.html?src=content/papers/your-file.md`
- **Notebooks:** list in `content/pages/notebooks.md` with URLs to the rendered notebooks on [Easy-Classical-ML-DL](https://rameshaditya-me.github.io/Easy-Classical-ML-DL/)

## Notebooks

Notebooks are hosted in the [Easy-Classical-ML-DL](https://github.com/rameshaditya-me/Easy-Classical-ML-DL) repo (nbconvert → GitHub Pages). This portfolio only links to them.

To add a notebook, append an entry in `content/pages/notebooks.md`:

```yaml
  - venue: Your topic
    title: Your algorithm
    authors: "Short description"
    url: https://rameshaditya-me.github.io/Easy-Classical-ML-DL/notebooks/your-folder/your-notebook/
```

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
