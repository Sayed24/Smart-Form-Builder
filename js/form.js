const forms = JSON.parse(localStorage.getItem("forms"));
const form = forms[localStorage.getItem("activeForm")];

document.getElementById("title").textContent = form.title;
document.getElementById("desc").textContent = form.desc;

const formEl = document.getElementById("form");

form.fields.forEach(f => {
  const div = document.createElement("div");
  div.innerHTML = `
    <label>${f.label}</label>
    <input />
  `;
  formEl.appendChild(div);
});

function submitForm() {
  alert("Response submitted (demo)");
}
