const PROFILE_KEY = "imperium-frontowe-profile";
const TAX_RATE = 0.4;

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

const state = {
  budget: 10000,
  maintenance: 0,
  taxIncome: 0,
  cities: [],
  activeCityId: null,
  patrols: [],
  events: [],
  enemiesDetected: [],
  missions: [],
  selectedEnemyId: null,
  selectedEnemyCityId: null,
  enemyCities: [],
  attackCooldown: 0,
  alliances: 0
};

const ui = {
  cityList: document.getElementById("cityList"),
  cityStatus: document.getElementById("cityStatus"),
  buildingShop: document.getElementById("buildingShop"),
  unitShop: document.getElementById("unitShop"),
  budget: document.getElementById("budget"),
  maintenance: document.getElementById("maintenance"),
  taxIncome: document.getElementById("taxIncome"),
  populationTotal: document.getElementById("populationTotal"),
  gameStatus: document.getElementById("gameStatus"),
  map: document.getElementById("map"),
  minimap: document.getElementById("minimap"),
  eventLog: document.getElementById("eventLog"),
  radarLog: document.getElementById("radarLog"),
  radarActions: document.getElementById("radarActions"),
  radarDots: document.getElementById("radarDots"),
  patrolList: document.getElementById("patrolList"),
  addCity: document.getElementById("addCity"),
  recruitSoldiers: document.getElementById("recruitSoldiers"),
  profileName: document.getElementById("profileName"),
  saveProfile: document.getElementById("saveProfile"),
  loadProfile: document.getElementById("loadProfile"),
  enemyCityList: document.getElementById("enemyCityList"),
  attackCooldown: document.getElementById("attackCooldown"),
  attackCity: document.getElementById("attackCity"),
  sendPatrol: document.getElementById("sendPatrol")
};

const randomFrom = (list) => list[Math.floor(Math.random() * list.length)];

const createCity = (name, starter = false) => ({
  id: crypto.randomUUID(),
  name,
  population: 12000 + Math.floor(Math.random() * 6000),
  morale: 85,
  incomeBase: 460,
  soldiers: starter ? 220 : 80,
  buildings: {
    airport: starter,
    hangar: starter ? 2 : 1,
    port: starter,
    radar: 1,
    mobileRadar: false,
    omegaRadar: false,
    missileSilo: false,
    antiAir: false,
    walls: false
  },
  units: { aircraft: [], tanks: [], ships: [] },
  status: "bezpieczne",
  lost: false
});

const createEnemyCity = (name) => ({ id: crypto.randomUUID(), name, defense: 120, status: "aktywny" });
const getActiveCity = () => state.cities.find((city) => city.id === state.activeCityId);
const getSelectedEnemy = () => state.enemiesDetected.find((enemy) => enemy.id === state.selectedEnemyId);
const getSelectedEnemyCity = () => state.enemyCities.find((city) => city.id === state.selectedEnemyCityId);
const getReadyAircraft = (city) => city.units.aircraft.filter((unit) => unit.status === "gotowy");

const logEvent = (message) => {
  const timestamp = new Date().toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  state.events.unshift(`[${timestamp}] ${message}`);
  state.events = state.events.slice(0, 15);
  renderLog();
};

const getCityIncome = (city) => Math.floor(city.incomeBase + city.population / 70 + city.morale * 3);
const getHangarCapacity = (city) => city.buildings.hangar * 4;
const getTotalPopulation = () => state.cities.reduce((sum, city) => sum + (city.lost ? 0 : city.population), 0);

const renderCities = () => {
  ui.cityList.innerHTML = "";
  state.cities.forEach((city) => {
    const button = document.createElement("button");
    button.className = `city-button ${city.id === state.activeCityId ? "active" : ""}`;
    button.textContent = city.name + (city.lost ? " (utracone)" : "");
    button.disabled = city.lost;
    button.addEventListener("click", () => {
      state.activeCityId = city.id;
      render();
    });
    ui.cityList.appendChild(button);
  });
};

