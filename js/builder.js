const forms = JSON.parse(localStorage.getItem("forms"));
const index = localStorage.getItem("activeForm");
const form = forms[index];

document.getElementById("formTitle").value = form.title;
document.getElementById("formDesc").value = form.desc;

const list = document.getElementById("fields");

function render() {
  list.innerHTML = "";
  form.fields.forEach((f, i) => {
    const li = document.createElement("li");
    li.className = "field";
    li.draggable = true;
    li.innerHTML = `<strong>${f.label}</strong>`;
    li.ondragstart = e => e.dataTransfer.setData("i", i);
    li.ondragover = e => e.preventDefault();
    li.ondrop = e => {
      const from = e.dataTransfer.getData("i");
      form.fields.splice(i, 0, form.fields.splice(from, 1)[0]);
      render();
    };
    list.appendChild(li);
  });
}

function addField(type) {
  form.fields.push({ type, label: "Question" });
  render();
}

function saveForm() {
  form.title = document.getElementById("formTitle").value;
  form.desc = document.getElementById("formDesc").value;
  localStorage.setItem("forms", JSON.stringify(forms));
  location.href = "form.html";
}

render();
