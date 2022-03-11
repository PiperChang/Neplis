import React, { Suspense, useState } from "react";
import styled from "styled-components";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
// import MagicRoom from "./Elements/MagicRoom";
import { useDispatch, useSelector } from "react-redux";
import { onOffElement, savePosition } from "../../../redux/actions/canvas";

import IsometricRoom from "./Isometric_room";
// import SpiderMan from "./Elements/SpiderMan";
// import ManSitting from "./Elements/ManSitting";
import TV from './Elements/TV'

//backgrounds
import IsometricRoom2 from "./Backgrounds/IsometricRoom";
import Cinema from './Backgrounds/Cinema'
import HomeCinema from './Backgrounds/HomeCinema'
import MagicRoom from './Backgrounds/MagicRoom'
//Elements
import Dog from './Elements/Dog'
import Cat from './Elements/Cat'
import Llama from './Elements/Llama'
import Otter from './Elements/Otter'


export default function CanvasContainer({ edit }) {
  const dispatch = useDispatch();
  const save_Position = (positions) => dispatch(savePosition(positions));
  // Drag가 안되서 이용 못하는 중

  const { onNOff } = useSelector((state) => {
    return {
      onNOff: state.canvas.onNOff,
    };
  });

  return (
    <div style={{ height: "100vh" }}>
      <Canvas camera={{ fov: 45, position: [300, 300, 300] }} shadows>
        <color attach="background" args={["white"]} />
        <OrbitControls
          // minPolarAngle={edit ? Math.PI / 4 : -Math.PI/2}
          // maxPolarAngle={edit ?  Math.PI / 4 : Math.PI/2}        
          // minAzimuthAngle={edit ? Math.PI / 4 : 0}
          maxAzimuthAngle={edit ? Math.PI / 4 : Math.PI / 2}
        />
        {/* light 들 적용시킬 것 */}
        <ambientLight intensity={0.3} />
        {/* <pointLight color="white" intensity = {0.1}  />
        <spotLight position={[20, 70, -150]} angle={1} color="white" penumbra={1} castShadow /> */}

        <spotLight
          position={[82.123, 106.57, -184.02]}
          intensity={0.3}
          angle={0.9}
          color="white"
          penumbra={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />

        {/* <pointLight
          color="#0000FF"
          intensity={0.4}
          position={[-70, 100, -23]}
        />
        <rectAreaLight
          width={110}
          height={10}
          color="#0000FF"
          intensity={30}
          position={[-88.8, 40, -32]}
          rotation={[0, -1.57, 0]}
        /> */}
        <Suspense fallback={null}>
          {/* 기본 방 + 버튼 클릭에 따른 Element들 */}
          {/* <Cinema /> */}
          
          {/* <IsometricRoom2 /> */}
          {/* <HomeCinema /> */}
          {/* <IsometricRoom/> */}
          <MagicRoom />
          {onNOff[0] ? <Dog/> : <></>}
          {onNOff[1] ? <Cat /> : <></>}
          {onNOff[2] ? <Llama /> : <></>}
          {onNOff[3] ? <Otter /> : <></>}
        </Suspense>
      </Canvas>
    </div>
  );
}