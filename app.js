const STORAGE_KEYS = {
  users: "sofrenor_users",
  session: "sofrenor_session",
  entries: "sofrenor_entries",
  config: "sofrenor_config"
};

const defaultConfig = {
  shifts: ["7h-15h", "15h-23h", "23h-7h", "Autre"],
  bottles: ["3kg", "6kg", "9kg", "12kg", "35kg"],
  sections: {
"Mecanique": {
      "Decoupage": ["Presse decoupe SMG", "Outil decoupe flans 03kg", "Outil decoupe flans 06kg", "Outil decoupe flans 12kg", "Outil decoupe pieds 03kg", "Outil decoupe pieds 12kg", "Outil decoupe cols"],
      "Marquage": ["Presse de marquage OMERA"],
      "Numerotage": ["Presse de numerotage"],
      "Emboutissage": ["Presse emboutissage 06/12/35kg", "Presse emboutissage 03kg", "Presse Repkon"],
      "Rognage et soyage": ["Rogneuse-soyeuse 06/12/35kg", "Rogneuse-soyeuse 03kg", "Rogneuse Repkon", "Rogneuse 03kg"],
      "Cintrage": ["Cintreuse pieds et cols", "Cintreuse viroles"],
      "Cintrage virole": ["Cintreuse viroles"],
      "Soudage pied": ["Soudeuse"],
      "Formage": ["Presse de formage", "Presse formage trou 03kg", "Outil formage cols", "Outil formage pieds 03kg", "Outil formage pieds 12kg"]
    },
 "Soudage": {
      "Degraissage": ["Tunnel de degraissage"],
      "Soudage longitudinal des viroles": ["Soudeuse longitudinale", "Soudeuse corps n1", "Soudeuse corps n2", "Soudeuse corps n3", "Soudeuse corps n4", "Soudeuse corps n5", "Soudeuse corps n6", "Soudeuse par resistance", "Poste assemblage viroles"],
      "Soudure collerette": ["Soudeuse collerette tete n1", "Soudeuse collerette tete n2", "Soudeuse collerette tete n3", "Soudeuse collerette tete n4"],
      "Soudure bague": ["Soudeuse bague"],
      "Soudure pied/collier": ["Soudeuse pieds et cols n1", "Soudeuse pieds et cols n2", "Soudeuse pieds et cols n3", "Soudeuse pieds et cols n4"],
      "Soudure circulaire": ["Soudeuse corps"]
    },
"Finition": {
      "Traitement thermique": ["Four de cuisson", "Four de normalisation"],
      "Epreuve hydraulique": ["Rampe d'epreuve n1", "Rampe d'epreuve n2", "Rampe d'epreuve n3", "Rampe d'epreuve n4", "Rampe d'epreuve 35kg"],
      "Grenaillage": ["Grenailleuse"],
      "Metallisation": ["Poste de metallisation"],
      "Peinture": ["Cabine de peinture"],
      "Nettoyage du taraudage": ["Poste nettoyage du taraudage"],
      "Tarage (poids)": ["Poste de tarage"],
      "Montage des accessoires": ["Robinetuse n1", "Poste de vidange"],
      "Poinconnage": ["Poste de poinconnage"],
      "Air test": ["Station d'air test"]
    }
},
  cadences: {
    "Presse de marquage OMERA": 257,
    "Presse de numerotage": 212,
    "Presse decoupe SMG": 180,
    "Outil decoupe flans 03kg": 180,
    "Outil decoupe flans 06kg": 180,
    "Outil decoupe flans 12kg": 180,
    "Outil decoupe pieds 03kg": 180,
"Outil decoupe pieds 12kg": 180,
    "Outil decoupe cols": 180,
    "Rogneuse-soyeuse 06/12/35kg": 133,
    "Rogneuse-soyeuse 03kg": 212,
    "Rogneuse Repkon": 180,
    "Rogneuse 03kg": 212,
    "Cintreuse pieds et cols": 240,
    "Cintreuse viroles": 277,
    "Soudeuse": 257,
    "Presse de formage": 129,
    "Presse formage trou 03kg": 129,
    "Outil formage cols": 42,
"Outil formage pieds 03kg": 129,
    "Outil formage pieds 12kg": 129,
    "Presse Repkon": 180,
    "Tunnel de degraissage": 0,
    "Soudeuse longitudinale": 12.8,
    "Soudeuse corps n1": 86,
    "Soudeuse corps n2": 86,
    "Soudeuse corps n3": 67,
    "Soudeuse corps n4": 78,
    "Soudeuse corps n5": 86,
    "Soudeuse corps n6": 86,
"Soudeuse par resistance": 86,
    "Poste assemblage viroles": 12.8,
    "Soudeuse collerette tete n1": 77,
    "Soudeuse collerette tete n2": 82,
    "Soudeuse collerette tete n3": 60,
    "Soudeuse collerette tete n4": 77,
    "Soudeuse bague": 82,
    "Soudeuse pieds et cols n1": 97,
    "Soudeuse pieds et cols n2": 97,
    "Soudeuse pieds et cols n3": 97,
    "Soudeuse pieds et cols n4": 97,
    "Soudeuse corps": 86,
 "Four de cuisson": 157,
    "Four de normalisation": 157,
    "Rampe d'epreuve n1": 12,
    "Rampe d'epreuve n2": 11,
    "Rampe d'epreuve n3": 11,
    "Rampe d'epreuve n4": 9,
    "Rampe d'epreuve 35kg": 9,
    "Grenailleuse": 360,
    "Poste de metallisation": 360,
    "Cabine de peinture": 251,
    "Poste de tarage": 360,
    "Robinetuse n1": 900,
    "Poste de vidange": 900,
    "Station d'air test": 120,
 "Poste nettoyage du taraudage": 360,
    "Poste de poinconnage": 360
  },
  stopCauses: {
    "Matiere": ["Usure prematuree couteau / contre-couteau", "Bavures sur matrice", "Degradation poincon", "Coincement emboutis dans bague", "Autre"],
    "Milieu": ["Degradation joints hydrauliques", "Fissuration conduite hydraulique sous pression", "Filtre hydraulique non change", "Manque d'huile hydraulique", "Autre"],
    "Methode": ["Coincement tole en decoupage", "Cisaillement par depassement de la charge nominale", "Parametres de reglage non figes par gamme ecrite", "Autre"],
    "Main d'oeuvre": ["Absence de procedure standardisee de changement serie", "Serrage insuffisant des vis de fixation contre-molette", "Fixation outil non conforme apres intervention", "Autre"],
    "Machine": ["Deterioration cables par vibrations et echauffement", "Desserrage contacts et connecteurs sous vibrations", "Derive capteur fin de course", "Surchauffe moteur", "Autre"]
  }
};

