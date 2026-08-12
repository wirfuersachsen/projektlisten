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
    return;
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

const params = new URLSearchParams(window.location.search);
const reportUrl = params.get("url");

function initReportView() {
  if (!reportUrl) {
    const msg = document.createElement("p");
    msg.style.cssText = "font-family: sans-serif; padding: 40px;";
    msg.textContent = "Kein Bericht angegeben. Bitte über die Passwortseite Ihrer Region aufrufen.";
    document.body.appendChild(msg);
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

  if (window.history && window.history.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  startFeedbackConfirmationPolling();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReportView);
} else {
  initReportView();
}
