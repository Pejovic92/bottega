"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import React, { Suspense, useRef, useEffect } from "react";
import Model from "./Model.tsx";
import * as THREE from "three";

export default function Scene() {
  const light1Ref = useRef<THREE.DirectionalLight>(null);
  const light2Ref = useRef<THREE.DirectionalLight>(null);

  return (
    <div className="h-[35vw] w-[70vw] bg-gray-500 mx-auto">
      <Canvas>
        <Suspense fallback={null}>
          <Stage
            environment={null}
            intensity={3}
            shadows={{ type: "contact", opacity: 0.5, blur: 2 }}
          ></Stage>

          <directionalLight
            ref={light1Ref}
            position={[2, -10, 7.5]} // Front-right above the model [2, 10, 7.5]
            intensity={3.5} // Adjusted intensity
            castShadow
          />

          <directionalLight
            ref={light2Ref}
            position={[-3, 10, -7.5]} // Back-left above the model
            intensity={1} // Lower intensity for fill
            castShadow
          />

          <ambientLight color="" intensity={1.7} />
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
