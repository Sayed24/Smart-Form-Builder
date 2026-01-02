/* =========================================
   SMART FORM BUILDER — PUBLIC FORM ENGINE
========================================= */

let activeForm = null;
let answers = {};

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", initForm);

function initForm() {
  const params = new URLSearchParams(window.location.search);
  const formId = params.get("form");

  if (!formId) {
    alert("Form not found");
    return;
  }

  const forms = getForms();
  activeForm = forms.find(f => f.id === formId);

  if (!activeForm) {
    alert("Form not found");
    return;
  }

  document.getElementById("formTitle").textContent = activeForm.title;
  renderForm();

  document.getElementById("submitBtn").addEventListener("click", submitForm);
}

/* ---------- RENDER FORM ---------- */
function renderForm() {
  const form = document.getElementById("publicForm");
  form.innerHTML = "";

  activeForm.fields.forEach(field => {
    if (!shouldShowField(field)) return;

    const wrap = document.createElement("div");
    wrap.className = "public-field";

    wrap.innerHTML = `
      <label>
        ${field.label}
        ${field.required ? `<span class="req">*</span>` : ""}
      </label>
      ${renderInput(field)}
    `;

    form.appendChild(wrap);
  });
}

/* ---------- INPUT TYPES ---------- */
function renderInput(field) {
  switch (field.type) {
    case "short":
      return `<input oninput="updateAnswer('${field.id}', this.value)" />`;

    case "paragraph":
      return `<textarea oninput="updateAnswer('${field.id}', this.value)"></textarea>`;

    case "email":
      return `<input type="email" oninput="updateAnswer('${field.id}', this.value)" />`;

    case "number":
      return `<input type="number" oninput="updateAnswer('${field.id}', this.value)" />`;

    case "multiple":
      return field.options.map(o => `
        <label class="option">
          <input type="radio" name="${field.id}"
            onchange="updateAnswer('${field.id}', '${o}')" />
          ${o}
        </label>
      `).join("");

    case "checkbox":
      return field.options.map(o => `
        <label class="option">
          <input type="checkbox"
            onchange="toggleCheckbox('${field.id}', '${o}', this.checked)" />
          ${o}
        </label>
      `).join("");

    case "dropdown":
      return `
        <select onchange="updateAnswer('${field.id}', this.value)">
          <option value="">Select</option>
          ${field.options.map(o => `<option>${o}</option>`).join("")}
        </select>
      `;

    default:
      return "";
  }
}

/* ---------- ANSWERS ---------- */
function updateAnswer(id, value) {
  answers[id] = value;
  renderForm(); // re-evaluate conditions
}

function toggleCheckbox(id, value, checked) {
  if (!answers[id]) answers[id] = [];
  if (checked) answers[id].push(value);
  else answers[id] = answers[id].filter(v => v !== value);
}

/* ---------- CONDITIONAL LOGIC ---------- */
function shouldShowField(field) {
  if (!field.conditions || !field.conditions.length) return true;

  return field.conditions.every(rule => {
    const prevValue = Object.values(answers).join("");
    return prevValue === rule.value;
  });
}

/* ---------- VALIDATION ---------- */
function validateRequired() {
  for (let field of activeForm.fields) {
    if (field.required && !answers[field.id]) {
      alert(`Please fill: ${field.label}`);
      return false;
    }
  }
  return true;
}

/* ---------- SUBMIT ---------- */
function submitForm() {
  if (!validateRequired()) return;

  activeForm.responses.push({
    ...answers,
    submittedAt: new Date().toISOString()
  });

  saveForms(
    getForms().map(f => f.id === activeForm.id ? activeForm : f)
  );

  alert("Form submitted successfully!");
  document.getElementById("publicForm").innerHTML = "<p>Thank you for your response.</p>";
  document.getElementById("submitBtn").style.display = "none";
}
