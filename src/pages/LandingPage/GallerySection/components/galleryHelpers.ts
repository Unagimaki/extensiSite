import { Gallery } from 'shared/types/gallery'

export const findIndex = (arr: Gallery[], id: number | string) =>
  arr.findIndex(item => item.id === id)

export function splitArray(array: Gallery[]) {
  const chunkSize = Math.round(array.length / 3)
  const left = array.slice(0, chunkSize)
  const center = array.slice(chunkSize, chunkSize + 2)
  const right = array.slice(chunkSize + 2, -1)

  return { left, center, right }
}

export const getPositionAndRotation = (
  id: number | string,
  {
    left,
    center,
    right,
  }: { left: Gallery[]; center: Gallery[]; right: Gallery[] },
  defaultRandom: number
): {
  position: [number, number, number]
  rotation: [number, number, number]
} | null => {
  const leftIndex = findIndex(left, id) + 1 || findIndex(left, id)
  const centerIndex = findIndex(center, id) + 1 || findIndex(center, id)
  const rightIndex = findIndex(right, id) + 1 || findIndex(right, id)
  if (leftIndex !== -1) {
    if (leftIndex === 1) {
      return { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 4, 0] }
    }

    if (leftIndex % 2 === 0) {
      return {
        position: [-(leftIndex * 0.5), 0, leftIndex * 0.6 + defaultRandom],
        rotation: [0, Math.PI / 8, 0],
      }
    }
    return {
      position: [-(leftIndex * 0.85), 0, leftIndex * 0.7],
      rotation: [0, Math.PI / 3, 0],
    }
  } else if (rightIndex !== -1) {
    if (rightIndex === 1) {
      return { position: [1.9, 0, 0.25], rotation: [0, -Math.PI / 4, 0] }
    }

    if (rightIndex % 2 === 0) {
      return {
        position: [rightIndex * 0.6, 0, rightIndex * 0.7 - defaultRandom],
        rotation: [0, -Math.PI / 8, 0],
      }
    }
    return {
      position: [rightIndex * 0.85, 0, rightIndex * 0.6],
      rotation: [0, -Math.PI / 2.5, 0],
    }
  } else if (centerIndex !== -1) {
    if (centerIndex % 2 === 0) {
      return { position: [0.8, 0, -0.6], rotation: [0, 0, 0] }
    }
    return {
      position: [-0.8, 0, -0.6],
      rotation: [0, 0, 0],
    }
  } else return null
}
