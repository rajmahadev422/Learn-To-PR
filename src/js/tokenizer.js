export function tokenize(md) {
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

export async function loadIncludes(md) {
  const regex = /:::include\{(.+?)\}/g;

  const matches = [...md.matchAll(regex)];

  for (const match of matches) {
    const full = match[1].trim();

    // split path and line info
    let [filePath, linePart] = full.split("#");

    try {
      const res = await fetch(`${filePath}`);
      let code = await res.text();

      // 🔥 Handle line slicing
      if (linePart) {
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

// window.tokenize = tokenize;
// window.loadIncludes = loadIncludes;