let config = loadConfig();
let authMode = "login";
let session = getJSON(STORAGE_KEYS.session, null);
let lastCalculated = emptyMetrics();

const el = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  ensureDemoUsers();
  bindAuth();
  bindNavigation();
  bindProductionForm();
  bindSettings();
  updateClock();
  setInterval(updateClock, 1000);
  renderAuthState();
});

function getJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadConfig() {
  return getJSON(STORAGE_KEYS.config, clone(defaultConfig));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function saveConfig() {
  setJSON(STORAGE_KEYS.config, config);
}

function ensureDemoUsers() {
  const users = getJSON(STORAGE_KEYS.users, []);

  const seed = [
    { username: "operateur@sofrenor.ma", password: "sofrenor1234", role: "operator" },
    { username: "production@sofrenor.ma", password: "sofrenor1234", role: "production" },
    { username: "maintenance@sofrenor.ma", password: "sofrenor1234", role: "maintenance" }
  ];

  seed.forEach((demo) => {
    if (!users.some((u) => u.username === demo.username)) {
      users.push(demo);
    }
  });

  setJSON(STORAGE_KEYS.users, users);
}

function isSofrenorEmail(value) {
  return /^[^\s@]+@sofrenor\.ma$/i.test(value);
}

function startSession(user) {
  session = {
    username: user.username,
    role: user.role
  };

  setJSON(STORAGE_KEYS.session, session);
  renderAuthState();
}

function bindAuth() {
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      authMode = button.dataset.authMode;

      document.querySelectorAll("[data-auth-mode]").forEach((item) =>
        item.classList.toggle("active", item === button)
      );

      el("roleField").classList.toggle("hidden", authMode !== "register");
      el("authMessage").textContent = "";
    });
  });

  el("authForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = el("username").value.trim().toLowerCase();
    const password = el("password").value;
    const users = getJSON(STORAGE_KEYS.users, []);

    if (!isSofrenorEmail(username)) {
      el("authMessage").textContent = "Utilise un email @sofrenor.ma";
      return;
    }

    if (authMode === "register") {
      if (users.some((u) => u.username === username)) {
        el("authMessage").textContent = "Utilisateur existe déjà";
        return;
      }

      const newUser = {
        username,
        password,
        role: el("role").value
      };

      users.push(newUser);
      setJSON(STORAGE_KEYS.users, users);

      startSession(newUser);
      return;
    }

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      el("authMessage").textContent = "Identifiants incorrects";
      return;
    }

    startSession(user);
  });

  el("logoutBtn").addEventListener("click", () => {
    session = null;
    localStorage.removeItem(STORAGE_KEYS.session);
  });
  }
