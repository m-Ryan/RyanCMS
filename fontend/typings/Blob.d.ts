interface Blob {
	readonly size: number;
	readonly type: string;
	slice(start?: number, end?: number, contentType?: string): Blob;
}

declare var Blob: {
	prototype: Blob;
	new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};

declare var Blob: typeof Blob;
