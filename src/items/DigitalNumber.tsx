import { useMemo } from "react";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type DigitalNumbersProps = {
  digitalString: string;
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
}
export const DigitalNumbers = (
  {
    digitalString,
    color = "red",
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1]
  }: DigitalNumbersProps
) => {
  const strs: Array<Digit> = useMemo(() => {
    const split = digitalString.split("");
    if (split.length === 0) {
      return ["0"];
    }
    // Digitでなければ配列から削除
    const filtered = split.filter((str) => {
      return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(str);
    }) as Array<Digit>;
    return filtered;
  }, [digitalString]);

  const length =  strs.length;
  
  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {strs.map((digitalNumStr, index) => {
        const pos = index - (length - 1) / 2;
        return (
          <DigitalNumber
            key={index}
            digitalNumStr={digitalNumStr}
            color={color}
            position={[pos, 0, 0]}
          />
        )
      })}
    </group>
  )
};

type DigitalNumberProps = {
  digitalNumStr: Digit;
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
}
export const DigitalNumber = ({
  digitalNumStr,
  color = "red",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1]
}: DigitalNumberProps) => {

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <group
        scale={0.15}
      >
        {digitalNumStr === "0" &&
          <>
            <DigitalNumberBar 
              color={color} 
              position={[0, 4.22, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[-2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[-2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              position={[0, -4.2, 0]}
            />
          </>
        }
        {digitalNumStr === "1" &&
          <>
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.12, -2.12, 0]}
            />
          </>
        }
        {digitalNumStr === "2" &&
          <>
            <DigitalNumberBar 
              color={color} 
              position={[0, 4.22, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI]}
              position={[0, 0, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[-2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              position={[0, -4.2, 0]}
            />
          </>
        }
        {digitalNumStr === "3" &&
          <>
            <DigitalNumberBar 
              color={color} 
              position={[0, 4.22, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI]}
              position={[0, 0, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              position={[0, -4.2, 0]}
            />
          </>
        }
        {digitalNumStr === "4" &&
          <>
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[-2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              position={[0, 0, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[2.11, -2.11, 0]}
            />
          </>
        }
        {digitalNumStr === "5" &&
          <>
            <DigitalNumberBar 
              color={color} 
              position={[0, 4.22, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[-2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI]}
              position={[0, 0, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              position={[0, -4.2, 0]}
            />
          </>
        }
        {digitalNumStr === "6" &&
          <>
            <DigitalNumberBar 
              color={color} 
              position={[0, 4.22, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[-2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI]}
              position={[0, 0, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[-2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              position={[0, -4.2, 0]}
            />
          </>
        }
        {digitalNumStr === "7" &&
          <>
            <DigitalNumberBar 
              color={color} 
              position={[0, 4.22, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[-2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[2.11, -2.11, 0]}
            />
          </>
        }
        {digitalNumStr === "8" &&
          <>
            <DigitalNumberBar 
              color={color} 
              position={[0, 4.22, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[-2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI]}
              position={[0, 0, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[-2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              position={[0, -4.2, 0]}
            />
          </>
        }
        {digitalNumStr === "9" &&
          <>
            <DigitalNumberBar 
              color={color} 
              position={[0, 4.22, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI / 2]}
              position={[2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[-2.12, 2.12, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, Math.PI]}
              position={[0, 0, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              rotation={[0, 0, -Math.PI / 2]}
              position={[2.11, -2.11, 0]}
            />
            <DigitalNumberBar 
              color={color} 
              position={[0, -4.2, 0]}
            />
          </>
        }
      </group>
    </group>
  )
}

/**
 * デジタル表記の1本のバー
 */
type DigitalNumberBarProps = {
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
};
const DigitalNumberBar = (
  {
    color = "red",
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1]
  }: DigitalNumberBarProps
) => {
  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/** 三角形 */}
      <mesh position={[1.64, 0, 0]} scale={[0.5, 0.85, 1]}>
        <circleGeometry args={[0.575, 3, 0, 2 * Math.PI]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/** 矩形 */}
      <mesh scale={[3, 0.85, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/** 三角形 */}
      <mesh position={[-1.64, 0, 0]} rotation={[0, 0, Math.PI]} scale={[0.5, 0.85, 1]}>
        <circleGeometry args={[0.575, 3, 0, 2 * Math.PI]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}