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