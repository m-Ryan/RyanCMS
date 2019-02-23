import { BaseEntity } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { PhototEntity } from './photo.entity';
import { CreateAlbumeDto } from '../form/create_album.dto';
import { UpdateAlbumDto } from '../form/update_album.dto';
export declare class AlbumEntity extends BaseEntity {
    album_id: number;
    name: string;
    desc: string;
    picture: string;
    user_id: number;
    user: UserEntity;
    photos: PhototEntity[];
    created_at: number;
    updated_at: number;
    deleted_at: number;
    secret: number;
    static createAlbum(dataDto: CreateAlbumeDto, userId: number): Promise<AlbumEntity>;
    static updateAlbum(updateAlbumDto: UpdateAlbumDto, userId: number): Promise<AlbumEntity>;
    static checkExist(name: string, userId: number): Promise<AlbumEntity>;
    static deleteAlbum(albumId: number, userId: number): Promise<import("typeorm").DeleteResult>;
    static getList(page: number, size: number, userId: number, secret?: number, needRelations?: boolean): Promise<{
        list: AlbumEntity[];
        count: number;
    }>;
}
