import { message } from 'antd';
export function catchError(catchFn?: Function) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const fun = descriptor.value;
    descriptor.value = function() {
      const self = this;
      const args = arguments;
      return (async function() {
        try {
          return await fun.apply(self, args);
        } catch (error) {
          errorHandle.apply(self, [error, catchFn]);
        }
      })();
    };
  };
}

function errorHandle(this: any, error: Error, catchFn: Function) {
  console.info('catchError捕获到错误---begin');
  console.error(error);
  if (catchFn) {
    catchFn.apply(this, [error.message]);
  } else {
    message.error(error.message);
  }
  console.info('catchError捕获到错误---end');
}
