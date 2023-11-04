
import { Physics, useBox, usePlane, type Triplet } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import { randomColor } from './utils/color';
import { randomTransform } from './utils/transforms';
import { Text, useGLTF } from '@react-three/drei';
import { Box3, MathUtils, Mesh, Object3D, Vector3 } from 'three';
import { useStore } from './utils/store';
import { DigitalNumbers } from './items/DigitalNumber';

/**
 * @abstract https://github.com/pmndrs/use-cannon/blob/master/packages/react-three-cannon/README.md
 */

const modelList = [
  "apple.gltf",
  undefined,
  undefined,
];
const maxBoxes = 50;
const areaPosition = [-3.5, 0, 3] as [number, number, number];
const areaSize = 4;
export const Factory = () => {

  const [boxes, setBoxes] = React.useState<PhyBoxProps[]>([]);
  
  useEffect(() => {
    // 5秒に１個ずつ、ボックスを生成
    const timer = setInterval(() => {

      const url = modelList[Math.floor(Math.random() * modelList.length)];

      const newBoxProps: PhyBoxProps = {
        isCount: true,
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
        url,
      };
      setBoxes((prev) => {
        if (prev.length >= maxBoxes) {
          // 一番古いボックスを削除
          prev.shift();
        }
        return [...prev, newBoxProps];
      });
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Physics>
        <PhyPlane
          size={[100, 100]}
          position={[0, -0.001, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='#f4e0c4'
        />
        <PhyBox position={[0, 5, 0]} scale={[0.5, 0.5, 0.5]} isCount />
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
          speed={0.75}
        />
        <Conveyor 
          scale={[5, 0.1, 3]}
          position={[1, 2, -3]}
          moveRange={2.5}
          reverse
          speed={1.25}
        />
        <Conveyor 
          scale={[6, 0.1, 3]}
          position={[-3.5, 1, -2]}
          moveRange={2.5}
          rotation={[0, Math.PI / 2, 0]}
          moveDirection='z'
        />
      </Physics>
      <color attach="background" args={["#f6e5cc"]} />
      {/**  */}
      <AreaSquare
        position={areaPosition}
        size={areaSize}
        thr={0.2}
        color="red"
      />
      <CountViewer />
    </>
  )
}

const CountViewer = (
  {
    color = "red",
  }
) => {

  const { itemIds } = useStore();

  const count = useMemo(() => {
    return itemIds.length;
  }, [itemIds]);

  return (
    <group
      scale={0.25}
      position={[1.5, 4.2, 1]}
      rotation={[0, Math.PI / 4, 0]}
    >
      <Text 
        font='/MPLUS1-Light.ttf'
        color={color}
        position={[-2.65, 0, 0]}
      >
        生産数
      </Text>
      <DigitalNumbers 
        digitalString={count.toString()}
        color={color}
        position={[1.5, 0, 0]}
      />
      <Text 
        font='/MPLUS1-Light.ttf'
        color={color}
        position={[-2.25, 1.75, 0]}
      >
        生産計画
      </Text>
      <DigitalNumbers 
        digitalString={maxBoxes.toString()}
        color={color}
        position={[1, 1.75, 0]}
      />
      <mesh
       position={[-1, 0.85, -0.1]}
      >
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial 
          color={"white"}
          opacity={0.5}
          transparent
        />
      </mesh>
    </group>
  )
}

const AreaSquare = (
  {
    position = [0, 0, 0],
    size = 1,
    thr = 0.2,
    color = "red",
  }: {
    position?: [number, number, number],
    size?: number,
    thr?: number,
    color?: string,
  }
) => {
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
    >
      <ringGeometry args={[
        size - thr,
        size,
        4,
        1,
        0,
        Math.PI * 2,
      ]} />
      <meshBasicMaterial
        color={color}
      />
    </mesh>
  )
}

type ConveyorProps = {
  rotation?: [number, number, number],
  position?: [number, number, number],
  scale?: [number, number, number],
  moveRange?: number,
  moveDirection?: "x" | "z",
  reverse?: boolean,
  speed?: number,
  baseColor?: string,
};
const Conveyor = (
  {
    rotation = [0, 0, 0],
    position = [0, 0, 0],
    scale = [1, 1, 1],
    moveRange = 1,
    moveDirection = "x",
    reverse = false,
    speed = 1,
    baseColor = "#e2e2e2",
  }: ConveyorProps
) => {
  
  return (
    <>
      <PhyBox
        mass={0}
        scale={scale}
        position={position}
        rotation={rotation}
        color={baseColor}
      />
      <MoveBox
        position={position}
        rotation={rotation}
        scale={[
          scale[0]/6,
          scale[1]*4,
          scale[2]*1.01,
        ]}
        moveRange={moveRange}
        moveDirection={moveDirection}
        reverse={reverse}
        speed={speed}
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
  isCount?: boolean,
  rotation?: [number, number, number],
  position?: [number, number, number],
  scale?: [number, number, number],
  color?: string,
  url?: string,
};
const PhyBox = (
  { 
    mass = 1,
    isCount = false,
    rotation = [0, 0, 0],
    position = [0, 0, 0], 
    scale = [1, 1, 1],
    color = "red",
    url,
  }: PhyBoxProps,
) => {
  const boxSize: Triplet =  scale;
  const pos = useRef<Triplet>();
  const [ref, api] = useBox(() => ({ 
    mass,
    rotation,
    position,
    args: boxSize,
  }));

  const { itemIds, setItemIds } = useStore();

  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => (pos.current = p))
    return unsubscribe
  }, [])

  useFrame(() => {
    if (isCount && ref.current && pos.current){
      // areaPosition+-size範囲のx, z座標にあるかどうか
      const id = ref.current.uuid;
      const x = pos.current[0];
      const z = pos.current[2];
      const size = areaSize / 2;
      if (
        x > areaPosition[0] - size && x < areaPosition[0] + size 
        && z > areaPosition[2] - size && z < areaPosition[2] + size
      ) {
        if (!itemIds.includes(id)) {
          setItemIds([...itemIds, id]);
        }
      }
      else {
        if (itemIds.includes(id)) {
          setItemIds(itemIds.filter((item) => item !== id));
        }
      }
    }
  });

  return (
    // @ts-ignore
    <mesh ref={ref} castShadow receiveShadow>
      {url ?
        <Model url={url} position={position} scale={scale} color={color} />
        :
        <boxGeometry args={boxSize}  />
      }
      <meshStandardMaterial
        color={color}
      />
    </mesh>
  )
}

const Model = (
  {
    url,
    scale = [1, 1, 1],
    color = "red",
    roughness = 0.75,
  }: {
    url: string,
    position?: [number, number, number],
    scale?: [number, number, number],
    color?: string,
    roughness?: number,
  }
) => {

  const { nodes, materials } = useGLTF(url) as any;

  const size = new Box3().setFromObject(nodes.Mesh_apple).getSize(new Vector3());
  // sizeがscaleに合うように調整
  const newScale: [number, number, number] = [
    scale[0] / size.x,
    scale[1] / size.y,
    scale[2] / size.z,
  ];

  return (
    <>
      <mesh castShadow receiveShadow geometry={nodes.Mesh_apple.geometry} scale={newScale}>
        <meshStandardMaterial color={color} roughness={roughness} />
      </mesh>
      <mesh geometry={nodes.Mesh_apple_1.geometry} material={materials.brown} scale={newScale} />
      <mesh geometry={nodes.Mesh_apple_2.geometry} material={materials.green} scale={newScale} />
    </>
  )
};

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
  speed?: number,
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
    speed = 1,
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
    const t = clock.getElapsedTime() * speed % cycleTime;
    if (t < cycleTime / 4) {
      // Phase1 position[0] + moveRangeに近づく
      let _nt = n + moveRange * t * 2.0 / (cycleTime / 4) - moveRange;
      if (reverse) _nt = n - moveRange * t * 2.0 / (cycleTime / 4) + moveRange;
      moveDirection === "x" ? api.position.set(_nt, position[1] + boxSize[1]/2, position[2]) : api.position.set(position[0], position[1] + boxSize[1]/2, _nt);
    }
    else if (t < cycleTime / 2) {
      // Phase2
      // -Y軸方向に下がる
      const dt = (t - cycleTime / 4) / (cycleTime / 4);
      const y = MathUtils.lerp(position[1] + boxSize[1]/2, position[1] - boxSize[1]/2, dt);
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
      // Phase4 +Y軸方向に上がる 
      const dt = (t - cycleTime * 3 / 4) / (cycleTime / 4);
      const y = MathUtils.lerp(position[1] - boxSize[1]/2, position[1] + boxSize[1]/2, dt);
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