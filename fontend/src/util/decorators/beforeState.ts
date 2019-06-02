export function beforeState(state: object) {
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
        return self.setState(state, async () => await fun.apply(self, args));
      })();
    };
  };
}
