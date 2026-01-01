const id = new URLSearchParams(location.search).get("id");
const forms = JSON.parse(localStorage.getItem("forms"));
const f = forms[id];
const form = document.getElementById("form");

const values = {};
const nodes = [];

f.questions.forEach((q,i)=>{
  const d = document.createElement("div");
  d.dataset.index = i;

  d.innerHTML = `
    <label>${q.label}${q.required?" *":""}</label>
    <input ${q.required?"required":""}
      oninput="values[${i}]=this.value; applyLogic()">
  `;

  nodes.push(d);
  form.appendChild(d);
});

function applyLogic(){
  f.questions.forEach((q,i)=>{
    const node = nodes[i];
    if(!q.showIf){
      node.style.display="block";
    } else {
      node.style.display = values[q.showIf] ? "block" : "none";
    }
  });
}

function submit(){
  f.responses.push(values);
  localStorage.setItem("forms", JSON.stringify(forms));
  alert("Submitted");
}

applyLogic();
