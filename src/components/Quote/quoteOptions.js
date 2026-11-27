// Choices offered in the quote form. PLACEHOLDERS: replace them with the decors, fronts and
// hardware Bottega actually offers. Products and places come from src/data/.

// Wood decors get a faint grain (a repeating gradient), so their swatches read as wood.
const grain = (a, b) => `repeating-linear-gradient(100deg, ${a} 0 7px, ${b} 7px 10px)`;

export const decors = [
  { id: "beli-mat", label: "Beli mat", swatch: "#F1EFEA" },
  { id: "kasmir", label: "Kašmir", swatch: "#D8CDBE" },
  { id: "sivo-zelena", label: "Sivo-zelena", swatch: "#A7AC98" },
  { id: "antracit", label: "Antracit", swatch: "#3D3F44" },
  { id: "hrast-natur", label: "Hrast natur", swatch: grain("#C9A47B", "#BE976D") },
  { id: "hrast-dimljeni", label: "Hrast dimljeni", swatch: grain("#8A6A4E", "#7E5F45") },
  { id: "orah", label: "Orah", swatch: grain("#6A4831", "#5F402B") },
];

export const fronts = ["Iverica u dekoru", "MDF, farbani mat", "MDF, visoki sjaj", "Ne znam, posavetujte me"];

// Hardware and extras in plain words rather than brand names and part numbers.
export const details = [
  "Tiho zatvaranje vrata i fioka",
  "Bez ručki, otvaranje na dodir",
  "Ručke po izboru",
  "Klizna vrata",
  "LED rasveta",
  "Unutrašnja organizacija (fioke, korpe, pregrade)",
];

export const contactMethods = ["Poziv", "Viber", "WhatsApp", "Email"];

export const timeframes = ["Što pre", "U naredna 1–3 meseca", "Za više od 3 meseca", "Još istražujem"];

export const OTHER_PLACE = "Drugo mesto";

export const emptyAnswers = {
  products: [],
  width: "",
  height: "",
  depth: "",
  measureVisit: false,
  space: "",
  decors: [],
  decorAdvice: false,
  front: "",
  details: [],
  note: "",
  name: "",
  phone: "",
  email: "",
  method: "",
  place: "",
  otherPlace: "",
  timeframe: "",
  budget: "",
  consent: false,
};

// Only the contact step has required fields: a name, a way to reach the person, and consent.
export const validateContact = (a) => {
  const errors = {};
  if (!a.name.trim()) errors.name = "Upišite ime.";
  if (!a.phone.trim() && !a.email.trim()) errors.reach = "Upišite telefon ili email, da bismo mogli da vam se javimo.";
  if (a.email.trim() && !/^\S+@\S+\.\S+$/.test(a.email.trim())) errors.email = "Proverite email adresu.";
  if (!a.consent) errors.consent = "Bez vaše saglasnosti ne možemo da vam pošaljemo ponudu.";
  return errors;
};

// The answers as [label, value] pairs for the email Bottega receives (Web3Forms shows them as a
// table, one row each): first who is asking and how to reach them, then what they want.
// Unanswered questions are left out.
export const quoteFields = (a) => {
  const sizes = [
    ["širina", a.width],
    ["visina", a.height],
    ["dubina", a.depth],
  ]
    .filter(([, value]) => value.trim())
    .map(([name, value]) => `${name} ${value.trim()} cm`)
    .join(", ");
  const decorNames = decors.filter(({ id }) => a.decors.includes(id)).map(({ label }) => label);
  if (a.decorAdvice) decorNames.push("potreban savet");

  return [
    ["Ime", a.name.trim()],
    ["Telefon", a.phone.trim()],
    ["Email", a.email.trim()],
    ["Kontakt preko", a.method],
    ["Lokacija", a.place === OTHER_PLACE ? a.otherPlace.trim() || OTHER_PLACE : a.place],
    ["Rok", a.timeframe],
    ["Okvirni budžet", a.budget.trim()],
    ["Proizvodi", a.products.join(", ")],
    ["Mere", sizes],
    ["Merenje", a.measureVisit ? "potrebno na licu mesta" : ""],
    ["Opis prostora", a.space.trim()],
    ["Dekori", decorNames.join(", ")],
    ["Frontovi", a.front],
    ["Okov i detalji", a.details.join(", ")],
    ["Napomena", a.note.trim()],
  ].filter(([, value]) => value);
};
