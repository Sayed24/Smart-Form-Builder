/* =====================================
   SMARTFORM BUILDER
   Enterprise Portfolio Version
===================================== */

/* ---------- MULTI-FORM STATE ---------- */
const forms = JSON.parse(localStorage.getItem("smartform_forms")) || {};
let activeFormId = localStorage.getItem("active_form") || "default";

if (!forms[activeFormId]) {
  forms[activeFormId] = {
    title: "Untitled Form",
    fields: []
  };
}

let fields = forms[activeFormId].fields;

/* ---------- ADD FIELD ---------- */
function addField(type) {
  const field = {
    id: Date.now(),
    type,
    label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
    required: false,
    options: type === "select" ? ["Option 1", "Option 2"] : []
  };

  fields.push(field);
  render();
}

/* ---------- MOVE FIELD ---------- */
function moveField(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= fields.length) return;

  [fields[index], fields[newIndex]] = [fields[newIndex], fields[index]];
  render();
}

/* ---------- REMOVE FIELD ---------- */
function removeField(index) {
  if (!confirm("Remove this field?")) return;
  fields.splice(index, 1);
  render();
}

/* ---------- UPDATE FIELD ---------- */
function updateLabel(index, value) {
  fields[index].label = value;
}

function toggleRequired(index) {
  fields[index].required = !fields[index].required;
}

/* ---------- OPTIONS (DROPDOWN) ---------- */
function updateOption(fieldIndex, optionIndex, value) {
  fields[fieldIndex].options[optionIndex] = value;
}

function addOption(fieldIndex) {
  fields[fieldIndex].options.push(`Option ${fields[fieldIndex].options.length + 1}`);
  render();
}

function removeOption(fieldIndex, optionIndex) {
  fields[fieldIndex].options.splice(optionIndex, 1);
  render();
}

/* ---------- SAVE FORM ---------- */
function saveForm() {
  forms[activeFormId].fields = fields;
  localStorage.setItem("smartform_forms", JSON.stringify(forms));
  localStorage.setItem("active_form", activeFormId);
  alert("Form saved successfully");
}

/* ---------- FIELD PREVIEW ---------- */
function renderPreview(field) {
  switch (field.type) {
    case "text":
      return `<input type="text" disabled />`;
    case "textarea":
      return `<textarea disabled></textarea>`;
    case "select":
      return `
        <select disabled>
          ${field.options.map(o => `<option>${o}</option>`).join("")}
        </select>
      `;
    case "checkbox":
      return `<input type="checkbox" disabled />`;
    default:
      return "";
  }
}

/* ---------- RENDER BUILDER ---------- */
function render() {
  const container = document.getElementById("formFields");
  container.innerHTML = "";

  fields.forEach((field, index) => {
    const div = document.createElement("div");
    div.className = "field-item";

    div.innerHTML = `
      <label>Label</label>
      <input type="text" value="${field.label}"
        oninput="updateLabel(${index}, this.value)" />

      <div style="margin:0.5rem 0;">
        ${renderPreview(field)}
      </div>

      ${
        field.type === "select"
          ? `
            <div style="margin:0.5rem 0;">
              <strong>Options</strong>
              ${field.options
                .map(
                  (opt, i) => `
                  <div style="display:flex;gap:0.4rem;margin-top:0.4rem;">
                    <input value="${opt}"
                      oninput="updateOption(${index}, ${i}, this.value)" />
                    <button onclick="removeOption(${index}, ${i})">✖</button>
                  </div>
                `
                )
                .join("")}
              <button class="secondary" onclick="addOption(${index})" style="margin-top:0.4rem;">
                ➕ Add Option
              </button>
            </div>
          `
          : ""
      }

      <label style="margin-top:0.5rem;">
        <input type="checkbox" ${field.required ? "checked" : ""}
          onchange="toggleRequired(${index})" />
        Required
      </label>

      <div style="display:flex;gap:0.5rem;margin-top:0.6rem;">
        <button onclick="moveField(${index}, -1)">⬆</button>
        <button onclick="moveField(${index}, 1)">⬇</button>
        <button class="secondary" onclick="removeField(${index})">🗑</button>
      </div>
    `;

    container.appendChild(div);
  });
}

/* ---------- INIT ---------- */
render();
