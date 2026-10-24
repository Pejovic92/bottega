import Logo from "../../assets/logo.png"


const Navbar = () => {
  return (
    <div >
      <div className=" container flex justify-between items-center max-w-none h-[80px] "> 

        <div className=" pl-[64px]">
          <img src={Logo}/>
        </div>

        <div className=" pr-[64px] text-[18px] font-junge"> 
        <ul className="flex space-x-[48px] " >
      <li> <a  href="#">Pocetna</a></li>
      <li> <a href="#">O nama</a></li>
      <li> <a href="#">Izrada: korak po korak</a></li>
      <li> <a href="#">Kontakt</a></li>
      </ul>  
        </div>
   
      </div>
      <div className='border-b-2 border-black ml-16 mr-16'></div> 
     
    </div>
  )
}
export default Navbar
