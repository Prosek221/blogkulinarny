const PROFILE_KEY = "imperium-frontowe-profile";
const TAX_RATE = 0.4;

const createId = () => {
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
};

const missileTypes = [
  { id: "a2a", name: "AAM-120 (pow.-pow.)", cost: 260, power: 7, use: "air" },
  { id: "a2g", name: "AGM-88 (pow.-ziemia)", cost: 300, power: 8, use: "land" },
  { id: "a2s", name: "AGM-84 (pow.-woda)", cost: 320, power: 8, use: "sea" }
];

const aircraftTypes = [
  { name: "F-16 Fighting Falcon", cost: 900, maintenance: 12, attack: 8, stealth: false },
  { name: "F-35 Lightning II", cost: 1600, maintenance: 20, attack: 12, stealth: true },
  { name: "F-15 Eagle", cost: 1100, maintenance: 14, attack: 9, stealth: false },
  { name: "F/A-18 Hornet", cost: 1050, maintenance: 13, attack: 9, stealth: false },
  { name: "Eurofighter Typhoon", cost: 1300, maintenance: 15, attack: 10, stealth: false },
  { name: "Dassault Rafale", cost: 1250, maintenance: 15, attack: 10, stealth: false },
  { name: "JAS 39 Gripen", cost: 980, maintenance: 11, attack: 8, stealth: false },
  { name: "Su-57 Felon", cost: 1700, maintenance: 22, attack: 13, stealth: true },
  { name: "Su-35 Flanker", cost: 1350, maintenance: 16, attack: 11, stealth: false },
  { name: "MiG-35", cost: 1150, maintenance: 13, attack: 9, stealth: false },
  { name: "B-2 Spirit", cost: 2100, maintenance: 26, attack: 15, stealth: true },
  { name: "B-21 Raider", cost: 2300, maintenance: 28, attack: 16, stealth: true },
  { name: "A-10 Thunderbolt II", cost: 850, maintenance: 10, attack: 7, stealth: false },
  { name: "AC-130 Ghostrider", cost: 1400, maintenance: 18, attack: 12, stealth: false },
  { name: "F-22 Raptor", cost: 1900, maintenance: 24, attack: 14, stealth: true }
];

const tankTypes = [
  { name: "M1A2 Abrams", cost: 500, maintenance: 6, attack: 7 },
  { name: "Leopard 2A7", cost: 520, maintenance: 6, attack: 7 },
  { name: "K2 Black Panther", cost: 540, maintenance: 7, attack: 8 },
  { name: "Challenger 3", cost: 510, maintenance: 6, attack: 7 },
  { name: "T-14 Armata", cost: 550, maintenance: 7, attack: 8 },
  { name: "Merkava Mk.4", cost: 500, maintenance: 6, attack: 7 },
  { name: "Type 10", cost: 480, maintenance: 5, attack: 6 },
  { name: "Altay", cost: 470, maintenance: 5, attack: 6 },
  { name: "Leclerc XLR", cost: 495, maintenance: 5, attack: 6 },
  { name: "PT-91 Twardy", cost: 420, maintenance: 4, attack: 5 }
];

const shipTypes = [
  { name: "Niszczyciel rakietowy", cost: 1200, maintenance: 18, attack: 11, stealth: false },
  { name: "Fregata stealth", cost: 1000, maintenance: 16, attack: 9, stealth: true },
  { name: "Korweta patrolowa", cost: 800, maintenance: 12, attack: 7, stealth: false },
  { name: "Okręt desantowy", cost: 900, maintenance: 14, attack: 8, stealth: false },
  { name: "Lotniskowiec", cost: 1800, maintenance: 24, attack: 14, stealth: false },
  { name: "Okręt podwodny typu Virginia", cost: 1500, maintenance: 20, attack: 13, stealth: true },
  { name: "Okręt podwodny typu Astute", cost: 1400, maintenance: 19, attack: 12, stealth: true },
  { name: "Okręt podwodny Scorpene", cost: 1200, maintenance: 17, attack: 10, stealth: true },
  { name: "Szybki kuter rakietowy", cost: 700, maintenance: 10, attack: 6, stealth: false },
  { name: "Zwiadowczy okręt SIGINT", cost: 650, maintenance: 9, attack: 4, stealth: false }
];

