import HomepageCTAImage from "../../assets/Fitted-Wardrobes.jpg";

// Text on the left, the photo on the right (on phones: text first, then the photo). Both sit in
// the page container, so they keep a margin from the window's edges, and the photo has rounded
// corners; the background still runs edge to edge.
// On desktop the row is 36vw tall, between 388px and 572px. The button matches the hero's and is a
// link down to the products section (#proizvodi).
const HomepageCTA = () => {
  return (
    <section className="bg-[#F9F7F2] py-10 text-[#26272E] sm:py-12 lg:py-16">
      <div className="page-container flex flex-col gap-4 lg:grid lg:min-h-[max(388px,min(36vw,572px))] lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-center justify-center gap-5 py-8 text-center font-ledger lg:items-start lg:text-left">
          <h2 className="max-w-md font-fraunces text-[26px] leading-tight sm:text-[30px] xl:text-[36px]">
            Zainteresovani ste za naše proizvode?
          </h2>
          <p className="max-w-md text-[15px] xl:text-base">Istražite koje proizvode možemo izraditi za vas, po vašoj meri.</p>
          <a
            href="#proizvodi"
            className="mt-2 inline-flex h-[58px] items-center rounded-full border-2 border-[#5E3D25] px-[52px] text-[15px] font-bold text-[#5E3D25] transition-colors hover:bg-[#5E3D25] hover:text-white"
          >
            Pogledaj proizvode
          </a>
        </div>

        <div className="relative h-64 overflow-hidden rounded-md sm:h-80 lg:h-auto">
          <img
            src={HomepageCTAImage}
            alt="Svetli ugradni ormar sa otvorenim drvenim policama u spavaćoj sobi"
            width={983}
            height={644}
            className="absolute inset-0 h-full w-full object-cover object-[55%_40%]"
          />
        </div>
      </div>
    </section>
  );
};

export default HomepageCTA;
