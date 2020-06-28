import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserError } from '../../../common/filters/userError';
import { UserEntity } from './user.entity';
@Entity('user_resume')
export class UserResumeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;
  @Column({
    type: 'longtext',
  })
  content: string;

  @OneToOne(type => UserEntity, UserEntity => UserEntity.resume)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  public static async updateResume(userId: number, content: string) {
    const resume = await this.getResume(userId);
    resume.content = content;
    return this.save(resume);
  }

  public static async getResume(userId: number) {
    const resume = await UserResumeEntity.findOne({
      where: {
        user_id: userId,
      },
    });
    if (!resume) {
      throw new UserError('用户不存在');
    }
    return resume;
  }
}
