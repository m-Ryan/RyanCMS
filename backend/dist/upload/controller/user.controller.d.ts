import { UploadService } from '../service/upload.service';
export declare class UserController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    getQiuNiuToken(): {
        token: string;
        origin: string;
    };
    uploadQiuNiuFile(fileData: {
        data: string;
        name: string;
    }): Promise<{}>;
}
