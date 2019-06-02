export function randomRange(min: number, max: number) {
  return Math.floor(min + (max - min) * Math.random());
}
