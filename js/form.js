const form = document.getElementById("form");
const fields = getForm();

fields.forEach(f => {
  const div = document.createElement("div");
  div.innerHTML = `
    <label>${f.label}</label>
    ${f.type === "textarea"
      ? "<textarea></textarea>"
      : f.type === "select"
      ? "<select><option>Option</option></select>"
      : "<input type='text'>"}
  `;
  form.appendChild(div);
});

function submitForm() {
  alert("Form submitted (demo)");
}
