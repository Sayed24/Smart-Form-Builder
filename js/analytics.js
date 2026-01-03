const list = document.getElementById("list");
const responses = JSON.parse(localStorage.getItem("responses") || "[]");

responses.forEach(r => {
  const li = document.createElement("li");
  li.textContent = r;
  list.appendChild(li);
});
