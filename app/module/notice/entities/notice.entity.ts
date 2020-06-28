import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	getConnection,
	OneToOne,
	JoinColumn,
	OneToMany,
	MoreThan,
	Not
} from 'typeorm';

import dayjs from 'dayjs';
import { UserError } from '../../../common/filters/userError';
import { CreateNoticeDto } from '../form/create_notice.dto';
import { USER_RANK, ADMIN_RANK } from '../../../common/constant/User';
import { NoticeReadEntity } from './notice_read.entity';
import { UserEntity } from '../../user/entities/user.entity';
@Entity('notice')
export class NoticeEntity extends BaseEntity {
	@PrimaryGeneratedColumn() notice_id: number;

	@Column({
		type: 'int',
		default: 0
	})
	user_id: number;

	@Column({
		type: 'varchar',
		default: ''
	})
	title: string;

	@Column({
		type: 'varchar',
		default: ''
	})
	content: string;

	@Column({
		type: 'int',
		default: 0
	})
	updated_at: number;

	// 权限
	@Column({
		type: 'int',
		default: 0
	})
	rank: number;

	// 类型
	@Column({
		type: 'varchar',
		default: ''
	})
	type: NoticeType;

	// 点击通知跳往的地址
	@Column({
		type: 'varchar',
		default: ''
	})
	link: string;

	@Column({
		type: 'int',
		default: 0
	})
	created_at: number;

	@Column({
		type: 'int',
		default: 0
	})
	deleted_at: number;

	public static async createNotice(createNoticeDto: CreateNoticeDto, rank: number, userId: number) {
		const notice = new NoticeEntity();
		notice.title = createNoticeDto.title;
		notice.content = createNoticeDto.content;
		notice.rank = rank;
		notice.created_at = dayjs().unix();
		notice.updated_at = dayjs().unix();
		notice.user_id = userId;
		if (createNoticeDto.type === NoticeType.article) {
			notice.type = createNoticeDto.type;
			notice.link = createNoticeDto.link;
		}
		return notice.save();
	}

	// 设置消息已读
	public static async setNoticeRead(noticeId: number, userId: number) {
		const notice = await this.findOne({ notice_id: noticeId, deleted_at: 0 });
		if (!notice) {
			throw new UserError('通知不存在');
		}
		const noticeRead = await NoticeReadEntity.findOne({ notice_id: noticeId, user_id: userId });
		if (!noticeRead) {
			const newNoticeRead = new NoticeReadEntity();
			newNoticeRead.user_id = userId;
			newNoticeRead.notice_id = noticeId;
			newNoticeRead.created_at = dayjs().unix();
			newNoticeRead.updated_at = dayjs().unix();
			await newNoticeRead.save();
		}
		return;
	}

	// 设置全部消息已读
	public static async setAllNoticeRead(userId: number) {
		const user = await UserEntity.findOne({ user_id: userId, deleted_at: 0 });
		if (!user) {
			throw new UserError('用户不存在');
		}
		const noticeList = await this.find({
			deleted_at: 0,
			created_at: MoreThan(user.created_at) as any
		});
		const readList = noticeList.map((notice) => ({
			user_id: userId,
			notice_id: notice.notice_id,
			created_at: dayjs().unix(),
			updated_at: dayjs().unix()
		}));
		return await getConnection().createQueryBuilder().insert().into('notice_read').values(readList).execute();
	}

	// 新通知列表
	public static async getNewNoticeList(userId: number, rank: number) {
		const user = await UserEntity.findOne({ user_id: userId, deleted_at: 0 });
		if (!user) {
			throw new UserError('用户不存在');
		}
		const noticeList = await this.find({
			where: {
				rank,
				deleted_at: 0,
				user_id: Not(userId) as any, // 通知不能给自己
				created_at: MoreThan(user.created_at) as any
			},
			order: {
				notice_id: 'DESC'
			}
		});

		const readList = await NoticeReadEntity.find({ user_id: userId });
		return noticeList.filter((notice) => !readList.some((read) => read.notice_id === notice.notice_id));
	}

	public static async deleteNotice(noticeId: number, userId: number) {
		const user = await UserEntity.findOne({ user_id: userId, deleted_at: 0 });
		if (!user) {
			throw new UserError('用户不存在');
		}
		const notice = await this.findOne({ notice_id: noticeId, deleted_at: 0 });
		if (!notice) {
			throw new UserError('通知不存在');
		}
		notice.deleted_at = dayjs().unix();
		return notice.save();
	}
}

export enum NoticeType {
	article = 'ARTICLE'
}
