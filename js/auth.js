/* ===============================
   AUTH SIMULATION (NO BACKEND)
   Admin / Viewer roles
================================ */

const AUTH_KEY = "smartform_user_role";

/* --------- INIT CHECK --------- */
function initPage() {
  const role = localStorage.getItem(AUTH_KEY);

  // If not logged in, redirect to login
  if (!role && !location.pathname.includes("login.html")) {
    location.href = "login.html";
    return;
  }

  // Protect admin-only pages
  if (
    role === "viewer" &&
    (location.pathname.includes("builder.html") ||
     location.pathname.includes("analytics.html"))
  ) {
    alert("Access denied. Admins only.");
    location.href = "index.html";
  }

  applyDarkMode();
  showRoleBadge(role);
}

/* --------- LOGIN --------- */
function loginAs(role) {
  localStorage.setItem(AUTH_KEY, role);
  location.href = "index.html";
}

/* --------- LOGOUT --------- */
function logout() {
  localStorage.removeItem(AUTH_KEY);
  location.href = "login.html";
}

/* --------- ROLE BADGE --------- */
function showRoleBadge(role) {
  const header = document.querySelector(".topbar");
  if (!header || !role) return;

  let badge = document.getElementById("roleBadge");
  if (!badge) {
    badge = document.createElement("span");
    badge.id = "roleBadge";
    badge.style.marginLeft = "1rem";
    badge.style.fontSize = "0.9rem";
    badge.style.opacity = "0.8";
    header.appendChild(badge);
  }

  badge.textContent = role === "admin" ? "Admin Mode" : "Viewer Mode";
}

/* --------- DARK MODE --------- */
function toggleDark() {
  const current = localStorage.getItem("smartform_dark") === "true";
  localStorage.setItem("smartform_dark", !current);
  applyDarkMode();
}

function applyDarkMode() {
  const dark = localStorage.getItem("smartform_dark") === "true";
  document.body.classList.toggle("dark", dark);
}
