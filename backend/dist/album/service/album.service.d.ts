import { PhototEntity } from '../entities/photo.entity';
import { CreatePhotosDto } from '../form/create_photos.dto';
import { CreateAlbumeDto } from '../form/create_album.dto';
import { UpdateAlbumDto } from '../form/update_album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { UpdatePhotoDto } from '../form/update_photo.dto';
export declare class AlbumService {
    constructor();
    createAlbum(createAlbumeDto: CreateAlbumeDto, userId: number): Promise<AlbumEntity>;
    updateAlbum(updateAlbumDto: UpdateAlbumDto, userId: number): Promise<AlbumEntity>;
    daleteAlbum(tagId: number, userId: number): Promise<import("typeorm").DeleteResult>;
    getList(page: number, size: number, userId: number, secret?: number, needRelations?: boolean): Promise<{
        list: AlbumEntity[];
        count: number;
    }>;
    createPhotos(createPhotosDto: CreatePhotosDto, userId: number): Promise<import("typeorm").InsertResult>;
    getPhotoList(page: number, size: number, albumName: string, userId: number): Promise<{
        list: PhototEntity[];
        count: number;
    }>;
    updatePhoto(updatePhotoDto: UpdatePhotoDto, userId: number): Promise<PhototEntity>;
    deletePhotos(photoIds: number[], userId: number): Promise<import("typeorm").UpdateResult>;
}
