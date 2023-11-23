"use client";

import React from "react";
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function Model({ url }) {
  const group = useRef();

  const obj = useLoader(OBJLoader, url);
  obj.scale.set(2, 2, 2);

  return (
    <group ref={group}>
      <primitive object={obj} />
    </group>
  );
}

export default Model;
