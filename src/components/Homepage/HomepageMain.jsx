import { Fragment, useEffect, useRef, useState } from "react";

const words = ["Ideja", "Dizajn", "Izrada"];

// Each step explains one of the keywords in the heading.
const steps = [
  { title: "Ideja", text: "Dolazimo na merenje i zajedno osmišljavamo rešenje za vaš prostor." },
  { title: "Dizajn", text: "Pre izrade dobijate 3D prikaz, pa tačno znate kako će izgledati." },
  { title: "Izrada", text: "Izrađujemo od kvalitetnih pločastih materijala i sami montiramo." },
];

// On large screens the text moves right, toward the middle, but only as far as leaves room
// for the one-line keywords before the wardrobe in the background video. Everything below the
// keywords wraps to their width, so it stays clear of the wardrobe too.
// The words slide in from the left one after another, and again every time the heading
// scrolls back into view; visitors who prefer reduced motion see them in place right away.
const HomepageMain = () => {
  const headingRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex flex-1 items-center justify-center px-4 pb-8 pt-10 sm:px-8 sm:pt-16 lg:justify-start lg:px-16 lg:py-6 xl:pl-[10%]">
      <div className="flex max-w-xl flex-col items-center gap-6 text-center font-ledger lg:w-min lg:max-w-none lg:items-start lg:gap-8 lg:text-left">
        <h1
          ref={headingRef}
          className="font-fraunces text-[32px] leading-none [text-shadow:0_0_24px_rgba(255,255,255,0.6)] sm:text-[42px] lg:whitespace-nowrap lg:text-[54px] xl:text-[64px]"
        >
          {words.map((word, index) => (
            <Fragment key={word}>
              {index > 0 && " "}
              <span
                // Out of view the words wait hidden, so they don't flash in place before replaying.
                className={`inline-block ${inView ? "motion-safe:animate-[slide-in-left_1s_cubic-bezier(0.22,1,0.36,1)_both]" : "motion-safe:opacity-0"}`}
                style={{ animationDelay: `${200 + index * 350}ms` }}
              >
                {word}
                {index < words.length - 1 && "."}
              </span>
            </Fragment>
          ))}
        </h1>

        <p className="text-base sm:text-lg xl:text-xl">
          Projektujemo i izrađujemo ugradne ormare, garderobere, kuhinje, TV komode i drugi nameštaj po
          meri, za stan, kuću ili kancelariju.
        </p>

        <div className="flex flex-col gap-4">
          <h2 className="font-fraunces text-[24px] leading-tight sm:text-[28px] xl:text-[32px]">
            Od ideje do montaže
          </h2>
          {/* On desktop the step names form a column, so the descriptions line up. */}
          <ol className="flex flex-col gap-4 text-base lg:gap-3 xl:text-lg">
            {steps.map(({ title, text }) => (
              <li key={title} className="flex flex-col lg:flex-row lg:items-baseline lg:gap-5">
                <span className="font-fraunces text-[20px] lg:w-20 lg:shrink-0 xl:text-[22px]">{title}</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>

        <button className="rounded-[30px] bg-wood px-12 py-2 font-bold text-white hover:bg-wood-dark">
          Zakažite merenje
        </button>
      </div>
    </section>
  );
};

export default HomepageMain;
