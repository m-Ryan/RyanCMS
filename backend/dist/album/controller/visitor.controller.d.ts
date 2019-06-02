import { AlbumService } from '../service/album.service';
export declare class VisitorController {
    private readonly service;
    constructor(service: AlbumService);
    getList(page: number, size: number, userId: number): Promise<{
        list: import("../entities/album.entity").AlbumEntity[];
        count: number;
    }>;
}
