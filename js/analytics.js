/* =========================================
   SMART FORM BUILDER — ANALYTICS ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", initAnalytics);

function initAnalytics() {
  const formId = getActiveFormId();
  const forms = getForms();
  const form = forms.find(f => f.id === formId);

  if (!form) {
    alert("No form selected");
    location.href = "index.html";
    return;
  }

  document.getElementById("analyticsTitle").textContent =
    `${form.title} — Analytics`;

  if (!form.responses.length) {
    document.getElementById("analyticsContainer").innerHTML =
      `<p class="muted">No responses yet</p>`;
    return;
  }

  form.fields.forEach(field => {
    renderQuestionAnalytics(form, field);
  });
}

/* ---------- RENDER QUESTION ---------- */
function renderQuestionAnalytics(form, field) {
  const container = document.getElementById("analyticsContainer");

  const card = document.createElement("div");
  card.className = "analytics-card";

  const canvasId = `chart_${field.id}`;

  card.innerHTML = `
    <h3>${field.label}</h3>
    <canvas id="${canvasId}"></canvas>
  `;

  container.appendChild(card);

  const data = collectData(form.responses, field);

  if (!data.labels.length) {
    card.innerHTML += `<p class="muted">No data</p>`;
    return;
  }

  new Chart(document.getElementById(canvasId), {
    type: getChartType(field.type),
    data: {
      labels: data.labels,
      datasets: [{
        label: "Responses",
        data: data.values,
        backgroundColor: generateColors(data.labels.length)
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: field.type !== "short" }
      }
    }
  });
}

/* ---------- DATA PROCESS ---------- */
function collectData(responses, field) {
  const counts = {};

  responses.forEach(r => {
    const answer = r[field.id];
    if (!answer) return;

    if (Array.isArray(answer)) {
      answer.forEach(v => counts[v] = (counts[v] || 0) + 1);
    } else {
      counts[answer] = (counts[answer] || 0) + 1;
    }
  });

  return {
    labels: Object.keys(counts),
    values: Object.values(counts)
  };
}

/* ---------- CHART TYPE ---------- */
function getChartType(type) {
  if (type === "short" || type === "paragraph" || type === "email") {
    return "bar";
  }
  if (type === "checkbox") return "bar";
  return "pie";
}

/* ---------- COLORS ---------- */
function generateColors(count) {
  return Array.from({ length: count }, (_, i) =>
    `hsl(${(i * 360) / count}, 70%, 60%)`
  );
}
