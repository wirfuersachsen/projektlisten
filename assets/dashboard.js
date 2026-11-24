// ============================================================
// Asset-Übersicht (Admin) Regionalbeirat 2027
// Design angeglichen an gate.js (Work Sans, Logo, Favicon,
// Linien-Icons, Kartenstil, Fokus-Farbe Orange).
// ============================================================

const PAGE_TITLE = "Asset-Übersicht (Admin)";
const PAGE_SUBTITLE = "Alle Listen, Flows, Formulare und Seiten an einem Ort.";
const ASSET_BASE = "https://projekte.wfs-regionalbeirat.de/assets/";

// Linien-Icons (gleicher Stil wie in gate.js: stroke 2, round)
const ICONS = {
  platform: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  registration: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
  reports: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  feedback: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  flows: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  infra: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>'
};

const SECTIONS = [
  {
    title: "Plattform",
    icon: "platform",
    items: [
      { name: "Öffentliche Plattform", desc: "Canva-Seite mit den 13 Regions-Buttons", url: "https://wfs-regionalbeirat.de/" },
      { name: "GitHub-Repository", desc: "Quellcode aller 13 Regionsseiten und Assets", url: "https://github.com/wirfuersachsen/projektlisten" }
    ]
  },
  {
    title: "Anmeldung & Whitelist",
    icon: "registration",
    items: [
      { name: "Anmeldeformular (Microsoft Forms)", desc: "Beiräte melden sich hier für Regionen an", url: "https://forms.cloud.microsoft/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=HHjj_T5ZFkm3e0hQtoeJdeM93VG5mkpNsOTBDVvHqqZUQjVNMVlYRThJT01MTEpZOUkySlJGMzNMVC4u" },
      { name: "Anmeldungen (Excel-Antworten)", desc: "Rohantworten aus dem Anmeldeformular", url: "https://buergerstiftungdresden-my.sharepoint.com/:x:/r/personal/tommy_ruelke_wir-fuer-sachsen_com/_layouts/15/Doc.aspx?sourcedoc=%7B2287A99E-1592-4508-94DA-AFD445D415ED%7D&file=Wir%20f%C3%BCr%20Sachsen%20_Regionalbeirat%202027%20-%20Anmeldung.xlsx&action=edit&mobileredirect=true" },
      { name: "Liste: Beirat Whitelist 2027", desc: "EMail + Region, Grundlage für den Code-Login", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Beirat%20Whitelist%202027/AllItems.aspx" },
      { name: "Liste: Anmeldecodes", desc: "Temporäre 6-stellige Codes mit Ablaufzeit", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Anmeldecodes/AllItems.aspx" }
    ]
  },
  {
    title: "Berichte",
    icon: "reports",
    items: [
      { name: "Liste: Regionsberichte 2027", desc: "Region → Power-BI-Link-Zuordnung (hier 2027er-Links im Dezember eintragen)", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Regionsberichte/AllItems.aspx" },
      { name: "Power BI Service", desc: "Berichte veröffentlichen, automatische Aktualisierung einrichten, Datenquellen-Zugriff verwalten", url: "https://app.powerbi.com/" }
    ]
  },
  {
    title: "Feedback",
    icon: "feedback",
    items: [
      { name: "Liste: Feedback Regionalbeirat 2027", desc: "Rohdaten aller Feedback-Einträge", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Feedback%20Regionalbeirat%202027/AllItems.aspx" },
      { name: "Feedback-Übersicht (aufbereitet)", desc: "Gruppiert nach Projekt-ID, mit Kopier-Funktion", url: "feedback-overview.html" }
    ]
  },
  {
    title: "Beiratssitzungen",
    icon: "video",
    items: [
      { name: "Videokonferenzen (Excel)", desc: "Termine, Links und Zuständigkeiten der 13 Sitzungen, 14.–22.01.2027", url: "https://buergerstiftungdresden.sharepoint.com/:x:/s/WfS2023/IQAuiHsD-cVFQq5hmjHghP-mAcVUkXypQTnWC9gYmEHYNf4?e=bSNNSk&web=1" }
    ]
  },
  {
    title: "Power-Automate-Flows",
    icon: "flows",
    items: [
      { name: "Alle Flows (Übersicht)", desc: "Power Automate Startseite — von hier aus alle Flows erreichbar", url: "https://make.powerautomate.com/environments/default-fde3781c-593e-4916-b77b-4850b6878975/flows" }
    ],
    note: "Flow-Namen zum Wiederfinden: „Beiratsfeedback empfangen“ (Schreiben), „Beiratsfeedback abrufen“ (Lesen), „Beirat Code anfordern“, „Beirat Code prüfen“, „Whitelist aus Anmeldeformular“"
  },
  {
    title: "Infrastruktur & Admin",
    icon: "infra",
    items: [
      { name: "Cloudflare", desc: "DNS/Domain-Verwaltung", url: "https://dash.cloudflare.com/f592b3ac2c7f9de17a358523a567e894/home" },
      { name: "Azure App-Registrierung (Cloudflare)", desc: "Azure AD App-Registrierung für Cloudflare-Zugriff", url: "https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/quickStartType~/null/sourceType/Microsoft_AAD_IAM/appId/a184a3d9-0cbf-4cff-83ff-b3b959bc2192/objectId/d441db65-5618-474e-b270-df37f95b4616/isMSAApp~/false/defaultBlade/Overview/appSignInAudience/AzureADMyOrg/servicePrincipalCreated~/true" },
      { name: "SharePoint Admin Center", desc: "Tenant-weite SharePoint-Verwaltung", url: "https://buergerstiftungdresden-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx?modern=true#/home" }
    ]
  }
];

// ------------------------------------------------------------
// Schrift (identisch zu gate.js, selbst gehostet)
// ------------------------------------------------------------
function ensureFonts() {
  if (document.getElementById("wfs-font")) return;
  const FONT_BASE = ASSET_BASE + "fonts/";
  const weights = [400, 500, 600, 700];
  const style = document.createElement("style");
  style.id = "wfs-font";
  style.textContent = weights.map(function (w) {
    return `
    @font-face {
      font-family: 'Work Sans';
      src: url('${FONT_BASE}work-sans-${w}.woff2') format('woff2');
      font-weight: ${w};
      font-display: swap;
    }`;
  }).join("");
  document.head.appendChild(style);
}

// ------------------------------------------------------------
// Favicon + Tab-Titel (wie gate.js)
// ------------------------------------------------------------
function ensureBranding() {
  document.title = "Wir für Sachsen – " + PAGE_TITLE;

  const FAVICON_BASE = ASSET_BASE + "favicon/";

  function setLink(rel, href, sizes) {
    let el = document.querySelector("link[rel='" + rel + "']" + (sizes ? "[sizes='" + sizes + "']" : ""));
    if (!el) {
      el = document.createElement("link");
      el.rel = rel;
      if (sizes) el.sizes = sizes;
      document.head.appendChild(el);
    }
    el.href = href;
  }

  setLink("icon", FAVICON_BASE + "favicon.ico");
  setLink("icon", FAVICON_BASE + "favicon-32x32.png", "32x32");
  setLink("icon", FAVICON_BASE + "favicon-192x192.png", "192x192");
  setLink("apple-touch-icon", FAVICON_BASE + "favicon-180x180.png");
}

// ------------------------------------------------------------
// Styles (Hover/Fokus brauchen echte CSS-Regeln statt Inline)
// ------------------------------------------------------------
function ensureStyles() {
  if (document.getElementById("dash-style")) return;
  const style = document.createElement("style");
  style.id = "dash-style";
  style.textContent = `
    .dash-wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 40px 32px 60px;
      box-sizing: border-box;
    }
    .dash-logo {
      height: 72px;
      width: auto;
      display: block;
      margin-bottom: 24px;
    }
    .dash-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 36px;
    }
    .dash-eyebrow {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .dash-eyebrow-bar {
      width: 4px;
      height: 14px;
      background: #E8833A;
    }
    .dash-eyebrow p {
      font-size: 12.5px;
      font-weight: 500;
      color: #1B6E8C;
      margin: 0;
      letter-spacing: 0.01em;
    }
    .dash-title {
      font-size: 24px;
      font-weight: 700;
      color: #16232B;
      margin: 0 0 6px;
      letter-spacing: -0.01em;
    }
    .dash-subtitle {
      font-size: 14px;
      color: #6B6459;
      line-height: 1.6;
      margin: 0;
    }
    .dash-switch {
      font-size: 13.5px;
      font-weight: 600;
      color: #1B6E8C;
      text-decoration: none;
      padding: 10px 16px;
      border: 1.5px solid #1B6E8C;
      border-radius: 10px;
      outline: none;
      transition: background 0.15s, color 0.15s;
    }
    .dash-switch:hover {
      background: #1B6E8C;
      color: #fff;
    }
    .dash-switch:focus-visible {
      box-shadow: 0 0 0 3px rgba(232, 131, 58, 0.25);
    }
    .dash-section {
      margin-bottom: 36px;
    }
    .dash-section-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 0 14px;
    }
    .dash-section-icon {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: #1B6E8C;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .dash-section-icon svg {
      width: 16px;
      height: 16px;
    }
    .dash-section-title {
      font-size: 15px;
      font-weight: 600;
      color: #16232B;
      margin: 0;
    }
    .dash-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 12px;
    }
    .dash-tile {
      display: block;
      padding: 16px 18px;
      background: #FDFCFA;
      border: 1.5px solid #EFEAE0;
      border-radius: 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      text-decoration: none;
      height: 100%;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
    }
    .dash-tile:hover {
      border-color: #E8833A;
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
      transform: translateY(-1px);
    }
    .dash-tile:focus-visible {
      border-color: #E8833A;
      box-shadow: 0 0 0 3px rgba(232, 131, 58, 0.15);
    }
    .dash-tile-name {
      font-size: 14px;
      font-weight: 600;
      color: #16232B;
    }
    .dash-tile-desc {
      font-size: 12.5px;
      color: #8A8377;
      margin-top: 4px;
      line-height: 1.45;
    }
    .dash-note {
      font-size: 12.5px;
      color: #6B6459;
      line-height: 1.5;
      margin: 12px 0 0;
      padding: 12px 16px;
      background: #FFF4E8;
      border-left: 4px solid #E8833A;
      border-radius: 0 10px 10px 0;
    }
    @media (max-width: 600px) {
      .dash-wrap { padding: 28px 20px 48px; }
      .dash-logo { height: 56px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dash-tile, .dash-switch { transition: none; }
      .dash-tile:hover { transform: none; }
    }
  `;
  document.head.appendChild(style);
}

// ------------------------------------------------------------
// Aufbau
// ------------------------------------------------------------
function buildIcon(key) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[key] || ""}</svg>`;
}

function buildDashboardHTML() {
  const sectionsHTML = SECTIONS.map(function (section) {
    const itemsHTML = section.items.map(function (item) {
      return `
        <a class="dash-tile" href="${item.url}" target="_blank" rel="noopener">
          <div class="dash-tile-name">${item.name}</div>
          <div class="dash-tile-desc">${item.desc}</div>
        </a>
      `;
    }).join("");

    const noteHTML = section.note
      ? `<p class="dash-note">${section.note}</p>`
      : "";

    return `
      <section class="dash-section">
        <div class="dash-section-head">
          <div class="dash-section-icon">${buildIcon(section.icon)}</div>
          <h2 class="dash-section-title">${section.title}</h2>
        </div>
        <div class="dash-grid">
          ${itemsHTML}
        </div>
        ${noteHTML}
      </section>
    `;
  }).join("");

  return `
  <div class="dash-wrap">
    <img class="dash-logo" src="${ASSET_BASE}wfs-logo-transparenter-hintergrund.png" alt="Wir für Sachsen">
    <div class="dash-header">
      <div>
        <div class="dash-eyebrow">
          <div class="dash-eyebrow-bar"></div>
          <p>Regionalbeirat 2027</p>
        </div>
        <h1 class="dash-title">${PAGE_TITLE}</h1>
        <p class="dash-subtitle">${PAGE_SUBTITLE}</p>
      </div>
      <a class="dash-switch" href="team-dashboard.html">Zur Team-Ansicht</a>
    </div>
    ${sectionsHTML}
  </div>
  `;
}

function initDashboard() {
  ensureFonts();
  ensureBranding();
  ensureStyles();

  document.body.style.margin = "0";
  document.body.style.background = "#F5F2EC";
  document.body.style.minHeight = "100vh";
  document.body.style.fontFamily = "'Work Sans', -apple-system, 'Segoe UI', sans-serif";

  const root = document.createElement("div");
  root.id = "app-root";
  root.innerHTML = buildDashboardHTML();
  document.body.appendChild(root);
}

document.addEventListener("DOMContentLoaded", initDashboard);
