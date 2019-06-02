import { ToolsService } from '../service/index.service';
export declare class UserController {
    private readonly service;
    constructor(service: ToolsService);
    getTyping(postDto: {
        data: string;
    }): Promise<string>;
}
