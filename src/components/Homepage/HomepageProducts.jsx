import { useRef } from "react";
import PropTypes from "prop-types";
import useInView from "../../hooks/useInView";
import kitchen800 from "../../assets/products/kitchen-800.jpg";
import kitchen1280 from "../../assets/products/kitchen-1280.jpg";
import wardrobes800 from "../../assets/products/wardrobes-800.jpg";
import wardrobes1280 from "../../assets/products/wardrobes-1280.jpg";
import livingRoom800 from "../../assets/products/living-room-800.jpg";
import livingRoom1280 from "../../assets/products/living-room-1280.jpg";
import hallway800 from "../../assets/products/hallway-800.jpg";
import hallway1280 from "../../assets/products/hallway-1280.jpg";
import kidsRoom800 from "../../assets/products/kids-room-800.jpg";
import kidsRoom1280 from "../../assets/products/kids-room-1280.jpg";
import office800 from "../../assets/products/office-800.jpg";
import office1280 from "../../assets/products/office-1280.jpg";

const photo = (small, large) => ({ src: large, srcSet: `${small} 800w, ${large} 1280w` });

// What Bottega makes to measure. Draft text, to be refined. No product is the main one, so every
// card gets the same size, the same photo format and about the same length of text.
// The photos are free stock images from Pexels (pexels.com/license: commercial use, no credit
// required), cut to 4:3 and resized to 800 and 1280 px; they stand in until there are photos of
// Bottega's own work: pexels.com/photo/ kitchen 6782576, wardrobes 6585745, living room 6527054,
// hallway 6312075, kids' room 7045846, office 33827333 (portrait, cut from its middle).
const products = [
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
  image: PropTypes.shape({ src: PropTypes.string.isRequired, srcSet: PropTypes.string }).isRequired,
  alt: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

// A grid of equal cards on the hero's lighter green, so the section stands apart from the
// off-white band above and the paper band below. Phones get one column, tablets two, desktop
// three. The cards wrap and centre, so a last row that isn't full sits in the middle instead of
// leaving a gap on the right. The "Pogledaj proizvode" button above links here (#proizvodi).
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
