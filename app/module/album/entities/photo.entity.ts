import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, getConnection, In } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { CreatePhotosDto } from '../form/create_photos.dto';
import dayjs from 'dayjs';
import { UserError } from '../../../common/filters/userError';
import { UpdatePhotoDto } from '../form/update_photo.dto';
@Entity('photo')
export class PhototEntity extends BaseEntity {
	@PrimaryGeneratedColumn() photo_id: number;
	@Column({
		type: 'varchar',
		default: ''
	})
	name: string;

	@Column({
		type: 'varchar',
		default: ''
	})
	url: string;

	@Column({
		type: 'int',
		default: 0
	})
	created_at: number;

	@Column({
		type: 'int',
		default: 0
	})
	updated_at: number;

	@Column({
		type: 'int',
		default: 0
	})
	deleted_at: number;

	@Column({
		type: 'int',
		default: 0
	})
	user_id: number;

	@ManyToOne((type) => AlbumEntity, (AlbumEntity) => AlbumEntity.photos)
	album: AlbumEntity[];

	public static async createPhotos(dataDto: CreatePhotosDto, userId: number) {
		const album = await AlbumEntity.findOne({
			user_id: userId,
			name: decodeURIComponent(dataDto.album_name),
			deleted_at: 0
		});
		if (!album) {
			throw new UserError('相册不存在');
		}
		const currentTime = dayjs().unix();
		const currentDay = dayjs().format('YYYY年-MM月-DD日');
		const urls = dataDto.photos;
		const photos = urls.map((url) => ({
			url,
			album,
			name: currentDay,
			user_id: userId,
			created_at: currentTime,
			updated_at: currentTime
		}));
		return await getConnection().createQueryBuilder().insert().into('photo').values(photos).execute();
	}

	public static async getList(page: number, size: number, albumName: string, userId: number) {
		const album = await AlbumEntity.findOne({
			user_id: userId,
			name: decodeURIComponent(albumName),
			deleted_at: 0
		});
		if (!album) {
			throw new UserError('相册不存在');
		}
		const condition: any = {
			deleted_at: 0,
			album
		};
		if (userId) {
			condition.user_id = userId;
		}
		const result = await this.findAndCount({
			where: condition,
			skip: (page - 1) * size,
			take: size
		});

		return {
			list: result[0],
			count: result[1]
		};
	}

	public static async updatePhoto(updatePhotoDto: UpdatePhotoDto, userId: number) {
		const photo = await this.findOne({ photo_id: updatePhotoDto.photo_id, deleted_at: 0, user_id: userId });
		if (!photo) {
			throw new UserError('相片不存在');
		}

		photo.name = updatePhotoDto.name;
		return photo.save();
	}

	public static deletePhotos(photoIds: number[], userId: number) {
		return this.update(
			{
				photo_id: In(photoIds) as any,
				user_id: userId,
				deleted_at: 0
			},
			{
				deleted_at: dayjs().unix()
			}
		);
	}
}
