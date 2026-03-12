marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

const appEle    = document.getElementById("app");
const headerEle = document.getElementById("header-container");
const footerEle = document.getElementById("footer-container");

// ─── STYLES ──────────────────────────────────────────────────────────────────

function injectStyles() {
  if (document.getElementById('docs-styles')) return;
  const style = document.createElement('style');
  style.id = 'docs-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&display=swap');

    /* ── Layout ── */
    .docs-layout {
      display: flex;
      height: calc(100vh - var(--header-height, 64px));
      overflow: hidden;
      background: #fafaf9;
    }

    /* ── Sidebar ── */
    .docs-sidebar {
      width: 260px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      border-right: 1px solid #ebebeb;
      height: 100%;
      overflow: hidden;
    }

    .docs-sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 14px 10px;
      border-bottom: 1px solid #f0f0f0;
      flex-shrink: 0;
    }
    .docs-logo {
      display: flex; align-items: center; gap: 8px;
      text-decoration: none; cursor: pointer;
    }
    .docs-logo-icon {
      width: 26px; height: 26px;
      background: #a67c4a; border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; font-weight: 600; color: #fff;
    }
    .docs-logo-text {
      font-size: 0.9rem; font-weight: 600; color: #1a1a1a;
    }

    /* ── Search ── */
    .docs-nav-search {
      position: relative;
      padding: 10px 12px;
      border-bottom: 1px solid #f0f0f0;
      flex-shrink: 0;
    }
    .docs-search-icon {
      position: absolute; left: 24px; top: 50%;
      transform: translateY(-55%);
      color: #bbb; font-size: 1rem; pointer-events: none;
    }
    .docs-search-input {
      width: 100%;
      background: #f7f7f7;
      border: 1px solid #ebebeb;
      border-radius: 7px;
      padding: 6px 10px 6px 28px;
      color: #333;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.8rem; outline: none;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    }
    .docs-search-input::placeholder { color: #bbb; }
    .docs-search-input:focus {
      border-color: #c8b89a; background: #fff;
      box-shadow: 0 0 0 3px rgba(166,124,74,0.08);
    }

    /* ── Nav list ── */
    .docs-nav-list {
      flex: 1; overflow-y: auto;
      padding: 8px 0 24px;
    }
    .docs-nav-list::-webkit-scrollbar { width: 4px; }
    .docs-nav-list::-webkit-scrollbar-track { background: transparent; }
    .docs-nav-list::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 2px; }

    .docs-nav-group { margin-bottom: 2px; }
    .docs-nav-group-btn {
      width: 100%; display: flex; align-items: center; gap: 7px;
      padding: 7px 14px;
      background: none; border: none; cursor: pointer;
      color: #aaa;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.68rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.09em;
      transition: color 0.15s; text-align: left;
    }
    .docs-nav-group-btn:hover { color: #666; }
    .docs-nav-group-btn.open  { color: #333; }

    .docs-nav-group-icon {
      display: inline-block;
      transition: transform 0.2s ease;
      font-size: 0.85rem; color: #ccc; width: 12px; flex-shrink: 0;
    }
    .docs-nav-group-btn.open .docs-nav-group-icon { transform: rotate(90deg); color: #aaa; }
    .docs-nav-group-label { flex: 1; }
    .docs-nav-group-count {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; color: #ccc;
      background: #f5f5f5; border: 1px solid #ebebeb;
      border-radius: 4px; padding: 1px 5px;
      transition: color 0.15s, border-color 0.15s;
    }
    .docs-nav-group-btn.open .docs-nav-group-count { color: #888; border-color: #ddd; }

    .docs-nav-items { overflow: hidden; max-height: 0; transition: max-height 0.25s ease; }
    .docs-nav-items.open { max-height: 2000px; }

    .docs-nav-item {
      display: flex; align-items: center; gap: 9px;
      padding: 5px 14px 5px 30px;
      color: #888; font-size: 0.82rem; font-weight: 400;
      text-decoration: none;
      border-left: 2px solid transparent;
      transition: color 0.15s, background 0.15s, border-color 0.15s;
    }
    .docs-nav-item:hover  { color: #333; background: #f9f7f4; }
    .docs-nav-item.active { color: #1a1a1a; background: #fdf8f2; border-left-color: #a67c4a; font-weight: 500; }
    .docs-nav-item-dot {
      width: 4px; height: 4px; border-radius: 50%;
      background: #ddd; flex-shrink: 0; transition: background 0.15s;
    }
    .docs-nav-item:hover  .docs-nav-item-dot { background: #aaa; }
    .docs-nav-item.active .docs-nav-item-dot { background: #a67c4a; }
    .docs-nav-item.hidden { display: none; }
    .docs-nav-group.all-hidden { opacity: 0.3; pointer-events: none; }
    .docs-nav-empty {
      padding: 20px 14px; text-align: center;
      color: #ccc; font-size: 0.78rem;
      font-family: 'JetBrains Mono', monospace; display: none;
    }
    .docs-nav-empty.visible { display: block; }

    /* ── Main ── */
    .docs-main {
      flex: 1; overflow-y: auto; background: #fafaf9;
    }
    .docs-main::-webkit-scrollbar { width: 6px; }
    .docs-main::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 3px; }

    .docs-topbar {
      position: sticky; top: 0; z-index: 10;
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 40px;
      background: rgba(250,250,249,0.9);
      border-bottom: 1px solid #ebebeb;
      backdrop-filter: blur(8px);
    }
    .docs-breadcrumb {
      display: flex; align-items: center; gap: 6px;
      font-size: 0.76rem; color: #bbb;
      font-family: 'JetBrains Mono', monospace;
    }
    .docs-breadcrumb span { color: #ddd; }
    .docs-breadcrumb a {
      color: #999; text-decoration: none; transition: color 0.15s; cursor: pointer;
    }
    .docs-breadcrumb a:hover { color: #a67c4a; }
    .docs-breadcrumb .current { color: #555; }

    /* ── Welcome ── */
    .docs-welcome {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      min-height: calc(100% - 45px);
      padding: 60px 40px; text-align: center;
      animation: doc-fadein 0.4s ease both;
    }
    .docs-welcome-glyph { font-size: 2.5rem; margin-bottom: 1.2rem; opacity: 0.12; }
    .docs-welcome h1 {
      font-family: 'Playfair Display', serif;
      font-size: 1.9rem; font-weight: 700;
      color: #1a1a1a; margin-bottom: 0.5rem; letter-spacing: -0.02em;
    }
    .docs-welcome p {
      font-family: 'Source Serif 4', serif;
      font-size: 0.95rem; color: #888; font-weight: 300;
      max-width: 340px; line-height: 1.7;
    }
    .docs-welcome-cards {
      display: flex; gap: 10px; margin-top: 2rem;
      flex-wrap: wrap; justify-content: center;
    }
    .docs-welcome-card {
      background: #fff; border: 1px solid #ebebeb;
      border-radius: 10px; padding: 14px 18px;
      text-align: left; cursor: pointer; text-decoration: none;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
      min-width: 140px;
    }
    .docs-welcome-card:hover {
      border-color: #c8b89a;
      box-shadow: 0 4px 14px rgba(166,124,74,0.1);
      transform: translateY(-2px);
    }
    .docs-welcome-card-icon { font-size: 1.1rem; margin-bottom: 6px; }
    .docs-welcome-card-title { font-size: 0.8rem; font-weight: 600; color: #333; margin-bottom: 2px; }
    .docs-welcome-card-sub { font-size: 0.7rem; color: #aaa; font-family: 'JetBrains Mono', monospace; }

    /* ── MD content ── */
    .docs-content {
      max-width: 720px; margin: 0 auto;
      padding: 44px 40px 80px;
      animation: doc-fadein 0.3s ease both;
    }
    .md-body { font-family: 'Source Serif 4', serif; line-height: 1.85; }
    .md-body h1 { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #1a1a1a; letter-spacing: -0.02em; border-bottom: 1px solid #ebebeb; padding-bottom: 0.5rem; margin: 0 0 1rem; }
    .md-body h2 { font-family: 'Playfair Display', serif; font-size: 1.45rem; font-style: italic; font-weight: 500; color: #2a2a2a; margin: 2rem 0 0.5rem; }
    .md-body h3 { font-size: 0.85rem; font-weight: 600; color: #a67c4a; text-transform: uppercase; letter-spacing: 0.08em; margin: 1.8rem 0 0.4rem; }
    .md-body h4, .md-body h5, .md-body h6 { font-weight: 600; color: #444; margin: 1.2rem 0 0.3rem; }
    .md-body p { font-size: 1rem; color: #444; margin-bottom: 1rem; font-weight: 300; }
    .md-body a { color: #a67c4a; text-decoration: underline; text-underline-offset: 3px; }
    .md-body strong { color: #1a1a1a; font-weight: 600; }
    .md-body em { font-style: italic; color: #555; }
    .md-body code { font-family: 'JetBrains Mono', monospace; font-size: 0.8em; background: #f5f2ee; color: #a67c4a; padding: 0.15em 0.4em; border-radius: 3px; border: 1px solid #ebe7e0; }
    .md-body pre { background: #faf8f5; border: 1px solid #ebe7e0; border-left: 3px solid #a67c4a; border-radius: 6px; padding: 1.2rem 1.4rem; overflow-x: auto; margin: 1.4rem 0; }
    .md-body pre code { background: none; border: none; color: #555; font-size: 0.87rem; padding: 0; line-height: 1.7; }
    .md-body blockquote { border-left: 3px solid #a67c4a; padding: 0.5rem 0 0.5rem 1.4rem; margin: 1.4rem 0; background: rgba(166,124,74,0.05); border-radius: 0 4px 4px 0; }
    .md-body blockquote p { font-style: italic; color: #888; margin: 0; }
    .md-body ul { padding-left: 1.4rem; margin-bottom: 1rem; list-style: none; }
    .md-body ul li { color: #444; line-height: 1.8; padding-left: 0.4rem; position: relative; }
    .md-body ul li::before { content: '◆'; position: absolute; left: -1.1rem; color: #a67c4a; font-size: 0.42rem; top: 0.58rem; }
    .md-body ol { padding-left: 1.6rem; margin-bottom: 1rem; list-style: decimal; }
    .md-body ol li { color: #444; line-height: 1.8; }
    .md-body ol li::marker { color: #a67c4a; font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; }
    .md-body hr { border: none; border-top: 1px solid #ebebeb; margin: 2rem 0; }
    .md-body table { width: 100%; border-collapse: collapse; margin: 1.4rem 0; font-size: 0.92rem; }
    .md-body thead tr { border-bottom: 2px solid #a67c4a; }
    .md-body th { color: #a67c4a; font-weight: 600; text-align: left; padding: 0.5rem 1rem; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.07em; }
    .md-body td { color: #555; padding: 0.5rem 1rem; border-bottom: 1px solid #f0f0f0; }
    .md-body tbody tr:hover { background: #fdf8f2; }
    .md-body img { max-width: 100%; border-radius: 6px; border: 1px solid #ebebeb; margin: 1rem 0; }

    @keyframes doc-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  `;
  document.head.appendChild(style);
}

// ─── DOCS LAYOUT ─────────────────────────────────────────────────────────────

async function loadDocs() {
  injectStyles();

  const res  = await fetch("docs/table_of_content.json");
  const json = await res.json();
  const docs = Object.keys(json);

  // Welcome cards — one per section
  const cards = docs.map(doc => {
    const first = json[doc];
    return `
      <a class="docs-welcome-card"
        href="#docs/${doc}/${first.href}"
        onclick="handleDocClick(event, '${doc}', '${first.href}', '${first.title}')">
        <div class="docs-welcome-card-icon">📄</div>
        <div class="docs-welcome-card-title">${doc}</div>
        <div class="docs-welcome-card-sub">${json[doc].length} articles</div>
      </a>
    `;
  }).join('');

  // Nav groups
  const navGroups = docs.map(doc => `
    <div class="docs-nav-group" data-group="${doc}">
      <button class="docs-nav-group-btn" onclick="toggleDocsGroup(this)">
        <span class="docs-nav-group-icon">›</span>
        <span class="docs-nav-group-label">${doc}</span>
        <span class="docs-nav-group-count">${json[doc].length}</span>
      </button>
      <div class="docs-nav-items">
        ${json[doc].map(d => `
          <a class="docs-nav-item"
            href="#docs/${doc}/${d.href}"
            data-title="${d.title.toLowerCase()}"
            data-group="${doc.toLowerCase()}"
            onclick="handleDocClick(event, '${doc}', '${d.href}', '${d.title}')"
          >
            <span class="docs-nav-item-dot"></span>
            ${d.title}
          </a>
        `).join('')}
      </div>
    </div>
  `).join('');

  return `
    <div class="docs-layout">

      <!-- Sidebar -->
      <aside class="docs-sidebar">
        <div class="docs-sidebar-header">
          <div class="docs-logo" onclick="showDocsWelcome()">
            <div class="docs-logo-icon">doc</div>
            <span class="docs-logo-text">Docs</span>
          </div>
        </div>

        <div class="docs-nav-search">
          <span class="docs-search-icon">⌕</span>
          <input class="docs-search-input" type="text"
            placeholder="Search docs..."
            oninput="filterDocsNav(this.value)" />
        </div>

        <div class="docs-nav-list" id="docsNavList">
          ${navGroups}
        </div>
      </aside>

      <!-- Main -->
      <main class="docs-main" id="docsMain">
        <div class="docs-topbar">
          <div class="docs-breadcrumb" id="docsBreadcrumb">
            <a onclick="showDocsWelcome()">Docs</a>
          </div>
        </div>

        <!-- Welcome -->
        <div class="docs-welcome" id="docsWelcome">
          <div class="docs-welcome-glyph">✦</div>
          <h1>Welcome to Docs</h1>
          <p>Pick a topic from the sidebar, or jump into a section below.</p>
          <div class="docs-welcome-cards">${cards}</div>
        </div>

        <!-- MD Content -->
        <div class="docs-content" id="docsContent" style="display:none;">
          <div class="md-body" id="docsMdBody"></div>
        </div>
      </main>

    </div>
  `;
}

// ─── DOC NAVIGATION ──────────────────────────────────────────────────────────

async function handleDocClick(event, doc, href, title) {
  event.preventDefault();

  // Active link
  document.querySelectorAll('.docs-nav-item').forEach(a => a.classList.remove('active'));
  const clicked = event.currentTarget;
  clicked.classList.add('active');

  // Open parent group
  const group = clicked.closest('.docs-nav-group');
  group?.querySelector('.docs-nav-items')?.classList.add('open');
  group?.querySelector('.docs-nav-group-btn')?.classList.add('open');

  // Breadcrumb
  document.getElementById('docsBreadcrumb').innerHTML = `
    <a onclick="showDocsWelcome()">Docs</a>
    <span>›</span>
    <a onclick="toggleDocsGroupByName('${doc}')">${doc}</a>
    <span>›</span>
    <span class="current">${title}</span>
  `;

  // Fetch + render MD
  const res  = await fetch(`docs/${doc}/${href}`);
  const md   = await res.text();

  document.getElementById('docsMdBody').innerHTML = marked.parse(md);
  document.getElementById('docsContent').style.display = '';
  document.getElementById('docsWelcome').style.display  = 'none';

  // Update hash silently
  history.pushState(null, '', `#docs/${doc}/${href}`);

  // Scroll to top
  document.getElementById('docsMain')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDocsWelcome() {
  document.querySelectorAll('.docs-nav-item').forEach(a => a.classList.remove('active'));
  document.getElementById('docsWelcome').style.display  = '';
  document.getElementById('docsContent').style.display  = 'none';
  document.getElementById('docsBreadcrumb').innerHTML   = `<a onclick="showDocsWelcome()">Docs</a>`;
  history.pushState(null, '', '#docs');
}

// ─── NAV HELPERS ─────────────────────────────────────────────────────────────

function toggleDocsGroup(btn) {
  btn.nextElementSibling.classList.toggle('open');
  btn.classList.toggle('open');
}

function filterDocsNav(query) {
  const q = query.toLowerCase().trim();
  let anyVisible = false;

  document.querySelectorAll('.docs-nav-group').forEach(group => {
    let groupVisible = false;
    group.querySelectorAll('.docs-nav-item').forEach(item => {
      const match = !q || item.dataset.title.includes(q) || item.dataset.group.includes(q);
      item.classList.toggle('hidden', !match);
      if (match) groupVisible = true;
    });
    group.classList.toggle('all-hidden', !groupVisible);
    if (q && groupVisible) {
      group.querySelector('.docs-nav-items')?.classList.add('open');
      group.querySelector('.docs-nav-group-btn')?.classList.add('open');
    }
    if (groupVisible) anyVisible = true;
  });

  let empty = document.querySelector('.docs-nav-empty');
  if (!empty) {
    empty = document.createElement('div');
    empty.className = 'docs-nav-empty';
    empty.textContent = 'No results found';
    document.getElementById('docsNavList')?.appendChild(empty);
  }
  empty.classList.toggle('visible', !anyVisible);
}

// ─── OTHER PAGES ─────────────────────────────────────────────────────────────

async function loadPage(page) {
  const res = await fetch(`src/pages/${page}.html`);
  return await res.text();
}

async function loadContributors() {
  const res  = await fetch("contributors.json");
  const json = await res.json();

  return `
    <section id="leaderboard" class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <span class="text-indigo-600 font-semibold tracking-wide uppercase text-sm">PR rookie leaderboard</span>
          <h2 class="mt-2 text-3xl font-bold text-slate-900">Top Beginners This Week</h2>
          <p class="mt-3 text-slate-600">Our community ranks learners by completed pitches, media mentions, and peer reviews.</p>
        </div>
        <div class="mt-16 flex flex-wrap gap-5">
          ${json.map((user, idx) => `
            <div class="bg-white min-w-50 flex-1 rounded-2xl shadow-md border border-slate-200 p-6 flex flex-col items-center text-center relative">
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                🥇 rookie #${idx + 1}
              </div>
              <div class="w-20 h-20 mt-2 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-800 border-4 border-white shadow">
                JD
              </div>
              <h3 class="mt-3 font-semibold text-lg">${user}</h3>
              <p class="text-sm text-slate-500">pitches: 12 · earned 3 media hits</p>
              <div class="w-full bg-slate-100 h-2 rounded-full mt-4">
                <div class="bg-indigo-600 h-2 rounded-full" style="width: 92%"></div>
              </div>
              <span class="text-xs text-slate-400 mt-1">92% completion</span>
            </div>
          `).join('')}
        </div>
        <div class="mt-12 flex justify-center">
          <a href="#" class="text-indigo-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
            <span>See full beginner rankings</span>
          </a>
        </div>
      </div>
    </section>
  `;
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────

async function router() {
  const hash  = location.hash.slice(1) || 'home';
  const route = hash.split('/')[0]; // "home" | "docs" | "leaderboard" | ...

  // Hide/show footer for docs (optional — docs has its own scroll)
  footerEle.style.display = route === 'docs' ? 'none' : '';

  if (route === 'home') {
    appEle.innerHTML = await loadPage('Home');

  } else if (route === 'leaderboard') {
    appEle.innerHTML = await loadContributors();

  } else if (route === 'docs') {
    // Always re-render the shell so sidebar is present
    appEle.innerHTML = await loadDocs();

    // Open first group by default
    document.querySelector('.docs-nav-items')?.classList.add('open');
    document.querySelector('.docs-nav-group-btn')?.classList.add('open');

    // If hash has a deeper path e.g. #docs/tutorials/intro.md — auto-load it
    const parts = hash.split('/');           // ["docs", "tutorials", "intro.md"]
    if (parts.length >= 3) {
      const doc   = parts[1];
      const href  = parts.slice(2).join('/');
      const link  = document.querySelector(`.docs-nav-item[href="#${hash}"]`);
      if (link) {
        await handleDocClick({ preventDefault: () => {}, currentTarget: link }, doc, href,
          link.textContent.trim());
      }
    }

  } else {
    // Raw md path fallback e.g. #docs/tutorials/something.md
    appEle.innerHTML = `<div style="margin:0 auto;padding:48px 40px;">
      <div class="md-body" id="docsMdBody"></div>
    </div>`;
    injectStyles();
    const res = await fetch(hash);
    const md  = await res.text();
    document.getElementById('docsMdBody').innerHTML = marked.parse(md);
  }
}

// ─── BOOT ────────────────────────────────────────────────────────────────────

async function boot() {
  headerEle.innerHTML = await loadPage('layout/Header');
  footerEle.innerHTML = await loadPage('layout/Footer');
  await router();
}

window.addEventListener('load', boot);
window.addEventListener('hashchange', router);