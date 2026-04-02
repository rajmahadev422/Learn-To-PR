// TOC Logic

const page = getCurrentPage();

const md = page.split(".")[1];
if (md === "md" || md === "markdown") {
  const tocContainer = document.getElementById("toc");

  // Create button
  const btn = document.createElement("button");
  btn.id = "toc-btn";
  btn.className = "toc-btn";
  btn.innerHTML = `<span></span><span></span><span></span>`;

  // Create menu
  const menu = document.createElement("div");
  menu.className = "toc-menu";

  const ul = document.createElement("ul");

  menu.appendChild(ul);
  tocContainer.appendChild(btn);
  tocContainer.appendChild(menu);

  /* Default expand */
  btn.classList.add("active");
  menu.classList.add("show");
  autoCloseToc(5000);

  // Toggle
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    menu.classList.toggle("show");
    // autoCloseToc(5000);
  });

  document.addEventListener("click", (e) => {
    requestAnimationFrame(() => {
      const isClickInside = btn.contains(e.target) || menu.contains(e.target);

      if (!isClickInside) {
        btn.classList.remove("active");
        menu.classList.remove("show");
      }
    });
  });

  function autoCloseToc(time = 3000) {
    setTimeout(() => {
      btn.classList.remove("active");
      menu.classList.remove("show");
    }, time);
  }
  window.addEventListener("DOMContentLoaded", async () => {
    const targetNode = document.getElementById("app");

    const observer = new MutationObserver((mutations) => {
      // Clear the list so you don't get duplicates every time the observer fires
      ul.innerHTML = "";

      const headers = targetNode.querySelectorAll("h1, h2");

      const li1 = document.createElement("li");
      li1.textContent = "Table of Contents";
      li1.classList.add("li1");

      ul.appendChild(li1);
      if (headers.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No headings found";
        ul.appendChild(li);
      } else {
        headers.forEach((h, idx) => {
          const text = h.innerText.trim();
          if (text !== "") {
            const uniqueId = "heading-anchor-" + idx;

            // 1. CRITICAL: Assign the ID to the actual H1/H2 element in the document
            h.id = uniqueId;

            const li = document.createElement("li");
            li.textContent = text;
            li.classList.add("li2");

            li.onclick = () => {
              // 2. Now this will find the H1/H2 element, not the LI
              const targetElement = document.getElementById(uniqueId);
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: "smooth",
                });
              }
            };

            ul.appendChild(li);
          }
        });
      }
    });

    observer.observe(targetNode, { childList: true, subtree: true });
  });
}