const renderCityStatus = () => {
  const city = getActiveCity();
  if (!city) return;
  ui.cityStatus.innerHTML = `
    <div><strong>${city.name}</strong></div>
    <div>Populacja: ${city.population}</div>
    <div>Morale: ${city.morale}%</div>
    <div>Żołnierze: ${city.soldiers}</div>
    <div>Podatek netto: ${Math.floor(getCityIncome(city) * TAX_RATE)} zł / tura</div>
    <div>Hangary: ${city.units.aircraft.length}/${getHangarCapacity(city)}</div>
    <div>Radar: poziom ${city.buildings.radar}${city.buildings.omegaRadar ? " + OMEGA" : ""}</div>
    <div class="city-units"><span>✈️ ${city.units.aircraft.length}</span><span>🛡️ ${city.units.tanks.length}</span><span>🚢 ${city.units.ships.length}</span></div>
  `;
};

const renderShops = () => {
  const city = getActiveCity();
  if (!city) return;
  ui.buildingShop.innerHTML = "";
  buildingCatalog.forEach((building) => {
    const card = document.createElement("div");
    card.className = "shop-card";
    const button = document.createElement("button");
    button.textContent = `${building.name} (${building.cost} zł)`;
    button.disabled = ["airport", "port", "mobileRadar", "omegaRadar", "missileSilo", "antiAir", "walls"].includes(building.id) && !!city.buildings[building.id];
    button.addEventListener("click", () => purchaseBuilding(building));
    card.innerHTML = `<strong>${building.name}</strong><p>${building.description}</p>`;
    card.appendChild(button);
    ui.buildingShop.appendChild(card);
  });

  ui.unitShop.innerHTML = "";
  const addSection = (title) => {
    const wrapper = document.createElement("div");
    wrapper.className = "shop-section";
    wrapper.innerHTML = `<h4>${title}</h4>`;
    ui.unitShop.appendChild(wrapper);
    return wrapper;
  };
  const aircraftSection = addSection("Samoloty (15 typów)");
  aircraftTypes.forEach((unit) => addUnitButton(aircraftSection, "aircraft", unit));
  const tankSection = addSection("Czołgi (10 typów)");
  tankTypes.forEach((unit) => addUnitButton(tankSection, "tanks", unit));
  const shipSection = addSection("Flota (10 typów)");
  shipTypes.forEach((unit) => addUnitButton(shipSection, "ships", unit));
};

const addUnitButton = (container, type, unit) => {
  const card = document.createElement("div");
  card.className = "shop-card";
  const button = document.createElement("button");
  button.textContent = `Kup (${unit.cost} zł)`;
  button.addEventListener("click", () => purchaseUnit(type, unit));
  card.innerHTML = `<strong>${unit.name}</strong><p>Atak: ${unit.attack} | Utrzymanie: ${unit.maintenance}</p>`;
  card.appendChild(button);
  container.appendChild(card);
};

const renderResources = () => {
  ui.budget.textContent = state.budget.toFixed(0);
  ui.maintenance.textContent = state.maintenance.toFixed(0);
  ui.taxIncome.textContent = state.taxIncome.toFixed(0);
  ui.populationTotal.textContent = getTotalPopulation().toFixed(0);
};

const renderMap = () => {
  ui.map.innerHTML = "";
  state.cities.forEach((city) => {
    const card = document.createElement("div");
    card.className = `city-card ${city.id === state.activeCityId ? "active" : ""}`;
    card.innerHTML = `<h4>${city.name}</h4><p>${city.status}</p><p>Żołnierze: ${city.soldiers}</p><div class="city-assets"><span>✈️ ${city.units.aircraft.length}</span><span>🛡️ ${city.units.tanks.length}</span><span>🚢 ${city.units.ships.length}</span></div>`;
    ui.map.appendChild(card);
  });
};

const renderLog = () => {
  ui.eventLog.innerHTML = state.events.map((event) => `<div>${event}</div>`).join("");
};

