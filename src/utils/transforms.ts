
export const randomTransform = (
  min: [number, number, number],
  max: [number, number, number]
): [
  number,
  number,
  number
] => {
  
  const x = Math.floor(Math.random() * (max[0] - min[0])) + min[0];
  const y = Math.floor(Math.random() * (max[1] - min[1])) + min[1];
  const z = Math.floor(Math.random() * (max[2] - min[2])) + min[2];

  return [x, y, z];
};