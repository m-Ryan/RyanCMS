import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	getConnection,
	OneToOne,
	JoinColumn,
	OneToMany
} from 'typeorm';

@Entity('notice_read')
export class NoticeReadEntity extends BaseEntity {
	@PrimaryGeneratedColumn() read_id: number;

	@Column({
		type: 'int',
		default: 0
	})
	user_id: number;

	@Column({
		type: 'int',
		default: 0
	})
	notice_id: number;

	@Column({
		type: 'int',
		default: 0
	})
	updated_at: number;

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
}
