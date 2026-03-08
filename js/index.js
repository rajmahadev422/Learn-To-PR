
const hash = location.hash.slice(1);

console.log(hash);

function updateYear() {
  const yearEle = document.getElementById("year");
  if (yearEle) {
    yearEle.innerText = new Date().getFullYear();
  }
}

const appEle = document.getElementById('app');

    async function loadPage(page, element) {
      const res = await fetch(`/pages/${page}.html`);
      const html = await res.text();
      element.innerHTML = html;
    }
    loadPage('Home', appEle);

    const footerEle = document.getElementById('footer-container');
    loadPage('layout/Footer', footerEle);

    const headerEle = document.getElementById('header-container');
    loadPage('layout/Header', headerEle);

    updateYear();