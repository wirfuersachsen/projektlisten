const SITE_URL = "https://buergerstiftungdresden.sharepoint.com/sites/WfS2023";
const LIST_NAME = "Feedback Regionalbeirat 2027";

function ensureInterFont() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
  document.head.appendChild(link);
}

function buildPageShellHTML() {
  return `
<div style="max-width: 900px; margin: 0 auto; padding: 36px 24px 60px; font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif; box-sizing: border-box;">
  <h1 style="font-size: 24px; font-weight: 600; color: #16232B; margin: 0 0 4px;">Feedback-Übersicht</h1>
  <p style="font-size: 13.5px; color: #8A8377; margin: 0 0 24px;">Interne Ansicht — gruppiert nach Projekt-ID, zum Übertragen in die Arbeitstabelle.</p>

  <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 24px; flex-wrap: wrap;">
    <label style="font-size: 13px; font-weight: 600; color: #16232B;">Landkreis:</label>
    <select id="landkreis-filter" style="padding: 9px 14px; border: 1.5px solid #E8E1D3; border-radius: 10px; font-size: 13.5px; font-family: inherit; background: #FBFAF7; min-width: 220px; outline: none;">
      <option value="">Alle Landkreise</option>
    </select>
    <span id="result-count" style="font-size: 13px; color: #8A8377; margin-left: auto;"></span>
  </div>

  <div id="feedback-groups"></div>
</div>
`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

function formatDate(isoString) {
  const d = new Date(isoString);
  const tag = String(d.getDate()).padStart(2, "0");
  const monat = String(d.getMonth() + 1).padStart(2, "0");
  const jahr = d.getFullYear();
  const stunde = String(d.getHours()).padStart(2, "0");
  const minute = String(d.getMinutes()).padStart(2, "0");
  return `${tag}.${monat}.${jahr}, ${stunde}:${minute} Uhr`;
}

function buildGroupHTML(projektID, entries) {
  const landkreis = entries[0].Landkreis || "";
  const antragsnummer = entries[0].Antragsnummer || "";

  const entriesHTML = entries.map(function (entry) {
    return `
      <div style="padding: 14px 0; border-top: 1px solid #F0EBE0;">
        <div style="display: flex; justify-content: space-between; gap: 12px; margin-bottom: 6px; flex-wrap: wrap;">
          <strong style="font-size: 13.5px; color: #16232B;">${escapeHtml(entry.Name)} &middot; ${escapeHtml(entry.Organisation)}</strong>
          <span style="font-size: 12px; color: #8A8377; white-space: nowrap;">${formatDate(entry.Created)}</span>
        </div>
        <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(entry.Anmerkung)}</p>
        ${entry.EMail ? `<p style="font-size: 12px; color: #8A8377; margin: 6px 0 0;">${escapeHtml(entry.EMail)}</p>` : ""}
      </div>
    `;
  }).join("");

  return `
<div class="feedback-group" data-landkreis="${escapeHtml(landkreis)}" style="background: #FDFCFA; border: 1px solid #EFEAE0; border-radius: 14px; padding: 18px 20px; margin-bottom: 16px;">
  <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap;">
    <h3 style="font-size: 15px; font-weight: 600; color: #1B6E8C; margin: 0;">Projekt-ID ${escapeHtml(projektID)} <span style="font-weight: 400; color: #8A8377;">&middot; ${escapeHtml(landkreis)} &middot; ${escapeHtml(antragsnummer)}</span></h3>
    <button class="copy-btn" data-projekt-id="${escapeHtml(projektID)}" style="padding: 6px 12px; background: #1B6E8C; color: #fff; border: none; border-radius: 8px; font-size: 12px; font-weight: 600; font-family: inherit; cursor: pointer;">Kopieren</button>
  </div>
  ${entriesHTML}
</div>
`;
}

function buildCopyText(entries) {
  return entries.map(function (entry) {
    return `${formatDate(entry.Created)} — ${entry.Name} (${entry.Organisation}): ${entry.Anmerkung}`;
  }).join("\n\n");
}

function renderGroups(groupedData, filterLandkreis) {
  const container = document.getElementById("feedback-groups");
  const projektIDs = Object.keys(groupedData).sort();

  let visibleCount = 0;
  let html = "";

  projektIDs.forEach(function (projektID) {
    const entries = groupedData[projektID];
    const landkreis = entries[0].Landkreis || "";
    if (filterLandkreis && landkreis !== filterLandkreis) return;
    visibleCount += entries.length;
    html += buildGroupHTML(projektID, entries);
  });

  container.innerHTML = html || `<p style="color: #8A8377; font-size: 13.5px;">Keine Einträge für diese Auswahl.</p>`;
  document.getElementById("result-count").textContent = visibleCount + " Rückmeldung" + (visibleCount === 1 ? "" : "en");

  container.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const pid = btn.getAttribute("data-projekt-id");
      const text = buildCopyText(groupedData[pid]);
      navigator.clipboard.writeText(text).then(function () {
        const original = btn.textContent;
        btn.textContent = "Kopiert!";
        setTimeout(function () {
          btn.textContent = original;
        }, 1500);
      });
    });
  });
}

