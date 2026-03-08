const routes = {
  home: "home",
  about: "about",
  user: "user"
};

async function router() {
  const hash = location.hash.slice(1) || "home";

  let page = hash.split("/")[0];
  let param = hash.split("/")[1];

  if (!routes[page]) {
    const res = await fetch("pages/404.html");
    document.getElementById("app").innerHTML = await res.text();
    return;
  }

  const res = await fetch(`pages/${routes[page]}.html`);
  let html = await res.text();

  if (param) {
    html = html.replace("{{id}}", param);
  }

  document.getElementById("app").innerHTML = html;
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);