const buildingCatalog = [
  { id: "airport", name: "Lotnisko wojskowe", cost: 1200, description: "Pozwala na zakup samolotów." },
  { id: "hangar", name: "Rozbuduj hangary", cost: 850, description: "+4 miejsca dla samolotów." },
  { id: "port", name: "Port wojskowy", cost: 1100, description: "Wymagany dla statków i okrętów." },
  { id: "radar", name: "Radar naziemny", cost: 600, description: "Lepsze wykrywanie celów." },
  { id: "mobileRadar", name: "Auto-radar", cost: 900, description: "Daje wykrycia poza głównym zasięgiem." },
  { id: "omegaRadar", name: "Radar OMEGA", cost: 2200, description: "Wykrywa nawet cele stealth." },
  { id: "missileSilo", name: "Silos rakietowy", cost: 1600, description: "Odblokowuje przechwytywanie rakiet." },
  { id: "antiAir", name: "System przeciwlotniczy", cost: 700, description: "Większa obrona przeciw lotnictwu." },
  { id: "walls", name: "Mury obronne", cost: 500, description: "Wzmacniają obronę lądową." }
];

const ui = {
  cityList: document.getElementById("cityList"), cityStatus: document.getElementById("cityStatus"), buildingShop: document.getElementById("buildingShop"),
  unitShop: document.getElementById("unitShop"), missileShop: document.getElementById("missileShop"), missileStock: document.getElementById("missileStock"),
  budget: document.getElementById("budget"), maintenance: document.getElementById("maintenance"), taxIncome: document.getElementById("taxIncome"),
  populationTotal: document.getElementById("populationTotal"), gameStatus: document.getElementById("gameStatus"), map: document.getElementById("map"),
  minimap: document.getElementById("minimap"), eventLog: document.getElementById("eventLog"), radarLog: document.getElementById("radarLog"),
  radarActions: document.getElementById("radarActions"), radarDots: document.getElementById("radarDots"), patrolList: document.getElementById("patrolList"),
  vehicleList: document.getElementById("vehicleList"), aircraftPanel: document.getElementById("aircraftPanel"), addCity: document.getElementById("addCity"),
  recruitSoldiers: document.getElementById("recruitSoldiers"), profileName: document.getElementById("profileName"), saveProfile: document.getElementById("saveProfile"),
  loadProfile: document.getElementById("loadProfile"), enemyCityList: document.getElementById("enemyCityList"), attackCooldown: document.getElementById("attackCooldown"),
  attackCity: document.getElementById("attackCity"), sendPatrol: document.getElementById("sendPatrol")
};

const state = { budget: 10000, maintenance: 0, taxIncome: 0, cities: [], activeCityId: null, patrols: [], events: [], enemiesDetected: [], missions: [], selectedEnemyId: null, selectedEnemyCityId: null, enemyCities: [], attackCooldown: 0, selectedAircraftId: null, selectedScoutAircraftId: null, missileInventory: { a2a: 2, a2g: 1, a2s: 1 } };
const randomFrom = (list) => list[Math.floor(Math.random() * list.length)];
const getActiveCity = () => state.cities.find((c) => c.id === state.activeCityId);
const getSelectedEnemy = () => state.enemiesDetected.find((e) => e.id === state.selectedEnemyId);
const getSelectedEnemyCity = () => state.enemyCities.find((c) => c.id === state.selectedEnemyCityId);
const getHangarCapacity = (city) => city.buildings.hangar * 4;
const getTotalPopulation = () => state.cities.reduce((sum, city) => sum + (city.lost ? 0 : city.population), 0);

const createCity = (name, starter = false) => ({
  id: createId(), name, population: 13000 + Math.floor(Math.random() * 5000), morale: 85, incomeBase: 460, soldiers: starter ? 220 : 80,
  buildings: { airport: starter, hangar: starter ? 2 : 1, port: starter, radar: 1, mobileRadar: false, omegaRadar: false, missileSilo: false, antiAir: false, walls: false },
  units: { aircraft: [], tanks: [], ships: [] }, status: "bezpieczne", lost: false
});
const createEnemyCity = (name) => ({ id: createId(), name, defense: 120, status: "aktywny" });

const logEvent = (message) => {
  const t = new Date().toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  state.events.unshift(`[${t}] ${message}`); state.events = state.events.slice(0, 20); ui.eventLog.innerHTML = state.events.map((e) => `<div>${e}</div>`).join("");
};

