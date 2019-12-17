import { HttpService } from '@nestjs/common';
import { UploadService } from '../service/upload.service';
export declare class UserController {
    private readonly uploadService;
    private readonly service;
    constructor(uploadService: UploadService, service: HttpService);
    getQiuNiuToken(): {
        token: string;
        origin: string;
    };
    uploadQiuNiuFile(fileData: {
        data: string;
        name: string;
    }): Promise<{}>;
    uploadByUrl(url: string): Promise<{}>;
}
