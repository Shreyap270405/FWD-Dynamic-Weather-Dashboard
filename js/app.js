
const API_KEY = "68788c83b8f221b7f940e039bc00183a"; 
const BASE_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
const BASE_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";
const ICON_URL = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

const DEFAULT_CITY = "Bengaluru"; 

const countryDisplay = new Intl.DisplayNames(['en'], {type: 'region'});
const COUNTRY_NAMES = {
  AF: "Afghanistan", AL: "Albania", DZ: "Algeria", AS: "American Samoa", AD: "Andorra", AO: "Angola", AI: "Anguilla", AQ: "Antarctica", AG: "Antigua and Barbuda", AR: "Argentina", AM: "Armenia", AW: "Aruba", AU: "Australia", AT: "Austria", AZ: "Azerbaijan", BS: "Bahamas", BH: "Bahrain", BD: "Bangladesh", BB: "Barbados", BY: "Belarus", BE: "Belgium", BZ: "Belize", BJ: "Benin", BM: "Bermuda", BT: "Bhutan", BO: "Bolivia", BA: "Bosnia and Herzegovina", BW: "Botswana", BR: "Brazil", IO: "British Indian Ocean Territory", VG: "British Virgin Islands", BN: "Brunei", BG: "Bulgaria", BF: "Burkina Faso", BI: "Burundi", KH: "Cambodia", CM: "Cameroon", CA: "Canada", CV: "Cape Verde", KY: "Cayman Islands", CF: "Central African Republic", TD: "Chad", CL: "Chile", CN: "China", CX: "Christmas Island", CC: "Cocos Islands", CO: "Colombia", KM: "Comoros", CK: "Cook Islands", CR: "Costa Rica", HR: "Croatia", CU: "Cuba", CW: "Curacao", CY: "Cyprus", CZ: "Czech Republic", CD: "Democratic Republic of the Congo", DK: "Denmark", DJ: "Djibouti", DM: "Dominica", DO: "Dominican Republic", TL: "East Timor", EC: "Ecuador", EG: "Egypt", SV: "El Salvador", GQ: "Equatorial Guinea", ER: "Eritrea", EE: "Estonia", ET: "Ethiopia", FK: "Falkland Islands", FO: "Faroe Islands", FJ: "Fiji", FI: "Finland", FR: "France", PF: "French Polynesia", GA: "Gabon", GM: "Gambia", GE: "Georgia", DE: "Germany", GH: "Ghana", GI: "Gibraltar", GR: "Greece", GL: "Greenland", GD: "Grenada", GU: "Guam", GT: "Guatemala", GG: "Guernsey", GN: "Guinea", GW: "Guinea-Bissau", GY: "Guyana", HT: "Haiti", HN: "Honduras", HK: "Hong Kong", HU: "Hungary", IS: "Iceland", IN: "India", ID: "Indonesia", IR: "Iran", IQ: "Iraq", IE: "Ireland", IM: "Isle of Man", IL: "Israel", IT: "Italy", CI: "Ivory Coast", JM: "Jamaica", JP: "Japan", JE: "Jersey", JO: "Jordan", KZ: "Kazakhstan", KE: "Kenya", KI: "Kiribati", XK: "Kosovo", KW: "Kuwait", KG: "Kyrgyzstan", LA: "Laos", LV: "Latvia", LB: "Lebanon", LS: "Lesotho", LR: "Liberia", LY: "Libya", LI: "Liechtenstein", LT: "Lithuania", LU: "Luxembourg", MO: "Macao", MK: "Macedonia", MG: "Madagascar", MW: "Malawi", MY: "Malaysia", MV: "Maldives", ML: "Mali", MT: "Malta", MH: "Marshall Islands", MR: "Mauritania", MU: "Mauritius", YT: "Mayotte", MX: "Mexico", FM: "Micronesia", MD: "Moldova", MC: "Monaco", MN: "Mongolia", ME: "Montenegro", MS: "Montserrat", MA: "Morocco", MZ: "Mozambique", MM: "Myanmar", NA: "Namibia", NR: "Nauru", NP: "Nepal", NL: "Netherlands", NC: "New Caledonia", NZ: "New Zealand", NI: "Nicaragua", NE: "Niger", NG: "Nigeria", NU: "Niue", KP: "North Korea", MP: "Northern Mariana Islands", NO: "Norway", OM: "Oman", PK: "Pakistan", PW: "Palau", PS: "Palestine", PA: "Panama", PG: "Papua New Guinea", PY: "Paraguay", PE: "Peru", PH: "Philippines", PN: "Pitcairn", PL: "Poland", PT: "Portugal", PR: "Puerto Rico", QA: "Qatar", CG: "Republic of the Congo", RE: "Reunion", RO: "Romania", RU: "Russia", RW: "Rwanda", BL: "Saint Barthelemy", SH: "Saint Helena", KN: "Saint Kitts and Nevis", LC: "Saint Lucia", MF: "Saint Martin", PM: "Saint Pierre and Miquelon", VC: "Saint Vincent and the Grenadines", WS: "Samoa", SM: "San Marino", ST: "Sao Tome and Principe", SA: "Saudi Arabia", SN: "Senegal", RS: "Serbia", SC: "Seychelles", SL: "Sierra Leone", SG: "Singapore", SX: "Sint Maarten", SK: "Slovakia", SI: "Slovenia", SB: "Solomon Islands", SO: "Somalia", ZA: "South Africa", KR: "South Korea", SS: "South Sudan", ES: "Spain", LK: "Sri Lanka", SD: "Sudan", SR: "Suriname", SJ: "Svalbard and Jan Mayen", SZ: "Swaziland", SE: "Sweden", CH: "Switzerland", SY: "Syria", TW: "Taiwan", TJ: "Tajikistan", TZ: "Tanzania", TH: "Thailand", TG: "Togo", TK: "Tokelau", TO: "Tonga", TT: "Trinidad and Tobago", TN: "Tunisia", TR: "Turkey", TM: "Turkmenistan", TC: "Turks and Caicos Islands", TV: "Tuvalu", UG: "Uganda", UA: "Ukraine", AE: "United Arab Emirates", GB: "United Kingdom", US: "United States", UY: "Uruguay", UZ: "Uzbekistan", VU: "Vanuatu", VA: "Vatican", VE: "Venezuela", VN: "Vietnam", VI: "Virgin Islands", WF: "Wallis and Futuna", EH: "Western Sahara", YE: "Yemen", ZM: "Zambia", ZW: "Zimbabwe"
};


