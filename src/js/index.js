import Header from "./pages/layout/Header.js";
import Footer from "./pages/layout/Footer.js";
import router from "./router.js";

function render() {
  document.querySelector("#header").innerHTML = Header();
  document.querySelector("#footer").innerHTML = Footer();
  router(document.querySelector("#root"));
}

render();
