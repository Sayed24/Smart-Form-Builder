/* =====================================================
   SMARTFORM ANALYTICS — ENTERPRISE
===================================================== */

const responses =
  JSON.parse(localStorage.getItem("smartform_responses")) || [];

const responseCountEl = document.getElementById("responseCount");
const analyticsDetails = document.getElementById("analyticsDetails");

/* -----------------------------
   BASIC METRICS
----------------------------- */
responseCountEl.textContent = responses.length;

/* -----------------------------
   CHART DATA
----------------------------- */
const dates = responses.map(r =>
  new Date(r.date).toLocaleDateString()
);

const countsByDate = {};
dates.forEach(d => {
  countsByDate[d] = (countsByDate[d] || 0) + 1;
});

/* -----------------------------
   RENDER CHART
----------------------------- */
const ctx = document.getElementById("responseChart");

if (ctx) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(countsByDate),
      datasets: [{
        label: "Responses",
        data: Object.values(countsByDate),
        borderWidth: 2,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

/* -----------------------------
   RESPONSE DETAILS
----------------------------- */
if (!responses.length) {
  analyticsDetails.innerHTML =
    "<p class='muted'>No responses yet.</p>";
} else {
  responses.forEach((res, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginTop = "16px";

    card.innerHTML = `
      <h4>Response #${index + 1}</h4>
      <p class="muted">${new Date(res.date).toLocaleString()}</p>
    `;

    Object.values(res.data).forEach(value => {
      const p = document.createElement("p");
      p.textContent = `• ${value}`;
      card.appendChild(p);
    });

    analyticsDetails.appendChild(card);
  });
}

/* -----------------------------
   CSV EXPORT
----------------------------- */
document.getElementById("exportCsv").onclick = () => {
  if (!responses.length) {
    alert("No data to export");
    return;
  }

  let csv = "Date,Response\n";

  responses.forEach(r => {
    Object.values(r.data).forEach(value => {
      csv += `"${r.date}","${value}"\n`;
    });
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "smartform-responses.csv";
  a.click();

  URL.revokeObjectURL(url);
};
