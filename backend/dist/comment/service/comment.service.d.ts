import { CreateMessageDto } from '../form/create_message.dto';
import { CommentEntity } from '../entities/comment.entity';
import { CreateReplayDto } from '../form/create_replay.dto';
export declare class CommentService {
    constructor();
    createMessage(createMessageDto: CreateMessageDto, userId: number): Promise<import("../entities/message.entity").MessageEntity>;
    createReplay(createReplayDto: CreateReplayDto, userId: number): Promise<import("../entities/replace.entity").ReplayEntity>;
    getComment(articleId?: number, bloggerId?: number): Promise<CommentEntity>;
    getList(page: number, size: number, commentId: number): Promise<{
        list: import("../entities/message.entity").MessageEntity[];
        count: number;
    }>;
    deleteMessage(messageId: number, userId: number): Promise<import("../entities/message.entity").MessageEntity>;
    deleteReplay(replayId: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
