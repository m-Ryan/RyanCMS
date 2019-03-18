import { Auth } from '../../common/interface/Auth';
import { UploadService } from '../service/upload.service';
export declare class UserController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    updateTag(file: any, auth: Auth): Promise<{}>;
    getQiuNiuToken(): {
        token: string;
        origin: string;
    };
    uploadQiuNiuFile(fileData: {
        data: string;
        name: string;
    }): Promise<{}>;
}
