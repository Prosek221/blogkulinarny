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
  budget: 6000,
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