function renderAuthState() {
  if (session && !isSofrenorEmail(session.username)) {
    session = null;
    localStorage.removeItem(STORAGE_KEYS.session);
  }
  const isLoggedIn = Boolean(session);
el("authView").classList.toggle("hidden", isLoggedIn);
  el("appView").classList.toggle("hidden", !isLoggedIn);
  el("sessionBox").classList.toggle("hidden", !isLoggedIn);
  if (!isLoggedIn) return;

  const roleLabel = {
    operator: "Operateur",
    production: "Responsable production",
    maintenance: "Responsable maintenance"
  }[session.role];
  el("currentUser").textContent = `${session.username} - ${roleLabel}`;

  const isOperator = session.role === "operator";
document.querySelectorAll("#mainNav button").forEach((button) => {
    const allowed = !isOperator || button.dataset.view === "entryView";
    button.classList.toggle("hidden", !allowed);
  });
  showView("entryView");
  populateFormOptions();
  renderSettings();
  renderAll();
}
function bindNavigation() {
  document.querySelectorAll("#mainNav button").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });
  el("refreshDashboard").addEventListener("click", renderDashboard);
  el("exportCsv").addEventListener("click", exportCsv);
  el("clearEntries").addEventListener("click", clearEntries);
}
function showView(viewId) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll("#mainNav button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  if (viewId === "dashboardView") renderDashboard();
  if (viewId === "historyView") renderHistory();
}
function bindProductionForm() {
  ["shift", "section", "post", "machine", "produced", "openTime", "hasRejects", "rejects", "hasStop", "stopDuration", "stopFamily", "stopCause", "customCause"].forEach((id) => {
    el(id).addEventListener("input", handleFormChange);
    el(id).addEventListener("change", handleFormChange);
  });
el("productionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const metrics = calculateMetrics();
    const entry = collectEntry(metrics);
    const entries = getJSON(STORAGE_KEYS.entries, []);
    entries.push(entry);
    setJSON(STORAGE_KEYS.entries, entries);
    lastCalculated = metrics;
    renderKpis(el("entryKpis"), metrics);
    renderAll();
    el("productionForm").reset();
    el("openTime").value = 4;
    populateFormOptions();
    handleFormChange();
});

  el("productionForm").addEventListener("reset", () => {
    setTimeout(() => {
      el("openTime").value = 4;
      populateFormOptions();
      handleFormChange();
    });
  });
}
function populateFormOptions() {
  fillSelect(el("shift"), config.shifts);
  fillSelect(el("section"), Object.keys(config.sections));
  fillSelect(el("bottleType"), config.bottles);
  populatePosts();
  populateStopFamilies();
  handleFormChange();
}
function populatePosts() {
  const section = el("section").value || Object.keys(config.sections)[0];
  fillSelect(el("post"), Object.keys(config.sections[section] || {}));
  populateMachines();
}
function populateMachines() {
  const section = el("section").value;
  const post = el("post").value;
  fillSelect(el("machine"), ((config.sections[section] || {})[post] || []));
  updateNominalCadence();
}
function populateStopFamilies() {
  fillSelect(el("stopFamily"), Object.keys(config.stopCauses));
  populateStopCauses();
}
function populateStopCauses() {
  fillSelect(el("stopCause"), config.stopCauses[el("stopFamily").value] || []);
}
function fillSelect(select, options) {
  const current = select.value;
  select.innerHTML = "";
  options.forEach((option) => {
    const item = document.createElement("option");
    item.value = option;
    item.textContent = option;
    select.appendChild(item);
  });
  if (options.includes(current)) select.value = current;
}

