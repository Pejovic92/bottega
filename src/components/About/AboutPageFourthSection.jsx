import "/Users/predragpejovic/WoodpeckerWebReact/src/globals.css";
import backgroundImage from "../../assets/13-2.jpg";

const AboutPageFourthSection = () => {
  return (
    <div className="relative h-[1300px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-[0.65]"></div>

      {/* Content */}
      <div className="relative pt-20 flex justify-center">
        <div className="  text-gray-400  w-[700px] h-[1200px] font-junge ">
          <div className=" h-[160px] flex justify-center pt-6 ">
            <p className="short-top-border custom-text-k text-86 h-[90px] text-gray-400">
              Kvalitet
            </p>
          </div>
          <div className="h-[160px] flex justify-center pt-6 mt-20">
            <p className="short-top-border custom-text-f text-86 h-[90px]">
              Funkcionalnost
            </p>
          </div>
          <div className="h-[160px] flex justify-center pt-6 mt-20">
            <p className="short-top-border custom-text-p text-86 h-[90px]">
              Pristupacnost
            </p>
          </div>
          <div className="h-[160px] flex justify-center pt-6 mt-20">
            <p className="short-top-border custom-text-ps text-86 h-[90px]">
              Posvećenost
            </p>
          </div>
          <div className="h-[160px] flex justify-center pt-6 mt-20">
            <p className="short-top-border custom-text-kr text-86 h-[90px]">
              Kreativnost
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageFourthSection;
