// Geocoding via Nominatim (OpenStreetMap) en routeafstand via OSRM demo-server.
// Beide zijn gratis en werken zonder API-key. Voor productiegebruik met veel
// aanvragen per dag: overweeg een eigen Nominatim/OSRM-instance te hosten.
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

// Boekingen worden via FormSubmit (gratis, geen account) naar dit adres gemaild.
// De klant krijgt automatisch een bevestigingsmail via _autoresponse.
const BOOKING_EMAIL = "Taxi.ofosu@hotmail.com";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${BOOKING_EMAIL}`;
const AUTO_REPLY =
  "Beste klant,\n\n" +
  "Bedankt voor je boeking bij Taxi Ofosu. We hebben je aanvraag goed ontvangen " +
  "en nemen dringend contact met je op om je rit te bevestigen.\n\n" +
  "Met vriendelijke groet,\nTaxi Ofosu";

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideError();
  resultBox.hidden = true;
  bookingBox.hidden = true;
  bookingSuccess.hidden = true;
  currentRide = null;
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

    currentRide = {
      origin: originText,
      destination: destinationText,
      date: document.getElementById("ride-date").value,
      distanceKm,
      price
    };

    showResult(price, distanceKm);
    bookingBox.hidden = false;
  } catch (err) {
    showError(err.message || "Er ging iets mis bij het berekenen van de prijs.");
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

  try {
    const res = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: `Nieuwe taxiboeking van ${name}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
        _autoresponse: AUTO_REPLY,
        Naam: name,
        Telefoonnummer: phone,
        email: email,
        Vertrekadres: currentRide.origin,
        Bestemming: currentRide.destination,
        Datum: currentRide.date,
        Afstand: `${currentRide.distanceKm.toFixed(1)} km`,
        Prijsindicatie: `€ ${currentRide.price.toFixed(2).replace(".", ",")}`
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false || data.success === "false") {
      throw new Error();
    }

    bookingBox.hidden = true;
    bookingSuccess.hidden = false;
    bookingForm.reset();
  } catch {
    bookingError.textContent = "Je boeking kon niet worden verzonden. Probeer het opnieuw of bel ons.";
    bookingError.hidden = false;
  } finally {
    setBookingLoading(false);
  }
});

function setBookingLoading(isLoading) {
  bookBtn.disabled = isLoading;
  bookBtn.querySelector(".btn-spinner").hidden = !isLoading;
  bookBtn.querySelector(".btn-label").textContent = isLoading ? "Bezig met verzenden..." : "Bevestig rit";
}

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
