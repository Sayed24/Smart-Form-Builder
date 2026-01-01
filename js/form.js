const formEl = document.getElementById("form");
const forms = JSON.parse(localStorage.getItem("forms"));
const index = localStorage.getItem("activeForm");
const fields = forms[index].fields;

fields.forEach(f => {
  const div = document.createElement("div");
  div.innerHTML = `
    <label>${f.label}</label>
    <input />
  `;
  formEl.appendChild(div);
});

function submitForm() {
  alert("Form submitted (demo)");
}
