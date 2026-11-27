import kitchen800 from "../assets/products/kitchen-800.jpg";
import kitchen1280 from "../assets/products/kitchen-1280.jpg";
import wardrobes800 from "../assets/products/wardrobes-800.jpg";
import wardrobes1280 from "../assets/products/wardrobes-1280.jpg";
import livingRoom800 from "../assets/products/living-room-800.jpg";
import livingRoom1280 from "../assets/products/living-room-1280.jpg";
import hallway800 from "../assets/products/hallway-800.jpg";
import hallway1280 from "../assets/products/hallway-1280.jpg";
import kidsRoom800 from "../assets/products/kids-room-800.jpg";
import kidsRoom1280 from "../assets/products/kids-room-1280.jpg";
import office800 from "../assets/products/office-800.jpg";
import office1280 from "../assets/products/office-1280.jpg";

// `thumb` is the small copy, for places that show the photo small (the quote form).
const photo = (small, large) => ({ src: large, srcSet: `${small} 800w, ${large} 1280w`, thumb: small });

// What Bottega makes to measure, used by the products section, the footer and the quote form.
// Draft text, to be refined. No product is the main one, so they all get the same treatment.
// The photos are free stock images from Pexels (pexels.com/license: commercial use, no credit
// required), cut to 4:3 and resized to 800 and 1280 px; they stand in until there are photos of
// Bottega's own work: pexels.com/photo/ kitchen 6782576, wardrobes 6585745, living room 6527054,
// hallway 6312075, kids' room 7045846, office 33827333 (portrait, cut from its middle).
export const products = [
  {
    title: "Kuhinje",
    text: "Raspored, elementi, radne ploče i ručke po meri vašeg prostora i načina na koji kuvate.",
    image: photo(kitchen800, kitchen1280),
    alt: "Kuhinja sa elementima u dekoru drveta i sivozelenim frontovima, sa šankom i barskim stolicama",
  },
  {
    title: "Plakari i garderoberi",
    text: "Ugradni plakari i garderoberi koji koriste svaki centimetar, sa unutrašnjošću po vašoj meri.",
    image: photo(wardrobes800, wardrobes1280),
    alt: "Garderober sa otvorenim policama u dekoru drveta, šipkama za vešanje i osvetljenjem",
  },
  {
    title: "Dnevne sobe",
    text: "TV komode, police i vitrine koje se uklapaju u prostor i drže sve na svom mestu.",
    image: photo(livingRoom800, livingRoom1280),
    alt: "Dnevna soba sa TV komodom, visećim policama i visokim elementom u bež tonu",
  },
  {
    title: "Predsoblja",
    text: "Mesto za jakne, obuću i sitnice, praktično složeno čak i u najužem hodniku.",
    image: photo(hallway800, hallway1280),
    alt: "Predsoblje sa klupom i fiokama, a iznad nje zidna obloga od letvica sa kukama",
  },
  {
    title: "Dečije sobe",
    text: "Kreveti, radni stolovi i ormari prilagođeni uzrastu deteta i prostoru koji imate.",
    image: photo(kidsRoom800, kidsRoom1280),
    alt: "Dečija soba sa krevetom na sprat, policama i belim ormarom",
  },
  {
    title: "Poslovni prostori",
    text: "Radni stolovi, ormari i pultovi po meri za kancelarije, lokale i ordinacije.",
    image: photo(office800, office1280),
    alt: "Kancelarija sa radnim pločama duž zidova i gornjim ormarima u dekoru drveta",
  },
];
