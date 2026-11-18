import photo800 from "../../assets/wardrobeAboutImage-800.jpg";
import photo1280 from "../../assets/wardrobeAboutImage-1280.jpg";
import photo1920 from "../../assets/wardrobeAboutImage-1920.jpg";
import photo2400 from "../../assets/wardrobeAboutImage.jpeg";

// Shortened from eleven paragraphs to an intro and three points, keeping what the old text said
// that the hero doesn't already cover (the steps from measuring to installation live there).
const points = [
  {
    title: "Sve počinje razgovorom",
    text: "Svaki projekat započinjemo detaljnim razgovorom, da bismo razumeli vaše želje, prostor i način života.",
  },
  {
    title: "Izrada koja traje",
    text: "Kvalitetni materijali, moderne tehnike izrade i pažnja prema detaljima čine nameštaj i lepim i dugotrajnim.",
  },
  {
    title: "Saveti za vaš prostor",
    text: "Pored izrade, pomažemo vam savetima da svaki kutak prostora iskoristite na najbolji način.",
  },
];

// The walk-in wardrobe photo is the section's full-width background, darkened so the light text
// reads well; the text sits in the page container like the rest of the page.
// The photo is a real <img> with several sizes, so phones download the 800px version instead of
// 2400px, and the section is as tall as its text instead of a fixed 1000px.
const AboutPageFirstSection = () => {
  return (
    <section className="relative isolate overflow-hidden text-paper">
      <img
        src={photo1920}
        srcSet={`${photo800} 800w, ${photo1280} 1280w, ${photo1920} 1920w, ${photo2400} 2400w`}
        sizes="100vw"
        alt=""
        width={2400}
        height={1520}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />

      <div className="page-container py-16 text-center lg:py-24">
        <h2 className="font-fraunces text-[26px] leading-tight sm:text-[30px] lg:text-[34px] xl:text-[40px]">
          Savršenstvo u dizajnu i izradi
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-ledger text-[15px] leading-relaxed sm:text-base lg:text-lg">
          Dizajniramo i izrađujemo ormare i ostali nameštaj od pločastih materijala, za vaš dom ili
          kancelariju. Svaki komad pravimo po meri, tako da spoji funkcionalnost, estetiku i vaš stil.
        </p>

        <ul className="mx-auto mt-12 grid max-w-6xl gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-16 lg:gap-12">
          {points.map(({ title, text }) => (
            <li key={title}>
              <h3 className="font-fraunces text-[19px] xl:text-[21px]">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs font-ledger text-[15px] leading-relaxed text-paper/85">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutPageFirstSection;
