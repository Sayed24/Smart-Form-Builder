/* =========================
   SMART FORM
   Public Form Logic
========================= */

const formContainer = document.getElementById("publicForm");

const fields = JSON.parse(localStorage.getItem("smartform_fields")) || [];

/* =========================
   RENDER FORM
========================= */
function renderForm() {
  if (!fields.length) {
    formContainer.innerHTML = "<p>No form fields created yet.</p>";
    return;
  }

  const form = document.createElement("form");

  fields.forEach(field => {
    const wrap = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = field.label;

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
          const o = document.createElement("option");
          o.textContent = opt;
          input.appendChild(o);
        });
        break;

      case "checkbox":
        input = document.createElement("input");
        input.type = "checkbox";
        break;
    }

    if (field.required) input.required = true;

    wrap.append(label, input);
    form.appendChild(wrap);
  });

  const submit = document.createElement("button");
  submit.className = "btn primary";
  submit.textContent = "Submit";
  form.appendChild(submit);

  form.onsubmit = saveResponse;

  formContainer.appendChild(form);
}

/* =========================
   SAVE RESPONSE
========================= */
function saveResponse(e) {
  e.preventDefault();

  const data = {};
  const inputs = e.target.querySelectorAll("input, textarea, select");

  inputs.forEach((input, i) => {
    if (input.type === "checkbox") {
      data[i] = input.checked;
    } else {
      data[i] = input.value;
    }
  });

  const responses =
    JSON.parse(localStorage.getItem("smartform_responses")) || [];

  responses.push({
    date: new Date().toISOString(),
    data
  });

  localStorage.setItem(
    "smartform_responses",
    JSON.stringify(responses)
  );

  alert("Response submitted!");
  e.target.reset();
}

/* =========================
   INIT
========================= */
renderForm();
