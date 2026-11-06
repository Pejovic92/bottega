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
// The words slide in from the left one after another, then the three steps fade in the same way,
// and both play again every time they scroll back into view; visitors who prefer reduced motion
// see everything in place right away.
const useInView = (ref) => {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
};

const HomepageMain = () => {
  const headingRef = useRef(null);
  const stepsRef = useRef(null);
  const inView = useInView(headingRef);
  const stepsInView = useInView(stepsRef);

  return (
    <section className="flex flex-1 items-center justify-center px-4 pb-8 pt-10 sm:px-8 sm:pt-16 lg:pointer-events-none lg:justify-start lg:px-16 lg:py-6 xl:pl-[10%]">
      <div className="flex max-w-xl flex-col items-center gap-4 text-center font-ledger lg:pointer-events-auto lg:w-min lg:max-w-none lg:items-start lg:gap-5 lg:text-left">
        <h1
          ref={headingRef}
          className="font-fraunces text-[26px] font-medium leading-none [text-shadow:0_0_24px_rgba(255,255,255,0.6)] sm:text-[34px] lg:whitespace-nowrap lg:text-[43px] xl:text-[51px]"
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

        <p className="text-[15px] xl:text-base">
          Projektujemo i izrađujemo ugradne ormare, garderobere, kuhinje, TV komode i drugi nameštaj po
          meri, za stan, kuću ili kancelariju.
        </p>

        <div className="flex flex-col gap-3 lg:gap-4">
          <h2 className="font-fraunces text-[22px] leading-tight sm:text-[26px] lg:text-center lg:text-[29px] xl:text-[32px]">
            Od ideje do montaže
          </h2>
          {/* On desktop the step names form a column, so the descriptions line up. Only the names
              are animated: they start appearing as the last heading word lands, while the
              descriptions stay in place. */}
          <ol ref={stepsRef} className="flex flex-col gap-3 text-[15px]">
            {steps.map(({ title, text }, index) => (
              <li key={title} className="flex flex-col lg:flex-row lg:items-baseline lg:gap-4">
                <span
                  className={`font-fraunces text-[17px] lg:w-16 lg:shrink-0 xl:text-[18px] ${stepsInView ? "motion-safe:animate-[step-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]" : "motion-safe:opacity-0"}`}
                  style={{ animationDelay: `${1200 + index * 300}ms` }}
                >
                  {title}
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* An outline button, centered under the text like the heading above it. The brown is darker
            than the wood color so the text keeps 4.5:1 contrast on the green; on hover it fills in. */}
        <button className="h-[58px] rounded-full border-2 border-[#5E3D25] px-[52px] text-[15px] font-bold text-[#5E3D25] transition-colors hover:bg-[#5E3D25] hover:text-white lg:self-center">
          Zakažite merenje
        </button>
      </div>
    </section>
  );
};

export default HomepageMain;
