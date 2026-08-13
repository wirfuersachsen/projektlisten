function ensureInterFont() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
  document.head.appendChild(link);
}

const SECTIONS = [
  {
    title: "Feedback der Beiräte",
    icon: "💬",
    items: [
      { name: "Feedback-Übersicht", desc: "Gruppiert nach Projekt-ID, mit Kopier-Funktion für die Arbeitstabelle", url: "feedback-overview.html" }
    ]
  },
  {
    title: "Anmeldungen zum Beirat",
    icon: "✅",
    items: [
      { name: "Anmeldungen (Excel-Antworten)", desc: "Wer sich für welche Region(en) angemeldet hat", url: "https://buergerstiftungdresden-my.sharepoint.com/:x:/r/personal/tommy_ruelke_wir-fuer-sachsen_com/_layouts/15/Doc.aspx?sourcedoc=%7B2287A99E-1592-4508-94DA-AFD445D415ED%7D&file=Wir%20f%C3%BCr%20Sachsen%20_Regionalbeirat%202027%20-%20Anmeldung.xlsx&action=edit&mobileredirect=true" },
      { name: "Whitelist (nur bei Rückfragen)", desc: "Zeigt, ob eine E-Mail-Adresse für eine Region freigeschaltet ist", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Beirat%20Whitelist%202027/AllItems.aspx" }
    ]
  }
];

function buildDashboardHTML() {
  const sectionsHTML = SECTIONS.map(function (section) {
    const itemsHTML = section.items.map(function (item) {
      return `
        <a href="${item.url}" target="_blank" rel="noopener" style="display: block; padding: 16px 18px; background: #FBFAF7; border: 1px solid #EFEAE0; border-radius: 12px; text-decoration: none; height: 100%; box-sizing: border-box;">
          <div style="font-size: 14px; font-weight: 600; color: #16232B;">${item.name}</div>
          <div style="font-size: 12.5px; color: #8A8377; margin-top: 4px; line-height: 1.4;">${item.desc}</div>
        </a>
      `;
    }).join("");

    return `
      <div style="margin-bottom: 36px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #1B6E8C; margin: 0 0 14px; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.03em;">
          <span>${section.icon}</span><span>${section.title}</span>
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px;">
          ${itemsHTML}
        </div>
      </div>
    `;
  }).join("");

  return `
  <div style="max-width: 900px; margin: 0 auto; padding: 40px 32px 60px; font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif; box-sizing: border-box;">
    <h1 style="font-size: 24px; font-weight: 600; color: #16232B; margin: 0 0 4px;">Team-Übersicht</h1>
    <p style="font-size: 13.5px; color: #8A8377; margin: 0 0 32px;">Feedback und Anmeldungen der Beiräte.</p>
    ${sectionsHTML}
  </div>
  `;
}

function initDashboard() {
  ensureInterFont();
  document.body.style.margin = "0";
  document.body.style.background = "#F5F2EC";
  document.body.style.minHeight = "100vh";

  const root = document.createElement("div");
  root.id = "app-root";
  root.innerHTML = buildDashboardHTML();
  document.body.appendChild(root);
}

document.addEventListener("DOMContentLoaded", initDashboard);