function el(id) { return document.getElementById(id); }
function setText(id, text){ const e = el(id); if(e) e.textContent = text; }
function formatTime(ts, tzOffset=0){
  
  const utcMs = ts * 1000;
  const offsetMs = tzOffset * 1000;
  const localMs = utcMs + offsetMs;
  const d = new Date(localMs);


  return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', timeZone: 'UTC'});
}
function formatDateLabel(dateStr){
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {weekday:'short', month:'short', day:'numeric'});
}


function conditionToBgClass(condition){
  const c = (condition || "").toLowerCase();
  if(c.includes("clear")) return "clear";
  if(c.includes("cloud")) return "clouds";
  if(c.includes("rain") || c.includes("drizzle")) return "rain";
  if(c.includes("snow")) return "snow";
  if(c.includes("thunder")) return "thunder";
  if(c.includes("fog") || c.includes("mist") || c.includes("haze") || c.includes("smoke")) return "fog";
  return "clear";
}


function saveLastLocation(obj){
  localStorage.setItem("lastLocation", JSON.stringify(obj));
}


function getFavorites(){
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}
function addFavorite(cityObj){
  const fav = getFavorites();
  
  if(!fav.some(f=>f.name.toLowerCase()===cityObj.name.toLowerCase())){
    fav.push(cityObj);
    localStorage.setItem("favorites", JSON.stringify(fav));
  }
}


