import { useRef } from "react";
import PropTypes from "prop-types";
import useInView from "../../hooks/useInView";
import { products } from "../../data/products";

// One card: the photo on top, then the name and a sentence. It fades in and rises once when it
// scrolls into view, a little after the cards to its left on the same row.
const ProductCard = ({ title, text, image, alt, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { initial: false, once: true, rootMargin: "0px 0px -10% 0px" });

  return (
    <li
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`flex w-full flex-col overflow-hidden rounded-md bg-[#F9F7F2] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)] ${inView ? "motion-safe:animate-[fade-up_0.8s_ease-out_both]" : "motion-safe:opacity-0"}`}
    >
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
        alt={alt}
        width={1280}
        height={960}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="p-5 lg:p-6">
        <h3 className="font-fraunces text-[22px] leading-tight xl:text-[24px]">{title}</h3>
        <p className="mt-2 font-ledger text-[15px] leading-relaxed text-[#26272E]/80">{text}</p>
      </div>
    </li>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.shape({ src: PropTypes.string.isRequired, srcSet: PropTypes.string, thumb: PropTypes.string })
    .isRequired,
  alt: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

// A grid of equal cards on the hero's lighter green, so the section stands apart from the
// off-white band above and the paper band below. Phones get one column, tablets two, desktop
// three. The cards wrap and centre, so a last row that isn't full sits in the middle instead of
// leaving a gap on the right. The hero's "Pogledajte šta izrađujemo" link and the "Pogledaj
// proizvode" button above link here (#proizvodi).
// No product is the main one, so every card gets the same size, photo format and about the same
// length of text. The list (and where the photos come from) is in src/data/products.js, shared
// with the footer and the quote form.
const HomepageProducts = () => {
  return (
    <section id="proizvodi" aria-labelledby="proizvodi-naslov" className="bg-[#D3D5CA] py-16 text-[#26272E] lg:py-24">
      <div className="page-container">
        <div className="text-center">
          <h2
            id="proizvodi-naslov"
            className="font-fraunces text-[26px] leading-tight sm:text-[30px] lg:text-[34px] xl:text-[40px]"
          >
            Šta izrađujemo
          </h2>
          <p className="mt-3 font-ledger text-[15px] text-[#26272E]/80 xl:text-base">
            Nameštaj po meri, za dom i za poslovni prostor.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-6 lg:mt-14 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.title} {...product} delay={(index % 3) * 120} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomepageProducts;
