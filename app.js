const STORAGE_KEYS = {
  users: "sofrenor_trs_users",
  currentUser: "sofrenor_trs_current_user",
  entries: "sofrenor_trs_entries",
  settings: "sofrenor_trs_settings"
};

const LEGACY_STORAGE_KEYS = {
  users: "sofrenor_users",
  session: "sofrenor_session",
  entries: "sofrenor_entries",
  config: "sofrenor_config"
};

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function machine(label, nominalCadence = null) {
  return { label, nominalCadence };
}

const DEFAULT_SETTINGS = {
  schemaVersion: 2,
  shifts: ["07:00 - 15:00", "15:00 - 23:00", "23:00 - 07:00", "Autre"],
  bottleTypes: ["3kg", "6kg", "9kg", "12kg", "35kg"],
  rebutCauses: ["Matiere", "Milieu", "Methode", "Main d'oeuvre", "Machine", "Autre"],
  stopCauses: [
    "Pannes techniques",
    "Maintenance",
    "Changement de serie",
    "Problemes de qualite",
    "Erreurs humaines",
    "Manque de matiere",
    "Problemes d'energie",
    "Problemes de securite"
  ],
  stopCauseIshikawa: {
    matiere: {
      label: "Matiere",
      causes: [
        "Usure prematuree couteau / contre-couteau",
        "Bavures sur matrice",
        "Degradation poincon",
        "Coincement emboutis dans bague",
        "Autre"
      ]
    },
    milieu: {
      label: "Milieu",
      causes: [
        "Degradation joints hydrauliques",
        "Fissuration conduite hydraulique sous pression",
        "Filtre hydraulique non change",
        "Manque d'huile hydraulique",
        "Autre"
      ]
    },
    methode: {
      label: "Methode",
      causes: [
        "Coincement tole en decoupage",
        "Cisaillement par depassement de la charge nominale",
        "Parametres de reglage non figes par gamme ecrite",
        "Autre"
      ]
    },
    main_oeuvre: {
      label: "Main d'oeuvre",
      causes: [
        "Absence de procedure standardisee de changement serie",
        "Serrage insuffisant des vis de fixation contre-molette",
        "Fixation outil non conforme apres intervention",
        "Autre"
      ]
    },
    machine: {
      label: "Machine",
      causes: [
        "Deterioration cables par vibrations et echauffement",
        "Desserrage contacts et connecteurs sous vibrations",
        "Derive capteur fin de course (usure mecanique)",
        "Surchauffe moteur",
        "Autre"
      ]
    }
  },
  sections: {
    mecanique: {
      label: "Mecanique",
      posts: {
        decoupage: {
          label: "Decoupage",
          machines: [
            machine("Presse decoupe SMG"),
            machine("Outil decoupe flans (03kg / 06kg / 12kg)"),
            machine("Outil decoupe pieds (03kg / 12kg)"),
            machine("Outil decoupe cols")
          ]
        },
        marquage: { label: "Marquage", machines: [machine("Presse de marquage OMERA", 257)] },
        numerotage: { label: "Numerotage", machines: [machine("Presse de numerotage", 212)] },
        emboutissage: {
          label: "Emboutissage",
          machines: [
            machine("Presse emboutissage 06/12/35kg", 180),
            machine("Presse emboutissage 03kg", 180),
            machine("Presse Repkon", 180)
          ]
        },
        rognage_soyage: {
          label: "Rognage et soyage",
          machines: [
            machine("Rogneuse-soyeuse 06/12/35kg"),
            machine("Rogneuse-soyeuse 03kg"),
            machine("Rogneuse Repkon"),
            machine("Rogneuse 03kg"),
            machine("Rogneuse 12kg INF", 133),
            machine("Rogneuse 12kg SUP", 212)
          ]
        },
        cintrage: {
          label: "Cintrage",
          machines: [
            machine("Cintreuse pieds et cols", 240),
            machine("Cintreuse viroles"),
            machine("Cintrage collerette", 277)
          ]
        },
        cintrage_virole: { label: "Cintrage virole", machines: [machine("Cintreuse viroles")] },
        soudage_pied: { label: "Soudage pied", machines: [machine("Soudeuse", 257)] },
        formage: {
          label: "Formage",
          machines: [
            machine("Presse de formage", 129),
            machine("Presse formage trou 03kg"),
            machine("Outil formage cols", 42),
            machine("Outil formage pieds (03kg / 12kg)", 129)
          ]
        }
      }
    },
    soudage: {
      label: "Soudage",
      posts: {
        degraissage: { label: "Degraissage", machines: [machine("Tunnel de degraissage")] },
        soudage_longitudinal: {
          label: "Soudage longitudinal des viroles",
          machines: [
            machine("Soudeuse longitudinale", 12.8),
            machine("Soudeuse corps n°1"),
            machine("Soudeuse corps n°2"),
            machine("Soudeuse corps n°3"),
            machine("Soudeuse corps n°4"),
            machine("Soudeuse corps n°5"),
            machine("Soudeuse corps n°6"),
            machine("Soudeuse par resistance"),
            machine("Poste assemblage viroles")
          ]
        },
        soudure_collerette: {
          label: "Soudure collerette",
          machines: [
            machine("Soudeuse collerette tete n°1", 77),
            machine("Soudeuse collerette tete n°2", 82),
            machine("Soudeuse collerette tete n°3", 60),
            machine("Soudeuse collerette tete n°4")
          ]
        },
        soudure_bague: { label: "Soudure bague", machines: [machine("Soudeuse bague")] },
        soudure_pied_collier: {
          label: "Soudure pied/collier",
          machines: [
            machine("Soudeuse pieds et cols n°1", 97),
            machine("Soudeuse pieds et cols n°2", 97),
            machine("Soudeuse pieds et cols n°3", 97),
            machine("Soudeuse pieds et cols n°4", 97)
          ]
        },
        soudure_circulaire: {
          label: "Soudure circulaire",
          machines: [
            machine("Soudeuse corps 12kg", 86),
            machine("Soudeuse corps 12kg n°3", 67),
            machine("Soudeuse corps 12kg n°4", 78),
            machine("Soudeuse corps")
          ]
        }
      }
    },
    finition: {
      label: "Finition",
      posts: {
        traitement_thermique: {
          label: "Traitement thermique",
          machines: [machine("Four de cuisson", 157), machine("Four de normalisation", 157)]
        },
        epreuve_hydraulique: {
          label: "Epreuve hydraulique",
          machines: [
            machine("Rampe d'epreuve n°1", 12),
            machine("Rampe d'epreuve n°2", 11),
            machine("Rampe d'epreuve n°3", 11),
            machine("Rampe d'epreuve n°4", 9),
            machine("Rampe d'epreuve 35kg")
          ]
        },
        grenaillage: { label: "Grenaillage", machines: [machine("Grenailleuse", 360)] },
        metallisation: { label: "Metallisation", machines: [machine("Poste de metallisation", 360)] },
        peinture: { label: "Peinture", machines: [machine("Peinture", 251)] },
        nettoyage_taraudage: { label: "Nettoyage du taraudage", machines: [machine("Nettoyage du taraudage")] },
        tarage: { label: "Tarage (poids)", machines: [machine("Poste de tarage", 360)] },
        montage_accessoires: {
          label: "Montage des accessoires",
          machines: [machine("Robinetuse n°1", 900), machine("Poste de vidange")]
        },
        poinconnage: { label: "Poinconnage", machines: [machine("Poinconnage")] },
        air_test: { label: "Air test", machines: [machine("Station d'air test", 120)] }
      }
    }
  },
  targets: { trs: 85, disponibilite: 90, performance: 95, qualite: 98 }
};

