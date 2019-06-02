import { BaseEntity, EntityManager } from 'typeorm';
import { ReplayEntity } from './replace.entity';
import { CreateMessageDto } from '../form/create_message.dto';
import { MessageEntity } from './message.entity';
import { CreateReplayDto } from '../form/create_replay.dto';
export declare class CommentEntity extends BaseEntity {
    comment_id: number;
    created_at: number;
    blogger_id: number;
    article_id: number;
    messages: MessageEntity[];
    static createComment(transactionalEntityManager: EntityManager, article_id?: number, blogger_id?: number): Promise<CommentEntity>;
    static createMessage(createMessageDto: CreateMessageDto, userId: number): Promise<MessageEntity>;
    static createReplay(createReplayDto: CreateReplayDto, userId: number): Promise<ReplayEntity>;
    static getComment(articlId?: number, bloggerId?: number): Promise<CommentEntity>;
    static getList(page: number, size: number, commentId: number): Promise<{
        list: MessageEntity[];
        count: number;
    }>;
    static deleteMessage(messageId: number, userId: number): Promise<MessageEntity>;
    static deleteReplay(replayId: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