const renderRadar = () => {
  ui.radarLog.innerHTML = "";
  if (state.enemiesDetected.length === 0) ui.radarLog.textContent = "Brak wykryć.";
  state.enemiesDetected.slice(0, 7).forEach((enemy) => {
    const button = document.createElement("button");
    button.className = `radar-entry ${enemy.id === state.selectedEnemyId ? "active" : ""}`;
    button.textContent = enemy.label;
    button.addEventListener("click", () => {
      state.selectedEnemyId = enemy.id;
      renderRadarActions();
      renderRadar();
    });
    ui.radarLog.appendChild(button);
  });
  ui.radarDots.innerHTML = "";
  state.enemiesDetected.slice(0, 10).forEach((enemy) => {
    const dot = document.createElement("span");
    dot.className = `radar-dot ${enemy.type}`;
    dot.style.left = `${enemy.x}%`;
    dot.style.top = `${enemy.y}%`;
    ui.radarDots.appendChild(dot);
  });
};

const renderRadarActions = () => {
  const selected = getSelectedEnemy();
  if (!selected) {
    ui.radarActions.innerHTML = "Wybierz cel na radarze.";
    return;
  }
  const city = getActiveCity();
  const hasAircraft = city ? getReadyAircraft(city).length > 0 : false;
  const interceptReady = state.missions.some((m) => m.type === "intercept" && m.targetId === selected.id && m.stage === "engage");
  const canShootRocket = city?.buildings.missileSilo;
  ui.radarActions.innerHTML = `<div><strong>Cel:</strong> ${selected.label}</div><div>Status: ${selected.status}</div><div class="radar-actions"><button id="sendIntercept">Wyślij samolot zwiadowczy</button><button id="fireMissiles">Przechwyć rakietą</button></div>`;
  const sendButton = ui.radarActions.querySelector("#sendIntercept");
  const fireButton = ui.radarActions.querySelector("#fireMissiles");
  sendButton.disabled = !hasAircraft;
  fireButton.disabled = !interceptReady || !canShootRocket;
  sendButton.addEventListener("click", () => sendIntercept(selected.id));
  fireButton.addEventListener("click", () => fireMissiles(selected.id));
};

const renderEnemyCities = () => {
  ui.enemyCityList.innerHTML = "";
  state.enemyCities.forEach((city) => {
    const button = document.createElement("button");
    button.className = `enemy-city ${city.id === state.selectedEnemyCityId ? "active" : ""}`;
    button.textContent = `${city.name} (${city.status}) | Obrona: ${city.defense}`;
    button.disabled = city.status !== "aktywny";
    button.addEventListener("click", () => {
      state.selectedEnemyCityId = city.id;
      renderEnemyCities();
    });
    ui.enemyCityList.appendChild(button);
  });
  ui.attackCooldown.textContent = state.attackCooldown > 0 ? `${state.attackCooldown}s` : "gotowy";
  ui.attackCity.disabled = state.attackCooldown > 0 || !state.selectedEnemyCityId;
};

const renderPatrols = () => {
  ui.patrolList.innerHTML = state.patrols.map((p) => `<div>${p.unit} patroluje: ${p.city}</div>`).join("") || "Brak aktywnych patroli.";
};

const renderMinimap = () => {
  ui.minimap.innerHTML = "";
  state.cities.forEach((city, index) => {
    const pin = document.createElement("span");
    pin.className = "minimap-pin";
    pin.style.left = `${18 + (index % 3) * 30}%`;
    pin.style.top = `${20 + Math.floor(index / 3) * 32}%`;
    pin.title = city.name;
    ui.minimap.appendChild(pin);
  });
  state.enemiesDetected.slice(0, 6).forEach((enemy) => {
    const pin = document.createElement("span");
    pin.className = "minimap-pin enemy";
    pin.style.left = `${enemy.x}%`;
    pin.style.top = `${enemy.y}%`;
    pin.title = `Wróg: ${enemy.type}`;
    ui.minimap.appendChild(pin);
  });
};

const renderStatus = () => {
  const lostCities = state.cities.filter((city) => city.lost).length;
  ui.gameStatus.textContent = lostCities >= state.cities.length ? "Przegrana" : lostCities ? "Niebezpieczeństwo" : "Stabilny";
  ui.gameStatus.classList.toggle("danger", lostCities > 0);
};