function handleFormChange(event) {
  if (event?.target?.id === "section") populatePosts();
  if (event?.target?.id === "post") populateMachines();
  if (event?.target?.id === "machine") updateNominalCadence();
  if (event?.target?.id === "stopFamily") populateStopCauses();

  const customShift = el("shift").value === "Autre";
  el("customShiftWrap").classList.toggle("hidden", !customShift);

  const hasRejects = el("hasRejects").value === "oui";
el("rejectsWrap").classList.toggle("hidden", !hasRejects);
  if (!hasRejects) el("rejects").value = 0;

  const hasStop = el("hasStop").value === "oui";
  ["stopDurationWrap", "stopFamilyWrap", "stopCauseWrap"].forEach((id) => el(id).classList.toggle("hidden", !hasStop));
  if (!hasStop) el("stopDuration").value = 0;
  el("customCauseWrap").classList.toggle("hidden", !(hasStop && el("stopCause").value === "Autre"));

  const metrics = calculateMetrics();
 lastCalculated = metrics;
  renderKpis(el("entryKpis"), metrics);
  el("realCadence").value = formatNumber(metrics.realCadence);
}

function updateNominalCadence() {
  const machine = el("machine").value;
  const cadence = Number(config.cadences[machine] || 0);
  el("nominalCadence").value = cadence ? formatNumber(cadence) : "Non definie";
}
function calculateMetrics() {
  const produced = Number(el("produced").value || 0);
  const rejects = el("hasRejects").value === "oui" ? Number(el("rejects").value || 0) : 0;
  const openTime = Math.max(Number(el("openTime").value || 0), 0);
  const stopDuration = el("hasStop").value === "oui" ? Number(el("stopDuration").value || 0) : 0;
  const machine = el("machine").value;
  const nominalCadence = Number(config.cadences[machine] || 0);
  const operatingTime = Math.max(openTime - stopDuration, 0);
  const realCadence = openTime > 0 ? produced / openTime : 0;
  const availability = openTime > 0 ? operatingTime / openTime : 0;
  const quality = produced > 0 ? Math.max(produced - rejects, 0) / produced : 0;
  const performance = nominalCadence > 0
  ? Math.min(realCadence / nominalCadence, 1)
  : 0;
 const trs = Math.min(availability * quality * performance, 1);
 return { produced, rejects, openTime, stopDuration, operatingTime, realCadence, nominalCadence, availability, quality, performance, trs };
}

function collectEntry(metrics) {
  const stopCause = el("hasStop").value === "oui"
    ? (el("stopCause").value === "Autre" ? el("customCause").value.trim() || "Autre" : el("stopCause").value)
    : "Aucun arret";
  return {
    id: makeId(),
    timestamp: new Date().toISOString(),
    user: session.username,
 shift: el("shift").value === "Autre" ? el("customShift").value.trim() || "Autre" : el("shift").value,
    section: el("section").value,
    bottleType: el("bottleType").value,
    post: el("post").value,
    machine: el("machine").value,
    stopCause,
    ...metrics
  };
}

function emptyMetrics() {
  return { trs: 0, availability: 0, quality: 0, performance: 0, realCadence: 0, nominalCadence: 0 };
}

