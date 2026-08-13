const CORRECT_PASSWORD = "ieHvDntux00FKWey";

function ensureInterFont() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
  document.head.appendChild(link);
}

function buildGateHTML() {
  return `
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
    <div style="background: #FDFCFA; border-radius: 20px; padding: 40px 32px; max-width: 400px; width: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04); border: 1px solid #EFEAE0; box-sizing: border-box;">
      <h2 style="font-size: 19px; font-weight: 600; color: #16232B; margin: 0 0 8px;">Interner Bereich</h2>
      <p style="font-size: 13.5px; color: #6B6459; margin: 0 0 20px;">Asset-Übersicht — nur für Mitarbeitende.</p>
      <input type="password" id="gate-pw" placeholder="Passwort eingeben" style="width: 100%; padding: 11px 14px; border: 1.5px solid #E8E1D3; border-radius: 10px; box-sizing: border-box; font-size: 14px; margin-bottom: 14px; background: #FBFAF7; outline: none;">
      <button id="gate-submit" style="width: 100%; padding: 12px; background: #1B6E8C; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer;">Öffnen</button>
      <p id="gate-error" style="color: #B00020; font-size: 12.5px; margin: 12px 0 0; display: none;">Falsches Passwort.</p>
    </div>
  </div>
  `;
}

const SECTIONS = [
  {
    title: "Plattform",
    icon: "🏠",
    items: [
      { name: "Öffentliche Plattform", desc: "Canva-Seite mit den 13 Regions-Buttons", url: "https://wfs-regionalbeirat.de/" },
      { name: "Regionsseiten (GitHub Pages)", desc: "Live-Domain für alle 13 Gate-Seiten", url: "https://projekte.wfs-regionalbeirat.de/" },
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
        <a href="${item.url}" target="_blank" rel="noopener" style="display: block; padding: 14px 18px; background: #FBFAF7; border: 1px solid #EFEAE0; border-radius: 12px; margin-bottom: 10px; text-decoration: none; transition: border-color 0.15s;">
          <div style="font-size: 14px; font-weight: 600; color: #16232B;">${item.name}</div>
          <div style="font-size: 12.5px; color: #8A8377; margin-top: 2px;">${item.desc}</div>
        </a>
      `;
    }).join("");

    const noteHTML = section.note
      ? `<p style="font-size: 12px; color: #8A8377; margin: 8px 0 20px; padding: 10px 14px; background: #FFF4E8; border-radius: 8px;">${section.note}</p>`
      : "";

    return `
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 16px; font-weight: 600; color: #1B6E8C; margin: 0 0 14px; display: flex; align-items: center; gap: 8px;">
          <span>${section.icon}</span><span>${section.title}</span>
        </h2>
        ${itemsHTML}
        ${noteHTML}
      </div>
    `;
  }).join("");

  return `
  <div style="max-width: 720px; margin: 0 auto; padding: 40px 24px 60px; font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif; box-sizing: border-box;">
    <h1 style="font-size: 24px; font-weight: 600; color: #16232B; margin: 0 0 4px;">Asset-Übersicht</h1>
    <p style="font-size: 13.5px; color: #8A8377; margin: 0 0 32px;">Alle Listen, Flows, Formulare und Seiten an einem Ort.</p>
    ${sectionsHTML}
  </div>
  `;
}

function initGate() {
  ensureInterFont();
  document.body.style.margin = "0";
  document.body.style.background = "#F5F2EC";
  document.body.style.minHeight = "100vh";

  const root = document.createElement("div");
  root.id = "app-root";
  root.innerHTML = buildGateHTML();
  document.body.appendChild(root);

  document.getElementById("gate-submit").addEventListener("click", checkPassword);
  document.getElementById("gate-pw").addEventListener("keypress", function (e) {
    if (e.key === "Enter") checkPassword();
  });

  function checkPassword() {
    const val = document.getElementById("gate-pw").value;
    if (val === CORRECT_PASSWORD) {
      root.innerHTML = buildDashboardHTML();
    } else {
      document.getElementById("gate-error").style.display = "block";
    }
  }
}

document.addEventListener("DOMContentLoaded", initGate);
