import Navbar from "./components/Navbar/Navbar";
import HomepageMain from "./components/Homepage/HomepageMain";
import HomepageBackgroundVideo from "./components/Homepage/HomepageBackgroundVideo";
// Hidden while the homepage is being redesigned.
// import HomepageAdditionalDescription from "./components/Homepage/HomepageAdditionalDescription";
// import HomepageCTA from "./components/Homepage/HomepageCTA";
// import AboutPageFirstSection from "./components/About/AboutPageFirstSection";
// import AboutPageSecondSection from "./components/About/AboutPageSecondSection";
// import AboutPageThirdSection from "./components/About/AboutPageThirdSection";
// import AboutPageFourthSection from "./components/About/AboutPageFourthSection";
// import Card from "./components/Process-description/FieldCard";

const App = () => {
  return (
    <div>
      {/* Text is darker than headlinesColor to keep 4.5:1 contrast on the dark end of the gradient.
          On desktop the hero is at most 60% as tall as the window is wide: the 3D wardrobe grows
          with the hero's height, so on tall, narrow windows it would be cut off on the right. It is
          also clipped sideways, because the wardrobe's box sticks out past the right edge. */}
      <div className="relative isolate flex min-h-[85svh] flex-col overflow-x-clip text-[#26272E] lg:min-h-[min(85svh,60vw)]">
        <Navbar />
        <HomepageMain />
        <HomepageBackgroundVideo />
      </div>

      {/* Hidden while the homepage is being redesigned.
      <HomepageAdditionalDescription />
      <HomepageCTA />
      <AboutPageFirstSection />
      <AboutPageSecondSection />
      <AboutPageFourthSection />
      <AboutPageThirdSection />
      <div className="w-full flex justify-between">
        <Card />
      </div>
      */}
    </div>
  );
};
export default App;