const renderCities = () => {
  ui.cityList.innerHTML = "";
  state.cities.forEach((city) => {
    const btn = document.createElement("button");
    btn.className = `city-button ${city.id === state.activeCityId ? "active" : ""}`;
    btn.textContent = city.name + (city.lost ? " (utracone)" : "");
    btn.disabled = city.lost;
    btn.onclick = () => { state.activeCityId = city.id; render(); };
    ui.cityList.appendChild(btn);
  });
};

const renderCityStatus = () => {
  const city = getActiveCity(); if (!city) return;
  const income = Math.floor((city.incomeBase + city.population / 70 + city.morale * 3) * TAX_RATE);
  ui.cityStatus.innerHTML = `<div><strong>${city.name}</strong></div><div>Populacja: ${city.population}</div><div>Morale: ${city.morale}%</div><div>Żołnierze: ${city.soldiers}</div><div>Podatek netto: ${income} zł / tura</div><div>Hangary: ${city.units.aircraft.length}/${getHangarCapacity(city)}</div><div>Radar: lvl ${city.buildings.radar}${city.buildings.omegaRadar ? " + OMEGA" : ""}</div>`;
};

const renderShops = () => {
  const city = getActiveCity(); if (!city) return;
  ui.buildingShop.innerHTML = "";
  buildingCatalog.forEach((b) => {
    const card = document.createElement("div"); card.className = "shop-card";
    const btn = document.createElement("button"); btn.textContent = `${b.name} (${b.cost} zł)`;
    btn.disabled = ["airport", "port", "mobileRadar", "omegaRadar", "missileSilo", "antiAir", "walls"].includes(b.id) && !!city.buildings[b.id];
    btn.onclick = () => purchaseBuilding(b);
    card.innerHTML = `<strong>${b.name}</strong><p>${b.description}</p>`; card.appendChild(btn); ui.buildingShop.appendChild(card);
  });

  ui.unitShop.innerHTML = "";
  const section = (title, list, type) => {
    const wrap = document.createElement("div"); wrap.className = "shop-section"; wrap.innerHTML = `<h4>${title}</h4>`;
    list.forEach((unit) => {
      const card = document.createElement("div"); card.className = "shop-card";
      const btn = document.createElement("button"); btn.textContent = `Kup (${unit.cost} zł)`; btn.onclick = () => purchaseUnit(type, unit);
      card.innerHTML = `<strong>${unit.name}</strong><p>Atak:${unit.attack} | Utrzymanie:${unit.maintenance}</p>`; card.appendChild(btn); wrap.appendChild(card);
    });
    ui.unitShop.appendChild(wrap);
  };
  section("Samoloty (15)", aircraftTypes, "aircraft"); section("Czołgi (10)", tankTypes, "tanks"); section("Flota (10)", shipTypes, "ships");

  ui.missileShop.innerHTML = "";
  missileTypes.forEach((m) => {
    const card = document.createElement("div"); card.className = "shop-card";
    const btn = document.createElement("button"); btn.textContent = `Kup (${m.cost} zł)`; btn.onclick = () => buyMissile(m.id);
    card.innerHTML = `<strong>${m.name}</strong><p>Moc: ${m.power} | Cel: ${m.use}</p>`; card.appendChild(btn); ui.missileShop.appendChild(card);
  });

  ui.missileStock.innerHTML = missileTypes.map((m) => `<div class="missile-entry">${m.name}: ${state.missileInventory[m.id] || 0}</div>`).join("");
};

const renderResources = () => {
  ui.budget.textContent = state.budget.toFixed(0); ui.maintenance.textContent = state.maintenance.toFixed(0); ui.taxIncome.textContent = state.taxIncome.toFixed(0); ui.populationTotal.textContent = getTotalPopulation().toFixed(0);
};

const renderMap = () => {
  ui.map.innerHTML = "";
  state.cities.forEach((city) => {
    const card = document.createElement("div"); card.className = `city-card ${city.id === state.activeCityId ? "active" : ""}`;
    card.innerHTML = `<h4>${city.name}</h4><p>${city.status}</p><p>Żołnierze: ${city.soldiers}</p><div class="city-assets"><span>✈️ ${city.units.aircraft.length}</span><span>🛡️ ${city.units.tanks.length}</span><span>🚢 ${city.units.ships.length}</span></div>`;
    ui.map.appendChild(card);
  });
};

