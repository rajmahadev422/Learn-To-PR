import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

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
          <button class="docs-logo" onclick="showDocsWelcome()">
            <div class="docs-logo-icon">doc</div>
            <span class="docs-logo-text">Docs</span>
          </button>
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
            <button onclick="showDocsWelcome()">Docs</button>
          </div>
        </div>

        <!-- Welcome -->
        <div class="docs-welcome" id="docsWelcome">
          <div class="docs-welcome-glyph">✦</div>
          <h1>Welcome to Docs</h1>
          <p>Pick a topic from the sidebar, or jump into a section below.</p>
        </div>

        <!-- MD Content -->
        <div id="docsContent" style="display:none;">
          <div class="md-body bg-white py-4 px-10" id="docsMdBody"></div>
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
    <button onclick="showDocsWelcome()">Docs</button>
    <span>›</span>
    <button onclick="toggleDocsGroupByName('${doc}')">${doc}</button>
    <span>›</span>
    <span class="current">${title}</span>
  `;

  // Fetch + render MD
  const res  = await fetch(`docs/${doc + "/" + href}`);
  const md   = await res.text();

  document.getElementById('docsMdBody').innerHTML = marked.parse(md);
  document.getElementById('docsContent').style.display = '';
  document.getElementById('docsWelcome').style.display  = 'none';

  // Update hash silently
  history.pushState(null, '', `#docs/${doc + "/" + href}`);

  // Scroll to top
  document.getElementById('docsMain')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDocsWelcome() {
  document.querySelectorAll('.docs-nav-item').forEach(a => a.classList.remove('active'));
  document.getElementById('docsWelcome').style.display  = '';
  document.getElementById('docsContent').style.display  = 'none';
  document.getElementById('docsBreadcrumb').innerHTML   = `<button onclick="showDocsWelcome()">Docs</button>`;
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

// Exposing function to global 

window.toggleDocsGroup = toggleDocsGroup;
window.showDocsWelcome = showDocsWelcome;
window.filterDocsNav = filterDocsNav;
window.handleDocClick = handleDocClick;

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
    appEle.innerHTML = `<div class="my-0 mx-auto">
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