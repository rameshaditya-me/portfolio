# Portfolio

Personal site inspired by [shikun.io](https://shikun.io/), with [Clarity](https://shikun.io/projects/clarity) for paper/project pages.

## Site structure

| Page | File | Purpose |
|------|------|---------|
| **Home** | `index.html` | Landing page (Hello, bio, profile) — like [shikun.io](https://shikun.io/) |
| **Research** | `research.html` | Redirects to Projects (publications list) |
| **Projects** | `projects.html` | Project list → links to Clarity paper pages |
| **About** | `about.html` | Bio + news |
| **Notebooks** | `notebooks.html` | ML/DL notebooks list → embedded via `notebook.html` |
| **Paper / project** | `project.html` | Clarity minimal layout for one paper (`?src=content/papers/….md`) |

## Edit content

- **Home & nav:** `content/home.md`
- **Sections:** `content/sections/*.md`
- **Paper pages:** `content/papers/*.md` → open via `project.html?src=content/papers/your-file.md`
- **Notebooks:** source `.ipynb` files live in [Easy-Classical-ML-DL](https://github.com/rameshaditya-me/Easy-Classical-ML-DL); list in `content/pages/notebooks.md`, config in `content/notebooks/sources.yaml`

## Notebooks

Notebooks are **not copied** into this repo. They are read from `../Easy-Classical-ML-DL` (or `EASY_ML_DL_ROOT`).

After editing a notebook in Easy-Classical-ML-DL, refresh the site HTML:

```bash
pip3 install nbconvert pyyaml
python3 scripts/nbconvert-notebooks.py
git add content/notebooks/*.html
git commit -m "Refresh notebook HTML"
```

Add a new notebook in `content/notebooks/sources.yaml`:

```yaml
  - id: your-algorithm
    source: your-folder/your-notebook.ipynb
    meta: content/notebooks/your-notebook.md
    html: content/notebooks/your-notebook.html
```

Then add matching entries in `content/pages/notebooks.md` and `content/notebooks/your-notebook.md`.

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
