function ensureInterFont() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
  document.head.appendChild(link);
}

const SECTIONS = [
   {
    title: "Plattform",
    icon: "🏠",
    items: [
      { name: "Öffentliche Plattform", desc: "Canva-Seite mit den 13 Regions-Buttons", url: "https://wfs-regionalbeirat.de/" },
      { name: "GitHub-Repository", desc: "Quellcode aller 13 Regionsseiten und Assets", url: "https://github.com/wirfuersachsen/projektlisten" }
    ]
  },
  {
    title: "Anmeldung & Whitelist",
    icon: "✅",
    items: [
      { name: "Anmeldeformular (Microsoft Forms)", desc: "Beiräte melden sich hier für Regionen an", url: "https://forms.cloud.microsoft/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=HHjj_T5ZFkm3e0hQtoeJdeM93VG5mkpNsOTBDVvHqqZUQjVNMVlYRThJT01MTEpZOUkySlJGMzNMVC4u" },
      { name: "Anmeldungen (Excel-Antworten)", desc: "Rohantworten aus dem Anmeldeformular", url: "https://buergerstiftungdresden-my.sharepoint.com/:x:/r/personal/tommy_ruelke_wir-fuer-sachsen_com/_layouts/15/Doc.aspx?sourcedoc=%7B2287A99E-1592-4508-94DA-AFD445D415ED%7D&file=Wir%20f%C3%BCr%20Sachsen%20_Regionalbeirat%202027%20-%20Anmeldung.xlsx&action=edit&mobileredirect=true" },
      { name: "Liste: Beirat Whitelist 2027", desc: "EMail + Region, Grundlage für den Code-Login", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Beirat%20Whitelist%202027/AllItems.aspx" },
      { name: "Liste: Anmeldecodes", desc: "Temporäre 6-stellige Codes mit Ablaufzeit", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Anmeldecodes/AllItems.aspx" }
    ]
  },
  {
    title: "Berichte",
    icon: "📊",
    items: [
      { name: "Liste: Regionsberichte 2027", desc: "Region → Power-BI-Link-Zuordnung (hier 2027er-Links im Dezember eintragen)", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Regionsberichte/AllItems.aspx" }
    ]
  },
  {
    title: "Feedback",
    icon: "💬",
    items: [
      { name: "Liste: Feedback Regionalbeirat 2027", desc: "Rohdaten aller Feedback-Einträge", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Feedback%20Regionalbeirat%202027/AllItems.aspx" },
      { name: "Feedback-Übersicht (aufbereitet)", desc: "Gruppiert nach Projekt-ID, mit Kopier-Funktion", url: "feedback-overview.html" }
    ]
  },
  {
    title: "Power-Automate-Flows",
    icon: "⚙️",
    items: [
      { name: "Alle Flows (Übersicht)", desc: "Power Automate Startseite — von hier aus alle Flows erreichbar", url: "https://make.powerautomate.com/environments/default-fde3781c-593e-4916-b77b-4850b6878975/flows" }
    ],
    note: "Flow-Namen zum Wiederfinden: „Beiratsfeedback empfangen“ (Schreiben), „Beiratsfeedback abrufen“ (Lesen), „Beirat Code anfordern“, „Beirat Code prüfen“, „Whitelist aus Anmeldeformular“"
  }
];

function buildDashboardHTML() {
  const sectionsHTML = SECTIONS.map(function (section) {
    const itemsHTML = section.items.map(function (item) {
      return `
        <a href="${item.url}" target="_blank" rel="noopener" style="display: block; padding: 16px 18px; background: #FBFAF7; border: 1px solid #EFEAE0; border-radius: 12px; text-decoration: none; transition: border-color 0.15s; height: 100%; box-sizing: border-box;">
          <div style="font-size: 14px; font-weight: 600; color: #16232B;">${item.name}</div>
          <div style="font-size: 12.5px; color: #8A8377; margin-top: 4px; line-height: 1.4;">${item.desc}</div>
        </a>
      `;
    }).join("");

    const noteHTML = section.note
      ? `<p style="font-size: 12px; color: #8A8377; margin: 12px 0 0; padding: 10px 14px; background: #FFF4E8; border-radius: 8px;">${section.note}</p>`
      : "";

    return `
      <div style="margin-bottom: 36px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #1B6E8C; margin: 0 0 14px; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.03em;">
          <span>${section.icon}</span><span>${section.title}</span>
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px;">
          ${itemsHTML}
        </div>
        ${noteHTML}
      </div>
    `;
  }).join("");

  return `
  <div style="max-width: 1100px; margin: 0 auto; padding: 40px 32px 60px; font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif; box-sizing: border-box;">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 32px; flex-wrap: wrap; gap: 12px;">
      <div>
        <h1 style="font-size: 24px; font-weight: 600; color: #16232B; margin: 0 0 4px;">Asset-Übersicht (Admin)</h1>
        <p style="font-size: 13.5px; color: #8A8377; margin: 0;">Alle Listen, Flows, Formulare und Seiten an einem Ort.</p>
      </div>
      <a href="team-dashboard.html" style="font-size: 13px; color: #1B6E8C; font-weight: 600; text-decoration: none; padding: 8px 14px; border: 1.5px solid #1B6E8C; border-radius: 8px;">Zur Team-Ansicht →</a>
    </div>
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
