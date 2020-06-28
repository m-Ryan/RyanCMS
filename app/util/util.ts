export function randomRange(min: number, max: number) {
  return Math.floor(min + (max - min) * Math.random());
}

export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function isServer() {
  return !!process.env.SSR_SERVER_PORT;
}

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
