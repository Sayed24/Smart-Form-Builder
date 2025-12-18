/* =========================
   SMART FORM BUILDER
   Builder Logic
========================= */

const formCanvas = document.getElementById("formCanvas");
const fieldSettings = document.getElementById("fieldSettings");

let fields = JSON.parse(localStorage.getItem("smartform_fields")) || [];
let selectedFieldId = null;

/* =========================
   FIELD TEMPLATES
========================= */
const templates = {
  text: () => ({
    id: Date.now(),
    type: "text",
    label: "Text Field",
    required: false
  }),
  textarea: () => ({
    id: Date.now(),
    type: "textarea",
    label: "Paragraph",
    required: false
  }),
  select: () => ({
    id: Date.now(),
    type: "select",
    label: "Dropdown",
    options: ["Option 1", "Option 2"]
  }),
  checkbox: () => ({
    id: Date.now(),
    type: "checkbox",
    label: "Checkbox"
  })
};

/* =========================
   ADD FIELD
========================= */
window.addField = function (type) {
  fields.push(templates[type]());
  persist();
  render();
};

/* =========================
   RENDER
========================= */
function render() {
  formCanvas.innerHTML = "";

  fields.forEach((field, index) => {
    const el = document.createElement("div");
    el.className = "field";
    el.draggable = true;
    el.dataset.id = field.id;

    el.innerHTML = `
      <strong>${field.label}</strong>
      <div class="muted">${field.type}</div>
    `;

    /* Select */
    el.onclick = () => selectField(field.id);

    /* Drag */
    el.ondragstart = e => {
      el.classList.add("dragging");
      e.dataTransfer.setData("text/plain", index);
    };

    el.ondragend = () => el.classList.remove("dragging");

    el.ondragover = e => {
      e.preventDefault();
      el.classList.add("drop-target");
    };

    el.ondragleave = () => el.classList.remove("drop-target");

    el.ondrop = e => {
      e.preventDefault();
      el.classList.remove("drop-target");

      const from = Number(e.dataTransfer.getData("text/plain"));
      const to = index;

      if (from !== to) {
        const moved = fields.splice(from, 1)[0];
        fields.splice(to, 0, moved);
        persist();
        render();
      }
    };

    formCanvas.appendChild(el);
  });
}

/* =========================
   SELECT FIELD
========================= */
function selectField(id) {
  selectedFieldId = id;
  const field = fields.find(f => f.id === id);
  if (!field) return;

  fieldSettings.innerHTML = `
    <label>Label</label>
    <input type="text" value="${field.label}" id="labelInput" />

    <label>
      <input type="checkbox" id="requiredInput" ${field.required ? "checked" : ""} />
      Required
    </label>
  `;

  document.getElementById("labelInput").oninput = e => {
    field.label = e.target.value;
    persist();
    render();
  };

  const req = document.getElementById("requiredInput");
  if (req) {
    req.onchange = e => {
      field.required = e.target.checked;
      persist();
    };
  }
}

/* =========================
   STORAGE
========================= */
function persist() {
  localStorage.setItem("smartform_fields", JSON.stringify(fields));
}

/* =========================
   INIT
========================= */
render();
