import "/Users/predragpejovic/WoodpeckerWebReact/src/globals.css"
import homepageWardrobeSketch from './../../assets/homepagewardrobeSketch.png'
import arrowUp from '../../assets/right-up.png'

const HomepageAdditionalDescription = () => {
  return (
<div className=" flex justify-between">

<div className="border border-black w-[900px] h-[500px] ml-16 mt-20 flex flex-col space-y-[56px] font-ledger text-[25px] text-center" >

  <span className=" border border-black w-[750px]  mx-auto"> Nudimo visokokvalitetne, prilagođene ormare od iverice i pločastih materijala,
  dizajnirane da se idealno uklope u vaš enterijer i zadovolje sve vaše potrebe.</span>
  <span className=" border border-black w-[750px]  mx-auto"> Kreirajte prostor po svojoj meri uz našu pomoć i pregledajte ga unapred u 3D formatu</span>
  <span className=" border border-black w-[750px]  mx-auto"> Za sva pitanja i savete, slobodno nas kontaktirajte</span>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-[30px] w-1/5 mx-auto">
  Kontakt
</button>
    
  </div>

  <div className="border border-black w-[500px] h-[600px] mr-16 " >

     <img src={arrowUp} className="w-20 h-20 opacity-35 relative left-[420px]"/>
     <img src={homepageWardrobeSketch} className=""/>

</div>

</div>

  )
}
export default HomepageAdditionalDescription
