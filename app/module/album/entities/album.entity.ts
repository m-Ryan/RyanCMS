import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	EntityManager,
	OneToOne,
	JoinColumn,
	OneToMany,
	ManyToOne
} from 'typeorm';
import { UserError } from '../../../common/filters/userError';
import { UserEntity } from '../../user/entities/user.entity';
import { PhototEntity } from './photo.entity';
import { CreateAlbumeDto } from '../form/create_album.dto';
import dayjs from 'dayjs';
import { UpdateAlbumDto } from '../form/update_album.dto';
import _ from 'lodash';
@Entity('album')
export class AlbumEntity extends BaseEntity {
	@PrimaryGeneratedColumn() album_id: number;
	@Column({
		type: 'varchar',
		default: ''
	})
	name: string;

	@Column({
		type: 'varchar',
		default: ''
	})
	desc: string;

	@Column({
		type: 'varchar',
		default: ''
	})
	picture: string;

	@Column({
		type: 'int',
		default: 0
	})
	user_id: number;

	@ManyToOne((type) => UserEntity, (UserEntity) => UserEntity.albums)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@OneToMany((type) => PhototEntity, (PhototEntity) => PhototEntity.album)
	photos: PhototEntity[];

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
	secret: number;

	public static async createAlbum(dataDto: CreateAlbumeDto, userId: number) {
		const user = await UserEntity.findOne({
			user_id: userId,
			deleted_at: 0
		});
		if (!user) {
			throw new UserError('用户不存在');
		}
		const existAlbum = await this.checkExist(dataDto.name, userId);
		if (existAlbum) {
			throw new UserError('已有同名分类');
		}
		const album = new AlbumEntity();
		album.name = dataDto.name;
		album.secret = dataDto.secret;
		album.desc = dataDto.desc;
		album.picture = dataDto.picture;
		album.created_at = dayjs().unix();
		album.updated_at = dayjs().unix();
		album.photos = [];
		album.user = user;
		await album.save();
		return album;
	}

	public static async updateAlbum(updateAlbumDto: UpdateAlbumDto, userId: number) {
		const { name, picture, desc, album_id, secret } = updateAlbumDto;
		const existAlbum = await this.checkExist(name, userId);
		if (existAlbum && existAlbum.album_id !== album_id) {
			throw new UserError('已有同名分类');
		}
		const album = await this.findOne({
			where: {
				album_id,
				deleted_at: 0,
				user_id: userId
			}
		});

		if (!album) {
			throw new UserError('相册不存在');
		}
		if (name) {
			album.name = name;
		}
		if (_.isInteger(secret)) {
			album.secret = secret;
		}
		if (picture) {
			album.picture = picture;
		}
		if (desc) {
			album.desc = desc;
		}
		album.updated_at = dayjs().unix();
		return this.save(album);
	}

	public static async checkExist(name: string, userId: number) {
		const exist = await this.findOne({
			where: {
				name,
				user_id: userId,
				deleted_at: 0
			}
		});
		return exist;
	}

	public static async deleteAlbum(albumId: number, userId: number) {
		const album = await this.findOne({
			where: {
				album_id: albumId,
				deleted_at: 0,
				user_id: userId
			},
			relations: ['photos']
		});

		if (!album) {
			throw new UserError('分类不存在');
		}

		if (album.photos.length > 0) {
			throw new UserError('该相册下文章不为空，不能删除');
		}
		return this.delete(album);
	}

	public static async getList(page: number, size: number, userId: number, secret?: number, needRelations?: boolean) {
		const condition: any = {
			deleted_at: 0
		};
		if (_.isInteger(secret)) {
			condition.secret = secret;
		}
		const relations = needRelations ? ['photos'] : [];
		if (userId) {
			condition.user_id = userId;
		}
		const result = await this.findAndCount({
			where: condition,
			skip: (page - 1) * size,
			take: size,
			order: {
				album_id: 'DESC'
			},
			relations
		});

		return {
			list: result[0],
			count: result[1]
		};
	}
}
