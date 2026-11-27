import { useCallback, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import HomepageMain from "./components/Homepage/HomepageMain";
import HomepageBackgroundVideo from "./components/Homepage/HomepageBackgroundVideo";
import HomepageStatement from "./components/Homepage/HomepageStatement";
import HomepageCTA from "./components/Homepage/HomepageCTA";
import AboutPageFirstSection from "./components/About/AboutPageFirstSection";
import AboutPageSecondSection from "./components/About/AboutPageSecondSection";
import AboutPageFourthSection from "./components/About/AboutPageFourthSection";
import HomepageProducts from "./components/Homepage/HomepageProducts";
import HomepageProcess from "./components/Homepage/HomepageProcess";
import HomepageQuote from "./components/Homepage/HomepageQuote";
import Footer from "./components/Footer/Footer";
import QuoteDialog from "./components/Quote/QuoteDialog";
// Hidden for now ("Segmentne izrade").
// import AboutPageThirdSection from "./components/About/AboutPageThirdSection";

const App = () => {
  // The quote questionnaire lives here, once, so any button on the page can open it.
  const [quoteOpen, setQuoteOpen] = useState(false);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

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
      <HomepageStatement />
      <HomepageCTA />
      <AboutPageFirstSection />
      <AboutPageSecondSection />
      <AboutPageFourthSection />
      {/* Hidden for now ("Segmentne izrade").
      <AboutPageThirdSection />
      */}
      <HomepageProducts />
      <HomepageProcess />
      <HomepageQuote onRequestQuote={() => setQuoteOpen(true)} />
      <Footer />
      <QuoteDialog open={quoteOpen} onClose={closeQuote} />
    </div>
  );
};
export default App;
