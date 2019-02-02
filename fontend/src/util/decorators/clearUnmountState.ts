export function ClearUnmountState(this: any) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    const willUnmount = constructor.prototype.componentWillUnmount;
    constructor.prototype.componentWillUnmount = function() {
      if (typeof willUnmount === 'function') {
        willUnmount.bind(this)();
      }
      this.setState = () => {};
    };
    return constructor;
  };
}
