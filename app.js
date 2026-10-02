const themeButton = document.querySelector(".theme-toggle");
const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");
let chosenTheme;
try {
  chosenTheme = localStorage.getItem("jg-theme");
} catch {}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute(
    "aria-label",
    `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
  );
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#15171c" : "#ffffff";
}
applyTheme(chosenTheme || (colorPreference.matches ? "dark" : "light"));
themeButton.addEventListener("click", () => {
  chosenTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(chosenTheme);
  try {
    localStorage.setItem("jg-theme", chosenTheme);
  } catch {}
});
colorPreference.addEventListener("change", (event) => {
  if (!chosenTheme) applyTheme(event.matches ? "dark" : "light");
});
const clock = document.querySelector("#clock");
function updateClock() {
  const now = new Date();
  clock.dateTime = now.toISOString();
  clock.textContent = `${now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC`;
}
updateClock();
setInterval(updateClock, 10000);
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