const renderRadar = () => {
  ui.radarLog.innerHTML = "";
  if (!state.enemiesDetected.length) ui.radarLog.textContent = "Brak wykryć.";
  state.enemiesDetected.slice(0, 8).forEach((enemy) => {
    const btn = document.createElement("button"); btn.className = `radar-entry ${enemy.id === state.selectedEnemyId ? "active" : ""}`; btn.textContent = enemy.label;
    btn.onclick = () => { state.selectedEnemyId = enemy.id; renderRadarActions(); renderRadar(); };
    ui.radarLog.appendChild(btn);
  });

  ui.radarDots.innerHTML = "";
  state.enemiesDetected.slice(0, 10).forEach((enemy) => {
    const dot = document.createElement("span"); dot.className = `radar-dot ${enemy.type}`; dot.style.left = `${enemy.x}%`; dot.style.top = `${enemy.y}%`; ui.radarDots.appendChild(dot);
  });
};

const renderRadarActions = () => {
  const selected = getSelectedEnemy(); const city = getActiveCity();
  if (!selected || !city) { ui.radarActions.textContent = "Wybierz cel na radarze."; return; }

  const readyAircraft = city.units.aircraft.filter((a) => a.status === "gotowy");
  const opts = readyAircraft.map((a) => `<option value="${a.id}" ${state.selectedScoutAircraftId === a.id ? "selected" : ""}>${a.name}</option>`).join("");

  const mission = state.missions.find((m) => m.targetId === selected.id && m.stage === "engage");
  const canRadioBack = !!mission;
  ui.radarActions.innerHTML = `
    <div><strong>Cel:</strong> ${selected.label}</div>
    <div>Status: ${selected.status}</div>
    <label>Samolot zwiadowczy:</label>
    <select id="scoutSelect" class="select-inline"><option value="">-- wybierz --</option>${opts}</select>
    <div class="city-actions">
      <button id="sendScout">Wyślij samolot zwiadowczy</button>
      <button id="shootByAircraft">Zestrzel samolotem</button>
      <button id="radioReturn">Nadaj rozkaz zawrotu przez radio</button>
      <button id="forceShootDown">Odstrzel gdy nie słucha</button>
    </div>`;

  const scoutSelect = ui.radarActions.querySelector("#scoutSelect");
  scoutSelect.onchange = (e) => { state.selectedScoutAircraftId = e.target.value || null; };
  ui.radarActions.querySelector("#sendScout").onclick = () => sendIntercept(selected.id);
  ui.radarActions.querySelector("#shootByAircraft").onclick = () => dogfightAttack(selected.id);
  ui.radarActions.querySelector("#radioReturn").onclick = () => commandReturn(selected.id);
  const forceBtn = ui.radarActions.querySelector("#forceShootDown");
  forceBtn.disabled = !canRadioBack;
  forceBtn.onclick = () => forceShootDownMission(selected.id);
};

const renderEnemyCities = () => {
  ui.enemyCityList.innerHTML = "";
  state.enemyCities.forEach((city) => {
    const btn = document.createElement("button"); btn.className = `enemy-city ${city.id === state.selectedEnemyCityId ? "active" : ""}`; btn.textContent = `${city.name} (${city.status}) | Obrona: ${Math.floor(city.defense)}`;
    btn.disabled = city.status !== "aktywny"; btn.onclick = () => { state.selectedEnemyCityId = city.id; renderEnemyCities(); };
    ui.enemyCityList.appendChild(btn);
  });
  ui.attackCooldown.textContent = state.attackCooldown > 0 ? `${state.attackCooldown}s` : "gotowy";
  ui.attackCity.disabled = state.attackCooldown > 0 || !state.selectedEnemyCityId;
};

const renderPatrols = () => {
  ui.patrolList.innerHTML = state.patrols.map((p) => `<div>${p.unit} patroluje: ${p.city}</div>`).join("") || "Brak aktywnych patroli.";
};

const renderMinimap = () => {
  ui.minimap.innerHTML = "";
  state.cities.forEach((city, i) => {
    const pin = document.createElement("span"); pin.className = "minimap-pin city"; pin.style.left = `${15 + (i % 4) * 22}%`; pin.style.top = `${18 + Math.floor(i / 4) * 26}%`; pin.title = city.name; ui.minimap.appendChild(pin);
  });
  state.enemiesDetected.forEach((e) => {
    const pin = document.createElement("span"); pin.className = "minimap-pin enemy"; pin.style.left = `${e.x}%`; pin.style.top = `${e.y}%`; pin.title = e.label; ui.minimap.appendChild(pin);
  });
  state.missions.forEach((m) => {
    const enemy = state.enemiesDetected.find((e) => e.id === m.targetId);
    if (!enemy) return;
    const pin = document.createElement("span"); pin.className = "minimap-pin mission"; pin.style.left = `${enemy.x - 4}%`; pin.style.top = `${enemy.y - 4}%`; pin.title = `Misja: ${m.unitName}`; ui.minimap.appendChild(pin);
  });
};

