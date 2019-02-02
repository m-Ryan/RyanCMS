import { isMounted } from '../isMounted';
export function loading(property: string = 'loading') {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const fun = descriptor.value;
    descriptor.value = function(this: any) {
      const args = arguments;
      const self = this;
      return (async function() {
        self.setState({
          [property]: true,
        });
        try {
          const result = await fun.apply(self, args);
          if (isMounted(self)) {
            self.setState({
              [property]: false,
            });
          }
          return result;
        } catch (error) {
          if (isMounted(self)) {
            self.setState({
              [property]: false,
            });
          }
          throw error;
        }
      })();
    };
  };
}
