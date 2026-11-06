/* eslint-disable react/no-unknown-property -- three.js elements take props that HTML elements don't have */
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Box3, MathUtils, NeutralToneMapping, Vector3 } from "three";
import modelUrl from "../../assets/wardrobe_25122.glb?url";

// The model is turned so the open side of the corner faces the camera, and the camera looks at it
// a little from above.
const MODEL_TURN = MathUtils.degToRad(45);
const VIEW_AZIMUTH = 0;
const VIEW_ELEVATION = MathUtils.degToRad(12);
// Visitors can turn the wardrobe all the way round, and tilt the view from almost straight down
// to eye level, but never below the floor.
const MIN_POLAR = MathUtils.degToRad(20);
const MAX_POLAR = MathUtils.degToRad(90);
// Share of the canvas height the wardrobe fills.
const FILL = 0.74;
// The model's animation lasts 3.3 s; slowed down ten times it takes as long as the video's loop.
const ANIMATION_SPEED = 0.1;

const Wardrobe = ({ animate, onReady }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, group);
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls);
  // Turn the model before measuring it, so the frame and the shadow fit the turned wardrobe.
  const box = useMemo(() => {
    scene.rotation.y = MODEL_TURN;
    return new Box3().setFromObject(scene);
  }, [scene]);

  // The doors and drawers open and close in a loop, like the video used to.
  useEffect(() => {
    if (animate) Object.values(actions).forEach((action) => action.setEffectiveTimeScale(ANIMATION_SPEED).play());
  }, [actions, animate]);

  // Frame the wardrobe and turn the camera around its center.
  useLayoutEffect(() => {
    if (!controls) return;
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const distance =
      size.y / 2 / FILL / Math.tan(MathUtils.degToRad(camera.fov / 2)) + Math.max(size.x, size.z) / 2;
    const direction = new Vector3().setFromSphericalCoords(1, Math.PI / 2 - VIEW_ELEVATION, VIEW_AZIMUTH);
    camera.position.copy(center).addScaledVector(direction, distance);
    controls.target.copy(center);
    controls.update();
    onReady();
  }, [box, camera, controls, onReady]);

  const size = box.getSize(new Vector3());
  return (
    <>
      <primitive ref={group} object={scene} />
      <ContactShadows
        position={[box.getCenter(new Vector3()).x, box.min.y, box.getCenter(new Vector3()).z]}
        scale={Math.max(size.x, size.z) * 1.8}
        opacity={0.45}
        blur={2.4}
        far={size.y / 3}
      />
    </>
  );
};

Wardrobe.propTypes = {
  animate: PropTypes.bool.isRequired,
  onReady: PropTypes.func.isRequired,
};

// On phones a vertical swipe over the model still scrolls the page; only a sideways one turns it,
// so tilting up and down works with a mouse only.
const LetVerticalSwipesScroll = () => {
  const controls = useThree((state) => state.controls);
  useEffect(() => {
    if (controls) controls.domElement.style.touchAction = "pan-y";
  }, [controls]);
  return null;
};

// The wardrobe from the hero as a live 3D model: it keeps playing its animation, and visitors can
// drag it to turn it round and tilt it (no zooming or panning). Loaded lazily, after the page shows.
const HomepageWardrobeModel = ({ className, onReady }) => {
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className={`${className} cursor-grab active:cursor-grabbing`}>
      <Canvas camera={{ fov: 30 }} dpr={[1, 2]} gl={{ toneMapping: NeutralToneMapping }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-3, 5, 5]} intensity={1.6} />
        <Environment resolution={256}>
          <Lightformer intensity={1.5} position={[0, 3, 6]} scale={[10, 6, 1]} />
          <Lightformer intensity={0.8} position={[-6, 3, 2]} scale={[10, 4, 1]} />
          <Lightformer intensity={0.8} position={[6, 3, 2]} scale={[10, 4, 1]} />
          <Lightformer intensity={1} position={[0, 8, 0]} scale={[10, 10, 1]} />
          {/* A softer light from behind, so the back isn't left in the dark when turned round. */}
          <Lightformer intensity={0.6} position={[0, 3, -6]} scale={[10, 6, 1]} />
        </Environment>
        <Wardrobe animate={animate} onReady={onReady} />
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          rotateSpeed={0.6}
          minPolarAngle={MIN_POLAR}
          maxPolarAngle={MAX_POLAR}
        />
        <LetVerticalSwipesScroll />
      </Canvas>
    </div>
  );
};

HomepageWardrobeModel.propTypes = {
  className: PropTypes.string.isRequired,
  onReady: PropTypes.func.isRequired,
};

export default HomepageWardrobeModel;
