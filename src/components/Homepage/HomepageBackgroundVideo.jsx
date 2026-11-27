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

// The hero background is one flat sage green, #BDC1AF, like the flat bands of the other sections.
// It used to fade from a lighter green (#D3D5CA) behind the text to this one behind the wardrobe,
// to match the old video's background. The model and its still are transparent, so the colour can
// change freely, but not darker: the brown and the hero's sentence are only about 5.2:1 on it.
// The wardrobe is a 3D model on a transparent background; until it loads, a still of its
// first frame stands in. The still is rendered wider than the box on any screen, so object-cover
// only crops its empty sides and the wardrobe sits exactly where the model will appear.
// Phones: below the heading. Desktop: right 60% of the hero, starting below the navbar. Its height
// follows the hero's minimum height (see App), not the hero itself: when the text makes the hero
// taller on short windows, the wardrobe would otherwise grow and move left into the text.
// The box is also pushed 10% past the right edge (the hero clips it), which moves the wardrobe away
// from the text on narrower desktops.
// The model is licensed CC BY 4.0, which requires crediting its author: the credit is in the footer.
const boxClasses =
  "relative h-[45svh] w-full lg:absolute lg:right-0 lg:top-20 lg:-z-10 lg:h-[calc(min(85svh,60vw)_-_5rem)] lg:w-3/5 lg:translate-x-[10%]";

// Setting up the 3D model keeps the browser busy for a moment, which would freeze the hero text's
// entrance animation (see HomepageMain; it ends after about 1.9 s). So the model starts loading
// only once that is over; until then the poster shows the same picture. Without the animation
// (reduced motion) there is nothing to wait for.
const MODEL_LOAD_DELAY = 2000;

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
        className="absolute inset-0 -z-20 bg-[#BDC1AF]"
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
    </>
  );
};

export default HomepageBackgroundVideo;
