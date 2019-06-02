import { BaseEntity } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ReplayEntity } from './replace.entity';
import { CreateMessageDto } from '../form/create_message.dto';
import { CommentEntity } from './comment.entity';
import { CreateReplayDto } from '../form/create_replay.dto';
export declare class MessageEntity extends BaseEntity {
    message_id: number;
    content: string;
    created_at: number;
    deleted_at: number;
    user_id: number;
    user: UserEntity;
    comment_id: number;
    comment: CommentEntity;
    replays: ReplayEntity[];
    static createMessage(createMessageDto: CreateMessageDto, userId: number, comment: CommentEntity): Promise<MessageEntity>;
    static createReplay(createReplayDto: CreateReplayDto, userId: number): Promise<ReplayEntity>;
    static getList(commentId: number, page: number, size: number): Promise<{
        list: MessageEntity[];
        count: number;
    }>;
    static deleteMessage(messageId: number, userId: number): Promise<MessageEntity>;
}
