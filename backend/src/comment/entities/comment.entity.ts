import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  EntityManager,
} from 'typeorm';

import dayjs from 'dayjs';
import { UserError } from '../../common/filters/userError';
import { ReplayEntity } from './replace.entity';
import { CreateMessageDto } from '../form/create_message.dto';
import { MessageEntity } from './message.entity';
import { CreateReplayDto } from '../form/create_replay.dto';
@Entity('comment')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({
    type: 'int',
    default: 0,
  })
  created_at: number;

  @Column({
    type: 'int',
    default: 0,
  })
  blogger_id: number;

  @Column({
    type: 'int',
    default: 0,
  })
  article_id: number;

  @OneToMany(type => MessageEntity, MessageEntity => MessageEntity.comment)
  messages: MessageEntity[];

  public static async createComment(
    transactionalEntityManager: EntityManager,
    article_id?: number,
    blogger_id?: number,
  ) {
    const comment = new CommentEntity();
    if (article_id) {
      comment.article_id = article_id;
    } else {
      comment.article_id = 0;
    }

    if (blogger_id) {
      comment.blogger_id = blogger_id;
    } else {
      comment.blogger_id = 0;
    }

    comment.created_at = dayjs().unix();
    return transactionalEntityManager.save(comment);
  }

  public static async createMessage(
    createMessageDto: CreateMessageDto,
    userId: number,
  ) {
    const comment = await this.findOne({
      comment_id: createMessageDto.comment_id,
    });
    if (!comment) {
      throw new UserError('留言区id不存在');
    }
    return MessageEntity.createMessage(createMessageDto, userId, comment);
  }

  public static async createReplay(
    createReplayDto: CreateReplayDto,
    userId: number,
  ) {
    return MessageEntity.createReplay(createReplayDto, userId);
  }

  public static async getComment(articlId?: number, bloggerId?: number) {
    const condition: any = {};
    if (articlId) {
      condition.article_id = articlId;
    }

    if (bloggerId) {
      condition.blogger_id = bloggerId;
    }

    const comment = await this.findOne({
      where: condition,
    });
    if (!comment) {
      throw new UserError('留言区id不存在');
    }
    return comment;
  }

  public static async getList(page: number, size: number, commentId: number) {
    const comment = await this.findOne({
      comment_id: commentId,
    });
    if (!comment) {
      throw new UserError('留言区id不存在');
    }
    return MessageEntity.getList(comment.comment_id, page, size);
  }

  public static deleteMessage(messageId: number, userId: number) {
    return MessageEntity.deleteMessage(messageId, userId);
  }

  public static deleteReplay(replayId: number, userId: number) {
    return ReplayEntity.deleteReplay(replayId, userId);
  }
}
