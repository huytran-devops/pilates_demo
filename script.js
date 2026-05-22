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
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      const filter = tab.dataset.filter;
      filterCards.forEach((card) => {
        card.style.display = filter === "all" || card.dataset.cat === filter ? "" : "none";
      });
    });
  });
}