function renderAll() {
  renderKpis(el("entryKpis"), lastCalculated);
  renderDashboard();
  renderHistory();
}
function renderKpis(container, metrics) {
  const items = [
    ["TRS", metrics.trs],
    ["Disponibilite", metrics.availability],
    ["Performance", metrics.performance],
    ["Qualite", metrics.quality]
  ];
container.innerHTML = items.map(([label, value]) => {
    const percent = Math.max(0, value * 100);
    const level = levelClass(percent);
    return `<article class="kpi ${level}"><span>${label}</span><strong>${formatNumber(percent)}%</strong></article>`;
  }).join("");
}
function levelClass(percent) {
  if (percent < 60) return "critical";
  if (percent < 80) return "medium";
  return "good";
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  return Number(value).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
}
function getEntries() {
  return getJSON(STORAGE_KEYS.entries, []);
}

function clearEntries() {
  const confirmed = confirm("Supprimer toutes les donnees saisies et recommencer a zero ?");
  if (!confirmed) return;
  setJSON(STORAGE_KEYS.entries, []);
  lastCalculated = emptyMetrics();
  renderAll();
}
function renderDashboard() {
  const entries = getEntries();
  const latest = entries.at(-1) || lastCalculated;
  renderKpis(el("dashboardKpis"), latest);
  renderMachineRanking(entries);
  drawPareto(entries);
  drawTrend(entries);
}

function renderMachineRanking(entries) {
  const byMachine = {};
  entries.forEach((entry) => {
    byMachine[entry.machine] ||= [];
    byMachine[entry.machine].push(entry.trs * 100);
});
  const rows = Object.entries(byMachine)
    .map(([machine, values]) => ({ machine, trs: values.reduce((sum, value) => sum + value, 0) / values.length }))
    .sort((a, b) => a.trs - b.trs);

  el("machineRanking").innerHTML = rows.length ? rows.map((row) => {
    const level = levelClass(row.trs);
    return `<div class="machine-row"><strong>${row.machine}</strong><span class="badge ${level}">${formatNumber(row.trs)}%</span></div>`;
  }).join("") : `<p class="muted">Aucune donnee enregistree pour le moment.</p>`;
}
function drawPareto(entries) {
  const canvas = el("paretoCanvas");
  const ctx = canvas.getContext("2d");
  clearCanvas(ctx, canvas);
  const stops = entries.filter((entry) => entry.stopCause && entry.stopCause !== "Aucun arret");
  const counts = {};
  stops.forEach((entry) => counts[entry.stopCause] = (counts[entry.stopCause] || 0) + 1);
  const data = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
 if (!data.length) {
  console.log("No stop data");
  return drawEmpty(ctx, canvas, "Aucune cause d'arret");
}
  const margin = { top: 25, right: 45, bottom: 82, left: 45 };
const width = canvas.width - margin.left - margin.right;
  const height = canvas.height - margin.top - margin.bottom;
  const total = data.reduce((sum, [, value]) => sum + value, 0);
  const maxCount = Math.max(...data.map(([, value]) => value));
  const barWidth = width / data.length * 0.62;
  let cumulative = 0;
  const points = [];
drawAxes(ctx, margin, width, height);
  data.forEach(([label, count], index) => {
    const x = margin.left + index * (width / data.length) + (width / data.length - barWidth) / 2;
    const barHeight = count / maxCount * height;
    const y = margin.top + height - barHeight;
    ctx.fillStyle = "#0f6fb5";
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = "#172033";
    ctx.font = "12px Arial";
    ctx.save();
ctx.translate(x + barWidth / 2, margin.top + height + 12);
    ctx.rotate(-0.55);
    ctx.textAlign = "right";
    ctx.fillText(shorten(label, 24), 0, 0);
    ctx.restore();
    cumulative += count;
    points.push({ x: x + barWidth / 2, y: margin.top + height - (cumulative / total) * height });
  });
  drawLine(ctx, points, "#df8a1d", 3);
}
function drawTrend(entries) {
  const canvas = el("trendCanvas");
  const ctx = canvas.getContext("2d");
  clearCanvas(ctx, canvas);
  const data = entries.slice(-18).map((entry) => ({
    label: new Date(entry.timestamp).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
    value: entry.trs * 100
  }));
if (!data.length) return drawEmpty(ctx, canvas, "Aucune evolution a afficher");

  const margin = { top: 25, right: 25, bottom: 55, left: 45 };
  const width = canvas.width - margin.left - margin.right;
  const height = canvas.height - margin.top - margin.bottom;
  drawAxes(ctx, margin, width, height);
  const points = data.map((item, index) => {
    const x = margin.left + (data.length === 1 ? width / 2 : index * width / (data.length - 1));
    const y = margin.top + height - (item.value / 100) * height;
    return { x, y, label: item.label, value: item.value };
  });
 drawLine(ctx, points, "#17865a", 3);
  points.forEach((point) => {
    ctx.fillStyle = "#17865a";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#172033";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(point.label, point.x, margin.top + height + 24);
  });
}
function clearCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fbfcfe";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawAxes(ctx, margin, width, height) {
  ctx.strokeStyle = "#cfd8e5";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin.left, margin.top);
  ctx.lineTo(margin.left, margin.top + height);
  ctx.lineTo(margin.left + width, margin.top + height);
  ctx.stroke();
}
function drawLine(ctx, points, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
}
function drawEmpty(ctx, canvas, message) {
  ctx.fillStyle = "#687386";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}

