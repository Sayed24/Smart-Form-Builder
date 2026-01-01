const list = document.getElementById("formList");

function loadForms() {
  list.innerHTML = "";
  const forms = JSON.parse(localStorage.getItem("forms")) || [];
  forms.forEach((f, i) => {
    const div = document.createElement("div");
    div.className = "form-card";
    div.innerHTML = `
      <h3>${f.title}</h3>
      <button onclick="openForm(${i})">Open</button>
    `;
    list.appendChild(div);
  });
}

function createForm() {
  const forms = JSON.parse(localStorage.getItem("forms")) || [];
  forms.push({ title: "Untitled form", desc: "", fields: [] });
  localStorage.setItem("forms", JSON.stringify(forms));
  openForm(forms.length - 1);
}

function openForm(i) {
  localStorage.setItem("activeForm", i);
  location.href = "builder.html";
}

document.getElementById("darkToggle").onclick = () =>
  document.body.classList.toggle("dark");

loadForms();
