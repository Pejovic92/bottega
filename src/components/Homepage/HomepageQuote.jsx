import { useRef } from "react";
import PropTypes from "prop-types";
import useInView from "../../hooks/useInView";

// A call to ask for a quote, after the process steps: a heading, one sentence and a button,
// centred on a full-width band in the hero's darker green (#BDC1AF), the same on phones and
// desktop (the heading just gets smaller and wraps). It is the page's main call to action, so the
// button is filled dark brown (white on #5E3D25 is 9.7:1), unlike the outline buttons elsewhere.
// Text on the green: 8.1:1, the sentence at 80% 5.2:1. The block fades in and rises once, as the
// statement band does; with reduced motion it is simply there.
// The button opens the quote questionnaire (QuoteDialog, rendered in App).
const HomepageQuote = ({ onRequestQuote }) => {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { initial: false, once: true, rootMargin: "0px 0px -15% 0px" });

  return (
    <section className="bg-[#BDC1AF] py-16 text-[#26272E] lg:py-20">
      <div
        ref={contentRef}
        className={`page-container flex flex-col items-center gap-4 text-center ${inView ? "motion-safe:animate-[fade-up_1s_ease-out_both]" : "motion-safe:opacity-0"}`}
      >
        <h2 className="text-balance font-fraunces text-[26px] leading-tight sm:text-[30px] lg:text-[34px] xl:text-[40px]">
          Zatražite besplatnu ponudu
        </h2>
        <p className="max-w-md font-ledger text-[15px] text-[#26272E]/80 xl:text-base">
          Odgovorite na nekoliko kratkih pitanja, a mi ćemo vam pripremiti ponudu po meri vašeg prostora.
        </p>
        <button
          type="button"
          onClick={onRequestQuote}
          className="mt-4 inline-flex h-[58px] items-center rounded-full bg-[#5E3D25] px-[52px] font-ledger text-[15px] font-bold text-white transition-colors hover:bg-[#4A2F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E3D25] focus-visible:ring-offset-2 focus-visible:ring-offset-[#BDC1AF]"
        >
          Zatražite ponudu
        </button>
      </div>
    </section>
  );
};

HomepageQuote.propTypes = {
  onRequestQuote: PropTypes.func.isRequired,
};

export default HomepageQuote;
