import { useEffect, useState } from "react";

// Whether the element in `ref` is on screen; the homepage animations use it to play when their
// element scrolls into view.
// - initial: the value before the first check. true plays an animation right away on load, false
//   waits until the element is actually seen.
// - once: stay true after the first time, so the animation plays only once.
// - rootMargin: shrinks the screen area that counts, e.g. "0px 0px -15% 0px" waits until the
//   element is 15% of the screen height above the bottom edge.
const useInView = (ref, { initial = true, once = false, rootMargin = "0px" } = {}) => {
  const [inView, setInView] = useState(initial);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, once, rootMargin]);

  return inView;
};

export default useInView;
