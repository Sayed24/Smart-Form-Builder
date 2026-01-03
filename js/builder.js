let questions = JSON.parse(localStorage.getItem("form") || "[]");
let dragIndex = null;

/* ---------- ADD QUESTION ---------- */
function addQuestion() {
  questions.push({
    id: Date.now(),
    label: "Untitled Question",
    required: false,
    type: "text"
  });
  render();
}

/* ---------- DUPLICATE ---------- */
function duplicateQuestion(index) {
  const copy = { ...questions[index], id: Date.now() };
  questions.splice(index + 1, 0, copy);
  render();
}

/* ---------- RENDER ---------- */
function render() {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "form-question";
    div.draggable = true;
    div.dataset.index = i;

    div.innerHTML = `
      <div class="q-header">
        <span class="drag-handle">☰</span>
        <input class="q-title" value="${q.label}">
      </div>

      <div class="q-actions">
        <select class="q-type">
          <option value="text" ${q.type === "text" ? "selected" : ""}>Short Answer</option>
          <option value="textarea" ${q.type === "textarea" ? "selected" : ""}>Paragraph</option>
        </select>

        <label class="req">
          <input type="checkbox" ${q.required ? "checked" : ""}>
          Required
        </label>

        <button class="secondary" onclick="duplicateQuestion(${i})">Duplicate</button>
      </div>
    `;

    /* --- EVENTS --- */
    div.querySelector(".q-title").oninput = e =>
      questions[i].label = e.target.value;

    div.querySelector(".q-type").onchange = e =>
      questions[i].type = e.target.value;

    div.querySelector("input[type=checkbox]").onchange = e =>
      questions[i].required = e.target.checked;

    /* --- DRAG EVENTS --- */
    div.ondragstart = () => dragIndex = i;
    div.ondragover = e => e.preventDefault();
    div.ondrop = () => reorder(i);

    container.appendChild(div);
  });

  saveDraft();
}

/* ---------- REORDER ---------- */
function reorder(dropIndex) {
  const dragged = questions.splice(dragIndex, 1)[0];
  questions.splice(dropIndex, 0, dragged);
  render();
}

/* ---------- SAVE ---------- */
function saveDraft() {
  localStorage.setItem("form", JSON.stringify(questions));
}

/* ---------- INIT ---------- */
render();
