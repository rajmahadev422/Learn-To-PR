// utils.js - Utility functions for the documentation viewer

// ===== MENU BUTTON =====
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const layout = document.getElementById("layout");
menuBtn.onclick = () => {
  sidebar.classList.toggle("show");
};

function getCurrentPage() {
  const hash = window.location.hash;
  // default page
  if (!hash || hash === "#") return false;

  // remove #/
  return hash.replace(/^#\/?/, "");
}

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
