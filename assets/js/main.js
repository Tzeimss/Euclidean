const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 60, 260)}ms`;
  revealObserver.observe(element);
});

document.querySelectorAll(".interactive").forEach((element) => {
  element.addEventListener("click", (event) => {
    element.classList.remove("clicked");

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - 6;
    const y = event.clientY - rect.top - 6;

    element.style.setProperty("--ripple-x", `${x}px`);
    element.style.setProperty("--ripple-y", `${y}px`);
    element.classList.add("clicked");

    window.setTimeout(() => element.classList.remove("clicked"), 520);
  });

  element.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 980 || element.classList.contains("button")) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 6;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  element.addEventListener("mouseleave", () => {
    if (!element.classList.contains("button")) {
      element.style.transform = "";
    }
  });
});
