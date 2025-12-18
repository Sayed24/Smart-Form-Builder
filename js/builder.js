/* =====================================================
   SMARTFORM BUILDER — MOBILE & DESKTOP
===================================================== */

const formCanvas = document.getElementById("formCanvas");
const fieldSettings = document.getElementById("fieldSettings");

let fields = JSON.parse(localStorage.getItem("smartform_fields")) || [];
let selectedFieldId = null;
let dragIndex = null;

/* -----------------------------
   FIELD TEMPLATES
----------------------------- */
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

/* -----------------------------
   ADD FIELD
----------------------------- */
window.addField = function (type) {
  fields.push(templates[type]());
  persist();
  render();
};

/* -----------------------------
   RENDER
----------------------------- */
function render() {
  formCanvas.innerHTML = "";

  fields.forEach((field, index) => {
    const card = document.createElement("div");
    card.className = "field";
    card.dataset.index = index;

    card.innerHTML = `
      <strong>${field.label}</strong>
      <div class="muted">${field.type}</div>
    `;

    /* Select field */
    card.addEventListener("click", () => selectField(index));

    /* Desktop Drag */
    card.draggable = true;

    card.addEventListener("dragstart", e => {
      dragIndex = index;
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    card.addEventListener("dragover", e => e.preventDefault());

    card.addEventListener("drop", () => reorder(index));

    /* Mobile Touch Reorder */
    card.addEventListener("touchstart", () => {
      dragIndex = index;
      card.classList.add("dragging");
    });

    card.addEventListener("touchend", () => {
      card.classList.remove("dragging");
      dragIndex = null;
    });

    card.addEventListener("touchmove", e => {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains("field")) {
        const toIndex = Number(target.dataset.index);
        reorder(toIndex);
      }
    });

    formCanvas.appendChild(card);
  });
}

/* -----------------------------
   REORDER LOGIC
----------------------------- */
function reorder(toIndex) {
  if (dragIndex === null || dragIndex === toIndex) return;

  const moved = fields.splice(dragIndex, 1)[0];
  fields.splice(toIndex, 0, moved);
  dragIndex = toIndex;

  persist();
  render();
}

/* -----------------------------
   FIELD SETTINGS
----------------------------- */
function selectField(index) {
  selectedFieldId = index;
  const field = fields[index];

  fieldSettings.innerHTML = `
    <label>Label</label>
    <input type="text" value="${field.label}" />

    <label class="checkbox">
      <input type="checkbox" ${field.required ? "checked" : ""} />
      Required
    </label>
  `;

  const [labelInput, requiredInput] =
    fieldSettings.querySelectorAll("input");

  labelInput.oninput = e => {
    field.label = e.target.value;
    persist();
    render();
  };

  requiredInput.onchange = e => {
    field.required = e.target.checked;
    persist();
  };
}

/* -----------------------------
   STORAGE
----------------------------- */
function persist() {
  localStorage.setItem("smartform_fields", JSON.stringify(fields));
}

/* -----------------------------
   INIT
----------------------------- */
render();
