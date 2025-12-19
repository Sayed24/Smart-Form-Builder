/* =====================================
   SMARTFORM PUBLIC FORM RENDERER
   Portfolio / Interview Version
===================================== */

/* ---------- LOAD FORM ---------- */
const params = new URLSearchParams(window.location.search);
const formId = params.get("formId") || "default";

const forms =
  JSON.parse(localStorage.getItem("smartform_forms")) || {};

const form = forms[formId];

const formContainer = document.getElementById("publicForm");
const submitBtn = document.getElementById("submitBtn");
const titleEl = document.getElementById("formTitle");

if (!form) {
  formContainer.innerHTML = "<p>Form not found.</p>";
  submitBtn.style.display = "none";
  throw new Error("Form not found");
}

titleEl.textContent = form.title || "Public Form";

/* ---------- RENDER FIELDS ---------- */
function renderForm() {
  formContainer.innerHTML = "";

  form.fields.forEach((field, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "form-group";

    const label = document.createElement("label");
    label.textContent = field.label + (field.required ? " *" : "");

    let input;

    switch (field.type) {
      case "text":
        input = document.createElement("input");
        input.type = "text";
        break;

      case "textarea":
        input = document.createElement("textarea");
        break;

      case "select":
        input = document.createElement("select");
        field.options.forEach(opt => {
          const option = document.createElement("option");
          option.value = opt;
          option.textContent = opt;
          input.appendChild(option);
        });
        break;

      case "checkbox":
        input = document.createElement("input");
        input.type = "checkbox";
        break;

      default:
        return;
    }

    input.dataset.required = field.required;
    input.dataset.label = field.label;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    formContainer.appendChild(wrapper);
  });
}

/* ---------- SUBMIT ---------- */
submitBtn.addEventListener("click", () => {
  const inputs = formContainer.querySelectorAll("input, textarea, select");
  const response = {};
  let valid = true;

  inputs.forEach(input => {
    const required = input.dataset.required === "true";
    const label = input.dataset.label;

    let value =
      input.type === "checkbox" ? input.checked : input.value.trim();

    if (required && !value) {
      valid = false;
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "";
    }

    response[label] = value;
  });

  if (!valid) {
    alert("Please fill all required fields.");
    return;
  }

  const responses =
    JSON.parse(localStorage.getItem("smartform_responses")) || {};

  if (!responses[formId]) responses[formId] = [];

  responses[formId].push({
    date: new Date().toISOString(),
    data: response
  });

  localStorage.setItem("smartform_responses", JSON.stringify(responses));

  alert("Form submitted successfully!");
  formContainer.reset?.();
});

/* ---------- INIT ---------- */
renderForm();
