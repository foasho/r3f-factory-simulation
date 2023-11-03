import { Physics, useBox, usePlane } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

/**
 * @abstract https://github.com/pmndrs/use-cannon/blob/master/packages/react-three-cannon/README.md
 */

export const Factory = () => {

  const onAttach = (e: any) => {
    alert("attach");
  }

  return (
    <>
      <Physics>
        <PhyPlane
          rotation={[-Math.PI / 2, 0, 0]}
          size={[100, 100]}
        />
        <PhyBox position={[0, 10, 0]} />
        <MoveBox
          position={[0, 5, 0]}
          moveRange={[3, 0, 0]}
        />
      </Physics>
      <color attach="background" args={
        ["black"]
      } />
    </>
  )
}

type PhyPlaneProps = {
  rotation?: [number, number, number],
  position?: [number, number, number],
  scale?: [number, number, number] | number,
  color?: string,
  size?: [number, number],
  onAttach?: (e: any) => void,
};
const PhyPlane = (
  { 
    rotation = [0, 0, 0],
    position = [0, 0, 0], 
    scale = [1, 1, 1],
    color = "gray",
    size = [1, 1],
  }: PhyPlaneProps
) => {

  const [ref, api] = usePlane(() => ({ 
    rotation,
    position,
    scale,
  })) as any;

  // Hitを検知
  // api.events.on("collide", (e: any) => {
  //   alert("collide");
  //   console.log(e);
  // });

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
  scale?: [number, number, number] | number,
};
const PhyBox = (
  { 
    mass = 1,
    rotation = [0, 0, 0],
    position = [0, 0, 0], 
    scale = [1, 1, 1],
  }: PhyBoxProps,
) => {
  const [ref] = useBox(() => ({ 
    mass,
    rotation,
    position,
    scale,
  })) as any;
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
}

type MoveBoxProps = {
  rotation?: [number, number, number],
  position?: [number, number, number],
  scale?: [number, number, number] | number,
  color?: string,
  moveRange?: [number, number, number],
};
const MoveBox = (
  {
    rotation = [0, 0, 0],
    position = [0, 0, 0], 
    scale = [1, 1, 1],
    color = "blue",
    moveRange = [0, 0, 0],
  }: MoveBoxProps
) => {
  const [ref, api] = useBox(() => ({ 
    rotation,
    position,
    scale,
  })) as any;

  useFrame(({ clock }) => {
    // 初期位置から、MoveRangeの範囲内で、sin波を描く
    const x = Math.sin(clock.getElapsedTime()) * moveRange[0];
    const y = Math.sin(clock.getElapsedTime()) * moveRange[1];
    const z = Math.sin(clock.getElapsedTime()) * moveRange[2];
    api.position.set(x, y, z);
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
      />
    </mesh>
  )
}