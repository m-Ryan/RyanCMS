export function ReactAutoBind(this: any) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    const willMount = constructor.prototype.componentWillMount;
    constructor.prototype.componentWillMount = function() {
      for (let key in constructor.prototype) {
        const self = this;
        if (
          constructor.prototype.hasOwnProperty(key) &&
          typeof constructor.prototype[key] === 'function'
        ) {
          let fn = this[key];
          this[key] = function() {
            return fn.apply(self, arguments);
          };
        }
      }
      return willMount && willMount.apply(this, arguments);
    };
    return constructor;
  };
}
