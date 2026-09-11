function showFeedbackConfirmationBanner(projektID) {
  const banner = document.createElement("div");
  banner.style.cssText = "position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #1B6E8C; color: #fff; padding: 14px 22px; border-radius: 12px; font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif; font-size: 14px; font-weight: 500; box-shadow: 0 8px 24px rgba(0,0,0,0.2); z-index: 9996; display: flex; align-items: center; gap: 10px; max-width: 90%; box-sizing: border-box;";
  banner.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px; flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg><span>Ihr Feedback zu Projekt ${projektID} wurde übermittelt. Vielen Dank!</span>`;
  document.body.appendChild(banner);
  setTimeout(function () {
    banner.remove();
  }, 7000);
}

function startFeedbackConfirmationPolling() {
  let lastSeenTimestamp = 0;
  try {
    const stored = localStorage.getItem("feedback_last_seen_timestamp");
    if (stored) lastSeenTimestamp = parseInt(stored, 10) || 0;
  } catch (e) {
    return; // localStorage nicht verfügbar - Feature einfach überspringen
  }

  setInterval(function () {
    try {
      const raw = localStorage.getItem("feedback_confirmation");
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.timestamp > lastSeenTimestamp) {
        lastSeenTimestamp = data.timestamp;
        localStorage.setItem("feedback_last_seen_timestamp", String(lastSeenTimestamp));
        setTimeout(function () {
          showFeedbackConfirmationBanner(data.projektID);
        }, 1000);
      }
    } catch (e) {
      // fehlerhafte/leere Daten ignorieren
    }
  }, 2000);
}

// ---- WFS_CANVA_URL: Ziel für den "Neu anmelden"-Button ----
const WFS_CANVA_URL = "https://wfs-regionalbeirat.de";

const SESSION_KEY = "wfs_report_session";

const params = new URLSearchParams(window.location.search);
const paramUrl = params.get("url");

let sessionData = null;

if (paramUrl) {
  // Frischer Login-Redirect: Daten aus der URL übernehmen und zusätzlich sichern,
  // bevor die URL per replaceState bereinigt wird. So bleibt ein Fallback bestehen,
  // falls die Seite später (z.B. nach Vorwärts-Navigation) ohne Parameter neu lädt.
  sessionData = {
    url: paramUrl,
    snapshot: params.get("snapshot") || "",
    pdf: params.get("pdf") || ""
  };
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (e) {
    // sessionStorage nicht verfügbar - Fallback beim Zurück/Vorwärts entfällt dann,
    // Kernfunktion (Bericht anzeigen) ist davon nicht betroffen
  }
} else {
  // Kein Parameter in der URL (z.B. nach Vorwärts-Navigation nach replaceState,
  // oder Seite wurde aus dem bfcache wiederhergestellt) - im sessionStorage nachsehen
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) sessionData = JSON.parse(stored);
  } catch (e) {
    sessionData = null;
  }
}

const reportUrl = sessionData ? sessionData.url : "";
window.WFS_SNAPSHOT_URL = sessionData ? sessionData.snapshot : "";
window.WFS_PDF_URL = sessionData ? sessionData.pdf : "";

function showReloginPrompt() {
  const wrap = document.createElement("div");
  wrap.style.cssText = "font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif; max-width: 420px; margin: 80px auto; padding: 40px 36px; background: #FDFCFA; border-radius: 20px; border: 1px solid #EFEAE0; box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04); text-align: center; box-sizing: border-box;";
  wrap.innerHTML = `
    <div style="width: 44px; height: 44px; border-radius: 12px; background: #1B6E8C; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 22px; height: 22px;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    </div>
    <h2 style="font-size: 20px; font-weight: 600; color: #16232B; margin: 0 0 10px;">Sitzung abgelaufen</h2>
    <p style="font-size: 14px; color: #6B6459; line-height: 1.6; margin: 0 0 28px;">Bitte melden Sie sich erneut über die Startseite an, um Ihren Bericht aufzurufen.</p>
    <a href="${WFS_CANVA_URL}" style="display: inline-block; width: 100%; box-sizing: border-box; padding: 13px; background: #1B6E8C; color: #fff; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none;">Neu anmelden</a>
  `;
  document.body.style.margin = "0";
  document.body.style.background = "#F5F2EC";
  document.body.style.minHeight = "100vh";
  document.body.appendChild(wrap);
}

function initReportView() {
  if (!reportUrl) {
    showReloginPrompt();
    return;
  }

  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.height = "100%";
  document.documentElement.style.height = "100%";

  const iframe = document.createElement("iframe");
  iframe.id = "report-frame";
  iframe.src = reportUrl;
  iframe.setAttribute("allowfullscreen", "");
  iframe.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; border: none;";
  document.body.appendChild(iframe);

  if (paramUrl && window.history && window.history.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  startFeedbackConfirmationPolling();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReportView);
} else {
  initReportView();
}
