let fields = getForm();
const container = document.getElementById("fields");

function addField(type) {
  fields.push({
    type,
    label: type.toUpperCase()
  });
  render();
}

function saveForm() {
  saveFormData(fields);
  alert("Form saved!");
}

function render() {
  container.innerHTML = "";
  fields.forEach((f, i) => {
    const div = document.createElement("div");
    div.className = "field";
    div.innerHTML = `
      <input value="${f.label}" 
        oninput="fields[${i}].label=this.value">
      <small>${f.type}</small>
    `;
    container.appendChild(div);
  });
}

render();
