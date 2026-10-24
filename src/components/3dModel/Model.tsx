import React, { forwardRef, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group, Object3D } from "three";

export default function Model() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF(
    "src/assets/wardrobeAnimation.glb"
  );

  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    actions["Animation"]?.play();
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}