const renderVehicleList = () => {
  const city = getActiveCity(); if (!city) return;
  const entries = [];
  city.units.aircraft.forEach((u) => entries.push({ type: "✈️", unit: u }));
  city.units.tanks.forEach((u) => entries.push({ type: "🛡️", unit: u }));
  city.units.ships.forEach((u) => entries.push({ type: "🚢", unit: u }));
  ui.vehicleList.innerHTML = entries.map(({ type, unit }) => `<div class="vehicle-entry"><button data-aircraft-id="${unit.id}" ${type !== "✈️" ? "disabled" : ""}>${type} ${unit.name}</button> <small>[${unit.status}]</small></div>`).join("") || "Brak pojazdów.";
  ui.vehicleList.querySelectorAll("button[data-aircraft-id]").forEach((btn) => {
    btn.onclick = () => { state.selectedAircraftId = btn.dataset.aircraftId; renderAircraftPanel(); };
  });
};

const renderAircraftPanel = () => {
  const city = getActiveCity(); if (!city) return;
  const aircraft = city.units.aircraft.find((a) => a.id === state.selectedAircraftId);
  if (!aircraft) { ui.aircraftPanel.textContent = "Kliknij samolot z listy, aby zarządzać uzbrojeniem i ulepszeniami."; return; }
  const missiles = Object.entries(aircraft.loadout || {}).map(([id, val]) => `${missileTypes.find((m) => m.id === id)?.name}: ${val}`).join("<br>") || "Brak";
  ui.aircraftPanel.innerHTML = `
    <div><strong>${aircraft.name}</strong></div>
    <div>Status: ${aircraft.status}</div>
    <div>Ulepszenia: Silnik +${aircraft.upgrades.engine || 0}, Radar +${aircraft.upgrades.radar || 0}, Pancerz +${aircraft.upgrades.armor || 0}</div>
    <div>Załadowane rakiety:<br>${missiles}</div>
    <div class="city-actions">
      <button id="loadA2A">Załaduj pow.-pow.</button>
      <button id="loadA2G">Załaduj pow.-ziemia</button>
      <button id="loadA2S">Załaduj pow.-woda</button>
      <button id="upgradeAircraft">Ulepsz samolot (500 zł)</button>
    </div>`;
  ui.aircraftPanel.querySelector("#loadA2A").onclick = () => loadMissileOnAircraft(aircraft, "a2a");
  ui.aircraftPanel.querySelector("#loadA2G").onclick = () => loadMissileOnAircraft(aircraft, "a2g");
  ui.aircraftPanel.querySelector("#loadA2S").onclick = () => loadMissileOnAircraft(aircraft, "a2s");
  ui.aircraftPanel.querySelector("#upgradeAircraft").onclick = () => upgradeAircraft(aircraft);
};

const renderStatus = () => {
  const lost = state.cities.filter((c) => c.lost).length;
  ui.gameStatus.textContent = lost >= state.cities.length ? "Przegrana" : lost ? "Niebezpieczeństwo" : "Stabilny";
  ui.gameStatus.classList.toggle("danger", lost > 0);
};

const render = () => { renderCities(); renderCityStatus(); renderShops(); renderResources(); renderMap(); renderRadar(); renderRadarActions(); renderPatrols(); renderMinimap(); renderEnemyCities(); renderVehicleList(); renderAircraftPanel(); renderStatus(); };

const purchaseBuilding = (building) => {
  const city = getActiveCity(); if (!city) return;
  if (state.budget < building.cost) return logEvent("Brak środków na budynek.");
  state.budget -= building.cost;
  if (building.id === "radar") city.buildings.radar += 1;
  else if (building.id === "hangar") city.buildings.hangar += 1;
  else city.buildings[building.id] = true;
  logEvent(`W ${city.name} zbudowano: ${building.name}.`); render();
};

