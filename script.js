const PROFILE_KEY = "imperium-frontowe-profile";

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
  { name: "MQ-9 Reaper", cost: 700, maintenance: 8, attack: 6, stealth: false },
  { name: "KC-46 Pegasus", cost: 650, maintenance: 7, attack: 3, stealth: false },
  { name: "E-3 Sentry", cost: 720, maintenance: 8, attack: 4, stealth: false },
  { name: "P-8 Poseidon", cost: 880, maintenance: 9, attack: 6, stealth: false },
  { name: "F-22 Raptor", cost: 1900, maintenance: 24, attack: 14, stealth: true },
  { name: "Tempest", cost: 2000, maintenance: 25, attack: 15, stealth: true }
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
  { name: "Niszczyciel rakietowy", cost: 1200, maintenance: 18, attack: 11 },
  { name: "Fregata stealth", cost: 1000, maintenance: 16, attack: 9 },
  { name: "Korweta patrolowa", cost: 800, maintenance: 12, attack: 7 },
  { name: "Okręt desantowy", cost: 900, maintenance: 14, attack: 8 },
  { name: "Lotniskowiec", cost: 1800, maintenance: 24, attack: 14 },
  { name: "Okręt podwodny typu Virginia", cost: 1500, maintenance: 20, attack: 13 },
  { name: "Okręt podwodny typu Astute", cost: 1400, maintenance: 19, attack: 12 },
  { name: "Okręt podwodny Scorpene", cost: 1200, maintenance: 17, attack: 10 },
  { name: "Szybki kuter rakietowy", cost: 700, maintenance: 10, attack: 6 },
  { name: "Zwiadowczy okręt SIGINT", cost: 650, maintenance: 9, attack: 4 }
];

const buildingCatalog = [
  { id: "airport", name: "Lotnisko wojskowe", cost: 1200, description: "Pozwala na zakup samolotów." },
  { id: "hangar", name: "Hangar", cost: 800, description: "Wymagany dla utrzymania floty powietrznej." },
  { id: "port", name: "Port wojskowy", cost: 1100, description: "Wymagany dla statków i okrętów." },
  { id: "radar", name: "Radar boczny (poziom +1)", cost: 600, description: "Zwiększa wykrywanie celów (F-35 po poziomie 2)." },
  { id: "walls", name: "Mury obronne", cost: 500, description: "Zwiększa odporność miasta." },
  { id: "missiles", name: "Bateria rakiet", cost: 900, description: "Silna obrona przeciwko atakom z powietrza." },
  { id: "antiAir", name: "System przeciwlotniczy", cost: 700, description: "Zwiększa szansę zestrzelenia wrogich samolotów." }
];

const state = {
  budget: 20000,
  maintenance: 0,
  cities: [],
  activeCityId: null,
  patrols: [],
  events: [],
  enemiesDetected: [],
  missions: [],
  selectedEnemyId: null,
  selectedEnemyCityId: null,
  enemyCities: [],
  attackCooldown: 0
};

const ui = {
  cityList: document.getElementById("cityList"),
  cityStatus: document.getElementById("cityStatus"),
  buildingShop: document.getElementById("buildingShop"),
  unitShop: document.getElementById("unitShop"),
  budget: document.getElementById("budget"),
  maintenance: document.getElementById("maintenance"),
  gameStatus: document.getElementById("gameStatus"),
  map: document.getElementById("map"),
  minimap: document.getElementById("minimap"),
  eventLog: document.getElementById("eventLog"),
  radarLog: document.getElementById("radarLog"),
  radarActions: document.getElementById("radarActions"),
  radarDots: document.getElementById("radarDots"),
  patrolList: document.getElementById("patrolList"),
  addCity: document.getElementById("addCity"),
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
  population: 12000 + Math.floor(Math.random() * 7000),
  morale: 85,
  income: 450,
  buildings: {
    airport: starter,
    hangar: starter,
    port: starter,
    radar: 1,
    walls: false,
    missiles: false,
    antiAir: false
  },
  units: {
    aircraft: [],
    tanks: [],
    ships: []
  },
  status: "bezpieczne",
  lost: false
});

const createEnemyCity = (name) => ({
  id: crypto.randomUUID(),
  name,
  defense: 120,
  status: "aktywny"
});

