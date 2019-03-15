declare namespace NodeJS {
	interface Global {
		Window: {
			__INITIAL_STATE__: Object | undefined;
		};
		Blob: {
			readonly size: number;
			readonly type: string;
			slice(start?: number, end?: number, contentType?: string): Blob;
			new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
		};
	}
}

declare module '*.bmp' {
	const src: string;
	export default src;
}

declare module '*.gif' {
	const src: string;
	export default src;
}

declare module '*.jpg' {
	const src: string;
	export default src;
}

declare module '*.jpeg' {
	const src: string;
	export default src;
}

declare module '*.png' {
	const src: string;
	export default src;
}

declare module '*.webp' {
	const src: string;
	export default src;
}

declare module '*.svg' {
	import * as React from 'react';

	export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

	const src: string;
	export default src;
}

declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.sass' {
	const classes: { [key: string]: string };
	export default classes;
}
