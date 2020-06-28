export function isServer() {
  return !!process.env.SSR_SERVER_PORT;
}

export function randomRange(min: number, max: number) {
  return Math.floor(min + (max - min) * Math.random());
}

export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function getCookie(key: string) {
  let value = '';
  document.cookie.split(';').forEach(item => {
    const name = item.split('=')[0];
    if (name.trim() === key) {
      value = item.replace(`${name}=`, '');
    }
  });
  return value;
}

export function PromiseEach(promiseLikes: PromiseLike<any>[]) {
  const datas = [];
  let count = 0;
  return new Promise((resolve) => {
    promiseLikes.forEach(async (promiseLike) => {
      try {
        const data = await promiseLike;
        datas.push(data);
      } catch (error) {
        datas.push(error)
      }
      finally {
        count++;
        if (count === promiseLikes.length) {
          resolve();
        }
      }
    });
  });
}


export function classnames(...rest: string[]) {
  return rest.filter(item => typeof item === 'string').join(' ');
}
