import { useRef, useState } from "react";
import apartment800 from "../../assets/process/step1-apartment-800.jpg";
import apartment1400 from "../../assets/process/step1-apartment-1400.jpg";
import sketch from "../../assets/sketch.jpeg";
import decors800 from "../../assets/process/chipboard_options2-800.jpg";
import decors1215 from "../../assets/process/chipboard_options2.jpg";
import boards800 from "../../assets/process/step4-boards-800.jpg";
import boards1400 from "../../assets/process/step4-boards-1400.jpg";
import kitchen800 from "../../assets/process/step5-kitchen-800.jpg";
import kitchen1400 from "../../assets/process/step5-kitchen-1400.jpg";
import finished800 from "../../assets/process/step6-finished-800.jpg";
import finished1400 from "../../assets/process/step6-finished-1400.jpg";

// The road from the first visit to the finished piece. Draft text, to be refined.
// Step 2 shows a SketchUp design (sketch.jpeg) and step 3 a fan of board decors
// (chipboard_options2.jpg). Steps 1, 4 and 5 are photos of a real job, added in place of stock
// images: an empty kitchen before measuring (appartment.jpeg, full frame, retouched so only the
// walls show: a cabinet carcass, a loose board and a cable in the bottom-right corner were painted
// out; the result is appartment-retouched.jpeg), edge-banded oak-decor strips on the bench
// (workshop_assembling.jpeg, cut high enough to keep the drill battery and tools in view) and the
// kitchen being fitted (kitchen_montage2.jpeg). The last two are portrait shots, cut to 4:3 to fit
// the frame. All three are resized to 800 and 1400 px. Step 6 is
// still a free Pexels stand-in (pexels.com/license: commercial use, no credit required):
// pexels.com/photo/6782465.
const steps = [
  {
    title: "Izlazak na teren",
    lead: "Put do vašeg nameštaja počinje ovde.",
    text: "Dolazimo kod vas, upoznajemo prostor i precizno ga merimo. Razgovaramo o vašim željama, navikama i budžetu, jer od toga zavisi svaki sledeći korak.",
    image: { src: apartment1400, srcSet: `${apartment800} 800w, ${apartment1400} 1400w` },
    alt: "Prazna kuhinja pre izrade: zidovi sa pločicama, utičnicama i priključcima za vodu",
  },
  {
    title: "Idejno rešenje i 3D prikaz",
    lead: "Vidite nameštaj pre nego što nastane.",
    text: "Na osnovu mera i razgovora pravimo predlog rešenja i 3D prikaz: raspored, unutrašnju organizaciju, boje i materijale. Tačno znate kako će izgledati u vašem prostoru.",
    image: { src: sketch },
    alt: "3D model ugaonog garderobera sa merama, napravljen u SketchUp-u",
  },
  {
    title: "Usaglašavanje i ponuda",
    lead: "Svaki detalj po vašoj meri.",
    text: "Zajedno doterujemo rešenje: dekore, ručke, okove, police i fioke. Kad je sve dogovoreno, dobijate konačnu ponudu i rok izrade.",
    image: { src: decors1215, srcSet: `${decors800} 800w, ${decors1215} 1215w` },
    alt: "Lepeza uzoraka pločastih materijala u različitim tonovima drveta",
  },
  {
    title: "Izrada u radionici",
    lead: "Preciznost u svakom delu.",
    text: "Kada je sve dogovoreno, u radionici izrađujemo i sklapamo vaš nameštaj i pripremamo ga za isporuku.",
    image: { src: boards1400, srcSet: `${boards800} 800w, ${boards1400} 1400w` },
    alt: "Isečene letvice od iverice u dekoru hrasta, sa nalepljenom kant trakom, na radnom stolu okružene alatom",
  },
  {
    title: "Isporuka i montaža",
    lead: "Spremno za upotrebu.",
    text: "Dovozimo i montiramo nameštaj, podešavamo vrata i fioke i ostavljamo prostor uredan.",
    image: { src: kitchen1400, srcSet: `${kitchen800} 800w, ${kitchen1400} 1400w` },
    alt: "Kuhinja u montaži: visoki regal sa policama u dekoru hrasta, pored korpusa donjih i gornjih elemenata",
  },
  {
    title: "Uživajte u novom prostoru",
    lead: "Nameštaj koji traje.",
    text: "Vaš novi nameštaj je spreman za svakodnevni život. Ako i kasnije nešto zatreba, tu smo da pomognemo.",
    image: { src: finished1400, srcSet: `${finished800} 800w, ${finished1400} 1400w`, position: "50% 55%" },
    alt: "Gotov garderober sa policama, fiokama i osvetljenjem",
  },
];

