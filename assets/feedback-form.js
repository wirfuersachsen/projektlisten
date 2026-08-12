const FLOW_URL = "https://defaultfde3781c593e4916b77b4850b68789.75.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/11/workflows/d3da7df08f664768a205de8a6c8b108b/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Rm9xPiAwhZ-ZCNN69G2OnutlzfwT1mw8-b5F6vcKUDA";

function ensureInterFont() {
  if (document.getElementById("feedback-font")) return;
  const link = document.createElement("link");
  link.id = "feedback-font";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
  document.head.appendChild(link);
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

function buildFormHTML(landkreis, projektID, antragsnummer, projekttitel, antragsteller) {
  return `
<div id="feedback-card" style="max-width: 480px; margin: 0 auto; padding: 32px 28px; box-sizing: border-box; font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif;">
  <h2 style="font-size: 19px; font-weight: 600; color: #16232B; margin: 0 0 4px;">Feedback zu ${projekttitel}</h2>
  <p style="font-size: 13px; color: #8A8377; margin: 0 0 2px;">${antragsteller}</p>
  <p style="font-size: 13px; color: #8A8377; margin: 0 0 24px;">${landkreis} &middot; Projekt-ID ${projektID} &middot; ${antragsnummer}</p>

  <form id="feedback-form">
    <label style="display: block; font-size: 13px; font-weight: 600; color: #16232B; margin-bottom: 6px;">Name <span style="color: #B00020;">*</span></label>
    <input type="text" id="fb-name" required style="width: 100%; padding: 11px 14px; border: 1.5px solid #E8E1D3; border-radius: 10px; box-sizing: border-box; font-size: 14px; font-family: inherit; margin-bottom: 16px; background: #FBFAF7; outline: none;">

    <label style="display: block; font-size: 13px; font-weight: 600; color: #16232B; margin-bottom: 6px;">Organisation <span style="color: #B00020;">*</span></label>
    <input type="text" id="fb-organisation" required style="width: 100%; padding: 11px 14px; border: 1.5px solid #E8E1D3; border-radius: 10px; box-sizing: border-box; font-size: 14px; font-family: inherit; margin-bottom: 16px; background: #FBFAF7; outline: none;">

    <label style="display: block; font-size: 13px; font-weight: 600; color: #16232B; margin-bottom: 6px;">E-Mail (optional)</label>
    <input type="email" id="fb-email" style="width: 100%; padding: 11px 14px; border: 1.5px solid #E8E1D3; border-radius: 10px; box-sizing: border-box; font-size: 14px; font-family: inherit; margin-bottom: 16px; background: #FBFAF7; outline: none;">

    <label style="display: block; font-size: 13px; font-weight: 600; color: #16232B; margin-bottom: 6px;">Ihre Anmerkung <span style="color: #B00020;">*</span></label>
    <textarea id="fb-anmerkung" required rows="5" style="width: 100%; padding: 11px 14px; border: 1.5px solid #E8E1D3; border-radius: 10px; box-sizing: border-box; font-size: 14px; font-family: inherit; margin-bottom: 8px; background: #FBFAF7; outline: none; resize: vertical;"></textarea>

    <p id="fb-error" style="color: #B00020; font-size: 12.5px; margin: 0 0 12px; display: none;">Bitte füllen Sie alle Pflichtfelder aus.</p>

    <button type="submit" id="fb-submit" style="width: 100%; padding: 13px; background: #1B6E8C; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer;">Absenden</button>
  </form>
</div>
`;
}

function buildSuccessHTML() {
  return `
<div style="max-width: 480px; margin: 0 auto; padding: 60px 28px; box-sizing: border-box; font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif; text-align: center;">
  <div style="width: 48px; height: 48px; border-radius: 50%; background: #1B6E8C; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px;"><polyline points="20 6 9 17 4 12"/></svg>
  </div>
  <h2 style="font-size: 18px; font-weight: 600; color: #16232B; margin: 0 0 8px;">Danke, gesendet!</h2>
  <p style="font-size: 13.5px; color: #6B6459; margin: 0;">Dieses Fenster schließt sich gleich automatisch.</p>
  <p id="feedback-close-hint" style="font-size: 13.5px; color: #1B6E8C; margin: 16px 0 0; display: none; font-weight: 500;">Sie können dieses Fenster jetzt schließen.</p>
</div>
`;
}

function markConfirmationForMainWindow(projektID) {
  try {
    localStorage.setItem("feedback_confirmation", JSON.stringify({
      projektID: projektID,
      timestamp: Date.now()
    }));
  } catch (e) {
    // localStorage evtl. nicht verfügbar - kein Blocker fürs Absenden selbst
  }
}

function initFeedbackForm() {
  ensureInterFont();

  document.body.style.margin = "0";
  document.body.style.background = "#F5F2EC";
  document.body.style.minHeight = "100vh";

  const landkreis = getParam("landkreis");
  const projektID = getParam("projektID");
  const antragsnummer = getParam("antragsnummer");
  const projekttitel = getParam("projekttitel") || "diesem Projekt";
  const antragsteller = getParam("antragsteller");

  const wrapper = document.createElement("div");
  wrapper.innerHTML = buildFormHTML(landkreis, projektID, antragsnummer, projekttitel, antragsteller);
  document.body.appendChild(wrapper.firstElementChild);

  const form = document.getElementById("feedback-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fb-name").value.trim();
    const organisation = document.getElementById("fb-organisation").value.trim();
    const email = document.getElementById("fb-email").value.trim();
    const anmerkung = document.getElementById("fb-anmerkung").value.trim();
    const errorEl = document.getElementById("fb-error");

    if (!name || !organisation || !anmerkung) {
      errorEl.style.display = "block";
      return;
    }
    errorEl.style.display = "none";

    const submitBtn = document.getElementById("fb-submit");
    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet...";

    fetch(FLOW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        landkreis: landkreis,
        projektID: projektID,
        antragsnummer: antragsnummer,
        name: name,
        organisation: organisation,
        email: email,
        anmerkung: anmerkung
      })
    })
      .then(function () {
        markConfirmationForMainWindow(projektID);
        document.getElementById("feedback-card").outerHTML = buildSuccessHTML();
        setTimeout(function () {
          window.close();
          setTimeout(function () {
            const hint = document.getElementById("feedback-close-hint");
            if (hint) hint.style.display = "block";
          }, 300);
        }, 2000);
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Absenden";
        errorEl.textContent = "Senden fehlgeschlagen. Bitte erneut versuchen.";
        errorEl.style.display = "block";
      });
  });
}

try {
  window.resizeTo(520, 640);
} catch (e) {
  // resizeTo evtl. vom Browser blockiert - kein Blocker fürs Formular selbst
}

document.addEventListener("DOMContentLoaded", initFeedbackForm);
