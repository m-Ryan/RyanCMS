import { Controller, Get, Post, Body, Query, Next, Headers, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { UserGuard } from '../../../common/guards/user.guard';
import { AlbumService } from '../service/album.service';
import { CreateAlbumeDto } from '../form/create_album.dto';
import { Auth } from '../../../common/interface/Auth';
import { UpdateAlbumDto } from '../form/update_album.dto';
import { SuccessResponse } from '../../../common/filters/successResponse';
import { CreatePhotosDto } from '../form/create_photos.dto';
import { UpdatePhotoDto } from '../form/update_photo.dto';
import { UserError } from '../../../common/filters/userError';
import _ from 'lodash';
@Controller('album/user')
@UseGuards(UserGuard)
export class UserController {
	constructor(private readonly service: AlbumService) { }

	@Post('/create-album')
	async createAlbum(@Body() createAlbumeDto: CreateAlbumeDto, @Headers('auth') auth: Auth) {
		const data = new CreateAlbumeDto(createAlbumeDto);
		await data.validate();
		return this.service.createAlbum(data, auth.user_id);
	}

	@Get('/list')
	async getList(
		@Headers('auth') auth: Auth,
		@Query('page', new ParseIntPipe())
		page: number = 1,
		@Query('size', new ParseIntPipe())
		size: number = 10
	) {
		return this.service.getList(page, size, auth.user_id);
	}

	@UseGuards(UserGuard)
	@Get('/delete-album')
	async daleteTag(@Query('album_id') albumId: number, @Headers('auth') auth: Auth) {
		await this.service.daleteAlbum(albumId, auth.user_id);
		return SuccessResponse;
	}

	@UseGuards(UserGuard)
	@Post('/update-album')
	async updateTag(@Body() updateAlbumDto: UpdateAlbumDto, @Headers('auth') auth: Auth) {
		const data = new UpdateAlbumDto(updateAlbumDto);
		await data.validate();
		return this.service.updateAlbum(data, auth.user_id);
	}

	@Post('/create-photos')
	async createAlbumPhotos(@Body() createPhotosDto: CreatePhotosDto, @Headers('auth') auth: Auth) {
		const data = new CreatePhotosDto(createPhotosDto);
		await data.validate();
		return this.service.createPhotos(data, auth.user_id);
	}

	@Get('/photo-list')
	async getPhotoList(
		@Headers('auth') auth: Auth,
		@Query('page', new ParseIntPipe())
		page: number = 1,
		@Query('size', new ParseIntPipe())
		size: number = 10,
		@Query('album_name') albumName: string
	) {
		return this.service.getPhotoList(page, size, albumName, auth.user_id);
	}

	@UseGuards(UserGuard)
	@Post('/update-photo')
	async updatePhoto(@Body() updatePhotoDto: UpdatePhotoDto, @Headers('auth') auth: Auth) {
		const data = new UpdatePhotoDto(updatePhotoDto);
		await data.validate();
		return this.service.updatePhoto(data, auth.user_id);
	}

	@UseGuards(UserGuard)
	@Post('/delete-photos')
	async deletePhotos(@Body('photo_ids') photoIds: number[], @Headers('auth') auth: Auth) {
		if (photoIds.length === 0) {
			throw new UserError('至少需要一个id');
		}
		photoIds.forEach((item) => {
			if (!_.isInteger(item)) {
				throw new UserError('参数有误');
			}
		});
		await this.service.deletePhotos(photoIds, auth.user_id);
		return SuccessResponse;
	}
}
