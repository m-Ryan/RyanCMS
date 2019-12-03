import { HttpService } from '@nestjs/common';
import { JsonEntity } from '../controller/entities/json.entity';
export declare class ToolsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getJsonToTs(data: string): Promise<string>;
    addJson(mod: string, name: string, content: string): Promise<JsonEntity>;
    updateJson(id: number, content: string): Promise<JsonEntity>;
    deleteJson(id: number): Promise<import("typeorm").DeleteResult>;
    getJson(id: number): Promise<JsonEntity>;
    getJsonList(page: number, size: number): Promise<{
        list: JsonEntity[];
        count: number;
    }>;
}
