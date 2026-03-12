function renderThemeToggle(containerId) {
  injectThemeToggleStyles();

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <button class="theme-toggle" onclick="toggleDocsTheme(this)" title="Toggle theme">
      <span class="theme-toggle-track">
        <span class="theme-toggle-thumb"></span>
      </span>
      <span class="theme-toggle-icon sun">☀</span>
      <span class="theme-toggle-icon moon">☾</span>
    </button>
  `;
}

function toggleDocsTheme(btn) {
  const isDark = document.documentElement.classList.toggle('docs-dark');
  btn.classList.toggle('dark', isDark);
  localStorage.setItem('docs-theme', isDark ? 'dark' : 'light');
}

function initTheme() {
  const saved = localStorage.getItem('docs-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;

  if (isDark) {
    document.documentElement.classList.add('docs-dark');
    document.querySelector('.theme-toggle')?.classList.add('dark');
  }
}

function injectThemeToggleStyles() {
  if (document.getElementById('theme-toggle-styles')) return;
  const style = document.createElement('style');
  style.id = 'theme-toggle-styles';
  style.textContent = `
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: 1px solid #e8e8e8;
      border-radius: 99px;
      padding: 5px 12px 5px 8px;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .theme-toggle:hover { background: #f5f5f5; border-color: #ccc; }

    .theme-toggle-track {
      width: 28px; height: 16px;
      background: #e8e8e8;
      border-radius: 99px;
      position: relative;
      transition: background 0.25s;
      flex-shrink: 0;
    }
    .theme-toggle-thumb {
      position: absolute;
      top: 2px; left: 2px;
      width: 12px; height: 12px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.25s ease, background 0.25s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .theme-toggle.dark .theme-toggle-track { background: #a67c4a; }
    .theme-toggle.dark .theme-toggle-thumb { transform: translateX(12px); }

    .theme-toggle-icon {
      font-size: 0.8rem;
      transition: opacity 0.2s, color 0.2s;
      line-height: 1;
    }
    .theme-toggle-icon.sun  { color: #f0a500; opacity: 1; }
    .theme-toggle-icon.moon { color: #888;    opacity: 0.4; }
    .theme-toggle.dark .theme-toggle-icon.sun  { opacity: 0.4; }
    .theme-toggle.dark .theme-toggle-icon.moon { opacity: 1; color: #a67c4a; }

    /* ── Docs nav light (default) ── */
    .docs-nav {
      background: #ffffff;
      border-right: 1px solid #e8e8e8;
    }
    .docs-nav-search        { border-bottom: 1px solid #f0f0f0; }
    .docs-search-icon       { color: #bbb; }
    .docs-search-input      { background: #f7f7f7; border-color: #e8e8e8; color: #333; }
    .docs-search-input::placeholder { color: #bbb; }
    .docs-search-input:focus { border-color: #c8b89a; background: #fff; box-shadow: 0 0 0 3px rgba(166,124,74,0.08); }
    .docs-nav-list::-webkit-scrollbar-thumb { background: #e0e0e0; }
    .docs-nav-group-btn     { color: #999; }
    .docs-nav-group-btn:hover  { color: #555; }
    .docs-nav-group-btn.open   { color: #333; }
    .docs-nav-group-icon    { color: #ccc; }
    .docs-nav-group-btn.open .docs-nav-group-icon { color: #999; }
    .docs-nav-group-count   { color: #bbb; background: #f5f5f5; border-color: #e8e8e8; }
    .docs-nav-group-btn.open .docs-nav-group-count { color: #888; border-color: #ddd; }
    .docs-nav-item          { color: #888; }
    .docs-nav-item:hover    { color: #333; background: #f9f7f4; }
    .docs-nav-item.active   { color: #1a1a1a; background: #fdf8f2; border-left-color: #a67c4a; }
    .docs-nav-item-dot      { background: #ddd; }
    .docs-nav-item:hover .docs-nav-item-dot { background: #aaa; }
    .docs-nav-item.active   .docs-nav-item-dot { background: #a67c4a; }
    .docs-nav-empty         { color: #ccc; }

    /* ── Docs nav dark ── */
    .docs-dark .docs-nav {
      background: #0f0f0f;
      border-right: 1px solid #1e1e1e;
    }
    .docs-dark .docs-nav-search        { border-bottom: 1px solid #1a1a1a; }
    .docs-dark .docs-search-icon       { color: #444; }
    .docs-dark .docs-search-input      { background: #161616; border-color: #252525; color: #ccc; }
    .docs-dark .docs-search-input::placeholder { color: #3a3a3a; }
    .docs-dark .docs-search-input:focus { border-color: #3a3a3a; background: #1a1a1a; box-shadow: none; }
    .docs-dark .docs-nav-list::-webkit-scrollbar-thumb { background: #222; }
    .docs-dark .docs-nav-group-btn     { color: #888; }
    .docs-dark .docs-nav-group-btn:hover  { color: #bbb; }
    .docs-dark .docs-nav-group-btn.open   { color: #ddd; }
    .docs-dark .docs-nav-group-icon    { color: #444; }
    .docs-dark .docs-nav-group-btn.open .docs-nav-group-icon { color: #888; }
    .docs-dark .docs-nav-group-count   { color: #333; background: #1a1a1a; border-color: #252525; }
    .docs-dark .docs-nav-group-btn.open .docs-nav-group-count { color: #666; border-color: #333; }
    .docs-dark .docs-nav-item          { color: #555; }
    .docs-dark .docs-nav-item:hover    { color: #bbb; background: #141414; }
    .docs-dark .docs-nav-item.active   { color: #e8e8e8; background: #161616; border-left-color: #a67c4a; }
    .docs-dark .docs-nav-item-dot      { background: #2e2e2e; }
    .docs-dark .docs-nav-item:hover .docs-nav-item-dot { background: #555; }
    .docs-dark .docs-nav-item.active   .docs-nav-item-dot { background: #a67c4a; }
    .docs-dark .docs-nav-empty         { color: #333; }

    /* ── Toggle dark mode ── */
    .docs-dark .theme-toggle       { border-color: #2a2a2a; }
    .docs-dark .theme-toggle:hover { background: #1a1a1a; border-color: #3a3a3a; }
  `;
  document.head.appendChild(style);
}