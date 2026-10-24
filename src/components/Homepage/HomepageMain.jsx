import designLogo from '../../assets/design-icon.png'
import consultLogo from '../../assets/consult-icon.png'
import makeLogo from '../../assets/make-icon.png'
import homepageWardrobeImage from '../../assets/homepageWardrobe.png'
import arrowDown from '../../assets/left-down.png'

const HomepageMain = () => {
  return (

    <div className="flex justify-between mt-24 ">

    <div className="border border-black w-[900px]  ml-16" >

  <div className="border border-black h-[130px] flex items-start justify-start">

    <span className="text-86 font-bree-serif text-headlinesColor text-shadow-custom-medium">Dizajn</span>
    <span className=" relative right-[195px] top-[110px] border-b-[3px] border-black block  w-[210px] filter blur-3"></span>    {/*/filter blur-2 */}
    <span className=" relative right-[198px] top-[65px] border-r-[3px] border-black block h-[45px] filter blur-3"></span>
    <span className=" relative right-[192px] top-[57px] border-b-[3px] border-black block w-[110px] filter blur-3"></span>
     <span className="relative top-[111px] right-[525px] transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45 filter blur-2"></span> 
    <span className="relative right-[321px] top-[58px] transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45 filter blur-2"></span>
    <img src={designLogo} className="w-[36px] h-[36px] relative right-[598px] top-[92px] opacity-35"/>
   
    </div>

  <div className="border border-black mt-14 ml-32 h-[130px] flex items-start justify-start ">
    <span className="text-86 font-bree-serif  text-headlinesColor text-shadow-custom-medium"> Konsultacije </span>
    <img src={consultLogo} className=" relative top-[90px] right-[486px] opacity-35"/>
    <span className="relative top-[111px] right-[470px] transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45 filter blur-3"></span>
    <span className=" absolute left-[255px] top-[476px] border-b-[3px] border-black block  w-[448px] filter blur-3"></span> 
    <span className=" absolute left-[700px] top-[431px] border-r-[3px] border-black block h-[45px] filter blur-3"></span>
    <span className=" absolute left-[709px] top-[423px] border-b-[3px] border-black block  w-[110px] filter blur-3"></span> 
    <span className="absolute top-[424px] left-[702px] transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45 filter blur-3"></span>
  </div>


  <div className="border border-black mt-10 ml-[430px] h-[130px] flex items-start justify-start">
    <span className="text-86 font-bree-serif  text-headlinesColor text-shadow-custom-medium">Izrada</span>
    <img src={makeLogo} className=" relative top-[90px] right-[259px] opacity-35"/>
    <span className="absolute top-[645px] left-[550px] transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45 filter blur-3"></span>
    <span className=" absolute left-[557px] top-[644px] border-b-[3px] border-black block  w-[220px] filter blur-3"></span> 
    <span className=" absolute left-[774px] top-[600px] border-r-[3px] border-black block h-[45px] filter blur-3"></span>
    <span className="absolute top-[593px] left-[775px] transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45 filter blur-3"></span>
    <span className=" absolute left-[782px] top-[592px] border-b-[3px] border-black block  w-[110px] filter blur-3"></span> 
  </div>

  <div className="border border-black mt-14">

  <span className="text-44 font-bree-serif  text-headlinesColor text-shadow-custom-medium">ormara i drugog namestaja po vasoj meri</span>

  </div> 

    </div>

      <div className="border border-black w-[500px] h-[600px] mr-16 ">

       <img src={homepageWardrobeImage} className="border border-red-400"/>
       <img src={arrowDown} className="w-20 h-20 opacity-35 mt-4"/>
       
      </div>
      

    </div>
  )
}
export default HomepageMain
