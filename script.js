// Geocoding via Nominatim (OpenStreetMap) en routeafstand via OSRM demo-server.
// Beide zijn gratis en werken zonder API-key. Voor productiegebruik met veel
// aanvragen per dag: overweeg een eigen Nominatim/OSRM-instance te hosten.
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

const PRICING = {
  baseFare: 5,      // vast startbedrag (€)
  perKm: 1.75,      // prijs per kilometer (€)
  minimum: 8         // minimumprijs voor een rit (€)
};

const form = document.getElementById("price-form");
const calcBtn = document.getElementById("calc-btn");
const btnLabel = calcBtn.querySelector(".btn-label");
const btnSpinner = calcBtn.querySelector(".btn-spinner");
const errorMsg = document.getElementById("error-msg");
const resultBox = document.getElementById("result");
const priceValueEl = document.getElementById("price-value");
const resultMetaEl = document.getElementById("result-meta");

document.getElementById("ride-date").min = new Date().toISOString().split("T")[0];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideError();
  resultBox.hidden = true;
  setLoading(true);

  try {
    const originText = document.getElementById("origin").value.trim();
    const destinationText = document.getElementById("destination").value.trim();

    const [originCoord, destinationCoord] = await Promise.all([
      geocodeAddress(originText),
      geocodeAddress(destinationText)
    ]);

    const distanceKm = await getDistanceKm(originCoord, destinationCoord);
    const price = calculatePrice(distanceKm);

    showResult(price, distanceKm);
  } catch (err) {
    showError(err.message || "Er ging iets mis bij het berekenen van de prijs.");
  } finally {
    setLoading(false);
  }
});

async function geocodeAddress(address) {
  const url = `${NOMINATIM_URL}?format=json&limit=1&q=${encodeURIComponent(address)}`;
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error("Adres opzoeken is mislukt. Probeer het opnieuw.");

  const data = await res.json();
  const match = data && data[0];
  if (!match) throw new Error(`Adres niet gevonden: "${address}"`);

  return [parseFloat(match.lon), parseFloat(match.lat)]; // [lon, lat]
}

async function getDistanceKm(startCoord, endCoord) {
  const url = `${OSRM_URL}/${startCoord[0]},${startCoord[1]};${endCoord[0]},${endCoord[1]}?overview=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Route berekenen is mislukt. Controleer de adressen.");

  const data = await res.json();
  const route = data.routes && data.routes[0];
  if (!route) throw new Error("Geen route gevonden tussen deze adressen.");

  return route.distance / 1000; // meters -> km
}

function calculatePrice(distanceKm) {
  const raw = PRICING.baseFare + distanceKm * PRICING.perKm;
  return Math.max(raw, PRICING.minimum);
}

function showResult(price, distanceKm) {
  resultBox.hidden = false;
  resultMetaEl.textContent = `± ${distanceKm.toFixed(1)} km`;
  animateCounter(price);
}

function animateCounter(target) {
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = target * eased;
    priceValueEl.textContent = current.toFixed(2).replace(".", ",");

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function setLoading(isLoading) {
  calcBtn.disabled = isLoading;
  btnSpinner.hidden = !isLoading;
  btnLabel.textContent = isLoading ? "Bezig met berekenen..." : "Bereken prijs";
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.hidden = false;
}

function hideError() {
  errorMsg.hidden = true;
}
