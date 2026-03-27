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
