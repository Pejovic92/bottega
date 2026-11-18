import photo960 from "../../assets/13-2-960.jpg";
import photo1920 from "../../assets/13-2.jpg";

// The values moved out of the CSS (::after content) into the page, so they can be read, selected
// and translated.
const values = [
  { title: "Kvalitet", text: "Kvalitetni materijali i precizna izrada" },
  { title: "Funkcionalnost", text: "Praktičan dizajn prilagođen vašim potrebama" },
  { title: "Pristupačnost", text: "Rešenja za svačiji budžet" },
  { title: "Posvećenost", text: "Vaše zadovoljstvo je naš prioritet" },
  { title: "Kreativnost", text: "Inovativna rešenja za jedinstven dizajn" },
];

// The walk-in wardrobe photo on the left and the values on the right, one under the other, each
// with a short line in small type below it (on phones: the photo first, then the values). The
// photo shows in full colour now that no text sits on it, and phones get a 960px version.
// Trying out page margins here: the background runs edge to edge, but the photo and the values
// sit inside the page container, and the photo has rounded corners.
const AboutPageFourthSection = () => {
  return (
    <section className="bg-[#F9F7F2] py-10 text-[#26272E] sm:py-12 lg:py-16">
      <div className="page-container flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="relative h-72 overflow-hidden rounded-md sm:h-96 lg:h-auto">
          <img
            src={photo1920}
            srcSet={`${photo960} 960w, ${photo1920} 1920w`}
            sizes="(min-width: 1024px) 45vw, 100vw"
            alt="Prostrana garderoberna soba sa tamnim policama, osvetljenjem i tapaciranim tabureom u sredini"
            width={1920}
            height={1440}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <ul className="flex flex-col items-center justify-center gap-10 py-8 text-center lg:gap-12 lg:py-8">
          {values.map(({ title, text }) => (
            <li key={title}>
              {/* A 1px line in the hero's darker green above each value, 60% as wide. It is a border:
                  browsers snap borders to whole pixels, so every line comes out the same, while a box
                  with a fractional height renders thicker or thinner depending on where it lands. */}
              <span aria-hidden="true" className="mx-auto mb-2 block w-3/5 border-t border-[#BDC1AF]" />
              <h3 className="font-fraunces text-[28px] leading-none sm:text-[32px] xl:text-[38px]">{title}</h3>
              <p className="mt-1 font-ledger text-[15px] text-[#26272E]/75">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutPageFourthSection;
