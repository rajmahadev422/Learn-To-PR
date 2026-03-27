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