const ENTRY_FORM_SETTINGS = {
  sections: {
    mecanique: {
      label: "Mecanique",
      posts: {
        decoupage: { label: "Decoupage", machines: [machine("Presse SMG")] },
        marquage: { label: "Marquage", machines: [machine("Presse de marquage OMERA", 257)] },
        numerotage: { label: "Numerotage", machines: [machine("Presse de numerotage", 212)] },
        emboutissage: {
          label: "Emboutissage",
          machines: [
            machine("Presse d'emboutissage 06/12/35 kg", 180),
            machine("Presse d'emboutissage 12/35 kg", 180),
            machine("Presse Repkon", 180)
          ]
        },
        rognage_soyage: {
          label: "Rognage-soyage",
          machines: [
            machine("Rogneuse-soyeuse 06/12/35 kg"),
            machine("Rogneuse-soyeuse 12/35 kg"),
            machine("Rogneuse Repkon")
          ]
        },
        cintrage: { label: "Cintrage", machines: [machine("Cintreuse pieds et cols", 240)] },
        soudage_pieds: { label: "Soudage des pieds", machines: [machine("Soudeuse pieds", 257)] },
        formage_pieds: { label: "Formage pieds", machines: [machine("Presse de formage", 129)] }
      }
    },
    soudage: {
      label: "Soudage",
      posts: {
        degraissage: { label: "Degraissage", machines: [machine("Tunnel de degraissage")] },
        soudage_collerettes: {
          label: "Soudage collerettes",
          machines: [
            machine("Soudeuse collerettes tete n°1", 77),
            machine("Soudeuse collerettes tete n°2", 82),
            machine("Soudeuse collerettes tete n°3", 60),
            machine("Soudeuse collerettes tete n°4", 77)
          ]
        },
        soudage_bague: { label: "Soudage bague", machines: [machine("Soudeuse bague", 82)] },
        soudage_pieds: {
          label: "Soudage pieds",
          machines: [
            machine("Soudeuse pieds et cols n°1", 97),
            machine("Soudeuse pieds et cols n°2", 97)
          ]
        },
        soudage_circulaire: {
          label: "Soudage circulaire",
          machines: [
            machine("Soudeuse corps n°1 tete n°1", 86),
            machine("Soudeuse corps n°1 tete n°2", 86),
            machine("Soudeuse corps n°2", 86),
            machine("Soudeuse corps n°3", 67)
          ]
        },
      }
    },
    finition: {
      label: "Finition",
      posts: {
        traitement_thermique: { label: "Traitement thermique", machines: [machine("Four de normalisation", 157)] },
        epreuve_hydraulique: {
          label: "Epreuve hydraulique",
          machines: [
            machine("Rampe d'epreuve n°1", 12),
            machine("Rampe d'epreuve n°2", 11),
            machine("Rampe d'epreuve n°3", 11),
            machine("Rampe d'epreuve n°4", 9)
          ]
        },
        grenaillage: { label: "Grenaillage", machines: [machine("Grenailleuse", 360)] },
        metallisation: { label: "Metallisation", machines: [machine("Poste de metallisation", 360)] },
        peinture: { label: "Peinture", machines: [machine("Cabine d'appret", 251), machine("Cabine de laque", 251)] },
        montage_accessoires: { label: "Montage des accessoires", machines: [machine("Robineteuse", 900)] },
        poinconnage: { label: "Poinconnage", machines: [machine("Poste de poinconnage", 360)] },
        air_test: { label: "Air test", machines: [machine("Station d'air test", 120)] }
      }
    }
  },
  stopCauseIshikawa: {
    machine: {
      label: "Machine",
      causes: ["Usure prematuree", "Fuites hydrauliques", "Coincement mecanique", "Surchauffe moteur", "Autre"]
    },
    main_oeuvre: {
      label: "Main-d'oeuvre",
      causes: ["Formation insuffisante", "Rotation d'equipe", "Fixation d'outil non conforme apres intervention", "Autre"]
    },
    methode: {
      label: "Methode",
      causes: ["Reglage incorrect", "Absence de standards", "Pas de preventif planifie", "Autre"]
    },
    matiere: {
      label: "Matiere",
      causes: [
        "Matiere usee",
        "Degradation des joints hydrauliques",
        "Filtre hydraulique non change",
        "Manque d'huile hydraulique",
        "Roulements defectueux",
        "Usure de poincon",
        "Presence de bavures sur la matrice",
        "Usure prematuree du couteau/contre-couteau de coupe",
        "Fissuration de la conduite hydraulique sous pression",
        "Autre"
      ]
    },
    milieu: {
      label: "Milieu",
      causes: ["Temperature excessive", "Presence de poussiere et particules", "Des vibrations", "Autre"]
    }
  }
};

const DEFAULT_USERS = [
  { id: createId(), name: "Responsable Production", email: "production@sofrenor.ma", password: "sofrenor123", role: "manager" },
  { id: createId(), name: "Responsable Maintenance", email: "maintenance@sofrenor.ma", password: "sofrenor123", role: "maintenance" },
  { id: createId(), name: "Operateur", email: "operateur@sofrenor.ma", password: "sofrenor123", role: "operator" }
];

const state = {
  users: [],
  currentUser: null,
  entries: [],
  settings: deepClone(DEFAULT_SETTINGS),
  currentMetrics: { trs: 0, disponibilite: 0, performance: 0, qualite: 0, realCadence: 0 }
};

const el = {};
let todayTickerId = null;

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bootstrapData();
  bindEvents();
  renderStaticOptions();
  renderCadenceSettings();
  renderSettingsSummary();
  renderApp();
  startTodayTicker();
});

function cacheElements() {
  [
    "authView", "appView", "sessionBadge", "logoutBtn", "authMessage", "entryMessage", "settingsMessage", "demoMessage",
    "loginForm", "registerForm", "shiftSelect", "customShiftWrapper", "customShiftInput",
    "sectionSelect", "bottleTypeSelect", "postSelect", "machineSelect", "producedInput", "durationInput",
    "theoreticalCadenceInput", "realCadenceInput", "rebutsDetails", "rebutsCountInput",
    "stopDetails", "stopCategorySelect", "stopCauseSelect", "stopOtherWrapper", "stopOtherInput", "stopMinutesInput",
    "entryForm", "scoreGrid", "dashboardScores",
    "machineRanking", "paretoChart", "paretoLegend", "trendChart", "todayLabel", "historyTableBody",
    "historySearch", "clearHistoryFilters", "resetDashboardBtn", "cadenceForm", "saveCadenceBtn", "settingsSummary",
    "configEditor", "saveConfigBtn", "loadDemoBtn", "resetDemoBtn", "exportCsvBtn"
  ].forEach((id) => {
    el[id] = document.getElementById(id);
  });
}

function bootstrapData() {
  const storedUsers = readStorage(STORAGE_KEYS.users, null) || readStorage(LEGACY_STORAGE_KEYS.users, []);
  const storedEntries = readStorage(STORAGE_KEYS.entries, null) || readStorage(LEGACY_STORAGE_KEYS.entries, []);
  const storedSettings = readStorage(STORAGE_KEYS.settings, null) || readStorage(LEGACY_STORAGE_KEYS.config, deepClone(DEFAULT_SETTINGS));
  const storedUser = readStorage(STORAGE_KEYS.currentUser, null) || readStorage(LEGACY_STORAGE_KEYS.session, null);

  state.users = normalizeUsers(storedUsers);
  state.entries = normalizeEntries(storedEntries);
  state.settings = normalizeSettings(storedSettings);
  applyEntryFormSettings();
  state.currentUser = normalizeCurrentUser(storedUser, state.users);

  persist(STORAGE_KEYS.users, state.users);
  persist(STORAGE_KEYS.settings, state.settings);
  if (state.currentUser) persist(STORAGE_KEYS.currentUser, state.currentUser);
}

function applyEntryFormSettings() {
  state.settings.sections = deepClone(ENTRY_FORM_SETTINGS.sections);
  state.settings.stopCauseIshikawa = deepClone(ENTRY_FORM_SETTINGS.stopCauseIshikawa);
}

