import Navbar from "./components/Navbar/Navbar";
import HomepageMain from "./components/Homepage/HomepageMain";
import HomepageAdditionalDescription from "./components/Homepage/HomepageAdditionalDescription";
import HomepageCTA from "./components/Homepage/HomepageCTA";
import AboutPageFirstSection from "./components/About/AboutPageFirstSection";
import AboutPageSecondSection from "./components/About/AboutPageSecondSection";
import AboutPageThirdSection from "./components/About/AboutPageThirdSection";
import AboutPageFourthSection from "./components/About/AboutPageFourthSection";
import Card from "./components/Process-description/FieldCard";

const App = () => {
  return (
    <div>
      <div className="bg-[rgba(140,146,116,0.6)] h-[1500px]">
        <div>
          <Navbar />
        </div>
        <div>
          <HomepageMain />
          <HomepageAdditionalDescription />
        </div>
      </div>

      <HomepageCTA />
      <AboutPageFirstSection />
      <AboutPageSecondSection />
      <AboutPageFourthSection />
      <AboutPageThirdSection />
      <div className="w-full flex justify-between">
        <Card />
      </div>
    </div>
  );
};
export default App;