async function fetchWeatherByCoords(lat, lon){
  const url = `${BASE_WEATHER}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}
async function fetchWeatherByCity(city){
  const url = `${BASE_WEATHER}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error("City not found");
  return res.json();
}
async function fetchForecastByCoords(lat, lon){
  const url = `${BASE_FORECAST}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error("Forecast fetch failed");
  return res.json();
}
async function fetchForecastByCity(city){
  const url = `${BASE_FORECAST}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error("Forecast city not found");
  return res.json();
}


function renderCurrentWeather(data){
  if(!data) return;
  const countryCode = (data.sys?.country || "").toUpperCase();
  const countryName = COUNTRY_NAMES[countryCode] || countryCode;
  const city = `${data.name}, ${countryName}`;
  const desc = data.weather?.[0]?.description || "";
  const icon = data.weather?.[0]?.icon || "";
  const main = data.weather?.[0]?.main || "";

  setText("cityName", city);
  setText("desc", desc?.toUpperCase());
  el("weatherIcon").src = ICON_URL(icon);
  setText("tempVal", Math.round(data.main.temp || 0));
  setText("feels", Math.round(data.main.feels_like || 0));
  setText("humidity", data.main.humidity || "--");
  setText("wind", data.wind?.speed ?? "--");
 
  setText("sunrise", formatTime(data.sys.sunrise, data.timezone));
  setText("sunset", formatTime(data.sys.sunset, data.timezone));
  setText("updatedAt", new Date().toLocaleString());


  document.body.classList.remove(...document.body.classList);
  document.body.classList.add("weather-bg", conditionToBgClass(main));

 
  saveLastLocation({name: data.name, lat: data.coord.lat, lon: data.coord.lon});
}

function renderQuickForecast(forecastData){
  const container = el("quickForecast");
  if(!container) return;
  container.innerHTML = "";
  if(!forecastData || !forecastData.list) return;

  
  const byDate = {};
  forecastData.list.forEach(item=>{
    const date = item.dt_txt.split(" ")[0];
    if(!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  });
  const dates = Object.keys(byDate).slice(0,5);
  dates.forEach(d=>{
    const items = byDate[d];
    let chosen = items.find(it => it.dt_txt.includes("12:00:00")) || items[0];
    const icon = chosen.weather[0].icon;
    const temp = Math.round(chosen.main.temp);
    const elCard = document.createElement("div");
    elCard.className = "minicard";
    elCard.innerHTML = `<div class="muted small">${new Date(d).toLocaleDateString(undefined,{weekday:'short'})}</div>
                        <img src="${ICON_URL(icon)}" alt="icon"/>
                        <div style="font-weight:700">${temp}°</div>`;
    container.appendChild(elCard);
  });
}


function groupForecastByDay(list){
  const map = {};
  list.forEach(item=>{
    const date = item.dt_txt.split(" ")[0];
    if(!map[date]) map[date] = [];
    map[date].push(item);
  });
  
  const days = Object.keys(map).slice(0,6).map(date=>{
    const arr = map[date];
    const temps = arr.map(a=>a.main.temp);
    const min = Math.round(Math.min(...temps));
    const max = Math.round(Math.max(...temps));
    
    let rep = arr.find(it=>it.dt_txt.includes("12:00:00")) || arr[0];
    return {
      date,
      label: formatDateLabel(date),
      min, max,
      icon: rep.weather[0].icon,
      raw: arr
    };
  });
  return days;
}

function renderForecastPage(forecastData){
  const days = groupForecastByDay(forecastData.list);
  const container = el("forecastDays");
  const title = el("forecastTitle");
  container.innerHTML = "";
  if(days.length === 0) { container.innerHTML = "<div>No forecast found</div>"; return; }

  const countryCode = (forecastData.city.country || "").toUpperCase();
  const countryName = COUNTRY_NAMES[countryCode] || countryCode;
  title.textContent = `5-Day Forecast for ${forecastData.city.name}, ${countryName}`;

  days.slice(0,5).forEach(d=>{
    const div = document.createElement("div");
    div.className = "day-card";
    div.innerHTML = `
      <div style="font-weight:700">${d.label}</div>
      <img src="${ICON_URL(d.icon)}" alt="icon" style="width:80px;height:80px"/>
      <div style="margin-top:6px">Min: ${d.min}° · Max: ${d.max}°</div>
      <div style="margin-top:8px"><button class="btn small" data-date="${d.date}">See details</button></div>
    `;
    container.appendChild(div);
  });

  
  container.querySelectorAll("button[data-date]").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      const date = e.currentTarget.dataset.date;
      const day = days.find(dd=>dd.date === date);
      showDayDetails(day);
    });
  });

  
  showDayDetails(days[0]);
}