const render = () => {
  renderCities(); renderCityStatus(); renderShops(); renderResources(); renderMap(); renderRadar(); renderRadarActions(); renderPatrols(); renderMinimap(); renderEnemyCities(); renderStatus();
};

const purchaseBuilding = (building) => {
  const city = getActiveCity();
  if (!city || state.budget < building.cost) return logEvent("Brak środków na budynek.");
  state.budget -= building.cost;
  if (building.id === "radar") city.buildings.radar += 1;
  else if (building.id === "hangar") city.buildings.hangar += 1;
  else city.buildings[building.id] = true;
  logEvent(`W ${city.name} zbudowano: ${building.name}.`);
  render();
};

const purchaseUnit = (type, unit) => {
  const city = getActiveCity();
  if (!city || state.budget < unit.cost) return logEvent("Brak środków na jednostkę.");
  if (type === "aircraft") {
    if (!city.buildings.airport || city.units.aircraft.length >= getHangarCapacity(city)) return logEvent("Brakuje lotniska lub miejsca w hangarach.");
  }
  if (type === "ships" && !city.buildings.port) return logEvent("Potrzebujesz portu wojskowego.");
  if (city.soldiers < 30) return logEvent("Za mało żołnierzy do obsługi nowej jednostki.");
  city.soldiers -= 30;
  state.budget -= unit.cost;
  city.units[type].push({ ...unit, id: crypto.randomUUID(), status: "gotowy" });
  logEvent(`Zakupiono ${unit.name} w mieście ${city.name}.`);
  render();
};

const recruitSoldiers = () => {
  const city = getActiveCity();
  if (!city) return;
  const cost = 300;
  if (state.budget < cost) return logEvent("Brak środków na rekrutację.");
  state.budget -= cost;
  city.soldiers += 100;
  city.morale = Math.max(45, city.morale - 2);
  logEvent(`Zrekrutowano 100 żołnierzy w ${city.name}.`);
  render();
};

const addCity = () => {
  const city = createCity(`Miasto ${state.cities.length + 1}`);
  state.cities.push(city);
  if (!state.activeCityId) state.activeCityId = city.id;
  logEvent(`Założono nowe miasto: ${city.name}.`);
  render();
};

const startPatrol = () => {
  const city = getActiveCity();
  if (!city) return;
  const aircraft = city.units.aircraft.find((unit) => unit.status === "gotowy");
  if (!aircraft) return logEvent("Brak wolnych samolotów do patrolu.");
  aircraft.status = "patrol";
  state.patrols.push({ unit: aircraft.name, unitId: aircraft.id, city: city.name });
  logEvent(`Samolot ${aircraft.name} rozpoczął patrol.`);
  render();
};

const sendIntercept = (enemyId) => {
  const city = getActiveCity();
  const enemy = state.enemiesDetected.find((item) => item.id === enemyId);
  if (!city || !enemy) return;
  const readyAircraft = getReadyAircraft(city);
  if (readyAircraft.length === 0) return logEvent("Brak wolnych samolotów do przechwycenia.");
  const aircraft = readyAircraft[0];
  aircraft.status = "przechwycenie";
  state.missions.push({ id: crypto.randomUUID(), type: "intercept", unitId: aircraft.id, unitName: aircraft.name, cityId: city.id, targetId: enemyId, eta: 5, stage: "enroute" });
  enemy.status = "namierzony";
  logEvent(`Wysłano ${aircraft.name} do przechwycenia.`);
  render();
};

