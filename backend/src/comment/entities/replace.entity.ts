import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import dayjs from 'dayjs';
import { UserError } from '../../common/filters/userError';
import { UserEntity } from '../../user/entities/user.entity';
import { MessageEntity } from './message.entity';
import { CreateReplayDto } from '../form/create_replay.dto';
@Entity('replay')
export class ReplayEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  replay_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  content: string;

  @Column({
    type: 'int',
    default: 0,
  })
  created_at: number;

  // 评论者
  @Column({
    type: 'int',
    default: 0,
  })
  user_id: number;
  @ManyToOne(type => UserEntity, UserEntity => UserEntity.replays, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // 楼层
  // 评论者
  @Column({
    type: 'int',
    default: 0,
  })
  message_id: number;

  @ManyToOne(type => MessageEntity, MessageEntity => MessageEntity.replays)
  @JoinColumn({ name: 'message_id' })
  message: MessageEntity;

  public static async createReplay(
    createReplayDto: CreateReplayDto,
    userId: number,
  ) {
    const user = await UserEntity.findOne({
      user_id: userId,
    });
    if (!user) {
      throw new UserError('用户不存在');
    }
    const replay = new ReplayEntity();
    replay.message_id = createReplayDto.message_id;
    replay.content = createReplayDto.content;
    replay.created_at = dayjs().unix();
    replay.user = user;
    return this.save(replay);
  }

  /**
   * 删除回复，真删除
   * @param replayId
   * @param userId
   */
  public static async deleteReplay(replayId: number, userId: number) {
    const replay = await this.findOne({
      replay_id: replayId,
      user_id: userId,
    });
    if (!replay) {
      throw new UserError('该回复不存在');
    }
    return this.delete(replay);
  }
}
