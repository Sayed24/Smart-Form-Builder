const builder = document.getElementById("builder");
let forms = JSON.parse(localStorage.getItem("forms"));
let index = localStorage.getItem("activeForm");
let fields = forms[index].fields;

function render() {
  builder.innerHTML = "";
  fields.forEach((f, i) => {
    const li = document.createElement("li");
    li.draggable = true;
    li.textContent = f.label;
    li.ondragstart = e => e.dataTransfer.setData("i", i);
    li.ondragover = e => e.preventDefault();
    li.ondrop = e => {
      const from = e.dataTransfer.getData("i");
      fields.splice(i, 0, fields.splice(from, 1)[0]);
      render();
    };
    builder.appendChild(li);
  });
}

function addField(type) {
  fields.push({ type, label: type.toUpperCase() });
  render();
}

function saveForm() {
  forms[index].fields = fields;
  localStorage.setItem("forms", JSON.stringify(forms));
  location.href = "form.html";
}

render();
