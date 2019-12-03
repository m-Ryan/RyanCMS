import { BaseEntity } from 'typeorm';
export declare class JsonEntity extends BaseEntity {
    json_id: number;
    created_at: number;
    mod: string;
    name: string;
    content: string;
    static addJson(mod: string, name: string, content: string): Promise<JsonEntity>;
    static getJson(id: number): Promise<JsonEntity>;
    static getJsonList(page?: number, size?: number): Promise<{
        list: JsonEntity[];
        count: number;
    }>;
    static deleteJson(id: number): Promise<import("typeorm").DeleteResult>;
    static updateJson(id: number, content: string): Promise<JsonEntity>;
}
