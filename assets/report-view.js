const params = new URLSearchParams(window.location.search);
const reportUrl = params.get("url");

if (!reportUrl) {
  document.write("<p style='font-family:sans-serif;padding:40px;'>Kein Bericht angegeben. Bitte über die Passwortseite Ihrer Region aufrufen.</p>");
} else {
  document.write(`
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif;
  }
  #report-frame {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
<iframe id="report-frame" src="${reportUrl}" allowfullscreen></iframe>
`);
}
