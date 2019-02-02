/**
 * 防抖,只要最后一次
 * @param delay
 */
export function debounce(delay: number) {
  let timer: NodeJS.Timeout;
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const fun = descriptor.value;
    descriptor.value = function(this: any) {
      const args = arguments;
      const self = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => fun.apply(self, args), delay);
    };
  };
}
