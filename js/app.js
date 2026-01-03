/* ======================================
   SMART FORM BUILDER — APP CONTROLLER
====================================== */

const FORMS_KEY = "smartform_forms";
const ACTIVE_FORM_KEY = "smartform_active_form";

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  loadFormsList();
  highlightActiveForm();
});

/* ---------- FORM STORAGE ---------- */
function getForms() {
  return JSON.parse(localStorage.getItem(FORMS_KEY)) || [];
}

function saveForms(forms) {
  localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
}

function getActiveFormId() {
  return localStorage.getItem(ACTIVE_FORM_KEY);
}

function setActiveForm(id) {
  localStorage.setItem(ACTIVE_FORM_KEY, id);
}

/* ---------- CREATE FORM ---------- */
function createForm(template = null) {
  const forms = JSON.parse(localStorage.getItem("forms") || "[]");

  const baseForm = {
    id: "form_" + Date.now(),
    title: "Untitled Form",
    fields: [],
    responses: []
  };

  if (template) {
    Object.assign(baseForm, template);
    baseForm.id = "form_" + Date.now();
  }

  forms.push(baseForm);
  localStorage.setItem("forms", JSON.stringify(forms));
  localStorage.setItem("activeForm", baseForm.id);

  location.href = "builder.html";
}
/* ---------- LOAD FORM LIST ---------- */
function loadFormsList() {
  const list = document.getElementById("formsList");
  if (!list) return;

  const forms = getForms();
  list.innerHTML = "";

  if (!forms.length) {
    list.innerHTML = `<p class="muted">No forms yet</p>`;
    return;
  }

  forms.forEach(form => {
    const item = document.createElement("div");
    item.className = "form-card";
    item.innerHTML = `
      <h4>${form.title}</h4>
      <small>${form.fields.length} questions</small>
      <div class="actions">
        <button onclick="openForm('${form.id}')">Open</button>
        <button onclick="shareForm('${form.id}')">Share</button>
        <button onclick="exportCSV('${form.id}')">CSV</button>
        <button onclick="deleteForm('${form.id}')">Delete</button>
      </div>
    `;
    list.appendChild(item);
  });
}

/* ---------- OPEN FORM ---------- */
function openForm(id) {
  setActiveForm(id);
  location.href = "builder.html";
}

/* ---------- DELETE FORM ---------- */
function deleteForm(id) {
  if (!confirm("Delete this form permanently?")) return;

  const forms = getForms().filter(f => f.id !== id);
  saveForms(forms);

  if (getActiveFormId() === id) {
    localStorage.removeItem(ACTIVE_FORM_KEY);
  }

  loadFormsList();
}

/* ---------- SHARE FORM ---------- */
function shareForm(id) {
  const url = `${location.origin}${location.pathname.replace("index.html","")}form.html?form=${id}`;
  navigator.clipboard.writeText(url);
  alert("Shareable link copied!");
}

/* ---------- CSV EXPORT ---------- */
function exportCSV(formId) {
  const forms = getForms();
  const form = forms.find(f => f.id === formId);
  if (!form || !form.responses.length) {
    alert("No responses yet");
    return;
  }

  const headers = form.fields.map(f => f.label);
  const rows = form.responses.map(r =>
    headers.map(h => `"${r[h] || ""}"`).join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${form.title}.csv`;
  a.click();
}

/* ---------- ACTIVE FORM HIGHLIGHT ---------- */
function highlightActiveForm() {
  const id = getActiveFormId();
  if (!id) return;

  document.querySelectorAll(".form-card").forEach(card => {
    if (card.innerHTML.includes(id)) {
      card.classList.add("active");
    }
  });
}