function populateLandkreisFilter(groupedData) {
  const select = document.getElementById("landkreis-filter");
  const landkreise = new Set();
  Object.values(groupedData).forEach(function (entries) {
    if (entries[0].Landkreis) landkreise.add(entries[0].Landkreis);
  });
  Array.from(landkreise).sort().forEach(function (lk) {
    const opt = document.createElement("option");
    opt.value = lk;
    opt.textContent = lk;
    select.appendChild(opt);
  });
}

function groupByProjektID(items) {
  const grouped = {};
  items.forEach(function (item) {
    const pid = item.ProjektID || "(ohne ID)";
    if (!grouped[pid]) grouped[pid] = [];
    grouped[pid].push(item);
  });
  Object.values(grouped).forEach(function (entries) {
    entries.sort(function (a, b) {
      return new Date(a.Created) - new Date(b.Created);
    });
  });
  return grouped;
}

async function loadFeedback() {
  const container = document.getElementById("feedback-groups");
  container.innerHTML = `<p style="color: #8A8377; font-size: 13.5px;">Lädt...</p>`;

  try {
    const response = await fetch(
      `${SITE_URL}/_api/web/lists/getbytitle('${encodeURIComponent(LIST_NAME)}')/items?$top=500&$orderby=Created desc`,
      {
        headers: { "Accept": "application/json;odata=verbose" },
        credentials: "include"
      }
    );

    if (!response.ok) {
      container.innerHTML = `<p style="color: #B00020; font-size: 13.5px;">Fehler beim Laden (Status ${response.status}). Bitte im Browser angemeldet sein oder Berechtigungen prüfen.</p>`;
      return;
    }

    const data = await response.json();
    const items = data.d.results;

    if (!items.length) {
      container.innerHTML = `<p style="color: #8A8377; font-size: 13.5px;">Noch keine Rückmeldungen vorhanden.</p>`;
      return;
    }

    const grouped = groupByProjektID(items);
    populateLandkreisFilter(grouped);
    renderGroups(grouped, "");

    document.getElementById("landkreis-filter").addEventListener("change", function (e) {
      renderGroups(grouped, e.target.value);
    });
  } catch (err) {
    container.innerHTML = `<p style="color: #B00020; font-size: 13.5px;">Fehler: ${escapeHtml(err.message)}</p>`;
  }
}

function init() {
  ensureInterFont();
  document.body.style.margin = "0";
  document.body.style.background = "#F5F2EC";
  document.body.style.minHeight = "100vh";

  const wrapper = document.createElement("div");
  wrapper.innerHTML = buildPageShellHTML();
  document.body.appendChild(wrapper.firstElementChild);

  loadFeedback();
}

document.addEventListener("DOMContentLoaded", init);
