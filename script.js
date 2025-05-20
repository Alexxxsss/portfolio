document.addEventListener("DOMContentLoaded", () => {
  // --- Current Year for Footer ---
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- Scroll Animations ---
  const animatedSections = document.querySelectorAll(".animated-section");
  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Optional: stop observing once animated
      }
    });
  }, observerOptions);

  animatedSections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // --- Mobile Navigation Toggle ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");

  if (menuToggle && navUl) {
    menuToggle.addEventListener("click", () => {
      navUl.classList.toggle("active");
      menuToggle.classList.toggle("active"); // For hamburger animation
    });

    // Close menu when a link is clicked (for single-page navigation)
    navUl.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navUl.classList.contains("active")) {
          navUl.classList.remove("active");
          menuToggle.classList.remove("active");
        }
      });
    });
  }

  // --- Active Navigation Link Highlighting on Scroll ---
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      // Adjust offset for fixed header height (approx 70px in this case)
      if (pageYOffset >= sectionTop - 80) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });

    // Special case for hero section if at the very top
    if (pageYOffset < sections[0].offsetTop - 80) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const homeLink = document.querySelector('nav ul li a[href="#hero"]');
      if (homeLink) homeLink.classList.add("active");
    }
  });
});
