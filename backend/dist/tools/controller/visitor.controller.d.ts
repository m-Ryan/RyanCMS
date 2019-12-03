import { ToolsService } from '../service/index.service';
export declare class VisitorController {
    private readonly service;
    constructor(service: ToolsService);
    addJson(postDto: {
        content: string;
        mod: string;
        name: string;
    }): Promise<import("./entities/json.entity").JsonEntity>;
    updateJson(postDto: {
        id: number;
        content: string;
    }): Promise<import("./entities/json.entity").JsonEntity>;
    getJson(id: number): Promise<import("./entities/json.entity").JsonEntity>;
    getJsonList(page: number, size: number): Promise<{
        list: import("./entities/json.entity").JsonEntity[];
        count: number;
    }>;
    deleteJson(postDto: {
        id: number;
    }): Promise<import("typeorm").DeleteResult>;
}
