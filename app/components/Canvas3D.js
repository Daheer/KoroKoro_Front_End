"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

export default function Canvas3D({ obj_file }) {
  return (
    <Canvas camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 10, 0] }}>
      <ambientLight />
      <OrbitControls />
      <Model url={obj_file} />
    </Canvas>
  );
}