const purchaseUnit = (type, unit) => {
  const city = getActiveCity(); if (!city) return;
  if (state.budget < unit.cost) return logEvent("Brak środków na jednostkę.");
  if (type === "aircraft" && (!city.buildings.airport || city.units.aircraft.length >= getHangarCapacity(city))) return logEvent("Brakuje lotniska lub miejsca w hangarach.");
  if (type === "ships" && !city.buildings.port) return logEvent("Potrzebujesz portu wojskowego.");
  if (city.soldiers < 30) return logEvent("Za mało żołnierzy do obsługi nowej jednostki.");
  city.soldiers -= 30; state.budget -= unit.cost;
  city.units[type].push({ ...unit, id: createId(), status: "gotowy", upgrades: { engine: 0, radar: 0, armor: 0 }, loadout: {} });
  logEvent(`Zakupiono ${unit.name} w mieście ${city.name}.`); render();
};

const buyMissile = (id) => {
  const type = missileTypes.find((m) => m.id === id); if (!type) return;
  if (state.budget < type.cost) return logEvent("Brak środków na rakiety.");
  state.budget -= type.cost;
  state.missileInventory[id] = (state.missileInventory[id] || 0) + 1;
  logEvent(`Kupiono rakietę: ${type.name}.`); render();
};

const loadMissileOnAircraft = (aircraft, missileId) => {
  if ((state.missileInventory[missileId] || 0) < 1) return logEvent("Brak tej rakiety w magazynie.");
  const loaded = Object.values(aircraft.loadout || {}).reduce((a, b) => a + b, 0);
  if (loaded >= 4) return logEvent("Samolot ma pełny zasobnik (4 rakiety).");
  state.missileInventory[missileId] -= 1;
  aircraft.loadout[missileId] = (aircraft.loadout[missileId] || 0) + 1;
  logEvent(`Załadowano rakietę ${missileId} do ${aircraft.name}.`); render();
};

const upgradeAircraft = (aircraft) => {
  if (state.budget < 500) return logEvent("Brak środków na ulepszenie samolotu.");
  state.budget -= 500;
  aircraft.attack += 1;
  aircraft.upgrades.engine += 1;
  aircraft.upgrades.radar += 1;
  aircraft.upgrades.armor += 1;
  logEvent(`Ulepszono ${aircraft.name} (atak/radar/silnik/pancerz +1).`); render();
};

const recruitSoldiers = () => {
  const city = getActiveCity(); if (!city) return;
  if (state.budget < 300) return logEvent("Brak środków na rekrutację.");
  state.budget -= 300; city.soldiers += 100; city.morale = Math.max(45, city.morale - 2);
  logEvent(`Zrekrutowano 100 żołnierzy w ${city.name}.`); render();
};

const startPatrol = () => {
  const city = getActiveCity(); if (!city) return;
  const aircraft = city.units.aircraft.find((u) => u.status === "gotowy");
  if (!aircraft) return logEvent("Brak wolnych samolotów do patrolu.");
  aircraft.status = "patrol"; state.patrols.push({ unit: aircraft.name, unitId: aircraft.id, city: city.name });
  logEvent(`Samolot ${aircraft.name} rozpoczął patrol.`); render();
};

const sendIntercept = (enemyId) => {
  const city = getActiveCity(); const enemy = state.enemiesDetected.find((e) => e.id === enemyId);
  if (!city || !enemy) return;
  const aircraft = city.units.aircraft.find((a) => a.id === state.selectedScoutAircraftId && a.status === "gotowy") || city.units.aircraft.find((a) => a.status === "gotowy");
  if (!aircraft) return logEvent("Brak gotowego samolotu zwiadowczego.");
  aircraft.status = "przechwycenie";
  state.missions.push({ id: createId(), type: "intercept", unitId: aircraft.id, unitName: aircraft.name, cityId: city.id, targetId: enemyId, eta: 5, stage: "enroute", obeysRadio: Math.random() > 0.25 });
  enemy.status = "namierzony";
  logEvent(`Wysłano ${aircraft.name} do przechwycenia celu.`); render();
};

