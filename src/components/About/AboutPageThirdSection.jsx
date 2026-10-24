import RectanglesGrid from "../Recktangle-animation/RectanglesGrid";

const AboutPageThirdSection = () => {
  return (
    <div className=" mt-[64px] flex items-center justify-between border border-red-600 px-16 h-[700px] mb-16">
      <RectanglesGrid />
      <div className="w-full max-w-[900px]   flex flex-col">
        {/* Header Section */}
        <div className="mb-8">
          <p className="p3-4 text-22 font-neuton font-extralight">
            Svaki komad namestaja je napravljen po principu
          </p>
          <p className="pb-3 text-72 font-neuton font-bold">Segmentne izrade</p>
          <p className="pb-20 font-neuton text-22 font-extralight">
            Naša metodologija proizvodnje ormara zasniva se na segmentnom
            principu, gde se svaki deo izrađuje pojedinačno pre konačne montaže.
          </p>
        </div>

        {/* First Row */}
        <div className="flex flex-row mb-16">
          {/* Headline 1 */}
          <div className="flex-1 pr-30">
            <p className="text-24 font-neuton font-bold pb-4">
              Modularnost i prilagodivost
            </p>
            <p className="text-gray-600 text-18 font-neuton text-justify font-light">
              Ovaj pristup omogućava visok nivo prilagođavanja, jer se svaki
              segment može dizajnirati prema specifičnim potrebama i estetskim
              željama klijenta.
            </p>
          </div>

          {/* Headline 2 */}
          <div className="flex-1 pl-36">
            <p className="text-24 font-neuton font-bold pb-4">
              Stabilnost i dugotrajnost
            </p>
            <p className="text-gray-600 text-18 font-neuton text-justify font-light">
              Segmentni pristup omogućava jednostavnije prilagođavanje
              postojećem prostoru. Zahvaljujući ovoj metodi, naši ormari
              odlikuju se izuzetnom stabilnošću i dugotrajnošću..
            </p>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-row">
          {/* Headline 3 */}
          <div className="flex-1  pr-32">
            <p className="text-24 font-neuton font-bold pb-4">
              Preciznost i kvalitet
            </p>
            <p className="text-gray-600 text-18 font-neuton text-justify font-light">
              Koristeći visokokvalitetne materijale poput iverice i medijapana,
              garantujemo trajnost i izdržljivost naših proizvoda. Segmentna
              izrada pruža fleksibilnost u dizajnu, omogućavajući kombinovanje
              različitih boja, tekstura i završnih obrada.
            </p>
          </div>

          {/* Headline 4 */}
          <div className="flex-1 pl-4">
            <p className="text-24 font-neuton font-bold pb-4">
              Posvecenost detaljnima
            </p>
            <p className="text-gray-600 text-18 font-neuton text-justify font-light">
              Verujemo da je pažnja prema detaljima ključ uspeha. Kroz ovaj
              pristup, u mogućnosti smo da ispunimo i najzahtevnije projekte,
              pružajući visokokvalitetne proizvode po meri.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageThirdSection;
