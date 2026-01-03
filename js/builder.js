let questions = [];

function addQuestion() {
  questions.push({ label: "Untitled Question", required: false });
  render();
}

function render() {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  questions.forEach((q, i) => {
    container.innerHTML += `
      <div class="form-question">
        <input value="${q.label}" 
          onchange="questions[${i}].label=this.value">
        <label>
          <input type="checkbox"
            onchange="questions[${i}].required=this.checked">
          Required
        </label>
      </div>
    `;
  });
}

function saveForm() {
  localStorage.setItem("form", JSON.stringify(questions));
  alert("Form saved");
}
