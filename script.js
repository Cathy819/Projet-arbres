function parseQRData(data) {
  const lines = data.split("\n");
  const info = {};

  lines.forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const cleanKey = key.trim();
      const value = valueParts.join(":").trim();
      info[cleanKey] = value;
    }
  });

  return info;
}

function displayTreeInfo(data) {
  const info = parseQRData(data);

  document.getElementById("treeName").textContent =
    info["Nom"] || "Arbre inconnu";
  document.getElementById("scientificName").textContent =
    info["Nom scientifique"] || "";

  // 📸 Gestion de la photo
  const imagePath = info["Image"]
    ? `images/${info["Image"]}`
    : "images/default.jpg";
  document.getElementById("treeImage").src = imagePath;

  const content = document.getElementById("content");
  content.innerHTML = `
    <div class="info-grid">
      <div class="info-card"><div class="label">Famille</div><div class="value">${
        info["Famille"] || "N/A"
      }</div></div>
      <div class="info-card"><div class="label">Origine</div><div class="value">${
        info["Origine"] || "N/A"
      }</div></div>
      <div class="info-card"><div class="label">Type</div><div class="value">${
        info["Type"] || "N/A"
      }</div></div>
      <div class="info-card"><div class="label">Feuillage</div><div class="value">${
        info["Feuillage"] || "N/A"
      }</div></div>
      <div class="info-card"><div class="label">Hauteur moyenne</div><div class="value">${
        info["Hauteur moyenne"] || "N/A"
      }</div></div>
      <div class="info-card"><div class="label">Diamètre du tronc</div><div class="value">${
        info["Diamètre du tronc"] || "N/A"
      }</div></div>
      <div class="info-card full-width"><div class="label">Domaine d'utilisation</div><div class="value">${
        info["Domaine d'utilisation"] || "N/A"
      }</div></div>
      <div class="info-card full-width"><div class="label">Exemple d'utilisation</div><div class="value">${
        info["Exemple d'utilisation"] || "N/A"
      }</div></div>
      <div class="info-card full-width"><div class="label">Statut de conservation</div><div class="value"><span class="badge conservation">${
        info["Statut de conservation"] || "N/A"
      }</span></div></div>
    </div>
  `;
}

// Lecture du paramètre data depuis l’URL
const urlParams = new URLSearchParams(window.location.search);
const qrData = urlParams.get("data");

if (qrData) {
  displayTreeInfo(decodeURIComponent(qrData));
}
