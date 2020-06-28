import { Injectable } from '@nestjs/common';
import { PhototEntity } from '../entities/photo.entity';
import { CreatePhotosDto } from '../form/create_photos.dto';
import { CreateAlbumeDto } from '../form/create_album.dto';
import { UpdateAlbumDto } from '../form/update_album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { UpdatePhotoDto } from '../form/update_photo.dto';
@Injectable()
export class AlbumService {
	constructor() {}

	createAlbum(createAlbumeDto: CreateAlbumeDto, userId: number) {
		return AlbumEntity.createAlbum(createAlbumeDto, userId);
	}

	updateAlbum(updateAlbumDto: UpdateAlbumDto, userId: number) {
		return AlbumEntity.updateAlbum(updateAlbumDto, userId);
	}

	daleteAlbum(tagId: number, userId: number) {
		return AlbumEntity.deleteAlbum(tagId, userId);
	}

	getList(page: number, size: number, userId: number, secret?: number, needRelations?: boolean) {
		return AlbumEntity.getList(page, size, userId, secret, needRelations);
	}

	createPhotos(createPhotosDto: CreatePhotosDto, userId: number) {
		return PhototEntity.createPhotos(createPhotosDto, userId);
	}

	getPhotoList(page: number, size: number, albumName: string, userId: number) {
		return PhototEntity.getList(page, size, albumName, userId);
	}

	updatePhoto(updatePhotoDto: UpdatePhotoDto, userId: number) {
		return PhototEntity.updatePhoto(updatePhotoDto, userId);
	}

	deletePhotos(photoIds: number[], userId: number) {
		return PhototEntity.deletePhotos(photoIds, userId);
	}
}
