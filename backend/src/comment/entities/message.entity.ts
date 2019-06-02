import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import dayjs from 'dayjs';
import { UserError } from '../../common/filters/userError';
import { UserEntity } from '../../user/entities/user.entity';
import { ReplayEntity } from './replace.entity';
import { CreateMessageDto } from '../form/create_message.dto';
import { CommentEntity } from './comment.entity';
import { CreateReplayDto } from '../form/create_replay.dto';
@Entity('message')
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  message_id: number;

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

  @Column({
    type: 'int',
    default: 0,
  })
  deleted_at: number;

  // 层主

  @Column({
    type: 'int',
    default: 0,
  })
  user_id: number;
  @ManyToOne(type => UserEntity, UserEntity => UserEntity.messages)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // 留言
  @Column({
    type: 'int',
    default: 0,
  })
  comment_id: number;
  @ManyToOne(type => CommentEntity, CommentEntity => CommentEntity.messages)
  @JoinColumn({ name: 'comment_id' })
  comment: CommentEntity;

  // 评论
  @OneToMany(type => ReplayEntity, ReplayEntity => ReplayEntity.message)
  replays: ReplayEntity[];

  public static async createMessage(
    createMessageDto: CreateMessageDto,
    userId: number,
    comment: CommentEntity,
  ) {
    const user = await UserEntity.findOne({
      user_id: userId,
    });
    if (!user) {
      throw new UserError('用户不存在');
    }
    const message = new MessageEntity();
    message.comment_id = comment.comment_id;
    message.content = createMessageDto.content;
    message.user = user;
    message.created_at = dayjs().unix();
    message.replays = [];
    return this.save(message);
  }

  public static async createReplay(
    createReplayDto: CreateReplayDto,
    userId: number,
  ) {
    const message = await this.findOne({
      message_id: createReplayDto.message_id,
    });
    if (!message) {
      throw new UserError('评论楼层不存在');
    }
    return ReplayEntity.createReplay(createReplayDto, userId);
  }

  public static async getList(commentId: number, page: number, size: number) {
    const result = await this.findAndCount({
      where: {
        deleted_at: 0,
        comment_id: commentId,
      },
      skip: (page - 1) * size,
      take: size,
      order: {
        message_id: 'DESC',
      },
      relations: ['replays', 'user'],
    });

    return {
      list: result[0],
      count: result[1],
    };
  }

  public static async deleteMessage(messageId: number, userId: number) {
    const message = await this.findOne({
      where: {
        message_id: messageId,
        user_id: userId,
        deleted_at: 0,
      },
    });

    if (!message) {
      throw new UserError('该评论不存在');
    }
    message.deleted_at = dayjs().unix();
    return this.save(message);
  }
}
