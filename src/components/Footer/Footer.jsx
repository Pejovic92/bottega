import PropTypes from "prop-types";
import Logo from "../../assets/bottega-logo-header.png";
import { contact, locations } from "../../data/contact";
import { products } from "../../data/products";

// Simple line icons in the text colour (24×24, 1.5 stroke), drawn here so no icon library is needed.
const icons = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
};

const Icon = ({ name }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 shrink-0 text-[#5E3D25]"
  >
    {icons[name]}
  </svg>
);

Icon.propTypes = { name: PropTypes.oneOf(Object.keys(icons)).isRequired };

const ColumnTitle = ({ children }) => (
  <h2 className="font-ledger text-[13px] uppercase tracking-[0.15em] text-[#5E3D25]">{children}</h2>
);

ColumnTitle.propTypes = { children: PropTypes.node.isRequired };

const linkClass = "transition-colors hover:text-[#5E3D25] hover:underline underline-offset-4";

// A shortened version of a common furniture-maker footer: on the left the logo, one line about
// Bottega and the contact details (email, phone, Instagram); then link columns with small
// letter-spaced titles: the products, and the gallery with the places Bottega works in below it.
// Under everything a thin green line, then the copyright and the credit for the hero's 3D model:
// side by side on desktop, one under the other on phones.
// It sits on the navbar's off-white band, so the page starts and ends on the same colour, and it
// stands apart from the green quote band above. Phones: the logo and contacts on top, the two link
// columns side by side below; desktop: three columns.
// The contact block carries id="kontakt", for a "Kontakt" link in the navbar. The gallery link
// (#galerija) has no target yet.
// Text: #26272E at 80% is 7.4:1 on #F9F7F2, the brown titles 9.0:1, the copyright line (75%) 6.3:1.
const Footer = () => {
  return (
    <footer className="bg-[#F9F7F2] text-[#26272E]">
      <div className="page-container py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[2fr_1fr_1fr] lg:gap-x-16">
          <div id="kontakt" className="col-span-2 lg:col-span-1">
            <a href="#" className="inline-block">
              <img src={Logo} alt="Bottega Furniture" width={553} height={160} loading="lazy" className="h-10 w-auto lg:h-12" />
            </a>
            <p className="mt-4 max-w-xs font-ledger text-[15px] text-[#26272E]/80">
              Nameštaj po meri, za dom i za poslovni prostor.
            </p>
            <ul className="mt-6 flex flex-col gap-3 font-ledger text-[15px]">
              <li>
                <a href={`mailto:${contact.email}`} className={`inline-flex items-center gap-3 ${linkClass}`}>
                  <Icon name="mail" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phone.href} className={`inline-flex items-center gap-3 ${linkClass}`}>
                  <Icon name="phone" />
                  {contact.phone.label}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 ${linkClass}`}
                >
                  <Icon name="instagram" />
                  {contact.instagram.label}
                  <span className="sr-only">(Instagram, otvara se u novom prozoru)</span>
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Proizvodi">
            <ColumnTitle>Proizvodi</ColumnTitle>
            <ul className="mt-4 flex flex-col gap-2 font-ledger text-[15px] text-[#26272E]/80">
              {/* No product pages yet, so each one leads to the products section. */}
              {products.map(({ title }) => (
                <li key={title}>
                  <a href="#proizvodi" className={linkClass}>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-8">
            <nav aria-label="Radovi">
              <ColumnTitle>Radovi</ColumnTitle>
              <ul className="mt-4 font-ledger text-[15px] text-[#26272E]/80">
                <li>
                  <a href="#galerija" className={linkClass}>
                    Galerija
                  </a>
                </li>
              </ul>
            </nav>
            <div>
              <ColumnTitle>Lokacije</ColumnTitle>
              <ul className="mt-4 flex flex-col gap-2 font-ledger text-[15px] text-[#26272E]/80">
                {locations.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[#BDC1AF] pt-6 font-ledger text-[13px] text-[#26272E]/75 lg:flex-row lg:justify-between lg:gap-8">
          <p>© {new Date().getFullYear()} Bottega. Sva prava zadržana.</p>
          {/* The hero's 3D wardrobe is licensed CC BY 4.0, which requires this credit as long as
              the model is used. Its links are underlined because they sit inside a sentence. */}
          <p>
            3D model ormara:{" "}
            <a
              href="https://sketchfab.com/3d-models/wardrobe-25122-ede879655ff444a2831dde070370b20c"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-[#5E3D25]"
            >
              Wardrobe 25122
            </a>
            , autor saintkastiell, licenca{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-[#5E3D25]"
            >
              CC BY 4.0
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
