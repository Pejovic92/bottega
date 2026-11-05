import Logo from "../../assets/logo.png";

// Interim responsive version: links wrap under the logo on phones.
// The mobile menu comes with the layout redesign.
// Text and the divider follow the parent's text color.
const Navbar = () => {
  return (
    <nav className="px-4 sm:px-8 lg:px-16">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b-2 border-current py-4 sm:h-20 sm:py-0">
        <a href="#">
          <img src={Logo} alt="Bottega" width={40} height={40} />
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
