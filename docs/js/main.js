// ===== MAIN LOGIC =====

async function renderDoc() {
  let page = getCurrentPage();

  let doc = page && page.split("/");
  console.log("Route:", doc, "page:", page);
  renderSidebar(doc[1]);

  if (!doc[2]) {
    page = `doc/${doc[1]}/README.md`;
  }

  let md = await loadMarkdown(page);
  md = await loadIncludes(md);
  const tokens = tokenize(md);

  const ast = parse(tokens);

  render(ast);
  updateBreadcrumb(page);

  wrapTables();
}

async function init() {
  overlay.classList.toggle("show");
  const page = getCurrentPage();

  try {
    if (!page) {
      const res = await fetch("pages/Home.html");
      const html = await res.text();

      layout.innerHTML = html;
    } else if (page === "doc" || page === "doc") {
        const data = await loadFolder();
      layout.innerHTML = `<h1>Documentation</h1>${data}`;
    } else await renderDoc();
  } catch (err) {
    console.error(err);
  }

  overlay.classList.remove("show");
}

async function loadFolder() {
  try {
    const res = await fetch(`${gitPath}docs.json`); // ✅ always root doc
    const folders = await res.json();

    // const parser = new DOMParser();
    // const doc = parser.parseFromString(html, "text/html");

    // const folders = [...doc.querySelectorAll("table a")]
    //   .map((a) => a.textContent.trim())
    //   .filter((name) => name.endsWith("/") && name !== "../")
    //   .map((name) => name.replace("/", ""));

    const docPage = `<div><ul>${folders.map((folder) => {
      return `<li><a href="#doc/${folder}/">${folder}</a></li>`;
    }).join("")}</ul></div>`;


    return docPage;
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("hashchange", init);

// initial load
window.addEventListener("DOMContentLoaded", init);

// ===== TABLE WRAPPER =====
function wrapTables() {
  document.querySelectorAll("#app table").forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

// menuBtn.onclick = () => {
//   sidebar.classList.toggle("show");
//   overlay.classList.toggle("show");
// };

// overlay.onclick = () => {
//   sidebar.classList.remove("show");
//   overlay.classList.remove("show");
// };
