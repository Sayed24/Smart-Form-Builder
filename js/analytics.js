/* =====================================
   SMARTFORM ANALYTICS
   Charts • Metrics • Export
===================================== */

/* ---------- LOAD DATA ---------- */
const responses =
  JSON.parse(localStorage.getItem("smartform_responses")) || {};

const activeFormId =
  localStorage.getItem("active_form") || "default";

const formResponses = responses[activeFormId] || [];

/* ---------- TOTAL RESPONSES ---------- */
const totalEl = document.getElementById("totalResponses");
totalEl.textContent = formResponses.length;

/* ---------- TIMELINE DATA ---------- */
const dateCounts = {};

formResponses.forEach(r => {
  const date = r.date.split("T")[0];
  dateCounts[date] = (dateCounts[date] || 0) + 1;
});

const labels = Object.keys(dateCounts);
const data = Object.values(dateCounts);

/* ---------- CHART ---------- */
const ctx = document.getElementById("responsesChart").getContext("2d");

new Chart(ctx, {
  type: "line",
  data: {
    labels,
    datasets: [
      {
        label: "Responses",
        data,
        fill: false,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  }
});

/* ---------- CSV EXPORT ---------- */
function exportCSV() {
  if (!formResponses.length) {
    alert("No responses to export");
    return;
  }

  const headers = Object.keys(formResponses[0].data);
  let csv = "Date," + headers.join(",") + "\n";

  formResponses.forEach(r => {
    const row = [
      r.date,
      ...headers.map(h =>
        `"${String(r.data[h]).replace(/"/g, '""')}"`
      )
    ];
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "smartform-responses.csv";
  a.click();

  URL.revokeObjectURL(url);
}
