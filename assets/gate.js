const REQUEST_CODE_URL = "https://defaultfde3781c593e4916b77b4850b68789.75.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/15/workflows/04a44095f7714df89eb36184bd1e8fff/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=chVN6m6VqWPJTZhFkKaGcBBA5bPxi3UoInOFNPdy3kA";
const CHECK_CODE_URL = "https://defaultfde3781c593e4916b77b4850b68789.75.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/03/workflows/5928b320517f41dc89fd2ac427154432/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BRWaZN0kH0QyYXdGaKAXyjfTalXI5Jm7DOiy6I9Mpsk";

function ensureInterFont() {
  if (document.getElementById("gate-font")) return;
  const link = document.createElement("link");
  link.id = "gate-font";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
  document.head.appendChild(link);
}

function buildEmailStepHTML() {
  return `
<div id="gate-card" style="background: #FDFCFA; border-radius: 20px; padding: 44px 36px; box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04); border: 1px solid #EFEAE0; max-width: 420px; width: 100%; box-sizing: border-box;">
  <div class="icon-badge" style="width: 44px; height: 44px; border-radius: 12px; background: #1B6E8C; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  </div>
  <h2 style="font-size: 22px; font-weight: 600; color: #16232B; margin: 0 0 8px; letter-spacing: -0.01em;">${REGION_NAME}</h2>
  <p style="font-size: 14px; color: #6B6459; line-height: 1.6; margin: 0 0 28px;">Bitte geben Sie Ihre E-Mail-Adresse ein. Sie erhalten anschließend einen Anmeldecode.</p>
  <input type="email" id="gate-email" placeholder="ihre.email@beispiel.de" style="width: 100%; padding: 13px 16px; border: 1.5px solid #E8E1D3; border-radius: 10px; box-sizing: border-box; font-size: 14px; margin-bottom: 14px; background: #FBFAF7; outline: none;">
  <button id="gate-request-btn" style="width: 100%; padding: 13px; background: #1B6E8C; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer;">Code anfordern</button>
  <p id="gate-email-error" style="color: #B00020; font-size: 12.5px; margin: 12px 0 0; display: none;">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>
  <div class="footer" style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #F0EBE0; display: flex; gap: 8px; align-items: flex-start;">
    <svg viewBox="0 0 24 24" fill="none" stroke="#1B6E8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 1px; width: 16px; height: 16px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
    <p style="font-size: 12px; color: #8A8377; line-height: 1.5; margin: 0;"><strong style="color: #5A5348;">Vertrauliche Informationen.</strong> Nur für Mitglieder des Beirats bestimmt.</p>
  </div>
</div>
`;
}

function buildCodeStepHTML(email) {
  return `
<div id="gate-card" style="background: #FDFCFA; border-radius: 20px; padding: 44px 36px; box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04); border: 1px solid #EFEAE0; max-width: 420px; width: 100%; box-sizing: border-box;">
  <div class="icon-badge" style="width: 44px; height: 44px; border-radius: 12px; background: #1B6E8C; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px;"><path d="M22 6 12 13 2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
  </div>
  <h2 style="font-size: 22px; font-weight: 600; color: #16232B; margin: 0 0 8px; letter-spacing: -0.01em;">Code eingeben</h2>
  <p style="font-size: 14px; color: #6B6459; line-height: 1.6; margin: 0 0 28px;">Falls die E-Mail-Adresse berechtigt ist, wurde soeben ein Code an <strong style="color: #16232B;">${email}</strong> gesendet. Bitte prüfen Sie auch Ihren Spam-Ordner.</p>
  <input type="text" id="gate-code" placeholder="6-stelliger Code" maxlength="6" style="width: 100%; padding: 13px 16px; border: 1.5px solid #E8E1D3; border-radius: 10px; box-sizing: border-box; font-size: 18px; letter-spacing: 4px; text-align: center; margin-bottom: 14px; background: #FBFAF7; outline: none;">
  <button id="gate-verify-btn" style="width: 100%; padding: 13px; background: #1B6E8C; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer;">Bestätigen</button>
  <p id="gate-code-error" style="color: #B00020; font-size: 12.5px; margin: 12px 0 0; display: none;">Der Code ist ungültig oder abgelaufen. Bitte laden Sie die Seite neu, um einen neuen Code anzufordern.</p>
</div>
`;
}

function showEmailStep() {
  const root = document.getElementById("gate-root");
  root.innerHTML = buildEmailStepHTML();

  const emailInput = document.getElementById("gate-email");
  const errorEl = document.getElementById("gate-email-error");
  const btn = document.getElementById("gate-request-btn");

  function submit() {
    const email = emailInput.value.trim();
    if (!email || !email.includes("@")) {
      errorEl.style.display = "block";
      return;
    }
    errorEl.style.display = "none";
    btn.disabled = true;
    btn.textContent = "Wird gesendet...";

    fetch(REQUEST_CODE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, region: REGION_NAME })
    })
      .then(function () {
        showCodeStep(email);
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = "Code anfordern";
        errorEl.textContent = "Etwas ist schiefgelaufen. Bitte erneut versuchen.";
        errorEl.style.display = "block";
      });
  }

  btn.addEventListener("click", submit);
  emailInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") submit();
  });
}

function showCodeStep(email) {
  const root = document.getElementById("gate-root");
  root.innerHTML = buildCodeStepHTML(email);

  const codeInput = document.getElementById("gate-code");
  const errorEl = document.getElementById("gate-code-error");
  const btn = document.getElementById("gate-verify-btn");

  function submit() {
    const code = codeInput.value.trim();
    if (!code) return;
    errorEl.style.display = "none";
    btn.disabled = true;
    btn.textContent = "Wird geprüft...";

    fetch(CHECK_CODE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, region: REGION_NAME, code: code })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status === "valid") {
          window.location.href = "report.html?url=" + encodeURIComponent(TARGET_URL);
        } else {
          btn.disabled = false;
          btn.textContent = "Bestätigen";
          errorEl.style.display = "block";
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = "Bestätigen";
        errorEl.textContent = "Etwas ist schiefgelaufen. Bitte erneut versuchen.";
        errorEl.style.display = "block";
      });
  }

  btn.addEventListener("click", submit);
  codeInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") submit();
  });
}

function initGate() {
  ensureInterFont();

  document.body.style.margin = "0";
  document.body.style.background = "#F5F2EC";
  document.body.style.minHeight = "100vh";
  document.body.style.display = "flex";
  document.body.style.alignItems = "center";
  document.body.style.justifyContent = "center";
  document.body.style.padding = "20px";
  document.body.style.boxSizing = "border-box";
  document.body.style.fontFamily = "'Inter', -apple-system, 'Segoe UI', sans-serif";

  const root = document.createElement("div");
  root.id = "gate-root";
  document.body.appendChild(root);

  showEmailStep();
}

document.addEventListener("DOMContentLoaded", initGate);