const fireMissiles = (enemyId) => {
  const city = getActiveCity();
  const enemy = state.enemiesDetected.find((item) => item.id === enemyId);
  const mission = state.missions.find((m) => m.type === "intercept" && m.targetId === enemyId && m.stage === "engage");
  if (!city || !enemy || !mission) return logEvent("Najpierw namierz cel samolotem.");
  if (!city.buildings.missileSilo) return logEvent("Potrzebujesz silosu rakietowego.");
  const success = Math.random() < (city.buildings.omegaRadar ? 0.85 : 0.68);
  if (success) {
    logEvent(`Cel ${enemy.label} został zestrzelony.`);
    state.enemiesDetected = state.enemiesDetected.filter((item) => item.id !== enemyId);
    mission.stage = "return";
    mission.eta = 4;
  } else {
    logEvent(`Przechwycenie nieudane. ${mission.unitName} utracony.`);
    const homeCity = state.cities.find((item) => item.id === mission.cityId);
    if (homeCity) homeCity.units.aircraft = homeCity.units.aircraft.filter((a) => a.id !== mission.unitId);
    state.missions = state.missions.filter((item) => item.id !== mission.id);
  }
  render();
};

const updateMissions = () => {
  const remaining = [];
  state.missions.forEach((mission) => {
    mission.eta = Math.max(0, mission.eta - 1);
    if (mission.eta === 0 && mission.stage === "enroute") {
      mission.stage = "engage";
      logEvent(`Samolot ${mission.unitName} czeka na rozkaz ogniowy.`);
      remaining.push(mission);
    } else if (mission.eta === 0 && mission.stage === "return") {
      const city = state.cities.find((item) => item.id === mission.cityId);
      const aircraft = city?.units.aircraft.find((unit) => unit.id === mission.unitId);
      if (aircraft) aircraft.status = "gotowy";
      logEvent(`Samolot ${mission.unitName} wrócił do bazy.`);
    } else {
      remaining.push(mission);
    }
  });
  state.missions = remaining;
};

const attackEnemyCity = () => {
  const city = getActiveCity();
  const enemyCity = getSelectedEnemyCity();
  if (!city || !enemyCity) return logEvent("Wybierz cel ofensywy.");
  if (state.attackCooldown > 0) return logEvent("Atak jest na cooldownie.");
  const readyAircraft = getReadyAircraft(city);
  if (readyAircraft.length < 2) return logEvent("Potrzebujesz min. 2 samolotów do ataku.");
  const strikeGroup = readyAircraft.slice(0, 2);
  strikeGroup.forEach((unit) => (unit.status = "atak"));
  state.attackCooldown = 20;
  const attackPower = strikeGroup.reduce((sum, unit) => sum + unit.attack, 0) + city.soldiers / 80;
  const defensePower = enemyCity.defense + Math.floor(Math.random() * 12);
  const success = attackPower >= defensePower;
  if (success) {
    enemyCity.defense = Math.max(0, enemyCity.defense - attackPower);
    logEvent(`Atak na ${enemyCity.name} zakończony sukcesem.`);
    if (enemyCity.defense <= 0) {
      enemyCity.status = "zniszczone";
      state.budget += 1600;
      logEvent(`Zdobyto ${enemyCity.name}. Łup: 1600 zł.`);
    }
  } else {
    logEvent(`Atak na ${enemyCity.name} nieudany.`);
  }
  strikeGroup.forEach((unit) => (unit.status = "gotowy"));
  render();
};

const calculateMaintenance = () => {
  let total = 0;
  state.cities.forEach((city) => {
    city.units.aircraft.forEach((unit) => (total += unit.maintenance));
    city.units.tanks.forEach((unit) => (total += unit.maintenance));
    city.units.ships.forEach((unit) => (total += unit.maintenance));
    total += Math.floor(city.soldiers / 120);
  });
  state.maintenance = total;
};

const tickEconomy = () => {
  let grossTaxes = 0;
  state.cities.forEach((city) => {
    if (city.lost) return;
    city.population += Math.floor(45 + city.population * 0.003);
    city.morale = Math.min(100, city.morale + 1);
    grossTaxes += getCityIncome(city);
  });
  calculateMaintenance();
  state.taxIncome = grossTaxes * TAX_RATE;
  state.budget += state.taxIncome - state.maintenance;
  render();
};

const tryDetect = (targetCity, enemyUnit, attackType) => {
  const radarPower = targetCity.buildings.radar + (targetCity.buildings.mobileRadar ? 1 : 0);
  if (targetCity.buildings.omegaRadar) return true;
  if (!enemyUnit.stealth) return Math.random() < Math.min(0.9, 0.35 + radarPower * 0.2);
  return Math.random() < Math.max(0.08, radarPower * 0.08);
};