function normalizeUsers(maybeUsers) {
  const users = Array.isArray(maybeUsers) ? maybeUsers : [];
  const normalized = users
    .map((user) => normalizeUser(user))
    .filter(Boolean);

  DEFAULT_USERS.forEach((demoUser) => {
    const existing = normalized.find((user) => user.email === demoUser.email);
    if (existing) {
      existing.name = existing.name || demoUser.name;
      existing.role = normalizeRole(existing.role || demoUser.role);
      existing.password = existing.password || demoUser.password;
    } else {
      normalized.push({ ...demoUser });
    }
  });

  return normalized;
}

function normalizeUser(user) {
  if (!user || typeof user !== "object") return null;
  const email = String(user.email || user.username || "").trim().toLowerCase();
  if (!email) return null;

  return {
    id: user.id || createId(),
    name: String(user.name || user.fullName || roleLabel(normalizeRole(user.role)) || email).trim(),
    email,
    password: String(user.password || ""),
    role: normalizeRole(user.role)
  };
}

function normalizeCurrentUser(user, users) {
  const normalized = normalizeUser(user);
  if (!normalized) return null;
  return users.find((item) => item.email === normalized.email) || normalized;
}

function normalizeEntries(maybeEntries) {
  if (!Array.isArray(maybeEntries)) return [];
  const converted = maybeEntries.map((entry) => {
    if (!entry || typeof entry !== "object") return entry;

    // Migration: ancienne version = stopMinutes en minutes (0..240). Nouvelle version = heures (0..4).
    if (typeof entry.stopMinutes === "number" && entry.stopMinutes > 4) {
      entry.stopMinutes = Number((entry.stopMinutes / 60).toFixed(2));
    }

    if (entry.timestamp && !entry.date) entry.date = entry.timestamp;
    if (!entry.displayDate && entry.date) {
      entry.displayDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(entry.date));
    }
    if (!entry.operatorName && entry.user) entry.operatorName = entry.user;
    if (!entry.operatorEmail && entry.user) entry.operatorEmail = entry.user;
    if (!entry.role) entry.role = "operator";
    if (!entry.rebutCause) entry.rebutCause = "-";
    if (!entry.stopCause) entry.stopCause = "-";
    if (typeof entry.disponibilite !== "number" && typeof entry.availability === "number") entry.disponibilite = entry.availability;
    if (typeof entry.rebuts !== "number" && typeof entry.rejects === "number") entry.rebuts = entry.rejects;

    return entry;
  });

  persist(STORAGE_KEYS.entries, converted);
  return converted;
}

function normalizeSettings(maybeSettings) {
  const fallback = deepClone(DEFAULT_SETTINGS);
  if (!maybeSettings || typeof maybeSettings !== "object") return fallback;
  if (maybeSettings.schemaVersion === DEFAULT_SETTINGS.schemaVersion) return maybeSettings;

  const migrated = deepClone(DEFAULT_SETTINGS);

  if (Array.isArray(maybeSettings.shifts)) migrated.shifts = maybeSettings.shifts;
  if (Array.isArray(maybeSettings.bottleTypes)) migrated.bottleTypes = maybeSettings.bottleTypes;
  if (Array.isArray(maybeSettings.bottles)) migrated.bottleTypes = maybeSettings.bottles;
  if (Array.isArray(maybeSettings.rebutCauses)) migrated.rebutCauses = maybeSettings.rebutCauses;
  if (Array.isArray(maybeSettings.stopCauses)) migrated.stopCauses = maybeSettings.stopCauses;
  if (maybeSettings.targets && typeof maybeSettings.targets === "object") migrated.targets = { ...migrated.targets, ...maybeSettings.targets };

  if (maybeSettings.stopCauses && !Array.isArray(maybeSettings.stopCauses) && typeof maybeSettings.stopCauses === "object") {
    migrated.stopCauseIshikawa = Object.fromEntries(
      Object.entries(maybeSettings.stopCauses).map(([label, causes]) => [
        toKey(label),
        { label, causes: Array.isArray(causes) ? causes : ["Autre"] }
      ])
    );
  }

  const oldSections = maybeSettings.sections && typeof maybeSettings.sections === "object" ? maybeSettings.sections : null;
  if (oldSections) {
    if (isLegacySectionMap(oldSections)) {
      migrated.sections = convertLegacySections(oldSections, maybeSettings.cadences || {});
    }

    Object.entries(migrated.sections).forEach(([sectionKey, section]) => {
      const oldSection = oldSections[sectionKey];
      if (!oldSection || typeof oldSection !== "object") return;

      if (typeof oldSection.label === "string") section.label = oldSection.label;

      const oldPosts = oldSection.posts && typeof oldSection.posts === "object" ? oldSection.posts : null;
      if (!oldPosts) return;

      Object.entries(section.posts).forEach(([postKey, post]) => {
        const oldPost = oldPosts[postKey];
        if (!oldPost || typeof oldPost !== "object") return;

        if (typeof oldPost.label === "string") post.label = oldPost.label;

        const oldCadence = typeof oldPost.theoreticalCadence === "number" ? oldPost.theoreticalCadence : null;
        if (oldCadence !== null && Array.isArray(post.machines)) {
          post.machines = post.machines.map((machineOption) => {
            if (typeof machineOption === "string") return machine(machineOption, oldCadence);
            if (typeof machineOption === "object" && machineOption) {
              if (typeof machineOption.nominalCadence === "number") return machineOption;
              return machine(machineOption.label, oldCadence);
            }
            return machineOption;
          });
        }
      });
    });
  }

  migrated.schemaVersion = DEFAULT_SETTINGS.schemaVersion;
  persist(STORAGE_KEYS.settings, migrated);
  return migrated;
}

function isLegacySectionMap(sections) {
  return Object.values(sections).some((section) => section && typeof section === "object" && !section.posts);
}

function convertLegacySections(sections, cadences) {
  return Object.fromEntries(
    Object.entries(sections).map(([sectionLabel, posts]) => [
      toKey(sectionLabel),
      {
        label: sectionLabel,
        posts: Object.fromEntries(
          Object.entries(posts || {}).map(([postLabel, machineLabels]) => [
            toKey(postLabel),
            {
              label: postLabel,
              machines: (Array.isArray(machineLabels) ? machineLabels : []).map((machineLabel) => (
                machine(machineLabel, typeof cadences[machineLabel] === "number" ? cadences[machineLabel] : null)
              ))
            }
          ])
        )
      }
    ])
  );
}

function normalizeRole(role) {
  const value = String(role || "operator").toLowerCase();
  if (["manager", "production", "responsable", "admin"].includes(value)) return "manager";
  if (["maintenance"].includes(value)) return "maintenance";
  return "operator";
}

function bindEvents() {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => switchAuthTab(button.dataset.authTab));
  });
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
  el.loginForm.addEventListener("submit", handleLogin);
  el.registerForm.addEventListener("submit", handleRegister);
  el.logoutBtn.addEventListener("click", logout);
  el.sectionSelect.addEventListener("change", updatePosts);
  el.postSelect.addEventListener("change", updateMachinesAndCadence);
  el.machineSelect.addEventListener("change", updateNominalCadenceFromMachineSelection);
  el.shiftSelect.addEventListener("change", handleShiftChange);
  el.durationInput.addEventListener("input", updateLiveMetrics);
  el.producedInput.addEventListener("input", updateLiveMetrics);
  el.stopMinutesInput.addEventListener("input", updateLiveMetrics);
  el.stopCategorySelect.addEventListener("change", updateStopCausesFromCategory);
  el.stopCauseSelect.addEventListener("change", handleStopCauseDetailChange);
  document.querySelectorAll("input[name='hasRebuts']").forEach((radio) => {
    radio.addEventListener("change", toggleConditionalFields);
  });
  document.querySelectorAll("input[name='hasStop']").forEach((radio) => {
    radio.addEventListener("change", toggleConditionalFields);
  });
  el.rebutsCountInput.addEventListener("input", updateLiveMetrics);
  el.entryForm.addEventListener("submit", handleEntrySubmit);
  el.historySearch.addEventListener("input", renderHistory);
  el.clearHistoryFilters.addEventListener("click", () => {
    el.historySearch.value = "";
    renderHistory();
  });
  el.saveCadenceBtn.addEventListener("click", saveCadenceSettings);
  el.saveConfigBtn.addEventListener("click", saveFullConfiguration);
  el.loadDemoBtn.addEventListener("click", loadDemoData);
  el.resetDemoBtn.addEventListener("click", resetStoredEntries);
  el.resetDashboardBtn.addEventListener("click", resetStoredEntries);
  el.exportCsvBtn.addEventListener("click", exportHistoryCsv);
}

