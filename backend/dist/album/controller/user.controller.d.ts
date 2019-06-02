import { AlbumService } from '../service/album.service';
import { CreateAlbumeDto } from '../form/create_album.dto';
import { Auth } from '../../common/interface/Auth';
import { UpdateAlbumDto } from '../form/update_album.dto';
import { CreatePhotosDto } from '../form/create_photos.dto';
import { UpdatePhotoDto } from '../form/update_photo.dto';
export declare class UserController {
    private readonly service;
    constructor(service: AlbumService);
    createAlbum(createAlbumeDto: CreateAlbumeDto, auth: Auth): Promise<import("../entities/album.entity").AlbumEntity>;
    getList(auth: Auth, page?: number, size?: number): Promise<{
        list: import("../entities/album.entity").AlbumEntity[];
        count: number;
    }>;
    daleteTag(albumId: number, auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
    updateTag(updateAlbumDto: UpdateAlbumDto, auth: Auth): Promise<import("../entities/album.entity").AlbumEntity>;
    createAlbumPhotos(createPhotosDto: CreatePhotosDto, auth: Auth): Promise<import("typeorm").InsertResult>;
    getPhotoList(auth: Auth, page: number, size: number, albumName: string): Promise<{
        list: import("../entities/photo.entity").PhototEntity[];
        count: number;
    }>;
    updatePhoto(updatePhotoDto: UpdatePhotoDto, auth: Auth): Promise<import("../entities/photo.entity").PhototEntity>;
    deletePhotos(photoIds: number[], auth: Auth): Promise<{
        message: string;
        status: number;
    }>;
}
