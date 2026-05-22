// ── Google Analytics 4 ───────────────────────────────────
(function () {
  const GA_ID = "G-8JG3CMCKQN";
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
})();

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

// ── Smooth anchor scroll with header offset ───────────────
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute("href").slice(1);
  if (!id) return;
  e.preventDefault();
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -40px 0px"
  }
);

document.querySelectorAll(".reveal, .reveal-item").forEach((node) => {
  observer.observe(node);
});

const trialForm = document.querySelector(".trial-form");

if (trialForm) {
  trialForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitBtn = trialForm.querySelector("button[type='submit']");

    // Fire GA4 lead event
    if (typeof gtag === "function") {
      gtag("event", "generate_lead", {
        event_category: "Trial Form",
        event_label: "Đăng ký tập thử",
      });
    }

    if (submitBtn) {
      const oldText = submitBtn.textContent;
      submitBtn.textContent = "Đã ghi nhận";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = oldText;
        submitBtn.disabled = false;
        trialForm.reset();
      }, 1400);
    }
  });
}

// ── Floating multi-channel contact ───────────────────────
const floatContact = document.getElementById("floatContact");
const floatToggle = document.getElementById("floatToggle");

if (floatContact && floatToggle) {
  floatToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    floatContact.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!floatContact.contains(e.target)) {
      floatContact.classList.remove("open");
    }
  });
}

// ── Category filter tabs (tin-tuc page) ──────────────────
const filterTabs = document.querySelectorAll(".filter-tab");
const filterCards = document.querySelectorAll(".article-card[data-cat]");

if (filterTabs.length > 0) {
  // Immediately reveal the news section and all cards — no scroll trigger needed for a filterable grid
  document.querySelectorAll(".news.reveal, .page-hero.reveal").forEach((el) => el.classList.add("visible"));
  filterCards.forEach((card) => card.classList.add("visible"));

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      const filter = tab.dataset.filter;
      filterCards.forEach((card) => {
        const show = filter === "all" || card.dataset.cat === filter;
        card.style.display = show ? "" : "none";
        if (show) card.classList.add("visible");
      });
    });
  });
}
