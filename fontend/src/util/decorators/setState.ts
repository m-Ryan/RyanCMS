import { message } from 'antd';
import { isMounted } from '../isMounted';
export function setState(beforeState: object, afterState: object) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const fun = descriptor.value;
    descriptor.value = function(this: any) {
      const args = arguments;
      const self = this;
      return (function() {
        self.setState(beforeState, async () => {
          const result = await fun.apply(self, args);
          if (isMounted(self)) {
            self.setState(afterState);
          }
          return result;
        });
      })();
    };
  };
}
