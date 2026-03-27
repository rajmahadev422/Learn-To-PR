// utils.js - Utility functions for the documentation viewer

function getCurrentPage() {
  const hash = window.location.hash;
  // default page
  if (!hash || hash === "#") return "tutorials/introduction/general_install/general_install.md";

  // remove #/
  return hash.replace(/^#\/?/, "");
}

// Simple mapping of file extensions to Prism languages
function mapLang(lang) {
  const map = {
    py: "python",
    js: "javascript",
    cpp: "cpp",
    java: "java",
    sh: "bash",
  };
  if (!map[lang]) return lang;
  return map[lang];
}

// Tokenize markdown into blocks and markdown segments

async function loadMarkdown(path) {
  try {
    const res = await fetch(`${gitPath || "../"}doc/${path}`);
    if (!res.ok) {
      const res = await fetch('pages/404.html');
      return await res.text();
    }
    const md = await res.text();
    return parseImages(md, gitPath);
  } catch (err) {
    return `<p>${err.message}</p>`;
  }
}

// ===== BREADCRUMB =====
function updateBreadcrumb(page) {
  const crumb = document.getElementById("breadcrumb");
  if (!crumb) return;
  const parts = page.replace(/\.md$/, "").split("/");
  crumb.innerHTML = parts
    .map((p, i) => {
      const label = p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " ");
      return i < parts.length - 1
        ? `<span>${label}</span><span class="sep">›</span>`
        : `<span style="color:var(--text)">${label}</span>`;
    })
    .join("");
}

function parseImages(md, basePath) {
  
  return md.replace(/!\[(.*?)\]\((.*?)\)/g, (_, alt, path) => {
    if (/^https?:\/\//.test(path)) {
      return `<img src="${path}" alt="${alt}" />`;
    }

    path = path.replace(/^\.?\//, "");
    return `<img src="${basePath}${path}" alt="${alt}" />`;
  });
}