function shorten(text, size) {
  return text.length > size ? `${text.slice(0, size - 1)}...` : text;
}

function renderHistory() {
const entries = getEntries().slice().reverse();
  el("historyTable").innerHTML = entries.length ? entries.map((entry) => `
    <tr>
      <td>${new Date(entry.timestamp).toLocaleString("fr-FR")}</td>
      <td>${entry.post}</td>
      <td>${entry.machine}</td>
      <td>${entry.produced}</td>
      <td>${entry.rejects}</td>
      <td>${entry.stopCause}</td>
      <td><span class="badge ${levelClass(entry.trs * 100)}">${formatNumber(entry.trs * 100)}%</span></td>
    </tr>
  `).join("") : `<tr><td colspan="7">Aucune donnee enregistree.</td></tr>`;
}
function bindSettings() {
  el("saveSettings").addEventListener("click", () => {
    try {
      config = {
        shifts: linesToArray(el("settingsShifts").value),
        bottles: linesToArray(el("settingsBottles").value),
        sections: JSON.parse(el("settingsSections").value),
        stopCauses: JSON.parse(el("settingsCauses").value),
        cadences: JSON.parse(el("settingsCadences").value)
      };
saveConfig();
      populateFormOptions();
      el("settingsMessage").textContent = "Parametrage enregistre.";
    } catch (error) {
      el("settingsMessage").textContent = "Verifiez le format JSON avant d'enregistrer.";
    }
  });

  el("resetConfig").addEventListener("click", () => {
    config = clone(defaultConfig);
    saveConfig();
    renderSettings();
    populateFormOptions();
    el("settingsMessage").textContent = "Valeurs initiales retablies.";
  });
}

function renderSettings() {
  el("settingsShifts").value = config.shifts.join("\n");
  el("settingsBottles").value = config.bottles.join("\n");
  el("settingsSections").value = JSON.stringify(config.sections, null, 2);
  el("settingsCauses").value = JSON.stringify(config.stopCauses, null, 2);
  el("settingsCadences").value = JSON.stringify(config.cadences, null, 2);
}
function linesToArray(value) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function exportCsv() {
  const entries = getEntries();
  const headers = ["Date", "Poste", "Machine", "Pieces produites", "Rebuts", "Cause", "TRS"];
  const rows = entries.map((entry) => [
    new Date(entry.timestamp).toLocaleString("fr-FR"),
    entry.post,
    entry.machine,
    entry.produced,
entry.rejects,
    entry.stopCause,
    `${formatNumber(entry.trs * 100)}%`
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "historique_trs_sofrenor.csv";
  link.click();
  URL.revokeObjectURL(url);
}
function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function updateClock() {
  const date = new Date();
  el("todayDate").textContent = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric" });
}


