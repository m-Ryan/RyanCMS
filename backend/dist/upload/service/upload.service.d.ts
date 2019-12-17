/// <reference types="node" />
export declare class UploadService {
    constructor();
    uploadQiuNiuFile(fileData: {
        data: string | Buffer;
        name?: string;
    }): Promise<{}>;
}
