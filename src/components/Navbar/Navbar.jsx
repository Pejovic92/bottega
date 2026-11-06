// The Bottega wordmark, cut out of the white-on-black bottega-logo-dark.jpeg as a transparent PNG
// in the header's text color (#26272E), at 3x its desktop size.
import Logo from "../../assets/bottega-logo-header.png";

// Interim responsive version: links wrap under the logo on phones.
// The mobile menu comes with the layout redesign.
// It sits on its own off-white band (paler than the paper token): the edge where the hero's green
// begins replaces the old divider line, with a soft shadow to lift it off the green (it sits above
// the hero's 3D model, hence z-10). The text follows the parent's text color.
const Navbar = () => {
  return (
    <nav className="relative z-10 bg-[#F9F7F2] px-4 shadow-[0_2px_12px_rgba(38,39,46,0.15)] sm:px-8 lg:px-16">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4 sm:h-20 sm:py-0">
        <a href="#">
          <img src={Logo} alt="Bottega Furniture" width={553} height={160} className="h-9 w-auto sm:h-10 lg:h-12" />
        </a>

        <ul className="flex flex-wrap gap-x-4 gap-y-1 font-junge text-sm sm:gap-x-8 sm:text-base lg:gap-x-12 lg:text-[18px]">
          <li><a href="#">Početna</a></li>
          <li><a href="#">O nama</a></li>
          <li><a href="#">Izrada: korak po korak</a></li>
          <li><a href="#">Kontakt</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
