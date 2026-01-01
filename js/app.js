const list = document.getElementById("formList");

function loadForms() {
  list.innerHTML = "";
  const forms = JSON.parse(localStorage.getItem("forms")) || [];

  forms.forEach((f, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${f.name}
      <button onclick="openForm(${i})">Open</button>
    `;
    list.appendChild(li);
  });
}

function createForm() {
  const name = prompt("Form name?");
  if (!name) return;

  const forms = JSON.parse(localStorage.getItem("forms")) || [];
  forms.push({ name, fields: [] });
  localStorage.setItem("forms", JSON.stringify(forms));
  loadForms();
}

function openForm(i) {
  localStorage.setItem("activeForm", i);
  location.href = "builder.html";
}

document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
};

if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}

loadForms();