const getActiveCity = () => state.cities.find((city) => city.id === state.activeCityId);
const getSelectedEnemy = () => state.enemiesDetected.find((enemy) => enemy.id === state.selectedEnemyId);
const getSelectedEnemyCity = () => state.enemyCities.find((city) => city.id === state.selectedEnemyCityId);
const getReadyAircraft = (city) => city.units.aircraft.filter((unit) => unit.status === "gotowy");

const logEvent = (message) => {
  const timestamp = new Date().toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  state.events.unshift(`[${timestamp}] ${message}`);
  state.events = state.events.slice(0, 14);
  renderLog();
};

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
  if (!city) {
    ui.cityStatus.textContent = "Brak aktywnego miasta.";
    return;
  }

  ui.cityStatus.innerHTML = `
    <div><strong>${city.name}</strong></div>
    <div>Populacja: ${city.population}</div>
    <div>Morale: ${city.morale}%</div>
    <div>Status: ${city.status}</div>
    <div>Radar: poziom ${city.buildings.radar}</div>
    <div class="city-units">
      <span>✈️ ${city.units.aircraft.length}</span>
      <span>🛡️ ${city.units.tanks.length}</span>
      <span>🚢 ${city.units.ships.length}</span>
    </div>
    <div class="building-tags">
      ${Object.entries(city.buildings)
        .filter(([key, value]) => value && key !== "radar")
        .map(([key]) => `<span>${key}</span>`)
        .join(" ")}
    </div>
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
    button.textContent = `${building.name} (${building.cost})`;
    button.disabled = building.id !== "radar" && city.buildings[building.id];
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

  const aircraftSection = addSection("Samoloty");
  aircraftTypes.forEach((unit) => addUnitButton(aircraftSection, "aircraft", unit));

  const tankSection = addSection("Czołgi");
  tankTypes.forEach((unit) => addUnitButton(tankSection, "tanks", unit));

  const shipSection = addSection("Statki i okręty");
  shipTypes.forEach((unit) => addUnitButton(shipSection, "ships", unit));
};

const addUnitButton = (container, type, unit) => {
  const card = document.createElement("div");
  card.className = "shop-card";
  const button = document.createElement("button");
  button.textContent = `Kup (${unit.cost})`;
  button.addEventListener("click", () => purchaseUnit(type, unit));
  card.innerHTML = `<strong>${unit.name}</strong>
    <p>Atak: ${unit.attack} | Utrzymanie: ${unit.maintenance}</p>`;
  card.appendChild(button);
  container.appendChild(card);
};

const renderResources = () => {
  ui.budget.textContent = state.budget.toFixed(0);
  ui.maintenance.textContent = state.maintenance.toFixed(0);
};

const renderMap = () => {
  ui.map.innerHTML = "";
  state.cities.forEach((city) => {
    const card = document.createElement("div");
    card.className = `city-card ${city.id === state.activeCityId ? "active" : ""}`;
    card.innerHTML = `
      <h4>${city.name}</h4>
      <p>${city.status}</p>
      <div class="city-assets">
        <span>✈️ ${city.units.aircraft.length}</span>
        <span>🛡️ ${city.units.tanks.length}</span>
        <span>🚢 ${city.units.ships.length}</span>
      </div>
    `;
    ui.map.appendChild(card);
  });
};

const renderLog = () => {
  ui.eventLog.innerHTML = state.events.map((event) => `<div>${event}</div>`).join("");
};

const renderRadar = () => {
  ui.radarLog.innerHTML = "";
  if (state.enemiesDetected.length === 0) {
    ui.radarLog.textContent = "Brak wykryć.";
  }
  state.enemiesDetected.slice(0, 6).forEach((enemy) => {
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
  state.enemiesDetected.slice(0, 8).forEach((enemy) => {
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
  const interceptReady = state.missions.some(
    (mission) => mission.type === "intercept" && mission.targetId === selected.id && mission.stage === "engage"
  );
  ui.radarActions.innerHTML = `
    <div><strong>Cel:</strong> ${selected.label}</div>
    <div>Status: ${selected.status}</div>
    <div class="radar-actions">
      <button id="sendIntercept">Wyślij samolot</button>
      <button id="fireMissiles">Odpal rakiety</button>
    </div>
  `;
  const sendButton = ui.radarActions.querySelector("#sendIntercept");
  const fireButton = ui.radarActions.querySelector("#fireMissiles");
  sendButton.disabled = !hasAircraft;
  fireButton.disabled = !interceptReady;
  sendButton.addEventListener("click", () => sendIntercept(selected.id));
  fireButton.addEventListener("click", () => fireMissiles(selected.id));
};

const renderEnemyCities = () => {
  ui.enemyCityList.innerHTML = "";
  if (state.enemyCities.length === 0) {
    ui.enemyCityList.textContent = "Brak wrogich miast.";
  }
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
  ui.patrolList.innerHTML = state.patrols
    .map((patrol) => `<div>${patrol.unit} patroluje: ${patrol.city}</div>`)
    .join("") || "Brak aktywnych patroli.";
};

const renderMinimap = () => {
  ui.minimap.innerHTML = "";
  state.cities.forEach((city, index) => {
    const pin = document.createElement("span");
    pin.className = "minimap-pin";
    pin.style.left = `${20 + index * 25}%`;
    pin.style.top = `${30 + (index % 2) * 30}%`;
    pin.title = city.name;
    ui.minimap.appendChild(pin);
  });
};

const renderStatus = () => {
  const lostCities = state.cities.filter((city) => city.lost).length;
  if (lostCities >= state.cities.length) {
    ui.gameStatus.textContent = "Przegrana - wszystkie miasta utracone";
    ui.gameStatus.classList.add("danger");
  } else {
    ui.gameStatus.textContent = lostCities ? "Niebezpieczeństwo" : "Stabilny";
    ui.gameStatus.classList.remove("danger");
  }
};

const render = () => {
  renderCities();
  renderCityStatus();
  renderShops();
  renderResources();
  renderMap();
  renderRadar();
  renderRadarActions();
  renderPatrols();
  renderMinimap();
  renderEnemyCities();
  renderStatus();
};

const purchaseBuilding = (building) => {
  const city = getActiveCity();
  if (!city) return;
  if (state.budget < building.cost) {
    logEvent("Brak środków na budynek.");
    return;
  }
  state.budget -= building.cost;
  if (building.id === "radar") {
    city.buildings.radar += 1;
  } else {
    city.buildings[building.id] = true;
  }
  logEvent(`W mieście ${city.name} zbudowano: ${building.name}.`);
  render();
};

const purchaseUnit = (type, unit) => {
  const city = getActiveCity();
  if (!city) return;
  if (state.budget < unit.cost) {
    logEvent("Brak środków na jednostkę.");
    return;
  }
  if (type === "aircraft" && (!city.buildings.airport || !city.buildings.hangar)) {
    logEvent("Potrzebujesz lotniska i hangaru.");
    return;
  }
  if (type === "ships" && !city.buildings.port) {
    logEvent("Potrzebujesz portu wojskowego.");
    return;
  }
  state.budget -= unit.cost;
  city.units[type].push({ ...unit, id: crypto.randomUUID(), status: "gotowy" });
  logEvent(`Zakupiono ${unit.name} w mieście ${city.name}.`);
  render();
};

const addCity = () => {
  const name = `Miasto ${state.cities.length + 1}`;
  const city = createCity(name);
  state.cities.push(city);
  if (!state.activeCityId) state.activeCityId = city.id;
  logEvent(`Założono nowe miasto: ${name}.`);
  render();
};

const startPatrol = () => {
  const city = getActiveCity();
  if (!city) return;
  const aircraft = city.units.aircraft.find((unit) => unit.status === "gotowy");
  if (!aircraft) {
    logEvent("Brak wolnych samolotów do patrolu.");
    return;
  }
  aircraft.status = "patrol";
  state.patrols.push({ unit: aircraft.name, unitId: aircraft.id, city: city.name });
  logEvent(`Samolot ${aircraft.name} rozpoczął patrol z ${city.name}.`);
  render();
};

const sendIntercept = (enemyId) => {
  const city = getActiveCity();
  const enemy = state.enemiesDetected.find((item) => item.id === enemyId);
  if (!city || !enemy) return;
  const readyAircraft = getReadyAircraft(city);
  if (readyAircraft.length === 0) {
    logEvent("Brak wolnych samolotów do przechwycenia.");
    return;
  }
  const aircraft = readyAircraft[0];
  aircraft.status = "przechwycenie";
  state.missions.push({
    id: crypto.randomUUID(),
    type: "intercept",
    unitId: aircraft.id,
    unitName: aircraft.name,
    cityId: city.id,
    targetId: enemyId,
    eta: 6,
    stage: "enroute"
  });
  enemy.status = "namierzony";
  logEvent(`Samolot ${aircraft.name} ruszył na przechwycenie wroga przy ${city.name}.`);
  render();
};

const fireMissiles = (enemyId) => {
  const city = getActiveCity();
  const enemy = state.enemiesDetected.find((item) => item.id === enemyId);
  if (!city || !enemy) return;
  const mission = state.missions.find(
    (item) => item.type === "intercept" && item.targetId === enemyId && item.stage === "engage"
  );
  if (!mission) {
    logEvent("Najpierw wyślij samolot, aby przechwycić cel.");
    return;
  }
  const successChance = city.buildings.missiles ? 0.75 : 0.6;
  const success = Math.random() < successChance;
  if (success) {
    logEvent(`Rakiety zestrzeliły ${enemy.label}.`);
    state.enemiesDetected = state.enemiesDetected.filter((item) => item.id !== enemyId);
    if (state.selectedEnemyId === enemyId) {
      state.selectedEnemyId = null;
    }
    mission.stage = "return";
    mission.eta = 5;
  } else {
    logEvent(`Atak rakietowy nieudany. ${mission.unitName} utracony.`);
    const homeCity = state.cities.find((item) => item.id === mission.cityId);
    if (homeCity) removeAircraft(homeCity, mission.unitId);
    state.missions = state.missions.filter((item) => item.id !== mission.id);
  }
  render();
};

const removeAircraft = (city, unitId) => {
  city.units.aircraft = city.units.aircraft.filter((unit) => unit.id !== unitId);
  state.patrols = state.patrols.filter((patrol) => patrol.unitId !== unitId);
  state.missions = state.missions.filter((mission) => mission.unitId !== unitId);
};

const updateMissions = () => {
  const remaining = [];
  state.missions.forEach((mission) => {
    mission.eta = Math.max(0, mission.eta - 1);
    if (mission.eta === 0) {
      if (mission.stage === "enroute") {
        mission.stage = "engage";
        logEvent(`Samolot ${mission.unitName} dotarł do celu i czeka na rozkaz.`);
        remaining.push(mission);
      } else if (mission.stage === "return") {
        const city = state.cities.find((item) => item.id === mission.cityId);
        const aircraft = city?.units.aircraft.find((unit) => unit.id === mission.unitId);
        if (aircraft) aircraft.status = "gotowy";
        logEvent(`Samolot ${mission.unitName} wrócił do bazy.`);
      } else {
        remaining.push(mission);
      }
    } else {
      remaining.push(mission);
    }
  });
  state.missions = remaining;
};

const attackEnemyCity = () => {
  const city = getActiveCity();
  const enemyCity = getSelectedEnemyCity();
  if (!city || !enemyCity) {
    logEvent("Wybierz cel ofensywy.");
    return;
  }
  if (state.attackCooldown > 0) {
    logEvent("Atak jest na cooldownie.");
    return;
  }
  const readyAircraft = getReadyAircraft(city);
  if (readyAircraft.length < 2) {
    logEvent("Potrzebujesz co najmniej 2 samolotów gotowych do ataku.");
    return;
  }

  const strikeGroup = readyAircraft.slice(0, 2);
  strikeGroup.forEach((unit) => (unit.status = "atak"));
  state.attackCooldown = 20;

  const attackPower = strikeGroup.reduce((sum, unit) => sum + unit.attack, 0) + Math.floor(Math.random() * 10);
  const defensePower = enemyCity.defense + Math.floor(Math.random() * 12);
  const success = attackPower >= defensePower;

  if (success) {
    enemyCity.defense = Math.max(0, enemyCity.defense - attackPower);
    logEvent(`Atak na ${enemyCity.name} zakończony sukcesem.`);
    if (enemyCity.defense <= 0) {
      enemyCity.status = "zniszczone";
      logEvent(`Miasto ${enemyCity.name} zostało zneutralizowane.`);
    }
  } else {
    logEvent(`Atak na ${enemyCity.name} nieudany. Straty w lotnictwie.`);
  }

  strikeGroup.forEach((unit) => {
    const lost = Math.random() < (success ? 0.25 : 0.5);
    if (lost) {
      removeAircraft(city, unit.id);
    } else {
      unit.status = "gotowy";
    }
  });
  render();
};

const calculateMaintenance = () => {
  let total = 0;
  state.cities.forEach((city) => {
    city.units.aircraft.forEach((unit) => (total += unit.maintenance));
    city.units.tanks.forEach((unit) => (total += unit.maintenance));
    city.units.ships.forEach((unit) => (total += unit.maintenance));
  });
  state.maintenance = total;
};

const tickEconomy = () => {
  let income = 0;
  state.cities.forEach((city) => {
    if (!city.lost) income += city.income;
  });
  calculateMaintenance();
  state.budget += income - state.maintenance;
  renderResources();
};

const enemyAttack = () => {
  const targetCity = randomFrom(state.cities.filter((city) => !city.lost));
  if (!targetCity) return;

  const attackType = randomFrom(["air", "land", "sea"]);
  const enemyUnit =
    attackType === "air" ? randomFrom(aircraftTypes) : attackType === "land" ? randomFrom(tankTypes) : randomFrom(shipTypes);

  const detected = attackType !== "air" || !enemyUnit.stealth || targetCity.buildings.radar >= 2;

  if (detected) {
    state.enemiesDetected.unshift({
      id: crypto.randomUUID(),
      label: `Wykryto ${enemyUnit.name} w pobliżu ${targetCity.name}.`,
      type: attackType,
      status: "wykryty",
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 80) + 10
    });
  }

  const defensePower =
    targetCity.units.tanks.length +
    targetCity.units.ships.length +
    targetCity.units.aircraft.length +
    (targetCity.buildings.missiles ? 3 : 0) +
    (targetCity.buildings.antiAir ? 2 : 0) +
    (targetCity.buildings.walls ? 2 : 0);

  const attackPower = enemyUnit.attack + Math.floor(Math.random() * 4);

  if (defensePower >= attackPower) {
    logEvent(`Atak na ${targetCity.name} odparty (${enemyUnit.name}).`);
    targetCity.morale = Math.max(50, targetCity.morale - 4);
  } else {
    targetCity.status = "pod ostrzałem";
    targetCity.morale = Math.max(0, targetCity.morale - 15);
    logEvent(`Miasto ${targetCity.name} zostało trafione przez ${enemyUnit.name}!`);

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
  ui.sendPatrol.addEventListener("click", startPatrol);
  ui.attackCity.addEventListener("click", attackEnemyCity);

  ui.saveProfile.addEventListener("click", () => {
    const name = ui.profileName.value.trim();
    if (!name) {
      logEvent("Podaj nazwę profilu.");
      return;
    }
    localStorage.setItem(`${PROFILE_KEY}-${name}`, JSON.stringify(state));
    logEvent("Postęp zapisany.");
  });

  ui.loadProfile.addEventListener("click", () => {
    const name = ui.profileName.value.trim();
    if (!name) {
      logEvent("Podaj nazwę profilu.");
      return;
    }
    const saved = localStorage.getItem(`${PROFILE_KEY}-${name}`);
    if (!saved) {
      logEvent("Brak zapisanego profilu.");
      return;
    }
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);
    state.events = parsed.events || [];
    state.patrols = parsed.patrols || [];
    state.enemiesDetected = parsed.enemiesDetected || [];
    state.missions = parsed.missions || [];
    state.enemyCities = parsed.enemyCities || [];
    state.attackCooldown = parsed.attackCooldown || 0;
    state.selectedEnemyId = null;
    state.selectedEnemyCityId = null;
    render();
    logEvent("Profil wczytany.");
  });
};

const init = () => {
  state.cities = [createCity("Neo-Warszawa", true)];
  state.enemyCities = [createEnemyCity("Sektor Północny"), createEnemyCity("Twierdza Omega"), createEnemyCity("Port Cienia")];
  state.activeCityId = state.cities[0].id;
  logEvent("Rozpoczęto kampanię. Boty szykują naloty!");
  setupControls();
  render();

  setInterval(() => {
    updateMissions();
    if (state.attackCooldown > 0) state.attackCooldown -= 1;
    renderEnemyCities();
    renderRadarActions();
  }, 1000);
  setInterval(tickEconomy, 5000);
  setInterval(enemyAttack, 15000);
};

init();
