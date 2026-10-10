
document.addEventListener("DOMContentLoaded", () => {
  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  // CLOSE MOBILE MENU AFTER CLICKING A LINK
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    });
  });

  // DARK MODE
  const themeToggle = document.getElementById("themeToggle");

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    themeToggle.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  });

  // AUTOMATIC COPYRIGHT YEAR
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = navLinks.querySelectorAll('a[href^="#"]');

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navigationLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // PROJECT IMAGE PREVIEW
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");

  document.querySelectorAll(".project-preview").forEach((link) => {
    link.addEventListener("click", (event) => {
      const imageUrl = link.getAttribute("href");

      // Only preview local image files
      if (!imageUrl || !/\.(png|jpe?g|webp|gif)$/i.test(imageUrl)) {
        return;
      }

      event.preventDefault();
      modalImage.src = imageUrl;
      modalImage.alt = link.querySelector("img")?.alt || "Project preview";

      imageModal.classList.add("open");
      imageModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      modalClose.focus();
    });
  });

  function closeImageModal() {
    imageModal.classList.remove("open");
    imageModal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeImageModal);

  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      closeImageModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeImageModal();

      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });

  // CONTACT FORM
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = "Please complete all fields.";
      return;
    }

    // This form does not send email by itself.
    // Open the visitor's email application with the message prepared.
    const recipient = "yourname@email.com"; // Replace with your real email
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formMessage.textContent =
      "Opening your email application. Please send the prepared message there.";

    window.location.href =
      `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
});
