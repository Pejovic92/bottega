import "/Users/predragpejovic/WoodpeckerWebReact/src/globals.css";
import backgroundImage from "../../assets/wardrobeAboutImage.jpeg";

const AboutPageFirstSection = () => {
  return (
    <div className="relative h-[1000px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-[0.60]"></div>

      {/* Content */}
      <div className="relative flex justify-center text-gray-400 pt-20 text-56">
        <p className=" w-2/5 text-center font-ledger">
          Savršenstvo u dizajnu i izradi - od ideje do realizacije
        </p>
      </div>

      <div className="relative flex justify-between pt-40 mx-16 font-ledger text-18 text-justify  text-gray-400">
        <div className=" w-[420px] -tracking-[-1px]">
          <p className="pb-4 pt-4">
            Nudimo dizajn i izradu ormara i ostalog namestaja od pločastih
            materijala, s ciljem da vam pružimo funkcionalna i estetski
            privlačna rešenja za vaš dom ili kancelariju.
          </p>
          <p className="pb-4">
            Posvećeni smo visokim standardima kvaliteta i pažnji prema
            detaljima. Svaki naš proizvod izrađujemo po meri, prilagođen vašim
            specifičnim potrebama i željama.
          </p>
          <p className="pb-4">
            Koristimo kvalitetne materijale i moderne tehnike izrade kako bismo
            osigurali da naši ormari nisu samo praktični, već i estetski
            privlačni, pri cemu su kvalitetni i dugotrajni.
          </p>
          <p className="pb-4">
            Naš cilj je da stvorimo prostor koji odražava vaš stil i unapređuje
            vašu svakodnevicu. Za nas je svaki komad nameštaja jedinstven, baš
            kao i prostor u koji ga unosimo, i svaki projekat shvatamo kao
            priliku da zajedno sa vama stvorimo nešto što će trajati i u čemu
            ćete uživati.
          </p>
        </div>

        <div className="  w-[420px] -tracking-[-1px]">
          <p className="pb-4 pt-4">
            U saradnji sa vama, kreiramo dizajn koji se savršeno uklapa u vaš
            prostor, bilo da je reč o ormaru ili nekom drugom komadu nameštaja.
            Svaki projekat započinjemo detaljnom konsultacijom kako bismo što
            bolje razumeli vaše želje i potrebe
          </p>

          <p className="pb-4">
            U fazi dizajna, trudimo se da spojimo estetiku i funkcionalnost. Naš
            cilj je da svaki komad nameštaja bude prilagođen vašem svakodnevnom
            životu, ali i da unese dozu stila i modernog dizajna.
          </p>

          <p className="pb-4">
            Naša snaga leži u pažnji prema detaljima, kreativnosti i
            posvećenosti svakom klijentu. Pozivamo vas da zajedno kreiramo
            nameštaj koji će odgovarati vašem prostoru i načinu života. Ako
            tražite unikatna rešenja prilagođena vašim potrebama, tu smo da vam
            pomognemo da vaša vizija postane stvarnost.
          </p>
        </div>

        <div className=" w-[420px] -tracking-[-1px]">
          <p className="pb-4 pt-4">
            Naša usluga obuhvata sve faze - od idejnog rešenja, preko preciznog
            merenja i dizajna, do same montaže. Trudimo se da budemo
            transparentni i profesionalni u svakom koraku.
          </p>

          <p className="pb-4">
            Naša strast prema dizajnu i funkcionalnosti vodi nas ka stalnom
            unapređenju naših proizvoda i usluga. Slušamo vaše povratne
            informacije i trudimo se da svakim novim projektom budemo još bolji
          </p>

          <p className="pb-4">
            Pored izrade ormara, pružamo i konsultacije kako bismo vam pomogli
            da optimalno iskoristite vaš prostor.
          </p>

          <p className="pb-4">
            Radujemo se prilici da sarađujemo i kreiramo nešto posebno za vas.
            Ukoliko imate bilo kakvih pitanja ili želite da započnete projekat,
            slobodno nas kontaktirajte. Tu smo da vam pomognemo da vaši snovi
            postanu stvarnost.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPageFirstSection;
