/* =========================
   SMART FORM
   Analytics Logic
========================= */

const responseCountEl = document.getElementById("responseCount");
const analyticsDetails = document.getElementById("analyticsDetails");

const responses =
  JSON.parse(localStorage.getItem("smartform_responses")) || [];

/* =========================
   BASIC METRICS
========================= */
responseCountEl.textContent = responses.length;

/* =========================
   DETAILED VIEW
========================= */
if (!responses.length) {
  analyticsDetails.innerHTML =
    "<p class='muted'>No responses yet.</p>";
} else {
  responses.forEach((res, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.marginTop = "16px";

    const title = document.createElement("h4");
    title.textContent = `Response #${index + 1}`;

    const date = document.createElement("p");
    date.className = "muted";
    date.textContent = new Date(res.date).toLocaleString();

    card.append(title, date);

    Object.values(res.data).forEach(value => {
      const p = document.createElement("p");
      p.textContent = `• ${value}`;
      card.appendChild(p);
    });

    analyticsDetails.appendChild(card);
  });
}