const enemyAttack = () => {
  const targetCity = randomFrom(state.cities.filter((city) => !city.lost));
  if (!targetCity) return;
  const attackType = randomFrom(["air", "land", "sea", "air", "air"]);
  const enemyUnit = attackType === "air" ? randomFrom(aircraftTypes) : attackType === "land" ? randomFrom(tankTypes) : randomFrom(shipTypes);

  if (tryDetect(targetCity, enemyUnit, attackType)) {
    state.enemiesDetected.unshift({ id: crypto.randomUUID(), label: `${enemyUnit.name} -> ${targetCity.name}`, type: attackType, status: "wykryty", x: Math.floor(Math.random() * 80) + 10, y: Math.floor(Math.random() * 80) + 10 });
  }

  const defensePower =
    targetCity.soldiers / 80 +
    targetCity.units.tanks.length +
    targetCity.units.ships.length +
    targetCity.units.aircraft.length +
    (targetCity.buildings.missileSilo ? 4 : 0) +
    (targetCity.buildings.antiAir ? 2 : 0) +
    (targetCity.buildings.walls ? 2 : 0);

  const attackPower = enemyUnit.attack + Math.floor(Math.random() * 5);
  if (defensePower >= attackPower) {
    logEvent(`Atak ${attackType} na ${targetCity.name} został odparty (${enemyUnit.name}).`);
    targetCity.morale = Math.max(50, targetCity.morale - 3);
  } else {
    targetCity.status = "pod ostrzałem";
    targetCity.morale = Math.max(0, targetCity.morale - 14);
    targetCity.population = Math.max(0, targetCity.population - Math.floor(80 + Math.random() * 140));
    logEvent(`Miasto ${targetCity.name} zostało trafione przez ${enemyUnit.name}.`);
    if (targetCity.morale <= 10) {
      targetCity.lost = true;
      targetCity.status = "utracone";
      logEvent(`Miasto ${targetCity.name} zostało utracone.`);
    }
  }
  state.enemiesDetected = state.enemiesDetected.slice(0, 10);
  render();
};

const setupControls = () => {
  ui.addCity.addEventListener("click", addCity);
  ui.recruitSoldiers.addEventListener("click", recruitSoldiers);
  ui.sendPatrol.addEventListener("click", startPatrol);
  ui.attackCity.addEventListener("click", attackEnemyCity);

  ui.saveProfile.addEventListener("click", () => {
    const name = ui.profileName.value.trim();
    if (!name) return logEvent("Podaj nazwę profilu.");
    localStorage.setItem(`${PROFILE_KEY}-${name}`, JSON.stringify(state));
    logEvent("Postęp zapisany.");
  });

  ui.loadProfile.addEventListener("click", () => {
    const name = ui.profileName.value.trim();
    if (!name) return logEvent("Podaj nazwę profilu.");
    const saved = localStorage.getItem(`${PROFILE_KEY}-${name}`);
    if (!saved) return logEvent("Brak zapisanego profilu.");
    Object.assign(state, JSON.parse(saved));
    state.selectedEnemyId = null;
    state.selectedEnemyCityId = null;
    logEvent("Profil wczytany.");
    render();
  });
};

const init = () => {
  state.cities = [createCity("Neo-Warszawa", true)];
  state.enemyCities = [createEnemyCity("Sektor Północny"), createEnemyCity("Twierdza Omega"), createEnemyCity("Port Cienia")];
  state.activeCityId = state.cities[0].id;
  logEvent("Start kampanii: budżet 10 000 zł, podatki 40% i rosnąca populacja.");
  setupControls();
  render();

  setInterval(() => {
    updateMissions();
    if (state.attackCooldown > 0) state.attackCooldown -= 1;
    renderEnemyCities();
    renderRadarActions();
  }, 1000);
  setInterval(tickEconomy, 5000);
  setInterval(enemyAttack, 14000);
};

init();
