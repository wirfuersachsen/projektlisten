document.write(`
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700&display=swap" rel="stylesheet">
<style>
  body { font-family: 'Public Sans', sans-serif; background-color: #F7A806; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
  .card { background: #FFFFFF; padding: 40px; border-radius: 25px; box-shadow: 0 15px 35px rgba(0,0,0,0.15); text-align: center; max-width: 450px; width: 90%; }
  h2 { font-family: 'Cooper BT', serif; color: #1B6E8C; font-size: 2rem; margin-bottom: 20px; }
  p { color: #000000; font-size: 1rem; line-height: 1.5; margin-bottom: 30px; }
  input { width: 100%; padding: 15px; margin-bottom: 20px; border: 2px solid #FED9C2; border-radius: 12px; box-sizing: border-box; font-size: 1rem; text-align: center; outline: none; }
  input:focus { border-color: #1B6E8C; }
  button { width: 100%; padding: 15px; background-color: #1B6E8C; color: #FFFFFF; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: transform 0.2s, background 0.3s; }
  button:hover { background-color: #14556d; transform: translateY(-2px); }
  .footer { margin-top: 25px; font-size: 0.8rem; color: #1B6E8C; border-top: 1px solid #FED9C2; padding-top: 15px; }
</style>
<div class="card">
  <h2>${REGION_NAME}</h2>
  <p>Bitte geben Sie das Passwort ein, um die interaktive Projektliste zu öffnen.</p>
  <input type="password" id="pw" placeholder="Passwort eingeben" onkeypress="if(event.key === 'Enter') gateCheck()">
  <button onclick="gateCheck()">Liste öffnen</button>
  <div class="footer"><strong>Vertrauliche Informationen</strong><br>Nur für Mitglieder des Beirats bestimmt.</div>
</div>
`);

function gateCheck() {
  const pass = document.getElementById("pw").value;
  if (pass === CORRECT_PASSWORD) {
    window.location.href = TARGET_URL;
  } else {
    alert("Der eingegebene Code ist nicht korrekt. Bitte prüfen Sie Ihre Unterlagen.");
  }
}