// Numbered tabs with every step's name always in view, and below them the chosen step's text and
// photo. The tabs follow the usual tab pattern for keyboards and screen readers: arrow keys, Home
// and End move between steps. On phones the row of tabs scrolls sideways.
const HomepageProcess = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const step = steps[active];

  const select = (index) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event) => {
    const last = steps.length - 1;
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(Math.min(Math.max(next, 0), last));
  };

  return (
    <section className="bg-paper py-16 text-[#26272E] lg:py-24">
      <div className="page-container">
        <div className="text-center">
          <h2 className="font-fraunces text-[26px] leading-tight sm:text-[30px] lg:text-[34px] xl:text-[40px]">
            Put do vašeg nameštaja
          </h2>
          <p className="mt-3 font-ledger text-[15px] text-[#26272E]/75 xl:text-base">
            Od prvog merenja do gotovog prostora, u šest koraka.
          </p>
        </div>

        <div className="relative -mx-4 mt-10 sm:-mx-8 lg:mx-0 lg:mt-14">
          {/* The thin line that links the numbers on desktop. */}
          <span aria-hidden="true" className="absolute left-[8.33%] right-[8.33%] top-5 hidden border-t border-[#BDC1AF] lg:block" />
          <div
            role="tablist"
            aria-label="Koraci od merenja do montaže"
            onKeyDown={onKeyDown}
            className="relative flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:px-8 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0"
          >
            {steps.map(({ title }, index) => {
              const selected = index === active;
              return (
                <button
                  key={title}
                  ref={(el) => (tabRefs.current[index] = el)}
                  role="tab"
                  id={`process-tab-${index}`}
                  aria-selected={selected}
                  aria-controls="process-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`group flex min-w-[124px] shrink-0 snap-start flex-col items-center gap-2 rounded-md px-1 py-1 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E3D25]/50 lg:min-w-0 ${selected ? "text-[#26272E]" : "text-[#26272E]/60 hover:text-[#26272E]"}`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border font-fraunces text-[16px] transition-colors ${selected ? "border-[#5E3D25] bg-[#5E3D25] text-white" : "border-[#BDC1AF] bg-paper group-hover:border-[#5E3D25]"}`}
                  >
                    {index + 1}
                  </span>
                  <span className="font-ledger text-[14px] leading-snug xl:text-[15px]">{title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={active}
          role="tabpanel"
          id="process-panel"
          aria-labelledby={`process-tab-${active}`}
          className="mt-10 grid items-center gap-8 motion-safe:animate-[fade-up_0.5s_ease-out] lg:mt-14 lg:grid-cols-2 lg:gap-16"
        >
          <div className="text-center lg:text-left">
            <p className="font-ledger text-[13px] uppercase tracking-[0.15em] text-[#5E3D25]">
              Korak {active + 1} od {steps.length}
            </p>
            <h3 className="mt-3 font-fraunces text-[24px] leading-tight sm:text-[28px] xl:text-[32px]">{step.title}</h3>
            <p className="mt-2 font-ledger text-base text-[#5E3D25] xl:text-lg">{step.lead}</p>
            <p className="mx-auto mt-4 max-w-md font-ledger text-[15px] leading-relaxed text-[#26272E]/80 lg:mx-0 xl:text-base">
              {step.text}
            </p>
            <div className="mt-8 flex justify-center gap-6 font-ledger text-[15px] lg:justify-start">
              <button
                onClick={() => setActive(active - 1)}
                disabled={active === 0}
                className="text-[#5E3D25] underline-offset-4 hover:underline disabled:hidden"
              >
                ← Prethodni korak
              </button>
              <button
                onClick={() => setActive(active + 1)}
                disabled={active === steps.length - 1}
                className="text-[#5E3D25] underline-offset-4 hover:underline disabled:hidden"
              >
                Sledeći korak →
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <img
              src={step.image.src}
              srcSet={step.image.srcSet}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt={step.alt}
              loading="lazy"
              style={step.image.position ? { objectPosition: step.image.position } : undefined}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageProcess;
