const formEl = document.getElementById("form");
const questions = JSON.parse(localStorage.getItem("form") || "[]");

questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.className = "form-question";
  div.innerHTML = `
    <label>${q.label}${q.required ? "*" : ""}</label>
    <input ${q.required ? "required" : ""}>
  `;
  formEl.appendChild(div);
});

function submitForm() {
  const responses = [];
  document.querySelectorAll("input").forEach(i => responses.push(i.value));
  localStorage.setItem("responses", JSON.stringify(responses));
  location.href = "analytics.html";
}
