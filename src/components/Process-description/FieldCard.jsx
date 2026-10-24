import { useState, useEffect } from "react";
import Logo from "../../assets/home.gif";
import { useInView } from "./useInView";
import cardImage from "../../assets/process-description-assets/room.png";
import rotateLogo from "../../assets/rotate.gif";

function FieldCard() {
  const [cardRef, inView] = useInView(0.1);
  const [animate, setAnimate] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (inView) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 2000); // Duration of rotateIn animation

      return () => clearTimeout(timer);
    }
  }, [inView]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flip-card-container">
      <div
        ref={cardRef}
        className={`flip-card ${animate ? "animate-rotateIn" : ""} ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="flip-card-front flex flex-col ">
          {/* Front Content */}

          <div className="border  w-full h-[20%] flex justify-center pt-2 bg-red-100">
            <img
              src={cardImage}
              className="w-[220px] h-40 border border-red-300 rounded-3xl object-contain object-center absolute top-10 left-1/2 transform -translate-x-1/2 "
            />
          </div>
          <div className="border w-full  h-[65%] font-serif text-xl text-center pt-32  bg-red-200">
            <p className="text-36">Izlazak na teren</p>
            <p className="pt-10 font-neuton">
              Put do vaseg namestaja pocinje ovde
            </p>
          </div>
          <div className="border w-full h-[15%]  bg-red-300 flex  items-center justify-between">
            <img src={Logo} className="w-12 h-12 ml-3" />
            <div className="flex justify-normal mr-2">
              <button className="text-16 font-junge" onClick={handleFlip}>
                Detaljnije
              </button>
              <img src={rotateLogo} className="w-6 h-6 ml-2" />
            </div>
          </div>
        </div>

        <div className="flip-card-back bg-gray-200 flex flex-col items-center justify-center p-4">
          {/* Back Content */}

          <p>
            Naš proces započinje izlaskom na teren kako bismo se upoznali s
            vašim prostorom. Naš tim dolazi kod vas kako bismo detaljno
            sagledali prostor gde će vaš novi ormar biti smešten. Ovaj korak je
            ključan za precizno planiranje i dizajn.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleFlip}
          >
            Flip Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default FieldCard;
