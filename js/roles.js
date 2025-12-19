/* =====================================
   SMARTFORM ROLE + THEME MANAGEMENT
   Portfolio / Interview Safe
===================================== */

/* ---------- ROLE MANAGEMENT ---------- */
const role = localStorage.getItem("smartform_role") || "admin";

/* Protect admin-only pages */
function requireAdmin() {
  if (role !== "admin") {
    alert("Admin access required. Redirecting to public form.");
    window.location.href = "form.html";
  }
}

/* Show role badge in header */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".app-header");
  if (!header) return;

  const badge = document.createElement("span");
  badge.style.fontSize = "0.75rem";
  badge.style.opacity = "0.6";
  badge.style.marginLeft = "0.8rem";
  badge.textContent = role === "admin" ? "Admin Mode" : "Viewer Mode";

  header.appendChild(badge);
});

/* ---------- DARK MODE ---------- */
const savedTheme = localStorage.getItem("smartform_theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "smartform_theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
});
