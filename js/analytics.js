const responses = JSON.parse(localStorage.getItem("responses")) || [];
const total = document.getElementById("totalResponses");
const ctx = document.getElementById("chart");

total.textContent = `Total Responses: ${responses.length}`;

if (responses.length) {
  const labels = Object.keys(responses[0].data);
  const counts = labels.map(l =>
    responses.filter(r => r.data[l]).length
  );

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Answered",
        data: counts
      }]
    }
  });
}
document.getElementById("exportCSV").onclick = () => {
  if (!responses.length) return;

  const headers = Object.keys(responses[0].data);
  const rows = responses.map(r =>
    headers.map(h => `"${r.data[h] || ""}"`).join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "responses.csv";
  a.click();
};
