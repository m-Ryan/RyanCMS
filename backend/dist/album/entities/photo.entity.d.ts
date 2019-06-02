import { BaseEntity } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { CreatePhotosDto } from '../form/create_photos.dto';
import { UpdatePhotoDto } from '../form/update_photo.dto';
export declare class PhototEntity extends BaseEntity {
    photo_id: number;
    name: string;
    url: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    user_id: number;
    album: AlbumEntity[];
    static createPhotos(dataDto: CreatePhotosDto, userId: number): Promise<import("typeorm").InsertResult>;
    static getList(page: number, size: number, albumName: string, userId: number): Promise<{
        list: PhototEntity[];
        count: number;
    }>;
    static updatePhoto(updatePhotoDto: UpdatePhotoDto, userId: number): Promise<PhototEntity>;
    static deletePhotos(photoIds: number[], userId: number): Promise<import("typeorm").UpdateResult>;
}
