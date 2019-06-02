/**
 *  节流，一定时间范围内只要第一次
 * @param delay
 */
export function throttle(delay: number) {
  let timer: NodeJS.Timeout | null;
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const fun = descriptor.value;
    descriptor.value = function(this: any) {
      const args = arguments;
      const self = this;
      if (!timer) {
        fun.apply(self, args);
        timer = setTimeout(() => (timer = null), delay);
      }
    };
  };
}
