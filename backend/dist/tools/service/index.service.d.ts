import { HttpService } from '@nestjs/common';
export declare class ToolsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getJsonToTs(data: string): Promise<string>;
}
