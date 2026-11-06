import { Component, Suspense, lazy, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import poster from "../../assets/wardrobe-model-poster.webp";

const HomepageWardrobeModel = lazy(() => import("./HomepageWardrobeModel"));

// If the 3D model can't load (or the browser has no WebGL), the poster simply stays.
class KeepPosterOnError extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

KeepPosterOnError.propTypes = { children: PropTypes.node };

// The hero background goes from a light sage behind the text to a darker green behind the wardrobe
// (the original greens, lightened twice by mixing with 20% white). Nothing is rendered onto them any
// more, so they can be changed freely; the text keeps over 4.5:1 contrast down to #989D82.
// The wardrobe is a 3D model on a transparent background; until it loads, a still of its
// first frame stands in. The still is rendered wider than the box on any screen, so object-cover
// only crops its empty sides and the wardrobe sits exactly where the model will appear.
// Phones: below the heading. Desktop: right 60% of the hero, starting below the navbar. Its height
// follows the hero's minimum height (see App), not the hero itself: when the text makes the hero
// taller on short windows, the wardrobe would otherwise grow and move left into the text.
// The box is also pushed 10% past the right edge (the hero clips it), which moves the wardrobe away
// from the text on narrower desktops.
const boxClasses =
  "relative h-[45svh] w-full lg:absolute lg:right-0 lg:top-20 lg:-z-10 lg:h-[calc(min(85svh,60vw)_-_5rem)] lg:w-3/5 lg:translate-x-[10%]";

// Setting up the 3D model keeps the browser busy for a moment, which would freeze the hero text's
// entrance animation (see HomepageMain; it ends after about 2.6 s). So the model starts loading
// only once that is over; until then the poster shows the same picture. Without the animation
// (reduced motion) there is nothing to wait for.
const MODEL_LOAD_DELAY = 2700;

const HomepageBackgroundVideo = () => {
  const [loadModel, setLoadModel] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const handleReady = useCallback(() => setModelReady(true), []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setLoadModel(true), reduceMotion ? 0 : MODEL_LOAD_DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-[#D3D5CA] from-10% to-[#BDC1AF] to-50% lg:bg-gradient-to-r lg:to-55%"
      />
      <div aria-hidden="true" className={boxClasses}>
        <img
          src={poster}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${modelReady ? "opacity-0" : ""}`}
        />
        {loadModel && (
          <KeepPosterOnError>
            <Suspense fallback={null}>
              <HomepageWardrobeModel
                className={`absolute inset-0 transition-opacity duration-700 ${modelReady ? "" : "opacity-0"}`}
                onReady={handleReady}
              />
            </Suspense>
          </KeepPosterOnError>
        )}
      </div>
      {/* The model's CC BY 4.0 license requires crediting its author. */}
      <p className="px-4 pb-3 text-right text-xs sm:px-8 lg:absolute lg:bottom-3 lg:right-16 lg:p-0">
        3D model:{" "}
        <a
          className="underline"
          href="https://sketchfab.com/3d-models/wardrobe-25122-ede879655ff444a2831dde070370b20c"
          target="_blank"
          rel="noreferrer"
        >
          Wardrobe 25122
        </a>
        , saintkastiell,{" "}
        <a className="underline" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
          CC BY 4.0
        </a>
      </p>
    </>
  );
};

export default HomepageBackgroundVideo;
