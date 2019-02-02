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

@Entity('user_password')
export class UserPasswordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;
  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  password: string;

  @OneToOne(type => UserEntity, UserEntity => UserEntity.password)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  public static async updatePassword(
    transactionalEntityManager: EntityManager,
    password: string,
    userId: number,
  ) {
    const user = await this.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      throw new UserError('用户不存在');
    }
    user.password = password;
    return transactionalEntityManager.save(user);
  }
}
