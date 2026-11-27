import { Fragment, useRef } from "react";
import PropTypes from "prop-types";
import useInView from "../../hooks/useInView";
import { locations } from "../../data/contact";

const words = ["Ideja", "Dizajn", "Izrada"];

// The hero text: a small brown line with what Bottega makes and where, the three keywords as the
// big heading, one sentence, a button and a link. The filled button, "Zakažite merenje", is the
// one main action and opens the quote questionnaire. "Pogledajte šta izrađujemo" is a plain
// underlined link with an arrow, leading down to the products section, whose heading is "Šta
// izrađujemo".
// Phones and tablets: centred above the wardrobe, the link under the button on phones. Desktop: on
// the left, next to the wardrobe. The heading and the brown line don't wrap there, and everything
// else wraps within their width, so the text stays clear of the wardrobe; on large screens it moves
// right, toward the middle, but only as far as that leaves room.
// The sentence is narrower than the heading, with lines of about equal length, and on desktop it
// has a little more room around it, so the button and the link read as a group of their own.
// The heading is Fraunces at its regular weight, with the full stops in the brown accent.
// Contrast on the hero's green (#BDC1AF): the brown 5.3:1, the sentence (#26272E at 80%) 5.2:1,
// white on the brown button 9.7:1.
// The heading's words slide in from the left one after another, and again every time they scroll
// back into view; visitors who prefer reduced motion see them in place right away. The rest stays
// still.
const HomepageMain = ({ onRequestQuote }) => {
  const headingRef = useRef(null);
  const inView = useInView(headingRef);

  return (
    <section className="flex flex-1 items-center justify-center px-4 pb-10 pt-10 sm:px-8 sm:pt-16 lg:pointer-events-none lg:justify-start lg:px-16 lg:py-6 xl:pl-[10%]">
      <div className="flex max-w-xl flex-col items-center text-center font-ledger lg:pointer-events-auto lg:w-min lg:max-w-none lg:items-start lg:text-left">
        {/* On phones the places go on a line of their own. The dots are only for the eye. */}
        <p className="text-[12px] uppercase tracking-[0.15em] text-[#5E3D25] sm:text-[13px] lg:whitespace-nowrap">
          Nameštaj po meri{" "}
          <span aria-hidden="true" className="max-sm:hidden">
            ·
          </span>
          <br className="sm:hidden" />{" "}
          {locations.map((place, index) => (
            <Fragment key={place}>
              {index > 0 && (
                <>
                  {" "}
                  <span aria-hidden="true">·</span>{" "}
                </>
              )}
              {place}
            </Fragment>
          ))}
        </p>

        <h1
          ref={headingRef}
          className="mt-4 text-balance font-fraunces text-[34px] leading-[1.05] sm:text-[48px] lg:whitespace-nowrap lg:text-[52px] xl:text-[64px] 2xl:text-[72px]"
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
                <span className="text-[#5E3D25]">.</span>
              </span>
            </Fragment>
          ))}
        </h1>

        {/* Non-breaking spaces keep "TV komode", "drugi nameštaj" and "po meri" on one line. The
            widths are in em, so a line holds as many letters at every text size; on desktop, 26em
            just fits "garderobere, kuhinje, TV komode i drugi nameštaj" (25em), and the sentence
            breaks into three lines at its commas. */}
        <p className="mt-5 max-w-[21em] text-balance text-[16px] leading-relaxed text-[#26272E]/80 sm:max-w-[24.5em] sm:text-[17px] lg:mt-6 lg:max-w-[26em] xl:text-[19px]">
          Projektujemo i izrađujemo ugradne ormare, garderobere, kuhinje, TV&nbsp;komode i
          drugi&nbsp;nameštaj po&nbsp;meri, za stan, kuću ili kancelariju.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 lg:mt-10 lg:justify-start">
          {/* As tall as the page's other big buttons; on phones as wide as fits, up to 300px. */}
          <button
            type="button"
            onClick={onRequestQuote}
            className="inline-flex h-[58px] w-full max-w-[300px] items-center justify-center rounded-full bg-[#5E3D25] px-8 text-[15px] font-bold text-white transition-colors hover:bg-[#4A2F1C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E3D25] sm:w-auto"
          >
            Zakažite merenje
          </button>
          {/* On hover the underline turns solid and the arrow moves a little to the right. */}
          <a
            href="#proizvodi"
            className="group inline-flex items-center gap-2.5 py-2.5 text-[15px] font-bold text-[#5E3D25] underline decoration-[#5E3D25]/45 decoration-1 underline-offset-[7px] transition-colors hover:decoration-[#5E3D25] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E3D25]"
          >
            Pogledajte šta izrađujemo
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
            >
              <path d="M3 9h12M10 4l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

HomepageMain.propTypes = {
  onRequestQuote: PropTypes.func.isRequired,
};

export default HomepageMain;
