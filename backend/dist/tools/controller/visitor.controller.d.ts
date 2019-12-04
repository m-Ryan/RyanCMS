import { ToolsService } from '../service/index.service';
import { CreateJsonDto } from '../form/create_json.dto';
import { UpdateJsonDto } from '../form/update_json.dto';
export declare class VisitorController {
    private readonly service;
    constructor(service: ToolsService);
    addJson(postDto: CreateJsonDto): Promise<import("./entities/json.entity").JsonEntity>;
    updateJson(postDto: UpdateJsonDto): Promise<import("./entities/json.entity").JsonEntity>;
    getJson(id: number): Promise<import("./entities/json.entity").JsonEntity>;
    getJsonList(page: number, size: number): Promise<{
        list: import("./entities/json.entity").JsonEntity[];
        count: number;
    }>;
    deleteJson(postDto: {
        id: number;
    }): Promise<import("typeorm").DeleteResult>;
}
