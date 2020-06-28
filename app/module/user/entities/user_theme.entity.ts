import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { UserError } from '../../../common/filters/userError';
import { UserEntity } from './user.entity';
import { UpdateThemeDto } from '../form/updateTheme.dto';
@Entity('user_theme')
export class UserThemeEntity extends BaseEntity {
	@PrimaryGeneratedColumn() user_id: number;
	@Column({
		type: 'varchar',
		default: ''
	})
	music: string;

	@Column({
		type: 'varchar',
		default: ''
	})
	color: string;

	@OneToOne((type) => UserEntity, (UserEntity) => UserEntity.theme)
	@JoinColumn({
		name: 'user_id'
	})
	user: UserEntity;

	public static async updateTheme(userId: number, updateThemeDto: UpdateThemeDto) {
		const theme = await this.getTheme(userId);
		if (updateThemeDto.music) {
			theme.music = updateThemeDto.music;
		}

		if (updateThemeDto.color) {
			theme.color = updateThemeDto.color;
		}

		return this.save(theme);
	}

	public static async getTheme(userId: number) {
		const theme = await UserThemeEntity.findOne({
			where: {
				user_id: userId
			}
		});
		if (!theme) {
			throw new UserError('用户不存在');
		}
		return theme;
	}
}
