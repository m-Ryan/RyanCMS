declare global {
	interface Window {
		__INITIAL_STATE__: Object | undefined;
	}
	namespace NodeJS {
		interface Global {
			window: any;
			document: any;
			navigator: any;
			localStorage: any;
			Element: any;
		}
	}
}
export function checkRenderFromServer() {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const fun = descriptor.value;

		descriptor.value = function(this: any) {
			const args = arguments;
			const self = this;
			if (!!window.__INITIAL_STATE__) {
				window.__INITIAL_STATE__ = undefined;
			} else {
				return fun.apply(self, args);
			}
		};
	};
}
