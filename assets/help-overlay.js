function buildHelpOverlayHTML() {
  return `
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<div id="help-overlay-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(22, 35, 43, 0.5); z-index: 9998; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif;">
  <div id="help-overlay-card" style="background: #FDFCFA; border-radius: 20px; max-width: 560px; width: 100%; max-height: 85vh; box-shadow: 0 20px 60px rgba(0,0,0,0.2); box-sizing: border-box; display: flex; flex-direction: column; overflow: hidden;">
    <div style="padding: 36px 32px 20px; overflow-y: auto; flex: 1;">
      <h2 style="font-size: 20px; font-weight: 600; color: #16232B; margin: 0 0 20px; letter-spacing: -0.01em;">Anleitung zur interaktiven Projektliste</h2>

      <h3 style="font-size: 15px; font-weight: 600; color: #1B6E8C; margin: 20px 0 8px; display: flex; align-items: center; gap: 10px;"><span style="display: inline-block; width: 22px; text-align: center; flex-shrink: 0;">🔍</span><span>Suchen und filtern</span></h3>
      <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 8px; padding-left: 32px;">Nutzen Sie die Filterfelder oben (Antragsteller, Hauptfokus, Durchführungsort), um die Liste einzugrenzen. In jedem Filterfeld können Sie mehrere Einträge kombinieren.</p>
      <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 16px; padding-left: 32px;">Mit dem Radiergummi-Symbol oben rechts im Filterfeld setzen Sie Ihre Auswahl zurück.</p>

      <h3 style="font-size: 15px; font-weight: 600; color: #1B6E8C; margin: 20px 0 8px; display: flex; align-items: center; gap: 10px;"><span style="display: inline-block; width: 22px; text-align: center; flex-shrink: 0;">📋</span><span>Details ansehen und Feedback geben</span></h3>
      <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 8px; padding-left: 32px;">Klicken Sie eine Zeile in der Projektliste an — der Detailbereich darunter zeigt sofort Projektexposé und Regulierungsgründe. Die Angaben stammen unbearbeitet von den Antragstellenden.</p>
      <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 16px; padding-left: 32px;">Für eine Rückmeldung zu einem ausgewählten Projekt nutzen Sie die Feedback-Schaltfläche. Projekt-ID und Titel werden automatisch übernommen.</p>

      <h3 style="font-size: 15px; font-weight: 600; color: #1B6E8C; margin: 20px 0 8px; display: flex; align-items: center; gap: 10px;"><span style="display: inline-block; width: 22px; text-align: center; flex-shrink: 0;">📥</span><span>Excel-Export</span></h3>
      <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 8px; padding-left: 32px;">Über den Download-Button erhalten Sie die komplette Liste Ihrer Region als Excel-Datei, unabhängig von aktiven Filtern.</p>
      <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 16px; padding-left: 32px;"><strong style="color: #16232B;">Achtung:</strong> Diese Datei zeigt den Stand vom 29.12.2026 und wird nicht aktualisiert. Aktuelle Daten finden Sie ausschließlich hier in der interaktiven Liste.</p>

      <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0; display: flex; align-items: center; gap: 10px;"><span style="display: inline-block; width: 22px; text-align: center; flex-shrink: 0;">❔</span><span>Diese Anleitung erreichen Sie jederzeit über den Button unten links.</span></p>
    </div>
    <div style="padding: 16px 32px 24px; border-top: 1px solid #F0EBE0;">
      <button id="help-overlay-ok" style="width: 100%; padding: 13px; background: #1B6E8C; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer;">Ok, verstanden</button>
    </div>
  </div>
</div>
`;
}

function handleHelpOverlayKeydown(e) {
  if (e.key === "Escape") closeHelpOverlay();
}

function showHelpOverlay() {
  if (document.getElementById("help-overlay-backdrop")) return;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = buildHelpOverlayHTML();
  const backdrop = wrapper.firstElementChild;
  document.body.appendChild(backdrop);

  document.getElementById("help-overlay-ok").addEventListener("click", closeHelpOverlay);

  backdrop.addEventListener("click", function (e) {
    if (e.target === backdrop) closeHelpOverlay();
  });

  document.addEventListener("keydown", handleHelpOverlayKeydown);
}

function closeHelpOverlay() {
  const el = document.getElementById("help-overlay-backdrop");
  if (el) el.remove();
  document.removeEventListener("keydown", handleHelpOverlayKeydown);
}

function initHelpButton() {
  const btn = document.createElement("button");
  btn.setAttribute("aria-label", "Hilfe anzeigen");
  btn.innerHTML = "?";
  btn.style.cssText = "position: fixed; bottom: 20px; left: 20px; width: 40px; height: 40px; border-radius: 50%; background: #1B6E8C; color: #fff; border: none; font-size: 16px; font-weight: 700; font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.15); z-index: 9997;";
  btn.addEventListener("click", showHelpOverlay);
  document.body.appendChild(btn);
}

document.addEventListener("DOMContentLoaded", function () {
  initHelpButton();
  showHelpOverlay();
});