function renderStaticOptions() {
  fillSelect(el.shiftSelect, state.settings.shifts);
  if (el.bottleTypeSelect) fillSelect(el.bottleTypeSelect, state.settings.bottleTypes);
  fillSelect(
    el.stopCategorySelect,
    Object.entries(state.settings.stopCauseIshikawa || {}).map(([key, category]) => ({ value: key, label: category.label }))
  );
  fillSelect(
    el.sectionSelect,
    Object.entries(state.settings.sections).map(([key, section]) => ({ value: key, label: section.label }))
  );
  updatePosts();
  updateStopCausesFromCategory();
  handleShiftChange();
  toggleConditionalFields();
  updateLiveMetrics();
  renderTodayLabel();
}

function renderTodayLabel() {
  if (!el.todayLabel) return;
  el.todayLabel.textContent = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

function startTodayTicker() {
  renderTodayLabel();
  if (todayTickerId !== null) window.clearInterval(todayTickerId);
  todayTickerId = window.setInterval(renderTodayLabel, 30000);
}

function updateStopCausesFromCategory() {
  const ishikawa = state.settings.stopCauseIshikawa || {};
  const categoryKey = el.stopCategorySelect.value || Object.keys(ishikawa)[0];
  const category = ishikawa[categoryKey];
  fillSelect(el.stopCauseSelect, Array.isArray(category?.causes) ? category.causes : ["Autre"]);
  handleStopCauseDetailChange();
}

function handleStopCauseDetailChange() {
  const isOther = el.stopCauseSelect.value === "Autre";
  el.stopOtherWrapper.classList.toggle("hidden", !isOther);
  if (!isOther) el.stopOtherInput.value = "";
}

function updatePosts() {
  const sectionKey = el.sectionSelect.value || Object.keys(state.settings.sections)[0];
  const section = state.settings.sections[sectionKey] || Object.values(state.settings.sections)[0];
  const posts = Object.entries(section.posts || {}).map(([key, post]) => ({
    value: key,
    label: post.label
  }));
  fillSelect(el.postSelect, posts);
  updateMachinesAndCadence();
}

function updateMachinesAndCadence() {
  const post = getSelectedPost().post;
  if (!post) return;
  fillSelect(el.machineSelect, post.machines);
  updateNominalCadenceFromMachineSelection();
  updateLiveMetrics();
}

function updateNominalCadenceFromMachineSelection() {
  const { post } = getSelectedPost();
  if (!post || !Array.isArray(post.machines)) return;
  const selectedLabel = el.machineSelect.value;
  const machineOption = post.machines.find((item) => typeof item === "object" && item && item.label === selectedLabel);
  const cadence = machineOption && typeof machineOption.nominalCadence === "number" ? machineOption.nominalCadence : 0;
  el.theoreticalCadenceInput.value = cadence;
}

function handleShiftChange() {
  const isCustom = el.shiftSelect.value === "Autre";
  el.customShiftWrapper.classList.toggle("hidden", !isCustom);
  if (!isCustom) el.customShiftInput.value = "";
}

function toggleConditionalFields() {
  const hasRebuts = document.querySelector("input[name='hasRebuts']:checked").value === "oui";
  const hasStop = document.querySelector("input[name='hasStop']:checked").value === "oui";
  el.rebutsDetails.classList.toggle("hidden", !hasRebuts);
  el.stopDetails.classList.toggle("hidden", !hasStop);
  if (!hasRebuts) el.rebutsCountInput.value = 0;
  if (!hasStop) {
    el.stopMinutesInput.value = 0;
    el.stopOtherWrapper.classList.add("hidden");
    el.stopOtherInput.value = "";
  }
  updateLiveMetrics();
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();
  const user = state.users.find((item) => item.email === email && isValidPassword(item, password));
  if (!user) {
    showMessage(el.authMessage, "Email ou mot de passe incorrect.", "critical");
    return;
  }
  state.currentUser = user;
  persist(STORAGE_KEYS.currentUser, user);
  el.loginForm.reset();
  showMessage(el.authMessage, "Connexion reussie.", "good");
  renderApp();
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim().toLowerCase();
  const password = document.getElementById("registerPassword").value.trim();
  const role = "operator";
  if (state.users.some((user) => user.email === email)) {
    showMessage(el.authMessage, "Un compte existe deja avec cet email.", "critical");
    return;
  }
  state.users.push({ id: createId(), name, email, password, role });
  persist(STORAGE_KEYS.users, state.users);
  showMessage(el.authMessage, "Compte cree avec succes. Vous pouvez vous connecter.", "good");
  el.registerForm.reset();
  switchAuthTab("login");
}

function isValidPassword(user, password) {
  if (user.password === password) return true;
  const demoEmails = ["production@sofrenor.ma", "maintenance@sofrenor.ma", "operateur@sofrenor.ma"];
  return demoEmails.includes(user.email) && ["sofrenor123", "sofrenor1234"].includes(password);
}

function logout() {
  state.currentUser = null;
  localStorage.removeItem(STORAGE_KEYS.currentUser);
  renderApp();
}

function renderApp() {
  const loggedIn = Boolean(state.currentUser);
  const isAdmin = isAdminUser();

  el.authView.classList.toggle("hidden", loggedIn);
  el.appView.classList.toggle("hidden", !loggedIn);
  el.sessionBadge.classList.toggle("hidden", !loggedIn);
  el.logoutBtn.classList.toggle("hidden", !loggedIn);

  if (!loggedIn) {
    document.querySelectorAll(".page-view").forEach((view) => view.classList.add("hidden"));
    document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.remove("active"));
    document.querySelector("[data-view='entry']").classList.add("active");
    return;
  }

  const roleText = roleLabel(state.currentUser.role);
  const nameText = String(state.currentUser.name || "").trim();
  const normalizedRole = normalizeText(roleText);
  const normalizedName = normalizeText(nameText);
  el.sessionBadge.textContent = normalizedName === normalizedRole ? roleText : `${nameText} - ${roleText}`;
  document.querySelectorAll(".admin-only").forEach((node) => {
    node.classList.toggle("hidden", !isAdmin);
  });

  switchView("entry");
  renderHistory();
  renderDashboard();
  renderCadenceSettings();
  renderSettingsSummary();
}

function switchAuthTab(tab) {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authTab === tab);
  });
  el.loginForm.classList.toggle("hidden", tab !== "login");
  el.registerForm.classList.toggle("hidden", tab !== "register");
  showMessage(el.authMessage, "");
}

function switchView(viewName) {
  const isAdmin = isAdminUser();
  const allowedView = !isAdmin && viewName !== "entry" ? "entry" : viewName;
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === allowedView);
  });
  document.querySelectorAll(".page-view").forEach((view) => {
    view.classList.toggle("hidden", view.id !== `${allowedView}View`);
  });
  if (allowedView === "dashboard") renderDashboard();
  if (allowedView === "history") renderHistory();
}

