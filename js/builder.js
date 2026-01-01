const id = new URLSearchParams(location.search).get("id");
const forms = JSON.parse(localStorage.getItem("forms"));
const form = forms[id];
const canvas = document.getElementById("canvas");

let dragIndex = null;

function draw(){
  canvas.innerHTML = "";
  form.questions.forEach((q,i)=>{
    const div = document.createElement("div");
    div.className = "card";
    div.draggable = true;

    div.ondragstart = () => dragIndex = i;
    div.ondragover = e => e.preventDefault();
    div.ondrop = () => reorder(i);

    div.innerHTML = `
      <div class="drag">☰</div>
      <input value="${q.label}" oninput="q.label=this.value">
      
      <label>
        Required 
        <input type="checkbox" ${q.required?"checked":""}
        onchange="q.required=this.checked">
      </label>

      <select onchange="q.showIf=this.value">
        <option value="">Always show</option>
        ${form.questions.map((_,j)=>`
          <option value="${j}" ${q.showIf==j?"selected":""}>
            Show if Q${j+1} answered
          </option>`).join("")}
      </select>

      <button onclick="dup(${i})">Duplicate</button>
      <button onclick="del(${i})">Delete</button>
    `;
    canvas.appendChild(div);
  });
}

function reorder(target){
  const moved = form.questions.splice(dragIndex,1)[0];
  form.questions.splice(target,0,moved);
  draw();
}

function add(type){
  form.questions.push({
    type,
    label:"Question",
    required:false,
    showIf:""
  });
  draw();
}

function dup(i){
  form.questions.splice(i+1,0,{...form.questions[i]});
  draw();
}

function del(i){
  form.questions.splice(i,1);
  draw();
}

function save(){
  localStorage.setItem("forms", JSON.stringify(forms));
  alert("Saved");
}

draw();
