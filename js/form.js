const form = document.getElementById("publicForm");
const submitBtn = document.getElementById("submitBtn");

const fields = JSON.parse(localStorage.getItem("smartForm")) || [];
const responses = JSON.parse(localStorage.getItem("responses")) || [];

fields.forEach(field => {
  const wrapper = document.createElement("div");
  wrapper.className = "field";

  const label = document.createElement("label");
  label.textContent = field.label;

  let input;
  switch (field.type) {
    case "textarea":
      input = document.createElement("textarea");
      break;
    case "email":
      input = document.createElement("input");
      input.type = "email";
      break;
    case "date":
      input = document.createElement("input");
      input.type = "date";
      break;
    default:
      input = document.createElement("input");
  }
  label.setAttribute("for", field.id);
input.id = field.id;
input.setAttribute("aria-required", field.required);

  input.required = field.required;
  input.name = field.id;

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  form.appendChild(wrapper);
});

submitBtn.onclick = e => {
  e.preventDefault();
  const data = {};

  fields.forEach(f => {
    const el = form.querySelector(`[name="${f.id}"]`);
    data[f.label] = el.value;
  });

  responses.push({
    date: new Date().toISOString(),
    data
  });

  localStorage.setItem("responses", JSON.stringify(responses));
  alert("Form submitted successfully!");
  form.reset();
};
