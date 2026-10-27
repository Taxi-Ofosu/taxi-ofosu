// Geocoding via Nominatim (OpenStreetMap) en routeafstand via OSRM demo-server.
// Beide zijn gratis en werken zonder API-key. Voor productiegebruik met veel
// aanvragen per dag: overweeg een eigen Nominatim/OSRM-instance te hosten.
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

// Boekingen worden via FormSubmit (gratis, geen account) naar dit adres gemaild.
// De klant krijgt automatisch een bevestigingsmail via _autoresponse (tekst in i18n.js).
const BOOKING_EMAIL = "info@taxiant.be";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${BOOKING_EMAIL}`;

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

const bookingBox = document.getElementById("booking");
const bookingForm = document.getElementById("booking-form");
const bookBtn = document.getElementById("book-btn");
const bookingError = document.getElementById("booking-error");
const bookingSuccess = document.getElementById("booking-success");

// Laatst berekende rit, meegestuurd met de boeking.
let currentRide = null;

document.getElementById("ride-date").min = new Date().toISOString().split("T")[0];

createBackgroundLights();

// Zwevende, wazige stadslichtjes over de achtergrondfoto.
function createBackgroundLights() {
  const container = document.getElementById("bg-lights");
  const colors = ["#FF3B3B", "#FFB347", "#FFE7A3", "#3DDBC0", "#5AA9FF", "#FF8A00"];
  const count = window.innerWidth < 720 ? 14 : 26;

  for (let i = 0; i < count; i++) {
    const light = document.createElement("span");
    const size = 12 + Math.random() * 46;
    light.style.width = `${size}px`;
    light.style.height = `${size}px`;
    light.style.left = `${Math.random() * 100}%`;
    light.style.top = `${30 + Math.random() * 45}%`;
    light.style.background = colors[Math.floor(Math.random() * colors.length)];
    light.style.animationDuration = `${6 + Math.random() * 10}s, ${2.5 + Math.random() * 4}s`;
    light.style.animationDelay = `${-Math.random() * 10}s, ${-Math.random() * 4}s`;
    container.appendChild(light);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideError();
  resultBox.hidden = true;
  bookingBox.hidden = true;
  bookingSuccess.hidden = true;
  currentRide = null;
  setLoading(true);

  try {
    const originText = readAddress("origin");
    const destinationText = readAddress("destination");

    const [originCoord, destinationCoord] = await Promise.all([
      geocodeAddress(originText),
      geocodeAddress(destinationText)
    ]);

    const distanceKm = await getDistanceKm(originCoord, destinationCoord);
    const price = calculatePrice(distanceKm);

    currentRide = {
      origin: originText,
      destination: destinationText,
      date: document.getElementById("ride-date").value,
      time: document.getElementById("ride-time").value,
      distanceKm,
      price
    };

    showResult(price, distanceKm);
    bookingBox.hidden = false;
  } catch (err) {
    showError(err.message || t("error.calc"));
  } finally {
    setLoading(false);
  }
});

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentRide) return;

  bookingError.hidden = true;
  setBookingLoading(true);

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const email = document.getElementById("customer-email").value.trim();
  const notes = document.getElementById("customer-notes").value.trim();

  try {
    const res = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: `Nieuwe taxiboeking van ${name}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
        _autoresponse: t("autoReply"),
        Taal: currentLang.toUpperCase(),
        Naam: name,
        Telefoonnummer: phone,
        email: email,
        Vertrekadres: currentRide.origin,
        Bestemming: currentRide.destination,
        Datum: currentRide.date,
        Tijd: currentRide.time,
        Afstand: `${currentRide.distanceKm.toFixed(1)} km`,
        Prijsindicatie: `€ ${currentRide.price.toFixed(2).replace(".", ",")}`,
        "Extra informatie": notes || "-"
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false || data.success === "false") {
      throw new Error();
    }

    bookingBox.hidden = true;
    bookingSuccess.hidden = false;
    bookingForm.reset();
    playTaxiRun();
  } catch {
    bookingError.textContent = t("error.booking");
    bookingError.hidden = false;
  } finally {
    setBookingLoading(false);
  }
});

// Taxi rijdt zijwaarts over het scherm na een geslaagde boeking. Klik slaat over.
function playTaxiRun() {
  const run = document.getElementById("taxi-run");

  // Herstart de animaties als de klant opnieuw boekt.
  run.hidden = true;
  void run.offsetWidth;
  run.hidden = false;

  const close = () => {
    run.hidden = true;
    bookingSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  run.onclick = close;
  run.onanimationend = (e) => { if (e.target === run) close(); };
}

function setBookingLoading(isLoading) {
  bookBtn.disabled = isLoading;
  bookBtn.querySelector(".btn-spinner").hidden = !isLoading;
  bookBtn.querySelector(".btn-label").textContent = isLoading ? t("booking.loading") : t("booking.button");
}

// "Straat en nr" is required; postcode and city are optional.
function readAddress(prefix) {
  const street = document.getElementById(`${prefix}-street`).value.trim();
  const postcode = document.getElementById(`${prefix}-postcode`).value.trim();
  const city = document.getElementById(`${prefix}-city`).value.trim();
  const place = [postcode, city].filter(Boolean).join(" ");
  return place ? `${street}, ${place}` : street;
}

async function geocodeAddress(address) {
  // viewbox prefers results around Antwerp when no city is given, without excluding other places
  const url = `${NOMINATIM_URL}?format=json&limit=1&viewbox=3.9,51.4,4.9,51.0&q=${encodeURIComponent(address)}`;
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error(t("error.lookup"));

  const data = await res.json();
  const match = data && data[0];
  if (!match) throw new Error(t("error.notFound", { address }));

  return [parseFloat(match.lon), parseFloat(match.lat)]; // [lon, lat]
}

async function getDistanceKm(startCoord, endCoord) {
  const url = `${OSRM_URL}/${startCoord[0]},${startCoord[1]};${endCoord[0]},${endCoord[1]}?overview=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(t("error.route"));

  const data = await res.json();
  const route = data.routes && data.routes[0];
  if (!route) throw new Error(t("error.noRoute"));

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
  btnLabel.textContent = isLoading ? t("calc.loading") : t("calc.button");
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.hidden = false;
}

function hideError() {
  errorMsg.hidden = true;
}
