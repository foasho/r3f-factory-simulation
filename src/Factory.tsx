
import { Physics, useBox, usePlane, type Triplet } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { randomColor } from './utils/color';
import { randomTransform } from './utils/transforms';

/**
 * @abstract https://github.com/pmndrs/use-cannon/blob/master/packages/react-three-cannon/README.md
 */

export const Factory = ({ maxBoxes = 10 }: {
  maxBoxes: number,
}) => {

  const [boxes, setBoxes] = React.useState<PhyBoxProps[]>([]);

  const onCollide = (e: any) => {
    alert("attach");
  }
  
  useEffect(() => {
    // 5秒に１個ずつ、ボックスを生成
    const timer = setInterval(() => {
      const newBoxProps: PhyBoxProps = {
        position: [-1.5, 4.5, 0],
        rotation: randomTransform(
          [0, 0, 0],
          [Math.PI, Math.PI, Math.PI]
        ),
        scale: randomTransform(
          [0.5, 0.5, 0.5],
          [1, 1, 1]
        ),
        color: randomColor(),
      };
      if (boxes.length >= maxBoxes) {
        boxes.shift();
      }
      setBoxes((prev) => [...prev, newBoxProps]);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Physics>
        <PhyPlane
          size={[100, 100]}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='#f4e0c4'
        />
        <PhyBox position={[0, 5, 0]} scale={[0.5, 0.5, 0.5]} />
        {boxes.map((boxProps, index) => (
          <PhyBox
            key={index}
            {...boxProps}
          />
        ))}
        <Conveyor 
          scale={[3, 0.1, 2]}
          position={[-1.5, 4, 0]}
          moveRange={1.5}
        />
        <Conveyor 
          scale={[4, 0.1, 2]}
          position={[1, 3, 0]}
          moveRange={2}
          rotation={[0, Math.PI / 2, 0]}
          moveDirection='z'
          reverse
        />
        <Conveyor 
          scale={[5, 0.1, 2]}
          position={[1, 2, -3]}
          moveRange={3}
          reverse
        />
        <Conveyor 
          scale={[6, 0.1, 2]}
          position={[-2.5, 1, -1]}
          moveRange={2.5}
          rotation={[0, Math.PI / 2, 0]}
          moveDirection='z'
        />
      </Physics>
      <color attach="background" args={
        ["#f6e5cc"]
      } />
    </>
  )
}

type ConveyorProps = {
  rotation?: [number, number, number],
  position?: [number, number, number],
  scale?: [number, number, number],
  moveRange?: number,
  moveDirection?: "x" | "z",
  reverse?: boolean,
};
const Conveyor = (
  {
    rotation = [0, 0, 0],
    position = [0, 0, 0],
    scale = [1, 1, 1],
    moveRange = 1,
    moveDirection = "x",
    reverse = false,
  }: ConveyorProps
) => {
  
  return (
    <>
      <PhyBox
        mass={0}
        scale={scale}
        position={position}
        rotation={rotation}
        color="gray"
      />
      <MoveBox
        position={position}
        rotation={rotation}
        scale={[
          scale[0]/6,
          scale[1]*3,
          scale[2]*1.01,
        ]}
        moveRange={moveRange}
        moveDirection={moveDirection}
        reverse={reverse}
      />
    </>
  )
}

type PhyPlaneProps = {
  rotation?: [number, number, number],
  position?: [number, number, number],
  scale?: [number, number, number],
  color?: string,
  size?: [number, number],
  onCollide?: (e: any) => void,
};
const PhyPlane = (
  { 
    rotation = [0, 0, 0],
    position = [0, 0, 0], 
    scale = [1, 1, 1],
    color = "gray",
    size = [1, 1],
    onCollide = (e) => {},
  }: PhyPlaneProps
) => {
  // const scaleSize: Triplet = scale;
  const [ref] = usePlane(() => ({ 
    rotation,
    position,
    args: size,
    width: size[0],
    height: size[1],
    onCollide: (e) => {
      // Hitした時の処理
      if (onCollide) onCollide(e);
    },
  })) as any;

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry
        args={size}
      />
      <meshStandardMaterial
        color={color}
      />
    </mesh>
  )
}

type PhyBoxProps = {
  mass?: number,
  rotation?: [number, number, number],
  position?: [number, number, number],
  scale?: [number, number, number],
  color?: string,
};
const PhyBox = (
  { 
    mass = 1,
    rotation = [0, 0, 0],
    position = [0, 0, 0], 
    scale = [1, 1, 1],
    color = "red",
  }: PhyBoxProps,
) => {
  const boxSize: Triplet =  scale;
  const [ref] = useBox(() => ({ 
    mass,
    rotation,
    position,
    args: boxSize,
  })) as any;

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={boxSize}  />
      <meshStandardMaterial
        color={color}
      />
    </mesh>
  )
}

type MoveBoxProps = {
  rotation?: [number, number, number],
  position?: [number, number, number],
  scale?: [number, number, number],
  color?: string,
  moveRange?: number,
  moveDirection?: "x" | "z",
  cycleTime?: number,
  // 逆回転
  reverse?: boolean,
};
const MoveBox = (
  {
    rotation = [0, 0, 0],
    position = [0, 0, 0], 
    scale = [1, 1, 1],
    color = "blue",
    moveRange = 1,
    moveDirection = "x",
    cycleTime = 10,
    reverse = false,
  }: MoveBoxProps
) => {
  const boxSize: Triplet =  scale;
  const [ref, api] = useBox(() => ({ 
    rotation,
    position,
    scale,
    args: boxSize,
  })) as any;

  useFrame(({ clock }) => {

    if (ref.current === undefined) return;

    const n = moveDirection === "x" ? position[0] : position[2];
    // サイクルを４分割
    const t = clock.getElapsedTime() % cycleTime;
    if (t < cycleTime / 4) {
      // Phase1 position[0] + moveRangeに近づく
      let _nt = n + moveRange * t * 2.0 / (cycleTime / 4) - moveRange;
      if (reverse) _nt = n - moveRange * t * 2.0 / (cycleTime / 4) + moveRange;
      moveDirection === "x" ? api.position.set(_nt, position[1], position[2]) : api.position.set(position[0], position[1], _nt);
    }
    else if (t < cycleTime / 2) {
      // Phase2
      // -Y軸方向に下がる
      const dt = (t - cycleTime / 4) / (cycleTime / 4);
      const y = position[1] - (boxSize[1] * dt)/2;
      let px = moveDirection === "x" ? position[0] + moveRange : position[0];
      let pz = moveDirection === "x" ? position[2] : position[2] + moveRange;
      if (reverse) {
        px = moveDirection === "x" ? position[0] - moveRange : position[0];
        pz = moveDirection === "x" ? position[2] : position[2] - moveRange;
      }
      api.position.set(px, y, pz);
    }
    else if (t < cycleTime * 3 / 4) {
      // Phase3  position[0] - moveRangeに近づく
      let nt = n + moveRange - moveRange * (t - cycleTime / 2) / (cycleTime / 4) * 2.0;
      if (reverse) nt = n - moveRange + moveRange * (t - cycleTime / 2) / (cycleTime / 4) * 2.0;
      const y = position[1] - boxSize[1]/2;
      // api.position.set(_x, y, position[2]);
      moveDirection === "x" ? api.position.set(nt, y, position[2]) : api.position.set(position[0], y, nt);
    }
    else {
      // Phase4 +Y軸方向に上がる 最終地:position[1]
      const dt = (t - cycleTime * 3 / 4) / (cycleTime / 4);
      const y = position[1] - boxSize[1]/2 + (boxSize[1] * dt)/2;
      let px = moveDirection === "x" ? position[0] - moveRange : position[0];
      let pz = moveDirection === "x" ? position[2] : position[2] - moveRange;
      if (reverse) {
        px = moveDirection === "x" ? position[0] + moveRange : position[0];
        pz = moveDirection === "x" ? position[2] : position[2] + moveRange;
      }
      api.position.set(px, y, pz);
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={boxSize} />
      <meshStandardMaterial
        color={color}
      />
    </mesh>
  )
}