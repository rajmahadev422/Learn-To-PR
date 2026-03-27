async function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";

  // Search wrap
  const searchWrap = document.createElement("div");
  searchWrap.className = "search-wrap";
  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search docs...";
  searchInput.className = "search-box";
  searchWrap.appendChild(searchInput);
  sidebar.appendChild(searchWrap);

  // Nav container
  const nav = document.createElement("div");
  nav.className = "sidebar-nav";
  sidebar.appendChild(nav);

  const currentHash = window.location.hash.replace(/^#\/?/, "");

  const res = await fetch("docs/table_of_content.json");
  const data = await res.json();
  function renderList(filter = "") {
    nav.innerHTML = "";

    Object.entries(data).forEach(([section, files]) => {
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "sidebar-section";

      const title = document.createElement("div");
      title.className = "sidebar-title";

      const text = document.createElement("span");
      text.textContent = section;

      const arrow = document.createElement("i");
      arrow.className = "arrow";
      arrow.textContent = "→";

      title.appendChild(text);
      title.appendChild(arrow);

      const list = document.createElement("div");
      list.className = "sidebar-list";

      let hasMatch = false;

      files.forEach((file) => {
        if (
          file.name &&
          !file.name.toLowerCase().includes(filter.toLowerCase())
        )
          return;

        hasMatch = true;

        const link = document.createElement("a");
        link.href = `#/${file.url}`;
        link.textContent = file.name;
        link.className = "sidebar-link";

        if (file.path === currentHash) {
          link.classList.add("active");
        }

        list.appendChild(link);
      });

      if (!hasMatch) return;

      list.style.maxHeight = list.scrollHeight + "px";

      title.onclick = () => {
        const isOpen = list.style.maxHeight !== "0px";
        list.style.maxHeight = isOpen ? "0px" : list.scrollHeight + "px";
        arrow.textContent = isOpen ? "→" : "↓";
      };

      sectionDiv.appendChild(title);
      sectionDiv.appendChild(list);
      nav.appendChild(sectionDiv);
    });
  }
  searchInput.addEventListener("input", (e) => {
    renderList(e.target.value);
  });

  renderList();
}

window.renderSidebar = renderSidebar;