function showDayDetails(day){
  const list = el("detailList");
  if(!list) return;
  if(!day){ list.innerHTML = "No details"; return; }
  const html = `
    <h3>${day.label} — Details</h3>
    <div style="display:flex;gap:8px; flex-wrap:wrap">
      ${day.raw.map(it=>`<div style="min-width:160px; padding:8px; border-radius:8px; background:rgba(255,255,255,0.02); margin:6px">
        <div style="font-weight:600">${new Date(it.dt * 1000).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
        <img src="${ICON_URL(it.weather[0].icon)}" style="width:64px;height:64px"/>
        <div>${Math.round(it.main.temp)}°C</div>
        <div class="muted">${it.weather[0].description}</div>
      </div>`).join('')}
    </div>
  `;
  list.innerHTML = html;
}


async function initIndex(){
  
  const searchInput = el("searchInput");
  const searchBtn = el("searchBtn");
  const locBtn = el("locBtn");
  const saveBtn = el("saveBtn");
  const viewForecastBtn = el("viewForecastBtn");

  
  searchBtn?.addEventListener("click", async()=>{
    const q = searchInput.value.trim();
    if(!q) return alert("Type a city name first");
    try {
      const data = await fetchWeatherByCity(q);
      renderCurrentWeather(data);
      
      const forecastData = await fetchForecastByCoords(data.coord.lat, data.coord.lon);
      renderQuickForecast(forecastData);
    } catch(err){
      alert("City not found or API error. Check your API key and network.");
    }
  });

 
  locBtn?.addEventListener("click", ()=>{
    if(!navigator.geolocation){
      alert("Geolocation not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position)=>{
      try {
        const {latitude, longitude} = position.coords;
        const data = await fetchWeatherByCoords(latitude, longitude);
        renderCurrentWeather(data);
        const forecastData = await fetchForecastByCoords(latitude, longitude);
        renderQuickForecast(forecastData);
      } catch(e){
        alert("Geolocation weather fetch failed.");
      }
    }, (err)=>{
      alert("Location access denied or unavailable. Try searching a city.");
    }, {timeout:10000});
  });

  
  saveBtn?.addEventListener("click", ()=>{
    const last = JSON.parse(localStorage.getItem("lastLocation") || "null");
    if(!last) return alert("No city loaded to save. Search or use location first.");
    addFavorite({name: last.name, lat: last.lat, lon: last.lon});
    alert(`${last.name} saved to favorites.`);
  });

  
  viewForecastBtn?.addEventListener("click", ()=>{
    
  });

  
  const last = JSON.parse(localStorage.getItem("lastLocation") || "null");
  if(last){
    try {
      const data = await fetchWeatherByCoords(last.lat, last.lon);
      renderCurrentWeather(data);
      const forecastData = await fetchForecastByCoords(last.lat, last.lon);
      renderQuickForecast(forecastData);
    } catch(e){
      console.warn("Failed to load last location: ", e);
    }
    return;
  }

  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async (position)=>{
      try {
        const {latitude, longitude} = position.coords;
        const data = await fetchWeatherByCoords(latitude, longitude);
        renderCurrentWeather(data);
        const forecastData = await fetchForecastByCoords(latitude, longitude);
        renderQuickForecast(forecastData);
      } catch(e){
        console.warn("Auto geolocation failed", e);
        
        loadDefaultCity();
      }
    }, (err)=>{
      
      loadDefaultCity();
    }, {timeout:8000});
  } else {
    loadDefaultCity();
  }
}

