// const yearEle = document.getElementById("year");
// const now = new Date();
// yearEle.innerText = now.getFullYear();

console.log('hello');

const appEle = document.getElementById("app");
const headerEle = document.getElementById("header-container");
loadPage("layout/Header", headerEle);

const footerEle = document.getElementById("footer-container");
loadPage("layout/Footer", footerEle);

async function loadPage(page, element) {
  const res = await fetch(`/Learn-To-PR/pages/${page}.html`);
  const html = await res.text();
  element.innerHTML = html;
}

async function router() {
  const route = location.hash.slice(1) || "home";
  if (route === "home") {
    loadPage("Home", appEle);
  } else if (route === "leaderboard") {
    loadPage("Leaderboard", appEle);
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
