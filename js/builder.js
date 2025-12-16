const canvas = document.getElementById("formCanvas");
const elements = document.querySelectorAll(".element");
const settingsPanel = document.getElementById("settingsPanel");

let fields = [];
let selectedFieldId = null;
let previewMode = false;

/* Drag */
elements.forEach(el => {
  el.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", el.dataset.type);
  });
});

canvas.addEventListener("dragover", e => e.preventDefault());
canvas.addEventListener("drop", e => {
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  addField(type);
});

/* Field Model */
function addField(type) {
  fields.push({
    id: Date.now(),
    type,
    label: `${type} field`,
    required: false,
    showIf: null
  });
  render();
}

/* Render */
function render() {
  canvas.innerHTML = "";
  if (!fields.length) {
    canvas.innerHTML = `<p class="empty">Drag elements here</p>`;
    return;
  }

  fields.forEach(field => {
    if (field.showIf && !evaluateLogic(field.showIf)) return;

    const div = document.createElement("div");
    div.className = "field";
    if (field.id === selectedFieldId) div.classList.add("selected");

    div.innerHTML = `
      <strong>${field.label}</strong>
      <div>${renderInput(field)}</div>
    `;

    if (!previewMode) {
      div.onclick = () => selectField(field.id);
    }

    canvas.appendChild(div);
  });
}

/* Inputs */
function renderInput(field) {
  switch (field.type) {
    case "textarea": return `<textarea placeholder="Your answer"></textarea>`;
    case "email": return `<input type="email" placeholder="email@example.com">`;
    case "date": return `<input type="date">`;
    case "number": return `<input type="number">`;
    case "url": return `<input type="url" placeholder="https://">`;
    case "rating":
      return `
        <div class="rating">
          ${[1,2,3,4,5].map(n => `<span>☆</span>`).join("")}
        </div>`;
    case "section":
      return `<hr>`;
    default:
      return `<input type="text" placeholder="Your answer">`;
  }
}

/* Select Field */
function selectField(id) {
  selectedFieldId = id;
  const field = fields.find(f => f.id === id);

  settingsPanel.innerHTML = `
    <label>Label</label>
    <input id="labelInput" value="${field.label}">

    <label>
      <input type="checkbox" id="requiredInput" ${field.required ? "checked" : ""}>
      Required
    </label>

    <div class="logic">
      <strong>Conditional Logic</strong>
      <select id="logicField">
        <option value="">None</option>
        ${fields.filter(f => f.id !== field.id)
          .map(f => `<option value="${f.id}">${f.label}</option>`)}
      </select>
      <input id="logicValue" placeholder="Value">
    </div>
  `;

  document.getElementById("labelInput").oninput = e => {
    field.label = e.target.value;
    render();
  };

  document.getElementById("requiredInput").onchange = e => {
    field.required = e.target.checked;
  };

  document.getElementById("logicField").onchange = e => {
    field.showIf = e.target.value
      ? { fieldId: +e.target.value, value: "" }
      : null;
  };

  document.getElementById("logicValue").oninput = e => {
    if (field.showIf) field.showIf.value = e.target.value;
  };

  render();
}

/* Logic Evaluation */
function evaluateLogic(condition) {
  const target = document.querySelector(
    `[data-field="${condition.fieldId}"] input`
  );
  return target && target.value === condition.value;
}

/* Preview */
document.getElementById("previewToggle").onclick = () => {
  previewMode = !previewMode;
  document.body.classList.toggle("preview");
  render();
};

/* Theme */
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

document.getElementById("primaryColor").oninput = e => {
  document.documentElement.style.setProperty("--primary", e.target.value);
};

/* Save */
document.getElementById("saveForm").onclick = () => {
  localStorage.setItem("smartForm", JSON.stringify(fields));
  alert("Form saved!");
};

/* Load */
const saved = localStorage.getItem("smartForm");
if (saved) {
  fields = JSON.parse(saved);
  render();
}

/* Mobile Panel Toggle */
const mobileMenu = document.getElementById("mobileMenu");

mobileMenu.onclick = () => {
  document.querySelector(".elements").classList.toggle("active");
};

/* Auto Preview on Mobile */
if (window.innerWidth < 768) {
  previewMode = true;
  document.body.classList.add("preview");
}

/* Close panels on field select (mobile UX) */
function selectField(id) {
  selectedFieldId = id;
  const field = fields.find(f => f.id === id);

  settingsPanel.innerHTML = `
    <label>Label</label>
    <input id="labelInput" value="${field.label}">

    <label>
      <input type="checkbox" id="requiredInput" ${field.required ? "checked" : ""}>
      Required
    </label>

    <div class="logic">
      <strong>Conditional Logic</strong>
      <select id="logicField">
        <option value="">None</option>
        ${fields.filter(f => f.id !== field.id)
          .map(f => `<option value="${f.id}">${f.label}</option>`)}
      </select>
      <input id="logicValue" placeholder="Value">
    </div>
  `;

  document.querySelector(".settings").classList.add("active");

  document.getElementById("labelInput").oninput = e => {
    field.label = e.target.value;
    render();
  };

  document.getElementById("requiredInput").onchange = e => {
    field.required = e.target.checked;
  };

  document.getElementById("logicField").onchange = e => {
    field.showIf = e.target.value
      ? { fieldId: +e.target.value, value: "" }
      : null;
  };

  document.getElementById("logicValue").oninput = e => {
    if (field.showIf) field.showIf.value = e.target.value;
  };

  render();
}
