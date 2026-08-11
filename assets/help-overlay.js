function buildHelpOverlayHTML() {
  return `
<div id="help-overlay-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(22, 35, 43, 0.5); z-index: 9998; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
  <div style="background: #FDFCFA; border-radius: 20px; padding: 36px 32px; max-width: 560px; width: 100%; max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.2); box-sizing: border-box;">
    <h2 style="font-size: 20px; font-weight: 600; color: #16232B; margin: 0 0 20px; letter-spacing: -0.01em;">Anleitung zur interaktiven Projektliste</h2>

    <h3 style="font-size: 15px; font-weight: 600; color: #1B6E8C; margin: 20px 0 8px;">1. Projekte suchen und filtern</h3>
    <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 8px;">Nutzen Sie die Filterfelder am oberen Seitenrand (Antragsteller, Hauptfokus oder Durchführungsort), um die Ansicht anzupassen.</p>
    <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 8px;"><strong style="color: #16232B;">Suchen und auswählen:</strong> Klicken Sie in ein Filterfeld, um die Liste zu öffnen. Nutzen Sie die Suchleiste für eine schnelle Direktsuche. Sie können auch mehrere Einträge auswählen, um die Liste zu kombinieren.</p>
    <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 16px;"><strong style="color: #16232B;">Filter zurücksetzen:</strong> Mit dem Radiergummi-Symbol (oben rechts in jedem Filterfeld) löschen Sie Ihre Auswahl und zeigen wieder alle Daten an.</p>

    <h3 style="font-size: 15px; font-weight: 600; color: #1B6E8C; margin: 20px 0 8px;">2. Details anzeigen und Feedback geben</h3>
    <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 8px;">Wählen Sie in der Projektliste eine Zeile aus. Der Detailbereich darunter aktualisiert sich sofort.</p>
    <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 8px;"><strong style="color: #16232B;">Details aufrufen:</strong> Nach dem Klick erscheinen das Projektexposé und die spezifischen Regulierungsgründe. Das Projektexposé basiert auf den Original-Angaben der Antragstellenden und wurde nicht redaktionell bearbeitet.</p>
    <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 16px;"><strong style="color: #16232B;">Feedback geben:</strong> Möchten Sie eine Rückmeldung zu einem Projekt geben? Klicken Sie auf die Feedback-Schaltfläche. Projekt-ID und Titel werden automatisch übernommen. Bitte wählen Sie zuvor das entsprechende Projekt in der Liste aus.</p>

    <h3 style="font-size: 15px; font-weight: 600; color: #1B6E8C; margin: 20px 0 8px;">3. Daten als Excel-Datei exportieren</h3>
    <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 8px;">Für eigene Analysen können Sie die Liste Ihrer Region als schreibgeschützte Excel-Datei herunterladen. Klicken Sie dazu auf den Download-Button. Dieser Export enthält immer den gesamten Stand Ihrer Region, unabhängig von den gesetzten Filtern.</p>
    <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 16px;"><strong style="color: #16232B;">Achtung:</strong> Die Excel-Liste entspricht dem Bearbeitungsstand vom 29.12.2026 und ist statisch. Den tagesaktuellen Stand finden Sie ausschließlich hier in der interaktiven Projektliste.</p>

    <p style="font-size: 13.5px; color: #4A4640; line-height: 1.6; margin: 0 0 24px;">Über das Fragezeichen-Symbol unten auf der Seite können Sie diese Anleitung jederzeit wieder aufrufen.</p>

    <button id="help-overlay-ok" style="width: 100%; padding: 13px; background: #1B6E8C; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer;">Ok, verstanden</button>
  </div>
</div>
`;
}

function showHelpOverlay() {
  if (document.getElementById("help-overlay-backdrop")) return;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = buildHelpOverlayHTML();
  document.body.appendChild(wrapper.firstElementChild);
  document.getElementById("help-overlay-ok").addEventListener("click", closeHelpOverlay);
}

function closeHelpOverlay() {
  const el = document.getElementById("help-overlay-backdrop");
  if (el) el.remove();
}

function initHelpButton() {
  const btn = document.createElement("button");
  btn.setAttribute("aria-label", "Hilfe anzeigen");
  btn.innerHTML = "?";
  btn.style.cssText = "position: fixed; bottom: 20px; left: 20px; width: 40px; height: 40px; border-radius: 50%; background: #1B6E8C; color: #fff; border: none; font-size: 16px; font-weight: 700; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.15); z-index: 9997;";
  btn.addEventListener("click", showHelpOverlay);
  document.body.appendChild(btn);
}

document.addEventListener("DOMContentLoaded", function () {
  initHelpButton();
  showHelpOverlay();
});
