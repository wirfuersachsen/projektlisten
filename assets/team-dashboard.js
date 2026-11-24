// ============================================================
// Team-Übersicht Regionalbeirat 2027
// Design angeglichen an gate.js (Work Sans, Logo, Favicon,
// Linien-Icons, Kartenstil, Fokus-Farbe Orange).
// ============================================================

const PAGE_TITLE = "Team-Übersicht";
const PAGE_SUBTITLE = "Feedback, Anmeldungen und Sitzungen der Beiräte.";
const ASSET_BASE = "https://projekte.wfs-regionalbeirat.de/assets/";

// Linien-Icons (gleicher Stil wie in gate.js: stroke 2, round)
const ICONS = {
  feedback: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  registration: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
  video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>'
};

const SECTIONS = [
  {
    title: "Feedback der Beiräte",
    icon: "feedback",
    items: [
      { name: "Feedback-Übersicht", desc: "Gruppiert nach Projekt-ID, mit Kopier-Funktion für die Arbeitstabelle", url: "feedback-overview.html" },
      { name: "Feedback (Rohdaten)", desc: "Alle Einträge einzeln, ungruppiert", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Feedback%20Regionalbeirat%202027/AllItems.aspx" }
    ]
  },
  {
    title: "Anmeldungen zum Beirat",
    icon: "registration",
    items: [
      { name: "Anmeldungen (Excel-Antworten)", desc: "Wer sich für welche Region(en) angemeldet hat", url: "https://buergerstiftungdresden-my.sharepoint.com/:x:/r/personal/tommy_ruelke_wir-fuer-sachsen_com/_layouts/15/Doc.aspx?sourcedoc=%7B2287A99E-1592-4508-94DA-AFD445D415ED%7D&file=Wir%20f%C3%BCr%20Sachsen%20_Regionalbeirat%202027%20-%20Anmeldung.xlsx&action=edit&mobileredirect=true" },
      { name: "Whitelist (nur bei Rückfragen)", desc: "Zeigt, ob eine E-Mail-Adresse für eine Region freigeschaltet ist", url: "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023/Lists/Beirat%20Whitelist%202027/AllItems.aspx" }
    ]
  },
  {
    title: "Beiratssitzungen",
    icon: "video",
    items: [
      { name: "Videokonferenzen (Excel)", desc: "Termine, Links und Zuständigkeiten der 13 Sitzungen, 14.–22.01.2027", url: "https://buergerstiftungdresden.sharepoint.com/:x:/s/WfS2023/IQAuiHsD-cVFQq5hmjHghP-mAcVUkXypQTnWC9gYmEHYNf4?e=bSNNSk&web=1" }
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
      max-width: 900px;
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
      margin: 0 0 36px;
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
    @media (max-width: 600px) {
      .dash-wrap { padding: 28px 20px 48px; }
      .dash-logo { height: 56px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dash-tile { transition: none; }
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

    return `
      <section class="dash-section">
        <div class="dash-section-head">
          <div class="dash-section-icon">${buildIcon(section.icon)}</div>
          <h2 class="dash-section-title">${section.title}</h2>
        </div>
        <div class="dash-grid">
          ${itemsHTML}
        </div>
      </section>
    `;
  }).join("");

  return `
  <div class="dash-wrap">
    <img class="dash-logo" src="${ASSET_BASE}wfs-logo-transparenter-hintergrund.png" alt="Wir für Sachsen">
    <div class="dash-eyebrow">
      <div class="dash-eyebrow-bar"></div>
      <p>Regionalbeirat 2027</p>
    </div>
    <h1 class="dash-title">${PAGE_TITLE}</h1>
    <p class="dash-subtitle">${PAGE_SUBTITLE}</p>
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