function updateLiveMetrics() {
  const produced = Number(el.producedInput.value || 0);
  const duration = Number(el.durationInput.value || 0);
  const hasRebuts = document.querySelector("input[name='hasRebuts']:checked").value === "oui";
  const hasStop = document.querySelector("input[name='hasStop']:checked").value === "oui";
  const rebuts = hasRebuts ? Number(el.rebutsCountInput.value || 0) : 0;
  const stopHours = hasStop ? Number(el.stopMinutesInput.value || 0) : 0;
  const stopMinutes = stopHours * 60;
  const theoreticalCadence = Number(el.theoreticalCadenceInput.value || 0);

  const metrics = calculateMetrics({ produced, duration, rebuts, stopMinutes, theoreticalCadence });
  state.currentMetrics = metrics;
  el.realCadenceInput.value = metrics.realCadence.toFixed(2);
  renderScoreCards(el.scoreGrid, metrics, false);
}

function handleEntrySubmit(event) {
  event.preventDefault();
  const { sectionKey, postKey, section, post } = getSelectedPost();
  const hasRebuts = document.querySelector("input[name='hasRebuts']:checked").value === "oui";
  const hasStop = document.querySelector("input[name='hasStop']:checked").value === "oui";
  const shift = el.shiftSelect.value === "Autre" ? el.customShiftInput.value.trim() : el.shiftSelect.value;
  const stopHours = hasStop ? Number(el.stopMinutesInput.value || 0) : 0;

  if (!shift) {
    showMessage(el.entryMessage, "Veuillez renseigner l'horaire personnalise.", "critical");
    return;
  }

  const stopCause = hasStop ? buildStopCauseLabel() : "-";
  if (hasStop && stopCause === "-") {
    showMessage(el.entryMessage, "Veuillez renseigner la cause principale d'arret.", "critical");
    return;
  }
  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(res => res.json())
.then(res => {
    document.getElementById("result").innerText = res.prediction;
})
  catch(err => console.log("ERROR:", err));
  const entry = {
    id: createId(),
    date: new Date().toISOString(),
    displayDate: new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date()),
    operatorName: state.currentUser.name,
    operatorEmail: state.currentUser.email,
    role: state.currentUser.role,
    shift,
    section: section.label,
    sectionKey,
    bottleType: el.bottleTypeSelect ? el.bottleTypeSelect.value : "-",
    post: post.label,
    postKey,
    machine: el.machineSelect.value,
    produced: Number(el.producedInput.value || 0),
    duration: Number(el.durationInput.value || 0),
    theoreticalCadence: Number(el.theoreticalCadenceInput.value || 0),
    realCadence: state.currentMetrics.realCadence,
    rebuts: hasRebuts ? Number(el.rebutsCountInput.value || 0) : 0,
    rebutCause: "-",
    hasStop,
    stopCause,
    stopMinutes: stopHours,
    trs: state.currentMetrics.trs,
    disponibilite: state.currentMetrics.disponibilite,
    performance: state.currentMetrics.performance,
    qualite: state.currentMetrics.qualite
  };

  state.entries.unshift(entry);
  persist(STORAGE_KEYS.entries, state.entries);
  showMessage(el.entryMessage, "Saisie enregistree avec succes.", "good");
  el.entryForm.reset();
  renderStaticOptions();
  renderDashboard();
  renderHistory();
}

function buildStopCauseLabel() {
  const ishikawa = state.settings.stopCauseIshikawa || {};
  const categoryKey = el.stopCategorySelect.value;
  const category = ishikawa[categoryKey];
  const categoryLabel = category?.label || categoryKey || "";
  const selected = el.stopCauseSelect.value;

  if (!categoryLabel || !selected) return "-";
  if (selected === "Autre") {
    const other = el.stopOtherInput.value.trim();
    if (!other) return "-";
    return `${categoryLabel} : ${other}`;
  }

  return `${categoryLabel} : ${selected}`;
}

function calculateMetrics({ produced, duration, rebuts, stopMinutes, theoreticalCadence }) {
  const safeDuration = Math.max(duration, 0);
  const safeStop = Math.min(Math.max(stopMinutes, 0), safeDuration);
  const operatingMinutes = Math.max(safeDuration - safeStop, 0);
  const operatingHours = operatingMinutes / 60;
  const goodPieces = Math.max(produced - rebuts, 0);
  const disponibilite = safeDuration > 0 ? operatingMinutes / safeDuration : 0;
  const performanceRaw = theoreticalCadence > 0 && operatingHours > 0 ? produced / (theoreticalCadence * operatingHours) : 0;
  const qualite = produced > 0 ? goodPieces / produced : 0;
  const realCadence = operatingHours > 0 ? produced / operatingHours : 0;
  const performance = clamp(performanceRaw, 0, 1);
  const trs = disponibilite * performance * qualite;
  return { disponibilite, performance, qualite, trs, realCadence };
}

function renderScoreCards(container, metrics, withTargets) {
  const cards = [
    { key: "trs", label: "TRS", value: metrics.trs },
    { key: "disponibilite", label: "Disponibilite", value: metrics.disponibilite },
    { key: "performance", label: "Performance", value: metrics.performance },
    { key: "qualite", label: "Qualite", value: metrics.qualite }
  ];

  container.innerHTML = cards.map((card) => {
    const percent = card.value * 100;
    const status = getStatus(percent);
    const targetText = withTargets ? `<p class="mini-note">Objectif: ${state.settings.targets[card.key]}%</p>` : "";
    return `
      <article class="score-card">
        <h4>${card.label}</h4>
        <div class="score-value ${status.className}">${percent.toFixed(1)}%</div>
        <span class="score-tag ${status.className}">${status.label}</span>
        ${targetText}
      </article>
    `;
  }).join("");
}

function renderDashboard() {
  const averageMetrics = aggregateMetrics(state.entries);
  renderScoreCards(el.dashboardScores, averageMetrics, false);
  renderMachineRanking();
  renderPareto();
  renderTrendChart();
}

function renderMachineRanking() {
  const machineMap = new Map();
  state.entries.forEach((entry) => {
    if (!machineMap.has(entry.machine)) machineMap.set(entry.machine, []);
    machineMap.get(entry.machine).push(entry.trs);
  });

  const ranked = [...machineMap.entries()]
    .map(([machine, values]) => ({
      machine,
      averageTrs: values.reduce((sum, value) => sum + value, 0) / values.length,
      count: values.length
    }))
    .sort((a, b) => a.averageTrs - b.averageTrs);

  if (!ranked.length) {
    el.machineRanking.innerHTML = "<p class='status-message'>Aucune saisie disponible pour classer les machines.</p>";
    return;
  }

  el.machineRanking.innerHTML = ranked.map((item) => {
    const status = getStatus(item.averageTrs * 100);
    return `
      <div class="machine-item bg-${status.className}">
        <div><strong>${item.machine}</strong><small>${item.count} saisie(s) exploitee(s)</small></div>
        <strong>${(item.averageTrs * 100).toFixed(1)}%</strong>
      </div>
    `;
  }).join("");
}