const dogfightAttack = (enemyId) => {
  const enemy = state.enemiesDetected.find((e) => e.id === enemyId);
  const mission = state.missions.find((m) => m.targetId === enemyId);
  if (!enemy || !mission) return logEvent("Najpierw wyślij samolot do celu.");
  const city = state.cities.find((c) => c.id === mission.cityId);
  const aircraft = city?.units.aircraft.find((a) => a.id === mission.unitId);
  if (!aircraft) return logEvent("Samolot przechwytujący nie istnieje.");

  const a2a = aircraft.loadout.a2a || 0;
  const bonus = a2a > 0 ? 5 : 0;
  if (a2a > 0) aircraft.loadout.a2a -= 1;
  const success = Math.random() < 0.52 + (aircraft.attack + bonus) / 40;
  if (success) {
    logEvent(`Cel ${enemy.label} zestrzelony samolotem ${aircraft.name}.`);
    state.enemiesDetected = state.enemiesDetected.filter((e) => e.id !== enemyId);
    mission.stage = "return"; mission.eta = 4;
  } else {
    logEvent(`Atak ${aircraft.name} nieudany.`);
  }
  render();
};

const commandReturn = (enemyId) => {
  const mission = state.missions.find((m) => m.targetId === enemyId);
  if (!mission) return logEvent("Brak aktywnej misji dla tego celu.");
  if (mission.stage !== "engage" && mission.stage !== "enroute") return logEvent("Ten samolot już wraca lub zakończył misję.");
  if (mission.obeysRadio) {
    mission.stage = "return"; mission.eta = 3;
    logEvent(`Pilot ${mission.unitName} wykonał rozkaz zawrotu.`);
  } else {
    logEvent(`Pilot ${mission.unitName} NIE wykonał rozkazu. Możesz go odstrzelić.`);
  }
  render();
};

const forceShootDownMission = (enemyId) => {
  const mission = state.missions.find((m) => m.targetId === enemyId);
  if (!mission) return logEvent("Brak misji do odstrzelenia.");
  const city = state.cities.find((c) => c.id === mission.cityId);
  if (city) city.units.aircraft = city.units.aircraft.filter((a) => a.id !== mission.unitId);
  state.missions = state.missions.filter((m) => m.id !== mission.id);
  logEvent(`Awaryjne odstrzelenie własnego samolotu ${mission.unitName}.`);
  render();
};

const updateMissions = () => {
  const keep = [];
  state.missions.forEach((m) => {
    m.eta = Math.max(0, m.eta - 1);
    if (m.eta === 0 && m.stage === "enroute") {
      m.stage = "engage"; logEvent(`Samolot ${m.unitName} osiągnął cel i czeka na decyzję.`); keep.push(m);
    } else if (m.eta === 0 && m.stage === "return") {
      const city = state.cities.find((c) => c.id === m.cityId);
      const aircraft = city?.units.aircraft.find((a) => a.id === m.unitId);
      if (aircraft) aircraft.status = "gotowy";
      logEvent(`Samolot ${m.unitName} wrócił do bazy.`);
    } else keep.push(m);
  });
  state.missions = keep;
};

const attackEnemyCity = () => {
  const city = getActiveCity(); const enemyCity = getSelectedEnemyCity();
  if (!city || !enemyCity) return logEvent("Wybierz cel ofensywy.");
  if (state.attackCooldown > 0) return logEvent("Atak jest na cooldownie.");
  const ready = city.units.aircraft.filter((a) => a.status === "gotowy");
  if (ready.length < 2) return logEvent("Potrzebujesz min. 2 samolotów do ataku.");
  state.attackCooldown = 20;
  const strike = ready.slice(0, 2);
  strike.forEach((u) => (u.status = "atak"));
  const power = strike.reduce((sum, u) => sum + u.attack, 0) + city.soldiers / 80 + (strike.reduce((s, u) => s + (u.loadout.a2g || 0), 0) * 3);
  const defense = enemyCity.defense + Math.floor(Math.random() * 12);
  const success = power >= defense;
  if (success) {
    enemyCity.defense = Math.max(0, enemyCity.defense - power);
    logEvent(`Atak na ${enemyCity.name} zakończony sukcesem.`);
    if (enemyCity.defense <= 0) { enemyCity.status = "zniszczone"; state.budget += 1600; logEvent(`Zdobyto ${enemyCity.name}. Łup: 1600 zł.`); }
  } else logEvent(`Atak na ${enemyCity.name} nieudany.`);
  strike.forEach((u) => (u.status = "gotowy"));
  render();
};

const calculateMaintenance = () => {
  let total = 0;
  state.cities.forEach((city) => {
    city.units.aircraft.forEach((u) => (total += u.maintenance)); city.units.tanks.forEach((u) => (total += u.maintenance)); city.units.ships.forEach((u) => (total += u.maintenance)); total += Math.floor(city.soldiers / 120);
  });
  state.maintenance = total;
};

