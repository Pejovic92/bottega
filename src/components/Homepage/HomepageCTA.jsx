import "/Users/predragpejovic/WoodpeckerWebReact/src/globals.css"
import homepageWardrobeSketch from './../../assets/homepagewardrobeSketch.png'
import HomepageCTAImage from '../../assets/Fitted-Wardrobes.jpg'

const HomepageCTA = () => {

  return (
<div className="relative">
  <img src={HomepageCTAImage} alt="Your image" className="w-full h-auto" />
  
  <div className="absolute inset-0 flex flex-col  bg-white bg-opacity-50 text-black pt-16 pl-16">
   <div className=" px-16 py-16 bg-slate-400  rounded-[30px] shadow-custom-heavy w-[400px] ">
    <p className="mb-6 font-bree-serif text-24">Zainteresovani ste za nase proizvode ? Istrazite koje proizvode mozemo izraditi za vas po vasoj meri</p>
    <div className="flex items-center justify-center">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
      Pogledaj proizvode
    </button>
    </div>
    </div>
  </div>
</div>


  )
}
export default HomepageCTA