function renderPareto() {
  const totals = {};
  state.entries.forEach((entry) => {
    if (entry.hasStop && entry.stopCause && entry.stopCause !== "-") {
      totals[entry.stopCause] = (totals[entry.stopCause] || 0) + 1;
    }
  });

  const rows = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  if (!rows.length) {
    el.paretoLegend.innerHTML = "";
    el.paretoChart.innerHTML = "<p class='status-message'>Aucune cause d'arret enregistree pour le Pareto.</p>";
    return;
  }

  el.paretoLegend.innerHTML = `
    <span class="legend-item"><span class="legend-swatch part"></span>Fréquence (nombre d'arrêts)</span>
    <span class="legend-item"><span class="legend-swatch cumulative"></span>Fréquence cumulée</span>
  `;

  const totalCount = rows.reduce((sum, [, count]) => sum + count, 0);
  const maxCount = Math.max(...rows.map(([, count]) => count), 1);
  const width = Math.max(780, rows.length * 140);
  const height = 360;
  const padding = { top: 26, right: 70, bottom: 110, left: 72 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const slotWidth = chartWidth / rows.length;
  const barWidth = Math.min(58, slotWidth * 0.54);

  let cumulative = 0;
  const bars = [];
  const points = [];

  rows.forEach(([cause, count], index) => {
    const x = padding.left + slotWidth * index + (slotWidth - barWidth) / 2;
    const barHeight = (count / maxCount) * chartHeight;
    const y = padding.top + chartHeight - barHeight;
    cumulative += (count / totalCount) * 100;
    const pointX = x + barWidth / 2;
    const pointY = padding.top + chartHeight - (cumulative / 100) * chartHeight;

    bars.push(`
      <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${barHeight.toFixed(1)}" rx="10" fill="#1b8a96"></rect>
      <text x="${(x + barWidth / 2).toFixed(1)}" y="${(y - 8).toFixed(1)}" text-anchor="middle" font-size="12" fill="#45655b">${count} fois</text>
      ${renderSvgLabel(cause, x + barWidth / 2, height - 56)}
    `);

    points.push({
      x: pointX,
      y: pointY,
      cumulative
    });
  });

  const cumulativePath = points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const pointDots = points.map((point) => `
    <circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="4.5" fill="#f29f05"></circle>
    <text x="${point.x.toFixed(1)}" y="${(point.y - 12).toFixed(1)}" text-anchor="middle" font-size="11" fill="#8f5c02">${point.cumulative.toFixed(1)}%</text>
  `).join("");

  const leftAxis = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = padding.top + chartHeight - chartHeight * ratio;
    const value = (maxCount * ratio).toFixed(0);
    return `
      <line x1="${padding.left}" y1="${y.toFixed(1)}" x2="${width - padding.right}" y2="${y.toFixed(1)}" stroke="#edf5f2" stroke-width="1"></line>
      <text x="${padding.left - 12}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#63786f">${value}</text>
    `;
  }).join("");

  const rightAxis = [0, 25, 50, 75, 100].map((value) => {
    const y = padding.top + chartHeight - (value / 100) * chartHeight;
    return `<text x="${width - padding.right + 12}" y="${(y + 4).toFixed(1)}" font-size="11" fill="#63786f">${value}%</text>`;
  }).join("");

  el.paretoChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="pareto-svg" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="${width}" height="${height}" fill="#ffffff"></rect>
      ${leftAxis}
      <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + chartHeight}" stroke="#d8e5de" stroke-width="2"></line>
      <line x1="${padding.left}" y1="${padding.top + chartHeight}" x2="${width - padding.right}" y2="${padding.top + chartHeight}" stroke="#d8e5de" stroke-width="2"></line>
      <line x1="${width - padding.right}" y1="${padding.top}" x2="${width - padding.right}" y2="${padding.top + chartHeight}" stroke="#f2d4a3" stroke-width="1.5" stroke-dasharray="5 5"></line>
      ${bars.join("")}
      <polyline fill="none" stroke="#f29f05" stroke-width="3.5" points="${cumulativePath}"></polyline>
      ${pointDots}
      ${rightAxis}
      <text x="${padding.left}" y="${18}" font-size="12" fill="#63786f">Fréquence</text>
      <text x="${width - padding.right + 12}" y="${18}" font-size="12" fill="#63786f">Cumul</text>
    </svg>
  `;
}

function renderTrendChart() {
  if (!state.entries.length) {
    el.trendChart.innerHTML = "<p class='status-message'>Aucune donnee disponible pour l'evolution du TRS.</p>";
    return;
  }

  const sortedEntries = [...state.entries].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-12);
  const width = 760;
  const height = 280;
  const padding = 36;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = sortedEntries.map((entry, index) => ({
    x: padding + (chartWidth / Math.max(sortedEntries.length - 1, 1)) * index,
    y: padding + chartHeight - (entry.trs * chartHeight),
    label: entry.displayDate,
    value: entry.trs
  }));

  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
  const labels = points.map((point) => `
    <text x="${point.x}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#63786f">${point.label.replace(/\//g, "-")}</text>
  `).join("");
  const dots = points.map((point) => `
    <circle cx="${point.x}" cy="${point.y}" r="5" fill="#005f73"></circle>
    <text x="${point.x}" y="${point.y - 12}" text-anchor="middle" font-size="11" fill="#173127">${(point.value * 100).toFixed(0)}%</text>
  `).join("");

  el.trendChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="trend-svg" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="${width}" height="${height}" fill="#ffffff"></rect>
      <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#d8e5de" stroke-width="2"></line>
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#d8e5de" stroke-width="2"></line>
      <line x1="${padding}" y1="${padding + chartHeight * 0.25}" x2="${width - padding}" y2="${padding + chartHeight * 0.25}" stroke="#edf5f2" stroke-width="1"></line>
      <line x1="${padding}" y1="${padding + chartHeight * 0.5}" x2="${width - padding}" y2="${padding + chartHeight * 0.5}" stroke="#edf5f2" stroke-width="1"></line>
      <line x1="${padding}" y1="${padding + chartHeight * 0.75}" x2="${width - padding}" y2="${padding + chartHeight * 0.75}" stroke="#edf5f2" stroke-width="1"></line>
      <polyline fill="none" stroke="#005f73" stroke-width="4" points="${polyline}"></polyline>
      ${dots}
      ${labels}
      <text x="${padding}" y="${padding - 10}" fill="#63786f" font-size="11">100%</text>
      <text x="${padding}" y="${height - padding + 16}" fill="#63786f" font-size="11">0%</text>
    </svg>
  `;
}

function renderHistory() {
  const query = el.historySearch.value.trim().toLowerCase();
  const filtered = state.entries.filter((entry) => {
    const haystack = [entry.displayDate, entry.operatorName, entry.section, entry.post, entry.machine].join(" ").toLowerCase();
    return haystack.includes(query);
  });

  if (!filtered.length) {
    el.historyTableBody.innerHTML = "<tr><td colspan='9' class='status-message'>Aucun enregistrement trouve.</td></tr>";
    return;
  }

  el.historyTableBody.innerHTML = filtered.map((entry) => `
    <tr>
      <td>${entry.displayDate}</td>
      <td>${entry.operatorName}</td>
      <td>${entry.section}</td>
      <td>${entry.post}</td>
      <td>${entry.machine}</td>
      <td>${entry.produced}</td>
      <td>${entry.rebuts}</td>
      <td>${entry.stopCause !== "-" ? entry.stopCause : entry.rebutCause}</td>
      <td class="${getStatus(entry.trs * 100).className}">${(entry.trs * 100).toFixed(1)}%</td>
    </tr>
  `).join("");
}

function renderCadenceSettings() {
  const fields = [];
  Object.entries(state.settings.sections).forEach(([sectionKey, section]) => {
    fields.push(`<div class="chip">${section.label}</div>`);
    Object.entries(section.posts).forEach(([postKey, post]) => {
      fields.push(`<p class="mini-note"><strong>${post.label}</strong></p>`);
      (post.machines || []).forEach((machineOption, index) => {
        const label = typeof machineOption === "string" ? machineOption : machineOption.label;
        const cadence = typeof machineOption === "object" && machineOption ? machineOption.nominalCadence : null;
        const value = typeof cadence === "number" ? cadence : "";
        fields.push(`
          <label>
            ${label}
            <input type="number" min="0" step="0.01" data-cadence-path="${sectionKey}|${postKey}|${index}" value="${value}">
          </label>
        `);
      });
    });
  });
  el.cadenceForm.innerHTML = fields.join("");
}

function saveCadenceSettings() {
  if (!isAdminUser()) {
    showMessage(el.settingsMessage, "Seuls les responsables peuvent modifier les parametres.", "critical");
    return;
  }

  document.querySelectorAll("[data-cadence-path]").forEach((input) => {
    const path = String(input.dataset.cadencePath || "");
    const [sectionKey, postKey, machineIndexRaw] = path.split("|");
    const machineIndex = Number(machineIndexRaw);
    const section = state.settings.sections[sectionKey];
    const post = section?.posts?.[postKey];
    if (!post || !Array.isArray(post.machines) || Number.isNaN(machineIndex) || !post.machines[machineIndex]) return;

    const newValue = input.value === "" ? null : Number(input.value);
    const cadence = typeof newValue === "number" && !Number.isNaN(newValue) ? newValue : null;
    const currentMachine = post.machines[machineIndex];

    if (typeof currentMachine === "string") {
      post.machines[machineIndex] = machine(currentMachine, cadence);
    } else if (typeof currentMachine === "object" && currentMachine) {
      currentMachine.nominalCadence = cadence;
    }
  });

  persist(STORAGE_KEYS.settings, state.settings);
  renderStaticOptions();
  renderSettingsSummary();
  showMessage(el.settingsMessage, "Cadences theoriques mises a jour.", "good");
}

function renderSettingsSummary() {
  el.configEditor.value = JSON.stringify(state.settings, null, 2);
  const ishikawaLabels = Object.values(state.settings.stopCauseIshikawa || {}).map((item) => item.label).filter(Boolean);
  el.settingsSummary.innerHTML = `
    <p><strong>Horaires:</strong> ${state.settings.shifts.join(" | ")}</p>
    <p><strong>Sections:</strong> ${Object.values(state.settings.sections).map((section) => section.label).join(" | ")}</p>
    <p><strong>Types de bouteilles:</strong> ${state.settings.bottleTypes.join(" | ")}</p>
    <p><strong>Causes de rebuts:</strong> ${state.settings.rebutCauses.join(" | ")}</p>
    <p><strong>Causes d'arret (Ishikawa):</strong> ${ishikawaLabels.join(" | ") || "-"}</p>
    <p><strong>Objectifs:</strong> TRS ${state.settings.targets.trs}% | Disponibilite ${state.settings.targets.disponibilite}% | Performance ${state.settings.targets.performance}% | Qualite ${state.settings.targets.qualite}%</p>
  `;
}

function saveFullConfiguration() {
  if (!isAdminUser()) {
    showMessage(el.settingsMessage, "Seuls les responsables peuvent modifier la configuration.", "critical");
    return;
  }

  try {
    const parsed = JSON.parse(el.configEditor.value);
    state.settings = parsed;
    persist(STORAGE_KEYS.settings, state.settings);
    renderStaticOptions();
    renderCadenceSettings();
    renderSettingsSummary();
    renderDashboard();
    showMessage(el.settingsMessage, "Configuration complete mise a jour.", "good");
  } catch (error) {
    showMessage(el.settingsMessage, "Le JSON de configuration n'est pas valide.", "critical");
  }
}

function loadDemoData() {
  const demoRows = [
    { daysAgo: 6, operatorName: "Sara Amrani", shift: "07:00 - 15:00", sectionKey: "mecanique", postKey: "decoupage", bottleType: "12kg", machine: "Presse decoupe SMG", produced: 285, duration: 240, rebuts: 6, rebutCause: "Methode", stopCause: "Changement de serie", stopMinutes: 0.30 },
    { daysAgo: 6, operatorName: "Youssef Idrissi", shift: "15:00 - 23:00", sectionKey: "soudage", postKey: "soudage_longitudinal", bottleType: "12kg", machine: "Soudeuse longitudinale", produced: 148, duration: 240, rebuts: 9, rebutCause: "Machine", stopCause: "Pannes techniques", stopMinutes: 0.70 },
    { daysAgo: 5, operatorName: "Meryem El Alaoui", shift: "23:00 - 07:00", sectionKey: "finition", postKey: "peinture", bottleType: "6kg", machine: "Peinture", produced: 176, duration: 240, rebuts: 11, rebutCause: "Milieu", stopCause: "Problemes de qualite", stopMinutes: 0.50 },
    { daysAgo: 5, operatorName: "Hamza Bennis", shift: "07:00 - 15:00", sectionKey: "mecanique", postKey: "emboutissage", bottleType: "35kg", machine: "Presse emboutissage 06/12/35kg", produced: 198, duration: 240, rebuts: 4, rebutCause: "Matiere", stopCause: "Maintenance", stopMinutes: 0.33 },
    { daysAgo: 4, operatorName: "Khadija Tahiri", shift: "15:00 - 23:00", sectionKey: "finition", postKey: "air_test", bottleType: "3kg", machine: "Station d'air test", produced: 165, duration: 240, rebuts: 3, rebutCause: "Autre", stopCause: "Problemes d'energie", stopMinutes: 0.20 },
    { daysAgo: 4, operatorName: "Omar Fassi", shift: "23:00 - 07:00", sectionKey: "soudage", postKey: "soudure_circulaire", bottleType: "9kg", machine: "Soudeuse corps", produced: 120, duration: 240, rebuts: 8, rebutCause: "Main d'oeuvre", stopCause: "Pannes techniques", stopMinutes: 0.63 },
    { daysAgo: 3, operatorName: "Salma Chraibi", shift: "07:00 - 15:00", sectionKey: "finition", postKey: "epreuve_hydraulique", bottleType: "12kg", machine: "Rampe d'epreuve n°1", produced: 230, duration: 240, rebuts: 2, rebutCause: "Autre", stopCause: "Erreurs humaines", stopMinutes: 8 },
    { daysAgo: 3, operatorName: "Ayoub Naciri", shift: "15:00 - 23:00", sectionKey: "mecanique", postKey: "formage", bottleType: "35kg", machine: "Presse de formage", produced: 170, duration: 240, rebuts: 5, rebutCause: "Machine", stopCause: "Maintenance", stopMinutes: 26 },
    { daysAgo: 2, operatorName: "Noura Moutaouakil", shift: "23:00 - 07:00", sectionKey: "soudage", postKey: "soudure_bague", bottleType: "6kg", machine: "Soudeuse bague", produced: 136, duration: 240, rebuts: 12, rebutCause: "Methode", stopCause: "Problemes de qualite", stopMinutes: 35 },
    { daysAgo: 2, operatorName: "Zakaria El Mernissi", shift: "07:00 - 15:00", sectionKey: "finition", postKey: "tarage", bottleType: "3kg", machine: "Poste de tarage", produced: 248, duration: 240, rebuts: 1, rebutCause: "Milieu", stopCause: "Manque de matiere", stopMinutes: 10 },
    { daysAgo: 1, operatorName: "Imane Serrhini", shift: "15:00 - 23:00", sectionKey: "mecanique", postKey: "marquage", bottleType: "9kg", machine: "Presse de marquage OMERA", produced: 268, duration: 240, rebuts: 3, rebutCause: "Methode", stopCause: "Changement de serie", stopMinutes: 14 },
    { daysAgo: 0, operatorName: "Rachid Oulhaj", shift: "07:00 - 15:00", sectionKey: "soudage", postKey: "degraissage", bottleType: "12kg", machine: "Tunnel de degraissage", produced: 335, duration: 240, rebuts: 4, rebutCause: "Milieu", stopCause: "Problemes de securite", stopMinutes: 16 }
  ];

  const existingCount = state.entries.length;
  const demoEntries = demoRows.map((row) => createDemoEntry(row));
  state.entries = mergeEntriesWithoutDuplicates(state.entries, demoEntries);
  state.entries = normalizeEntries(state.entries);
  persist(STORAGE_KEYS.entries, state.entries);
  renderDashboard();
  renderHistory();
  const addedCount = state.entries.length - existingCount;
  const message = addedCount > 0
    ? `${addedCount} donnee(s) de demonstration ajoutee(s) sans supprimer votre historique.`
    : "Les donnees de demonstration sont deja presentes. Aucun historique n'a ete supprime.";
  showMessage(el.demoMessage, message, "good");
  if (state.currentUser) {
    showMessage(el.entryMessage, "Des donnees demo sont disponibles pour la verification.", "good");
  }
}

function createDemoEntry(row) {
  const sectionKey = state.settings.sections[row.sectionKey] ? row.sectionKey : Object.keys(state.settings.sections)[0];
  const section = state.settings.sections[sectionKey];
  const postKey = section.posts[row.postKey] ? row.postKey : Object.keys(section.posts)[0];
  const post = section.posts[postKey];
  const machineOption = (post.machines || []).find((item) => typeof item === "object" && item && item.label === row.machine) || post.machines[0];
  const machineLabel = typeof machineOption === "object" && machineOption ? machineOption.label : String(machineOption || row.machine);
  const nominalCadence = machineOption && typeof machineOption.nominalCadence === "number" ? machineOption.nominalCadence : 0;
  const baseDate = new Date();
  baseDate.setHours(8 + (row.daysAgo % 3) * 7, 15, 0, 0);
  baseDate.setDate(baseDate.getDate() - row.daysAgo);

  const metrics = calculateMetrics({
    produced: row.produced,
    duration: row.duration,
    rebuts: row.rebuts,
    stopMinutes: row.stopMinutes > 4 ? row.stopMinutes : row.stopMinutes * 60,
    theoreticalCadence: nominalCadence
  });

  return {
    id: createId(),
    date: baseDate.toISOString(),
    displayDate: new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(baseDate),
    operatorName: row.operatorName,
    operatorEmail: `${row.operatorName.toLowerCase().replace(/\s+/g, ".")}@sofrenor.ma`,
    role: "operator",
    shift: row.shift,
    section: section.label,
    sectionKey,
    bottleType: "-",
    post: post.label,
    postKey,
    machine: machineLabel,
    produced: row.produced,
    duration: row.duration,
    theoreticalCadence: nominalCadence,
    realCadence: metrics.realCadence,
    rebuts: row.rebuts,
    rebutCause: row.rebutCause,
    hasStop: row.stopMinutes > 0,
    stopCause: row.stopCause,
    stopMinutes: row.stopMinutes > 4 ? Number((row.stopMinutes / 60).toFixed(2)) : row.stopMinutes,
    trs: metrics.trs,
    disponibilite: metrics.disponibilite,
    performance: metrics.performance,
    qualite: metrics.qualite
  };
}

function resetStoredEntries() {
  const confirmed = window.confirm("Voulez-vous supprimer les donnees de demonstration et l'historique enregistre ?");
  if (!confirmed) return;
  state.entries = [];
  persist(STORAGE_KEYS.entries, state.entries);
  renderDashboard();
  renderHistory();
  showMessage(el.demoMessage, "Historique reinitialise.", "medium");
  showMessage(el.entryMessage, "", "");
}

function exportHistoryCsv() {
  if (!state.entries.length) {
    window.alert("Aucune donnee a exporter.");
    return;
  }

  const headers = ["Date", "Operateur", "Section", "Poste", "Machine", "Horaire", "Type bouteille", "Pieces produites", "Rebuts", "Cause rebut", "Cause arret", "Arret (h)", "Disponibilite (%)", "Performance (%)", "Qualite (%)", "TRS (%)"];
  const rows = state.entries.map((entry) => [
    entry.displayDate,
    entry.operatorName,
    entry.section,
    entry.post,
    entry.machine,
    entry.shift,
    entry.bottleType,
    entry.produced,
    entry.rebuts,
    entry.rebutCause,
    entry.stopCause,
    entry.stopMinutes,
    (entry.disponibilite * 100).toFixed(1),
    (entry.performance * 100).toFixed(1),
    (entry.qualite * 100).toFixed(1),
    (entry.trs * 100).toFixed(1)
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "historique-trs-sofrenor.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();
}

function toKey(value) {
  return normalizeText(value).replace(/\s+/g, "_") || createId();
}

function mergeEntriesWithoutDuplicates(existingEntries, newEntries) {
  const seen = new Set(existingEntries.map((entry) => buildEntrySignature(entry)));
  const merged = [...existingEntries];

  newEntries.forEach((entry) => {
    const signature = buildEntrySignature(entry);
    if (!seen.has(signature)) {
      seen.add(signature);
      merged.push(entry);
    }
  });

  return merged.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function buildEntrySignature(entry) {
  return [
    entry.date,
    entry.operatorName,
    entry.sectionKey,
    entry.postKey,
    entry.machine,
    entry.produced,
    entry.rebuts,
    entry.stopMinutes
  ].join("|");
}

function renderSvgLabel(label, centerX, startY) {
  const words = label.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  const firstLine = escapeMarkup(words.slice(0, midpoint).join(" "));
  const secondLine = escapeMarkup(words.slice(midpoint).join(" "));

  if (!secondLine) {
    return `<text x="${centerX.toFixed(1)}" y="${startY}" text-anchor="middle" font-size="11.5" fill="#173127">${firstLine}</text>`;
  }

  return `
    <text x="${centerX.toFixed(1)}" y="${startY}" text-anchor="middle" font-size="11.5" fill="#173127">${firstLine}</text>
    <text x="${centerX.toFixed(1)}" y="${startY + 15}" text-anchor="middle" font-size="11.5" fill="#173127">${secondLine}</text>
  `;
}

function aggregateMetrics(entries) {
  if (!entries.length) return { trs: 0, disponibilite: 0, performance: 0, qualite: 0 };
  const totals = entries.reduce((acc, entry) => {
    acc.trs += entry.trs;
    acc.disponibilite += entry.disponibilite;
    acc.performance += entry.performance;
    acc.qualite += entry.qualite;
    return acc;
  }, { trs: 0, disponibilite: 0, performance: 0, qualite: 0 });

  return {
    trs: totals.trs / entries.length,
    disponibilite: totals.disponibilite / entries.length,
    performance: totals.performance / entries.length,
    qualite: totals.qualite / entries.length
  };
}

function fillSelect(select, values) {
  select.innerHTML = values.map((item) => {
    if (typeof item === "string") return `<option value="${item}">${item}</option>`;
    const value = item.value ?? item.label ?? "";
    const label = item.label ?? item.value ?? "";
    return `<option value="${value}">${label}</option>`;
  }).join("");
  if (!values.length) return;
  const validValues = values.map((item) => (typeof item === "string" ? item : String(item.value ?? item.label ?? "")));
  if (!validValues.includes(select.value)) {
    select.value = validValues[0];
  }
}

function getSelectedPost() {
  const sectionKey = state.settings.sections[el.sectionSelect.value] ? el.sectionSelect.value : Object.keys(state.settings.sections)[0];
  const section = state.settings.sections[sectionKey];
  const postKey = section?.posts?.[el.postSelect.value] ? el.postSelect.value : Object.keys(section?.posts || {})[0];
  const post = section?.posts?.[postKey];
  return { sectionKey, postKey, section, post };
}

function getStatus(percent) {
  if (percent < 60) return { label: "Critique", className: "critical" };
  if (percent < 85) return { label: "Moyen", className: "medium" };
  return { label: "Bon", className: "good" };
}

function labelForMetric(key) {
  return { trs: "TRS", disponibilite: "Disponibilite", performance: "Performance", qualite: "Qualite" }[key] || key;
}

function roleLabel(role) {
  return {
    operator: "Opérateur",
    manager: "Responsable production",
    maintenance: "Responsable maintenance"
  }[role] || role;
}

function isAdminUser() {
  return state.currentUser && ["manager", "maintenance"].includes(state.currentUser.role);
}

function showMessage(target, message, tone = "") {
  target.textContent = message;
  target.className = `status-message ${tone}`.trim();
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function persist(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeMarkup(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
