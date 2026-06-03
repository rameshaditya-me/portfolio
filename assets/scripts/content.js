(function () {
  const HOME_PATH = "content/home.md?v=2";
  const HERO_BUTTON_STYLE =
    "background-color: rgba(255, 255, 255, 0.25); margin-bottom: 0;";

  const PAGE = document.body.dataset.page || "landing";
  const PAPER_SOURCE = document.body.dataset.source;

  const NOTEBOOKS_PATH = "content/pages/notebooks.md";

  const PAGE_CONTENT = {
    about: "content/pages/about.md",
    projects: "content/pages/projects.md",
    research: "content/pages/projects.md",
    notebooks: NOTEBOOKS_PATH,
  };

  const ICONS = {
    linkedin: "fa-brands fa-linkedin",
    github: "fa-brands fa-github",
    scholar: "fa-brands fa-google-scholar",
    x: "fa-brands fa-x-twitter",
    paper: "fa-regular fa-file-lines",
    code: "fa-solid fa-code",
    email: "fa-regular fa-envelope",
  };

  const WIDTHS = ["main", "large", "extra-large", "extra-extra-large", "max"];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function parseFrontMatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      return { meta: {}, body: raw.trim() };
    }
    return {
      meta: jsyaml.load(match[1]) || {},
      body: match[2].trim(),
    };
  }

  function linkButton(link) {
    const iconClass = ICONS[link.icon] || "fa-regular fa-link";
    const label = escapeHtml(link.label || "Link");
    const url = escapeHtml(link.url || "#");
    return (
      `<a href="${url}" class="button icon" style="${HERO_BUTTON_STYLE}"` +
      ` rel="noopener noreferrer">${label} <i class="${iconClass}"></i></a>`
    );
  }

  function renderTopNav(meta) {
    const navItems = meta.nav || [];
    const social = meta.nav_social || [];

    const linksHtml = navItems
      .map((item) => {
        const isActive =
          item.page === PAGE ||
          (item.page === "notebooks" && PAGE === "notebook");
        const active = isActive ? " active" : "";
        const href = escapeHtml(resolveContentPath(item.href || "#"));
        return `<li><a href="${href}" class="${active.trim()}"${
          active ? ' aria-current="page"' : ""
        }>${escapeHtml(item.label || "")}</a></li>`;
      })
      .join("");

    const socialHtml = social
      .map((item) => {
        const iconClass = ICONS[item.icon] || "fa-regular fa-link";
        return (
          `<li><a href="${escapeHtml(item.url || "#")}" aria-label="${escapeHtml(item.label || "")}"` +
          ` rel="noopener noreferrer"><i class="${iconClass}"></i></a></li>`
        );
      })
      .join("");

    return `
      <nav class="shikun-topnav" aria-label="Main">
        <div class="shikun-topnav-inner">
          <ul class="shikun-topnav-links">${linksHtml}</ul>
          <ul class="shikun-topnav-social">${socialHtml}</ul>
        </div>
      </nav>`;
  }

  function renderSiteFooter() {
    return `<div class="shikun-site-footer">Made with ♥ · <a href="https://shikun.io/projects/clarity">Clarity</a></div>`;
  }

  function renderLanding(meta) {
    const greeting = escapeHtml(meta.greeting || "Hello 👋");
    const intro = escapeHtml(meta.intro || `I am ${meta.name || ""},`);
    const role = escapeHtml(meta.role || meta.affiliation || "");
    const tagline = escapeHtml(meta.tagline || meta.abstract || "");
    const readMore = meta.read_more || { label: "Read More", href: "about.html" };
    const profileImage = escapeHtml(
      meta.profile_image || "assets/figures/clarity.png"
    );

    return `
      <div class="shikun-landing-inner">
        <div class="shikun-landing-text">
          <h1>${greeting}</h1>
          <p class="shikun-intro">${intro}<br>${role}</p>
          <p class="shikun-tagline"><em>${tagline}</em></p>
          <a class="shikun-read-more" href="${escapeHtml(readMore.href || "about.html")}">${escapeHtml((readMore.label || "Read More").toUpperCase())}<span aria-hidden="true"> |→</span></a>
        </div>
        <div class="shikun-profile">
          <img src="${profileImage}" alt="${escapeHtml(meta.name || "Profile")}">
        </div>
      </div>`;
  }

  /** Clarity project hero — dark bg + blog-title white */
  function plainAuthors(meta) {
    const raw = meta.description || meta.authors || meta.affiliation || "";
    return String(raw).replace(/\*\*([^*]+)\*\*/g, "$1");
  }

  function renderHero(meta) {
    const title = escapeHtml(meta.title || meta.name || "");
    const author = escapeHtml(plainAuthors(meta));
    const abstract = escapeHtml(meta.abstract || "");
    const links = (meta.links || []).map(linkButton).join("&nbsp;&nbsp;");
    const linksBlock = links
      ? `<div class="info"><div>${links}</div></div>`
      : "";
    const subtitle = meta.subtitle
      ? `<div class="info"><p>${escapeHtml(meta.subtitle)}</p></div>`
      : "";

    const useCover = meta.hero_cover !== false;
    const titleClass = useCover ? "blog-title white" : "blog-title no-cover white";
    const coverImage = escapeHtml(
      meta.cover_image || "assets/figures/clarity.png"
    );
    const coverHtml = useCover
      ? `<div class="blog-cover">
            <img class="foreground" src="${coverImage}" alt="">
            <img class="background" src="${coverImage}" alt="">
          </div>`
      : "";

    return `
      <div class="${titleClass}">
        <div class="blog-intro">
          <div>
            <h1 class="title">${title}</h1>
            <p class="author">${author}</p>
            <p class="abstract">${abstract}</p>
          </div>
          ${linksBlock}
          ${subtitle}
        </div>
        ${coverHtml}
      </div>`;
  }

  function markdownToHtml(md) {
    const html = marked.parse(md || "", { gfm: true });
    return html
      .replace(/<p>/g, '<p class="text">')
      .replace(/<table>/g, '<table class="text">');
  }

  function renderAboutPage(meta) {
    const heading = escapeHtml(meta.page_heading || "About Me");
    const blocks = (meta.sections || [])
      .map(
        (sec) => `
      <div class="shikun-about-block">
        <p class="shikun-about-label">${escapeHtml(sec.label || "")}</p>
        <div class="shikun-about-body">${markdownToHtml(sec.body || "")}</div>
      </div>`
      )
      .join("");

    return `<div class="shikun-page"><h1 class="shikun-page-title">${heading}</h1>${blocks}</div>`;
  }

  function srcFromUrl(url, prefix) {
    if (!url || typeof url !== "string") return null;
    const match = url.match(/[?&]src=([^&]+)/);
    if (match) return decodeURIComponent(match[1]);
    if (url.startsWith(prefix) && url.endsWith(".md")) return url;
    return null;
  }

  function paperSrcFromUrl(url) {
    return srcFromUrl(url, "content/papers/");
  }

  function notebookSrcFromUrl(url) {
    return srcFromUrl(url, "content/notebooks/");
  }

  async function resolveProjectCover(project) {
    const fallback = project.cover_image || project.image;
    const src = paperSrcFromUrl(project.url);
    if (!src) {
      return { ...project, cover_image: fallback };
    }
    try {
      const raw = await loadMarkdown(src);
      const { meta } = parseFrontMatter(raw);
      return { ...project, cover_image: meta.cover_image || fallback };
    } catch (err) {
      console.warn("Could not load cover for", src, err);
      return { ...project, cover_image: fallback };
    }
  }

  async function resolveFeaturedCovers(featured) {
    return Promise.all((featured || []).map(resolveProjectCover));
  }

  function renderProjectCard(project) {
    const border = escapeHtml(project.border_color || "#cccccc");
    const imgPath = project.cover_image || project.image || "assets/figures/clarity.png";
    const imgUrl = escapeHtml(resolveContentPath(imgPath));
    const url = escapeHtml(project.url || "#");
    const title = escapeHtml(project.title || "");
    const subtitle = escapeHtml(project.subtitle || "");
    const badge = project.badge
      ? `<span class="shikun-project-badge">${escapeHtml(project.badge)}</span>`
      : "";

    return `
      <a class="shikun-project-card" href="${url}">
        <div class="shikun-project-thumb" style="--project-border: ${border}; background-image: url('${imgUrl}')" role="img" aria-label="${title}"></div>
        <h2 class="shikun-project-title">${title} ${badge}</h2>
        <p class="shikun-project-subtitle">${subtitle}</p>
      </a>`;
  }

  function publicationUrl(pub) {
    if (pub.url) return pub.url;
    const link = (pub.links || [])[0];
    return link ? link.url : null;
  }

  function renderPublication(pub) {
    const venue = escapeHtml(pub.venue || "");
    const titleText = pub.title || "";
    const href = publicationUrl(pub);
    const titleHtml = href
      ? `<a class="shikun-pub-title-link" href="${escapeHtml(href)}">${escapeHtml(titleText)}</a>`
      : escapeHtml(titleText);
    const authorsHtml = String(pub.authors || "").replace(
      /\*\*([^*]+)\*\*/g,
      (_, name) => `<strong>${escapeHtml(name)}</strong>`
    );

    return `
      <div class="shikun-pub">
        <p class="shikun-pub-venue">${venue}</p>
        <div>
          <p class="shikun-pub-title">${titleHtml}</p>
          <p class="shikun-pub-authors">${authorsHtml}</p>
        </div>
      </div>
      <hr class="shikun-pub-divider">`;
  }

  function renderProjectsPage(meta) {
    const heading = escapeHtml(meta.page_heading || "Projects");
    const intro = markdownToHtml(meta.intro || "");
    const grid = (meta.featured || []).map(renderProjectCard).join("");
    const pubs = (meta.publications || []).map(renderPublication).join("");

    return `
      <div class="shikun-page">
        <h1 class="shikun-page-title">${heading}</h1>
        <div class="shikun-projects-intro">${intro}</div>
        <div class="shikun-project-grid">${grid}</div>
        <h2 class="shikun-pubs-heading">Selected Publications</h2>
        <hr class="shikun-pubs-rule">
        <div class="shikun-pubs-list">${pubs}</div>
      </div>`;
  }

  function renderNotebooksPage(meta) {
    const heading = escapeHtml(meta.page_heading || "Notebooks");
    const intro = markdownToHtml(meta.intro || "");
    const items = (meta.notebooks || []).map(renderPublication).join("");

    return `
      <div class="shikun-page">
        <h1 class="shikun-page-title">${heading}</h1>
        <div class="shikun-projects-intro">${intro}</div>
        <div class="shikun-pubs-list">${items}</div>
      </div>`;
  }

  function notebookLinkButton(link) {
    const iconClass = ICONS[link.icon] || "fa-regular fa-link";
    const label = escapeHtml(link.label || "Link");
    const url = escapeHtml(link.url || "#");
    return (
      `<a href="${url}" class="button icon shikun-notebook-link-btn" rel="noopener noreferrer">` +
      `${label} <i class="${iconClass}"></i></a>`
    );
  }

  function notebookEmbedUrl(meta) {
    if (meta.html_path) return resolveContentPath(meta.html_path);
    if (meta.ipynb_path) {
      return resolveContentPath(meta.ipynb_path.replace(/\.ipynb$/i, ".html"));
    }
    return resolveContentPath("content/notebooks/linear-regression.html");
  }

  function notebookFallbackUrl(meta) {
    const colab = (meta.links || []).find((link) =>
      String(link.url || "").includes("colab.research.google.com")
    );
    if (colab) return colab.url;
    const github = (meta.links || []).find((link) => link.icon === "github");
    if (github) return github.url;
    return "https://github.com/rameshaditya-me/Easy-Classical-ML-DL";
  }

  function getNotebookSource() {
    const params = new URLSearchParams(window.location.search);
    const querySrc = params.get("src");
    if (querySrc) return querySrc;
    return "content/notebooks/linear-regression.md";
  }

  function renderNotebookPage(meta) {
    const title = escapeHtml(meta.title || "Notebook");
    const subtitle = escapeHtml(meta.subtitle || "");
    const embedUrl = escapeHtml(notebookEmbedUrl(meta));
    const fallbackUrl = escapeHtml(notebookFallbackUrl(meta));
    const links = (meta.links || []).map(notebookLinkButton).join("&nbsp;&nbsp;");
    const linksBlock = links
      ? `<div class="shikun-notebook-links">${links}</div>`
      : "";

    return `
      <div class="shikun-page shikun-notebook-page">
        <p class="shikun-notebook-back"><a href="${escapeHtml(resolveContentPath("notebooks.html"))}">← Notebooks</a></p>
        <h1 class="shikun-page-title">${title}</h1>
        ${subtitle ? `<p class="shikun-notebook-series">${subtitle}</p>` : ""}
        ${linksBlock}
        <div class="shikun-notebook-embed">
          <iframe
            title="${title} — Jupyter notebook"
            src="${embedUrl}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allow="fullscreen"
          ></iframe>
        </div>
        <p class="shikun-notebook-embed-fallback text">
          Notebook not loading?
          <a href="${fallbackUrl}" rel="noopener noreferrer">Open on GitHub or Colab</a>.
        </p>
      </div>`;
  }

  function containerClasses(meta, isFirst) {
    const width = WIDTHS.includes(meta.width) ? meta.width : "main";
    const classes = ["container", "blog", width];
    if (isFirst || meta.style === "first") classes.push("first");
    const tone = meta.container || meta.tone;
    if (tone === "gray" || meta.style === "gray") classes.push("gray");
    if (tone === "gray-linear" || meta.style === "gray-linear") {
      classes.push("gray-linear");
    }
    return classes.join(" ");
  }

  function renderSection(meta, bodyMd, isFirst) {
    const heading = escapeHtml(meta.heading || "");
    const label = meta.label
      ? `<h2 class="section-label">${escapeHtml(meta.label)}</h2>`
      : "";
    const className = containerClasses(meta, isFirst);

    return `
      <div class="${className}">
        <h1>${heading}</h1>
        ${label}
        ${markdownToHtml(bodyMd)}
      </div>`;
  }

  function initSlideMenus() {
    const slideMenu = document.getElementById("slide-menu");
    if (!slideMenu) return;
    const contents = document.getElementsByClassName("slide-content");
    slideMenu.addEventListener("click", function (e) {
      const idx = [...this.children]
        .filter((el) => el.className.indexOf("dot") > -1)
        .indexOf(e.target);
      if (idx < 0) return;
      const prev = document.querySelector(".dot.active");
      if (prev) prev.classList.remove("active");
      e.target.classList.add("active");
      for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = i === idx ? "block" : "none";
      }
    });
  }

  function highlightCode() {
    if (window.hljs) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }

  function resolveContentPath(path) {
    if (/^https?:\/\//i.test(path)) return path;
    return new URL(path, window.location.href).href;
  }

  async function loadMarkdown(path) {
    const url = resolveContentPath(path);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    return res.text();
  }

  function getPaperSource() {
    const params = new URLSearchParams(window.location.search);
    const querySrc = params.get("src");
    if (querySrc) return querySrc;
    if (PAPER_SOURCE) return PAPER_SOURCE;
    return "content/papers/beyond-the-moment-vla-memory.md";
  }

  function renderLoadError(err, target) {
    if (!target) return;
    if (window.location.protocol === "file:") {
      target.innerHTML =
        '<p class="text">This site loads content from markdown files and must be served over HTTP. From the project folder run: <code>python3 -m http.server 8080</code>, then open <a href="http://localhost:8080/projects.html">http://localhost:8080/projects.html</a>.</p>';
      return;
    }
    const detail = escapeHtml(err.message || String(err));
    target.innerHTML =
      `<p class="text">Could not load content (${detail}). Check the browser console, or run <code>python3 -m http.server 8080</code> locally.</p>`;
  }

  async function loadContent() {
    const topNavEl = document.getElementById("site-topnav");
    const landingEl = document.getElementById("home-landing");
    const notebookPageEl = document.getElementById("notebook-page");
    const heroEl = document.getElementById("hero-content");
    const mainEl = document.getElementById("page-sections");

    if (typeof marked === "undefined") {
      renderLoadError(new Error("marked.js failed to load"), mainEl || landingEl);
      return;
    }
    if (typeof jsyaml === "undefined") {
      renderLoadError(new Error("js-yaml failed to load"), mainEl || landingEl);
      return;
    }

    try {
      const homeRaw = await loadMarkdown(HOME_PATH);
      const siteMeta = parseFrontMatter(homeRaw).meta;

      if (topNavEl) topNavEl.innerHTML = renderTopNav(siteMeta);

      const pageTitle =
        siteMeta.page_titles && siteMeta.page_titles[PAGE]
          ? siteMeta.page_titles[PAGE]
          : siteMeta.page_title;
      if (pageTitle) document.title = pageTitle;

      if (siteMeta.description) {
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute("content", siteMeta.description);
      }

      if (PAGE === "landing" && landingEl) {
        if (window.location.hash === "#notebooks") {
          window.location.replace(resolveContentPath("notebooks.html"));
          return;
        }
        landingEl.innerHTML = renderLanding(siteMeta);
        const foot = document.getElementById("site-footer");
        if (foot) foot.innerHTML = renderSiteFooter();
        return;
      }

      if (PAGE === "notebook" && notebookPageEl) {
        const notebookRaw = await loadMarkdown(getNotebookSource());
        const { meta } = parseFrontMatter(notebookRaw);
        document.title = meta.title
          ? `${meta.title} — ${siteMeta.page_titles?.notebook || "Notebook"}`
          : document.title;
        notebookPageEl.innerHTML = renderNotebookPage(meta);
        const foot = document.getElementById("site-footer");
        if (foot) foot.innerHTML = renderSiteFooter();
        return;
      }

      if (PAGE === "paper" && heroEl && mainEl) {
        const firstContent = document.getElementById("first-content");
        if (firstContent) firstContent.style.backgroundColor = "#304463";

        const paperRaw = await loadMarkdown(getPaperSource());
        const { meta, body } = parseFrontMatter(paperRaw);
        document.title = meta.title || meta.page_title || document.title;
        const descEl = document.querySelector('meta[name="description"]');
        if (descEl) {
          const descText = meta.description || plainAuthors(meta);
          if (descText) descEl.setAttribute("content", descText);
        }
        heroEl.innerHTML = renderHero(meta);
        mainEl.innerHTML = renderSection(
          { heading: meta.intro_heading || "Introduction", style: "first" },
          body,
          true
        );
        highlightCode();
        initSlideMenus();
        if (window.initClarityNavbar) window.initClarityNavbar();
        if (window.MathJax && window.MathJax.Hub) {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, mainEl]);
        }
        return;
      }

      if (!mainEl) return;

      const contentPath = PAGE_CONTENT[PAGE];
      if (!contentPath) {
        mainEl.innerHTML =
          '<p class="text">No content configured for this page.</p>';
        return;
      }

      const pageRaw = await loadMarkdown(contentPath);
      const { meta } = parseFrontMatter(pageRaw);
        if (meta.page_heading && siteMeta.page_titles) {
          /* keep title from home.md page_titles */
        }
      if (PAGE === "about") {
        mainEl.innerHTML = renderAboutPage(meta);
      } else if (PAGE === "projects" || PAGE === "research") {
        const featured = await resolveFeaturedCovers(meta.featured);
        mainEl.innerHTML = renderProjectsPage({ ...meta, featured });
      } else if (PAGE === "notebooks") {
        mainEl.innerHTML = renderNotebooksPage(meta);
      }

      const foot = document.getElementById("site-footer");
      if (foot) foot.innerHTML = renderSiteFooter();

      if (window.MathJax && window.MathJax.Hub) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, mainEl]);
      }
    } catch (err) {
      console.error("Failed to load content:", err);
      renderLoadError(err, landingEl || mainEl);
    }
  }

  document.addEventListener("DOMContentLoaded", loadContent);
})();
