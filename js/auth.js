/* ===============================
   AUTH SIMULATION (STABLE)
================================ */

const ROLE_KEY = "smartform_role";

/* ---------- INIT ---------- */
function initPage() {
  const role = localStorage.getItem(ROLE_KEY);
  const isLogin = location.pathname.includes("login.html");

  // Allow login page without redirect
  if (isLogin) return;

  // Redirect if not logged in
  if (!role) {
    location.href = "login.html";
    return;
  }

  applyDarkMode();
}

/* ---------- LOGIN ---------- */
function login(role) {
  localStorage.setItem(ROLE_KEY, role);
  location.href = "index.html";
}

/* ---------- LOGOUT ---------- */
function logout() {
  localStorage.removeItem(ROLE_KEY);
  location.href = "login.html";
}

/* ---------- DARK MODE ---------- */
function toggleDark() {
  const dark = localStorage.getItem("dark") === "true";
  localStorage.setItem("dark", !dark);
  applyDarkMode();
}

function applyDarkMode() {
  document.body.classList.toggle(
    "dark",
    localStorage.getItem("dark") === "true"
  );
}
