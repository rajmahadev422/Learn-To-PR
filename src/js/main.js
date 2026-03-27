// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
// Load saved theme
const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

themeToggle.onclick = () => {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
};

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
  localStorage.setItem("theme", theme);
}

// ===== MENU BUTTON =====
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.onclick = () => {
  sidebar.classList.toggle("show");
};

// ===== MAIN LOGIC =====
import { renderSidebar } from "./sidebar";
import { getCurrentPage, loadMarkdown, updateBreadcrumb } from "./utils";
import { tokenize, loadIncludes } from "./tokenizer";
import { parse } from "./parser";
import { render } from "./createTabs";

const overlay = document.getElementById("overlay");

async function init() {
  overlay.classList.toggle("show");
  renderSidebar();

  const page = getCurrentPage();

  let md = await loadMarkdown(page);
  md = await loadIncludes(md);
  const tokens = tokenize(md);

  const ast = parse(tokens);

  render(ast);
  updateBreadcrumb(page);
  wrapTables();
  overlay.classList.remove("show");
}

window.addEventListener("hashchange", init);

// initial load
window.addEventListener("DOMContentLoaded", init);

// close when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isMenuButton = menuBtn && menuBtn.contains(e.target);

  // only for small screens
  if (window.innerWidth <= 768) {
    if (!isClickInsideSidebar && !isMenuButton) {
      sidebar.classList.remove("show");
    }
  }
});

// ===== TABLE WRAPPER =====
function wrapTables() {
  document.querySelectorAll("#app table").forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
};