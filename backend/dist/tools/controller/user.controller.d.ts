import { ToolsService } from '../service/index.service';
export declare class UserController {
    private readonly service;
    constructor(service: ToolsService);
    getTyping(postDto: {
        data: string;
    }): Promise<any>;
    getPDF(postDto: {
        data: string;
    }): Promise<{}>;
    getPagePDF(url: string): Promise<{}>;
}
