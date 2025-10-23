const btn = document.getElementById("pieroBtn");

btn.addEventListener("click", function (e) {

  const ripple = document.createElement("span");
  ripple.classList.add("piero-ripple");

  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  btn.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);

  btn.style.transform = "scale(0.9)";
  btn.style.transition = "transform 0.1s ease";
  setTimeout(() => {
    btn.style.transform = "scale(1)";
  }, 150);

  setTimeout(() => {
    window.location.href = "Piero-Martinez/index.html";
  }, 300);
});
