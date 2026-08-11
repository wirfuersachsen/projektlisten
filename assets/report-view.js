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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReportView);
} else {
  initReportView();
}
