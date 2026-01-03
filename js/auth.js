function login(role) {
  localStorage.setItem("role", role);

  if (role === "admin") {
    location.href = "builder.html";
  } else {
    location.href = "form.html";
  }
}

function requireRole(required) {
  const role = localStorage.getItem("role");
  if (!role || (required && role !== required)) {
    location.href = "index.html";
  }
}
