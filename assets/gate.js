document.write(`
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  body {
    font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif;
    background-color: #F5F2EC;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }
  .card {
    background: #FDFCFA;
    border-radius: 20px;
    padding: 44px 36px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04);
    border: 1px solid #EFEAE0;
    max-width: 420px;
    width: 100%;
    box-sizing: border-box;
  }
  .icon-badge {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #1B6E8C;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }
  .icon-badge svg {
    width: 22px;
    height: 22px;
  }
  h2 {
    font-size: 22px;
    font-weight: 600;
    color: #16232B;
    margin: 0 0 8px;
    letter-spacing: -0.01em;
  }
  p.intro {
    font-size: 14px;
    color: #6B6459;
    line-height: 1.6;
    margin: 0 0 28px;
  }
  input {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #E8E1D3;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: inherit;
    margin-bottom: 14px;
    background: #FBFAF7;
    outline: none;
    transition: border-color 0.15s;
  }
  input:focus {
    border-color: #1B6E8C;
  }
  button {
    width: 100%;
    padding: 13px;
    background: #1B6E8C;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }
  button:hover {
    background: #14556d;
  }
  button:active {
    transform: scale(0.98);
  }
  .footer {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #F0EBE0;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .footer svg {
    flex-shrink: 0;
    margin-top: 1px;
    width: 16px;
    height: 16px;
  }
  .footer p {
    font-size: 12px;
    color: #8A8377;
    line-height: 1.5;
    margin: 0;
  }
  .footer strong {
    color: #5A5348;
  }
</style>
<div class="card">
  <div class="icon-badge">
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  </div>
  <h2>${REGION_NAME}</h2>
  <p class="intro">Bitte geben Sie das Passwort ein, um die interaktive Projektliste zu öffnen.</p>
  <input type="password" id="pw" placeholder="Passwort eingeben" onkeypress="if(event.key === 'Enter') gateCheck()">
  <button onclick="gateCheck()">Liste öffnen</button>
  <div class="footer">
    <svg viewBox="0 0 24 24" fill="none" stroke="#1B6E8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
    <p><strong>Vertrauliche Informationen.</strong> Nur für Mitglieder des Beirats bestimmt.</p>
  </div>
</div>
`);

function gateCheck() {
  const pass = document.getElementById("pw").value;
  if (pass === CORRECT_PASSWORD) {
    window.location.href = "report.html?url=" + encodeURIComponent(TARGET_URL);
  } else {
    alert("Der eingegebene Code ist nicht korrekt. Bitte prüfen Sie Ihre Unterlagen.");
  }
}
