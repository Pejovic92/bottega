import wardrobeSketch from "../../assets/homepageWardrobe.png";

// Only the technical drawing is left here: the text moved into the hero (HomepageMain).
const HomepageAdditionalDescription = () => {
  return (
    <section className="flex justify-center bg-paper px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
      <img
        src={wardrobeSketch}
        alt="Tehnički crtež ugradnog ormara sa merama"
        width={500}
        height={500}
        className="h-auto w-full max-w-md xl:max-w-[500px]"
      />
    </section>
  );
};

export default HomepageAdditionalDescription;
