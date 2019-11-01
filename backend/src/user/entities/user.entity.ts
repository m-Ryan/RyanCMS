import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	getConnection,
	OneToOne,
	JoinColumn,
	OneToMany,
	Not
} from 'typeorm';
import { RegisterDto } from '../form/register.dto';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { UserPasswordEntity } from './user_password.entity';
import { LoginDto } from '../form/login.dto';
import { UserError } from '../../common/filters/userError';
import { UpdateUserDto } from '../form/updateUser.dto';
import _ from 'lodash';
import { UserResumeEntity } from './user_resume.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { MessageEntity } from '../../comment/entities/message.entity';
import { ReplayEntity } from '../../comment/entities/replace.entity';
import { ArticleEntity } from '../../article/entities/article.entity';
import { UserConcatEntity } from './user_concat.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { TagEntity } from '../../tag/entities/tag.entity';
import { UserThemeEntity } from './user_theme.entity';
import { AlbumEntity } from '../../album/entities/album.entity';
const key = 'cms_blog';
@Entity('user')
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn() user_id: number;

	@Column({
		type: 'varchar',
		length: 20,
		default: ''
	})
	nickname: string;

	@Column({
		type: 'varchar',
		length: 11,
		default: ''
	})
	phone: string;

	@Column({
		type: 'varchar',
		length: 200,
		default: 'http://assets.maocanhua.cn/FlYNsz6pq2voMT4z0citFEuFa-lc'
	})
	avatar: string;

	@Column({
		type: 'varchar',
		length: 200,
		default: ''
	})
	intro: string;

	@Column({
		type: 'varchar',
		length: 200,
		default: ''
	})
	domain: string;

	@Column({
		type: 'smallint',
		default: 1
	})
	sex: number;

	@Column({
		type: 'smallint',
		default: 1
	})
	rank: number;

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
	last_login: number;

	@Column({
		type: 'varchar',
		length: 255,
		default: '',
		select: false
	})
	token: string;

	@Column({
		type: 'int',
		default: 0
	})
	deleted_at: number;

	@OneToOne((type) => UserPasswordEntity, (UserPasswordEntity) => UserPasswordEntity.user)
	password: UserPasswordEntity;

	@OneToOne((type) => UserConcatEntity, (UserConcatEntity) => UserConcatEntity.user, { eager: true })
	concat: UserConcatEntity;

	@OneToOne((type) => UserResumeEntity, (UserResumeEntity) => UserResumeEntity.user)
	resume: UserResumeEntity;

	@OneToOne((type) => UserThemeEntity, (UserThemeEntity) => UserThemeEntity.user, { eager: true })
	theme: UserThemeEntity;

	@OneToMany((type) => MessageEntity, (MessageEntity) => MessageEntity.user)
	messages: MessageEntity[];

	@OneToMany((type) => AlbumEntity, (AlbumEntity) => AlbumEntity.user)
	albums: AlbumEntity[];

	@OneToMany((type) => ReplayEntity, (ReplayEntity) => ReplayEntity.user)
	replays: ReplayEntity[];

	@OneToMany((type) => ArticleEntity, (ArticleEntity) => ArticleEntity.user)
	articles: ArticleEntity[];

	static encodePassword(password: string) {
		return crypto.createHmac('sha256', key).update(password).digest('hex');
	}

	static sign(userId: number, rank: number) {
		return jwt.sign(
			{
				user_id: userId,
				rank,
				expiresIn: '7d'
			},
			key
		);
	}

	static verify(token: string) {
		try {
			return jwt.verify(token, key);
		} catch (error) {
			throw new UserError('无效的token');
		}
	}

	static async getUser(userId: number) {
		const user = await this.findOne({
			where: {
				user_id: userId,
				deleted_at: 0,
				cache: 60
			}
		});
		if (!user) {
			throw new UserError('用户不存在');
		}
		const token = this.sign(user.user_id, user.rank);
		user.token = token;
		user.last_login = dayjs().unix();
		this.save(user);
		return user;
	}

	static getDomainList() {
		return this.find({
			domain: Not('') as any
		});
	}

	static async getBaseInfo(nickname?: string, userId?: number, domain?: string) {
		const condition: any = {
			deleted_at: 0
		};
		if (nickname) {
			condition.nickname = nickname;
		}
		if (userId) {
			condition.user_id = userId;
		}
		if (domain) {
			condition.domain = domain;
		}
		const user = await this.findOne({
			where: condition,
			cache: 60
		});
		if (!user) {
			throw new UserError('用户不存在');
		}
		return user;
	}

	static hasRegisterNickname(nickname: string) {
		return this.count({
			where: {
				nickname
			}
		});
	}

	static hasRegisterPhone(phone: string) {
		if (phone) {
			return this.count({
				where: {
					phone
				}
			});
		}
	}

	static hasRegisterDomain(domain: string) {
		return this.count({
			where: {
				domain
			}
		});
	}

	static async register(registerDto: RegisterDto, userRank: number) {
		const { nickname, phone, password } = registerDto;
		const currentTime = dayjs().unix();
		return getConnection().transaction(async (transactionalEntityManager) => {
			// 如果存在用户名或手机号被注册
			if (await this.hasRegisterNickname(nickname)) {
				throw new UserError('用户名已被注册');
			}

			if (await this.hasRegisterPhone(phone)) {
				throw new UserError('手机号已被注册');
			}

			const user = new UserEntity();
			user.nickname = nickname;
			user.phone = phone;
			user.rank = userRank;
			user.created_at = currentTime;
			user.updated_at = currentTime;
			user.last_login = currentTime;
			await transactionalEntityManager.save(user);
			// 创建密码
			const userPassword = new UserPasswordEntity();
			userPassword.user = user;
			userPassword.password = this.encodePassword(password);
			await transactionalEntityManager.save(userPassword);

			// 创建关联联系方式
			const concat = new UserConcatEntity();
			concat.user_id = user.user_id;
			await transactionalEntityManager.save(concat);

			// 创建关联简历
			const resume = new UserResumeEntity();
			resume.user_id = user.user_id;
			resume.content = '这个人很懒，什么都没有写~~';
			await transactionalEntityManager.save(resume);

			// 创建关联主题
			const theme = new UserThemeEntity();
			theme.user_id = user.user_id;
			await transactionalEntityManager.save(theme);

			// 创建关联留言
			const comment = new CommentEntity();
			comment.blogger_id = user.user_id;
			await transactionalEntityManager.save(comment);

			// 创建初始化栏目跟标签
			const category = new CategoryEntity();
			category.picture = 'http://assets.maocanhua.cn/Fi-dy45B8oqzE5_spxwT2nSila14';
			category.desc = '原创';
			category.name = '原创';
			category.user_id = user.user_id;
			category.created_at = currentTime;
			await transactionalEntityManager.save(category);

			const tag = new TagEntity();
			tag.picture = 'http://assets.maocanhua.cn/FlKcAJwVbRx0aGQtZo6Xt2otzTw3';
			tag.desc = '其它';
			tag.name = '其它';
			tag.user_id = user.user_id;
			tag.created_at = currentTime;
			await transactionalEntityManager.save(tag);

			user.token = this.sign(user.user_id, user.rank);
			await transactionalEntityManager.save(user);
			user.concat = concat;
			user.resume = resume;
			user.theme = theme;
			return user;
		});
	}

	static async login(loginDto: LoginDto) {
		const { phone, password } = loginDto;
		const isExist = await UserPasswordEntity.findOne({
			where: {
				phone,
				password: this.encodePassword(password)
			}
		});
		if (!isExist) {
			throw new UserError('密码错误');
		}
		const user = await this.findOne({
			where: {
				phone
			}
		});
		if (!user) {
			throw new UserError('用户不存在');
		}
		if (user.deleted_at > 0) {
			throw new UserError('用户已注销');
		}
		const token = this.sign(user.user_id, user.rank);
		user.token = token;
		user.last_login = dayjs().unix();
		this.save(user);
		return user;
	}

	static async updateUser(updateUserDto: UpdateUserDto, userId: number) {
		const { nickname, phone, password, sex, intro, avatar, github, email, weibo, zhihu, domain } = updateUserDto;
		const user = await this.findOne({
			where: {
				user_id: userId,
				deleted_at: 0
			}
		});
		if (!user) {
			throw new UserError('没有此用户');
		}

		if (nickname) {
			if (user.nickname !== nickname) {
				if (await this.hasRegisterNickname(nickname)) {
					throw new UserError('用户名已被注册');
				}
			}
			user.nickname = nickname;
		}

		if (phone) {
			if (user.phone !== phone) {
				if (await this.hasRegisterPhone(phone)) {
					throw new UserError('手机号已被注册');
				}
			}
			user.phone = phone;
		}

		if (domain) {
			if (user.domain !== domain) {
				if (await this.hasRegisterDomain(domain)) {
					throw new UserError('该域名已被使用');
				}
			}
			user.domain = domain;
		}

		if (avatar) {
			user.avatar = avatar;
		}

		if (_.isInteger(sex)) {
			user.sex = sex ? 1 : 0;
		}

		if (_.isString(intro)) {
			user.intro = intro;
		}

		const concat = await UserConcatEntity.findOne({
			where: { user_id: userId }
		});
		if (!concat) {
			throw new UserError('用户信息有误');
		}
		if (_.isString(zhihu)) {
			concat.zhihu = zhihu;
		}

		if (_.isString(weibo)) {
			concat.weibo = weibo;
		}

		if (_.isString(github)) {
			concat.github = github;
		}

		if (_.isString(email)) {
			concat.email = email;
		}

		return getConnection().transaction(async (transactionalEntityManager) => {
			if (password) {
				if (password.length < 6 || password.length > 36) {
					throw new UserError('密码格式错误');
				}
				const userPassword = await UserPasswordEntity.findOne({
					where: { user_id: userId }
				});
				if (!userPassword) {
					throw new UserError('用户信息有误');
				}
				userPassword.password = this.encodePassword(password);
				await transactionalEntityManager.save(userPassword);
			}
			await transactionalEntityManager.save(concat);
			user.token = this.sign(user.user_id, user.rank);
			user.updated_at = dayjs().unix();
			await transactionalEntityManager.save(user);
		});
	}
}
