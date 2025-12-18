/* =====================================
   SMARTFORM ROLE MANAGEMENT
===================================== */

const role =
  localStorage.getItem("smartform_role") || "admin";

function requireAdmin() {
  if (role !== "admin") {
    alert("Admin access required");
    window.location.href = "form.html";
  }
}

/* UI badge (optional but professional) */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".app-header");
  if (!header) return;

  const badge = document.createElement("span");
  badge.style.fontSize = "0.75rem";
  badge.style.opacity = "0.6";
  badge.textContent = role === "admin" ? "Admin Mode" : "Viewer Mode";

  header.appendChild(badge);
});
