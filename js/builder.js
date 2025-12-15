const canvas = document.getElementById("formCanvas");
const elements = document.querySelectorAll(".element");
const settingsPanel = document.getElementById("settingsPanel");

let fields = [];
let selectedFieldId = null;

// Drag start
elements.forEach(el => {
  el.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", el.dataset.type);
  });
});

// Allow drop
canvas.addEventListener("dragover", e => e.preventDefault());

canvas.addEventListener("drop", e => {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  addField(type);
});

function addField(type) {
  const id = Date.now();
  const field = {
    id,
    type,
    label: `${type} field`,
    required: false
  };
  fields.push(field);
  render();
}

function render() {
  canvas.innerHTML = "";
  if (fields.length === 0) {
    canvas.innerHTML = `<p class="empty">Drag elements here</p>`;
    return;
  }

  fields.forEach(field => {
    const div = document.createElement("div");
    div.className = "field";
    if (field.id === selectedFieldId) div.classList.add("selected");

    div.innerHTML = `
      <strong>${field.label}</strong>
      <div>${field.type}</div>
    `;

    div.onclick = () => selectField(field.id);
    canvas.appendChild(div);
  });
}

function selectField(id) {
  selectedFieldId = id;
  const field = fields.find(f => f.id === id);

  settingsPanel.innerHTML = `
    <label>Label</label>
    <input value="${field.label}" id="labelInput">

    <label>
      <input type="checkbox" id="requiredInput" ${field.required ? "checked" : ""}>
      Required
    </label>
  `;

  document.getElementById("labelInput").oninput = e => {
    field.label = e.target.value;
    render();
  };

  document.getElementById("requiredInput").onchange = e => {
    field.required = e.target.checked;
  };

  render();
}

// Save
document.getElementById("saveForm").onclick = () => {
  localStorage.setItem("smartForm", JSON.stringify(fields));
  alert("Form saved successfully!");
};

// Load
const saved = localStorage.getItem("smartForm");
if (saved) {
  fields = JSON.parse(saved);
  render();
}
