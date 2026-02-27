# Research Portfolio

A project-centric technical research portfolio for an AI Research Scientist. Built with **Hugo** (extended), designed for **GitHub Pages**. Not a blog or resume site — it showcases end-to-end systems work (RL agents, LLM systems, evaluation pipelines).

## Features

- **Homepage**: Name, tagline, “Selected Systems” grid (3 project cards), short bio, links (GitHub, Google Scholar, CV).
- **Projects**: Technical project pages with structured sections (Problem, System design, Implementation, Experiments, Results, Takeaways), TOC, and shortcodes (figure, video, code, callout).
- **Research**: Publications list grouped by year (title, authors, venue, paper/code/poster links).
- **Writing**: Technical articles with equations (KaTeX) and diagrams.
- **About**: Short bio, research interests, education, CV download.
- **Design**: Minimal, white background (dark mode toggle), large typography, centered content, responsive.
- **Tech**: MathJax/KaTeX, syntax highlighting, SEO/OpenGraph, anchor links for headings.

## Prerequisites

- **Hugo Extended** (required for asset pipeline). Install:
  - macOS: `brew install hugo` or [download the extended .pkg](https://github.com/gohugoio/hugo/releases).
  - Linux: `sudo apt install hugo-extended` or download the extended binary from the [releases page](https://github.com/gohugoio/hugo/releases).

## Local development

1. Clone the repo and go to the project root:
   ```bash
   cd /path/to/portfolio
   ```

2. Start the Hugo server (drafts and future posts included):
   ```bash
   hugo server --buildDrafts
   ```

3. Open [http://localhost:1313](http://localhost:1313). The site will live-reload on file changes.

4. Build for production (output in `public/`):
   ```bash
   hugo --minify
   ```

## Adding a project

1. Create a new project page:
   ```bash
   hugo new projects/my-new-project.md
   ```

2. Edit `content/projects/my-new-project.md`. Use the archetype sections:
   - **Problem**, **Why the problem is hard**, **System design**, **Architecture diagram**, **Implementation details**, **Experiments**, **Results**, **Failure cases / debugging insights**, **Takeaways**.

3. Set front matter:
   - `description`: One sentence for cards and SEO.
   - `thumbnail`: Path to image (e.g. `/images/my-project.png`).
   - `tags`: e.g. `[RL, Agents, LLM, Robustness]`.
   - `featured: true` to show the project in the homepage “Selected Systems” grid.
   - `toc: true` for a table of contents on the page.

4. Use shortcodes in the body:
   - `{{< figure src="/images/diagram.png" caption="Caption." >}}`
   - `{{< video id="YOUTUBE_VIDEO_ID" >}}`
   - `{{< code lang="python" title="Optional title" >}}...{{< /code >}}`
   - `{{< callout type="note" title="Title" >}}...{{< /callout >}}` (types: note, tip, warning).

## Adding a publication

1. Create a new research entry:
   ```bash
   hugo new research/2024-my-paper.md
   ```

2. Set front matter:
   - `title`, `date` (e.g. `2024-06-01`), `authors`, `venue`
   - `paper_url`, `code_url`, `poster_url` (optional).

The Research page lists all items under `content/research/` grouped by year.

## Adding a technical article

1. Create a new writing piece:
   ```bash
   hugo new writing/my-article.md
   ```

2. Set `math: true` in front matter if you use LaTeX (e.g. `$$...$$` or `$...$`).

3. Use the same shortcodes as projects (figure, code, callout).

## Deploying to GitHub Pages

### Option A: Publish from the `public` folder (e.g. `gh-pages` branch)

1. Build the site:
   ```bash
   hugo --minify
   ```

2. Push the contents of `public/` to a branch named `gh-pages` (or use the `github-pages` deploy action). If your repo is `https://github.com/USER/portfolio`, set in `hugo.toml`:
   ```toml
   baseURL = 'https://USER.github.io/portfolio/'
   ```

3. In the repo **Settings → Pages**, set “Source” to the branch that contains the built site (e.g. `gh-pages`) and the root folder.

### Option B: GitHub Actions (recommended)

1. Create `.github/workflows/hugo.yml`:

   ```yaml
   name: Deploy Hugo to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
           with:
             submodules: recursive
         - name: Setup Hugo
           uses: peaceiris/actions-hugo@v2
           with:
             hugo-version: "0.157.0"
             extended: true
         - name: Build
           run: hugo --minify
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v4
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./public
   ```

2. Set `baseURL` in `hugo.toml` to `https://USER.github.io/portfolio/` (or your custom domain).

3. Push to `main`; the workflow will build and deploy to GitHub Pages.

## Configuration

Edit `hugo.toml` at the project root:

- **baseURL**: Must match your site URL (e.g. `https://everywhereuser007-stack.github.io/portfolio/`).
- **params**: `name`, `tagline`, `bio_short`, `github`, `google_scholar`, `cv_pdf` (path to your CV file in `static/`).

Put your CV file in `static/` (e.g. `static/cv.pdf`) and set `cv_pdf = "/cv.pdf"`.

## Project structure

```
content/
  _index.md           # Home (layout-driven)
  projects/           # Project pages
    _index.md
    example-rl-agent.md
    ...
  research/           # Publications (list by year)
    _index.md
    example-paper.md
  writing/            # Technical articles
    _index.md
    example-article.md
  about/
    _index.md         # About page
themes/research-portfolio/   # Theme (layouts, shortcodes, assets)
static/images/        # Images (placeholders included)
archetypes/           # Templates for hugo new
```

## License

Use and modify as you like. Replace example content and config with your own.
