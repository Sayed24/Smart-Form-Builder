/* =========================================
   SMART FORM BUILDER — BUILDER ENGINE
========================================= */

let activeForm = null;
let draggedIndex = null;

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", loadBuilder);

function loadBuilder() {
  const forms = getForms();
  const formId = getActiveFormId();
  activeForm = forms.find(f => f.id === formId);

  if (!activeForm) {
    alert("No active form found");
    location.href = "index.html";
    return;
  }

  document.getElementById("formTitle").value = activeForm.title;
  renderFields();
}

/* ---------- SAVE ---------- */
function saveForm() {
  const forms = getForms().map(f =>
    f.id === activeForm.id ? activeForm : f
  );
  saveForms(forms);
}

/* ---------- TITLE ---------- */
function updateFormTitle(value) {
  activeForm.title = value || "Untitled Form";
  saveForm();
}

/* ---------- ADD FIELD ---------- */
function addField(type) {
  activeForm.fields.push({
    id: "q_" + Date.now(),
    type,
    label: "Untitled Question",
    required: false,
    options: ["Option 1", "Option 2"],
    conditions: []
  });
  saveForm();
  renderFields();
}

/* ---------- RENDER ---------- */
function renderFields() {
  const container = document.getElementById("fieldsContainer");
  container.innerHTML = "";

  activeForm.fields.forEach((field, index) => {
    const card = document.createElement("div");
    card.className = "field-card";
    card.draggable = true;

    card.addEventListener("dragstart", () => draggedIndex = index);
    card.addEventListener("dragover", e => e.preventDefault());
    card.addEventListener("drop", () => reorderFields(index));

    card.innerHTML = `
      <div class="field-header">
        <span class="drag-handle">☰</span>
        <input
          class="field-label"
          value="${field.label}"
          oninput="renameField(${index}, this.value)"
        />
      </div>

      ${renderFieldInput(field)}

      <div class="field-footer">
        <label>
          <input type="checkbox"
            ${field.required ? "checked" : ""}
            onchange="toggleRequired(${index})"
          /> Required
        </label>

        <div class="field-actions">
          <button onclick="duplicateField(${index})">Duplicate</button>
          <button onclick="editConditions(${index})">Logic</button>
          <button onclick="deleteField(${index})">Delete</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* ---------- INPUT PREVIEW ---------- */
function renderFieldInput(field) {
  switch (field.type) {
    case "short": return `<input placeholder="Short answer" disabled />`;
    case "paragraph": return `<textarea placeholder="Long answer" disabled></textarea>`;
    case "email": return `<input type="email" placeholder="Email" disabled />`;
    case "number": return `<input type="number" placeholder="Number" disabled />`;

    case "multiple":
    case "checkbox":
    case "dropdown":
      return `
        <div class="options">
          ${field.options.map((o, i) => `
            <input
              value="${o}"
              oninput="updateOption(${indexOfField(field)}, ${i}, this.value)"
            />
          `).join("")}
          <button onclick="addOption('${field.id}')">+ Option</button>
        </div>
      `;
    default:
      return "";
  }
}

function indexOfField(field) {
  return activeForm.fields.findIndex(f => f.id === field.id);
}

/* ---------- OPTIONS ---------- */
function updateOption(fieldIndex, optIndex, value) {
  activeForm.fields[fieldIndex].options[optIndex] = value;
  saveForm();
}

function addOption(fieldId) {
  const field = activeForm.fields.find(f => f.id === fieldId);
  field.options.push("New Option");
  saveForm();
  renderFields();
}

/* ---------- FIELD ACTIONS ---------- */
function renameField(i, value) {
  activeForm.fields[i].label = value;
  saveForm();
}

function toggleRequired(i) {
  activeForm.fields[i].required = !activeForm.fields[i].required;
  saveForm();
}

function duplicateField(i) {
  const copy = JSON.parse(JSON.stringify(activeForm.fields[i]));
  copy.id = "q_" + Date.now();
  activeForm.fields.splice(i + 1, 0, copy);
  saveForm();
  renderFields();
}

function deleteField(i) {
  if (!confirm("Delete this question?")) return;
  activeForm.fields.splice(i, 1);
  saveForm();
  renderFields();
}

/* ---------- DRAG REORDER ---------- */
function reorderFields(targetIndex) {
  const moved = activeForm.fields.splice(draggedIndex, 1)[0];
  activeForm.fields.splice(targetIndex, 0, moved);
  draggedIndex = null;
  saveForm();
  renderFields();
}

/* ---------- CONDITIONAL LOGIC ---------- */
function editConditions(index) {
  const field = activeForm.fields[index];
  const rule = prompt(
    "Show this question if previous answer equals:",
    field.conditions[0]?.value || ""
  );

  if (rule !== null) {
    field.conditions = [{ operator: "AND", value: rule }];
    saveForm();
  }
}