async function loadDefaultCity(){
  try {
    const data = await fetchWeatherByCity(DEFAULT_CITY);
    renderCurrentWeather(data);
    const forecastData = await fetchForecastByCoords(data.coord.lat, data.coord.lon);
    renderQuickForecast(forecastData);
  } catch(e){
    console.error("Failed default city load", e);
  }
}

async function initForecastPage(){
  const searchInput = el("forecastSearch");
  const searchBtn = el("forecastSearchBtn");

  searchBtn?.addEventListener("click", async ()=>{
    const q = searchInput.value.trim();
    if(!q) return alert("Type a city name first");
    try {
      const f = await fetchForecastByCity(q);
      renderForecastPage(f);
      
      if(f && f.city) saveLastLocation({name: f.city.name, lat: f.city.coord.lat, lon: f.city.coord.lon});
    } catch(e){
      alert("Forecast fetch failed. Check the city name / API.");
    }
  });

  
  const last = JSON.parse(localStorage.getItem("lastLocation") || "null");
  if(last){
    try {
      const f = await fetchForecastByCoords(last.lat, last.lon);
      renderForecastPage(f);
      return;
    } catch(e){
      console.warn("Failed to fetch forecast for last location", e);
    }
  }

  
  try {
    const f = await fetchForecastByCity(DEFAULT_CITY);
    renderForecastPage(f);
  } catch(e){
    console.error("Failed to load fallback forecast", e);
  }
}

function initFavoritesPage(){
  const list = el("favoritesList");
  list.innerHTML = "";
  const favs = getFavorites();
  if(favs.length === 0){
    list.innerHTML = "<div>No favorites yet. Save cities from the Home page.</div>";
    return;
  }
  favs.forEach(f=>{
    const div = document.createElement("div");
    div.className = "favorite-item";
    div.innerHTML = `<div style="flex:1;font-weight:600">${f.name}</div>
  <div style="display:flex;gap:8px">
    <button class="btn small" data-lat="${f.lat}" data-lon="${f.lon}">View</button>
    <button class="btn outline small" data-remove="${f.name}">Remove</button>
  </div>`;
    list.appendChild(div);
  });

  list.querySelectorAll("button[data-lat]").forEach(b=>{
    b.addEventListener("click", async (e)=>{
      const lat = e.currentTarget.dataset.lat;
      const lon = e.currentTarget.dataset.lon;
      try {
        const data = await fetchWeatherByCoords(lat, lon);
        
        saveLastLocation({name: data.name, lat: data.coord.lat, lon: data.coord.lon});
        location.href = "index.html";
      } catch(e){ alert("Failed to load favorite location"); }
    });
  });

  list.querySelectorAll("button[data-remove]").forEach(b=>{
    b.addEventListener("click", (e)=>{
      const name = e.currentTarget.dataset.remove;
      let favs = getFavorites();
      favs = favs.filter(f=>f.name !== name);
      localStorage.setItem("favorites", JSON.stringify(favs));
      initFavoritesPage(); 
    });
  });
}


document.addEventListener("DOMContentLoaded", ()=>{
  const page = document.body.dataset.page;
  if(page === "index") initIndex();
  if(page === "forecast") initForecastPage();
  if(page === "favorites") initFavoritesPage();
  
});
