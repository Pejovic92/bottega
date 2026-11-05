import video from "../../assets/closet-animation.mp4";
import poster from "../../assets/closet-animation-poster.jpg";

// The video was re-rendered onto a darker green (the original brand green #8C9274 mixed with 10% white).
// The hero background starts with the lighter sage behind the text and darkens to that same green
// toward the video, whose inner edge is faded out, so the two blend. The gradient has to reach the
// dark green before the video turns fully opaque (58% of the width on desktop, about 60% of the
// height on phones), or the video's edge shows.
// Phones: below the heading, cropped around the wardrobe. Desktop: right 60% of the hero, starting
// below the navbar because the wardrobe sits high in the frame. Its height follows the hero's
// minimum height (see App), not the hero itself: when the text makes the hero taller on short
// windows, the wardrobe would otherwise grow and move left into the text.
const mediaClasses =
  "h-[45svh] w-full object-cover [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] " +
  "lg:absolute lg:right-0 lg:top-20 lg:-z-10 lg:h-[calc(min(85svh,60vw)_-_5rem)] lg:w-3/5 lg:object-[40%_center] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]";

const HomepageBackgroundVideo = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-sage from-10% to-[#989D82] to-50% lg:bg-gradient-to-r lg:to-55%"
      />
      {/* Visitors who prefer reduced motion see the first frame instead of the video. */}
      <video
        aria-hidden="true"
        className={`${mediaClasses} motion-reduce:hidden`}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
      </video>
      <img
        src={poster}
        alt=""
        className={`${mediaClasses} hidden motion-reduce:block`}
      />
    </>
  );
};

export default HomepageBackgroundVideo;
