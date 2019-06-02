import { HttpService } from '@nestjs/common';
export declare class MapService {
    private readonly httpService;
    constructor(httpService: HttpService);
    formatAddress(lng: number, lat: number, key: string): Promise<any>;
}
