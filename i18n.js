// Vertalingen voor NL / EN / FR. Teksten in de HTML krijgen data-i18n (tekst),
// data-i18n-html (tekst met opmaak) of data-i18n-placeholder (invulvak).
const TRANSLATIONS = {
  nl: {
    "meta.title": "Centraal Taxi Antwerpen — 24/7 taxi & luchthavenritten",
    "meta.description": "Centraal Taxi Antwerpen: uw taxi in Antwerpen en omgeving, 24/7 beschikbaar. Luchthavenritten en ritten op maat. Bereken direct de prijs en boek online of bel +32 491 02 21 45.",
    "nav.how": "Hoe werkt het",
    "nav.calc": "Bereken prijs",
    "nav.callShort": "Bel",
    "badge.area": "📍 Antwerpen & omgeving",
    "badge.always": "🕒 24/7 beschikbaar",
    "badge.airport": "✈️ Luchthavenritten",
    "hero.title": "Jouw taxi in Antwerpen, dag en nacht",
    "hero.text": "Vul je vertrekpunt en bestemming in en ontvang binnen enkele seconden een betrouwbare prijsindicatie van Centraal Taxi Antwerpen. Ook voor ritten naar de luchthaven.",
    "hero.call": "📞 Bel direct: +32 491 02 21 45",
    "calc.title": "Bereken de prijs van je taxirit",
    "addr.origin": "Vertrekadres",
    "addr.destination": "Bestemmingsadres",
    "addr.street": "Straat en nr",
    "addr.postcode": "Postcode",
    "addr.city": "Stad (optioneel)",
    "calc.button": "Bereken prijs",
    "calc.loading": "Bezig met berekenen...",
    "result.label": "Geschatte prijs",
    "booking.title": "Boek deze rit",
    "booking.intro": "Vul je gegevens in en bevestig je rit. We nemen zo snel mogelijk contact met je op.",
    "booking.name": "Naam",
    "booking.phone": "Telefoonnummer",
    "booking.email": "E-mailadres",
    "booking.notes": "Extra informatie (optioneel), bijv. bagage, aantal personen, vluchtnummer",
    "booking.button": "Bevestig rit",
    "booking.loading": "Bezig met verzenden...",
    "success.title": "Bedankt voor je boeking!",
    "success.text": "We hebben je aanvraag goed ontvangen en nemen zo snel mogelijk contact met je op.",
    "how.title": "Hoe werkt het",
    "step1.title": "Vul je adressen in",
    "step1.text": "Voer je vertrekpunt en bestemming in.",
    "step2.title": "Kies datum en tijd",
    "step2.text": "Selecteer de gewenste dag en tijd van je rit.",
    "step3.title": "Ontvang je prijs",
    "step3.text": "Direct een betrouwbare schatting op basis van de werkelijke reisafstand.",
    "step4.title": "Bevestig je rit",
    "step4.text": "Vul je naam, nummer en e-mail in. We nemen snel contact met je op.",
    "footer.line": "Centraal Taxi Antwerpen — Taxi in Antwerpen en omgeving, 24/7 · Luchthavenritten",
    "taxi.caption": "Bedankt! <strong>Je boeking is verstuurd.</strong>",
    "error.calc": "Er ging iets mis bij het berekenen van de prijs.",
    "error.booking": "Je boeking kon niet worden verzonden. Probeer het opnieuw of bel ons op +32 491 02 21 45.",
    "error.lookup": "Adres opzoeken is mislukt. Probeer het opnieuw.",
    "error.notFound": "Adres niet gevonden: \"{address}\"",
    "error.route": "Route berekenen is mislukt. Controleer de adressen.",
    "error.noRoute": "Geen route gevonden tussen deze adressen.",
    "autoReply": "Beste klant,\n\nBedankt voor je boeking bij Centraal Taxi Antwerpen. We hebben je aanvraag goed ontvangen en nemen dringend contact met je op om je rit te bevestigen.\n\nMet vriendelijke groet,\nCentraal Taxi Antwerpen"
  },
  en: {
    "meta.title": "Centraal Taxi Antwerpen — 24/7 taxi & airport transfers",
    "meta.description": "Centraal Taxi Antwerpen: your taxi in Antwerp and surroundings, available 24/7. Airport transfers and custom rides. Get an instant price and book online or call +32 491 02 21 45.",
    "nav.how": "How it works",
    "nav.calc": "Get a price",
    "nav.callShort": "Call",
    "badge.area": "📍 Antwerp & surroundings",
    "badge.always": "🕒 Available 24/7",
    "badge.airport": "✈️ Airport transfers",
    "hero.title": "Your taxi in Antwerp, day and night",
    "hero.text": "Enter your pick-up point and destination and get a reliable price estimate from Centraal Taxi Antwerpen within seconds. Airport rides too.",
    "hero.call": "📞 Call now: +32 491 02 21 45",
    "calc.title": "Calculate the price of your taxi ride",
    "addr.origin": "Pick-up address",
    "addr.destination": "Destination address",
    "addr.street": "Street and number",
    "addr.postcode": "Postcode",
    "addr.city": "City (optional)",
    "calc.button": "Get price",
    "calc.loading": "Calculating...",
    "result.label": "Estimated price",
    "booking.title": "Book this ride",
    "booking.intro": "Enter your details and confirm your ride. We will contact you as soon as possible.",
    "booking.name": "Name",
    "booking.phone": "Phone number",
    "booking.email": "Email address",
    "booking.notes": "Extra information (optional), e.g. luggage, number of passengers, flight number",
    "booking.button": "Confirm ride",
    "booking.loading": "Sending...",
    "success.title": "Thank you for your booking!",
    "success.text": "We have received your request and will contact you as soon as possible.",
    "how.title": "How it works",
    "step1.title": "Enter your addresses",
    "step1.text": "Fill in your pick-up point and destination.",
    "step2.title": "Choose date and time",
    "step2.text": "Select the day and time of your ride.",
    "step3.title": "Get your price",
    "step3.text": "An instant, reliable estimate based on the actual travel distance.",
    "step4.title": "Confirm your ride",
    "step4.text": "Enter your name, number and email. We will contact you shortly.",
    "footer.line": "Centraal Taxi Antwerpen — Taxi in Antwerp and surroundings, 24/7 · Airport transfers",
    "taxi.caption": "Thank you! <strong>Your booking has been sent.</strong>",
    "error.calc": "Something went wrong while calculating the price.",
    "error.booking": "Your booking could not be sent. Please try again or call us at +32 491 02 21 45.",
    "error.lookup": "Address lookup failed. Please try again.",
    "error.notFound": "Address not found: \"{address}\"",
    "error.route": "Route calculation failed. Please check the addresses.",
    "error.noRoute": "No route found between these addresses.",
    "autoReply": "Dear customer,\n\nThank you for booking with Centraal Taxi Antwerpen. We have received your request and will contact you shortly to confirm your ride.\n\nKind regards,\nCentraal Taxi Antwerpen"
  },
  fr: {
    "meta.title": "Centraal Taxi Antwerpen — Taxi 24h/24 & transferts aéroport",
    "meta.description": "Centraal Taxi Antwerpen : votre taxi à Anvers et environs, disponible 24h/24 et 7j/7. Transferts aéroport et trajets sur mesure. Calculez le prix et réservez en ligne ou appelez le +32 491 02 21 45.",
    "nav.how": "Comment ça marche",
    "nav.calc": "Calculer le prix",
    "nav.callShort": "Appeler",
    "badge.area": "📍 Anvers & environs",
    "badge.always": "🕒 Disponible 24h/24",
    "badge.airport": "✈️ Transferts aéroport",
    "hero.title": "Votre taxi à Anvers, jour et nuit",
    "hero.text": "Indiquez votre point de départ et votre destination et recevez en quelques secondes une estimation de prix fiable de Centraal Taxi Antwerpen. Aussi pour les trajets vers l'aéroport.",
    "hero.call": "📞 Appelez directement : +32 491 02 21 45",
    "calc.title": "Calculez le prix de votre course en taxi",
    "addr.origin": "Adresse de départ",
    "addr.destination": "Adresse de destination",
    "addr.street": "Rue et numéro",
    "addr.postcode": "Code postal",
    "addr.city": "Ville (facultatif)",
    "calc.button": "Calculer le prix",
    "calc.loading": "Calcul en cours...",
    "result.label": "Prix estimé",
    "booking.title": "Réserver cette course",
    "booking.intro": "Indiquez vos coordonnées et confirmez votre course. Nous vous contacterons dès que possible.",
    "booking.name": "Nom",
    "booking.phone": "Numéro de téléphone",
    "booking.email": "Adresse e-mail",
    "booking.notes": "Informations supplémentaires (facultatif), p. ex. bagages, nombre de personnes, numéro de vol",
    "booking.button": "Confirmer la course",
    "booking.loading": "Envoi en cours...",
    "success.title": "Merci pour votre réservation !",
    "success.text": "Nous avons bien reçu votre demande et vous contacterons dès que possible.",
    "how.title": "Comment ça marche",
    "step1.title": "Indiquez vos adresses",
    "step1.text": "Saisissez votre point de départ et votre destination.",
    "step2.title": "Choisissez la date et l'heure",
    "step2.text": "Sélectionnez le jour et l'heure de votre course.",
    "step3.title": "Recevez votre prix",
    "step3.text": "Une estimation fiable et immédiate, basée sur la distance réelle du trajet.",
    "step4.title": "Confirmez votre course",
    "step4.text": "Indiquez votre nom, numéro et e-mail. Nous vous contacterons rapidement.",
    "footer.line": "Centraal Taxi Antwerpen — Taxi à Anvers et environs, 24h/24 · Transferts aéroport",
    "taxi.caption": "Merci ! <strong>Votre réservation a été envoyée.</strong>",
    "error.calc": "Une erreur s'est produite lors du calcul du prix.",
    "error.booking": "Votre réservation n'a pas pu être envoyée. Veuillez réessayer ou appelez-nous au +32 491 02 21 45.",
    "error.lookup": "La recherche de l'adresse a échoué. Veuillez réessayer.",
    "error.notFound": "Adresse introuvable : « {address} »",
    "error.route": "Le calcul de l'itinéraire a échoué. Vérifiez les adresses.",
    "error.noRoute": "Aucun itinéraire trouvé entre ces adresses.",
    "autoReply": "Cher client,\n\nMerci pour votre réservation chez Centraal Taxi Antwerpen. Nous avons bien reçu votre demande et vous contacterons rapidement pour confirmer votre course.\n\nCordialement,\nCentraal Taxi Antwerpen"
  }
};

const LANGUAGES = ["nl", "en", "fr"];
let currentLang = detectLanguage();

// Volgorde: ?lang= in de link, eerder gekozen taal, taal van de browser, anders Nederlands.
function detectLanguage() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGUAGES.includes(fromUrl)) return fromUrl;

  try {
    const saved = localStorage.getItem("lang");
    if (LANGUAGES.includes(saved)) return saved;
  } catch {}

  const browser = (navigator.language || "nl").slice(0, 2).toLowerCase();
  return LANGUAGES.includes(browser) ? browser : "nl";
}

function t(key, values = {}) {
  const text = TRANSLATIONS[currentLang][key] ?? TRANSLATIONS.nl[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]').content = t("meta.description");

  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-i18n-attr-label]").forEach((el) => { el.dataset.label = t(el.dataset.i18nAttrLabel); });

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
}

document.querySelectorAll(".lang-switch button").forEach((btn) => {
  btn.addEventListener("click", () => {
    try { localStorage.setItem("lang", btn.dataset.lang); } catch {}
    applyLanguage(btn.dataset.lang);
  });
});

applyLanguage(currentLang);
