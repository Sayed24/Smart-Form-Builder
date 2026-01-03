document.addEventListener("DOMContentLoaded", () => {
  const adminBtn = document.getElementById("adminBtn");
  const viewerBtn = document.getElementById("viewerBtn");

  if (!adminBtn || !viewerBtn) {
    console.error("Auth buttons not found");
    return;
  }

  adminBtn.onclick = () => {
    localStorage.setItem("role", "admin");
    location.href = "builder.html";
  };

  viewerBtn.onclick = () => {
    localStorage.setItem("role", "viewer");
    location.href = "form.html";
  };
});
