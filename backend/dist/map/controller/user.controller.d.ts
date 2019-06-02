import { MapService } from '../service/map.service';
export declare class UserController {
    private readonly service;
    constructor(service: MapService);
    formatAddress(lng: number, lat: number): Promise<any>;
}