const tickEconomy = () => {
  let gross = 0;
  state.cities.forEach((city) => {
    if (city.lost) return;
    city.population += Math.floor(45 + city.population * 0.003);
    city.morale = Math.min(100, city.morale + 1);
    gross += city.incomeBase + city.population / 70 + city.morale * 3;
  });
  calculateMaintenance();
  state.taxIncome = gross * TAX_RATE;
  state.budget += state.taxIncome - state.maintenance;
  render();
};

const tryDetect = (city, enemyUnit) => {
  const radarPower = city.buildings.radar + (city.buildings.mobileRadar ? 1 : 0);
  if (city.buildings.omegaRadar) return true;
  if (!enemyUnit.stealth) return Math.random() < Math.min(0.9, 0.35 + radarPower * 0.2);
  return Math.random() < Math.max(0.08, radarPower * 0.08);
};

const enemyAttack = () => {
  const target = randomFrom(state.cities.filter((c) => !c.lost)); if (!target) return;
  const type = randomFrom(["air", "land", "sea", "air", "air"]);
  const enemyUnit = type === "air" ? randomFrom(aircraftTypes) : type === "land" ? randomFrom(tankTypes) : randomFrom(shipTypes);
  if (tryDetect(target, enemyUnit)) state.enemiesDetected.unshift({ id: createId(), label: `${enemyUnit.name} -> ${target.name}`, type, status: "wykryty", x: Math.floor(Math.random() * 80) + 10, y: Math.floor(Math.random() * 80) + 10 });

  const defense = target.soldiers / 80 + target.units.tanks.length + target.units.ships.length + target.units.aircraft.length + (target.buildings.missileSilo ? 4 : 0) + (target.buildings.antiAir ? 2 : 0) + (target.buildings.walls ? 2 : 0);
  const attack = enemyUnit.attack + Math.floor(Math.random() * 5);
  if (defense >= attack) { logEvent(`Atak ${type} na ${target.name} odparty (${enemyUnit.name}).`); target.morale = Math.max(50, target.morale - 3); }
  else {
    target.status = "pod ostrzałem"; target.morale = Math.max(0, target.morale - 14); target.population = Math.max(0, target.population - Math.floor(80 + Math.random() * 140));
    logEvent(`Miasto ${target.name} trafione przez ${enemyUnit.name}.`);
    if (target.morale <= 10) { target.lost = true; target.status = "utracone"; logEvent(`Miasto ${target.name} zostało utracone.`); }
  }
  state.enemiesDetected = state.enemiesDetected.slice(0, 12);
  render();
};

const addCity = () => { const city = createCity(`Miasto ${state.cities.length + 1}`); state.cities.push(city); if (!state.activeCityId) state.activeCityId = city.id; logEvent(`Założono nowe miasto: ${city.name}.`); render(); };

const setupControls = () => {
  ui.addCity.onclick = addCity; ui.recruitSoldiers.onclick = recruitSoldiers; ui.sendPatrol.onclick = startPatrol; ui.attackCity.onclick = attackEnemyCity;
  ui.saveProfile.onclick = () => { const name = ui.profileName.value.trim(); if (!name) return logEvent("Podaj nazwę profilu."); localStorage.setItem(`${PROFILE_KEY}-${name}`, JSON.stringify(state)); logEvent("Postęp zapisany."); };
  ui.loadProfile.onclick = () => {
    const name = ui.profileName.value.trim(); if (!name) return logEvent("Podaj nazwę profilu.");
    const saved = localStorage.getItem(`${PROFILE_KEY}-${name}`); if (!saved) return logEvent("Brak zapisanego profilu.");
    Object.assign(state, JSON.parse(saved)); state.selectedEnemyId = null; state.selectedEnemyCityId = null;
    logEvent("Profil wczytany."); render();
  };
};

const init = () => {
  state.cities = [createCity("Neo-Warszawa", true)];
  state.enemyCities = [createEnemyCity("Sektor Północny"), createEnemyCity("Twierdza Omega"), createEnemyCity("Port Cienia")];
  state.activeCityId = state.cities[0].id;
  logEvent("Start kampanii: budżet 10 000 zł, podatki 40%, rozwój populacji i taktyczna mini-mapa.");
  setupControls(); render();
  setInterval(() => { updateMissions(); if (state.attackCooldown > 0) state.attackCooldown -= 1; render(); }, 1000);
  setInterval(tickEconomy, 5000);
  setInterval(enemyAttack, 14000);
};

init();
