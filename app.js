const viewer = document.querySelector(".image-viewer");
document.querySelectorAll("[data-image]").forEach((button) => {
  button.addEventListener("click", () => {
    viewer.querySelector("img").src = button.dataset.image;
    viewer.querySelector("img").alt = button.querySelector("img").alt;
    viewer.querySelector("p").textContent = button.dataset.caption;
    viewer.showModal();
  });
});
viewer
  .querySelector(".close-viewer")
  .addEventListener("click", () => viewer.close());
viewer.addEventListener("click", (event) => {
  const bounds = viewer.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    viewer.close();
});
let copyReset;
document.querySelector(".copy-email").addEventListener("click", async () => {
  const status = document.querySelector(".copy-status");
  clearTimeout(copyReset);
  try {
    await navigator.clipboard.writeText("jonathan@studystash.com");
    status.textContent = "Copied!";
  } catch {
    status.textContent = "You can select and copy the address above.";
  }
  copyReset = setTimeout(() => {
    status.textContent = "";
  }, 4000);
});
