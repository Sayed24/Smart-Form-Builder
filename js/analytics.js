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
