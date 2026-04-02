function parseAttributes(str) {
  const attrs = {};
  const regex = /(\w+)=(\w+)/g;
  let match;

  while ((match = regex.exec(str))) {
    attrs[match[1]] = match[2];
  }

  return attrs;
}

function parseCodeBlock(content) {
  const regex = /```(\w+)\s*\n([\s\S]*?)```/g;

  let blocks = [];
  let match;

  while ((match = regex.exec(content))) {
    blocks.push({
      lang: match[1],
      code: match[2].trim(),
    });
  }

  // console.log(match, blocks)

  return {
    type: "codeTabs",
    blocks,
  };
}

function parse(tokens) {
  return tokens.map((token) => {
    if (token.type === "markdown") {
      return {
        type: "markdown",
        content: token.content,
      };
    }

    if (token.type === "block") {
      const attrs = parseAttributes(token.attrs);

      if (token.blockType === "code") {
        return parseCodeBlock(token.content, attrs);
      }

      return {
        type: "unknown",
        content: token.content,
      };
    }
  });
}

function tokenize(md) {
  const regex = /:::(\w+)([^\n]*)\n([\s\S]*?):::/g;

  let tokens = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(md)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "markdown",
        content: md.slice(lastIndex, match.index),
      });
    }

    tokens.push({
      type: "block",
      blockType: match[1],
      attrs: match[2].trim(),
      content: match[3],
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < md.length) {
    tokens.push({
      type: "markdown",
      content: md.slice(lastIndex),
    });
  }

  return tokens;
}

async function loadIncludes(md) {
  const regex = /:::include\{(.+?)\}/g;

  const matches = [...md.matchAll(regex)];

  for (const match of matches) {
    const full = match[1].trim();

    // split path and line info
    let [filePath, linePart] = full.split("#");

    try {
      const res = await fetch(`${gitPath}${filePath}`);
      let code = await res.text();

      // 🔥 Handle line slicing
      if (res.ok && linePart) {
        code = extractLines(code, linePart);
      }

      const ext = filePath.split(".").pop();
      const lang = mapLang(ext);

      const replacement = `\`\`\`${lang}\n${code}\n\`\`\``;

      md = md.replace(match[0], replacement);
    } catch {
      md = md.replace(match[0], `Error loading ${filePath}`);
    }
  }

  return md;
}

function extractLines(code, linePart) {
  const lines = code.split("\n");

  // normalize (remove spaces, lowercase)
  linePart = linePart.replace(/\s+/g, "").toUpperCase();

  // 🔹 Range: L10-L20
  const rangeMatch = linePart.match(/^L(\d+)-L(\d+)$/);
  if (rangeMatch) {
    const start = parseInt(rangeMatch[1], 10);
    const end = parseInt(rangeMatch[2], 10);

    return lines.slice(start - 1, end).join("\n");
  }

  // 🔹 Single line: L10
  const singleMatch = linePart.match(/^L(\d+)$/);
  if (singleMatch) {
    const lineNum = parseInt(singleMatch[1], 10);
    return lines[lineNum - 1] || "";
  }

  // fallback
  return code;
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

async function loadMarkdown(path) {
  try {
    const res = await fetch(`${gitPath || "../"}${path}`);
    if (!res.ok) {
      const res = await fetch("pages/404.html");
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

function createCodeTabs(blocks) {
  const container = document.createElement("div");
  container.className = "code-container";

  const tabs = document.createElement("div");
  tabs.className = "tabs";

  const pre = document.createElement("pre");
  const code = document.createElement("code");

  let active = 0;

  function update() {
    // if (!blocks[active]) return;

    const lang = mapLang(blocks[active].lang);
    code.className = `language-${lang}`;

    code.textContent = blocks[active].code;

    Prism.highlightElement(code);

    [...tabs.children].forEach((btn, i) => {
      btn.classList.toggle("active", i === active);
    });
  }

  blocks.forEach((b, i) => {
    const btn = document.createElement("button");
    btn.textContent = b.lang;
    btn.onclick = () => {
      active = i;
      update();
    };
    tabs.appendChild(btn);
  });
  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  copyBtn.id = "copy-btn";

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(blocks[active].code);
  };

  container.appendChild(copyBtn);
  pre.appendChild(code);
  container.appendChild(tabs);
  container.appendChild(pre);

  update();
  return container;
}

function render(ast) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  ast.forEach((node) => {
    if (node.type === "markdown") {
      const div = document.createElement("div");
      div.innerHTML = marked.parse(node.content);
      app.appendChild(div);
    } else if (node.type === "codeTabs") {
      app.appendChild(createCodeTabs(node.blocks));
    }
  });
}
