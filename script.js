const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState);

const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((element) => {
  const delay = element.dataset.delay;
  if (delay) {
    element.style.setProperty("--delay", `${delay}ms`);
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));