/// <reference types="node" />
export declare function uploadQiuNiuFile(fileData: {
    data: string | Buffer;
    name?: string;
}): Promise<{}>;
export declare function getQiniu(name?: string): {
    token: string;
    origin: string;
    options: {
        scope: string;
    };
};
export declare function fsReadAsync(path: string | number | Buffer | URL, options?: {
    encoding?: null;
    flag?: string;
}): Promise<Buffer>;
export declare function fsUnlinkAsync(path: string): Promise<{}>;
