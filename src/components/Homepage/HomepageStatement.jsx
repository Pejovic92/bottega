import { useRef } from "react";
import useInView from "../../hooks/useInView";

// A pause between the hero and the next section: one sentence on the warmer paper tone (a shade
// darker than the navbar and the photo band below, so the two bands stay apart), on a
// single line from desktop width up (it wraps on phones). It fades in and rises a little once,
// when it has scrolled a bit into view; with reduced motion it is simply there. "vaš" carries the
// button's dark brown (8.6:1 on this background).
const HomepageStatement = () => {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { initial: false, once: true, rootMargin: "0px 0px -15% 0px" });

  return (
    <section className="bg-paper px-6 py-16 text-[#26272E] sm:px-8 sm:py-20 lg:py-24">
      <div
        ref={contentRef}
        className={`mx-auto flex max-w-xl flex-col items-center gap-4 text-center lg:max-w-none ${inView ? "motion-safe:animate-[fade-up_1.2s_ease-out_both]" : "motion-safe:opacity-0"}`}
      >
        <span aria-hidden="true" className="h-0.5 w-10 bg-[#5E3D25]" />
        <p className="text-balance font-fraunces text-[22px] leading-snug sm:text-[26px] lg:whitespace-nowrap lg:text-[31px] xl:text-[35px]">
          Svaki komad nameštaja pravimo za jedan prostor: <span className="text-[#5E3D25]">vaš.</span>
        </p>
      </div>
    </section>
  );
};

export default HomepageStatement;
