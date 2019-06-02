import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  EntityManager,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserError } from '../../common/filters/userError';
import { UserEntity } from './user.entity';

@Entity('user_concat')
export class UserConcatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @OneToOne(type => UserEntity, UserEntity => UserEntity.concat)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  // 邮我地址，不是邮箱
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  github: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  zhihu: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  weibo: string;
}
