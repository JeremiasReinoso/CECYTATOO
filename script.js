const WHATSAPP_URL = "https://wa.me/5490000000000";

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const galleryItems = document.querySelectorAll(".gallery-item");
const waFloat = document.getElementById("wa-float");
const revealElements = document.querySelectorAll(".reveal");

function openLightbox(imageUrl, imageAlt) {
  lightboxImage.src = imageUrl;
  lightboxImage.alt = imageAlt || "Imagen ampliada de tatuaje";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    const fullImage = item.dataset.full || image.src;
    openLightbox(fullImage, image.alt);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

waFloat.addEventListener("click", () => {
  window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => observer.observe(element));
